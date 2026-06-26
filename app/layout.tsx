import type React from "react";
import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Girmachew Samson — CS @ Georgia Tech",
    template: "%s | Girmachew Samson",
  },
  description:
    "Incoming CS student at Georgia Tech and founder of Bantr, a live debating platform with 250+ users. Building at the intersection of AI, product, and code.",
  keywords: [
    "Gimmy Samson", "Girmachew Samson", "Georgia Tech", "CS Student",
    "Startup Founder", "Bantr", "AI Trainer", "React Developer",
    "Web Developer", "TypeScript Developer", "Next.js Developer", "Portfolio",
  ].join(", "),
  authors: [{ name: "Girmachew (Gimmy) Samson" }],
  creator: "Girmachew (Gimmy) Samson",
  publisher: "Girmachew (Gimmy) Samson",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://gimmy-samson.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Girmachew Samson — CS @ Georgia Tech · Founder of Bantr",
    description:
      "Incoming CS student at Georgia Tech and founder of Bantr, a live debating platform with 250+ users.",
    url: "https://gimmy-samson.com",
    siteName: "Girmachew Samson",
    images: [{ url: "https://gimmy-samson.com/gimmy-headshot.png", width: 1200, height: 630, alt: "Girmachew Samson" }],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Girmachew Samson — CS @ Georgia Tech",
    description:
      "Incoming CS student at Georgia Tech and founder of Bantr.",
    images: ["https://gimmy-samson.com/gimmy-headshot.png"],
    creator: "@girmmy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: { google: "UpJJ0yd7oIKWSY-eVp2wVDkjK3xifMy1mUgYAhAN0XY" },
  category: "technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#F8F8F6" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org", "@type": "Person",
              "@id": "https://gimmy-samson.com/#person",
              name: "Girmachew Samson", alternateName: "Gimmy Samson",
              jobTitle: "CS Student & Startup Founder",
              url: "https://gimmy-samson.com",
              image: "https://gimmy-samson.com/gimmy-headshot.png",
              email: "gimmys943@gmail.com",
              sameAs: ["https://linkedin.com/in/girmachew-samson", "https://github.com/girmmy"],
              memberOf: { "@type": "EducationalOrganization", name: "Georgia Institute of Technology" },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${dmMono.variable} font-inter`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
