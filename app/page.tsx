'use client';

import Link from "next/link";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useProfile } from "@/components/hooks/useProfile";
import { useProjects } from "@/components/hooks/useProjects";
import { useServices } from "@/components/hooks/useServices";
import { useSkills } from "@/components/hooks/useSkills";
import { useTimeline } from "@/components/hooks/useTimeline";
import Testimonials from "@/components/Testimonials";
import FeedbackForm from "@/components/FeedbackForm";

const skillGroups = [
  { value: "mastered", label: "Mastered" },
  { value: "learning", label: "Learning" },
  { value: "planned", label: "Planned" },
] as const;

export default function HomePage() {
  const { profile, loading } = useProfile();
  const { projects: allProjects, loading: projectsLoading } = useProjects();
  const { services, loading: servicesLoading } = useServices();
  const { skills, loading: skillsLoading } = useSkills();
  const { items: timelineItems, loading: timelineLoading } = useTimeline();

  const publishedProjects = allProjects.filter((project) => project.published !== false);
  const highlightedProjects = publishedProjects.filter((project) => project.featured);
  const featuredProjects = (highlightedProjects.length ? highlightedProjects : publishedProjects).slice(0, 3);
  const focusServices = services.slice(0, 3);
  const focusSkills = skills.filter((skill) => skill.level === 'mastered').slice(0, 3);
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
            <span className="brand-label mb-6">{loading ? 'CARREGANDO PERFIL' : profile.role?.toUpperCase() || 'PERFIL PROFISSIONAL'}</span>
            <h1 className="brand-heading max-w-xl text-5xl leading-[0.95] tracking-[-0.07em] text-[var(--text-primary)] sm:text-6xl lg:text-7xl">
              {loading ? 'Carregando apresentação...' : profile.summary || profile.name || 'Configure o perfil pelo painel administrativo.'}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-secondary)]">
              {loading ? 'Carregando informações do perfil...' : profile.about || 'Adicione uma apresentação no painel administrativo para exibi-la aqui.'}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="#projects" className="brand-button-primary gap-2">
                Explorar projetos
                <ArrowRight size={16} />
              </Link>
              {!loading && profile.email && <a href={`mailto:${profile.email}`} className="brand-button-secondary gap-2">Entrar em contacto</a>}
            </div>

            <div className="mt-8 flex items-center gap-4">
              {!loading && profile.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:border-[var(--accent)] hover:text-[var(--accent-text)]" aria-label="GitHub">
                <ArrowUpRight size={18} />
              </a>}
              {!loading && profile.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] transition hover:border-[var(--accent)] hover:text-[var(--accent-text)]" aria-label="LinkedIn">
                <ArrowUpRight size={18} />
              </a>}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="brand-card relative w-full max-w-md overflow-hidden p-3">
              <div className="absolute inset-x-8 top-0 h-32 rounded-b-[28px] bg-[var(--accent)]/15 blur-2xl" aria-hidden="true" />
              <div className="relative rounded-[24px] border border-[var(--border)] bg-[var(--surface-strong)] p-4">
                <img
                  src={!loading && profile.photo ? profile.photo : '/foto.jpg'}
                  alt={!loading && profile.name ? profile.name : 'Foto de perfil'}
                  className="h-[420px] w-full rounded-[18px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
                <p className="brand-label mb-2">FOCO</p>
                <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {focusSkills.map((skill) => <div key={skill._id ?? skill.name}>• {skill.name}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {servicesLoading ? Array.from({ length: 3 }, (_, index) => (
            <div key={`service-skeleton-${index}`} className="brand-card h-32 animate-pulse bg-[var(--surface-strong)]" />
          )) : focusServices.map((service) => (
            <div key={service._id ?? service.title} className="brand-card p-5">
              <p className="brand-label mb-3">{service.title}</p>
              <p className="text-sm leading-7 text-[var(--text-secondary)]">{service.description}</p>
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
          {projectsLoading ? Array.from({ length: 3 }, (_, index) => (
            <div key={`project-skeleton-${index}`} className="brand-card h-72 animate-pulse bg-[var(--surface-strong)]" />
          )) : featuredProjects.map((project) => (
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
            <h2 className="brand-heading mt-3 text-4xl sm:text-5xl">Competências profissionais.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skillsLoading ? Array.from({ length: 4 }, (_, index) => (
              <div key={`skill-skeleton-${index}`} className="brand-card h-48 animate-pulse bg-[var(--surface-strong)]" />
            )) : displayedSkillGroups.map((group) => (
              <div key={group.value} className="brand-card p-5">
                <h3 className="mb-4 text-lg font-semibold text-[var(--text-primary)]">{group.label}</h3>
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
            <h2 className="brand-heading mt-3 text-4xl sm:text-5xl">{loading ? 'Carregando perfil...' : profile.role || 'Sobre'}</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-[var(--text-secondary)]">
            {!loading && <p>{profile.about || 'Adicione sua trajetória e apresentação na área de Perfil do painel administrativo.'}</p>}
            {!loading && (profile.location || profile.availability) && <p className="text-sm">{[profile.location, profile.availability].filter(Boolean).join(' · ')}</p>}
          </div>
        </div>
      </section>

      {(timelineLoading || timelineItems.length > 0) && <section className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="brand-label">TRAJETÓRIA</p>
          <h2 className="brand-heading mt-3 text-4xl sm:text-5xl">Experiência e formação.</h2>
          {timelineLoading ? <div className="mt-8 h-36 animate-pulse rounded-2xl bg-[var(--surface-strong)]" /> : (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {(['experience', 'education'] as const).map((category) => {
                const entries = timelineItems.filter((item) => (item.category || 'experience') === category);
                if (entries.length === 0) return null;
                return <div key={category} className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{category === 'experience' ? 'Experiência' : 'Formação'}</h3>
                  {entries.map((item) => <article key={item._id ?? `${category}-${item.title}`} className="brand-card p-5">
                    {item.date && <p className="brand-label">{item.date}</p>}
                    <h4 className="mt-2 font-semibold text-[var(--text-primary)]">{item.title}</h4>
                    {item.subtitle && <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.subtitle}</p>}
                    {item.content && <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--text-secondary)]">{item.content}</p>}
                  </article>)}
                </div>;
              })}
            </div>
          )}
        </div>
      </section>}

      <Testimonials />
      <FeedbackForm />

      <section id="contact" className="mx-auto max-w-6xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">
        <div className="brand-card p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="brand-label">CONTACTO</p>
              <h2 className="brand-heading mt-3 text-4xl sm:text-5xl">{loading ? 'Carregando contato...' : profile.availability || 'Entre em contato'}</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {!loading && profile.email && <a href={`mailto:${profile.email}`} className="brand-card flex items-center justify-between p-4 transition hover:border-[var(--accent)]">
                <div>
                  <p className="text-sm text-[var(--muted)]">E-mail</p>
                  <p className="mt-1 font-medium text-[var(--text-primary)]">{profile.email}</p>
                </div>
                <ArrowUpRight size={18} className="text-[var(--text-secondary)]" />
              </a>}

              {!loading && profile.whatsapp && <a href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="brand-card flex items-center justify-between p-4 transition hover:border-[var(--accent)]">
                <div>
                  <p className="text-sm text-[var(--muted)]">WhatsApp</p>
                  <p className="mt-1 font-medium text-[var(--text-primary)]">{profile.whatsapp}</p>
                </div>
                <ArrowUpRight size={18} className="text-[var(--text-secondary)]" />
              </a>}
              {!loading && profile.socialLinks?.github && <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="brand-card flex items-center justify-between p-4 transition hover:border-[var(--accent)]">
                <div><p className="text-sm text-[var(--muted)]">GitHub</p><p className="mt-1 font-medium text-[var(--text-primary)]">{profile.name || 'Perfil'}</p></div>
                <ArrowUpRight size={18} className="text-[var(--text-secondary)]" />
              </a>}
              {!loading && profile.socialLinks?.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="brand-card flex items-center justify-between p-4 transition hover:border-[var(--accent)]">
                <div><p className="text-sm text-[var(--muted)]">LinkedIn</p><p className="mt-1 font-medium text-[var(--text-primary)]">{profile.name || 'Perfil'}</p></div>
                <ArrowUpRight size={18} className="text-[var(--text-secondary)]" />
              </a>}
              {!loading && profile.resumeUrl && <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="brand-card flex items-center justify-between p-4 transition hover:border-[var(--accent)]">
                <div><p className="text-sm text-[var(--muted)]">Currículo</p><p className="mt-1 font-medium text-[var(--text-primary)]">Visualizar currículo</p></div>
                <ArrowUpRight size={18} className="text-[var(--text-secondary)]" />
              </a>}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}