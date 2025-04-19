"use client";

import React, { useEffect, useState } from "react";
import { SignUp, useUser } from "@clerk/nextjs";

const SignUpPage: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // once Clerk has loaded the user and we haven't emailed yet
    if (isLoaded && user && !emailSent) {
      const primaryEmail = user.primaryEmailAddress?.emailAddress;
      const name = user.firstName || user.fullName || "there";

      if (!primaryEmail) {
        console.warn("[WelcomeEmail] no primary email found, skipping send");
        return;
      }

      const sendWelcomeEmail = async () => {
        try {
          console.log(`[WelcomeEmail] sending to ${primaryEmail}`);
          const res = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: primaryEmail,
              userName: name,
            }),
          });
          const payload = await res.json();

          if (res.ok) {
            console.log("[WelcomeEmail] sent successfully:", payload);
            setEmailSent(true);
          } else {
            console.error("[WelcomeEmail] API error:", payload);
          }
        } catch (err) {
          console.error("[WelcomeEmail] network error:", err);
        }
      };

      sendWelcomeEmail();
    }
  }, [isLoaded, user, emailSent]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md bg-[#0c0c0e] border border-[#1f2937]">
        <SignUp
          appearance={{
            variables: {
              colorPrimary: "#3B82F6",
              colorBackground: "#0c0c0e",
              colorText: "#ffffff",
              colorInputBackground: "#1f2937",
              colorInputText: "#f9fafb",
            },
            elements: {
              card: "bg-[#0c0c0e] shadow-none border-none",
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition",
              formFieldInput:
                "bg-[#1f2937] border border-[#374151] text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500",
              formFieldLabel: "text-white",
              headerTitle: "text-2xl font-bold text-white text-center",
              headerSubtitle: "text-sm text-gray-400 text-center",
              socialButtonsBlockButton:
                "bg-[#1f2937] hover:bg-[#374151] text-white",
              footerAction: "text-gray-400 text-sm",
              footerActionLink: "text-blue-500 hover:underline",
            },
          }}
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
