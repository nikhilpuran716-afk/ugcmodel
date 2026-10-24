import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES_SECTION, getMailtoHref } from '../data/portfolioData';

export const Services: React.FC = () => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 md:py-28 bg-[#E8DED2]/45 border-b border-[#171717]/10 scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold text-[#A52332] tracking-wide mb-2">
            02 · Creative Capabilities
          </p>
          <h2
            id="services-heading"
            className="font-serif-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#171717] leading-[1.12] tracking-tight text-balance mb-4"
          >
            {SERVICES_SECTION.heading}
          </h2>
          <p className="text-base text-[#6F6B67] leading-relaxed">
            {SERVICES_SECTION.supportingCopy}
          </p>
        </div>

        {/* 4 Clean Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {SERVICES_SECTION.items.map((service) => (
            <div
              key={service.number}
              className="bg-white border border-[#171717]/10 rounded-lg p-7 sm:p-8 flex flex-col justify-between transition-colors duration-150 hover:border-[#171717]/25"
            >
              <div>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="font-mono-code text-xs font-semibold text-[#A52332] tabular-nums">
                    {service.number}
                  </span>
                  <span aria-hidden="true" className="text-[#171717]/30">
                    —
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-[1.65rem] font-semibold text-[#171717] leading-snug">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-[#6F6B67] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Strip */}
        <div className="bg-white border border-[#171717]/10 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#171717] leading-snug">
            {SERVICES_SECTION.closingLine}
          </p>

          <a
            href={getMailtoHref()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#A52332] hover:bg-[#8B1D2A] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
          >
            <span>{SERVICES_SECTION.ctaButton}</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
