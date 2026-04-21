"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Code2 } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "#about", label: "Sobre" },
  { href: "#services", label: "Serviços" },
  { href: "#projects", label: "Projetos" },
  { href: "#roadmap", label: "Habilidades" },
  { href: "#contact", label: "Contato" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-bg/80 backdrop-blur border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* NAV */}
        <nav className="flex items-center justify-between h-16">
          
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 font-mono text-sm font-semibold"
          >
            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
              <Code2 size={16} className="text-accent" />
            </div>

            <span className="gradient-text tracking-tight text-base">
              MDB.portfolio
            </span>
          </Link>

          {/* MENU DESKTOP */}
          <ul className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="
                    px-4 py-2
                    text-sm
                    text-text-secondary
                    hover:text-text-primary
                    rounded-lg
                    transition
                    hover:bg-surface
                  "
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + MOBILE */}
          <div className="flex items-center gap-2">
            
            {/* CTA */}
            <a
              href="#contact"
              className="
                hidden md:inline-flex
                items-center
                justify-center
                h-10
                px-5
              
                text-sm
                font-medium
                rounded-xl
                bg-accent
                text-white
                hover:bg-accent/90
                transition
              "
            >
              Contrate-me
            </a>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="
                md:hidden
                p-2
                rounded-lg
                text-text-secondary
                hover:text-text-primary
                hover:bg-surface
                transition
              "
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE MENU */}
      <div
        className={clsx(
          "md:hidden transition-all duration-300 overflow-hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 pb-4 space-y-2 border-t border-border/40 bg-bg/95 backdrop-blur">
          
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="
                block
                px-4 py-3
                text-sm
                rounded-xl
                text-text-secondary
                hover:text-text-primary
                hover:bg-surface
                transition
              "
            >
              {l.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="
              block
              text-center
              mt-3
              px-4 py-3
              text-sm
              font-medium
              rounded-xl
              bg-accent
              text-white
              hover:bg-accent/90
              transition
            "
          >
            Contrate-me
          </a>
        </div>
      </div>
    </header>
  );
}