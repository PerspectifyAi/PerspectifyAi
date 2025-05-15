// ✅ File: app/api/waitlist/lookup/route.ts
export const runtime = 'nodejs'; // Required for Prisma with TCP

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  try {
    const user = await db.waitlistUser.findUnique({
      where: { email },
      select: { referralId: true },
    });

    if (!user?.referralId) {
      return NextResponse.json({ error: 'Referral ID not found' }, { status: 404 });
    }

    return NextResponse.json({ referralId: user.referralId }, { status: 200 });
  } catch (error) {
    console.error('Error during referral lookup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
