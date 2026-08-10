import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { getSEO } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSEO();

  if (seo) {
    return {
      title: {
        template: `%s | ${seo.title}`,
        default: seo.title,
      },
      description: seo.description,
      keywords: seo.keywords,
      icons: {
        icon: "/icon.png",
        shortcut: "/icon.png",
        apple: "/icon.png",
      },
      verification: {
        google: "1zQ2ugBoO4bwKnSXSrenHYfkRQ7C9FfAVTsY9Coze2c",
      },
    };
  }

  return {
    title: "Aeronox Solutions | Premium Digital Engineering",
    description: "Architecting digital products that drive growth. Specialized in headless commerce, Next.js applications, and custom backend systems.",
    keywords: ["digital agency", "web engineering", "software development"],
    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
    },
    verification: {
      google: "1zQ2ugBoO4bwKnSXSrenHYfkRQ7C9FfAVTsY9Coze2c",
    },
  };
}

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClientTracker } from "@/components/ui/ClientTracker";
import { SecurityWrapper } from "@/components/ui/SecurityWrapper";
import { auth } from "@/auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className="dark antialiased" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LayoutShell>{children}</LayoutShell>
          {!session && (
            <>
              <ClientTracker />
              <SecurityWrapper />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
