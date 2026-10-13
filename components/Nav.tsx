"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const LINKS = [
  { id: "about", label: "01 / profile" },
  { id: "experience", label: "02 / experience" },
  { id: "work", label: "03 / work" },
  { id: "certificates", label: "04 / credentials" },
  { id: "connect", label: "05 / connect" },
];

export default function Nav() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on Escape, and lock the page behind it.
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
        tl.fromTo(".sheet-link", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05 });
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
        className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
        style={{
          background: scrolled ? "color-mix(in srgb, var(--color-bg) 88%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div className="container-site flex items-center justify-between h-16 md:h-[72px]">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-code text-[13px] tracking-wider"
            style={{ color: "var(--color-text)", fontWeight: 500 }}
            aria-label="Back to top"
          >
            G<span style={{ color: "var(--color-accent)" }}>.</span>SAMSON
          </button>

          <nav className="hidden md:flex items-center gap-7" aria-label="Sections">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="kicker transition-colors duration-150"
                style={{ color: "var(--color-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden grid place-items-center"
              style={{ width: "44px", height: "44px", color: "var(--color-text)" }}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col justify-center px-6"
          style={{ background: "var(--color-bg)" }}
        >
          <nav className="flex flex-col gap-2" aria-label="Sections">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="sheet-link font-display text-left py-2"
                style={{ fontSize: "clamp(2rem, 9vw, 3rem)", fontWeight: 700, color: "var(--color-text)" }}
              >
                {l.label.split(" / ")[1]}
                <span className="kicker ml-3" style={{ color: "var(--color-accent)" }}>
                  {l.label.split(" / ")[0]}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
