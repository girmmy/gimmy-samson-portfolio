"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";

/** Masthead facts. A definition list, because that is what they are. */
const FACTS: [string, string][] = [
  ["Position", "Full stack engineer, LegiCycle"],
  ["Reading", "B.S. Computer Science, Georgia Tech"],
  ["Based", "Atlanta, Georgia"],
  ["Seeking", "SWE and AI/ML internships"],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        gsap.set(".h-line", { yPercent: 105 });
        gsap.set(".h-fade", { autoAlpha: 0, y: 14 });
        gsap.set(".h-rule", { scaleX: 0 });

        const tl = gsap.timeline({ delay: 0.15 });
        tl.to(".h-rule", { scaleX: 1, duration: 0.9, ease: EASE })
          .to(".h-line", { yPercent: 0, duration: 1, stagger: 0.07, ease: "power3.out" }, "<0.05")
          .to(".h-fade", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06, ease: EASE }, "<0.4");

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative min-h-[88svh] flex flex-col justify-center"
      aria-labelledby="hero-heading"
    >
      <div className="container-site w-full pt-28 pb-16 md:pt-36 md:pb-24">
        <p className="h-fade label mb-10" style={{ color: "var(--ink-3)" }}>
          Portfolio — Twenty&nbsp;Twenty&nbsp;Six
        </p>

        <h1
          id="hero-heading"
          className="font-display mb-10"
          style={{
            fontSize: "var(--t-display)",
            lineHeight: 1.02,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
          }}
        >
          <span className="mask block">
            <span className="h-line block">Girmachew</span>
          </span>
          <span className="mask block">
            <span className="h-line block" style={{ fontStyle: "italic", fontWeight: 300 }}>
              Samson
            </span>
          </span>
        </h1>

        <div
          className="h-rule w-full mb-10"
          style={{ height: "1px", background: "var(--rule-strong)", transformOrigin: "0% 50%" }}
          aria-hidden="true"
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20 items-start">
          <div className="h-fade">
            <p
              className="measure mb-8"
              style={{ fontSize: "var(--t-lg)", lineHeight: 1.6, color: "var(--ink-2)" }}
            >
              I build agent infrastructure and full-stack products — an MCP server
              published to npm, a RAG research assistant that reads state and
              federal law, and the security work that keeps a live platform
              standing up for the people who depend on it.
            </p>

            {/* Navigation as a sentence. The underline is the affordance,
                so none of these need an icon to announce themselves. */}
            <p className="measure" style={{ color: "var(--ink-2)" }}>
              Read{" "}
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                className="link"
                style={{ background: "none", border: "none", padding: 0, font: "inherit", cursor: "pointer" }}
              >
                what I&rsquo;ve shipped
              </button>
              , download{" "}
              <a href="/Girmachew_Samson.pdf" download className="link">
                my résumé
              </a>
              , or find me on{" "}
              <Link href="https://github.com/girmmy" target="_blank" rel="noopener noreferrer" className="link">
                GitHub
              </Link>{" "}
              and{" "}
              <Link
                href="https://linkedin.com/in/girmachew-samson"
                target="_blank"
                rel="noopener noreferrer"
                className="link"
              >
                LinkedIn
              </Link>
              .
            </p>
          </div>

          <dl className="h-fade lg:min-w-[19rem]">
            {FACTS.map(([term, value], i) => (
              <div
                key={term}
                className="flex items-baseline justify-between gap-8 py-3"
                style={{ borderTop: i === 0 ? "none" : "1px solid var(--rule)" }}
              >
                <dt className="label flex-shrink-0" style={{ color: "var(--ink-3)" }}>
                  {term}
                </dt>
                <dd className="text-right" style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
