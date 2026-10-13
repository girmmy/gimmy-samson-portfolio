"use client";

import { useRef } from "react";
import Link from "next/link";
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
        gsap.set(items, { autoAlpha: 0, y: 14 });
        const triggers = ScrollTrigger.batch(items, {
          start: "top 93%",
          onEnter: (b) =>
            gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.05, ease: EASE, overwrite: true }),
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
    <section id="credentials" ref={root} className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading index="04" className="mb-14 md:mb-20">
          Honours and credentials
        </SectionHeading>

        <dl className="spine mb-16">
          <span className="label" style={{ color: "var(--ink-3)" }}>
            Awards
          </span>
          <div>
            {awards.map((award) => (
              <div
                key={award.name}
                className="cred grid gap-x-8 gap-y-1 md:grid-cols-[minmax(0,1fr)_8rem] items-baseline py-5"
                style={{ borderTop: "1px solid var(--rule)" }}
              >
                <dt>
                  <span className="block" style={{ color: "var(--ink)" }}>
                    {award.name}
                  </span>
                  <span
                    className="block mt-0.5 measure"
                    style={{ fontSize: "var(--t-sm)", color: "var(--ink-3)" }}
                  >
                    {award.issuer}
                    {award.description ? ` — ${award.description}` : ""}
                  </span>
                </dt>
                <dd className="label tnum md:text-right" style={{ color: "var(--ink-3)" }}>
                  {award.date}
                </dd>
              </div>
            ))}
          </div>
        </dl>

        <dl className="spine">
          <span className="label" style={{ color: "var(--ink-3)" }}>
            Certificates
          </span>
          <div>
            {certificates.map((cert) => (
              <div
                key={cert.name}
                className="cred grid gap-x-8 gap-y-1 md:grid-cols-[minmax(0,1fr)_8rem] items-baseline py-5"
                style={{ borderTop: "1px solid var(--rule)" }}
              >
                <dt>
                  <Link
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                    style={{ color: "var(--ink)" }}
                  >
                    {cert.name}
                  </Link>
                  <span className="block mt-0.5" style={{ fontSize: "var(--t-sm)", color: "var(--ink-3)" }}>
                    {cert.issuer}
                  </span>
                </dt>
                <dd className="label tnum md:text-right" style={{ color: "var(--ink-3)" }}>
                  {cert.date}
                </dd>
              </div>
            ))}
          </div>
        </dl>
      </div>
    </section>
  );
}
