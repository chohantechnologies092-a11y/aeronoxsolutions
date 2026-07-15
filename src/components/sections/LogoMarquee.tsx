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
    <section className="py-20 bg-muted/10 border-y border-border overflow-hidden flex flex-col items-center relative">
      
      <div className="relative z-10 w-full max-w-7xl px-4 flex flex-col items-center mb-12">
        <span className="px-4 py-1.5 rounded-full border border-border bg-card shadow-sm text-muted-foreground text-xs font-bold uppercase tracking-widest mb-4">
          Our Clients
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground tracking-tight">
          Trusted by <span className="text-foreground font-black">Innovative Brands</span> Worldwide
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
    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer w-[280px]">
      <div className="relative w-14 h-14 rounded-xl bg-background border border-black/5 dark:border-white/5 p-2 flex items-center justify-center group-hover:scale-105 transition-all duration-300 overflow-hidden shadow-sm">
        {hasClients ? (
          <Image 
            src={item.logo} 
            alt={item.name} 
            fill 
            className="object-contain p-2 grayscale contrast-0 brightness-0 dark:brightness-200 opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
          />
        ) : (
          <item.icon size={24} strokeWidth={1.5} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
          {item.name}
        </span>
        {hasClients && item.servicesProvided && (
          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
            {item.servicesProvided.split(',')[0]}
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
