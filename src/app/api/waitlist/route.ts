import { NextRequest, NextResponse } from 'next/server'
import { currentUser }            from '@clerk/nextjs/server'
import { db }                     from '@/lib/prisma'
import { generateReferralId }     from '@/app/lib/utils'

export async function POST(req: NextRequest) {
  try {
    // 1) Auth
    const user = await currentUser()
    if (!user?.id || !user.emailAddresses?.[0]?.emailAddress) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const clerkUserId = user.id
    const email       = user.emailAddresses[0].emailAddress

    // 2) Parse payload
    const { name, referredBy } = await req.json()
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    // 3) Ensure app‑user exists
    let appUser = await db.user.findUnique({ where: { clerkUserId } })
    if (!appUser) {
      appUser = await db.user.create({
        data: { clerkUserId, email, name }
      })
    }

    // 4) Already on waitlist?
    const existing = await db.waitlistUser.findUnique({
      where: { userId: appUser.id }
    })
    if (existing) {
      // If they’ve changed who referred them, update coins/referrals:
      if (referredBy && existing.referredBy !== referredBy) {
        const ref = await db.waitlistUser.findUnique({
          where: { referralId: referredBy }
        })
        if (!ref) {
          return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 })
        }
        await db.waitlistUser.update({
          where: { referralId: referredBy },
          data: {
            coins:     { increment: 25 },
            referrals: { increment: 1 },
          }
        })
        await db.waitlistUser.update({
          where: { userId: appUser.id },
          data: {
            referredBy,
            coins: { increment: 15 }
          }
        })
      }

      return NextResponse.json({
        message:    `You’re already on the waitlist!`,
        referralId: existing.referralId,
        ctaMessage: `Share your link to reach the top 3!`
      }, { status: 200 })
    }

    // 5) New join → referral bonus & create
    let coins = 10
    if (referredBy) {
      const referrer = await db.waitlistUser.findUnique({
        where: { referralId: referredBy }
      })
      if (!referrer) {
        return NextResponse.json({ error: 'Invalid referral code' }, { status: 400 })
      }
      await db.waitlistUser.update({
        where: { referralId: referredBy },
        data: {
          coins:     { increment: 25 },
          referrals: { increment: 1 }
        }
      })
      coins = 15
    }

    const referralId = generateReferralId(name)
    await db.waitlistUser.create({
      data: {
        userId:     appUser.id,
        name,
        email,
        referralId,
        referredBy: referredBy || null,
        coins
      }
    })

    return NextResponse.json({
      message:    'Successfully joined the waitlist!',
      referralId,
      ctaMessage: `Share your link to reach the top 3!`
    }, { status: 200 })

  } catch (err) {
    console.error('Waitlist POST error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
