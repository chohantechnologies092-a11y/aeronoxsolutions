"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


import { Button } from "@/components/ui/Button";

export function Services({ services }: { services: any[] }) {
  if (!services || services.length === 0) return null;

  // Filter services that have showOnHome checked
  let displayServices = services.filter(service => service.showOnHome);
  
  // If none are checked, fallback to the first 3
  if (displayServices.length === 0) {
    displayServices = services;
  }
  
  // Limit to exactly 3 cards
  displayServices = displayServices.slice(0, 3);

  return (
    <section id="services" className="py-24 md:py-32 bg-background font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="mb-16 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-bold text-xs uppercase tracking-[0.4em] mb-4"
          >
            Our Capabilities
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Digital Engineering & <br className="hidden sm:block" />
            <span className="text-gradient">Exponential Growth.</span>
          </motion.h2>
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayServices.map((service) => {
              const Icon = (LucideIcons as any)[
                service.icon.charAt(0).toUpperCase() + service.icon.slice(1)
              ] || LucideIcons.Search;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                  key={service.id}
                  className="p-8 flex flex-col h-full relative group overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
                >
                  {/* Background Image */}
                  {service.image && (
                    <>
                      <Image 
                        src={service.image} 
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 z-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1122] via-[#1a1122]/80 to-[#1a1122]/20 z-0" />
                    </>
                  )}

                  <div className="relative z-10 flex-1 flex flex-col h-full">
                    {/* Abstract Icon Container */}
                    <div className="mb-auto relative w-fit">
                      <div 
                        className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 shadow-xl border border-white/20 bg-white/10 backdrop-blur-md relative z-10"
                      >
                        <Icon size={24} style={{ color: service.color || "#ffbe00" }} strokeWidth={2.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mt-12">
                      <h3 className="font-black text-white mb-4 transition-colors text-2xl drop-shadow-lg">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-300 font-medium leading-relaxed mb-8 drop-shadow-md line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Animated Arrow Link */}
                    <div className="mt-auto pt-6 border-t border-white/10">
                      <Link 
                        href={`/services/${service.slug}`} 
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-all hover:scale-105 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] relative overflow-hidden group/btn text-white"
                        style={{ backgroundColor: service.color || "#ffbe00" }}
                      >
                        <span className="relative z-10">Explore Service</span>
                        <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View All Services Button */}
        <div className="mt-16 flex justify-center">
          <Link 
            href="/services" 
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#24182e] text-white font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-[0_0_20px_rgba(36,24,46,0.5)] hover:shadow-[0_10_30px_rgba(36,24,46,0.8)] border border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <span className="relative z-10">Explore More Services</span>
            <ArrowRight size={18} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
