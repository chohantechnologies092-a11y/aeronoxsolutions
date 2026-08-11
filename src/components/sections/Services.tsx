/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ServicesProps {
  services: any[];
  limit?: number;
}

export function Services({ services, limit }: ServicesProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  if (!services || services.length === 0) return null;

  // If a limit is specified (e.g. Homepage), filter by showOnHome and slice
  let displayServices = services;

  if (limit) {
    const homeOnly = services.filter(service => service.showOnHome);
    displayServices = homeOnly.length > 0 ? homeOnly.slice(0, limit) : services.slice(0, limit);
  }

  // Pagination math for full services page
  const totalPages = Math.ceil(displayServices.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedServices = limit ? displayServices : displayServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section id="services" className="py-24 md:py-32 bg-background font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#ffbe00]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffbe00]/10 border border-[#ffbe00]/25 text-[#ffbe00] text-xs font-black uppercase tracking-[0.25em] mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(255,190,0,0.15)]"
          >
            <Sparkles size={13} className="text-[#ffbe00]" />
            Our Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
          >
            Digital Engineering & <br className="hidden sm:block" />
            <span className="text-gradient">Exponential Growth.</span>
          </motion.h2>
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {paginatedServices.map((service, index) => {
              const iconName = service.icon 
                ? service.icon.charAt(0).toUpperCase() + service.icon.slice(1)
                : "Search";

              const Icon = (LucideIcons as any)[iconName] || LucideIcons.Search;
              const cardImg = service.cardImage || service.image || service.bannerImage;
              const brandColor = service.color || "#ffbe00";

              // Parse capabilities string
              let capsList: string[] = [];
              if (Array.isArray(service.capabilities)) {
                capsList = service.capabilities;
              } else if (typeof service.capabilities === "string") {
                capsList = service.capabilities.split(",").map((s: string) => s.trim()).filter(Boolean);
              }

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 25 }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                  key={service.id || index}
                  className="rounded-[2.5rem] bg-[#1a1122]/90 border border-white/15 overflow-hidden flex flex-col h-full group hover:border-[#ffbe00]/50 hover:shadow-[0_0_35px_rgba(255,190,0,0.15)] transition-all duration-700 shadow-2xl relative"
                >
                  {/* Subtle top accent bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#ffbe00] to-transparent opacity-40 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `linear-gradient(to right, transparent, ${brandColor}, transparent)` }} />

                  {/* Top Cover Media Container */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-black/40 border-b border-white/10">
                    {cardImg ? (
                      <Image 
                        src={cardImg} 
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#24182e] to-[#090512] flex items-center justify-center">
                        <Icon size={48} style={{ color: brandColor }} className="opacity-20" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1122] via-[#1a1122]/40 to-transparent" />

                    {/* Floating Glassmorphism Icon Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl border border-white/20 bg-black/60 backdrop-blur-md group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500"
                      >
                        <Icon size={22} style={{ color: brandColor }} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between space-y-5 relative z-10 bg-gradient-to-b from-[#1a1122] to-[#090512]">
                    <div>
                      <h3 className="font-black text-white text-2xl leading-snug tracking-tight mb-3 group-hover:text-[#ffbe00] transition-colors">
                        {service.title}
                      </h3>
                      
                      <p className="text-[#dcd7e3]/80 font-medium text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>

                      {/* Capabilities Pills */}
                      {capsList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-4">
                          {capsList.slice(0, 3).map((cap, capIdx) => (
                            <span 
                              key={capIdx} 
                              className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 text-white/90 text-[11px] font-semibold flex items-center gap-1.5 shadow-sm"
                            >
                              <CheckCircle2 size={11} style={{ color: brandColor }} /> {cap}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="pt-5 border-t border-white/10 mt-auto">
                      <Link 
                        href={`/services/${service.slug}`} 
                        className="w-full inline-flex items-center justify-between text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-2xl transition-all duration-300 group/btn border border-white/15 hover:border-transparent text-white hover:text-[#1a1122] shadow-lg relative overflow-hidden"
                        style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      >
                        <span className="relative z-10">Explore Service</span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center relative z-10 group-hover/btn:bg-[#1a1122] group-hover/btn:text-white transition-colors">
                          <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                        </div>
                        <div 
                          className="absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" 
                          style={{ backgroundColor: brandColor }}
                        />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* PAGINATION CONTROLS FOR SERVICES PAGE */}
        {!limit && totalPages > 1 && (
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#1a1122]/80 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-md">
            <span className="text-xs font-medium text-gray-400">
              Showing <strong className="text-white font-bold">{startIndex + 1} – {Math.min(startIndex + ITEMS_PER_PAGE, displayServices.length)}</strong> of <strong className="text-[#ffbe00] font-black">{displayServices.length}</strong> Services
            </span>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-[#ffbe00] hover:text-[#24182e] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft size={14} /> Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => {
                    setCurrentPage(pageNum);
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                    currentPage === pageNum
                      ? "bg-[#ffbe00] text-[#24182e] shadow-lg shadow-[#ffbe00]/20 scale-105"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                  document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-white hover:bg-[#ffbe00] hover:text-[#24182e] disabled:opacity-30 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-20 flex justify-center">
          {limit ? (
            <Link 
              href="/services" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#24182e] text-white font-black uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-[0_0_20px_rgba(36,24,46,0.5)] border border-white/15 overflow-hidden"
            >
              <span className="relative z-10">Explore All Capabilities</span>
              <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-[#ffbe00]" />
            </Link>
          ) : (
            <Link 
              href="/contact" 
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#ffbe00] text-[#24182e] font-black uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-[0_0_25px_rgba(255,190,0,0.3)] hover:bg-white"
            >
              <span>Schedule a Custom Service Consultation</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}
