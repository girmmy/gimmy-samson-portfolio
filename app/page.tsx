"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Code,
  Palette,
  Zap,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "SymbioAI",
    description:
      "A full-stack AI chatbot application providing environmental advice to homeowners and business owners. Features four specialized AI assistants for carbon emissions, recycling, electricity saving, and water conservation.",
    image: "/symbioai-img.jpg",
    tags: ["React", "JavaScript", "Node.js", "OpenAI API", "Git", "GitHub"],
    link: "https://symbioai.netlify.app",
    featured: true,
    period: "Sep 2024 – Mar 2025",
  },
  {
    title: "ParkviewTSA Website",
    description:
      "Frontend website for Parkview High School's Technology Student Association. Boosted membership by 10% and improved retention by providing a centralized online presence for club information.",
    image: "/parkviewtsa-img.jpg",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "GitHub"],
    link: "https://parkviewtsa.org",
    featured: true,
    period: "Jul 2024 – Sep 2024",
  },
  {
    title: "GimmyAI",
    description:
      "An advanced AI-powered assistant built with cutting-edge machine learning algorithms. Features natural language processing, context awareness, and seamless integration capabilities.",
    image: "/gimmyai-img.jpg",
    tags: ["AI/ML", "React", "Next.js", "TypeScript", "Firebase", "OpenAI API"],
    link: "https://gimmyai.com",
    featured: true,
    period: "2024 – Present",
  },
  {
    title: "Lurelib",
    description:
      "A non-profit platform focused on providing essential medical equipment to people, hospitals, and clinics across Africa. Built with modern web technologies to connect donors with communities in need, building a healthier future together.",
    image: "/lurelib-img.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    link: "#",
    featured: true,
    period: "2024 – Present",
  },
  {
    title: "Transvero",
    description:
      "A real-time live transcription app that allows you to transcript text between multiple languages in real-time. It has an account system and allows for users to download transcripts as a PDF for further use.",
    image: "/transvero-img.jpg",
    tags: ["React.js", "TypeScript", "Tailwind", "AssemblyAI"],
    link: "#",
    featured: true,
    period: "2025 – Present",
  },
];

const skills = [
  {
    name: "Frontend",
    icon: Code,
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
    icon: Zap,
    items: ["Node.js", "Python", "Java", "REST APIs", "Firebase"],
  },
  {
    name: "Tools & AI",
    icon: Palette,
    items: ["Git/GitHub", "OpenAI API", "Figma", "VS Code", "jQuery"],
  },
];

