export type Experience = {
  role: string
  company: string
  url: string
  period: string
  bullets: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Founder & CEO',
    company: 'Bantr',
    url: 'https://bantr.online',
    period: 'Feb 2026 – Present',
    bullets: [
      'Founded and launched a live debating platform, now in open beta with 250+ users',
      'Built the entire product from scratch, including design, frontend, and backend',
      'Integrated real-time audio/video with WebRTC and live data with Supabase',
    ],
  },
  {
    role: 'AI Trainer & Evaluator',
    company: 'Handshake',
    url: 'https://joinhandshake.com',
    period: 'June 2026 – Present',
    bullets: [
      'Evaluated and refined AI-generated code across Python, JavaScript, TypeScript, and Java using structured rubrics and qualitative feedback, improving model output accuracy across 50+ contracted hours',
      'Designed prescriptive, goal-oriented prompts for multimodal macOS AI agents by combining user intent and task motivation into unified natural language instructions',
      'Contributed to large-scale model training pipelines — including OpenAI\'s Codex — by authoring and scoring diverse prompt categories, directly supporting improvements in model coherence',
    ],
  },
  {
    role: 'SWE Intern',
    company: 'Sonaara',
    url: 'https://sonaara.com/',
    period: 'Aug 2025 – Dec 2025',
    bullets: [
      'Built and tested features on React Native mobile app with 500+ users',
      'Developed messaging feature and identity verification with Persona',
      'Implemented Firebase integration for backend services',
      'Helped increase userbase by 73% since onboarding',
    ],
  },
  {
    role: 'Freelance Web Developer',
    company: 'Self-Employed',
    url: '',
    period: 'Jan 2024 – Jan 2026',
    bullets: [
      'Developed 15+ custom websites for clients across various industries',
      'Achieved 17% average increase in user engagement across projects',
      'Implemented tailored SEO strategies for improved discoverability',
    ],
  },
]
