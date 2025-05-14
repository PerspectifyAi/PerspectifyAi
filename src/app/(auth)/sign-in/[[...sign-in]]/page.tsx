"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-gradient-to-br from-[#2a2e35] via-[#1e1f24] to-black">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#3B82F6",
            colorBackground: "#0c0c0e",
            colorText: "#ffffff",
            colorInputBackground: "#1f2937",
            colorInputText: "#f9fafb",
          },
          elements: {
            rootBox: "w-full max-w-sm mx-auto",
            card: "bg-transparent shadow-none border-none",
            headerTitle: "text-lg sm:text-xl font-semibold text-white text-center mb-1",
            headerSubtitle: "text-xs sm:text-sm text-gray-400 text-center mb-6",
            socialButtonsBlockButton:
              "w-full flex items-center justify-center gap-2 py-2 mb-4 rounded-lg bg-[#1f2937] hover:bg-[#374151] transition",
            socialButtonsBlockButtonText: "text-white font-medium",
            dividerLine: "border-t border-gray-700 my-4",
            dividerText: "text-gray-400",
            formFieldLabel: "text-white mb-1 block",
            formFieldInput:
              "w-full mb-4 px-3 py-2 bg-[#1f2937] border border-[#374151] rounded-lg text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500",
            formButtonPrimary:
              "w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition",
            footerAction: "text-center text-gray-400 mt-6 text-sm",
            footerActionLink: "text-blue-500 hover:underline",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        afterSignInUrl="/dashboard"
      />
    </div>
  );
}
