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
            duration: 240,
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
            duration: 270,
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
    <div className="relative flex flex-col items-center justify-center p-3 rounded-2xl bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer w-[240px] h-[135px] border border-transparent hover:border-[#ffbe00]/30 overflow-hidden">
      <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
        {hasClients ? (
          <Image 
            src={item.logo} 
            alt={item.name} 
            fill 
            className="object-contain scale-110" 
            sizes="240px"
          />
        ) : (
          <item.icon size={64} strokeWidth={1} className="text-gray-300 group-hover:text-[#ffbe00] transition-colors" />
        )}
      </div>
      
      {/* Hover Text Overlay (Saves vertical space) */}
      {hasClients && item.servicesProvided && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent pt-12 pb-3 px-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">
            {item.servicesProvided.split(',')[0]}
          </span>
        </div>
      )}
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
