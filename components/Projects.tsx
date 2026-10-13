"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";
import { projects, type Project } from "@/data/projects";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        const rows = gsap.utils.toArray<HTMLElement>(".w-row");
        gsap.set(rows, { autoAlpha: 0, y: 18 });
        const triggers = ScrollTrigger.batch(rows, {
          start: "top 92%",
          onEnter: (b) =>
            gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: EASE, overwrite: true }),
        });
        return () => {
          triggers.forEach((t) => t.kill());
          gsap.set(rows, { clearProps: "all" });
        };
      });

      /* The preview plate trails the cursor across the index. It is not
         decoration — it is how you see the work without leaving the list.
         Pointer-driven, so it is desktop-only by nature. */
      mm.add(MQ.isDesktop, () => {
        const plate = preview.current;
        if (!plate) return;

        const xTo = gsap.quickTo(plate, "x", { duration: 0.55, ease: "power3.out" });
        const yTo = gsap.quickTo(plate, "y", { duration: 0.55, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          xTo(e.clientX + 28);
          yTo(e.clientY - 110);
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  // Fade the plate in and out as the hovered row changes.
  useGSAP(
    () => {
      if (!preview.current) return;
      gsap.to(preview.current, {
        autoAlpha: active ? 1 : 0,
        scale: active ? 1 : 0.96,
        duration: 0.35,
        ease: EASE,
      });
    },
    { dependencies: [active] },
  );

  return (
    <section id="work" ref={root} className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading
          index="03"
          standfirst="Eleven things, newest first. Hover a title to see it."
          className="mb-14 md:mb-20"
        >
          Selected work
        </SectionHeading>

        {/* Desktop: the index */}
        <div className="hidden md:block" onMouseLeave={() => setActive(null)}>
          {projects.map((p) => (
            <Row key={p.index} project={p} onEnter={() => setActive(p)} />
          ))}
          <div style={{ borderTop: "1px solid var(--rule)" }} />
          <p className="label mt-8" style={{ color: "var(--ink-3)" }}>
            More at{" "}
            <Link href="https://github.com/girmmy" target="_blank" rel="noopener noreferrer" className="link">
              github.com/girmmy
            </Link>
          </p>
        </div>

        {/* Mobile: the same content, read rather than hovered */}
        <div className="md:hidden">
          {projects.map((p) => (
            <MobileEntry key={p.index} project={p} />
          ))}
          <p className="label mt-10" style={{ color: "var(--ink-3)" }}>
            More at{" "}
            <Link href="https://github.com/girmmy" target="_blank" rel="noopener noreferrer" className="link">
              github.com/girmmy
            </Link>
          </p>
        </div>
      </div>

      {/* The trailing plate. aria-hidden: everything in it is already in
          the list, and a cursor-follower is meaningless to a screen reader. */}
      <div
        ref={preview}
        aria-hidden="true"
        className="hidden md:block fixed top-0 left-0 pointer-events-none"
        style={{ zIndex: 30, width: "340px", opacity: 0, willChange: "transform" }}
      >
        <div style={{ border: "1px solid var(--rule-strong)", background: "var(--paper-2)" }}>
          <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
            {active?.image ? (
              <Image
                src={active.image}
                alt=""
                width={680}
                height={425}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div
                className="w-full h-full grid place-items-center"
                style={{ background: "var(--paper-3)" }}
              >
                <span className="label" style={{ color: "var(--ink-3)" }}>
                  No preview
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ project, onEnter }: { project: Project; onEnter: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="w-row"
      style={{ borderTop: "1px solid var(--rule)" }}
      onMouseEnter={() => {
        setHovered(true);
        onEnter();
      }}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="spine items-baseline py-6 group"
        style={{ textDecoration: "none" }}
      >
        <span className="label tnum" style={{ color: "var(--ink-3)" }}>
          {project.index}
        </span>

        <span className="grid gap-x-10 gap-y-2 md:grid-cols-[minmax(0,1fr)_auto] items-baseline">
          <span>
            <span
              className="font-display block"
              style={{
                fontSize: "var(--t-xl)",
                fontWeight: 400,
                color: hovered ? "var(--accent)" : "var(--ink)",
                transition: "color 0.2s ease",
              }}
            >
              {project.title}
            </span>
            <span
              className="block mt-1.5 measure"
              style={{ fontSize: "var(--t-sm)", color: "var(--ink-3)" }}
            >
              {project.description[0]}
            </span>
          </span>

          <span className="flex items-baseline gap-6 flex-shrink-0">
            <span style={{ fontSize: "var(--t-sm)", color: "var(--ink-3)" }}>
              {project.tags.slice(0, 2).join(", ")}
            </span>
            <span className="label tnum" style={{ color: "var(--ink-3)" }}>
              {project.year}
            </span>
          </span>
        </span>
      </Link>
    </article>
  );
}

function MobileEntry({ project }: { project: Project }) {
  return (
    <article className="w-row py-7" style={{ borderTop: "1px solid var(--rule)" }}>
      <div className="flex items-baseline gap-4 mb-2">
        <span className="label tnum" style={{ color: "var(--ink-3)" }}>
          {project.index}
        </span>
        <h3
          className="font-display"
          style={{ fontSize: "var(--t-xl)", fontWeight: 400, color: "var(--ink)" }}
        >
          {project.title}
        </h3>
      </div>

      {project.image && (
        <div className="mb-4 mt-3" style={{ border: "1px solid var(--rule)" }}>
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={680}
            height={425}
            className="w-full object-cover object-top"
            style={{ aspectRatio: "16/10" }}
          />
        </div>
      )}

      <ul className="space-y-2 mb-3">
        {project.description.map((point, i) => (
          <li key={i} style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)" }}>
            {point}
          </li>
        ))}
      </ul>

      <p className="label" style={{ color: "var(--ink-3)" }}>
        {project.tags.join(" · ")} — {project.year}
      </p>

      <p className="mt-3" style={{ fontSize: "var(--t-sm)" }}>
        <Link href={project.link} target="_blank" rel="noopener noreferrer" className="link">
          Open {project.title}
        </Link>
        {project.video && (
          <>
            {" · "}
            <Link href={project.video} target="_blank" rel="noopener noreferrer" className="link">
              Watch the demo
            </Link>
          </>
        )}
      </p>
    </article>
  );
}
