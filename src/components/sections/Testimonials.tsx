"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function Testimonials({ testimonials = [] }: { testimonials?: any[] }) {
  const displayTestimonials = testimonials.filter(t => t.isActive !== false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll
  useEffect(() => {
    if (displayTestimonials.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const handleNext = () => {
    if (displayTestimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const handlePrev = () => {
    if (displayTestimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  const getOffset = (idx: number, active: number, total: number) => {
    if (idx === active) return 0;
    if (total === 1) return 0;
    if (total === 2) return idx > active ? 1 : -1;
    
    const diff = idx - active;
    if (diff === 1 || diff === -(total - 1)) return 1;
    if (diff === -1 || diff === (total - 1)) return -1;
    
    return diff > 0 ? 2 : -2;
  };

  if (!displayTestimonials || displayTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative py-24 lg:py-32 bg-[#020306] overflow-hidden">
      {/* Background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00c2ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#00c2ff]">
            Validation
          </p>
          <h2 className="font-display mt-3 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            What our clients say
          </h2>
        </div>

        <div className="relative h-[480px] sm:h-[400px] w-full max-w-5xl mx-auto flex items-center justify-center perspective-[1000px]">
          <AnimatePresence initial={false}>
            {displayTestimonials.map((testimonial, idx) => {
              const offset = getOffset(idx, activeIndex, displayTestimonials.length);
              
              // Only render visible items for performance
              if (Math.abs(offset) > 1 && displayTestimonials.length > 3) return null;

              return (
                <motion.div
                  key={idx}
                  className="absolute w-full max-w-[90vw] sm:max-w-lg lg:max-w-xl glass-card rounded-3xl p-8 sm:p-10 flex flex-col items-center text-center cursor-pointer"
                  onClick={() => setActiveIndex(idx)}
                  initial={false}
                  animate={{
                    x: offset === 0 ? "0%" : offset === 1 ? "65%" : offset === -1 ? "-65%" : offset > 1 ? "100%" : "-100%",
                    scale: offset === 0 ? 1 : 0.85,
                    opacity: offset === 0 ? 1 : offset === 2 || offset === -2 ? 0 : 0.4,
                    zIndex: offset === 0 ? 30 : 20,
                    filter: offset === 0 ? "blur(0px)" : "blur(2px)",
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  style={{
                    boxShadow: offset === 0 ? "0 25px 50px -12px rgba(0, 194, 255, 0.15)" : "none",
                    border: offset === 0 ? "1px solid rgba(0, 194, 255, 0.3)" : "1px solid rgba(255,255,255,0.05)"
                  }}
                >
                  <Quote className="h-10 w-10 text-[#00c2ff]/30 mb-6 drop-shadow-md" />
                  
                  <div className="flex gap-1.5 text-gold mb-6">
                    {Array.from({ length: testimonial.rating || 5 }).map((_, j) => (
                      <Star key={j} size={16} fill="currentColor" className="text-gold" />
                    ))}
                  </div>

                  <blockquote className="text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-foreground mb-8">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <footer className="mt-auto flex flex-col items-center gap-3">
                    {testimonial.image && (
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#00c2ff]/40 shadow-[0_0_15px_rgba(0,194,255,0.2)]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <cite className="font-display not-italic font-bold text-white text-lg">
                        {testimonial.author}
                      </cite>
                      <p className="text-xs sm:text-sm text-[#00c2ff] mt-1 tracking-widest uppercase font-semibold">{testimonial.role}</p>
                    </div>
                  </footer>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={handlePrev}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all hover:border-[#00c2ff]/50 hover:text-[#00c2ff] hover:bg-[#00c2ff]/10 hover:shadow-[0_0_15px_rgba(0,194,255,0.2)] focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="flex gap-2">
            {displayTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 focus:outline-none ${
                  activeIndex === i ? "w-8 bg-[#00c2ff] shadow-[0_0_10px_rgba(0,194,255,0.6)]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted transition-all hover:border-[#00c2ff]/50 hover:text-[#00c2ff] hover:bg-[#00c2ff]/10 hover:shadow-[0_0_15px_rgba(0,194,255,0.2)] focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
