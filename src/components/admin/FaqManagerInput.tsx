"use client";

import React, { useState } from "react";
import { Plus, Trash2, HelpCircle } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

interface FaqManagerInputProps {
  defaultFaqs?: FaqItem[];
  name?: string;
}

export function FaqManagerInput({ defaultFaqs = [], name = "faqs" }: FaqManagerInputProps) {
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Hidden input to pass JSON string to form action */}
      <input type="hidden" name={name} value={JSON.stringify(faqs)} />

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-admin-text flex items-center gap-2">
            <HelpCircle size={18} className="text-accent" />
            Service FAQs (Frequently Asked Questions)
          </h3>
          <p className="text-xs text-admin-muted mt-0.5">
            Add custom questions & answers for this service detail page.
          </p>
        </div>

        <button
          type="button"
          onClick={addFaq}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ffbe00] text-[#1a1122] rounded-xl text-xs font-bold hover:bg-white transition-colors"
        >
          <Plus size={14} /> Add FAQ
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-admin-border bg-black/10 text-center text-xs text-admin-muted">
          No custom FAQs added yet. Click &quot;Add FAQ&quot; above to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-admin-border bg-black/10 dark:bg-black/20 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-admin-muted uppercase tracking-wider">
                  FAQ #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="text-red-400 hover:text-red-300 p-1 transition-colors"
                  title="Remove FAQ"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-admin-text">Question</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="e.g. How long does a typical project take?"
                  className="bg-black/10 dark:bg-black/30 border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-accent"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-admin-text">Answer</label>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  placeholder="e.g. Standard engagement ranges from 4 to 12 weeks..."
                  className="bg-black/10 dark:bg-black/30 border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-accent resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
