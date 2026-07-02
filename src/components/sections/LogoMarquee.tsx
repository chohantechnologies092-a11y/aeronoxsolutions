"use client";

import { motion } from "framer-motion";
import { Apple, Box, Hexagon, Triangle, Circle, Diamond, Sparkles, Star } from "lucide-react";
import Image from "next/image";

type ClientType = {
  id: string;
  name: string;
  logo: string;
  link: string | null;
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
  // If we have actual clients from the database, use them. Otherwise, use the fallback.
  const hasClients = clients.length > 0;
  
  // Duplicate array multiple times to create a seamless infinite loop that is wide enough
  const itemsToRender = hasClients ? clients : fallbackLogos;
  const marqueeItems = [...itemsToRender, ...itemsToRender, ...itemsToRender, ...itemsToRender];

  return (
    <section className="py-12 bg-[#020306] border-y border-white/5 overflow-hidden flex flex-col items-center relative">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#ffbe00]/20 to-transparent" />
      
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffbe00] mb-8 text-center relative z-10">
        Trusted by Innovative Brands Worldwide
      </p>
      
      {/* Marquee Container with fade masks on edges */}
      <div 
        className="relative flex w-full max-w-[100vw] overflow-hidden z-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: hasClients ? Math.max(20, clients.length * 5) : 30,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex items-center gap-16 pr-16 w-max"
        >
          {marqueeItems.map((item, index) => {
            if (hasClients) {
              const client = item as ClientType;
              const content = (
                <div 
                  key={`${client.id}-${index}`} 
                  className="flex items-center gap-4 group opacity-70 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="relative w-12 h-12 rounded-lg bg-white/5 border border-white/10 p-2 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Image 
                      src={client.logo} 
                      alt={client.name} 
                      fill 
                      className="object-contain p-1 filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                    />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                </div>
              );

              return client.link ? (
                <a href={client.link} target="_blank" rel="noopener noreferrer" key={`${client.id}-${index}-link`}>
                  {content}
                </a>
              ) : content;
            }

            // Fallback rendering
            const fallback = item as typeof fallbackLogos[0];
            const Icon = fallback.icon;
            return (
              <div 
                key={`fallback-${index}`} 
                className="flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300 group opacity-60 hover:opacity-100"
              >
                <Icon size={28} strokeWidth={1.5} className="group-hover:text-[#ffbe00] transition-colors" />
                <span className="text-xl font-bold tracking-tighter">
                  {fallback.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
