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
      'Scaled a legislation-tracking platform from 1 to 4 jurisdictions (GA, DE, MD, U.S. federal) with a config-driven design, so a new state takes one database row instead of a new scraper',
      'Raised Maryland bill summary coverage from 0% to 100% (2,677 bills) by running a production backfill on AWS ECS, deploying manually when the CI pipeline was blocked',
      'Built an adversarial FOR/AGAINST mode for Claude-powered research briefs that argues one side with cited sources and must rebut the 2–3 strongest counterarguments, so a one-sided brief can\'t invent evidence',
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
    period: 'Feb 2026 – June 2026',
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
      'Shipped identity-verification and messaging features to a production React Native app serving 600+ users, improving load performance by 22% via lazy loading and component optimization',
      'Integrated an identity-verification API (TruFace) to onboard 90+ verified users, replacing manual ID review with automated facial matching that cut 8 minutes from each verification',
      'Architected the Firebase backend schema for a real-time messaging feature, contributing to a 73% userbase increase over 3 months',
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
