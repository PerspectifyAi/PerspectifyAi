import { NextResponse } from 'next/server'
import { db } from '@/lib/prisma'

export async function GET() {
  try {
    const raw = await db.waitlistUser.findMany({
      orderBy: { coins: 'desc' },
      take: 10,
      select: {
        name:       true,
        referralId: true,
        coins:      true,
        referrals:  true,
      },
    })

    const leaderboard = raw.map((user, index) => ({
      name:       user.name || 'Anonymous',
      referralId: user.referralId,
      coins:      Number(user.coins),
      referrals:  user.referrals,
      rank:       index + 1,
      prize:
        index === 0 ? '6 months premium' :
        index === 1 ? '3 months premium' :
        index === 2 ? '1 month premium' : ''
    }))

    return NextResponse.json({ leaderboard })
  } catch (err) {
    console.error('[Leaderboard API] GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}
