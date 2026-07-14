"use client";

import { motion } from "framer-motion";
import { Apple, Box, Hexagon, Triangle, Circle, Diamond, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

function MarqueeItemWrapper({ children, isClient }: { children: React.ReactNode, isClient: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isCenter, setIsCenter] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCenter(entry.isIntersecting);
      },
      {
        root: null,
        // The root margin creates a narrow vertical band in the middle 20% of the viewport.
        rootMargin: "0px -40% 0px -40%",
        threshold: 0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  // We add conditional classes based on whether it is intersecting the center
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-500 ${isCenter ? "opacity-100 scale-110 grayscale-0" : "opacity-40 grayscale"}`}
    >
      {children}
    </div>
  );
}

export function LogoMarquee({ clients = [] }: { clients?: ClientType[] }) {
  const hasClients = clients.length > 0;
  
  const itemsToRender = hasClients ? clients : fallbackLogos;
  const marqueeItems = [...itemsToRender, ...itemsToRender, ...itemsToRender, ...itemsToRender];

  return (
    <section className="py-12 bg-[#020306] border-y border-white/5 overflow-hidden flex flex-col items-center relative">
      <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[#ffbe00]/20 to-transparent pointer-events-none" />
      
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ffbe00] mb-8 text-center relative z-10">
        Trusted by Innovative Brands Worldwide
      </p>
      
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
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="relative w-12 h-12 rounded-lg bg-white/5 border border-white/10 p-2 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Image 
                      src={client.logo} 
                      alt={client.name} 
                      fill 
                      className="object-contain p-1" 
                    />
                  </div>
                  <span className="text-xl font-bold tracking-tight text-white/80 group-hover:text-white transition-colors">
                    {client.name}
                  </span>
                </div>
              );

              return (
                <MarqueeItemWrapper isClient={true} key={`${client.id}-${index}`}>
                  <Link href={`/portfolio/client/${client.id}`} className="block">
                    {content}
                  </Link>
                </MarqueeItemWrapper>
              );
            }

            // Fallback rendering
            const fallback = item as typeof fallbackLogos[0];
            const Icon = fallback.icon;
            return (
              <MarqueeItemWrapper key={`fallback-${index}`} isClient={false}>
                <div className="flex items-center gap-3 text-white">
                  <Icon size={28} strokeWidth={1.5} className="text-[#ffbe00]" />
                  <span className="text-xl font-bold tracking-tighter">
                    {fallback.name}
                  </span>
                </div>
              </MarqueeItemWrapper>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
