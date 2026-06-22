'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (!mounted) return;
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data && Array.isArray((data as any).projects)) {
          // some APIs return { projects: [...] }
          setProjects((data as any).projects);
        } else {
          // defensive fallback
          console.warn('Unexpected /api/projects response:', data);
          setProjects([]);
        }
      } catch (err) {
        console.error('Failed to load projects', err);
        setProjects([]);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const safeProjects = Array.isArray(projects) ? projects : [];
  const filteredProjects =
    filter === 'all'
      ? safeProjects
      : safeProjects.filter((p) => (p.technologies || []).includes(filter));

  const technologies = Array.from(
    new Set(safeProjects.flatMap((p) => (Array.isArray(p.technologies) ? p.technologies : [])))
  );

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Projetos
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600' : 'bg-gray-700'}`}
        >
          Todos
        </button>
        {technologies.map((tech) => (
          <button
            key={tech}
            onClick={() => setFilter(tech)}
            className={`px-4 py-2 rounded ${filter === tech ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project._id ?? project.id ?? index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}