"use client";

import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const LINKS = [
  { id: "about", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "credentials", label: "Credentials" },
  { id: "connect", label: "Contact" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.removeProperty("overflow");
    };
  }, [open]);

  useGSAP(
    () => {
      if (!open) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.isMotionOk, () => {
        const tl = gsap.timeline();
        tl.fromTo(".sheet-item", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.05 });
        return () => tl.kill();
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [open] },
  );

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        ref={root}
        className="fixed top-0 inset-x-0 z-50"
        style={{
          background: scrolled ? "color-mix(in srgb, var(--paper) 92%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(8px)" : "none",
          borderBottom: `1px solid ${scrolled ? "var(--rule)" : "transparent"}`,
          transition: "background-color 0.25s ease, border-color 0.25s ease",
        }}
      >
        <div className="container-site flex items-center justify-between h-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-display"
            style={{
              fontSize: "var(--t-base)",
              color: "var(--ink)",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label="Back to top"
          >
            G.&nbsp;Samson
          </button>

          <nav className="hidden md:flex items-center gap-8" aria-label="Sections">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="label"
                style={{ color: "var(--ink-3)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
              >
                {l.label}
              </button>
            ))}
            <ThemeToggle />
          </nav>

          <div className="flex md:hidden items-center gap-6">
            <ThemeToggle />
            <button
              className="label"
              style={{ color: "var(--ink)", background: "none", border: "none", padding: 0, cursor: "pointer" }}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-6"
          style={{ background: "var(--paper)" }}
        >
          <nav className="flex flex-col" aria-label="Sections">
            {LINKS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="sheet-item font-display text-left py-4 flex items-baseline gap-5"
                style={{
                  fontSize: "var(--t-2xl)",
                  color: "var(--ink)",
                  background: "none",
                  border: "none",
                  borderTop: i === 0 ? "none" : "1px solid var(--rule)",
                  cursor: "pointer",
                }}
              >
                <span className="label tnum" style={{ color: "var(--ink-3)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
