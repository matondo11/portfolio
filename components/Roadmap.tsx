"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

const roadmapItems = [
  {
    phase: "Phase 1",
    title: "Foundation",
    items: ["Core architecture", "API development", "Database setup"],
    status: "completed",
  },
  {
    phase: "Phase 2",
    title: "Features",
    items: ["Authentication", "Real-time updates", "Performance optimization"],
    status: "completed",
  },
  {
    phase: "Phase 3",
    title: "Scale",
    items: ["Microservices", "Cloud deployment", "Monitoring"],
    status: "in-progress",
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="Development"
            title="My Roadmap"
            description="Where I've been and where I'm going"
          />
        </motion.div>

        <div className="mt-12 space-y-6">
          {roadmapItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg glass border border-border"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                    item.status === "completed"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-accent">
                      {item.phase}
                    </span>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <ul className="space-y-1">
                    {item.items.map((todo) => (
                      <li
                        key={todo}
                        className="text-sm text-text-secondary flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-text-secondary" />
                        {todo}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
