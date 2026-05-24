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
  instagram: "https://www.instagram.com/vaibhav_.makvana/",
  domain: "vaibhavmakvana.in",
};

export const techStrip = [
  "Python 3.11", "AWS", "SQS", "Docker", "PostgreSQL", "Redis", "Node.js", "Express.js",
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

export const systemCapabilities = [
  {
    id: "ai-eng",
    name: "AI Systems Engineering",
    description:
      "Python-based pipelines for real AI workloads like image enhancement, inference engines, hallucination detection, content classification, and distributed worker orchestration at scale.",
    tools: ["Python 3.11", "AWS SQS", "OpenAI API", "Task Queues", "Image Processing"],
    color: "#f97316",
    marker: "PYTHON · AI",
  },
  {
    id: "backend-api",
    name: "Backend API Design",
    description:
      "REST API architecture with clean request lifecycles, auth middleware, rate limiting, error handling, schema validation, and production-level reliability.",
    tools: ["Node.js", "Express.js", "Python", "REST", "JWT", "OAuth 2.0"],
    color: "#22c55e",
    marker: "NODE.JS · PYTHON",
  },
  {
    id: "infra",
    name: "Infrastructure & DevOps",
    description:
      "End-to-end production deployments on cloud containerization, automated CI/CD pipelines, reverse proxy configuration, and live system monitoring.",
    tools: ["AWS", "Docker", "Nginx", "Jenkins", "Linux", "CI/CD"],
    color: "#3b82f6",
    marker: "AWS · DOCKER",
  },
  {
    id: "databases",
    name: "Database Architecture",
    description:
      "Schema design for real-world write volumes, indexing strategies, query optimization, connection pooling, and caching layers that don't become bottlenecks.",
    tools: ["PostgreSQL", "Redis", "MongoDB", "MySQL"],
    color: "#a855f7",
    marker: "POSTGRES · REDIS",
  },
  {
    id: "frontend",
    name: "Frontend Systems",
    description:
      "React/TypeScript SPAs when the UI is part of the product - performance-optimized, statically exported, CDN-delivered.",
    tools: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    color: "#6b7280",
    marker: "REACT · TS",
  },
];

export const experience = [
  {
    id: "rishvi",
    company: "Rishvi Ltd",
    role: "Python Backend Developer · AI Developer · DevOps Engineer",

    period: "May 2026 - Present",

    current: true,
    summary: "Working on production AI backend systems in Python and managing cloud infrastructure and DevOps pipelines.",
    aiWork: {
      title: "AI Systems Engineering",
      points: [
        "Building AI-driven image enhancement pipelines - Processing and improving image quality at scale using Python",
        "Developing hallucination detection and auto-tagging systems for AI-generated content - classification, validation, structured labeling",
        "Architecting SQS-based distributed worker systems - asynchronous job queuing, worker coordination, failure recovery",
        "Database design and optimization for high-volume AI workloads - schema design, indexing, query performance tuning",
      ],
    },
    devopsWork: {
      title: "DevOps & Infrastructure",
      points: [
        "Managing production deployment pipelines on AWS - EC2, S3, SQS, CloudFront environment configuration",
        "Containerizing services with Docker - building images, compose setups, environment parity between dev and prod",
        "CI/CD pipeline setup and maintenance - automated testing, build, and deployment workflows",
        "Monitoring production systems - logs, alerts, service health checks",
      ],
    },
    stack: ["Python", "AWS", "Docker", "Dynamodb", "Redis", "CI/CD", "Nginx", "AI Integration", "SQS Workers"],
  },
];

export const projects = [
  {
    id: "snipshare",
    systemName: "SNIPSHARE-PLATFORM",
    title: "SnipShare",
    category: "Distributed Code Sharing Platform",
    status: "deployed" as const,
    description:
      "Production code sharing platform with JWT authentication, ephemeral snippet storage via MongoDB TTL indexes, Dockerized cloud deployment, CI/CD automation via GitHub Actions, and Nginx reverse proxy.",
    architecture: "React → Node.js API → MongoDB Atlas → TTL Engine → Nginx",
    archNodes: ["React", "Node.js API", "MongoDB", "TTL Engine", "Nginx"],
    archColor: "#f97316",
    challenge:
      "TTL index expiration had to be precise at the DB layer - dangling references would corrupt the snippet list. JWT refresh needed careful coordination between React state and the API session lifecycle.",
    stack: ["Node.js", "React", "MongoDB", "Docker", "GitHub Actions", "Nginx", "JWT"],
    components: ["JWT Auth", "TTL Expiry", "Docker Deploy", "CI/CD Pipeline", "Rate Limiter", "Nginx Proxy"],
    links: {
      live: "https://snipshare.vaibhavmakvana.in/",
      github: "https://github.com/makvana-vaibhav/snipshare",
    },
  },
  {
    id: "deploy-infra",
    systemName: "PROD-DEPLOY-PIPELINE",
    title: "Production Deployment Infrastructure",
    category: "DevOps & Deployment Systems",
    status: "deployed" as const,
    description:
      "Automated production deployment pipeline on AWS EC2. Git push triggers GitHub Actions CI, builds Docker containers, deploys to cloud server, and routes traffic through Nginx with health checks and zero-downtime cutover.",
    architecture: "Git Push → GitHub Actions → EC2 Server → Docker → Nginx",
    archNodes: ["Git Push", "GitHub Actions", "EC2 Server", "Docker", "Nginx Proxy"],
    archColor: "#3b82f6",
    challenge:
      "Zero-downtime deployment required container health checks before traffic cutover. Environment variable injection had to work seamlessly across dev and prod. Nginx virtual host config needed to handle multiple services on one EC2 instance.",
    stack: ["GitHub Actions", "AWS EC2", "Docker", "Nginx", "Linux", "Bash", "SSH"],
    components: ["CI/CD Pipeline", "EC2 Setup", "Docker Build", "Health Checks", "Nginx Config", "SSL/TLS"],
    links: {
      live: null as string | null,
      github: null as string | null,
    },
  },
  {
    id: "spotlink",
    systemName: "SPOTLINK-RUNTIME",
    title: "SpotLink",
    category: "Browser Runtime Automation",
    status: "live" as const,
    description:
      "Chrome extension on Manifest V3 with persistent background service workers, async messaging protocol between popup and worker context, cross-session state via chrome.storage, and URL shortening via API.",
    architecture: "Browser UI → Service Worker → chrome.storage → URL API → Output",
    archNodes: ["Browser UI", "Service Worker", "chrome.storage", "URL API", "Output"],
    archColor: "#22c55e",
    challenge:
      "MV3 service workers terminate after 30s inactivity - all in-memory state was lost on idle. Solved by migrating to chrome.storage with a full async message-passing protocol between popup and background context.",
    stack: ["JavaScript", "Chrome APIs", "Manifest V3", "Service Workers", "REST API", "chrome.storage"],
    components: ["Popup UI", "Background Worker", "Storage Manager", "Message Bus", "API Client", "QR Engine"],
    links: {
      live: null as string | null,
      github: null as string | null,
    },
  },
  {
    id: "cfn-pos",
    systemName: "CFN-POS-OFFLINE",
    title: "Offline POS Infrastructure",
    category: "Offline-First Retail System",
    status: "deployed" as const,
    description:
      "Offline-first POS running in a live commercial business. SQLite for local persistence, ESC/POS byte-protocol for thermal printer control, atomic stock deduction, and real-time kitchen order routing, no internet required.",
    architecture: "POS App → SQLite DB → Billing Engine → ESC/POS Driver → Printer",
    archNodes: ["POS App", "SQLite DB", "Billing Engine", "ESC/POS Driver", "Printer"],
    archColor: "#a855f7",
    challenge:
      "Thermal printer required reverse-engineering ESC/POS byte commands for the specific hardware model. Stock deduction had to be atomic to prevent race conditions across concurrent billing sessions on the same machine.",
    stack: ["Python", "Tkinter", "SQLite", "win32print", "ESC/POS", "ReportLab"],
    components: ["Desktop GUI", "SQLite ORM", "Printer Driver", "KOT Engine", "Stock Manager", "Report Gen"],
    links: {
      live: "https://github.com/makvana-vaibhav/CFN-IceCream-POS-System/releases/download/v1.0/CFN.exe",
      github: "https://github.com/makvana-vaibhav/CFN-IceCream-POS-System",
    },
  },
  {
    id: "localbeam",
    systemName: "LOCALBEAM-TRANSFER",
    title: "LocalBeam",
    category: "LAN File Transfer System",
    status: "live" as const,
    description:
      "Local network file transfer system for fast, zero-internet file sharing across LAN devices. Python networking layer with UDP broadcast for device discovery, TCP for reliable transfer, checksum validation, and progress tracking.",
    architecture: "Sender → LAN Discovery → Transfer Engine → TCP Stream → Receiver",
    archNodes: ["Sender", "LAN Discovery", "Transfer Engine", "TCP Stream", "Receiver"],
    archColor: "#f59e0b",
    challenge:
      "LAN discovery needed UDP broadcast without prior knowledge of active devices. File integrity required checksums for large transfers. Progress tracking had to be non-blocking separate thread feeding a shared queue read by the UI.",
    stack: ["Python", "Sockets", "UDP Broadcast", "TCP Transfer", "Threading"],
    components: ["Network Discovery", "Transfer Engine", "Progress Tracker", "Checksum Validator", "CLI Interface"],
    links: {
      live: null as string | null,
      github: "https://github.com/makvana-vaibhav/localbeam-lan-file-transfer",
    },
  },
];

export const aboutContent = {
  headline: "I build things that run in production.",
  description: `Started in frontend HTML, CSS, JavaScript. Moved into backend systems because I was more interested in
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
      body: "I think about failure modes, retries, queue backlogs, schema migrations not just the happy path.",
    },
    {
      title: "Observability is not optional",
      body: "If something breaks in production and I can't see why, that's a gap in the system design, not just bad luck.",
    },
  ],
  domains: [
    { label: "AI Backend Systems", desc: "Python pipelines, SQS workers, image processing, task queues" },
    { label: "REST API Design", desc: "Node.js, Express, PHP request lifecycle, auth, error handling" },
    { label: "Database Engineering", desc: "Schema design, indexing, query optimization, migrations" },
    { label: "DevOps & Cloud", desc: "Docker, AWS, CI/CD pipelines, Nginx, Linux server management" },
    { label: "Frontend Systems", desc: "React, TypeScript, Tailwind when the UI is part of the product" },
  ],
  education: "Diploma in Computer Engineering",
  currentStatus: "Available for backend engineering roles and production AI system projects.",
};
