import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";
import Image from "next/image";
import { getCompanyProfile, getTeamMembers } from "@/lib/data";
import { Quote, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";

export const metadata: Metadata = {
  title: "About Our Agency | Aeronox Solutions",
  description: "Learn more about Aeronox Solutions, our engineering philosophy, digital capabilities, and leadership team.",
};

export default async function AboutPage() {
  const profile = await getCompanyProfile();
  const team = await getTeamMembers();

  return (
    <main>
      <AboutContent />
      
      <div className="pt-12 pb-24 text-foreground relative">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Official Registration Section */}
          <section className="mb-24 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#ffbe00]/10 rounded-full blur-[100px]"></div>
            
            <div className="bento-card bg-card/40 backdrop-blur-md border border-card-border rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center shadow-xl">
              <div className="flex-1 relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold bg-[#ffbe00]/10 text-[#ffbe00] ring-1 ring-inset ring-[#ffbe00]/30 mb-6 shadow-[0_0_15px_rgba(255,190,0,0.2)]">
                  <ShieldCheck size={14} /> Registered Entity
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 text-foreground">
                  Aeronox Solutions LTD
                </h2>
                <div className="prose max-w-none">
                  <p className="text-muted leading-relaxed text-lg mb-4">
                    We are officially incorporated under the Companies Act 2006 as a private company in England and Wales. Our commitment to transparency, legal compliance, and operational excellence begins at the foundational level.
                  </p>
                  <ul className="text-muted space-y-2 font-medium">
                    <li className="flex items-center gap-2">
                      <span className="text-[#ffbe00]">✔</span>
                      Company Number: <strong>16277420</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#ffbe00]">✔</span>
                      Jurisdiction: <strong>England and Wales</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#ffbe00]">✔</span>
                      Incorporation Date: <strong>26th February 2025</strong>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full md:w-5/12 shrink-0 relative z-10 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#ffbe00]/20 to-transparent rounded-2xl blur-xl transform group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-card-border shadow-2xl bg-white p-2">
                  <Image
                    src="/certificate.png"
                    alt="Certificate of Incorporation"
                    width={600}
                    height={800}
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* CEO Message Section */}
          {(profile?.ceoMessage || profile?.ceoImage) && (
            <section className="mb-24 relative">
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#ffbe00]/10 rounded-full blur-3xl"></div>
              
              <div className="bento-card bg-card/40 backdrop-blur-md border border-card-border rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center shadow-xl">
                <Quote className="absolute top-8 right-8 text-foreground/5 w-24 h-24 rotate-180" />
                
                {profile.ceoImage && (
                  <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-3xl overflow-hidden border border-card-border shadow-2xl relative z-10">
                    <Image
                      src={profile.ceoImage}
                      alt="CEO"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 relative z-10">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
                    Message from our <span className="text-[#ffbe00]">CEO</span>
                  </h2>
                  
                  {profile.ceoMessage && (
                    <div className="prose max-w-none md:prose-lg">
                      <p className="text-muted leading-relaxed whitespace-pre-wrap">
                        {profile.ceoMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Meet Our Team Section */}
          <section className="relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ffbe00]/5 rounded-full blur-[140px] pointer-events-none"></div>

            <div className="text-center mb-16 relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold bg-[#ffbe00]/10 text-[#ffbe00] ring-1 ring-inset ring-[#ffbe00]/30 mb-4 shadow-[0_0_15px_rgba(255,190,0,0.15)]">
                <Sparkles size={14} /> Leadership & Engineering Team
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-foreground">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbe00] to-orange-500">Team</span>
              </h2>
              <p className="text-muted text-base md:text-lg max-w-2xl mx-auto">
                The brilliant minds, architects, and visionaries driving our high-performance digital ecosystems and master-level engineering.
              </p>
            </div>

            {team && team.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                {team.map((member) => (
                  <div
                    key={member.id}
                    className="bento-card group relative bg-card/40 backdrop-blur-md border border-card-border rounded-3xl p-6 text-center overflow-hidden hover:border-[#ffbe00]/40 transition-all duration-300 transform hover:-translate-y-2 shadow-xl flex flex-col justify-between"
                  >
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#ffbe00]/0 via-[#ffbe00]/5 to-[#ffbe00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div>
                      {/* Avatar Wrapper */}
                      <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden mb-5 relative z-10 border-2 border-card-border shadow-2xl group-hover:border-[#ffbe00] transition-colors duration-300 bg-gradient-to-br from-[#ffbe00] to-orange-500 flex items-center justify-center text-white text-3xl font-black">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={112}
                            height={112}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          member.name.substring(0, 2).toUpperCase()
                        )}
                      </div>

                      {/* Name & Role */}
                      <h3 className="text-xl font-bold mb-1.5 relative z-10 text-foreground group-hover:text-[#ffbe00] transition-colors">
                        {member.name}
                      </h3>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#ffbe00]/10 text-[#ffbe00] border border-[#ffbe00]/20 relative z-10 mb-3">
                        {member.role}
                      </span>

                      {/* Optional Bio */}
                      {member.bio && (
                        <p className="text-muted text-xs leading-relaxed line-clamp-3 relative z-10 mb-4 px-2">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    {/* Social Links Footer */}
                    {(member.linkedin || member.email) && (
                      <div className="pt-4 border-t border-card-border/50 flex items-center justify-center gap-3 relative z-10 mt-2">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 rounded-xl bg-card border border-card-border flex items-center justify-center text-muted hover:text-white hover:bg-[#ffbe00] hover:border-[#ffbe00] transition-all shadow-sm"
                            aria-label={`${member.name} LinkedIn Profile`}
                            title="LinkedIn Profile"
                          >
                            <FaLinkedin size={16} />
                          </a>
                        )}

                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-9 h-9 rounded-xl bg-card border border-card-border flex items-center justify-center text-muted hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all shadow-sm"
                            aria-label={`Email ${member.name}`}
                            title={`Email: ${member.email}`}
                          >
                            <Mail size={16} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted py-16 bg-card/30 border border-card-border rounded-3xl backdrop-blur-md relative z-10">
                <p className="font-semibold text-lg">Our team members list is currently being updated.</p>
                <p className="text-sm mt-1">Check back soon to meet our team!</p>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
