"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Rocket } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#020306] border-t border-white/5">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[#ffbe00]/50 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#ffbe00]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#24182e]/40 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Inner Glow Card */}
          <div className="bg-[#0a0d14]/60 backdrop-blur-2xl rounded-[3rem] p-10 md:p-20 border border-white/[0.05] shadow-[0_0_50px_rgba(255,190,0,0.05)] relative overflow-hidden group">
            
            {/* Dynamic Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#ffbe00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#ffbe00]/20 to-[#24182e]/60 border border-[#ffbe00]/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(255,190,0,0.2)]"
              >
                <Rocket size={32} className="text-[#ffbe00]" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbe00] to-amber-200">Dominate</span><br className="hidden md:block" />
                Your Market?
              </h2>
              
              <p className="text-[#8892b0] text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                Stop losing traffic to competitors. Partner with our engineering team to architect digital systems that drive predictable, scalable ROI.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link 
                  href="/contact"
                  className="w-full sm:w-auto px-10 py-5 bg-[#ffbe00] text-[#24182e] font-black text-sm uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,190,0,0.3)] hover:shadow-[0_0_40px_rgba(255,190,0,0.5)] flex items-center justify-center gap-3"
                >
                  Start a Project
                  <ArrowRight size={18} />
                </Link>
                <Link 
                  href="/contact"
                  className="w-full sm:w-auto px-10 py-5 bg-transparent border border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-full hover:border-[#ffbe00] hover:text-[#ffbe00] transition-all duration-300 flex items-center justify-center"
                >
                  Get Free Audit
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
