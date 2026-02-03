/**
 * Portfolio Data
 */

const portfolioData = {
  personalInfo: {
    name: "Vaibhav Makvana",
    role: "Web Developer / Frontend Developer",
    location: "India",
    email: "vaibhavmakvana14118@gmail.com",
    phone: "+919106117060",
    github: "https://github.com/makvana-vaibhav",
    linkedin: "https://www.linkedin.com/in/vaibhav-makvana/",
    instagram: "https://www.instagram.com/vaibhav_.ahir/",
    about: "I am a web developer focused on building clean, responsive, and performance-driven web applications. I enjoy turning ideas into functional products using HTML, CSS, and JavaScript, and I am currently expanding my skills in backend development."
  },
  
  projects: [
    {
      id: "spotlink",
      title: "SpotLink",
      category: "Browser Extension",
      tech: ["HTML5", "CSS3", "JavaScript", "Chrome Extension APIs", "SpotLink API"],
      description: "Shorten, manage, and organize URLs directly from the browser.",
      fullDescription: "SpotLink is a powerful browser extension designed to streamline how developers and users interact with long URLs. It provides a simple interface to generate shortened links and keep track of them without leaving the current tab.",
      features: [
        "One-click URL shortening",
        "Recent links history",
        "QR code generation for URLs",
        "Dark mode support"
      ],
      learned: "Gained hands-on experience with the Chrome Extension API, including background scripts and popup UI. Learned how to integrate external APIs for link shortening and manage browser-level storage for persistence.",
      links: {
        live: "https://spotlink.cc/spotlink",
        github: null
      },
      featured: true,
      image: "img/spotlink.webp"
    },
    {
      id: "kk-enterprise",
      title: "KK Enterprise",
      subtitle: "Fireworks E-Commerce & Inquiry System",
      category: "E-Commerce",
      tech: ["HTML5", "CSS3", "JavaScript", "PHP (PDO)", "MySQL", "Bootstrap"],
      description: "An inquiry-based e-commerce platform built for a fireworks business for bulk requests without online payments.",
      fullDescription: "This system enables customers to explore a wide range of fireworks, filter and sort products, and submit a consolidated inquiry for bulk orders. Instead of direct checkout, the platform focuses on lead generation and customer communication, which is more suitable for local and wholesale businesses.",
      features: [
        "Responsive and modern UI optimized for all devices",
        "Product search, category filtering, and sorting options",
        "Inquiry-based cart system (no direct payment)",
        "WhatsApp integration for quick communication",
        "Secure Admin Panel for product and inquiry management",
        "Bulk product import via CSV"
      ],
      learned: "Developed a complete inquiry-based e-commerce workflow, implemented admin-side CRUD operations, handled bulk data import, and built a system tailored to real business needs instead of a standard payment-driven model.",
      links: {
        live: "#",
        github: null
      },
      featured: true,
      image: "img/KK_Fireworks.webp"
    },
    {
      id: "cfn-pos",
      title: "CFN Ice Cream Parlour",
      subtitle: "POS & Inventory Management System",
      category: "Desktop Software",
      tech: ["Python 3", "Tkinter (GUI)", "SQLite", "win32print", "ReportLab"],
      description: "An offline POS and inventory system for ice cream parlours, handling billing, stock tracking, and thermal printing.",
      fullDescription: "CFN Ice Cream Parlour POS System is designed to run fully offline on Windows-based POS setups. It supports table-based billing, real-time stock deduction, kitchen order tickets (KOT), and thermal printer integration, making it suitable for daily operations in busy ice cream shops.",
      features: [
        "Table-based billing with bill preview",
        "Direct thermal printer support (ESC/POS)",
        "Kitchen Order Management (KOT) system",
        "Automatic stock deduction and inventory tracking",
        "Dynamic admin panel for item and price management",
        "Daily sales reports and PDF/CSV exports"
      ],
      learned: "Built a complete offline POS system handling real shop workflows, including billing logic, inventory synchronization, kitchen order processing, and printer integration. Gained hands-on experience with desktop GUI development, local databases, and ESC/POS thermal printing.",
      links: {
        live: "https://github.com/vaibhavahir1411/CFN-IceCream-POS-System/releases/download/v1.0/CFN.exe",
        github: "https://github.com/makvana-vaibhav/CFN-IceCream-POS-System"
      },
      featured: true,
      image: "img/CFN.webp"
    },
    {
      id: "green-pantry",
      title: "The Green Pantry",
      subtitle: "Cloud Kitchen Website",
      category: "Web Development",
      tech: ["React (TypeScript)", "Vite", "Tailwind CSS", "Framer Motion", "Wouter"],
      description: "A clean, performance-focused website built for a healthy cloud kitchen brand with smooth animations and transitions.",
      fullDescription: "The Green Pantry is a static, frontend-only website designed to showcase a cloud kitchen offering healthy food options. It emphasizes clarity, speed, and maintainability, with orders redirected to external platforms like delivery apps or WhatsApp.",
      features: [
        "Clean and minimal UI for premium wellness brands",
        "Smooth animations and transitions using Framer Motion",
        "Category-based menu with client-side filtering",
        "Fully responsive layout (Mobile, Tablet, Desktop)",
        "Static architecture for optimized load times",
        "WhatsApp and delivery app order redirection"
      ],
      learned: "Focused on building a performance-optimized frontend, structuring components cleanly, and designing UI interactions that match a wellness-oriented brand. Gained experience in balancing visual polish with maintainability in a React app.",
      links: {
        live: "https://greenpantry.netlify.app/",
        github: "https://github.com/makvana-vaibhav/The-Green-Pantry"
      },
      featured: true,
      image: "img/Green_pantry.webp"
    },
    {
      id: "shree-ganesh-enterprise",
      title: "Shree Ganesh Enterprise",
      subtitle: "Business Website & Product Catalog",
      category: "Web Development",
      tech: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Vite"],
      description: "A professional B2B website built for a manufacturing company to showcase mould accessories and generate inquiries.",
      fullDescription: "Shree Ganesh Enterprise is a modern, performance-focused business website developed for a precision manufacturing company specializing in mould accessories. The project focuses on presenting products clearly and generating business leads using an inquiry-based quote system.",
      features: [
        "Multi-page business website (Home, About, Products, Process, Contact)",
        "Product catalog designed for B2B inquiries",
        "“Request a Quote” and contact forms",
        "WhatsApp integration for instant communication",
        "Fully responsive layout optimized for performance"
      ],
      learned: "Focused on building a performance-optimized frontend, structuring a multi-page business site, and designing a B2B product catalog for maximum clarity and lead generation.",
      links: {
        live: "https://makvana-vaibhav.github.io/shree-ganesh-enterprise/",
        github: "https://github.com/makvana-vaibhav/shree-ganesh-enterprise"
      },
      featured: true,
      image: "img/sge.webp"
    },
    {
      id: "js-projects",
      title: "JavaScript Mini Projects",
      subtitle: "Frontend Practice Collection",
      category: "Learning & Practice",
      tech: ["HTML5", "CSS3", "JavaScript (ES6+)"],
      description: "A collection of small JavaScript-based projects built to strengthen core concepts like DOM manipulation, logic building, and API integration.",
      fullDescription: "This project is a curated collection of small JavaScript applications built as part of continuous practice and learning. Each mini project focuses on a specific concept such as user interaction, logic handling, API usage, or state management.",
      features: [
        "Weather App (API integration)",
        "Rock Paper Scissors & Tic Tac Toe Games",
        "Currency Converter & Calculator",
        "Digital Clock & Age Calculator",
        "Email Generator & Hacking Simulator",
        "DOM manipulation and Event handling practice"
      ],
      learned: "Built a strong foundation in JavaScript and frontend development by applying concepts through hands-on implementation. Gained experience in logic building, API consumption, and creating responsive UI layouts without frameworks.",
      links: {
        live: null,
        github: "https://github.com/makvana-vaibhav/js-projects"
      },
      featured: true,
      image: "img/js-projects.webp"
    }
  ],
  
  skills: {
    frontend: [
      "HTML5",
      "CSS3",
      "Bootstrap",
      "JavaScript (ES6+)"
    ],
    backend: [
      "Node.js",
      "Express.js",
      "PHP",
      "SQL (MySQL)",
      "MongoDB",
      "Authentication",
      "JWT",
      "WebSocket",
    ],
    tools: [
      "Git",
      "GitHub",
      "Postman"
    ],
    web: [
      "SEO (semantic HTML, on-page basics)"
    ],
    other: [
      "Python",
      "AWS (fundamentals)"
    ]
  },

  services: [
    {
      title: "Website Development",
      description: "Custom websites for businesses, personal portfolios, high-conversion landing pages, and fully responsive designs."
    },
    {
      title: "Software for Businesses",
      description: "Tailored software solutions including efficient billing, inventory management, and booking systems."
    },
    {
      title: "eCommerce Solutions",
      description: "Secure, user-friendly online stores with smooth product management and integrated payment solutions."
    },
    {
      title: "Digital Marketing & Social Media",
      description: "Strategic online presence and social media management to grow your brand and reach more customers."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
}
