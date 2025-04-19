import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/welcome-email";

// Ensure your API key is present
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("[send-email] ❌ RESEND_API_KEY is not set in your environment");
}
const resend = new Resend(apiKey!);

export async function POST(req: Request) {
  console.log("[send-email] 📩 Received POST /api/send-email");

  try {
    const { email, userName } = await req.json();
    console.log("[send-email] 🔍 Payload:", { email, userName });

    // Validate input
    if (!email || !userName) {
      console.warn("[send-email] ⚠️ Missing email or userName");
      return NextResponse.json(
        { error: "Email and userName are required" },
        { status: 400 }
      );
    }

    // Send the email
    const result = await resend.emails.send({
      from: "PerspectifyAI <team@perspectifyai.com>", // make sure this is a verified sender
      to: email,
      subject: "Welcome to PerspectifyAI 🎉",
      react: WelcomeEmail({ userName }),
    });

    console.log("[send-email] ✅ Email sent successfully:", result);
    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("[send-email] ❌ Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
