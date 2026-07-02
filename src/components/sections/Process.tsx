"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/constants";
import { Sparkles } from "lucide-react";

export function Process() {
  return (
    <section className="relative py-32 bg-[#020306] overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#ffbe00]/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#ffbe00]/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#24182e]/40 rounded-full blur-[150px] pointer-events-none opacity-40" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#ffbe00]" />
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ffbe00]">
              Our Methodology
            </p>
            <Sparkles className="w-4 h-4 text-[#ffbe00]" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl text-white"
          >
            A proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbe00] to-amber-200">4-step engine</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-[#8892b0] text-base sm:text-lg leading-relaxed"
          >
            From architecture diagrams to dynamic content deployment — this is how we systematically scale your digital operations.
          </motion.p>
        </div>

        <div className="mt-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 relative">
          {/* Continuous connector line for large screens */}
          <div className="absolute top-[3.25rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#ffbe00]/20 via-[#24182e]/80 to-[#ffbe00]/20 hidden lg:block" />
          
          {processSteps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.15, type: "spring", stiffness: 50 }}
              className="relative group"
            >
              <div className="bg-[#0a0d14]/80 backdrop-blur-xl rounded-3xl p-8 h-full border border-white/[0.05] transition-all duration-500 hover:border-[#ffbe00]/40 hover:bg-[#0c101a] hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,190,0,0.15)] relative overflow-hidden">
                
                {/* Hover gradient effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffbe00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ffbe00]/10 to-[#24182e]/40 font-display text-xl font-black text-white border border-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,190,0,0.3)] group-hover:border-[#ffbe00]/50 mb-8">
                    {step.step}
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-[#8892b0] flex-grow">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


