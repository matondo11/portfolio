import { notFound } from "next/navigation";
import { getProjectById, projects } from "@/data/projects";
import ProjectDetail from "@/components/ProjectDetail";

type Props = {
  params: Promise<{ id: string }>;
};

// Static paths for all projects
export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id || p._id || "" }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
