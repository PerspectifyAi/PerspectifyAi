// app/layout.tsx
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header";
import ThemeToggleButton from "../components/ui/theme-toggle-button";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import HydrationFix from "@/components/HydrationFix";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PERSPECTIFYAI",
  description: "Finance Platform",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          <link rel="icon" href="/logo.png" type="image/png" sizes="any" />
        </head>
        <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
          <HydrationFix>
            {/* Navbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card shadow-sm">
              <Header />
              <ThemeToggleButton />
            </div>

            {/* Main Content */}
            <main className="min-h-screen px-4 py-4 animate-fadeIn">
              {children}
            </main>

            {/* Notifications */}
            <Toaster richColors />
          </HydrationFix>
        </body>
      </html>
    </ClerkProvider>
  );
}
