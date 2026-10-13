"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";

const EMAIL = "gimmys943@gmail.com";

const CHANNELS: [string, string, string][] = [
  ["GitHub", "github.com/girmmy", "https://github.com/girmmy"],
  ["LinkedIn", "girmachew-samson", "https://linkedin.com/in/girmachew-samson"],
  ["Résumé", "Girmachew_Samson.pdf", "/Girmachew_Samson.pdf"],
];

export default function Connect() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be refused; the address is written out in
      // full either way, so nothing is lost.
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.isMotionOk, () => {
        gsap.set(".c-line", { yPercent: 105 });
        gsap.set(".c-fade", { autoAlpha: 0, y: 14 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
        });
        tl.to(".c-line", { yPercent: 0, duration: 0.95, stagger: 0.07, ease: "power3.out" }).to(
          ".c-fade",
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: EASE },
          "<0.35",
        );

        return () => tl.scrollTrigger?.kill();
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="connect" ref={root} className="pt-20 md:pt-28">
      <div className="container-site">
        <div className="w-full mb-10" style={{ height: "1px", background: "var(--rule-strong)" }} />

        <h2
          className="font-display mb-8"
          style={{
            fontSize: "var(--t-3xl)",
            lineHeight: 1.05,
            fontWeight: 400,
            letterSpacing: "-0.015em",
            color: "var(--ink)",
          }}
        >
          <span className="mask block">
            <span className="c-line block">Say hello.</span>
          </span>
        </h2>

        <div className="spine pb-16 md:pb-24">
          <span className="c-fade label" style={{ color: "var(--ink-3)" }}>
            Contact
          </span>

          <div>
            <p className="c-fade measure mb-8" style={{ fontSize: "var(--t-lg)", color: "var(--ink-2)" }}>
              I&rsquo;m looking for software engineering and AI/ML internships, and
              I&rsquo;m glad to talk about anything on this page — the agent
              tooling especially.
            </p>

            <dl className="c-fade">
              <div
                className="grid gap-x-8 gap-y-1 md:grid-cols-[7rem_minmax(0,1fr)] items-baseline py-4"
                style={{ borderTop: "1px solid var(--rule)" }}
              >
                <dt className="label" style={{ color: "var(--ink-3)" }}>
                  Email
                </dt>
                <dd className="flex flex-wrap items-baseline gap-x-4">
                  <a href={`mailto:${EMAIL}`} className="link">
                    {EMAIL}
                  </a>
                  <button
                    onClick={copyEmail}
                    className="label"
                    style={{
                      color: copied ? "var(--accent)" : "var(--ink-3)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    {copied ? "Copied" : "Copy address"}
                  </button>
                  {/* Announced politely, so the confirmation is not silent
                      for screen reader users. */}
                  <span aria-live="polite" className="sr-only">
                    {copied ? "Email address copied to clipboard" : ""}
                  </span>
                </dd>
              </div>

              {CHANNELS.map(([term, text, href]) => (
                <div
                  key={term}
                  className="grid gap-x-8 gap-y-1 md:grid-cols-[7rem_minmax(0,1fr)] items-baseline py-4"
                  style={{ borderTop: "1px solid var(--rule)" }}
                >
                  <dt className="label" style={{ color: "var(--ink-3)" }}>
                    {term}
                  </dt>
                  <dd>
                    <Link
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="link"
                    >
                      {text}
                    </Link>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-6"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <p className="label" style={{ color: "var(--ink-3)" }}>
            © Twenty Twenty-Six, Girmachew Samson
          </p>
          <p className="label" style={{ color: "var(--ink-3)" }}>
            Set in Fraunces and Newsreader
          </p>
        </div>
      </div>
    </section>
  );
}
