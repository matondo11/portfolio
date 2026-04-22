'use client';

import { motion } from 'framer-motion';
import { Project } from '@/types';
import { ExternalLink, Github, Figma } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const statusColors = {
    production: 'bg-green-500',
    'in-progress': 'bg-yellow-500',
    idea: 'bg-gray-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-2xl transition-shadow"
    >
      <div className="relative">
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
        {project.video && (
          <video
            src={project.video}
            className="w-full h-48 object-cover absolute top-0 left-0 opacity-0 hover:opacity-100 transition-opacity"
            muted
            loop
            autoPlay
          />
        )}
        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${statusColors[project.status]}`} />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-300 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map(tech => (
            <span key={tech} className="bg-blue-600 px-2 py-1 rounded text-sm">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          {project.github && (
            <a href={project.github} className="text-gray-400 hover:text-white">
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="text-gray-400 hover:text-white">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {project.figma && (
            <a href={project.figma} className="text-gray-400 hover:text-white">
              <Figma className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}