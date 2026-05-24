export const personal = {
  name: "Vaibhav Makvana",
  handle: "VAIBHAV.SYS",
  title: "Python Backend & AI Systems Developer",
  tagline: "Building backend systems, AI pipelines, and production infrastructure.",
  location: "Rajkot, Gujarat, India",
  email: "vaibhav.r.makvana@gmail.com",
  phone: "+91 9106117060",
  github: "https://github.com/makvana-vaibhav",
  linkedin: "https://www.linkedin.com/in/vaibhav-makvana/",
  instagram: "https://www.instagram.com/vaibhav_.ahir/",
  domain: "vaibhavmakvana.in",
};

export const systemMetrics = [
  { label: "Projects Shipped", value: "7+", unit: "systems" },
  { label: "Technologies", value: "18+", unit: "technologies" },
  { label: "Production Deploys", value: "5+", unit: "deployments" },
  { label: "Yrs Engineering", value: "3+", unit: "years" },
];

export const systemStatus = [
  { service: "API Layer", status: "operational" as const },
  { service: "Backend Workers", status: "operational" as const },
  { service: "Database Layer", status: "operational" as const },
  { service: "Auth Service", status: "operational" as const },
  { service: "Job Queue", status: "operational" as const },
  { service: "Monitoring", status: "operational" as const },
];

export const skillCategories = [
  {
    id: "backend",
    label: "Backend",
    color: "#f97316",
    skills: ["Python", "Node.js", "Express.js", "PHP (PDO)", "REST APIs", "WebSocket"],
  },
  {
    id: "databases",
    label: "Databases",
    color: "#22c55e",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    color: "#3b82f6",
    skills: ["Linux", "AWS", "Docker", "Nginx", "Jenkins", "CI/CD", "Git"],
  },
  {
    id: "frontend",
    label: "Frontend",
    color: "#a855f7",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Tailwind CSS", "Next.js"],
  },
  {
    id: "ai",
    label: "AI & Automation",
    color: "#f59e0b",
    skills: ["Python AI Pipelines", "SQS Workers", "Image Processing", "Task Queues", "OpenAI APIs", "Automation"],
  },
  {
    id: "auth",
    label: "Auth & Security",
    color: "#6b7280",
    skills: ["JWT", "OAuth 2.0", "HTTPS / TLS", "PDO Prepared Statements", "Bcrypt"],
  },
  {
    id: "toolchain",
    label: "Toolchain",
    color: "#6b7280",
    skills: ["Git / GitHub", "Postman", "VS Code", "ESC/POS Protocol", "Vite"],
  },
];

export const experience = [
  {
    id: "rishvi",
    company: "Rishvi Ltd",
    role: "Python Backend Developer · AI Developer · DevOps Engineer",
    type: "Full-time",
    period: "May 2026 – Present",
    location: "Remote",
    current: true,
    summary: "Working on production AI backend systems in Python and managing cloud infrastructure and DevOps pipelines.",
    aiWork: {
      title: "AI Systems Engineering",
      points: [
        "Building AI-driven image enhancement pipelines — processing and improving image quality at scale using Python",
        "Developing hallucination detection and auto-tagging systems for AI-generated content — classification, validation, structured labeling",
        "Architecting SQS-based distributed worker systems — asynchronous job queuing, worker coordination, failure recovery",
        "Database design and optimization for high-volume AI workloads — schema design, indexing, query performance tuning",
      ],
    },
    devopsWork: {
      title: "DevOps & Infrastructure",
      points: [
        "Managing production deployment pipelines on AWS — EC2, S3, environment configuration",
        "Containerizing services with Docker — building images, compose setups, environment parity between dev and prod",
        "CI/CD pipeline setup and maintenance — automated testing, build, and deployment workflows",
        "Monitoring production systems — logs, alerts, service health checks",
      ],
    },
    stack: ["Python", "AWS", "SQS", "Docker", "PostgreSQL", "Redis", "CI/CD"],
  },
];

