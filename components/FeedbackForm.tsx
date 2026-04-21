"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import clsx from "clsx";
import SectionHeader from "@/components/SectionHeader";
import { FeedbackInput } from "@/types";
import { motion } from "framer-motion";

const INITIAL: FeedbackInput = { name: "", rating: 5, comment: "", role: "" };

export default function FeedbackForm() {
  const [form, setForm] = useState<FeedbackInput>(INITIAL);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.comment.trim() || !form.role.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Something went wrong");
      }

      setSuccess(true);
      setForm(INITIAL);
      // Notify Testimonials section to re-fetch
      window.dispatchEvent(new Event("feedback-submitted"));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="feedback" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="Feedback"
            title="Leave a testimonial"
            description="Worked with me? I'd love to hear your experience."
            centered
          />
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4 p-10 rounded-2xl glass border border-emerald-400/30 text-center"
          >
            <CheckCircle2 size={40} className="text-emerald-400" />
            <h3 className="text-lg font-semibold text-text-primary">
              Thank you for your feedback!
            </h3>
            <p className="text-text-secondary text-sm">
              Your testimonial has been submitted and will appear after a quick review.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-2 px-5 py-2 rounded-lg text-sm text-accent border border-accent/30 hover:bg-accent/10 transition-colors"
            >
              Submit another
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 p-8 rounded-2xl glass border border-border"
          >
            {/* Star rating */}
            <div>
              <label className="block text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider">
                Rating
              </label>
              <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, rating: s }))}
                    onMouseEnter={() => setHoverRating(s)}
                    className="p-1 transition-transform hover:scale-110"
                    aria-label={`Rate ${s} out of 5`}
                    aria-pressed={form.rating === s}
                  >
                    <Star
                      size={24}
                      className={clsx(
                        "transition-colors",
                        s <= (hoverRating || form.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-border"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Maria Santos"
                required
                autoComplete="name"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
              />
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider"
              >
                Role / Company
              </label>
              <input
                id="role"
                name="role"
                type="text"
                value={form.role}
                onChange={handleChange}
                placeholder="CTO at Startup"
                required
                autoComplete="organization-title"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
              />
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="block text-xs text-text-secondary mb-2 font-medium uppercase tracking-wider"
              >
                Your Feedback
              </label>
              <textarea
                id="comment"
                name="comment"
                rows={4}
                value={form.comment}
                onChange={handleChange}
                placeholder="Tell me about your experience working together..."
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-text-primary placeholder:text-muted text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors resize-none"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:-translate-y-0.5 shadow-glow"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Submit Feedback
                </>
              )}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
