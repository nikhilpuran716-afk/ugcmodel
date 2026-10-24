import React from 'react';
import { BRAND_CONFIG, FOOTER_CONTENT, getMailtoHref } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <footer className="bg-[#F8F6F2] py-12 text-sm text-[#6F6B67]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#171717]/10">
          {/* Brand & Tagline */}
          <div>
            <p className="font-serif-display text-2xl font-semibold text-[#171717] mb-1">
              {BRAND_CONFIG.studioName}
            </p>
            <p className="text-xs sm:text-sm text-[#6F6B67]">{FOOTER_CONTENT.tagline}</p>
          </div>

          {/* Section Navigation Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-6">
            {FOOTER_CONTENT.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#6F6B67] hover:text-[#171717] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct Links: Email & Instagram */}
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <a
              href={getMailtoHref()}
              className="text-[#171717] hover:text-[#A52332] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
            >
              Email
            </a>
            <span aria-hidden="true" className="text-[#171717]/25">
              ·
            </span>
            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#171717] hover:text-[#A52332] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6F6B67]">
          <p>
            © {currentYear} {BRAND_CONFIG.studioName} · {BRAND_CONFIG.owner}. All rights reserved.
          </p>
          <p>{BRAND_CONFIG.location}</p>
        </div>
      </div>
    </footer>
  );
};
