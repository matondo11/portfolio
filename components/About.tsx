"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="About"
            title="Who I am"
            description="Full-stack developer passionate about building scalable systems"
          />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4">Background</h3>
            <p className="text-text-secondary leading-relaxed">
              I am a passionate full-stack developer with expertise in modern web technologies.
              I have experience building scalable applications using Next.js, NestJS, and cloud technologies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4">Expertise</h3>
            <p className="text-text-secondary leading-relaxed">
              Full-stack development, system architecture, database design, API development,
              and cloud deployment. I focus on writing clean, maintainable code.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
