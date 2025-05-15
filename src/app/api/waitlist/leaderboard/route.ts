import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET() {
  try {
    const raw = await db.waitlistUser.findMany({
      orderBy: { referrals: 'desc' },
      take: 10,
      select: {
        name:       true,
        referralId: true,
        referrals:  true,
      },
    })

    const leaderboard = raw.map((user, index) => ({
      name:      user.name || 'Anonymous',
      referralId: user.referralId,
      referrals: user.referrals,
      rank:      index + 1,
    }))

    return NextResponse.json({ leaderboard })
  } catch (err) {
    console.error('[Leaderboard API] GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}
