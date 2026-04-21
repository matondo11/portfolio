"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const services = [
  {
    title: "Full-Stack Development",
    description: "End-to-end web development using modern frameworks and technologies",
    icon: "💻",
  },
  {
    title: "API Design & Development",
    description: "RESTful and real-time APIs with scalability and performance in mind",
    icon: "🔌",
  },
  {
    title: "Database Design",
    description: "Efficient database architecture and optimization for your needs",
    icon: "💾",
  },
  {
    title: "System Architecture",
    description: "Scalable and maintainable application architecture",
    icon: "🏗️",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="Services"
            title="What I Offer"
            description="Services tailored to bring your ideas to life"
          />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg glass border border-border hover:border-accent/40 transition-colors"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
