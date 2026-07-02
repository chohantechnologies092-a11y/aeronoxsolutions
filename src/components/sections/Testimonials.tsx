"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/constants";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto scroll every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative py-24 lg:py-32 bg-[#020306]">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#00c2ff]">
            Validation
          </p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            What our clients say
          </h2>
        </div>

        <div className="relative mt-16 min-h-[260px] sm:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.4 }}
              className="glass-card w-full rounded-3xl p-8 sm:p-12 text-center"
            >
              <Quote className="mx-auto h-8 w-8 text-[#00c2ff]/20 mb-6" />
              
              <div className="flex justify-center gap-1 text-gold mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={15} fill="currentColor" className="text-gold" />
                ))}
              </div>

              <blockquote className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-foreground max-w-3xl mx-auto">
                &ldquo;{testimonials[index].quote}&rdquo;
              </blockquote>

              <footer className="mt-8 border-t border-white/5 pt-6">
                <cite className="font-display not-italic font-bold text-white">
                  {testimonials[index].author}
                </cite>
                <p className="text-xs text-muted mt-1 uppercase tracking-widest font-semibold">{testimonials[index].role}</p>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted transition-all hover:border-[#00c2ff]/30 hover:text-white"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === i ? "w-6 bg-gradient-to-r from-[#00c2ff] to-[#9b5cff]" : "w-2 bg-white/10"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted transition-all hover:border-[#00c2ff]/30 hover:text-white"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
