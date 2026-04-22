'use client';

import { motion } from 'framer-motion';

const skills = {
  Frontend: [
    { name: 'React', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'Tailwind CSS', level: 90 },
  ],
  Backend: [
    { name: 'Node.js', level: 80 },
    { name: 'MongoDB', level: 70 },
    { name: 'PostgreSQL', level: 65 },
  ],
  'UI/UX': [
    { name: 'Figma', level: 75 },
    { name: 'Design Systems', level: 70 },
  ],
  Database: [
    { name: 'MongoDB', level: 70 },
    { name: 'PostgreSQL', level: 65 },
  ],
};

export default function Skills() {
  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Habilidades
      </motion.h2>
      
      {Object.entries(skills).map(([category, skillList], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-semibold mb-6">{category}</h3>
          <div className="space-y-4">
            {skillList.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-2 bg-blue-600 rounded"
                />
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
}