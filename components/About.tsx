"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import Stats from "@/components/Stats";

/** Set as prose lines rather than a four-column grid of chips. */
const STACK: [string, string][] = [
  ["Languages", "Python, TypeScript, JavaScript, Java, SQL"],
  ["Frameworks", "React, React Native, Next.js, Node.js, Django/DRF, Electron"],
  ["Data and cloud", "PostgreSQL, Redis, Supabase, AWS (ECS, Cognito, RDS), Terraform, Docker"],
  ["AI and security", "Claude API, OpenAI API, RAG, Model Context Protocol, NIST 800-53, OWASP"],
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.isMotionOk, () => {
        const items = gsap.utils.toArray<HTMLElement>(".reveal");
        gsap.set(items, { autoAlpha: 0, y: 16 });
        const triggers = ScrollTrigger.batch(items, {
          start: "top 90%",
          onEnter: (b) =>
            gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: EASE, overwrite: true }),
        });
        return () => {
          triggers.forEach((t) => t.kill());
          gsap.set(items, { clearProps: "all" });
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading index="01" className="mb-14 md:mb-20">
          A short account
        </SectionHeading>

        <div className="spine mb-20">
          <div />
          <div>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-16 items-start">
              <div className="measure">
                {/* Opening line set larger — a standfirst, as a printed
                    piece would do, rather than a uniform wall of text. */}
                <p
                  className="reveal mb-7"
                  style={{ fontSize: "var(--t-xl)", lineHeight: 1.45, color: "var(--ink)" }}
                >
                  I&rsquo;m a computer science student at Georgia Tech and a full
                  stack engineer at{" "}
                  <Link
                    href="https://legicycle.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    LegiCycle
                  </Link>
                  , where I work on the platform legislators use to research,
                  draft, and stress-test bills.
                </p>

                <p className="reveal mb-6" style={{ color: "var(--ink-2)" }}>
                  Day to day that means hardening a live AWS deployment against
                  NIST&nbsp;800-53 and OWASP, and expanding a RAG research
                  assistant from Georgia-only coverage out to Delaware and
                  federal law. The work I&rsquo;m proudest of there is
                  unglamorous: a bug across twenty-nine Django routes that had
                  been quietly locking invited collaborators out of their own
                  projects.
                </p>

                <p className="reveal mb-6" style={{ color: "var(--ink-2)" }}>
                  Before LegiCycle I founded{" "}
                  <Link
                    href="https://bantr.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Bantr
                  </Link>
                  , a live debating platform that reached 250&nbsp;users in open
                  beta, and spent a semester at Sonaara shipping
                  identity-verification and messaging into a React Native app
                  used by 600&nbsp;people.
                </p>

                <p className="reveal" style={{ color: "var(--ink-2)" }}>
                  Outside of that I build agent infrastructure — an MCP server
                  for Google Tasks published to npm and the official registry, a
                  self-hosted opportunity tracker an agent keeps up to date, and
                  a lectionary app that serves Ge&rsquo;ez and Amharic readings
                  offline.
                </p>
              </div>

              <figure className="reveal">
                <div style={{ border: "1px solid var(--rule)" }}>
                  <Image
                    src="/gimmy-headshot.png"
                    alt="Girmachew Samson"
                    width={240}
                    height={300}
                    className="w-full object-cover object-[center_15%]"
                    style={{ aspectRatio: "4/5" }}
                    priority
                  />
                </div>
                <figcaption className="label mt-3" style={{ color: "var(--ink-3)" }}>
                  Atlanta, Georgia
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Stack as a definition list, not a grid of equal cards. */}
        <dl className="spine">
          <span className="label" style={{ color: "var(--ink-3)" }}>
            Tools
          </span>
          <div>
            {STACK.map(([term, value], i) => (
              <div
                key={term}
                className="reveal grid gap-1 md:grid-cols-[11rem_minmax(0,1fr)] gap-x-8 py-4"
                style={{ borderTop: i === 0 ? "1px solid var(--rule)" : "1px solid var(--rule)" }}
              >
                <dt className="label" style={{ color: "var(--ink-3)" }}>
                  {term}
                </dt>
                <dd style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>{value}</dd>
              </div>
            ))}
          </div>
        </dl>
      </div>

      <div className="mt-20 md:mt-28">
        <Stats />
      </div>
    </section>
  );
}
