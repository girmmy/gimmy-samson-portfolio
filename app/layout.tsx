import type React from "react";
import type { Metadata } from "next";
import { Fraunces, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// Two faces, both serif, doing different jobs: Fraunces is a display
// face with optical-size and "wonk" axes that give the headings some
// character; Newsreader is a text face built to be read at length.
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const text = Newsreader({
  subsets: ["latin"],
  variable: "--font-text",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Girmachew Samson — CS @ Georgia Tech",
    template: "%s | Girmachew Samson",
  },
  description:
    "CS student at Georgia Tech and full stack engineer at LegiCycle, an AI platform for legislative research and drafting. Building at the intersection of AI, product, and code.",
  keywords: [
    "Gimmy Samson", "Girmachew Samson", "Georgia Tech", "CS Student",
    "Full Stack Engineer", "LegiCycle", "AI Engineer", "React Developer",
    "Web Developer", "TypeScript Developer", "Next.js Developer", "Portfolio",
    "LinkedIn Future Possibilities Scholar", "Gates Scholarship",
  ].join(", "),
  authors: [{ name: "Girmachew (Gimmy) Samson" }],
  creator: "Girmachew (Gimmy) Samson",
  publisher: "Girmachew (Gimmy) Samson",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://gimmy-samson.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Girmachew Samson — CS @ Georgia Tech · Full Stack Engineer at LegiCycle",
    description:
      "CS student at Georgia Tech and full stack engineer at LegiCycle, an AI platform for legislative research and drafting.",
    url: "https://gimmy-samson.com",
    siteName: "Girmachew Samson",
    images: [{ url: "https://gimmy-samson.com/opengraph-image", width: 1200, height: 630, alt: "Girmachew Samson" }],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Girmachew Samson — CS @ Georgia Tech",
    description:
      "CS student at Georgia Tech and full stack engineer at LegiCycle.",
    images: ["https://gimmy-samson.com/opengraph-image"],
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
        <meta name="theme-color" content="#FBF8F2" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#15120F" media="(prefers-color-scheme: dark)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org", "@type": "Person",
                "@id": "https://gimmy-samson.com/#person",
                name: "Girmachew Samson", alternateName: "Gimmy Samson",
                jobTitle: "CS Student & Full Stack Engineer",
                url: "https://gimmy-samson.com",
                image: "https://gimmy-samson.com/gimmy-headshot.png",
                email: "gimmys943@gmail.com",
                sameAs: ["https://linkedin.com/in/girmachew-samson", "https://github.com/girmmy"],
                memberOf: { "@type": "EducationalOrganization", name: "Georgia Institute of Technology" },
                worksFor: { "@type": "Organization", name: "LegiCycle", description: "AI platform for legislative research, drafting, and compliance", url: "https://legicycle.ai" },
                knowsAbout: ["Artificial Intelligence", "React", "Next.js", "TypeScript", "Python", "Django", "AWS", "Application Security", "Product Development"],
                award: ["LinkedIn Future Possibilities in Tech Scholar", "Teamsters Scholarship Fund Recipient", "Gates Scholarship Semi-Finalist", "AP Scholar with Distinction"],
              },
              {
                "@context": "https://schema.org", "@type": "WebSite",
                "@id": "https://gimmy-samson.com/#website",
                url: "https://gimmy-samson.com",
                name: "Girmachew Samson",
                description: "Portfolio of Girmachew (Gimmy) Samson — CS student at Georgia Tech and full stack engineer at LegiCycle.",
                inLanguage: "en-US",
                about: { "@id": "https://gimmy-samson.com/#person" },
              },
            ]),
          }}
        />
      </head>
      <body className={`${display.variable} ${text.variable} font-text`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
