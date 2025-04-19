import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/welcome-email";
import { createHmac } from "crypto";

// Get your Clerk webhook secret and Resend API key from the environment variables
const clerkWebhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
const resend = new Resend(process.env.RESEND_API_KEY!);

// Minimal typings for user.created events:
type EmailAddress = { id: string; email_address: string };
interface UserCreatedData {
  id: string;
  email_addresses: EmailAddress[];
  primary_email_address_id: string;
  first_name?: string;
}
interface WebhookEvent {
  type: string;
  data: UserCreatedData;
}

export async function POST(req: Request) {
  // 1️⃣ Read raw body & Clerk signature header
  const signature = req.headers.get("clerk-signature")!;
  const payload = await req.text();

  // 2️⃣ Manually verify Clerk webhook signature
  const hmac = createHmac("sha256", clerkWebhookSecret);
  const digest = hmac.update(payload).digest("hex");

  if (digest !== signature) {
    console.error("[clerk-webhook] ❌ Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // 3️⃣ Parse the event payload
  let event: WebhookEvent;
  try {
    event = JSON.parse(payload);
  } catch (err) {
    console.error("[clerk-webhook] ❌ Error parsing event", err);
    return NextResponse.json({ error: "Failed to parse event" }, { status: 400 });
  }

  // 4️⃣ Only handle new user creations
  if (event.type === "user.created") {
    const { email_addresses, primary_email_address_id, first_name } = event.data;

    const primary = email_addresses.find((e) => e.id === primary_email_address_id);
    const toEmail = primary?.email_address;
    const userName = first_name || "there";

    if (toEmail) {
      try {
        await resend.emails.send({
          from: "PerspectifyAI <team@perspectifyai.com>", // ensure verified
          to: toEmail,
          subject: "Welcome to PerspectifyAI 🎉",
          react: WelcomeEmail({ userName }),
        });
        console.log("[clerk-webhook] ✅ Welcome email sent to", toEmail);
      } catch (err) {
        console.error("[clerk-webhook] ❌ Error sending welcome email", err);
      }
    } else {
      console.warn("[clerk-webhook] ⚠️ No primary email found for user.created");
    }
  }

  // 5️⃣ Always return 200 so Clerk knows we received it
  return NextResponse.json({ received: true });
}
