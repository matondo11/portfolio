import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white pt-28">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-accent mb-3">Projetos</p>
          <h1 className="text-4xl md:text-5xl font-bold">Todos os projetos</h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Explore o portfólio completo e clique em qualquer projeto para ver mais detalhes.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id ?? project._id ?? index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
