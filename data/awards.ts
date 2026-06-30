export type Award = {
  name: string
  issuer: string
  date: string
  description?: string
}

export const awards: Award[] = [
  {
    name: "LinkedIn Future Possibilities in Tech Scholar",
    issuer: "LinkedIn",
    date: "Apr 2026",
    description: "1 of 25 students in the country for a $40K scholarship and a trip to Mountain View, CA.",
  },
  {
    name: "Teamsters Scholarship Fund Recipient",
    issuer: "Teamsters",
    date: "May 2026",
    description: "$2,000 scholarship awarded to 600 students.",
  },
  {
    name: "Gates Scholarship Semi-Finalist",
    issuer: "Gates Scholarship Foundation",
    date: "Oct 2025",
  },
  {
    name: "AP Scholar with Distinction",
    issuer: "College Board",
    date: "Jul 2024",
  },
]
