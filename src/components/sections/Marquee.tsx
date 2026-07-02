const brands = [
  "Next.js",
  "Tailwind CSS",
  "React",
  "Shopify",
  "OpenAI API",
  "Google Cloud",
  "Meta Ads",
  "HubSpot",
  "Make.com",
  "WordPress",
  "Python",
  "Google Analytics",
];

export function Marquee() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#020306] py-10">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#020306] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#020306] to-transparent pointer-events-none" />
      
      <div className="flex w-max select-none">
        <div className="flex animate-marquee gap-16 pr-16 text-lg font-bold tracking-widest uppercase text-muted/30 font-display">
          {brands.map((brand, i) => (
            <div key={`brand-1-${i}`} className="flex items-center gap-4 hover:text-[#00c2ff]/50 transition-colors cursor-default">
              <span>{brand}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#9b5cff]/40" />
            </div>
          ))}
        </div>
        <div className="flex animate-marquee gap-16 pr-16 text-lg font-bold tracking-widest uppercase text-muted/30 font-display">
          {brands.map((brand, i) => (
            <div key={`brand-2-${i}`} className="flex items-center gap-4 hover:text-[#00c2ff]/50 transition-colors cursor-default">
              <span>{brand}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#9b5cff]/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
