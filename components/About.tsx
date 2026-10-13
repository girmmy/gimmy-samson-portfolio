"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";
import SectionHeading from "@/components/SectionHeading";
import Stats from "@/components/Stats";

const STACK = [
  { label: "languages", items: ["Python", "TypeScript", "JavaScript", "Java", "SQL"] },
  {
    label: "frameworks",
    items: ["React", "React Native", "Next.js", "Node.js", "Django / DRF", "Electron"],
  },
  { label: "data & cloud", items: ["PostgreSQL", "Redis", "Supabase", "AWS", "Terraform", "Docker"] },
  { label: "ai & security", items: ["Claude API", "OpenAI API", "RAG", "MCP", "NIST 800-53", "OWASP"] },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        const items = gsap.utils.toArray<HTMLElement>(".reveal");
        gsap.set(items, { autoAlpha: 0, y: 22 });

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
        <SectionHeading index="01" label="profile" className="mb-14 md:mb-20">
          Who I Am
        </SectionHeading>

        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-20 items-start mb-20">
          <div>
            <p
              className="reveal font-body mb-8"
              style={{ fontSize: "clamp(1.1rem, 1.9vw, 1.5rem)", lineHeight: 1.5, color: "var(--color-text)" }}
            >
              I&apos;m a CS student at Georgia Tech and a full stack engineer at
              LegiCycle, where I work on the AI platform legislators use to
              research, draft, and stress-test bills.
            </p>
            <p className="reveal font-body text-[16px] mb-8" style={{ color: "var(--color-body)" }}>
              Day to day that means hardening a live AWS deployment against NIST
              800-53 and OWASP, and expanding a RAG research assistant from
              Georgia-only coverage out to Delaware and federal law. Before
              LegiCycle I founded Bantr, a live debating platform that reached
              250+ users in open beta, and I spent a semester at Sonaara shipping
              identity-verification and messaging into a React Native app with
              600+ users.
            </p>
            <p className="reveal font-body text-[16px]" style={{ color: "var(--color-body)" }}>
              Outside of work I build agent infrastructure — an MCP server for
              Google Tasks that&apos;s published to npm and the official registry,
              a self-hosted opportunity tracker a Claude agent keeps up to date,
              and a lectionary app that serves Ge&apos;ez and Amharic readings
              offline. Currently looking for SWE and AI/ML internships.
            </p>
          </div>

          <div className="reveal">
            <div
              className="relative w-full max-w-[320px]"
              style={{ aspectRatio: "1", border: "1px solid var(--color-border)" }}
            >
              <Image
                src="/gimmy-headshot.png"
                alt="Girmachew Samson"
                width={320}
                height={320}
                className="w-full h-full object-cover object-[center_15%]"
                priority
              />
              <span
                className="absolute bottom-0 left-0 kicker px-3 py-1.5"
                style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
              >
                atlanta, ga
              </span>
            </div>
          </div>
        </div>

        {/* Stack table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STACK.map((group) => (
            <div key={group.label} className="reveal">
              <div
                className="flex items-center justify-between pb-2 mb-4"
                style={{ borderBottom: "1px solid var(--color-accent)" }}
              >
                <span className="kicker" style={{ color: "var(--color-accent)" }}>
                  {group.label}
                </span>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-code text-[13px]"
                    style={{ color: "var(--color-body)" }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <Stats />
      </div>
    </section>
  );
}