export const projects = [
  {
    id: "cfn-pos",
    systemName: "CFN-POS-SYSTEM",
    title: "CFN Ice Cream POS",
    category: "Offline Systems Engineering",
    status: "deployed" as const,
    description: "Offline-first point-of-sale system running in a live commercial environment. Handles real-time billing, kitchen order routing, stock deduction, and direct thermal printer communication via ESC/POS byte-level protocol.",
    architecture: "Desktop App → SQLite DB → ESC/POS Printer Driver → KOT System",
    challenge: "Thermal printer required reverse-engineering ESC/POS byte commands for the specific hardware model. Stock deduction had to be atomic to prevent race conditions across concurrent billing sessions.",
    stack: ["Python 3", "Tkinter", "SQLite", "win32print", "ReportLab", "ESC/POS"],
    components: ["Desktop GUI", "SQLite ORM", "Printer Driver", "KOT Engine", "Stock Manager", "Report Generator"],
    links: {
      live: "https://github.com/makvana-vaibhav/CFN-IceCream-POS-System/releases/download/v1.0/CFN.exe",
      github: "https://github.com/makvana-vaibhav/CFN-IceCream-POS-System",
    },
    image: "/img/CFN.webp",
  },
  {
    id: "kk-enterprise",
    systemName: "KK-ECOMM-BACKEND",
    title: "KK Enterprise E-Commerce",
    category: "Backend E-Commerce System",
    status: "deployed" as const,
    description: "B2B inquiry e-commerce backend for a fireworks wholesale business. PHP PDO backend with MySQL, admin panel, bulk CSV import pipeline, and WhatsApp-integrated lead capture.",
    architecture: "Browser → PHP PDO Layer → MySQL → Admin Panel → CSV Import Pipeline",
    challenge: "Bulk CSV import needed batch processing with validation, encoding normalization (UTF-8), and full transaction rollback on any row failure. Admin system required PDO-parameterized queries throughout to prevent SQL injection.",
    stack: ["PHP (PDO)", "MySQL", "Bootstrap", "JavaScript", "CSV Processing"],
    components: ["PDO Backend", "MySQL Schema", "Admin Panel", "CSV Importer", "Lead Capture", "WhatsApp Bridge"],
    links: { live: "#", github: null },
    image: "/img/KK_Fireworks.webp",
  },
  {
    id: "spotlink",
    systemName: "SPOTLINK-EXTENSION",
    title: "SpotLink Browser Extension",
    category: "Browser Runtime Engineering",
    status: "live" as const,
    description: "Chrome extension with Manifest V3 background service workers for URL shortening, persistent storage management via chrome.storage, and QR code generation. Works asynchronously across browser sessions.",
    architecture: "Popup UI → Background Service Worker → SpotLink API → chrome.storage",
    challenge: "MV3 service workers are ephemeral — terminated after 30s inactivity. All in-memory state was lost on browser restart. Migrated to chrome.storage with a messaging protocol between popup and worker.",
    stack: ["JavaScript", "Chrome Extension APIs", "Service Workers", "REST API", "chrome.storage"],
    components: ["Popup UI", "Background Worker", "Storage Manager", "API Client", "QR Generator"],
    links: { live: "https://spotlink.cc/spotlink", github: null },
    image: "/img/spotlink.webp",
  },
  {
    id: "green-pantry",
    systemName: "GREEN-PANTRY-FRONTEND",
    title: "The Green Pantry",
    category: "React Frontend System",
    status: "live" as const,
    description: "Statically-exported React/TypeScript SPA for a cloud kitchen brand. Category-filtered menu, Framer Motion animations, client-side routing via Wouter. Deployed to Netlify CDN with sub-1.5s LCP on mobile.",
    architecture: "React/TS → Vite Build → Static Export → Netlify CDN",
    challenge: "Required sub-2s LCP on mobile without SSR. Achieved through Vite tree-shaking, lazy imports, and WebP image optimization across all menu categories.",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Wouter"],
    components: ["React SPA", "Vite Bundler", "Motion Layer", "CDN Delivery", "Route Manager"],
    links: {
      live: "https://greenpantry.netlify.app/",
      github: "https://github.com/makvana-vaibhav/The-Green-Pantry",
    },
    image: "/img/Green_pantry.webp",
  },
  {
    id: "shree-ganesh-enterprise",
    systemName: "SGE-B2B-PLATFORM",
    title: "Shree Ganesh Enterprise",
    category: "B2B Web Platform",
    status: "live" as const,
    description: "Multi-page B2B website for a precision manufacturing company. Product catalog with inquiry capture, WhatsApp integration, SEO-optimized static pages, deployed on GitHub Pages.",
    architecture: "Vite Multi-Page → Static Build → GitHub Pages → WhatsApp Lead Capture",
    challenge: "B2B catalog needed SEO-optimized pages with lead forms that redirect to WhatsApp — no backend. Required careful URL structure and meta management across multiple static pages.",
    stack: ["HTML5", "Tailwind CSS", "Vite", "JavaScript", "GitHub Pages"],
    components: ["Multi-Page SPA", "Product Catalog", "Inquiry Forms", "WhatsApp Bridge", "Static CDN"],
    links: {
      live: "https://makvana-vaibhav.github.io/shree-ganesh-enterprise/",
      github: "https://github.com/makvana-vaibhav/shree-ganesh-enterprise",
    },
    image: "/img/sge.webp",
  },
  {
    id: "cinemystry",
    systemName: "CINEMYSTRY-ENGINE",
    title: "Cinemystry Game",
    category: "Browser Game State Machine",
    status: "live" as const,
    description: "Browser word-guessing game with a custom game state machine, timer-driven logic, Hindi + English movie database, and real-time DOM rendering. Supports solo and co-op modes with local score persistence.",
    architecture: "Game State Machine → Timer Engine → Movie Database → DOM Renderer → localStorage",
    challenge: "Multi-difficulty timer needed precise tick management without drift. Game state had to be fully serializable for local save/restore. Hindi movie database required Unicode normalization.",
    stack: ["JavaScript (ES6+)", "CSS Animations", "Game Logic", "localStorage API"],
    components: ["State Machine", "Timer Engine", "Movie DB", "Hint System", "Score Tracker"],
    links: {
      live: "https://lnkd.in/gsGzwdSc",
      github: "https://lnkd.in/gQZXbGDw",
    },
    image: "/img/cinemystry.webp",
  },
];

