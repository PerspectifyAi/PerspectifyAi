import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

import Header from '../components/header';
import ThemeToggleButton from '../components/ui/theme-toggle-button';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import HydrationFix from '@/components/HydrationFix';
import ClientWrapper from './ClientWrapper';
import ReferralSync from '@/components/ReferralSync';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'PERSPECTIFYAI',
  description: 'Finance Platform',
  icons: {
    icon: '/logo.png', 
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <head>
          {/* Meta tags for SEO */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" /> {/* Custom theme color for mobile */}
        </head>
        <body
          suppressHydrationWarning
          className={`${inter.variable} font-sans bg-background text-foreground antialiased`}
        >
          <HydrationFix>
            <ClientWrapper>
              {/* Sync referral info if any */}
              <ReferralSync />

              {/* Top bar with header and theme switcher */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card shadow-sm">
                <Header />
                <ThemeToggleButton />
              </div>

              {/* Page Content */}
              <main className="min-h-screen px-4 py-4 animate-fadeIn">
                {children}
              </main>

              {/* Toast Notification */}
              <Toaster richColors position="top-right" />
            </ClientWrapper>
          </HydrationFix>
        </body>
      </html>
    </ClerkProvider>
  );
}
