import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { prisma } from "@/lib/db";
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
  const seo = await prisma.sEO.findFirst();
  
  return {
    title: {
      default: seo?.title || "Aeronox Solutions | Premium Digital Engineering",
      template: "%s | Aeronox Solutions",
    },
    description: seo?.description || "Architecting digital products that drive growth. Specialized in headless commerce, Next.js applications, and custom backend systems.",
    keywords: seo?.keywords?.split(",") || ["digital agency", "web engineering", "software development"],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground font-sans`}
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
