"use client";

import { useCallback, useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Feedback } from "@/types";
import SectionHeader from "@/components/SectionHeader";
import clsx from "clsx";
import { motion } from "framer-motion";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          className={clsx(
            s <= rating ? "text-amber-400 fill-amber-400" : "text-border"
          )}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedback = useCallback(async (showLoading = true) => {
    if (showLoading) setLoading(true);

    try {
      const res = await fetch("/api/feedback/approved", { cache: "no-store" });
      if (!res.ok) return;

      const data = (await res.json()) as { feedback?: Feedback[] };
      setFeedback(data.feedback ?? []);
    } catch {
      // ignore errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleSubmitted = () => {
      void fetchFeedback(true);
    };

    const timeoutId = window.setTimeout(() => {
      void fetchFeedback(true);
    }, 0);

    window.addEventListener("feedback-submitted", handleSubmitted);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("feedback-submitted", handleSubmitted);
    };
  }, [fetchFeedback]);

  return (
    <section
      id="testimonials"
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-2/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="Testimonials"
            title="What people say"
            description="Feedback from clients and collaborators I've worked with."
          />
        </motion.div>

        {loading ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl glass border border-border animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-surface" />
                  <div className="space-y-2">
                    <div className="h-4 bg-surface rounded w-24" />
                    <div className="h-3 bg-surface rounded w-16" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-surface rounded" />
                  <div className="h-4 bg-surface rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : feedback.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {feedback.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl glass border border-border hover:border-accent/40 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Quote size={20} className="text-accent shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-primary">
                      {item.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {item.role}
                    </p>
                  </div>
                </div>

                <StarRating rating={item.rating} />

                <p className="mt-3 text-text-secondary leading-relaxed">
                  {item.comment}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 text-center py-20"
          >
            <p className="text-lg text-text-secondary">
              No testimonials yet.
            </p>
            <p className="text-sm text-muted mt-2">
              Be the first to leave feedback!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
