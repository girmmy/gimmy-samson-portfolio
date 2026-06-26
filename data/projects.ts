export type Project = {
  index: string
  title: string
  year: string
  link: string
  video?: string
  tags: string[]
  description: string[]
  image: string
}

export const projects: Project[] = [
  {
    index: '01',
    title: 'Bantr',
    year: '2026',
    link: 'https://bantr.online',
    video: 'https://youtu.be/kuEK-LMJMFE?si=ZehGh3FzTmnAp5yB',
    tags: ['Next.js', 'TypeScript', 'LiveKit', 'Supabase', 'Tailwind'],
    description: [
      'Founded and built a live debating platform in open beta with 250+ users, enabling real-time audio and video debates',
      'Implemented live audience polling, real-time chat, and side-voting so viewers can engage as debates unfold',
      'Architected the full product from the ground up — design, frontend, and backend',
    ],
    image: '/bantr-img.png',
  },
  {
    index: '02',
    title: 'Scholarlink',
    year: '2025',
    link: 'https://thescholarlink.netlify.app',
    tags: ['React', 'JavaScript', 'Tailwind', 'Netlify'],
    description: [
      'Built a scholarship discovery platform connecting students with funding opportunities matching their goals',
      'Designed search and filtering to help students find relevant scholarships quickly and efficiently',
      'Submitted to TSA state competition as a full web development entry',
    ],
    image: '/scholarlink-img.png',
  },
  {
    index: '03',
    title: 'Transvero',
    year: '2025',
    link: 'https://transvero.netlify.app/',
    tags: ['React.js', 'TypeScript', 'Tailwind', 'AssemblyAI'],
    description: [
      'Developed real-time multilingual transcription app with live audio processing using React and AssemblyAI',
      'Implemented user auth, multi-language transcription, and PDF export functionality',
      'Built efficient state management and optimized performance for seamless UX',
    ],
    image: '/transvero-img.jpg',
  },
  {
    index: '04',
    title: 'GimmyAI',
    year: '2024',
    link: 'https://gimmyai.netlify.app',
    tags: ['AI/ML', 'React', 'Next.js', 'TypeScript', 'Firebase', 'OpenAI API'],
    description: [
      'Engineered full-stack AI-powered assistant serving 130+ active users using React, Next.js, and Firebase',
      'Implemented real-time NLP with context-aware responses and seamless API integrations',
      'Built robust authentication, state management, and scalable architecture',
    ],
    image: '/gimmyai-img.jpg',
  },
  {
    index: '05',
    title: 'SymbioAI',
    year: '2024',
    link: 'https://symbioai.netlify.app',
    tags: ['React', 'JavaScript', 'Node.js', 'OpenAI API'],
    description: [
      'Architected full-stack AI chatbot with four specialized assistants using React, Node.js, and OpenAI API',
      'Delivered personalized environmental advice for carbon, recycling, electricity, and water management',
      'Implemented scalable backend services with optimized performance',
    ],
    image: '/symbioai-img.jpg',
  },
  {
    index: '06',
    title: 'ParkviewTSA Website',
    year: '2024',
    link: 'https://parkviewtsa.org',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    description: [
      'Developed responsive frontend website using HTML, CSS, JavaScript, and Bootstrap for Parkview TSA',
      'Achieved 1k+ clicks and 18k+ total impressions demonstrating strong user engagement',
      'Built centralized platform for club information, events, and member engagement',
    ],
    image: '/parkviewtsa-img.jpg',
  },
]
