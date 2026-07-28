import type { Metadata } from "next";
import { Services } from "@/components/sections/Services";
import { getServices } from "@/lib/data";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Agency Services",
  description: "Search Engine Optimization, Custom Web Engineering, Social Media Management, AI Automation workflows, and B2B Telemarketing.",
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      {/* Banner Section */}
      <div className="w-full h-[500px] relative">
        <Image
          src="/website-hosting-concept-with-bright-light.jpg"
          alt="Our Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-6 w-full pt-16">
            <p className="text-accent font-bold text-xs uppercase tracking-[0.4em] mb-4">
              Our Offerings
            </p>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
              Full-stack digital engineering.
            </h1>
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed max-w-3xl mx-auto font-medium">
              We build high-performance products, drive organic index traffic, integrate custom LLM automations, and manage outbound lead generation pipelines.
            </p>
          </div>
        </div>
      </div>

      <Services services={services} />
    </>
  );
}
