import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const ref  = url.searchParams.get('ref')
  if (!ref) {
    return NextResponse.json({ error: 'Missing ref code' }, { status: 400 })
  }

  try {
    const user = await db.waitlistUser.findUnique({
      where: { referralId: ref },
      select: { referrals: true }
    })
    if (!user) {
      return NextResponse.json({ error: 'Invalid referral code' }, { status: 404 })
    }
    return NextResponse.json({ referralCount: user.referrals })
  } catch (err) {
    console.error('Referral-count GET error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
