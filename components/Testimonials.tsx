"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { Feedback } from "@/types";
import SectionHeader from "@/components/SectionHeader";
import clsx from "clsx";

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

  const fetchFeedback = () => {
    setLoading(true);

    fetch("/api/feedback")
      .then((r) => r.json())
      .then((d) => {
        // 🔒 proteção total contra qualquer formato errado
        if (Array.isArray(d)) {
          setFeedback(d);
        } else if (Array.isArray(d?.feedback)) {
          setFeedback(d.feedback);
        } else {
          setFeedback([]);
        }
      })
      .catch(() => {
        setFeedback([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFeedback();
    window.addEventListener("feedback-submitted", fetchFeedback);
    return () =>
      window.removeEventListener("feedback-submitted", fetchFeedback);
  }, []);

  // 🔒 proteção extra no render
  const safeFeedback = Array.isArray(feedback) ? feedback : [];

  return (
    <section id="testimonials" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-2/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Testimonials"
          title="What people say"
          description="Feedback from clients and collaborators I've worked with."
        />

        {loading ? (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-2xl glass border border-border animate-pulse"
              />
            ))}
          </div>
        ) : safeFeedback.length === 0 ? (
          <div className="mt-12 text-center text-text-secondary py-12">
            <p>No testimonials yet. Be the first to leave feedback!</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {safeFeedback.map((fb, i) => (
              <div
                key={fb.id || i} // fallback evita crash se id vier undefined
                className="group relative flex flex-col gap-4 p-6 rounded-2xl glass border border-border hover:border-accent-2/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-purple animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Quote
                  size={20}
                  className="text-accent-2/30 group-hover:text-accent-2/50 transition-colors"
                />

                <p className="text-sm text-text-secondary leading-relaxed flex-1">
                  &ldquo;{fb.comment}&rdquo;
                </p>

                <div className="flex items-end justify-between gap-3 pt-3 border-t border-border/60">
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {fb.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {fb.role}
                    </p>
                  </div>
                  <StarRating rating={fb.rating} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}