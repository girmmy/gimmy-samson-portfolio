"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
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
            style={{ color: "var(--color-muted)" }}
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

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="p-7 rounded-lg flex flex-col gap-2 relative overflow-hidden"
      style={{
        background: "var(--color-surface)",
        border: `1.5px solid ${hovered ? "var(--color-accent)" : "var(--color-border)"}`,
        transition: "border-color 0.2s ease, box-shadow 0.2s ease",
        boxShadow: hovered ? "0 4px 24px var(--color-accent-dim)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
    </motion.div>
  );
}
