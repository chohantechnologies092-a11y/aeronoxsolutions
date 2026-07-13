"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const devSlugs = [
  'custom-web-engineering', 
  'mobile-app-development', 
  'api-backend-architecture', 
  'saas-development'
];

export function Services({ services }: { services: any[] }) {
  const [filter, setFilter] = useState("all");

  if (!services || services.length === 0) return null;

  const filteredServices = services.filter(service => {
    if (filter === "all") return true;
    if (filter === "marketing") return !devSlugs.includes(service.slug);
    if (filter === "development") return devSlugs.includes(service.slug);
    return true;
  });

  return (
    <section id="services" className="py-24 md:py-32 bg-background font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Section */}
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
            className="text-4xl md:text-6xl font-black text-foreground tracking-tight leading-[1.1] max-w-4xl mx-auto mb-12"
          >
            Digital Engineering & <br className="hidden sm:block" />
            <span className="text-gradient">Exponential Growth.</span>
          </motion.h2>

          {/* Premium Filter Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-wrap items-center justify-center p-1.5 bg-muted/50 backdrop-blur-xl border border-border/50 rounded-full shadow-lg mx-auto relative z-20"
          >
            {[
              { id: "all", label: "All Services" },
              { id: "marketing", label: "SEO & Marketing" },
              { id: "development", label: "Custom Engineering" }
            ].map((tab) => {
              const isActive = filter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`relative px-6 py-3 rounded-full text-sm font-bold transition-colors ${
                    isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 bg-foreground rounded-full -z-10 shadow-md"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
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
                  className="bento-card p-8 flex flex-col h-full"
                >
                  {/* Background Glow */}
                  <div 
                    className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: service.color }}
                  />

                  <div className="flex-1 flex flex-col">
                    {/* Abstract Icon Container */}
                    <div className="mb-8 relative w-fit">
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-md border border-border bg-background relative z-10"
                      >
                        <Icon size={28} style={{ color: service.color }} strokeWidth={2.5} />
                      </div>
                      {/* Icon shadow/glow */}
                      <div 
                        className="absolute inset-0 w-16 h-16 rounded-2xl blur-xl opacity-30 transition-opacity group-hover:opacity-60"
                        style={{ backgroundColor: service.color }}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="font-black text-foreground mb-4 transition-colors text-2xl">
                      {service.title}
                    </h3>
                    
                    <p className="text-muted-foreground font-medium leading-relaxed mb-8 flex-grow">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Animated Arrow Link */}
                  <div className="mt-auto">
                    <Link 
                      href={`/services/${service.slug}`} 
                      className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest transition-colors hover:opacity-80"
                      style={{ color: service.color }}
                    >
                      Explore Service
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
