"use client";

import { motion } from "framer-motion";
import { Eye, ShieldCheck, HeartHandshake } from "lucide-react";
import Image from "next/image";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function AboutContent() {
  return (
    <>
      <div className="bg-mesh pt-36 pb-20 relative overflow-hidden">
        {/* Decorative ambient gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ffbe00]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#24182e]/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex flex-col items-start text-left"
            >
              <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-[#ffbe00]/10 text-[#24182e] ring-1 ring-inset ring-[#ffbe00]/30 mb-6 shadow-[0_0_15px_rgba(255,190,0,0.2)]">
                Who We Are
              </span>
              <h1 className="font-display max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
                Empowering growth through engineering excellence &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbe00] to-[#24182e]">trust</span>
              </h1>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
                We architect high-performance digital systems and manage ROI-driven search campaigns. Aeronox Solutions acts as a direct technical extension to brands and scaling agencies globally.
              </p>
              
              <div className="mt-10 flex gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-12 h-12 rounded-full border-2 border-background overflow-hidden relative z-[${10-i}]`}>
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Team Member" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-1 text-[#ffbe00]">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-foreground mt-1">Trusted by 500+ clients</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ffbe00]/20 to-[#24182e]/20 rounded-3xl blur-2xl transform scale-95" />
              <div className="relative rounded-3xl overflow-hidden border border-card-border shadow-2xl bento-card">
                <div className="aspect-[4/3] w-full relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="Aeronox Solutions Team Collaboration" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent mix-blend-multiply" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="mt-20 grid gap-6 sm:grid-cols-3"
          >
            {[
              { value: "98%", label: "Client retention rate" },
              { value: "500+", label: "Successful projects" },
              { value: "50K+", label: "Hours of manual labor saved" },
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label} 
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bento-card relative overflow-hidden p-8 text-center bg-card/50 backdrop-blur-sm border border-card-border"
              >
                {/* Subtle gradient hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffbe00]/5 to-[#24182e]/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <p className="relative z-10 font-display text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#ffbe00] to-[#24182e] bg-clip-text text-transparent mb-3">
                  {stat.value}
                </p>
                <p className="relative z-10 text-xs lg:text-sm uppercase tracking-widest text-muted font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Core Values Section */}
      <section className="relative py-24 bg-card/30 border-t border-card-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-center mx-auto"
          >
            <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-[#24182e]/10 text-[#24182e] ring-1 ring-inset ring-[#24182e]/20 mb-4 shadow-[0_0_15px_rgba(36,24,46,0.1)]">
              Our Culture
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Core values that define us
            </h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 grid gap-8 sm:grid-cols-3"
          >
            {[
              {
                icon: Eye,
                title: "Absolute Transparency",
                description: "No hidden dashboards, no vanity metrics. We report real technical diagnostics, actual keyword positioning, and transparent campaign ROI.",
                color: "text-[#24182e]",
                bg: "bg-[#ffbe00]/20",
                ring: "ring-[#ffbe00]/40"
              },
              {
                icon: ShieldCheck,
                title: "Engineering First",
                description: "We don't cut corners. From Core Web Vitals to semantic indexing schemas, we build digital assets on performance-driven foundations.",
                color: "text-[#24182e]",
                bg: "bg-[#ffbe00]/20",
                ring: "ring-[#ffbe00]/40"
              },
              {
                icon: HeartHandshake,
                title: "Client Centricity",
                description: "We work as a dedicated white-label or collaborative partner, aligning directly with your timelines, KPIs, and operational workflows.",
                color: "text-[#24182e]",
                bg: "bg-[#ffbe00]/20",
                ring: "ring-[#ffbe00]/40"
              }
            ].map((val, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeIn}
                className="bento-card p-8 bg-card/40 backdrop-blur-md border border-card-border hover:border-foreground/10 transition-colors group flex flex-col items-center text-center"
              >
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${val.bg} ${val.color} ring-1 ring-inset ${val.ring} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <val.icon size={28} />
                </div>
                <h3 className="font-display mt-6 text-xl font-bold text-foreground">
                  {val.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Process />
      <CTA />
    </>
  );
}


