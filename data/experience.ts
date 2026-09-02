export type Experience = {
  role: string
  company: string
  url: string
  period: string
  bullets: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Full Stack Engineer',
    company: 'LegiCycle',
    url: 'https://legicycle.ai',
    period: 'Aug 2026 – Present',
    bullets: [
      'Audit a live platform on AWS against NIST 800-53 and OWASP standards, identifying and closing 30+ high-severity vulnerabilities',
      'Migrate hardcoded secrets into Doppler across Dockerized services, closing the largest standing exposure of user data',
      'Expand the platform\'s RAG research assistant, backed by PostgreSQL and Redis, from Georgia-only to Georgia, Delaware, and federal law — fixing a bug that cited the wrong state\'s laws to users',
      'Fix a bug across 29 Django/DRF routes that silently locked invited collaborators out of shared bill-drafting projects, restoring access to every affected project',
    ],
  },
  {
    role: 'Member',
    company: 'ColorStack',
    url: 'https://www.colorstack.org',
    period: 'Aug 2026 – Present',
    bullets: [],
  },
  {
    role: 'AI Trainer & Evaluator',
    company: 'Handshake',
    url: 'https://joinhandshake.com',
    period: 'June 2026 – July 2026',
    bullets: [
      'Evaluated and refined AI-generated code across Python, JavaScript, TypeScript, and Java using structured rubrics and qualitative feedback, improving model output accuracy across 50+ contracted hours',
      'Designed prescriptive, goal-oriented prompts for multimodal macOS AI agents by combining user intent and task motivation into unified natural language instructions',
      'Contributed to large-scale model training pipelines — including OpenAI\'s Codex — by authoring and scoring diverse prompt categories, directly supporting improvements in model coherence',
    ],
  },
  {
    role: 'Founder & CEO',
    company: 'Bantr',
    url: 'https://bantr.online',
    period: 'Feb 2026 – Aug 2026',
    bullets: [
      'Founded and launched a live debating platform, scaling to 250+ users in open beta',
      'Built the entire product from scratch — design, frontend, and backend — with real-time audio/video over WebRTC and live data on Supabase',
      'Built a Redis-backed rate limiter with 9 per-endpoint tiers across 38 API routes, auto-blocking abusive IPs after 10 violations to keep chat, polling, and auth spam-free',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Sonaara',
    url: 'https://sonaara.com/',
    period: 'Aug 2025 – Dec 2025',
    bullets: [
      'Shipped React Native features to a production mobile app with 600+ users, improving load performance via lazy loading and component optimization',
      'Integrated identity verification with Persona, replacing manual ID review with automated facial matching',
      'Architected the backend schema for a real-time messaging feature, contributing to a 73% userbase increase',
    ],
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    url: '',
    period: 'Jan 2023 – Jan 2026',
    bullets: [
      'Built 20+ full-stack websites for clients across industries using Next.js, React, and Node.js',
      'Worked directly with clients to translate vague ideas into technical requirements',
      'Implemented tailored SEO and performance improvements, averaging a 17% increase in user engagement',
    ],
  },
]
