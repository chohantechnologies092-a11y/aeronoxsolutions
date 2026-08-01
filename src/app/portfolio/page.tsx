import type { Metadata } from "next";
import { PortfolioList } from "@/components/sections/PortfolioList";
import { getPageSEO, getSEO, getProjects } from "@/lib/data";
import Image from "next/image";

export async function generateMetadata() {
  const globalSeo = await getSEO();
  const pageSeo = await getPageSEO("portfolio");

  return {
    title: pageSeo?.title || globalSeo?.title || "Case Studies & Work Portfolio | Aeronox Solutions",
    description: pageSeo?.description || globalSeo?.description || "Explore our successful projects.",
    keywords: pageSeo?.keywords || globalSeo?.keywords,
  };
}

export const revalidate = 0; // Disable caching for dynamic data

export default async function PortfolioPage() {
  const projects = await getProjects();
  const pageSeo = await getPageSEO("portfolio");
  const bannerImage = pageSeo?.bannerImage || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop";

  return (
    <>
      {/* Premium Banner Section */}
      <div className="w-full h-[600px] relative overflow-hidden bg-[#090512]">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ffbe00]/20 rounded-full blur-[150px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#af52de]/10 rounded-full blur-[150px] opacity-50 pointer-events-none" />
        
        <Image 
          src={bannerImage} 
          alt="Our Portfolio" 
          fill 
          className="object-cover opacity-30 mix-blend-luminosity"
          priority
        />
        
        {/* Subtle Noise Texture Overlay (Optional, but adds a premium feel if we have a pattern, otherwise just gradient) */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090512]/60 to-[#090512]" />
        
        <div className="absolute inset-0 flex items-center justify-center text-center z-10">
          <div className="max-w-4xl mx-auto px-6 w-full pt-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-extrabold uppercase tracking-[0.3em] mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffbe00] animate-pulse" />
              Client Case Studies
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white tracking-tighter leading-[1.05] mb-6 drop-shadow-2xl">
              Work that drives <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbe00] to-[#ffda66]">real outcomes.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#dcd7e3]/80 leading-relaxed max-w-2xl mx-auto font-medium">
              From custom API designs and structured headless e-commerce builds to automated lead acquisition models.
            </p>
          </div>
        </div>
      </div>
      <PortfolioList projects={projects} />
    </>
  );
}
