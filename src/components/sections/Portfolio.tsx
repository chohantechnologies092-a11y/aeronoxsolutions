"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Portfolio({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  // Filter projects that have showOnHome checked
  let displayProjects = projects.filter(project => project.showOnHome);
  
  // If none are checked, fallback to the first 3
  if (displayProjects.length === 0) {
    displayProjects = projects;
  }
  
  // Take only the first 3 for the home page sections
  displayProjects = displayProjects.slice(0, 3);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#090512] relative overflow-hidden transition-colors duration-300">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full md:w-1/3 h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-4 flex items-center justify-center md:justify-start gap-3"
            >
              <span className="w-8 h-px bg-accent/50" />
              Proven Results
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05]"
            >
              Client <span className="text-white/30">Success.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/portfolio"
              className="group flex items-center justify-center md:justify-start gap-4 text-sm font-bold text-white hover:text-accent transition-colors"
            >
              <span className="tracking-wide uppercase">View All Case Studies</span>
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-[#090512] transition-all duration-300 backdrop-blur-md">
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProjects.map((project, i) => {
            const firstTag = project.tags ? project.tags.split(",")[0].trim() : "Case Study";
            
            return (
              <motion.div
                key={`${project.id || 'project'}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Link href={`/portfolio/${project.slug}`} className="block h-full outline-none">
                  <div className="group flex flex-col h-full w-full rounded-[2rem] overflow-hidden border border-white/10 bg-[#120b18] hover:bg-[#1a1122]/90 transition-colors duration-500 hover:shadow-[0_20px_40px_-15px_rgba(255,190,0,0.15)] relative">
                    
                    {/* Image Area - Top Half */}
                    <div className="relative h-[240px] w-full overflow-hidden bg-white/5 shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#120b18] via-transparent to-transparent opacity-80" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-20">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                            {project.serviceCategory ? project.serviceCategory.replace("-", " ") : firstTag}
                          </span>
                        </div>

                        {project.growthBadge && (
                          <div className="bg-[#ffbe00] text-[#120b18] px-3 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider shadow-lg">
                            {project.growthBadge}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Area - Bottom Half */}
                    <div className="flex flex-col flex-grow p-6 sm:p-8 z-20 relative bg-gradient-to-b from-[#120b18] to-[#090512]">
                      {project.client && (
                        <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#ffbe00] mb-3">
                          {project.client}
                        </span>
                      )}
                      
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#ffbe00] transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      
                      <p className="text-white/60 font-medium text-sm leading-relaxed line-clamp-2 mb-6">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5 text-xs font-bold uppercase tracking-widest text-[#ffbe00]">
                        <span className="relative overflow-hidden flex-grow">
                          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore Project</span>
                          <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-white">Explore Project</span>
                        </span>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ffbe00] group-hover:text-[#120b18] transition-all">
                          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                    
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
