"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  ChevronDown,
  Menu,
  X,
  Code2,
  Cpu,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Most recent first
const projects = [
  {
    title: "Bantr",
    description: [
      "Founded and built a live debating platform in open beta with 150+ users, enabling real-time audio and video debates",
      "Implemented live audience polling, real-time chat, and side-voting so viewers can engage as debates unfold",
      "Architected the full product from the ground up — design, frontend, and backend",
    ],
    image: "/bantr-img.png",
    tags: ["Next.js", "TypeScript", "LiveKit", "Supabase", "Tailwind"],
    link: "https://bantr.online",
    period: "Feb 2026 – Present",
  },
  {
    title: "Scholarlink",
    description: [
      "Built a scholarship discovery platform connecting students with funding opportunities matching their goals",
      "Designed search and filtering to help students find relevant scholarships quickly and efficiently",
      "Submitted to TSA state competition as a full web development entry",
    ],
    image: "/scholarlink-img.png",
    tags: ["React", "JavaScript", "Tailwind", "Netlify"],
    link: "https://thescholarlink.netlify.app",
    period: "2025 – 2026",
  },
  {
    title: "Transvero",
    description: [
      "Developed real-time multilingual transcription app with live audio processing using React and AssemblyAI",
      "Implemented user auth, multi-language transcription, and PDF export functionality",
      "Built efficient state management and optimized performance for seamless UX",
    ],
    image: "/transvero-img.jpg",
    tags: ["React.js", "TypeScript", "Tailwind", "AssemblyAI"],
    link: "https://transvero.netlify.app/",
    period: "Sep 2025 – Mar 2026",
  },
  {
    title: "GimmyAI",
    description: [
      "Engineered full-stack AI-powered assistant serving 130+ active users using React, Next.js, and Firebase",
      "Implemented real-time NLP with context-aware responses and seamless API integrations",
      "Built robust authentication, state management, and scalable architecture",
    ],
    image: "/gimmyai-img.jpg",
    tags: ["AI/ML", "React", "Next.js", "TypeScript", "Firebase", "OpenAI API"],
    link: "https://gimmyai.com",
    period: "Sep 2024 – Present",
  },
  {
    title: "SymbioAI",
    description: [
      "Architected full-stack AI chatbot with four specialized assistants using React, Node.js, and OpenAI API",
      "Delivered personalized environmental advice for carbon, recycling, electricity, and water management",
      "Implemented scalable backend services with optimized performance",
    ],
    image: "/symbioai-img.jpg",
    tags: ["React", "JavaScript", "Node.js", "OpenAI API", "Git", "GitHub"],
    link: "https://symbioai.netlify.app",
    period: "Sep 2024 – Mar 2025",
  },
  {
    title: "ParkviewTSA Website",
    description: [
      "Developed responsive frontend website using HTML, CSS, JavaScript, and Bootstrap for Parkview TSA",
      "Achieved 1k+ clicks and 18k+ total impressions demonstrating strong user engagement",
      "Built centralized platform for club information, events, and member engagement",
    ],
    image: "/parkviewtsa-img.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "GitHub"],
    link: "https://parkviewtsa.org",
    period: "Jul 2024 – Sep 2024",
  },
];

