import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Girmachew (Gimmy) Samson - Award-Winning Frontend Developer & Student Leader",
  description:
    "Portfolio of Gimmy Samson, freelance frontend developer and high school student. 3rd State Webmaster 2025, 5th State Software Development 2025. Specializing in React, AI integration, and responsive web design. View projects and get in touch!",
  keywords: [
    "Gimmy Samson",
    "Girmachew Samson",
    "Frontend Developer",
    "React Developer",
    "Web Developer",
    "Freelance Developer",
    "Student Developer",
    "TSA Webmaster",
    "Parkview High School",
    "AI Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "Next.js Developer",
    "Portfolio Website",
    "Web Development",
    "UI/UX Design",
    "Responsive Design",
    "OpenAI API",
    "Firebase",
    "Tailwind CSS",
  ].join(", "),
  authors: [{ name: "Girmachew (Gimmy) Samson" }],
  creator: "Girmachew (Gimmy) Samson",
  publisher: "Girmachew (Gimmy) Samson",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gimmy-sam.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Girmachew (Gimmy) Samson - Award-Winning Frontend Developer & Student Leader",
    description:
      "Portfolio of Gimmy Samson, freelance frontend developer and high school student. 3rd State Webmaster 2025, 5th State Software Development 2025. Specializing in React, AI integration, and responsive web design.",
    url: "https://gimmy-sam.com",
    siteName: "Gimmy Samson Portfolio",
    images: [
      {
        url: "/gimmy-tsa-headshot.JPG",
        width: 1200,
        height: 630,
        alt: "Gimmy Samson - Frontend Developer and Student Leader",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Girmachew (Gimmy) Samson - Award-Winning Frontend Developer & Student Leader",
    description:
      "Portfolio of Gimmy Samson, freelance frontend developer and high school student. 3rd State Webmaster 2025, 5th State Software Development 2025.",
    images: ["/gimmy-tsa-headshot.JPG"],
    creator: "@girmmy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Girmachew Samson",
              alternateName: "Gimmy Samson",
              jobTitle: "Frontend Developer",
              description:
                "Award-winning frontend developer and high school student specializing in React, AI integration, and responsive web design.",
              url: "https://gimmy-sam.com",
              image: "https://gimmy-sam.com/gimmy-tsa-headshot.JPG",
              sameAs: [
                "https://linkedin.com/in/girmachew-samson",
                "https://github.com/girmmy",
              ],
              knowsAbout: [
                "Frontend Development",
                "React",
                "JavaScript",
                "TypeScript",
                "Next.js",
                "AI Integration",
                "Web Design",
                "Responsive Design",
              ],
              award: [
                "3rd Place State Webmaster 2025 - Technology Student Association",
                "5th Place State Software Development 2025 - Technology Student Association",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Parkview High School",
              },
              worksFor: {
                "@type": "Organization",
                name: "Self-Employed",
              },
            }),
          }}
        />

        {/* Structured Data for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Gimmy Samson Portfolio",
              url: "https://gimmy-sam.com",
              description:
                "Portfolio website showcasing web development projects and skills",
              author: {
                "@type": "Person",
                name: "Girmachew Samson",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://gimmy-sam.com?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Structured Data for CreativeWork - Portfolio */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: "Gimmy Samson Portfolio",
              author: {
                "@type": "Person",
                name: "Girmachew Samson",
              },
              description:
                "Portfolio showcasing web development projects and skills",
              url: "https://gimmy-sam.com",
              genre: "Portfolio",
              keywords:
                "web development, frontend developer, React, JavaScript, portfolio",
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