export default function Portfolio() {
  // Add structured data for the portfolio
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Portfolio",
    name: "Gimmy Samson Portfolio",
    description: "Portfolio showcasing web development projects and skills",
    url: "https://gimmy-samson.com",
    author: {
      "@type": "Person",
      name: "Girmachew Samson",
      alternateName: "Gimmy Samson",
      jobTitle: "Frontend Developer",
      description: "Award-winning frontend developer and high school student",
    },
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      itemScope
      itemType="https://schema.org/Portfolio"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* Navigation */}
      <header>
        <nav
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          role="navigation"
          aria-label="Main navigation"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/80 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10"
          >
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span
                    className="text-white font-bold text-sm"
                    aria-label="Gimmy Samson initials"
                  >
                    GS
                  </span>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {["about", "projects", "connect"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-white/70 hover:text-white transition-colors capitalize font-medium text-sm"
                    aria-label={`Navigate to ${item} section`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white p-1"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-2 bg-black/80 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
              role="menu"
            >
              <div className="space-y-3">
                {["about", "projects", "contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left text-white/70 hover:text-white transition-colors capitalize font-medium text-sm py-2"
                    role="menuitem"
                    aria-label={`Navigate to ${item} section`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
        role="banner"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Floating Geometric Shapes */}
        <div aria-hidden="true">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 transform rotate-45"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              delay: 2,
            }}
            className="absolute top-3/4 right-1/4 w-6 h-6 border-2 border-purple-400 rounded-full"
          />
          <motion.div
            animate={{
              rotate: [0, -360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 transform rotate-12"
          />
        </div>

        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20"
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 pt-16 flex justify-center"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-lg opacity-75 animate-pulse"
                  aria-hidden="true"
                ></div>
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm">
                  <Image
                    src="/gimmy-tsa-headshot.png"
                    alt="Gimmy Samson - Frontend Developer and Student Leader"
                    width={180}
                    height={180}
                    className="w-full h-full object-cover scale-110"
                    priority
                    itemProp="image"
                  />
                </div>
              </div>
            </motion.div>

            <h1
              id="hero-heading"
              className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6"
              itemProp="name"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Gimmy
              </span>
              <br />
              <span className="text-white">Samson</span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl sm:text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
              itemProp="jobTitle"
            >
              Freelance Frontend Developer & SWE Intern at{" "}
              <a
                href="https://sonaara.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-200 transition-colors"
              >
                Sonaara
              </a>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 border-0"
                aria-label="View my projects and work"
              >
                View My Work
              </Button>

              <Button
                onClick={() => scrollToSection("connect")}
                variant="outline"
                size="lg"
                className="border-white/30 hover:bg-white/10 hover:text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 text-black"
                aria-label="Get in touch with me"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          aria-hidden="true"
        >
          <ChevronDown className="text-white/60" size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        aria-labelledby="about-heading"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              id="about-heading"
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              About Me
            </h2>
            <p
              className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
              itemProp="description"
            >
              Hi, I'm Girmachew Samson, but you can call me Gimmy! I'm a
              passionate high school student (Class of 2026) and freelance
              frontend developer with a deep love for creating innovative web
              solutions and AI applications. I specialize in building
              responsive, user-friendly websites and have developed 15+ custom
              projects for various clients, helping them achieve their digital
              goals through cutting-edge technology.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="relative max-w-4xl mx-auto mb-16">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-400 to-purple-400"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {/* Sonaara Internship */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative flex items-start gap-8"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <h3 className="text-xl font-bold text-white">
                        SWE Intern
                      </h3>
                      <span className="text-sm text-purple-300 font-medium">
                        Aug 2024 – Present
                      </span>
                    </div>
                    <div className="mb-4">
                      <a
                        href="https://sonaara.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-300 hover:text-purple-200 transition-colors font-medium text-lg"
                      >
                        Sonaara
                      </a>
                    </div>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Built and tested features on React Native mobile app
                          with 500+ users
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Developed messaging feature and identity verification
                          with Persona
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Implemented Firebase integration for backend services
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>
                          Helped increase userbase by 73% since onboarding
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Freelance Work */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-start gap-8"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                      <h3 className="text-xl font-bold text-white">
                        Freelance Frontend Developer
                      </h3>
                      <span className="text-sm text-purple-300 font-medium">
                        Jan 2024 – Present
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="text-purple-300 font-medium text-lg">
                        Self-Employed
                      </span>
                    </div>
                    <ul className="space-y-3 text-white/80">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Developed 15+ custom websites for clients</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Achieved 17% increase in user engagement</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>Implemented tailored SEO strategies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <skill.icon
                        className="w-12 h-12 mx-auto mb-4 text-purple-400 group-hover:text-pink-400 transition-colors"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <CardTitle className="text-white">{skill.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {skill.items.map((item) => (
                        <Badge
                          key={item}
                          variant="secondary"
                          className="bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 transition-colors"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transform hover:scale-105 transition-all duration-300 border-0"
              aria-label="Download my resume as PDF"
            >
              <a href="/Girmachew_Samson.pdf" download>
                <Download className="mr-2" size={20} aria-hidden="true" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20"
        aria-labelledby="projects-heading"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2
              id="projects-heading"
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              Featured Projects
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              A showcase of my latest work, featuring innovative solutions and
              cutting-edge technologies
            </p>
          </motion.div>

          <div
            className="grid md:grid-cols-2 gap-8"
            role="list"
            aria-label="Featured projects"
          >
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
                role="listitem"
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full overflow-hidden">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      width={600}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-white text-xl" itemProp="name">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-purple-300">
                      {project.period}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p
                      className="text-white/80 text-sm leading-relaxed"
                      itemProp="description"
                    >
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 transition-colors text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {project.link !== "#" && (
                      <Button
                        asChild
                        size="sm"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                        aria-label={`Visit ${project.title} project`}
                      >
                        <Link
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink
                            className="mr-2"
                            size={16}
                            aria-hidden="true"
                          />
                          View Project
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section
        id="connect"
        className="py-20 px-4 sm:px-6 lg:px-8 relative"
        aria-labelledby="connect-heading"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2
              id="connect-heading"
              className="text-4xl sm:text-5xl font-bold text-white mb-6"
            >
              Let's Connect
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Ready to bring your next project to life? I'd love to hear from
              you and discuss how we can work together.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                aria-label="Send me an email"
              >
                <Link href="mailto:gimmys943@gmail.com">
                  <Mail className="mr-2" size={20} aria-hidden="true" />
                  Email Me
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 bg-transparent transition-all duration-300"
                aria-label="Visit my LinkedIn profile"
              >
                <Link
                  href="https://linkedin.com/in/girmachew-samson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <Linkedin className="mr-2" size={20} aria-hidden="true" />
                  LinkedIn
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-black hover:text-white hover:border-black bg-transparent transition-all duration-300"
                aria-label="Visit my GitHub profile"
              >
                <Link
                  href="https://github.com/girmmy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                >
                  <Github className="mr-2" size={20} aria-hidden="true" />
                  GitHub
                </Link>
              </Button>
            </div>

            <Separator className="bg-white/20 mb-8" />

            <p className="text-white/60">
              © 2025 Girmachew (Gimmy) Samson. All rights reserved.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
