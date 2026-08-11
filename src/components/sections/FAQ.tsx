"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long until we see tangible ROI from SEO?",
    answer: "SEO is a long-term compound strategy. While technical fixes and low-hanging fruit can show results in 30-60 days, significant revenue-shifting growth typically occurs between months 3 and 6 as our content ecosystems mature and authority builds."
  },
  {
    question: "Do you lock clients into 12-month contracts?",
    answer: "No. We believe in earning your business every single month. Our engagements are typically structured on a month-to-month or 90-day rolling basis because we are confident in the results we deliver."
  },
  {
    question: "What makes Aeronox different from my current agency?",
    answer: "Most agencies focus on vanity metrics like 'impressions' or arbitrary keyword rankings. We focus exclusively on bottom-line revenue. Every strategy we deploy is reverse-engineered from your financial goals, ensuring we drive traffic that actually converts."
  },
  {
    question: "Do you outsource content creation overseas?",
    answer: "Absolutely not. 100% of our strategy, technical implementation, and content architecture is handled by our elite in-house team. We never compromise on quality or risk your brand's reputation with cheap outsourced labor."
  },
  {
    question: "How do you track and report performance?",
    answer: "We provide complete transparency. You will receive access to a live, custom-built analytics dashboard showing exactly what we are working on, traffic growth, conversion rates, and exact ROI. No more guessing what your agency is doing."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 bg-[#090512] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16">
          <p className="text-[#ffbe00] font-black text-xs uppercase tracking-[0.4em] mb-4">Handling Objections</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-6">
            Straight Answers. <br />
            <span className="text-gradient">No BS.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index} 
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-[#1a1122]/90 border-[#ffbe00] shadow-[0_10px_30px_rgba(255,190,0,0.15)]" 
                    : "bg-[#1a1122]/70 border-white/10 shadow-sm hover:border-white/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                >
                  <span className={`font-black text-lg md:text-xl pr-8 transition-colors ${isOpen ? "text-[#ffbe00]" : "text-white"}`}>
                    {faq.question}
                  </span>
                  <div 
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "bg-[#ffbe00] rotate-180" : "bg-white/10 rotate-0 text-white"
                    }`}
                  >
                    <ChevronDown size={18} className={isOpen ? "text-[#120b18]" : "text-white/70"} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-[#dcd7e3]/80 font-medium leading-relaxed">
                        <p className="pt-4 border-t border-white/10">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
