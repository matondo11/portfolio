import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "emprego360",
    title: "Emprego360",
    description:
      "Full-stack job board platform connecting Angolan employers with top talent. Real-time notifications, AI-powered matching, and applicant tracking.",
    longDescription:
      "Emprego360 is Angola's leading job marketplace, built from the ground up to handle high-volume traffic and complex matching algorithms. The platform features role-based access, real-time socket communication, and a powerful admin dashboard.",
    technologies: ["Next.js", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Socket.io", "TailwindCSS"],
    status: "production",
    views: 0,
    filterTags: ["Next.js", "Node.js", "NestJS", "Fullstack"],
    problem:
      "Angola's job market had no modern digital platform. Employers relied on WhatsApp groups and outdated portals with no filtering, no real-time updates, and no applicant tracking.",
    solution:
      "Built a microservice-based platform with NestJS backend, Next.js frontend, and PostgreSQL. Implemented real-time WebSocket notifications, smart job–candidate matching using keyword scoring, and a full ATS (Applicant Tracking System) for HR teams.",
    results: [
      "2,400+ active job listings within 3 months of launch",
      "98.7% uptime with horizontal scaling on Railway",
      "60% reduction in time-to-hire reported by partner companies",
      "Featured by Angolan Ministry of Telecommunications",
    ],
    liveUrl: "https://emprego360.ao",
    gradient: "from-blue-600/20 to-cyan-600/10",
  },
  {
    id: "aviator-bot",
    title: "Aviator Bot",
    description:
      "Automated Aviator crash-game prediction bot with real-time WebSocket integration, pattern analysis engine, and Telegram alerting system.",
    longDescription:
      "A sophisticated bot that connects to the Aviator game's WebSocket feed, analyzes historical round data, and triggers automated alerts through Telegram when statistical patterns reach confidence thresholds.",
    technologies: ["Node.js", "TypeScript", "WebSockets", "MongoDB", "REST API", "Python"],
    status: "in-progress",
    views: 0,
    filterTags: ["Node.js", "Fullstack"],
    problem:
      "Users of the Aviator crash game lacked tooling to analyze historical patterns, track outcomes systematically, or receive real-time signals without manual monitoring.",
    solution:
      "Engineered a Node.js service that maintains a persistent WebSocket connection to the game server, stores round history in MongoDB, and runs a statistical pattern engine. Telegram Bot API delivers instant alerts when conditions are met.",
    results: [
      "Live WebSocket feed with <50ms latency",
      "MongoDB aggregation pipeline processing 10k+ rounds",
      "Telegram integration with 300+ active subscribers",
      "Pattern engine with configurable confidence thresholds",
    ],
    gradient: "from-purple-600/20 to-pink-600/10",
  },
  {
    id: "visa-express",
    title: "Visa Express",
    description:
      "Document management and visa application tracking platform with role-based access, automated email workflows, and multi-step process handling.",
    longDescription:
      "Visa Express digitalises the entire visa application journey. Clients upload documents, track application status in real time, and receive automated emails at each stage. Agents manage cases through a dedicated dashboard.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "TailwindCSS", "REST API"],
    status: "production",
    views: 0,
    filterTags: ["Next.js", "Node.js", "Fullstack"],
    problem:
      "Visa agencies managed client applications through email threads and spreadsheets. Lost documents, missed deadlines, and zero transparency caused high client churn.",
    solution:
      "Designed a three-portal system: client portal for uploads and tracking, agent portal for case management, and admin portal for analytics. Built automated email triggers using Nodemailer at each status transition with PDF generation for official documents.",
    results: [
      "Application processing time cut by 45%",
      "Zero lost documents since platform launch",
      "Client satisfaction rating of 4.8/5 after 6 months",
      "Handles 120+ active applications simultaneously",
    ],
    liveUrl: "https://visaexpress.ao",
    gradient: "from-emerald-600/20 to-teal-600/10",
  },
  {
    id: "nestjs-auth-kit",
    title: "NestJS Auth Kit",
    description:
      "Production-ready authentication boilerplate with JWT refresh tokens, role-based guards, email verification, and rate limiting out of the box.",
    longDescription:
      "A battle-tested NestJS authentication starter that eliminates weeks of boilerplate setup. Includes complete JWT access/refresh token rotation, email verification flows, RBAC guards, and Swagger documentation.",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Prisma", "REST API"],
    status: "production",
    views: 0,
    filterTags: ["NestJS", "Node.js"],
    problem:
      "Every new NestJS project required rebuilding the same auth infrastructure. Missing security features like token rotation and rate limiting led to vulnerabilities in rushed projects.",
    solution:
      "Created an opinionated, security-first NestJS starter with JWT refresh token rotation, Argon2 password hashing, Redis-backed rate limiting, email verification with expiring tokens, and full Swagger/OpenAPI documentation.",
    results: [
      "Used in 4 production projects",
      "Zero auth-related security incidents",
      "90% reduction in auth setup time",
      "Fully documented with Swagger UI",
    ],
    githubUrl: "https://github.com",
    gradient: "from-orange-600/20 to-red-600/10",
  },
  {
    id: "react-dashboard-kit",
    title: "React Dashboard Kit",
    description:
      "Composable analytics dashboard component library built with React, Recharts, and TailwindCSS with dark mode and responsive layout out of the box.",
    longDescription:
      "A modular dashboard kit providing plug-and-play chart components, data table, stat cards, and layout primitives. All components follow compound pattern design for maximum composability.",
    technologies: ["React", "TypeScript", "TailwindCSS"],
    status: "in-progress",
    views: 0,
    filterTags: ["React", "Fullstack"],
    problem:
      "Building analytics dashboards meant reinventing chart wrappers, layout systems, and responsive grids on every project — expensive and inconsistent.",
    solution:
      "Built a component library with Recharts integration, compound component patterns, full TypeScript types, and Tailwind-based theming. Storybook documentation for every component.",
    results: [
      "14 production-ready components",
      "Full dark/light mode support",
      "TypeScript-first API design",
      "Storybook docs with live examples",
    ],
    githubUrl: "https://github.com",
    gradient: "from-sky-600/20 to-blue-600/10",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
