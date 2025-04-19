"use server";

import { Resend, CreateEmailResponse } from "resend";
import { WelcomeEmail } from "@/emails/welcome-email";

interface SendEmailBaseParams {
  to: string;
  subject?: string;
}

type EmailType = "welcome";

interface SendEmailParams extends SendEmailBaseParams {
  type: EmailType;
  payload?: Record<string, unknown>;
}

interface SendEmailResult {
  success: boolean;
  data?: CreateEmailResponse;
  error?: unknown;
}

export async function sendEmail({
  to,
  subject,
  type,
  payload = {},
}: SendEmailParams): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const resend = new Resend(apiKey);

  let react: React.ReactElement | null = null;
  let resolvedSubject = subject;

  switch (type) {
    case "welcome": {
      const userName = String(payload.userName || "");
      react = <WelcomeEmail userName= {userName} />;
      resolvedSubject ||= "Welcome to Perspectifi!";
      break;
    }
    default:
      throw new Error(`Unknown email type: ${type}`);
  }

  if (!react) {
    return { success: false, error: "No email component generated" };
  }

  try {
    const data = await resend.emails.send({
      from: "Perspectifi <no-reply@perspectifi.com>",
      to,
      subject: resolvedSubject!,
      react,
    });

    return { success: true, data };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to send email:", message);
    return { success: false, error: message };
  }
}
