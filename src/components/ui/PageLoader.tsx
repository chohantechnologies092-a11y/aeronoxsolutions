"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import logoImage from "@/Untitled-2-01.png";

export function PageLoader() {
  return (
    <div className="flex-col min-h-[60vh] flex items-center justify-center p-8 w-full h-full">
      <div className="relative flex items-center justify-center w-24 h-24">
        {/* Outer spinning dashed ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border border-dashed border-[#ffbe00]/40"
        />
        
        {/* Inner pulsing solid ring */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-2 rounded-full border-2 border-[#ffbe00]/30"
        />

        {/* Central Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#ffbe00]/10 to-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,190,0,0.15)] overflow-hidden"
        >
          <Image 
            src={logoImage}
            alt="Loading..." 
            className="w-12 h-12 object-contain drop-shadow-[0_0_8px_rgba(255,190,0,0.3)]" 
          />
        </motion.div>
      </div>
      
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-6 text-sm font-semibold tracking-widest text-[#ffbe00] uppercase"
      >
        Loading
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
        >
          ...
        </motion.span>
      </motion.p>
    </div>
  );
}
