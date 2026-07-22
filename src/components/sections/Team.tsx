"use client";

import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa6";

export function Team({ team }: { team: any[] }) {
  return (
    <section className="relative py-24 lg:py-32 bg-[#04050a]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Our Builders
          </p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Experts behind your growth
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted text-sm sm:text-base">
            A cross-functional team of technical engineers, marketers, and developers working in sync.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {team.map((member: any, i: number) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card group rounded-3xl p-6 text-center transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 font-display text-xl font-bold text-accent transition-transform group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,190,0,0.15)]">
                {member.initials}
              </div>
              <h3 className="font-display mt-5 font-bold text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-xs text-muted font-medium">{member.role}</p>

              <div className="mt-4 flex justify-center">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/0 text-muted transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <FaLinkedin size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
