// File: app/api/waitlist/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { generateReferralId } from "@/app/lib/utils";
import { Resend } from "resend";
import { WaitlistConfirmationEmail } from "@/emails/waitlist-confirmation-email";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("[send-email] ❌ RESEND_API_KEY is not set in your environment");
}
const resend = new Resend(apiKey!);

export async function POST(req: NextRequest) {
  try {
    // 1) Parse input
    const { name, email, referredBy } = await req.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // 2) Check if already on waitlist
    const existing = await db.waitlistUser.findUnique({ where: { email } });

    if (existing) {
      // Only relink + award if they're switching to a different referrer
      if (referredBy && existing.referredBy !== referredBy) {
        const ref = await db.waitlistUser.findUnique({
          where: { referralId: referredBy },
        });
        if (!ref) {
          return NextResponse.json(
            { error: "Invalid referral code" },
            { status: 400 }
          );
        }

        // Award the new referrer
        await db.waitlistUser.update({
          where: { referralId: referredBy },
          data: { referrals: { increment: 1 } },
        });

        // Link the existing user to the new referrer
        await db.waitlistUser.update({
          where: { email },
          data: { referredBy },
        });
      }

      return NextResponse.json(
        {
          message: "You’re already on the waitlist!",
          referralId: existing.referralId,
        },
        { status: 200 }
      );
    }

    // 3) New signup with optional referral
    let referredByValid: string | null = null;
    if (referredBy) {
      const referrer = await db.waitlistUser.findUnique({
        where: { referralId: referredBy },
      });
      if (!referrer) {
        return NextResponse.json(
          { error: "Invalid referral code" },
          { status: 400 }
        );
      }
      // Increment referrer's count
      await db.waitlistUser.update({
        where: { referralId: referredBy },
        data: { referrals: { increment: 1 } },
      });
      referredByValid = referredBy;
    }

    // 4) Create new user entry
    const referralId = generateReferralId(name);
    const newUser = await db.waitlistUser.create({
      data: { name, email, referralId, referredBy: referredByValid },
    });

    // 5) Send waitlist confirmation email
    try {
      await resend.emails.send({
        from: "PerspectifyAI <community@perspectifyai.com>",
        to: email,
        subject: "You’re on the PerspectifyAI Waitlist! 🎉",
        react: WaitlistConfirmationEmail({ userName: name }),
      });
      console.log(`[send-email] ✅ Waitlist email sent to ${email}`);
    } catch (mailError) {
      console.error("[send-email] ❌ Error sending waitlist email:", mailError);
    }

    return NextResponse.json(
      {
        message: "Successfully joined the waitlist!",
        referralId: newUser.referralId,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Waitlist POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
