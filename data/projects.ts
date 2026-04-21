import type { Project, ProjectInput } from "@/types";

type ProjectSeed = ProjectInput & {
  slug: string;
};

export const projectSeeds: ProjectSeed[] = [
  {
    slug: "emprego360",
    title: "Emprego360",
    description:
      "A full-stack hiring platform for Angolan teams with candidate management, role publishing, and a streamlined recruiter workflow.",
    image: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    status: "production",
    technologies: ["Next.js", "NestJS", "MongoDB", "Tailwind CSS"],
    platforms: ["web"],
    github: "https://github.com/example/emprego360",
    live: "https://emprego360.com",
    views: 124,
    category: "fullstack",
    experienceYears: 4,
    learned: [
      "Built a production-ready hiring flow with a shared design system.",
      "Improved recruiter speed with reusable dashboard patterns and structured search.",
    ],
  },
  {
    slug: "aviator-bot",
    title: "Aviator Bot",
    description:
      "A backend-first monitoring project that analyzes live rounds, pushes alerts, and exposes operator-friendly status insights.",
    image: "https://res.cloudinary.com/demo/image/upload/dog.jpg",
    video: "https://res.cloudinary.com/demo/video/upload/dog.mp4",
    status: "progress",
    technologies: ["Node.js", "TypeScript", "WebSockets", "MongoDB"],
    platforms: ["web", "android"],
    github: "https://github.com/example/aviator-bot",
    views: 78,
    category: "backend",
    experienceYears: 2,
    learned: [
      "Balanced real-time event handling with resilient monitoring workflows.",
      "Focused on observability and alert confidence for fast operator decisions.",
    ],
  },
  {
    slug: "studio-launchpad",
    title: "Studio Launchpad",
    description:
      "A polished Next.js marketing system for service launches with CMS-style sections, lead capture, and reusable design blocks.",
    image:
      "https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
    status: "production",
    technologies: ["Next.js", "React", "Tailwind CSS", "Cloudinary"],
    platforms: ["web", "ios"],
    live: "https://studio-launchpad.com",
    figma: "https://figma.com/example/studio-launchpad",
    views: 41,
    category: "frontend",
    experienceYears: 3,
    learned: [
      "Turned a marketing site into a repeatable launch framework with scalable content blocks.",
      "Improved perceived performance with optimized media delivery and tighter layout rhythm.",
    ],
  },
  {
    slug: "tempo-mobile",
    title: "Tempo Mobile",
    description:
      "A mobile-first fitness companion focused on workout streaks, habit tracking, and lightweight coaching moments for daily consistency.",
    image:
      "https://res.cloudinary.com/demo/image/upload/samples/ecommerce/analog-classic.jpg",
    status: "planned",
    technologies: ["React Native", "Expo", "Firebase", "Figma"],
    platforms: ["android", "ios"],
    figma: "https://figma.com/example/tempo-mobile",
    views: 19,
    category: "mobile",
    experienceYears: 1,
    learned: [
      "Explored mobile onboarding patterns that reduce friction for new users.",
    ],
  },
  {
    slug: "ops-kit",
    title: "Ops Kit",
    description:
      "A developer utility workspace for internal dashboards, scripted jobs, and release checklists that keep small teams shipping reliably.",
    image:
      "https://res.cloudinary.com/demo/image/upload/samples/people/bicycle.jpg",
    status: "production",
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Docker"],
    platforms: ["web"],
    github: "https://github.com/example/ops-kit",
    views: 96,
    category: "tools",
    experienceYears: 2,
    learned: [
      "Designed tooling flows that favor speed, clarity, and repeatable operations.",
    ],
  },
];

export const projects: Project[] = projectSeeds.map((project) => ({
  ...project,
  id: project.slug,
  views: project.views ?? 0,
}));

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id || project.slug === id);
}
