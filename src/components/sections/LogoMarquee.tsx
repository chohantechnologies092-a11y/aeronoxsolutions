"use client";

import { motion } from "framer-motion";
import { Apple, Box, Hexagon, Triangle, Circle, Diamond, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

type ClientType = {
  id: string;
  name: string;
  logo: string;
  link: string | null;
  servicesProvided?: string | null;
  beforeData?: string | null;
  afterData?: string | null;
};

const fallbackLogos = [
  { name: "ApexTech", icon: Triangle },
  { name: "NovaCorp", icon: Hexagon },
  { name: "Lumina", icon: Sparkles },
  { name: "EchoSystems", icon: Circle },
  { name: "Nexus", icon: Box },
  { name: "Pinnacle", icon: Star },
  { name: "Vertex", icon: Diamond },
  { name: "Apple", icon: Apple },
];

export function LogoMarquee({ clients = [] }: { clients?: ClientType[] }) {
  const hasClients = clients.length > 0;
  const itemsToRender = hasClients ? clients : fallbackLogos;
  
  // Duplicate items to ensure smooth infinite scrolling
  const row1 = [...itemsToRender, ...itemsToRender, ...itemsToRender, ...itemsToRender];
  // Reverse row for the second line
  const row2 = [...itemsToRender].reverse();
  const row2Items = [...row2, ...row2, ...row2, ...row2];

  return (
    <section className="py-20 bg-[#020306] border-y border-white/5 overflow-hidden flex flex-col items-center relative">
      {/* Background glowing effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,190,0,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-mesh opacity-10 pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center mb-12">
        <span className="px-4 py-1.5 rounded-full border border-[#ffbe00]/20 bg-[#ffbe00]/5 text-[#ffbe00] text-xs font-bold uppercase tracking-widest mb-4">
          Our Clients
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white/90 tracking-tight">
          Trusted by <span className="text-[#ffbe00]">Innovative Brands</span> Worldwide
        </h2>
      </div>
      
      {/* Marquee Container with Masking */}
      <div 
        className="relative flex flex-col gap-6 w-full max-w-[100vw] overflow-hidden z-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        {/* Row 1 - Left to Right */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 120,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex items-center gap-6 pr-6 w-max"
        >
          {row1.map((item, index) => (
            <MarqueeCard key={`r1-${index}`} item={item} hasClients={hasClients} />
          ))}
        </motion.div>

        {/* Row 2 - Right to Left */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 135,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex items-center gap-6 pr-6 w-max"
        >
          {row2Items.map((item, index) => (
            <MarqueeCard key={`r2-${index}`} item={item} hasClients={hasClients} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeCard({ item, hasClients }: { item: any, hasClients: boolean }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer w-[300px] h-[160px] border border-transparent hover:border-[#ffbe00]/30">
      <div className="relative w-full h-20 flex items-center justify-center mb-3">
        {hasClients ? (
          <Image 
            src={item.logo} 
            alt={item.name} 
            fill 
            className="object-contain" 
          />
        ) : (
          <item.icon size={56} strokeWidth={1} className="text-gray-300 group-hover:text-[#ffbe00] transition-colors" />
        )}
      </div>
      <div className="flex flex-col items-center text-center">
        {hasClients && item.servicesProvided && (
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-gray-600 transition-colors">
            {item.servicesProvided.split(',')[0]}
          </span>
        )}
        {!hasClients && (
          <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors mt-2">
            {item.name}
          </span>
        )}
      </div>
    </div>
  );

  if (hasClients) {
    return (
      <Link href={`/portfolio/client/${item.id}`} className="block">
        {content}
      </Link>
    );
  }

  return <div>{content}</div>;
}
