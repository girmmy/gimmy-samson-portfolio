"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { label: "home",         href: "hero" },
  { label: "about",        href: "about" },
  { label: "work",         href: "work" },
  { label: "certificates", href: "certificates" },
  { label: "connect",      href: "connect" },
];

export default function Nav() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduce             = useReducedMotion();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transition: "border-color 300ms ease, backdrop-filter 300ms ease",
          background: scrolled ? "var(--color-nav-scrolled-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <nav
          className="container-site flex items-center justify-between h-14"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-inter text-[1.05rem] transition-colors duration-150 lowercase"
                style={{ color: "var(--color-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right side: theme toggle + mobile toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <ThemeToggle />
            <button
              className="md:hidden p-1 transition-colors duration-150"
              style={{ color: "var(--color-muted)" }}
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden"
            style={{ background: "var(--color-bg)", backdropFilter: "blur(16px)" }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col items-center gap-9">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.22 }}
                  onClick={() => scrollTo(link.href)}
                  className="font-clash lowercase"
                  style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--color-text)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
