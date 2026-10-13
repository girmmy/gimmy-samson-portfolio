"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Youtube } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";
import { projects, type Project } from "@/data/projects";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      /* ── Desktop: pin the section and run the rail sideways ──
         This is the one place pinning earns its cost. It is desktop-only:
         pinned horizontal scroll on a phone fights the browser's own
         gesture handling and is the usual source of scroll-jacking bugs. */
      mm.add(MQ.isDesktop, () => {
        const rail = track.current;
        const section = root.current;
        if (!rail || !section) return;

        const distance = () => rail.scrollWidth - window.innerWidth + 120;

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // The rail moves faster than the page scrolls. At 1:1 this
            // section held the viewport for ~4,400px, which reads as being
            // trapped; 0.72 keeps it substantial without the slog.
            end: () => "+=" + distance() * 0.72,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Cards tilt toward their direction of travel — a small amount of
        // depth that makes the rail feel physical rather than like a slider.
        const cards = gsap.utils.toArray<HTMLElement>(".pcard");
        const tilts = cards.map((card) =>
          gsap.fromTo(
            card,
            { rotateY: 6, scale: 0.97 },
            {
              rotateY: -6,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          ),
        );

        return () => {
          tilts.forEach((t) => t.scrollTrigger?.kill());
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      /* ── Mobile: ordinary vertical stack with a batch reveal ── */
      mm.add(MQ.isMobile, () => {
        const cards = gsap.utils.toArray<HTMLElement>(".pcard");
        gsap.set(cards, { autoAlpha: 0, y: 24 });

        const triggers = ScrollTrigger.batch(cards, {
          start: "top 90%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: EASE,
              overwrite: true,
            }),
        });

        return () => {
          triggers.forEach((t) => t.kill());
          gsap.set(cards, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="relative overflow-hidden">
      {/* Desktop rail */}
      <div className="hidden md:flex h-[100svh] flex-col justify-center">
        <div className="container-site w-full">
          <SectionHeading index="03" label="selected work" className="mb-10">
            Things I&apos;ve Shipped
          </SectionHeading>
        </div>

        <div
          ref={track}
          className="flex gap-6 pl-[clamp(1.25rem,4vw,3.5rem)] pr-20"
          style={{ perspective: "1400px", willChange: "transform" }}
        >
          {projects.map((p) => (
            <Card key={p.index} project={p} />
          ))}
          <EndCap />
        </div>
      </div>

      {/* Mobile stack */}
      <div className="md:hidden container-site py-20">
        <SectionHeading index="03" label="selected work" className="mb-10">
          Things I&apos;ve Shipped
        </SectionHeading>
        <div className="flex flex-col gap-5">
          {projects.map((p) => (
            <Card key={p.index} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ project }: { project: Project }) {
  return (
    <article
      className="pcard flex-shrink-0 w-full md:w-[clamp(340px,34vw,460px)] flex flex-col"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16/10", borderBottom: "1px solid var(--color-border)" }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={640}
            height={400}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          /* No deployed page to screenshot — say so rather than faking one. */
          <div
            className="w-full h-full grid place-items-center"
            style={{
              background:
                "repeating-linear-gradient(135deg, var(--color-surface-2) 0 10px, var(--color-surface) 10px 20px)",
            }}
          >
            <span className="kicker" style={{ color: "var(--color-muted)" }}>
              no preview
            </span>
          </div>
        )}
        <span
          className="absolute top-0 left-0 kicker px-3 py-1.5"
          style={{ background: "var(--color-accent)", color: "var(--color-accent-ink)" }}
        >
          {project.index}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-3 mb-4">
          <h3
            className="font-display"
            style={{ fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-text)" }}
          >
            {project.title}
          </h3>
          <span className="kicker flex-shrink-0" style={{ color: "var(--color-muted)" }}>
            {project.year}
          </span>
        </div>

        <ul className="space-y-2.5 mb-6 flex-1">
          {project.description.map((point, i) => (
            <li
              key={i}
              className="font-body text-[14.5px] leading-relaxed flex gap-2.5"
              style={{ color: "var(--color-body)" }}
            >
              <span aria-hidden="true" style={{ color: "var(--color-accent)" }}>
                —
              </span>
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-code text-[11px] px-2.5 py-1"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-5 pt-4"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-code text-[12px] inline-flex items-center gap-2"
            style={{ color: "var(--color-accent)" }}
          >
            <ExternalLink size={13} aria-hidden="true" /> VIEW
          </Link>
          {project.video && (
            <Link
              href={project.video}
              target="_blank"
              rel="noopener noreferrer"
              className="font-code text-[12px] inline-flex items-center gap-2"
              style={{ color: "var(--color-muted)" }}
            >
              <Youtube size={13} aria-hidden="true" /> DEMO
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

/** Closes the rail so the last card is not flush against the viewport edge. */
function EndCap() {
  return (
    <div
      aria-hidden="true"
      className="pcard flex-shrink-0 w-[clamp(240px,22vw,320px)] grid place-items-center"
      style={{ border: "1px dashed var(--color-border)" }}
    >
      <span className="kicker text-center px-6" style={{ color: "var(--color-muted)" }}>
        more on
        <br />
        <span style={{ color: "var(--color-accent)" }}>github.com/girmmy</span>
      </span>
    </div>
  );
}
