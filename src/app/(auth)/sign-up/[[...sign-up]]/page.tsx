"use client";

import React, { useEffect, useState } from "react";
import { SignUp, useUser } from "@clerk/nextjs";

const SignUpPage: React.FC = () => {
  const { user, isLoaded } = useUser();
  const [emailSent, setEmailSent] = useState(false);

  // Send welcome email once after signup
  useEffect(() => {
    if (isLoaded && user && !emailSent) {
      const email = user.primaryEmailAddress?.emailAddress;
      const name = user.firstName || user.fullName || "there";
      if (!email) return;

      (async () => {
        console.log(`[WelcomeEmail] sending to ${email}`);
        try {
          const res = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, userName: name }),
          });
          const data = await res.json();
          if (res.ok) {
            console.log("[WelcomeEmail] sent", data);
            setEmailSent(true);
          } else {
            console.error("[WelcomeEmail] error", data);
          }
        } catch (err) {
          console.error("[WelcomeEmail] network error", err);
        }
      })();
    }
  }, [isLoaded, user, emailSent]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-[#2a2e35] via-[#1e1f24] to-black

">
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
            // Container sizing
            rootBox: "w-full max-w-sm mx-auto",
            card: "bg-transparent shadow-none border-none",
            // Small, integrated header
            headerTitle: "text-lg sm:text-xl font-semibold text-white text-center mb-1",
            headerSubtitle: "text-xs sm:text-sm text-gray-400 text-center mb-6",
            // Social buttons
            socialButtonsBlockButton:
              "w-full flex items-center justify-center gap-2 py-2 mb-4 rounded-lg bg-[#1f2937] hover:bg-[#374151] transition",
            socialButtonsBlockButtonText: "text-white font-medium",
            // Divider (“or”)
            dividerLine: "border-t border-gray-700 my-4",
            dividerText: "text-gray-400",
            // Email field
            formFieldLabel: "text-white mb-1 block",
            formFieldInput:
              "w-full mb-4 px-3 py-2 bg-[#1f2937] border border-[#374151] rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500",
            // Primary button
            formButtonPrimary:
              "w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition",
            // Footer link
            footerAction: "text-center text-gray-400 mt-6 text-sm",
            footerActionLink: "text-blue-500 hover:underline",
          },
        }}
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
};

export default SignUpPage;
