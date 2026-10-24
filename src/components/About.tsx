import React, { useState } from 'react';
import { User } from 'lucide-react';
import { ABOUT_SECTION, BRAND_CONFIG } from '../data/portfolioData';

export const About: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-20 md:py-28 border-b border-[#171717]/10 scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Replaceable Creator / Studio Visual */}
          <div className="lg:col-span-5">
            <div className="bg-white p-3 border border-[#171717]/10 rounded-lg max-w-[420px] mx-auto lg:mx-0">
              <div className="aspect-[3/4] w-full rounded-md overflow-hidden bg-[#E8DED2] relative">
                {!imageError ? (
                  <img
                    src={ABOUT_SECTION.portraitSrc}
                    alt={ABOUT_SECTION.portraitAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <User className="w-10 h-10 text-[#A52332] mb-3" aria-hidden="true" />
                    <p className="font-serif-display text-2xl font-semibold text-[#171717]">
                      {BRAND_CONFIG.owner}
                    </p>
                    <p className="text-xs text-[#6F6B67] mt-1">
                      {BRAND_CONFIG.professionalTitle}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 px-1 flex items-center justify-between text-xs text-[#6F6B67]">
                <span className="font-semibold text-[#171717]">{BRAND_CONFIG.owner}</span>
                <span>{BRAND_CONFIG.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio Copy */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold text-[#A52332] tracking-wide mb-2">
              03 · About the Studio
            </p>

            <h2
              id="about-heading"
              className="font-serif-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#171717] leading-[1.12] tracking-tight text-balance mb-6"
            >
              {ABOUT_SECTION.heading}
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#6F6B67] leading-relaxed max-w-[62ch] mb-8">
              {ABOUT_SECTION.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Clean Studio Identity Summary (Unboxed Metadata) */}
            <div className="pt-6 border-t border-[#171717]/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="text-xs font-medium text-[#6F6B67] mb-1">Creator</p>
                <p className="font-semibold text-[#171717]">{BRAND_CONFIG.owner}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#6F6B67] mb-1">Role</p>
                <p className="font-semibold text-[#171717]">{BRAND_CONFIG.professionalTitle}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#6F6B67] mb-1">Base</p>
                <p className="font-semibold text-[#171717]">{BRAND_CONFIG.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
