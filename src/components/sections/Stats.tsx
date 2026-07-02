"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function Stats() {
  return (
    <section className="relative py-20 bg-[#020306] border-y border-white/5">
      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 gap-x-8 sm:grid-cols-4 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <p className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl bg-gradient-to-r from-[#00c2ff] to-[#9b5cff] bg-clip-text text-transparent">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-muted sm:text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
