"use client";

import { ArrowRight, Download } from "lucide-react";
import { FaGithub, FaLinkedin,  FaNodeJs,  } from "react-icons/fa";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SiNestjs, SiNextdotjs, SiTypescript } from "react-icons/si";
import { GrReactjs } from "react-icons/gr";
import { IoLogoJavascript } from "react-icons/io5";




const badges = [
  {nome:"Next.js", icon: <SiNextdotjs/>},
  {nome:"Nest.js",icon: <SiNestjs/>},
  {nome:"Typescript",icon: <SiTypescript/>},
  {nome:"React",icon: <GrReactjs/>},
  {nome:"Javascript",icon: <IoLogoJavascript/>},
  {nome:"Node.js",icon: <FaNodeJs/>},
];

export default function Hero() {
  return (
    <section className="min-h-screen flex-wrap flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-10">

      {/* Grid background */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-40"
        style={{ backgroundSize: "40px 40px" }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-2/10 rounded-full blur-3xl animate-pulse2 pointer-events-none" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10  px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex justify-center items-center gap-2 px-4 py-2 rounded-full glass border border-border/80 text-xs text-text-secondary mb-8 animate-fade-up">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
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
        className="flex justify-center m-2.5"
        
        >
          {badges.map((b) => (
            <span
              key={b.nome}
              className=""
            >
              {b.icon}
            </span>
          ))}
        </div>



        {/* CTA buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 transition-all shadow-glow hover:shadow-lg hover:-translate-y-0.5"
          >
            View Projects
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform animate-pulse" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border text-text-secondary hover:text-text-primary hover:border-accent/40 font-medium text-sm transition-all hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </motion.div>


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
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
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

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className=""
      >
        <Image
          src="/foto.png"
          alt="Foto de perfil"
          width={400}
          height={400}
          className="rounded-full mx-auto border-4 border-blue-500"
        />
      </motion.div>



      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-max bg-gradient-to-t from-bg to-transpa rent pointer-events-none" />
    </section>
  );
}
