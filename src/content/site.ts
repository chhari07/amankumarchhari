// Everything personal lives here. Edit this file, not the components.
export const site = {
  name: "Aman Kumar Chhari",
  role: "Applied AI Engineer (Full-Stack)",
  location: "Guna, Madhya Pradesh · open to relocate",
  tagline: "I ship AI features inside real products, with the guardrails that make them safe to run.",
  intro:
    "One gateway for every model call, spend caps, tool use, human approval and eval cases. I build end to end, from system design to deployment.",
  about:
    "Applied AI engineer who ships AI features inside real products, with guardrails built in. I work alone and build end to end: system design, typed backend, UI, payments and deployment. Freelance since 2023; B.Tech CSE 2026.",
  // "What I'm looking for" section: keep in sync with the resume
  jobSearch: {
    roles: ["Applied AI engineer", "Full-stack engineer", "Software engineer (SDE-1)"],
    details: [
      { label: "Type", value: "Full-time" },
      { label: "Level", value: "Entry level · B.Tech CSE, 2026" },
      { label: "Location", value: "Open to relocate" },
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
    {
      role: "Freelance Full-Stack & AI Developer",
      org: "Independent · Guna, MP (Remote)",
      when: "Feb 2023 – Present",
      points: [
        { name: "Rent It, vehicle rental platform", when: "Aug 2025", href: "https://github.com/chhari07/RENT-IT", text: "React and Tailwind app where customers browse vehicles, book and pay through Razorpay, with Firebase sign-in, protected routes, a map section and booking history." },
        { name: "Gurudev Public School, Guna", when: "Oct 2025", href: "https://github.com/chhari07/gurudev-public-school-guna", text: "The school's 15-page website in React, Vite and Tailwind: academics, facilities, gallery, news, director's and principal's desk, holiday homework and the public disclosure page." },
      ],
    },
    { role: "Web Development Intern", org: "Zidio Development · Remote", when: "Aug – Sep 2024" },
  ],
  // All entered solo; `href` links the certificate hosted under /public/certificates.
  achievements: [
    { text: "Finalist (600+ teams), Hacksagon 2025, ABV-IIITM Gwalior, as team MANAD", href: "/certificates/hacksagon-2025-round3.pdf" },
    { text: "Selected pitch, Rajasthan AI Builders Pitch-a-Thon 2026 (National Conference on e-Governance), Jaipur, with ScanCart.ai", href: "/certificates/rajasthan-ai-builders-2026-scancart.jpg" },
    { text: "National Finalist, HackGSon Hackathon" },
    { text: "Semi-Finalist, Smart India Hackathon" },
    { text: "Winner, Reimagine Web Dev Hackathon" },
    { text: "Winner, Component Making Hackathon" },
    { text: "7th Rank, Skill-A-Thon 2024" },
  ],
  // Dock tiles + "used in" rows. `bg`/`fg` colour the dock icon.
  stack: [
    { name: "Next.js", short: "Nx", bg: "#111111", fg: "#ffffff", usedIn: ["Stack", "CloseBy"] },
    { name: "React", short: "Re", bg: "#20232a", fg: "#61dafb", usedIn: ["ScanCart", "Orderly", "Rent It"] },
    { name: "TypeScript", short: "Ts", bg: "#3178c6", fg: "#ffffff", usedIn: ["Stack", "CloseBy"] },
    { name: "Node.js", short: "Nd", bg: "#3c9a4f", fg: "#ffffff", usedIn: ["ScanCart", "Orderly"] },
    { name: "Postgres", short: "Pg", bg: "#d6e6f5", fg: "#336791", usedIn: ["CloseBy", "Orderly"] },
    { name: "Claude API", short: "Ai", bg: "#d97757", fg: "#ffffff", usedIn: ["CloseBy", "ScanCart", "Stack"] },
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
    Backend: ["Node.js", "Express", "FastAPI", "Python", "Supabase Postgres", "Clerk", "Razorpay"],
    "Applied AI": ["Generative AI", "Claude API", "OpenAI API", "Agentic workflows", "Multi-agent (Fetch.ai uAgents)", "Tool use", "Prompt engineering", "Structured outputs (Zod)", "Guardrails", "Human-in-the-loop", "LLM evals", "LLM observability"],
    Infra: ["Vercel", "Netlify", "GitHub Actions", "Linux"],
  },
};
