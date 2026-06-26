export type Certificate = {
  name: string
  issuer: string
  date: string
  file: string
}

export const certificates: Certificate[] = [
  {
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "2025",
    file: "/certificates/ai-fluency-certificate.pdf",
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    date: "2025",
    file: "/certificates/claude-101-certificate.pdf",
  },
]
