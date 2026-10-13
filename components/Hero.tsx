"use client";

import { useRef } from "react";
import Link from "next/link";
import { Github, Linkedin, ArrowDownRight } from "lucide-react";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";

const META = [
  ["role", "full stack engineer @ legicycle"],
  ["study", "b.s. computer science · georgia tech"],
  ["focus", "agent infrastructure · mcp · appsec"],
  ["status", "open to swe / ai-ml internships"],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        gsap.set([".hero-rise", ".hero-meta-row"], { autoAlpha: 0, y: 26 });
        gsap.set(".hero-word", { yPercent: 115 });
        gsap.set(".hero-hr", { scaleX: 0 });

        // Boot overlay owns the first ~2.4s; start under it so the name is
        // already moving as the panel splits.
        let delay = 2.15;
        try {
          if (sessionStorage.getItem("gs-boot") === "1") delay = 0.1;
        } catch {
          /* non-fatal */
        }

        const tl = gsap.timeline({ delay });

        tl.to(".hero-hr", { scaleX: 1, duration: 0.8, ease: EASE })
          .to(
            ".hero-word",
            { yPercent: 0, duration: 1.05, stagger: 0.09, ease: "power4.out" },
            "<0.1",
          )
          .to(
            ".hero-rise",
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: EASE },
            "<0.45",
          )
          .to(
            ".hero-meta-row",
            { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: EASE },
            "<0.1",
          );

        return () => tl.kill();
      });

      // Parallax on the way out — desktop only.
      mm.add(MQ.isDesktop, () => {
        const out = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });
        out
          .to(".hero-name", { yPercent: -18, ease: "none" }, 0)
          .to(".hero-side", { yPercent: -45, ease: "none" }, 0)
          .to(".hero-grid", { yPercent: 12, ease: "none" }, 0);

        return () => out.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="hero"
      ref={root}
      className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Exposed measuring grid */}
      <div
        aria-hidden="true"
        className="hero-grid bg-grid bg-grid-fade absolute inset-0 pointer-events-none"
        style={{ willChange: "transform" }}
      />
      {/* Accent bloom, bottom-left */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          maxWidth: "820px",
          maxHeight: "820px",
          background: "var(--color-glow)",
          filter: "blur(130px)",
        }}
      />

      <div className="container-site relative z-10 w-full pt-28 pb-10 md:pb-14">
        {/* Top meta strip */}
        <div className="hero-side grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-3 mb-10 md:mb-14">
          {META.map(([k, v]) => (
            <div key={k} className="hero-meta-row">
              <span className="kicker block mb-1" style={{ color: "var(--color-muted)" }}>
                {k}
              </span>
              <span className="font-code text-[13px]" style={{ color: "var(--color-body)" }}>
                {v}
              </span>
            </div>
          ))}
        </div>

        <div
          className="hero-hr w-full mb-6 md:mb-8"
          style={{
            height: "1px",
            background: "var(--color-accent)",
            transformOrigin: "0% 50%",
          }}
          aria-hidden="true"
        />

        {/* The name, as large as the viewport will take */}
        <h1
          id="hero-heading"
          className="hero-name font-display mb-6 md:mb-9"
          style={{
            fontSize: "var(--text-display)",
            lineHeight: 0.86,
            fontWeight: 800,
            color: "var(--color-text)",
            willChange: "transform",
          }}
        >
          <span className="mask block">
            <span className="hero-word block">GIRMACHEW</span>
          </span>
          <span className="mask block">
            <span className="hero-word block" style={{ color: "var(--color-accent)" }}>
              SAMSON
            </span>
          </span>
        </h1>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p
            className="hero-rise font-body max-w-xl"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "var(--color-body)" }}
          >
            I build agent infrastructure and full-stack products — MCP servers,
            RAG systems, and the security work that keeps them standing up.
          </p>

          <div className="hero-rise flex items-center gap-3 flex-wrap">
            <button
              onClick={() => scrollTo("work")}
              className="group font-code text-[13px] inline-flex items-center gap-2 px-6 py-3.5 transition-colors duration-200"
              style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)", fontWeight: 500 }}
            >
              SELECTED WORK
              <ArrowDownRight size={15} aria-hidden="true" />
            </button>
            <a
              href="/Girmachew_Samson.pdf"
              download
              className="font-code text-[13px] px-6 py-3.5 transition-colors duration-200 hover:border-[var(--color-accent)]"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text)" }}
            >
              RÉSUMÉ
            </a>
            <Link
              href="https://github.com/girmmy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="grid place-items-center transition-colors duration-200"
              style={{ width: "48px", height: "48px", border: "1px solid var(--color-border)", color: "var(--color-body)" }}
            >
              <Github size={17} aria-hidden="true" />
            </Link>
            <Link
              href="https://linkedin.com/in/girmachew-samson"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="grid place-items-center transition-colors duration-200"
              style={{ width: "48px", height: "48px", border: "1px solid var(--color-border)", color: "var(--color-body)" }}
            >
              <Linkedin size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
