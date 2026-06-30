export type Certificate = {
  name: string
  issuer: string
  date: string
  url: string
}

export const certificates: Certificate[] = [
  {
    name: "Claude 101",
    issuer: "Anthropic",
    date: "2025",
    url: "https://verify.skilljar.com/c/dp5w7hmff5kz",
  },
  {
    name: "Claude Code 101",
    issuer: "Anthropic",
    date: "2026",
    url: "https://verify.skilljar.com/c/bm3o7ikpgdzc",
  },
]
