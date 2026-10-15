'use client';

import { motion } from 'framer-motion';
import { useSkills } from '@/components/hooks/useSkills';

const categories = [
  { value: 'mastered', label: 'Mastered' },
  { value: 'learning', label: 'Learning' },
  { value: 'planned', label: 'Planned' },
] as const;

const defaultProficiency = {
  mastered: 90,
  learning: 70,
  planned: 50,
};

const categoryLabels = {
  mastered: 'Dominadas',
  learning: 'Em aprendizagem',
  planned: 'Planejadas',
} as const;

export default function Skills() {
  const { skills, loading } = useSkills();

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Habilidades
      </motion.h2>

      {loading ? (
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-56 rounded-3xl bg-gray-800/70 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {categories.map((category, categoryIndex) => {
            const categorySkills = skills.filter((skill) => skill.level === category.value);
            if (categorySkills.length === 0) return null;
            return (
              <motion.div
                key={category.value}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.15 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-semibold mb-6">{categoryLabels[category.value]}</h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, index) => {
                    const proficiency = skill.proficiency ?? defaultProficiency[skill.level];
                    return (
                      <div key={`${skill.name}-${index}`}>
                        <div className="flex justify-between mb-2 text-sm md:text-base">
                          <span>{skill.name}</span>
                          <span>{proficiency}%</span>
                        </div>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${proficiency}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-2 rounded bg-blue-600"
                        />
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
