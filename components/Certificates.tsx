"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";
import { FileText } from "lucide-react";
import { certificates } from "@/data/certificates";
import { awards } from "@/data/awards";

export default function Certificates() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="certificates" className="section-divider py-24 md:py-32">
      <div className="container-site">
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-code text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--color-accent)" }}
        >
          certificates
        </motion.p>
        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-clash font-bold mb-10 md:mb-14"
          style={{ fontSize: "var(--text-h1)", color: "var(--color-text)" }}
        >
          Credentials
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificates.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} index={i} shouldReduce={shouldReduce ?? false} />
          ))}
        </div>

        {/* Awards — compact, understated */}
        <div className="mt-16 pt-10" style={{ borderTop: "1px solid var(--color-border)" }}>
          <p
            className="font-code text-xs tracking-[0.2em] uppercase mb-6"
            style={{ color: "var(--color-accent)" }}
          >
            awards &amp; honors
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
            {awards.map((award, i) => (
              <motion.div
                key={i}
                initial={shouldReduce ? {} : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <p className="font-inter font-medium text-sm" style={{ color: "var(--color-text)" }}>
                  {award.name}
                </p>
                <p className="font-inter text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                  {award.issuer} · {award.date}
                </p>
                {award.description && (
                  <p className="font-inter text-xs mt-1" style={{ color: "var(--color-muted)", opacity: 0.75 }}>
                    {award.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CertType = { name: string; issuer: string; date: string; url: string };

function CertCard({ cert, index, shouldReduce }: { cert: CertType; index: number; shouldReduce: boolean }) {
  const [hovered, setHovered] = useState(false);
  const tilt = useRef<HTMLDivElement>(null);

  // The card leans toward the pointer. The tilt lives on an inner
  // wrapper, never on the motion.div — Framer Motion owns that element's
  // transform for the entrance, and sharing it would make both engines
  // fight over the same matrix.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isDesktop, () => {
        const el = tilt.current;
        const card = el?.parentElement;
        if (!el || !card) return;

        const rotX = gsap.quickTo(el, "rotateX", { duration: 0.5, ease: EASE });
        const rotY = gsap.quickTo(el, "rotateY", { duration: 0.5, ease: EASE });

        const onMove = (e: PointerEvent) => {
          const b = card.getBoundingClientRect();
          // -0.5..0.5 from the card's centre, so the lean follows the
          // pointer's offset rather than its absolute position.
          const px = (e.clientX - b.left) / b.width - 0.5;
          const py = (e.clientY - b.top) / b.height - 0.5;
          rotY(px * 9);
          rotX(-py * 9);
        };
        const reset = () => {
          rotX(0);
          rotY(0);
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", reset);

        return () => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", reset);
          gsap.set(el, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: tilt },
  );

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-lg relative"
      style={{
        perspective: "900px",
        background: "var(--color-surface)",
        border: `1.5px solid ${hovered ? "var(--color-accent)" : "var(--color-border)"}`,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? "0 4px 24px var(--color-accent-dim)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        ref={tilt}
        className="p-7 flex flex-col gap-2 h-full"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
      {/* Icon */}
      <div className="mb-2">
        <FileText size={22} style={{ color: hovered ? "var(--color-accent)" : "var(--color-muted)", transition: "color 0.2s" }} />
      </div>

      <h3 className="font-inter font-semibold leading-snug" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
        {cert.name}
      </h3>
      <p className="font-inter text-sm" style={{ color: "var(--color-muted)" }}>{cert.issuer}</p>
      <p className="font-inter text-xs mb-3" style={{ color: "var(--color-muted)" }}>{cert.date}</p>

      <Link
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-inter text-sm mt-auto inline-flex items-center gap-2 transition-all duration-200"
        style={{ color: "var(--color-accent)", opacity: hovered ? 1 : 0.5 }}
        aria-label={`Verify ${cert.name} credential`}
        tabIndex={0}
      >
        Verify Credential →
      </Link>
      </div>
    </motion.div>
  );
}
