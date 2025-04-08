"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md p-6 rounded-xl shadow-md bg-[#0c0c0e] border border-[#1f2937]">
        <SignIn
          appearance={{
            variables: {
              colorPrimary: "#3B82F6", // blue-500
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
                "bg-[#1f2937] hover:bg-[#374151] text-white font-medium flex items-center justify-center gap-2 px-4 py-2 rounded transition border border-[#374151]",
              socialButtonsBlockButtonText: "text-white font-medium",
              footerAction: "text-gray-400 text-sm",
              footerActionLink: "text-blue-500 hover:underline",
            },
          }}
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
        />
      </div>
    </div>
  );
}
