"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { useReducedMotion, motion } from "framer-motion";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import FloatingIcons from "@/components/FloatingIcons";
import DeferredMount from "@/components/DeferredMount";

const WORDS = ["Girmachew", "Samson"];
const FULL_NAME = WORDS.join(" ");
const CHARS = FULL_NAME.split("");

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const hero = useRef<HTMLElement>(null);

  // Depth on scroll-out: the glow, the floating icons and the copy leave at
  // three different rates. Desktop only — on a phone the viewport is short
  // enough that the hero is gone before parallax reads, and skipping it keeps
  // scrolling cheap.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isDesktop, () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        });

        tl.to(".hero-glow", { yPercent: 28, scale: 1.12, ease: "none" }, 0)
          .to(".hero-icons", { yPercent: 16, ease: "none" }, 0)
          .to(".hero-copy", { yPercent: -14, autoAlpha: 0.15, ease: "none" }, 0);

        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: hero },
  );

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      ref={hero}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="hero-glow absolute pointer-events-none"
        style={{
          willChange: "transform",
          top: "-15%",
          left: "-8%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "var(--color-accent-dim)",
          filter: "blur(140px)",
        }}
      />

      {/* Floating tech icons (right side) — deferred so they don't block initial paint */}
      <div className="hero-icons" style={{ willChange: "transform" }}>
        <DeferredMount>
          <FloatingIcons />
        </DeferredMount>
      </div>

      <div className="hero-copy container-site w-full min-w-0 relative z-10 pt-28 pb-28 md:pt-36 md:pb-36">
        {/* Social icons — above name */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-4 mb-4"
        >
          <Link
            href="https://linkedin.com/in/girmachew-samson"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="transition-colors duration-150"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
          >
            <Linkedin size={24} aria-hidden="true" />
          </Link>
          <Link
            href="https://github.com/girmmy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="transition-colors duration-150"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
          >
            <Github size={24} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Name — character stagger */}
        <h1
          id="hero-heading"
          className="font-clash font-bold leading-[0.95] mb-8"
          style={{
            fontSize: "var(--text-display)",
            color: "var(--color-text)",
          }}
          aria-label={FULL_NAME}
        >
          {shouldReduce ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {FULL_NAME}
            </motion.span>
          ) : (
            <>
              {WORDS.map((word, wi) => {
                const offset = wi === 0 ? 0 : WORDS[0].length + 1;
                return (
                  <span
                    key={wi}
                    style={{ display: "inline-block", whiteSpace: "nowrap" }}
                  >
                    {word.split("").map((char, ci) => (
                      <motion.span
                        key={ci}
                        aria-hidden="true"
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + (offset + ci) * 0.03,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wi < WORDS.length - 1 && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + (offset + word.length) * 0.03,
                        }}
                        style={{ display: "inline-block", whiteSpace: "pre" }}
                      >
                        {" "}
                      </motion.span>
                    )}
                  </span>
                );
              })}
            </>
          )}
        </h1>

        {/* Subtitle — Inter, bigger */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduce ? 0.1 : 0.75 }}
          className="font-inter mb-12 flex items-center gap-3 flex-wrap"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            color: "var(--color-body)",
          }}
        >
          <span>CS @ Georgia Tech</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: shouldReduce ? 0.1 : 1.1 }}
            style={{ color: "var(--color-accent)", fontWeight: "bold" }}
          >
            ·
          </motion.span>
          <span>Full Stack Engineer, LegiCycle</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: shouldReduce ? 0.1 : 1.2 }}
            style={{ color: "var(--color-accent)", fontWeight: "bold" }}
          >
            ·
          </motion.span>
          <span>AI Enthusiast</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduce ? 0.2 : 0.9 }}
          className="flex items-center gap-6 flex-wrap"
        >
          <button
            onClick={() => scrollTo("work")}
            className="font-inter font-medium text-base px-8 py-3 rounded-sm transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              border: "1.5px solid var(--color-accent)",
              color: "var(--color-accent)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
          >
            View Work
          </button>
          <a
            href="/Girmachew_Samson.pdf"
            download
            className="font-inter font-medium text-base px-8 py-3 rounded-sm transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-bg)",
              border: "1.5px solid var(--color-accent)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-bg)";
            }}
          >
            Download Resume
          </a>
          <button
            onClick={() => scrollTo("connect")}
            className="font-inter text-base transition-colors duration-150"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-muted)")
            }
          >
            Get In Touch →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
