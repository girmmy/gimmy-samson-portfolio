"use client";

import { useRef } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";
import { certificates } from "@/data/certificates";
import { awards } from "@/data/awards";
import SectionHeading from "@/components/SectionHeading";

export default function Certificates() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        const items = gsap.utils.toArray<HTMLElement>(".cred");
        gsap.set(items, { autoAlpha: 0, y: 20 });
        const triggers = ScrollTrigger.batch(items, {
          start: "top 92%",
          onEnter: (b) =>
            gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: EASE, overwrite: true }),
        });
        return () => {
          triggers.forEach((t) => t.kill());
          gsap.set(items, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="certificates" ref={root} className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading index="04" label="credentials" className="mb-14 md:mb-20">
          Proof of Work
        </SectionHeading>

        {/* Awards first — they carry more weight than the certificates. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-0 mb-16">
          {awards.map((award) => (
            <div
              key={award.name}
              className="cred py-6"
              style={{ borderTop: "1px solid var(--color-border)" }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1.5">
                <h3 className="font-body font-medium text-[16px]" style={{ color: "var(--color-text)" }}>
                  {award.name}
                </h3>
                <span className="kicker flex-shrink-0" style={{ color: "var(--color-muted)" }}>
                  {award.date}
                </span>
              </div>
              <p className="font-code text-[12px] mb-2" style={{ color: "var(--color-accent)" }}>
                {award.issuer}
              </p>
              {award.description && (
                <p className="font-body text-[14px]" style={{ color: "var(--color-body)" }}>
                  {award.description}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {certificates.map((cert) => (
            <Link
              key={cert.name}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cred group inline-flex items-center gap-3 px-5 py-4 transition-colors duration-200"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <FileText size={15} aria-hidden="true" style={{ color: "var(--color-accent)" }} />
              <span className="font-body text-[14px]" style={{ color: "var(--color-text)" }}>
                {cert.name}
              </span>
              <span className="kicker" style={{ color: "var(--color-muted)" }}>
                {cert.issuer}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
