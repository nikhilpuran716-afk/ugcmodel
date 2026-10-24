import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG, CONTACT_SECTION, getMailtoHref } from '../data/portfolioData';

export const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-20 md:py-28 bg-[#E8DED2]/55 border-b border-[#171717]/10 scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="bg-white border border-[#171717]/10 rounded-lg p-8 sm:p-12 lg:p-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#A52332] tracking-wide mb-2">
              04 · Start a Conversation
            </p>

            <h2
              id="contact-heading"
              className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#171717] leading-[1.1] tracking-tight text-balance mb-4"
            >
              {CONTACT_SECTION.heading}
            </h2>

            <p className="text-base sm:text-lg text-[#6F6B67] leading-relaxed mb-8">
              {CONTACT_SECTION.supportingCopy}
            </p>

            {/* Two Direct Contact Options: Email & Instagram */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={getMailtoHref('UGC Ad Project Inquiry')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#A52332] hover:bg-[#8B1D2A] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email: {BRAND_CONFIG.email}</span>
              </a>

              <a
                href={BRAND_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#171717] bg-[#F8F6F2] hover:bg-[#E8DED2] border border-[#171717]/15 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
              >
                <span>Instagram ({BRAND_CONFIG.instagramHandle})</span>
                <ArrowUpRight className="w-4 h-4 text-[#A52332]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
