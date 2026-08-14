"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export function Testimonials({ testimonials = [] }: { testimonials?: any[] }) {
  const displayTestimonials = testimonials.filter(t => t.isActive !== false);

  if (!displayTestimonials || displayTestimonials.length === 0) {
    return null;
  }

  const scrollLeft = () => {
    const slider = document.getElementById("testimonial-slider");
    if (slider) slider.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    const slider = document.getElementById("testimonial-slider");
    if (slider) slider.scrollBy({ left: 450, behavior: "smooth" });
  };

  useEffect(() => {
    const slider = document.getElementById("testimonial-slider");
    if (!slider || displayTestimonials.length <= 1) return;

    let intervalId = setInterval(() => {
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 20) {
        slider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        slider.scrollBy({ left: 450, behavior: "smooth" });
      }
    }, 4000);

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => {
      intervalId = setInterval(() => {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 20) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: 450, behavior: "smooth" });
        }
      }, 4000);
    };

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [displayTestimonials.length]);

  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[600px] bg-gradient-to-br from-[#ffbe00]/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#ffbe00] mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#ffbe00]"></span> Validation
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-tight">
              What our clients say
            </h2>
          </div>
          
          <div className="flex gap-4 hidden md:flex">
            <button
              onClick={scrollLeft}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-[#ffbe00] hover:text-black hover:border-[#ffbe00] transition-all shadow-sm group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollRight}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-[#ffbe00] hover:text-black hover:border-[#ffbe00] transition-all shadow-sm group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div 
          id="testimonial-slider"
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 custom-scrollbar scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayTestimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="snap-center sm:snap-start shrink-0 w-[90vw] sm:w-[400px] md:w-[450px] h-[550px] bg-[#120b18] rounded-3xl p-8 flex flex-col shadow-xl border border-slate-800 relative group transition-all duration-500 hover:border-[#ffbe00]/50"
            >
              <Quote className="absolute top-6 right-6 h-16 w-16 text-white/5 rotate-12 transition-transform duration-500 group-hover:-rotate-12 pointer-events-none" />
              
              {testimonial.videoUrl ? (
                <div className="w-full relative rounded-xl overflow-hidden shadow-md aspect-video mb-6 border border-white/10 z-10 bg-black shrink-0">
                  {/* @ts-ignore */}
                  <ReactPlayer 
                    url={testimonial.videoUrl} 
                    controls 
                    width="100%"
                    height="100%"
                    className="absolute top-0 left-0"
                    config={({
                      facebook: {
                        attributes: {
                          'data-show-text': false,
                          'data-show-captions': true
                        }
                      }
                    } as any)}
                  />
                </div>
              ) : (
                <div className="mb-6 z-10 flex gap-1.5 text-[#ffbe00]">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, j) => (
                    <Star key={j} size={18} fill="#ffbe00" className="text-[#ffbe00]" />
                  ))}
                </div>
              )}

              <div className="overflow-y-auto mb-6 z-10 flex-grow pr-2 custom-scrollbar-light" style={{ scrollbarWidth: 'thin', scrollbarColor: '#ffbe00 #1e1e1e' }}>
                <blockquote className="text-slate-200 text-lg leading-relaxed font-medium">
                  "{testimonial.quote}"
                </blockquote>
              </div>

              <div className="mt-auto flex items-center gap-4 z-10 border-t border-white/10 pt-5 shrink-0">
                {testimonial.image ? (
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full object-cover shadow-sm border border-slate-700"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[#ffbe00] text-xl shadow-sm border border-slate-700">
                      {testimonial.author?.charAt(0) || "C"}
                    </div>
                  </div>
                )}
                <div>
                  <cite className="not-italic font-bold text-white text-base block leading-tight">
                    {testimonial.author}
                  </cite>
                  <p className="text-xs text-[#ffbe00] font-bold uppercase tracking-wider mt-1">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex gap-4 md:hidden justify-center mt-4">
          <button
            onClick={scrollLeft}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-[#ffbe00] hover:text-black hover:border-[#ffbe00] transition-all shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-[#ffbe00] hover:text-black hover:border-[#ffbe00] transition-all shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>
    </section>
  );
}