export const aboutContent = {
  headline: "I build things that run in production.",
  description: `Started in frontend — HTML, CSS, JavaScript. Moved into backend systems because I was more interested in
  why things break than how they look. Now I work on Python-based AI systems, backend APIs, distributed workers,
  and the infrastructure that holds it all together.`,
  traits: [
    {
      title: "Read the error log first",
      body: "Before Googling or guessing, I trace the actual failure. Most bugs have a clear stack trace if you look at it.",
    },
    {
      title: "Understand before building",
      body: "I spend time on the problem before writing a line of code. Wrong architecture is more expensive than slow architecture.",
    },
    {
      title: "Systems over scripts",
      body: "I think about failure modes, retries, queue backlogs, schema migrations — not just the happy path.",
    },
    {
      title: "Observability is not optional",
      body: "If something breaks in production and I can't see why, that's a gap in the system design, not just bad luck.",
    },
  ],
  domains: [
    { label: "AI Backend Systems", desc: "Python pipelines, SQS workers, image processing, task queues" },
    { label: "REST API Design", desc: "Node.js, Express, PHP — request lifecycle, auth, error handling" },
    { label: "Database Engineering", desc: "Schema design, indexing, query optimization, migrations" },
    { label: "DevOps & Cloud", desc: "Docker, AWS, CI/CD pipelines, Nginx, Linux server management" },
    { label: "Frontend Systems", desc: "React, TypeScript, Tailwind — when the UI is part of the product" },
  ],
  education: "Diploma in Computer Engineering",
  currentStatus: "Available for backend engineering roles and production AI system projects.",
};
