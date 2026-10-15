'use client';

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useProfile } from "@/components/hooks/useProfile";
import { useProjects } from "@/components/hooks/useProjects";
import { useServices } from "@/components/hooks/useServices";
import { useSkills } from "@/components/hooks/useSkills";

const skillGroups = [
  { value: "mastered", label: "Mastered" },
  { value: "learning", label: "Learning" },
  { value: "planned", label: "Planned" },
] as const;

export default function HomePage() {
  const { profile, loading } = useProfile();
  const { projects: featuredProjects, loading: projectsLoading } = useProjects();
  const { services, loading: servicesLoading } = useServices();
  const { skills, loading: skillsLoading } = useSkills();

  const focusServices = services.slice(0, 3);
  const displayedSkillGroups = skillGroups
    .map((group) => ({
      ...group,
      items: skills
        .filter((skill) => skill.level === group.value)
        .slice(0, 6)
        .map((skill) => skill.name),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <div className="absolute left-[-8rem] top-12 h-80 w-80 rounded-full bg-[var(--accent)]/10 blur-3xl" aria-hidden="true" />
        <div className="absolute right-[-6rem] top-40 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24 lg:pt-16">
          <div className="flex flex-col justify-center">
            <span className="brand-label mb-6">{loading ? 'FULL STACK DEVELOPER' : profile.role?.toUpperCase() || 'FULL STACK DEVELOPER'}</span>
            <h1 className="brand-heading max-w-xl text-5xl leading-[0.95] tracking-[-0.07em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
              {loading ? 'Construo software para resolver problemas reais.' : profile.summary || 'Construo software para resolver problemas reais.'}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
              {loading ? 'Sou Matondo Domingos Bunga, desenvolvedor Full Stack com foco em engenharia backend e desenvolvimento mobile com Flutter. Gosto de transformar problemas concretos em soluções digitais bem estruturadas.' : profile.about || 'Sou um desenvolvedor focado em soluções digitais bem estruturadas e com impacto real.'}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#projects" className="brand-button-primary gap-2">
                Explorar projetos
                <ArrowRight size={16} />
              </Link>
              <a href={profile.socialLinks?.linkedin || 'https://www.linkedin.com'} target="_blank" rel="noreferrer" className="brand-button-secondary gap-2">
                Entrar em contacto
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <a href={profile.socialLinks?.github || 'https://github.com'} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:border-[var(--accent)] hover:text-[var(--accent-text)]" aria-label="GitHub">
                <ArrowUpRight size={18} />
              </a>
              <a href={profile.socialLinks?.linkedin || 'https://www.linkedin.com'} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:border-[var(--accent)] hover:text-[var(--accent-text)]" aria-label="LinkedIn">
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="brand-card relative w-full max-w-md overflow-hidden p-3">
              <div className="absolute inset-x-8 top-0 h-32 rounded-b-[28px] bg-[var(--accent)]/15 blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[24px] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
                <img
                  src={profile.photo || '/foto.jpg'}
                  alt={profile.name || 'Perfil'}
                  className="h-[420px] w-full rounded-[18px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
                <p className="brand-label mb-2">FOCO</p>
                <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <div>• Backend & APIs</div>
                  <div>• Flutter & mobile</div>
                  <div>• Product engineering</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {(servicesLoading && services.length === 0 ? [
            ["Backend & APIs", "Sistemas robustos, integrações e regras de negócio bem estruturadas."],
            ["Mobile com Flutter", "Experiência em interfaces de produto, UX funcional e comunicação com serviços backend."],
            ["Product engineering", "Pensamento orientado a problema, clareza técnica e entrega prática."],
          ] : focusServices.map((service) => [service.title, service.description])).map(([title, text]) => (
            <div key={title} className="brand-card p-5">
              <p className="brand-label mb-3">{title}</p>
              <p className="text-sm leading-7 text-[var(--text-secondary)]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="brand-label">PROJETOS</p>
            <h2 className="brand-heading mt-3 text-4xl sm:text-5xl">Trabalho com foco em impacto real.</h2>
          </div>
          <Link href="/projects" className="hidden items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] md:inline-flex">
            Ver todos
            <ExternalLink size={16} />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {(projectsLoading && featuredProjects.length === 0 ? [
            { id: 'loading-1', title: 'Projeto em destaque', description: 'Carregando dados do portfólio...', status: 'production', technologies: ['Next.js', 'TypeScript'] },
            { id: 'loading-2', title: 'Projeto em destaque', description: 'Carregando dados do portfólio...', status: 'production', technologies: ['React', 'Node.js'] },
            { id: 'loading-3', title: 'Projeto em destaque', description: 'Carregando dados do portfólio...', status: 'production', technologies: ['Flutter', 'MongoDB'] },
          ] : featuredProjects.slice(0, 3)).map((project) => (
            <article key={project.id ?? project._id ?? project.title} className="brand-card overflow-hidden">
              <div className="border-b border-[var(--border)] bg-[var(--surface-strong)] p-4">
                <span className="brand-label">{project.status}</span>
              </div>
              <div className="p-6">
                <h3 className="brand-heading text-2xl text-[var(--text-primary)]">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(project.technologies || []).slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--muted)]">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link href={`/projects/${project.id ?? project._id}`} className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                    Estudo de caso
                    <ArrowRight size={16} />
                  </Link>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full border border-[var(--border)] p-2 text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:text-[var(--accent-text)]" aria-label={`Abrir demo de ${project.title}`}>
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="brand-label">COMPETÊNCIAS</p>
            <h2 className="brand-heading mt-3 text-4xl sm:text-5xl">Competência construída com código real.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {(skillsLoading && skills.length === 0 ? [
              { title: "Backend e APIs", items: ["Node.js", "NestJS", "REST APIs", "PostgreSQL", "Prisma ORM"] },
              { title: "Desenvolvimento mobile", items: ["Flutter", "Arquitetura mobile", "UI patterns", "Integração API"] },
              { title: "Full Stack", items: ["Next.js", "React", "TypeScript", "TailwindCSS", "Product engineering"] },
              { title: "Bases de dados e ferramentas", items: ["MongoDB", "PostgreSQL", "GitHub", "Docker", "Observabilidade"] },
            ] : displayedSkillGroups.map((group) => ({ title: group.label, items: group.items }))).map((group) => (
              <div key={group.title} className="brand-card p-5">
                <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">{group.title}</h3>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="brand-label">SOBRE</p>
            <h2 className="brand-heading mt-3 text-4xl sm:text-5xl">Estrutura, execução e atenção ao detalhe.</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[var(--text-secondary)]">
            <p>
              O meu percurso tem sido guiado pela construção de produtos digitais que realmente resolvem problemas — desde backends com regras de negócio complexas até interfaces que facilitam decisões e trabalho em equipa.
            </p>
            <p>
              Hoje, trabalho na interseção entre engenharia de software, backend e experiência de produto, com foco em sistemas confiáveis, bem pensados e claros no uso.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        <div className="brand-card p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="brand-label">CONTACTO</p>
              <h2 className="brand-heading mt-3 text-4xl sm:text-5xl">Vamos construir algo útil.</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a href={profile.socialLinks?.github || 'https://github.com'} target="_blank" rel="noreferrer" className="brand-card flex items-center justify-between p-4 transition hover:border-[var(--accent)]">
                <div>
                  <p className="text-sm text-[var(--muted)]">GitHub</p>
                  <p className="mt-1 font-medium text-[var(--text-primary)]">{profile.socialLinks?.github ? 'Perfil' : '/matondo11'}</p>
                </div>
                <ArrowUpRight size={18} className="text-[var(--text-secondary)]" />
              </a>

              <a href={profile.socialLinks?.linkedin || 'https://www.linkedin.com'} target="_blank" rel="noreferrer" className="brand-card flex items-center justify-between p-4 transition hover:border-[var(--accent)]">
                <div>
                  <p className="text-sm text-[var(--muted)]">LinkedIn</p>
                  <p className="mt-1 font-medium text-[var(--text-primary)]">{profile.name || 'MDB'}</p>
                </div>
                <ArrowUpRight size={18} className="text-[var(--text-secondary)]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}