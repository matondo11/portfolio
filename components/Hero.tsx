"use client";

import { ArrowRight, Github, Linkedin, Download } from "lucide-react";

const badges = ["Next.js", "NestJS", "React", "Node.js", "TypeScript"];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-40"
        style={{ backgroundSize: "40px 40px" }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-2/10 rounded-full blur-3xl animate-pulse2 pointer-events-none" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-border/80 text-xs text-text-secondary mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Available for freelance &amp; contracts
        </div>

        {/* Name */}
        <h1
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="text-text-primary">I build things</span>
          <br />
          <span className="gradient-text">for the web.</span>
        </h1>

        {/* Description */}
        <p
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          Full-stack engineer specialising in{" "}
          <span className="text-accent font-medium">Next.js</span>,{" "}
          <span className="text-accent-2 font-medium">NestJS</span>, and
          production-grade web systems. Based in{" "}
          <span className="text-text-primary font-medium">Luanda, Angola</span>.
        </p>

        {/* Tech badges */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-10 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {badges.map((b) => (
            <span
              key={b}
              className="px-3 py-1 text-xs font-mono rounded-md bg-surface border border-border text-text-secondary"
            >
              {b}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-all shadow-glow hover:shadow-lg hover:-translate-y-0.5"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text-secondary hover:text-text-primary hover:border-accent/40 font-medium text-sm transition-all hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-4 mt-10 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-1.5 p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface transition-colors text-sm"
            aria-label="Download Resume"
          >
            <Download size={16} />
            <span className="text-xs">Resume</span>
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
