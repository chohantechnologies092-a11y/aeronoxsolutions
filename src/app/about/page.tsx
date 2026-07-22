import Image from "next/image";
import { getCompanyProfile, getTeamMembers } from "@/lib/data";
import { Quote } from "lucide-react";

export const metadata = {
  title: "About Us | Aeronox Solutions",
  description: "Learn about the people behind Aeronox Solutions.",
};

export default async function AboutPage() {
  const profile = await getCompanyProfile();
  const team = await getTeamMembers();

  return (
    <main className="min-h-screen bg-[#24182e] pt-32 pb-24 text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* CEO Message Section */}
        {(profile?.ceoMessage || profile?.ceoImage) && (
          <section className="mb-24 relative">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#ffbe00]/10 rounded-full blur-3xl"></div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row gap-10 items-center">
              <Quote className="absolute top-8 right-8 text-white/5 w-24 h-24 rotate-180" />
              
              {profile.ceoImage && (
                <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10">
                  <Image
                    src={profile.ceoImage}
                    alt="CEO"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="flex-1 relative z-10">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-8">
                  Message from our <span className="text-[#ffbe00]">CEO</span>
                </h1>
                
                {profile.ceoMessage && (
                  <div className="prose prose-invert max-w-none md:prose-lg">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {profile.ceoMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Meet Our Team Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffbe00] to-orange-500">Team</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The brilliant minds behind our high-performance digital ecosystems and master-level engineering.
            </p>
          </div>

          {team && team.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.id} className="group relative bg-white/5 border border-white/10 rounded-3xl p-6 text-center overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ffbe00]/0 to-[#ffbe00]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 relative z-10 border-4 border-[#24182e] shadow-xl group-hover:border-[#ffbe00]/50 transition-colors bg-gradient-to-br from-[#ffbe00] to-orange-500 flex items-center justify-center text-white text-3xl font-black">
                    {member.image ? (
                      <Image 
                        src={member.image} 
                        alt={member.name} 
                        width={128} 
                        height={128} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    ) : (
                      member.name.substring(0, 2).toUpperCase()
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1 relative z-10 text-white">{member.name}</h3>
                  <p className="text-[#ffbe00] text-sm font-semibold tracking-wider uppercase relative z-10">{member.role}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              Our team members are currently being updated. Check back soon!
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
