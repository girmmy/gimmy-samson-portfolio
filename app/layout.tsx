import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Gimmy Samson - Freelance Frontend Developer | React & AI Specialist",
    template: "%s | Gimmy Samson Portfolio"
  },
  description:
    "Award-winning freelance frontend developer and high school student. 3rd State Webmaster 2025, 5th State Software Development 2025. Specializing in React, Next.js, TypeScript, AI integration, and responsive web design. 15+ custom projects delivered. View my work and get in touch!",
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
  metadataBase: new URL("https://gimmy-samson.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gimmy Samson - Award-Winning Freelance Frontend Developer",
    description:
      "Award-winning freelance frontend developer. 3rd State Webmaster 2025, 5th State Software Development 2025. Specializing in React, Next.js, TypeScript, and AI integration. 15+ custom projects delivered.",
    url: "https://gimmy-samson.com",
    siteName: "Gimmy Samson Portfolio",
    images: [
      {
        url: "https://gimmy-samson.com/gimmy-tsa-headshot.png",
        width: 1200,
        height: 630,
        alt: "Gimmy Samson - Award-Winning Frontend Developer and Student Leader",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gimmy Samson - Award-Winning Freelance Frontend Developer",
    description:
      "Award-winning freelance frontend developer. 3rd State Webmaster 2025, 5th State Software Development 2025. React, Next.js, TypeScript & AI specialist.",
    images: ["https://gimmy-samson.com/gimmy-tsa-headshot.png"],
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Structured Data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://gimmy-samson.com/#person",
              name: "Girmachew Samson",
              alternateName: "Gimmy Samson",
              givenName: "Girmachew",
              familyName: "Samson",
              jobTitle: "Freelance Frontend Developer",
              description:
                "Award-winning freelance frontend developer and high school student specializing in React, Next.js, TypeScript, AI integration, and responsive web design. Winner of 3rd State Webmaster and 5th State Software Development 2025.",
              url: "https://gimmy-samson.com",
              image: "https://gimmy-samson.com/gimmy-tsa-headshot.png",
              email: "gimmys943@gmail.com",
              sameAs: [
                "https://linkedin.com/in/girmachew-samson",
                "https://github.com/girmmy",
              ],
              knowsAbout: [
                "Frontend Development",
                "React",
                "React Native",
                "JavaScript",
                "TypeScript",
                "Next.js",
                "AI Integration",
                "OpenAI API",
                "Firebase",
                "Web Design",
                "Responsive Design",
                "Tailwind CSS",
                "Node.js",
                "REST APIs"
              ],
              award: [
                {
                  "@type": "Award",
                  name: "3rd Place State Webmaster 2025",
                  issuedBy: {
                    "@type": "Organization",
                    name: "Technology Student Association"
                  },
                  dateAwarded: "2025"
                },
                {
                  "@type": "Award",
                  name: "5th Place State Software Development 2025",
                  issuedBy: {
                    "@type": "Organization",
                    name: "Technology Student Association"
                  },
                  dateAwarded: "2025"
                }
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Parkview High School",
              },
              worksFor: {
                "@type": "Organization",
                name: "Self-Employed",
              },
              hasOccupation: {
                "@type": "Occupation",
                name: "Freelance Frontend Developer",
                occupationLocation: {
                  "@type": "Country",
                  name: "United States"
                },
                skills: "React, Next.js, TypeScript, JavaScript, AI Integration, OpenAI API, Firebase, Tailwind CSS"
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
              url: "https://gimmy-samson.com",
              description:
                "Portfolio website showcasing web development projects and skills",
              author: {
                "@type": "Person",
                name: "Girmachew Samson",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://gimmy-samson.com?search={search_term_string}",
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
              url: "https://gimmy-samson.com",
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
