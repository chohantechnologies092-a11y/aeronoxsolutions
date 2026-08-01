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
                  <div className="group relative h-[450px] sm:h-[500px] w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5 transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,190,0,0.15)]">
                    
                    {/* Background Image */}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#090512]/10 via-[#090512]/40 to-[#090512] transition-opacity duration-500 opacity-90 group-hover:opacity-100" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-20">
                      <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                          {project.serviceCategory ? project.serviceCategory.replace("-", " ") : firstTag}
                        </span>
                      </div>

                      {project.growthBadge && (
                        <div className="bg-accent text-[#090512] px-3 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider shadow-[0_0_15px_rgba(255,190,0,0.3)]">
                          {project.growthBadge}
                        </div>
                      )}
                    </div>

                    {/* Bottom Content Area */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 flex flex-col justify-end h-full">
                      <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                        {project.client && (
                          <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-3 drop-shadow-md">
                            {project.client}
                          </span>
                        )}
                        
                        <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight drop-shadow-lg pr-8">
                          {project.title}
                        </h3>
                        
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <p className="text-white/70 font-medium text-sm leading-relaxed line-clamp-3 mb-6">
                            {project.description}
                          </p>
                          
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                            <span className="relative overflow-hidden">
                              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Explore Project</span>
                              <span className="absolute top-0 left-0 inline-block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-white">Explore Project</span>
                            </span>
                            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-white" />
                          </div>
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
