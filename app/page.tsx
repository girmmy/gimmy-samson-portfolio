import Boot from "@/components/Boot";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Connect from "@/components/Connect";
import ScrollProgress from "@/components/ScrollProgress";

const STACK_BAND = [
  "typescript", "python", "next.js", "react native", "django", "postgresql",
  "redis", "aws", "terraform", "docker", "claude api", "mcp", "rag", "owasp",
];

const STATUS_BAND = [
  "open to swe internships", "open to ai/ml internships", "atlanta, ga",
  "georgia tech · b.s. computer science", "building agent infrastructure",
];

export default function Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <Boot />
      <ScrollProgress />
      <Nav />

      <main id="main-content" style={{ background: "var(--color-bg)" }}>
        <Hero />
        <Marquee items={STACK_BAND} duration={32} />
        <About />
        <Marquee items={STATUS_BAND} duration={26} reverse />
        <Experience />
        <Projects />
        <Certificates />
        <Connect />
      </main>
    </>
  );
}
