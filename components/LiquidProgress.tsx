"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface LiquidProgressProps {
  level: number;
  color: string;
  name: string;
}

const colorMap: Record<string, { from: string; to: string; accent: string; glow: string }> = {
  "bg-blue-500": { 
    from: "#3B82F6",
    to: "#1E40AF",
    accent: "#60A5FA",
    glow: "0 0 30px rgba(59, 130, 246, 0.8)"
  },
  "bg-green-500": { 
    from: "#10B981",
    to: "#065F46",
    accent: "#6EE7B7",
    glow: "0 0 30px rgba(16, 185, 129, 0.8)"
  },
  "bg-purple-500": { 
    from: "#A855F7",
    to: "#6D28D9",
    accent: "#D8B4FE",
    glow: "0 0 30px rgba(168, 85, 247, 0.8)"
  },
  "bg-orange-500": { 
    from: "#F97316",
    to: "#EA580C",
    accent: "#FB923C",
    glow: "0 0 30px rgba(249, 115, 22, 0.8)"
  },
};

export default function LiquidProgress({ level, color, name }: LiquidProgressProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      driftX: number;
      driftY: number;
      duration: number;
      delay: number;
    }>
  >([]);
  const particleIdRef = useRef(0);

  const colors = colorMap[color] || colorMap["bg-blue-500"];
  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (level / 100) * circumference;

  // Gerar partículas ao montar
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, () => ({
      id: particleIdRef.current++,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      driftX: Math.random() * 20 - 10,
      driftY: Math.random() * 20,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-4"
    >
      {/* SVG Container com efeitos avançados */}
      <div className="relative w-32 h-32">
        {/* Glow de fundo */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${colors.from}40, transparent)`,
            boxShadow: colors.glow,
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* SVG Principal */}
        <svg
          ref={svgRef}
          viewBox="0 0 120 120"
          className="w-full h-full absolute inset-0"
        >
          <defs>
            {/* Gradiente principal */}
            <linearGradient id={`gradient-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.accent} stopOpacity="1" />
              <stop offset="50%" stopColor={colors.from} stopOpacity="0.9" />
              <stop offset="100%" stopColor={colors.to} stopOpacity="0.8" />
            </linearGradient>

            {/* Radial gradiente para brilho */}
            <radialGradient id={`radial-${name}`} cx="35%" cy="35%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* Filter para blur */}
            <filter id={`blur-${name}`}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
            </filter>
          </defs>

          {/* Background circle - estático */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="2"
          />

          {/* Animated circles ao fundo */}
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={colors.accent}
            strokeWidth="1"
            opacity="0.2"
            animate={{
              r: [45, 50, 45],
              opacity: [0.2, 0.1, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Progress circle com preenchimento */}
          <motion.circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={`url(#gradient-${name})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 60 60)"
            animate={{
              filter: [
                `drop-shadow(0 0 0px ${colors.from})`,
                `drop-shadow(0 0 10px ${colors.from})`,
                `drop-shadow(0 0 0px ${colors.from})`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner shine/brilho */}
          <circle
            cx="60"
            cy="60"
            r="42"
            fill={`url(#radial-${name})`}
            opacity="0.6"
            filter={`url(#blur-${name})`}
          />

          {/* Partículas - pontos brilhantes */}
          {particles.map((particle) => (
            <motion.circle
              key={particle.id}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              fill={colors.accent}
              opacity="0"
              animate={{
                cx: [particle.x, particle.x + particle.driftX, particle.x],
                cy: [particle.y, particle.y - particle.driftY, particle.y],
                opacity: [0, 0.8, 0],
                r: [particle.size, particle.size * 1.5, particle.size],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Porcentagem em SVG */}
          <text
            x="60"
            y="65"
            textAnchor="middle"
            className="text-2xl font-bold"
            fill={colors.from}
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
            fontSize="20"
          >
            {level}%
          </text>
        </svg>

        {/* Efeito de brilho girante */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, ${colors.accent}40, transparent 25%)`,
            opacity: 0.3,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Label com animação */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <h4 className="text-sm font-bold text-text-primary bg-gradient-to-r from-text-primary to-accent bg-clip-text text-transparent">
          {name}
        </h4>
        <motion.p
          className="text-xs text-text-secondary/60 mt-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Expertise
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
