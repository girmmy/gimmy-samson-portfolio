import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Connect from "@/components/Connect";
import CursorLight from "@/components/CursorLight";

export default function Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <CursorLight />
      <Nav />

      <main id="main-content" style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certificates />
        <Connect />
      </main>
    </>
  );
}
