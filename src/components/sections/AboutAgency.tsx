"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function AboutAgency() {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#ffbe00] font-bold text-xs uppercase tracking-[0.4em] mb-4">Behind The Scenes</p>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
                Real Humans. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#24182e] to-[#ffbe00]">Real Results.</span>
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 font-medium">
                We're not just a faceless dashboard. We are a team of obsessed SEO strategists, growth hackers, and content architects working relentlessly to dominate your market.
              </p>
              
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-gray-700 font-bold">
                  <CheckCircle2 className="text-[#ffbe00] shrink-0" size={20} />
                  <span>Dedicated Account Managers</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-bold">
                  <CheckCircle2 className="text-[#ffbe00] shrink-0" size={20} />
                  <span>Transparent Weekly Reporting</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 font-bold">
                  <CheckCircle2 className="text-[#ffbe00] shrink-0" size={20} />
                  <span>No Outsourcing. 100% In-House Team.</span>
                </li>
              </ul>

              <Link 
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#24182e] hover:text-[#ffbe00] transition-colors group"
              >
                Let&apos;s Build the Future
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Image Grid */}
          <div className="relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#ffbe00]/10 to-[#24182e]/10 blur-[80px] rounded-full -z-10" />

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {/* Image 1: Tall */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="col-span-1 row-span-2 relative rounded-3xl overflow-hidden h-[300px] md:h-[450px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] group"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" 
                  alt="Team Collaborating"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Image 2: Top Right */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative rounded-3xl overflow-hidden h-[140px] md:h-[215px] shadow-lg group"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
                  alt="Data Analysis"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>

              {/* Image 3: Bottom Right */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative rounded-3xl overflow-hidden h-[140px] md:h-[215px] shadow-lg group"
              >
                <Image 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop" 
                  alt="SEO Strategy"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>
            
            {/* Floating Badge on Images */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 md:-left-12 bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-4 z-10"
            >
              <div className="w-12 h-12 rounded-full bg-[#24182e] flex items-center justify-center text-white font-black text-xl">
                10+
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Years of</p>
                <p className="font-black text-gray-900">Experience</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
