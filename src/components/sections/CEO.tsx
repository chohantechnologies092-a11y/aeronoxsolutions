"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";

export function CEO() {
  return (
    <section className="relative border-y border-white/5 py-24 lg:py-32 bg-[#04050a]/30">
      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#00c2ff]/5 to-[#9b5cff]/5 lg:max-w-none lg:w-full flex items-center justify-center"
          >
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-radial-gradient from-[#00c2ff]/10 via-transparent to-transparent opacity-60" />
            <div className="relative flex flex-col items-center">
              <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-gradient-to-br from-[#00c2ff] to-[#9b5cff] font-display text-5xl font-extrabold text-white shadow-[0_0_40px_rgba(0,194,255,0.25)]">
                MD
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-muted">
                <Sparkles size={12} className="text-[#00c2ff]" />
                Leadership
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <Quote size={28} className="text-[#00c2ff]/40" />
              <p className="text-sm font-semibold uppercase tracking-wider text-[#00c2ff]">
                Message from our CEO
              </p>
            </div>
            <blockquote className="font-display mt-4 text-2xl font-bold leading-snug tracking-tight sm:text-3xl text-white">
              We empower businesses to scale faster, deliver exceptional products, and build a sustainable future.
            </blockquote>
            <p className="mt-6 leading-relaxed text-muted text-sm sm:text-base">
              At Aeronox Solutions, we understand the complexities of modern engineering and growth. That is why we do not just consult — we act as a direct development extension of your team, delivering premium design, technical SEO architecture, and intelligent workflow automation built for global scale.
            </p>
            <div className="mt-8 border-l-2 border-[#9b5cff] pl-4">
              <p className="font-display text-lg font-bold text-white">
                Muhammad Dawood
              </p>
              <p className="text-sm text-muted">Chief Executive Officer</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
