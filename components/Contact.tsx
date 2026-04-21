"use client";

import { useState } from "react";
import { Send, Mail, MapPin, MessageSquare, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";

const INITIAL = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate sending — replace with your email service (Resend, Nodemailer, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    setForm(INITIAL);
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-2/30 to-transparent" />
      {/* Bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build together"
          description="Have a project in mind? I'm currently open to freelance work and exciting opportunities."
          centered
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              {
                icon: <Mail size={18} />,
                label: "Email",
                value: "hello@example.com",
                href: "mailto:hello@example.com",
              },
              {
                icon: <MapPin size={18} />,
                label: "Location",
                value: "Luanda, Angola",
                href: null,
              },
              {
                icon: <MessageSquare size={18} />,
                label: "Response time",
                value: "Within 24 hours",
                href: null,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-xl glass border border-border"
              >
                <span className="p-2.5 rounded-lg bg-accent/10 text-accent">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-medium mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-text-primary hover:text-accent transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-text-primary">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {success ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 p-10 rounded-2xl glass border border-emerald-400/30 text-center animate-fade-up">
                <CheckCircle2 size={40} className="text-emerald-400" />
                <h3 className="text-lg font-semibold text-text-primary">Message sent!</h3>
                <p className="text-text-secondary text-sm">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-2 px-5 py-2 rounded-lg text-sm text-accent border border-accent/30 hover:bg-accent/10 transition-colors"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 p-8 rounded-2xl glass border border-border"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and budget..."
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 shadow-glow"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <p>© {new Date().getFullYear()} Dev Portfolio. Built with Next.js & TailwindCSS.</p>
        <p>Designed & developed in Luanda, Angola 🇦🇴</p>
      </div>
    </section>
  );
}
