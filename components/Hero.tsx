"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TypingName from "./TypingName";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
        >
          Hi, I&apos;m <TypingName name="Matondo" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto"
        >
          Full-stack developer specializing in Next.js, NestJS, and scalable web systems.
          I build things that work, scale, and delight.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-accent text-bg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
          >
            View My Work
            <ArrowRight size={18} />
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg border border-border hover:bg-surface transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
