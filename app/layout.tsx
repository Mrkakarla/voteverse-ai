import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import { getSupabaseConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "VoteVerse AI - Your Civic Intelligence Companion",
  description:
    "AI-powered voter education, fake news detection, and election guidance platform",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseConfig = getSupabaseConfig();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__VOTEVERSE_SUPABASE__ = ${JSON.stringify(supabaseConfig)};`,
          }}
        />
        <Providers>
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