const skills = [
  {
    name: "Frontend",
    icon: Code2,
    items: [
      "React",
      "React Native",
      "Next.js",
      "HTML/CSS",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    name: "Backend",
    icon: Cpu,
    items: ["Node.js", "Python", "Java", "REST APIs", "Firebase", "Supabase"],
  },
  {
    name: "Tools & AI",
    icon: Wrench,
    items: ["Git/GitHub", "OpenAI API", "Figma", "VS Code", "jQuery"],
  },
];

const sonaara = [
  "Built and tested features on React Native mobile app with 500+ users",
  "Developed messaging feature and identity verification with Persona",
  "Implemented Firebase integration for backend services",
  "Helped increase userbase by 73% since onboarding",
];

const freelance = [
  "Developed 15+ custom websites for clients",
  "Achieved 17% increase in user engagement across projects",
  "Implemented tailored SEO strategies for improved discoverability",
];

const bantrExp = [
  "Founded and launched a live debating platform, now in open beta with 150+ users",
  "Built the entire product from scratch — design, frontend, and backend",
  "Integrated real-time audio/video with WebRTC and live data with Supabase",
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function Portfolio() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      "@id": "https://gimmy-samson.com/#person",
      name: "Girmachew Samson",
      alternateName: "Gimmy Samson",
      jobTitle: "Startup Founder & Frontend Developer",
      description:
        "Startup founder and frontend developer. Founded Bantr, a live debating platform with 150+ users. Specializes in React, Next.js, TypeScript, and AI integration.",
      url: "https://gimmy-samson.com",
      image: "https://gimmy-samson.com/gimmy-headshot.jpg",
      sameAs: [
        "https://linkedin.com/in/girmachew-samson",
        "https://github.com/girmmy",
      ],
      email: "gimmys943@gmail.com",
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Frontend Development",
        "AI Integration",
        "OpenAI API",
        "Firebase",
        "Supabase",
        "Tailwind CSS",
        "Web Development",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Parkview High School",
      },
    },
    name: "Gimmy Samson - Portfolio",
    description: "Portfolio showcasing web development projects and skills",
    url: "https://gimmy-samson.com",
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <main
      className="min-h-screen bg-[#09090b] relative overflow-hidden"
      itemScope
      itemType="https://schema.org/ProfilePage"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ─── Background ─────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.18]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(800px,100vw)] h-[480px] bg-cyan-400/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/5 blur-[80px] rounded-full" />
      </div>

      {/* ─── Navigation ─────────────────────────────────────── */}
      <header>
        <nav
          className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[22rem] sm:max-w-none sm:w-auto"
          role="navigation"
          aria-label="Main navigation"
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#09090b]/95 backdrop-blur-xl rounded-full px-4 sm:px-5 py-2.5 border border-white/10 flex items-center gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-7 h-7 rounded-full bg-cyan-400 flex items-center justify-center">
                <span className="text-[#09090b] font-bold text-[11px] font-display" aria-label="Gimmy Samson initials">
                  GS
                </span>
              </div>
              <span className="hidden sm:block text-zinc-300 text-sm font-medium font-display">
                Gimmy Samson
              </span>
            </div>

            <div className="hidden md:flex items-center gap-5">
              {["about", "projects", "connect"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-zinc-500 hover:text-cyan-400 text-sm font-medium capitalize tracking-wide transition-colors"
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden text-zinc-400 hover:text-white transition-colors ml-auto p-0.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </motion.div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="mt-2 bg-[#09090b]/97 backdrop-blur-xl rounded-2xl p-2 border border-white/10"
                role="menu"
              >
                {["about", "projects", "connect"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm font-medium capitalize"
                    role="menuitem"
                    aria-label={`Navigate to ${item} section`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6"
        aria-labelledby="hero-heading"
        role="banner"
      >
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex justify-center"
          >
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <div
                className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl scale-125"
                aria-hidden="true"
              />
              <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-cyan-400/30 ring-offset-4 ring-offset-[#09090b]">
                <Image
                  src="/gimmy-headshot.jpg"
                  alt="Gimmy Samson - Startup Founder and Frontend Developer"
                  width={180}
                  height={180}
                  className="w-full h-full object-cover object-[center_15%]"
                  priority
                  itemProp="image"
                />
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold leading-[0.92] tracking-tight text-zinc-50 mb-5"
            style={{ fontSize: "clamp(2.6rem, 11vw, 6.5rem)" }}
            itemProp="name"
          >
            Girmachew
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #67e8f9 0%, #22d3ee 40%, #06b6d4 100%)",
              }}
            >
              Samson
            </span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-mono text-xs sm:text-sm text-zinc-500 mb-10 tracking-wide"
            itemProp="description"
          >
            <span className="text-cyan-400" aria-hidden="true">{">"}</span>{" "}
            Startup Founder · Frontend Developer
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <button
              onClick={() => scrollToSection("projects")}
              className="w-full sm:w-auto px-8 py-3.5 bg-cyan-400 text-[#09090b] font-semibold text-sm rounded-full hover:bg-cyan-300 active:scale-[0.98] transition-all duration-150 font-display tracking-wide"
              aria-label="View my projects and work"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection("connect")}
              className="w-full sm:w-auto px-8 py-3.5 border border-white/12 text-zinc-300 font-semibold text-sm rounded-full hover:border-cyan-400/40 hover:text-cyan-400 active:scale-[0.98] transition-all duration-150 font-display tracking-wide"
              aria-label="Get in touch with me"
            >
              Get In Touch
            </button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-700"
          aria-hidden="true"
        >
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* ─── About ──────────────────────────────────────────── */}
      <section
        id="about"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        aria-labelledby="about-heading"
      >
        <div className="max-w-5xl mx-auto">

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="font-mono text-[11px] text-cyan-400 tracking-[0.2em] select-none">01</span>
            <div className="h-px w-10 bg-white/10" aria-hidden="true" />
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl font-bold font-display text-zinc-50"
            >
              About
            </h2>
          </motion.div>

          {/* Bio */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-3xl mb-14"
            itemProp="description"
          >
            Hi, I&apos;m Girmachew — but call me{" "}
            <span className="text-zinc-200 font-medium">Gimmy</span>. I&apos;m
            a high school student (Class of 2026), startup founder, and frontend
            developer building products people actually use. I founded{" "}
            <span className="text-cyan-400 font-medium">Bantr</span>, a live
            debating platform currently in open beta with{" "}
            <span className="text-zinc-200 font-medium">150+ users</span>.
            Outside of Bantr, I freelance and build AI-powered web apps using
            React, Next.js, and TypeScript.
          </motion.p>

          {/* Experience Timeline */}
          <div className="mb-14">

            {/* Bantr — Founder */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              whileInView="animate"
              initial="initial"
              viewport={{ once: true }}
              className="flex gap-5 sm:gap-6"
            >
              <div className="flex flex-col items-center w-5 flex-shrink-0" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 flex-shrink-0 mt-5" />
                <div className="w-[2px] bg-white/10 flex-1 mt-1.5" />
              </div>
              <div className="flex-1 min-w-0 pb-6">
                <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 sm:p-6 hover:border-white/12 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3 className="text-base font-semibold text-zinc-100 font-display">Founder & CEO</h3>
                    <span className="text-[11px] text-zinc-600 font-mono flex-shrink-0">Feb 2026 – Present</span>
                  </div>
                  <Link
                    href="https://bantr.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 mb-4 transition-colors"
                  >
                    Bantr <ExternalLink size={12} aria-hidden="true" />
                  </Link>
                  <ul className="space-y-2">
                    {bantrExp.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-cyan-400/60 mt-0.5 flex-shrink-0 font-mono" aria-hidden="true">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Sonaara */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileInView="animate"
              initial="initial"
              viewport={{ once: true }}
              className="flex gap-5 sm:gap-6"
            >
              <div className="flex flex-col items-center w-5 flex-shrink-0" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-white/30 flex-shrink-0 mt-5" />
                <div className="w-[2px] bg-white/10 flex-1 mt-1.5" />
              </div>
              <div className="flex-1 min-w-0 pb-6">
                <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 sm:p-6 hover:border-white/12 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3 className="text-base font-semibold text-zinc-100 font-display">SWE Intern</h3>
                    <span className="text-[11px] text-zinc-600 font-mono flex-shrink-0">Aug 2025 – Dec 2025</span>
                  </div>
                  <a
                    href="https://sonaara.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 mb-4 transition-colors"
                  >
                    Sonaara <ExternalLink size={12} aria-hidden="true" />
                  </a>
                  <ul className="space-y-2">
                    {sonaara.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-cyan-400/60 mt-0.5 flex-shrink-0 font-mono" aria-hidden="true">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Freelance — last item, no line */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileInView="animate"
              initial="initial"
              viewport={{ once: true }}
              className="flex gap-5 sm:gap-6"
            >
              <div className="flex flex-col items-center w-5 flex-shrink-0" aria-hidden="true">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20 flex-shrink-0 mt-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 sm:p-6 hover:border-white/12 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                    <h3 className="text-base font-semibold text-zinc-100 font-display">Freelance Frontend Developer</h3>
                    <span className="text-[11px] text-zinc-600 font-mono flex-shrink-0">Jan 2024 – Jan 2026</span>
                  </div>
                  <p className="text-sm text-zinc-600 mb-4">Self-Employed</p>
                  <ul className="space-y-2">
                    {freelance.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-zinc-600 mt-0.5 flex-shrink-0 font-mono" aria-hidden="true">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills */}
          <motion.div
            variants={staggerContainer}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-4 mb-12"
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                className="bg-white/[0.03] border border-white/8 rounded-2xl p-5 hover:border-white/12 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <skill.icon size={15} className="text-cyan-400" aria-hidden="true" />
                  <h3 className="text-sm font-semibold text-zinc-200 font-display">{skill.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] sm:text-xs px-2.5 py-1 bg-white/[0.04] border border-white/8 rounded-full text-zinc-500 hover:border-cyan-400/25 hover:text-cyan-300/80 transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Resume — centered */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <a
              href="/Girmachew_Samson.pdf"
              download
              className="inline-flex items-center gap-2.5 px-6 py-3 border border-white/12 text-zinc-400 text-sm font-medium rounded-full hover:border-cyan-400/30 hover:text-cyan-400 transition-all duration-150 active:scale-[0.98]"
              aria-label="Download my resume as PDF"
            >
              <Download size={15} aria-hidden="true" />
              Download Resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── Projects ───────────────────────────────────────── */}
      <section
        id="projects"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        aria-labelledby="projects-heading"
      >
        <div className="max-w-5xl mx-auto">

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-mono text-[11px] text-cyan-400 tracking-[0.2em] select-none">02</span>
            <div className="h-px w-10 bg-white/10" aria-hidden="true" />
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl font-bold font-display text-zinc-50"
            >
              Work
            </h2>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="text-zinc-500 text-sm sm:text-base mb-10 max-w-xl"
          >
            A selection of recent projects — startups, AI apps, and web platforms.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 sm:gap-5"
            role="list"
            aria-label="Featured projects"
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                variants={fadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden hover:border-cyan-400/25 hover:bg-white/[0.05] transition-colors duration-300 cursor-pointer"
                role="listitem"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                {/* Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={`${project.title} project screenshot`}
                    width={600}
                    height={300}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-[#09090b]/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute top-3 left-4">
                    <span className="font-mono text-[10px] text-cyan-400/60 select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <span className="font-mono text-[10px] text-zinc-500">{project.period}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3
                    className="text-base sm:text-lg font-semibold text-zinc-100 font-display mb-3"
                    itemProp="name"
                  >
                    {project.title}
                  </h3>

                  <ul className="space-y-2 mb-4" itemProp="description">
                    {project.description.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        <span className="text-cyan-400/40 mt-0.5 flex-shrink-0 font-mono" aria-hidden="true">›</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 bg-cyan-400/[0.06] border border-cyan-400/12 rounded-full text-cyan-300/60 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Project button */}
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-center gap-2 w-full px-4 py-2.5 border border-white/10 rounded-lg text-sm font-medium text-zinc-400 hover:border-cyan-400/30 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-150"
                    aria-label={`Visit ${project.title} project`}
                  >
                    <ExternalLink
                      size={14}
                      className="transition-transform duration-200 group-hover/link:rotate-12"
                      aria-hidden="true"
                    />
                    <span>View Project</span>
                    <span
                      className="ml-auto translate-x-0 group-hover/link:translate-x-1 transition-transform duration-200"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Connect ────────────────────────────────────────── */}
      <section
        id="connect"
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        aria-labelledby="connect-heading"
      >
        <div className="max-w-2xl mx-auto">

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-12"
          >
            <span className="font-mono text-[11px] text-cyan-400 tracking-[0.2em] select-none">03</span>
            <div className="h-px w-10 bg-white/10" aria-hidden="true" />
            <h2
              id="connect-heading"
              className="text-3xl sm:text-4xl font-bold font-display text-zinc-50"
            >
              Connect
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileInView="animate"
            initial="initial"
            viewport={{ once: true }}
          >
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
              Ready to bring your next project to life? I&apos;d love to hear
              from you and discuss how we can work together.
            </p>

            <Link
              href="mailto:gimmys943@gmail.com"
              className="flex items-center justify-center gap-2.5 w-full px-6 py-4 bg-cyan-400 text-[#09090b] font-semibold text-sm rounded-xl hover:bg-cyan-300 active:scale-[0.99] transition-all duration-150 font-display mb-4"
              aria-label="Send me an email"
            >
              <Mail size={17} aria-hidden="true" />
              gimmys943@gmail.com
            </Link>

            <div className="flex gap-3 mb-14">
              <Link
                href="https://linkedin.com/in/girmachew-samson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 border border-white/10 text-zinc-500 text-sm font-medium rounded-xl hover:border-white/18 hover:text-zinc-300 active:scale-[0.99] transition-all duration-150"
                aria-label="Visit my LinkedIn profile"
              >
                <Linkedin size={16} aria-hidden="true" />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/girmmy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 border border-white/10 text-zinc-500 text-sm font-medium rounded-xl hover:border-white/18 hover:text-zinc-300 active:scale-[0.99] transition-all duration-150"
                aria-label="Visit my GitHub profile"
              >
                <Github size={16} aria-hidden="true" />
                <span>GitHub</span>
              </Link>
            </div>

            <Separator className="bg-white/8 mb-8" />

            <p className="text-zinc-700 text-xs text-center font-mono">
              © 2026 Girmachew (Gimmy) Samson. All rights reserved.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
