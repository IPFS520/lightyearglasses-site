"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-primary/10 border-t border-b border-primary/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="reveal visible">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between py-6 text-left group"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg md:text-xl text-primary pr-4 group-hover:text-accent transition-colors duration-300">
                {item.question}
              </span>
              <span
                className={`shrink-0 w-8 h-8 flex items-center justify-center border border-primary/20 rounded-full text-primary/60 transition-all duration-300 ${
                  isOpen ? "rotate-45 bg-primary text-white border-primary" : "group-hover:border-accent group-hover:text-accent"
                }`}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </span>
            </button>

            <div
              className={`grid transition-all duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-primary/70 font-sans leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
