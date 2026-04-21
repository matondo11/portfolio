import { Skill } from "@/types";

// HARD SKILLS - Technical
export const hardSkills: Skill[] = [
  { name: "React", level: "mastered" },
  { name: "Next.js", level: "mastered" },
  { name: "Node.js", level: "mastered" },
  { name: "NestJS", level: "mastered" },
  { name: "TypeScript", level: "mastered" },
  { name: "PostgreSQL", level: "mastered" },
  { name: "MongoDB", level: "mastered" },
  { name: "Prisma", level: "mastered" },
  { name: "Docker", level: "learning" },
  { name: "Python", level: "learning" },
  { name: "Figma", level: "mastered" },
];

// SOFT SKILLS - Professional  
export const softSkills: Skill[] = [
  { name: "Problem Solving", level: "mastered" },
  { name: "Communication", level: "mastered" },
  { name: "Continuous Learning", level: "mastered" },
  { name: "Adaptability", level: "mastered" },
  { name: "Teamwork", level: "mastered" },
];

// Legacy export
export const skills: Skill[] = [
  ...hardSkills,
  ...softSkills
];
