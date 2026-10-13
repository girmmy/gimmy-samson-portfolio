"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Linkedin, Github, Check, Copy } from "lucide-react";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";

const EMAIL = "gimmys943@gmail.com";

export default function Connect() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the address is visible either way.
    }
  };

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        gsap.set(".cta-word", { yPercent: 110 });
        gsap.set(".cta-rise", { autoAlpha: 0, y: 20 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        });
        tl.to(".cta-word", { yPercent: 0, duration: 1, stagger: 0.08, ease: "power4.out" }).to(
          ".cta-rise",
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: EASE },
          "<0.3",
        );

        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="connect" ref={root} className="relative pt-24 md:pt-32 overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 pointer-events-none opacity-60"
      />

      <div className="container-site relative z-10">
        <h2
          className="font-display mb-10"
          style={{
            fontSize: "clamp(3rem, 12vw, 11rem)",
            lineHeight: 0.88,
            fontWeight: 800,
            color: "var(--color-text)",
          }}
        >
          {["LET'S", "BUILD"].map((w) => (
            <span key={w} className="mask block">
              <span className="cta-word block">{w}</span>
            </span>
          ))}
          <span className="mask block">
            <span className="cta-word block" style={{ color: "var(--color-accent)" }}>
              SOMETHING.
            </span>
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-16 md:pb-20">
          <div className="cta-rise">
            <span className="kicker block mb-3" style={{ color: "var(--color-muted)" }}>
              email
            </span>
            <button
              onClick={copyEmail}
              aria-label="Copy email address"
              className="group font-display inline-flex items-center gap-3 text-left"
              style={{
                fontSize: "clamp(1.25rem, 3vw, 2.25rem)",
                fontWeight: 700,
                color: copied ? "var(--color-accent)" : "var(--color-text)",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {EMAIL}
              {copied ? (
                <Check size={20} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
              ) : (
                <Copy size={20} aria-hidden="true" style={{ color: "var(--color-muted)" }} />
              )}
            </button>
            <span
              className="kicker block mt-2"
              style={{ color: copied ? "var(--color-accent)" : "var(--color-muted)" }}
            >
              {copied ? "copied to clipboard" : "click to copy"}
            </span>
          </div>

          <div className="cta-rise flex items-center gap-3">
            <Link
              href="https://github.com/girmmy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-code text-[13px] inline-flex items-center gap-2.5 px-6 py-4"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text)" }}
            >
              <Github size={16} aria-hidden="true" /> GITHUB
            </Link>
            <Link
              href="https://linkedin.com/in/girmachew-samson"
              target="_blank"
              rel="noopener noreferrer"
              className="font-code text-[13px] inline-flex items-center gap-2.5 px-6 py-4"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text)" }}
            >
              <Linkedin size={16} aria-hidden="true" /> LINKEDIN
            </Link>
            <a
              href="/Girmachew_Samson.pdf"
              download
              className="font-code text-[13px] px-6 py-4"
              style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)", fontWeight: 500 }}
            >
              RÉSUMÉ
            </a>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <span className="kicker" style={{ color: "var(--color-muted)" }}>
            © 2026 girmachew samson
          </span>
          <span className="kicker" style={{ color: "var(--color-muted)" }}>
            atlanta, ga · open to internships
          </span>
        </div>
      </div>
    </section>
  );
}
