import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getProjectByIdentifier } from "@/lib/projects";

export const revalidate = 300;

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectByIdentifier(id);

  if (!project) {
    return { title: "Project Not Found | Portfolio" };
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectByIdentifier(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
