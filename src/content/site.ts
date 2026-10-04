// Everything personal lives here. Edit this file, not the components.
export const site = {
  name: "Aman Kumar Chhari",
  role: "Full-stack & applied AI engineer",
  location: "Guna, Madhya Pradesh · open to Gurgaon, Bengaluru or remote",
  tagline: "I design, build and ship full-stack applications end to end.",
  intro:
    "Frontend, APIs, databases, auth, payments and AI features. I take an idea to a working, deployed product, from web apps and dashboards to marketplaces, bots and browser extensions.",
  about:
    "Full-stack and applied AI engineer. Since 2023 I've built client products from first brief to deployment, covering frontend, APIs, databases, payments and AI features.",
  // "What I'm looking for" section: keep in sync with the resume
  jobSearch: {
    roles: ["Full-stack engineer", "Applied AI engineer", "Software engineer (SDE-1)"],
    details: [
      { label: "Type", value: "Full-time" },
      { label: "Level", value: "Entry level · B.Tech CSE, 2026" },
      { label: "Location", value: "Gurgaon, Bengaluru or remote" },
      { label: "Start", value: "Immediately" },
    ],
    teams: ["Commerce & merchant tools", "WhatsApp & messaging", "AI features in real products", "Payments & checkout"],
  },
  // "Applied AI" section on the home page
  appliedAi: {
    what: "Applied AI is the engineering that puts language models to work inside real products: deciding where a model actually helps, connecting it to the app's data and tools, checking what it returns, and keeping cost and failures under control. The model is one part of the system, not the whole product.",
    whyIntro: "A model demo takes an afternoon. Making it dependable for real users, with real data and real money, is the hard part. That is the job of an applied AI engineer, and this is how I approach it:",
    why: [
      { title: "Guardrails first", text: "Every model call passes one gateway with auth, rate limits, a kill switch and a daily spend cap." },
      { title: "AI drafts, people decide", text: "The model proposes stock imports, replies and restock ideas. Nothing is saved until the owner approves it." },
      { title: "Checked output", text: "Responses are validated against a Zod schema. Malformed output fails closed: the user sees an error and nothing is saved." },
      { title: "Measured, not guessed", text: "Eval cases cover misspellings, Hindi aliases and gibberish input, so prompt and model changes can be tested before they ship." },
    ],
  },
  education: {
    school: "Jaypee University of Engineering & Technology, Guna",
    degree: "B.Tech, Computer Science & Engineering",
    years: "2022 – 2026",
  },
  experience: [
    { role: "Freelance Full-Stack & AI Developer", org: "Independent / three-person studio · Remote", when: "Feb 2023 – Present" },
    { role: "Web Development Intern", org: "Zidio Development · Remote", when: "Aug – Sep 2024" },
  ],
  achievements: [
    "National Finalist, HackGSon Hackathon",
    "Semi-Finalist, Smart India Hackathon",
    "Finalist, National e-Governance Pitch-a-thon",
    "Winner, Reimagine Web Dev Hackathon",
    "Winner, Component Making Hackathon",
    "7th Rank, Skill-A-Thon",
  ],
  // Dock tiles + skill bars. `bg`/`fg` colour the dock icon; `level` is your own 0–100 rating.
  stack: [
    { name: "Next.js", short: "Nx", bg: "#111111", fg: "#ffffff", level: 90 },
    { name: "React", short: "Re", bg: "#20232a", fg: "#61dafb", level: 90 },
    { name: "TypeScript", short: "Ts", bg: "#3178c6", fg: "#ffffff", level: 85 },
    { name: "Node.js", short: "Nd", bg: "#3c9a4f", fg: "#ffffff", level: 80 },
    { name: "Postgres", short: "Pg", bg: "#d6e6f5", fg: "#336791", level: 75 },
    { name: "Claude API", short: "Ai", bg: "#d97757", fg: "#ffffff", level: 80 },
  ],
  builds: ["Web apps", "APIs & backends", "Dashboards & SaaS", "Auth & payments", "AI features", "Browser extensions"],
  avatar: "/avatar-me.jpg", // square headshot in /public
  email: "amankumarchhari@gmail.com",
  links: {
    github: "https://github.com/chhari07",
    linkedin: "https://www.linkedin.com/in/aman-chhari-9613bb235",
    resume: "/Aman_Kumar_Chhari_Resume.pdf", // drop the PDF into /public
  },
  url: "https://amankumarchhari.vercel.app",
  principles: [
    "AI drafts, humans confirm.",
    "State machines over vibes.",
    "Money as integer paise, never floats.",
    "A failed check is left out, never guessed.",
  ],
  skills: {
    Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    Backend: ["Node.js", "Express", "Supabase Postgres", "Clerk", "Razorpay"],
    "Applied AI": ["Claude API", "Tool use", "Zod-validated output", "LLM evals"],
    Infra: ["Vercel", "Netlify", "GitHub Actions", "Linux"],
  },
};
