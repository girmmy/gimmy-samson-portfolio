import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Connect from "@/components/Connect";
import ScrollProgress from "@/components/ScrollProgress";

export default function Page() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <ScrollProgress />
      <Nav />

      <main id="main-content">
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
