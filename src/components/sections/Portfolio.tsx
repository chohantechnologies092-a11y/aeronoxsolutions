"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

export function Portfolio({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;

  // Take only the first 3 for the home page sections
  const displayProjects = projects.slice(0, 3);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-white relative overflow-hidden transition-colors duration-300 dark:bg-background">
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-accent font-bold text-xs uppercase tracking-[0.4em] mb-4">Proven Results</p>
            <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-none">
              Client <span className="text-muted-foreground/30">Success.</span>
            </h2>
          </div>
          <Link 
            href="/portfolio"
            className="group flex items-center justify-center md:justify-start gap-2 text-sm font-bold text-foreground hover:text-accent transition-colors"
          >
            View All Case Studies
            <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/20 transition-all">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, i) => {
            const firstTag = project.tags ? project.tags.split(",")[0].trim() : "Case Study";
            
            return (
              <motion.div
                key={project.id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bento-card group overflow-hidden flex flex-col relative"
              >
                <Link href={`/portfolio/${project.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View Case Study</span>
                </Link>
                
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden border-b border-border">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full z-20">
                    <span className="text-[9px] font-black uppercase tracking-widest text-foreground">
                      {firstTag}
                    </span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex-grow flex flex-col justify-between bg-card">
                  <div>
                    <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-accent transition-colors relative z-20">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground font-medium text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-border flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors relative z-20">
                    <span>Read Case Study</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
