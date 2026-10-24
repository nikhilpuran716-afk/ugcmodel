import React, { useState } from 'react';
import { Play, ArrowDownRight, Mail, Film } from 'lucide-react';
import {
  BRAND_CONFIG,
  HERO_CONTENT,
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  getMailtoHref,
  resolveMediaSrc,
} from '../data/portfolioData';

interface HeroProps {
  onSelectProject: (project: PortfolioProject) => void;
  customVideoUrls: Record<string, string>;
  customThumbnails: Record<string, string>;
}

export const Hero: React.FC<HeroProps> = ({
  onSelectProject,
  customVideoUrls,
  customThumbnails,
}) => {
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [videoAvailableMap, setVideoAvailableMap] = useState<Record<string, boolean>>({});
  const [posterErrorMap, setPosterErrorMap] = useState<Record<string, boolean>>({});

  const activeProject = PORTFOLIO_PROJECTS[activePreviewIndex] || PORTFOLIO_PROJECTS[0];
  const customUrl = customVideoUrls[activeProject.id];
  const customPoster = customThumbnails[activeProject.id] || activeProject.posterSrc;
  const resolvedVideoSrc = customUrl || resolveMediaSrc(activeProject.videoSrc);
  const isVideoReady = Boolean(customUrl) || videoAvailableMap[activeProject.id] === true;

  const handleWatchWorkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative py-14 md:py-24 border-b border-[#171717]/10 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline, Copy, and Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#6F6B67] mb-5">
              <span className="text-[#171717] font-semibold">{BRAND_CONFIG.owner}</span>
              <span aria-hidden="true">·</span>
              <span>{BRAND_CONFIG.professionalTitle}</span>
              <span aria-hidden="true">·</span>
              <span>{BRAND_CONFIG.location}</span>
            </div>

            <h1
              id="hero-heading"
              className="font-serif-display text-4xl sm:text-5xl lg:text-[3.65rem] font-semibold text-[#171717] leading-[1.08] tracking-tight text-balance mb-6"
            >
              {HERO_CONTENT.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#6F6B67] leading-relaxed max-w-[58ch] mb-9">
              {HERO_CONTENT.supportingCopy}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#work"
                onClick={handleWatchWorkClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#A52332] hover:bg-[#8B1D2A] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
              >
                <span>{HERO_CONTENT.primaryButton}</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={getMailtoHref()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#171717] bg-white hover:bg-[#E8DED2]/60 border border-[#171717]/15 rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
              >
                <Mail className="w-4 h-4 text-[#A52332]" aria-hidden="true" />
                <span>{HERO_CONTENT.secondaryButton}</span>
              </a>
            </div>

            <div className="w-full pt-7 border-t border-[#171717]/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-medium text-[#6F6B67] mb-1">Format Focus</p>
                <p className="text-sm font-semibold text-[#171717]">Vertical 9:16 Short-Form</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#6F6B67] mb-1">Creative Direction</p>
                <p className="text-sm font-semibold text-[#171717]">UGC &amp; AI-Assisted Visuals</p>
              </div>
              <div>
                <p className="text-xs font-medium text-[#6F6B67] mb-1">Deliverables</p>
                <p className="text-sm font-semibold text-[#171717]">Hooks · Scripts · Full Edits</p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent 9:16 Smartphone-Style Frame */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-[330px]">
              {/* Smartphone Hardware Shell */}
              <div className="relative bg-[#171717] p-3 rounded-[28px] shadow-xl border border-[#171717]/20">
                <div
                  aria-hidden="true"
                  className="w-20 h-1.5 bg-[#3A3836] rounded-full mx-auto mb-2.5"
                />

                {/* 9:16 Screen Viewport */}
                <div className="relative aspect-[9/16] w-full rounded-[18px] overflow-hidden bg-[#E8DED2]">
                  <video
                    key={resolvedVideoSrc}
                    src={resolvedVideoSrc}
                    poster={customPoster}
                    autoPlay
                    muted
                    playsInline
                    loop
                    preload="auto"
                    onLoadedMetadata={(e) => {
                      setVideoAvailableMap((prev) => ({
                        ...prev,
                        [activeProject.id]: true,
                      }));
                      e.currentTarget.muted = true;
                      e.currentTarget.play().catch(() => {});
                    }}
                    onCanPlay={(e) => {
                      setVideoAvailableMap((prev) => ({
                        ...prev,
                        [activeProject.id]: true,
                      }));
                      e.currentTarget.play().catch(() => {});
                    }}
                    onError={() =>
                      setVideoAvailableMap((prev) => ({
                        ...prev,
                        [activeProject.id]: false,
                      }))
                    }
                    className={`w-full h-full object-cover ${
                      isVideoReady ? 'block' : 'hidden'
                    }`}
                  />

                  {!isVideoReady && (
                    <div className="relative w-full h-full">
                      {!posterErrorMap[activeProject.id] ? (
                        <img
                          src={customPoster}
                          alt={`${activeProject.title} — ${activeProject.productReference} 9:16 sample preview`}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setPosterErrorMap((prev) => ({
                              ...prev,
                              [activeProject.id]: true,
                            }))
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#E8DED2]">
                          <Film className="w-8 h-8 text-[#A52332] mb-2" aria-hidden="true" />
                          <p className="font-serif-display text-xl font-semibold text-[#171717]">
                            {activeProject.title}
                          </p>
                          <p className="text-xs text-[#6F6B67] mt-1">
                            {activeProject.productReference}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Top Metadata Header inside 9:16 Screen */}
                  <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/65 via-black/25 to-transparent text-white flex items-center justify-between text-[11px] font-medium">
                    <span>
                      {activeProject.specLabel} · 9:16
                    </span>
                    <span className="tabular-nums">{activeProject.durationLabel}</span>
                  </div>

                  {/* Center Play Button Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => onSelectProject(activeProject)}
                      aria-label={`Play ${activeProject.title} sample preview`}
                      className="group inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#171717]/80 hover:bg-[#A52332] text-white transition-transform duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Bottom Scrim */}
                  <div className="absolute bottom-0 inset-x-0 p-4 pt-12 bg-gradient-to-t from-black/85 via-black/55 to-transparent text-white">
                    <p className="text-[11px] text-white/80 font-medium mb-0.5">
                      {activeProject.category} · {activeProject.specLabel}
                    </p>
                    <p className="font-serif-display text-xl font-semibold leading-snug mb-1">
                      {activeProject.title}
                    </p>
                    <p className="text-xs text-white/85 line-clamp-2 mb-2.5">
                      {activeProject.productReference}
                    </p>

                    <div className="pt-2 border-t border-white/20 flex items-center justify-between gap-2 text-[10px] text-white/80">
                      <span className="truncate">
                        {activeProject.format}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectProject(activeProject)}
                        className="font-sans-body font-semibold text-white underline underline-offset-2 hover:text-[#E8DED2] whitespace-nowrap shrink-0"
                      >
                        Open Player
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Sample Reel Selector Tabs below Smartphone */}
              <div className="mt-3 flex items-center justify-between gap-1.5 bg-[#E8DED2]/70 p-1 rounded-lg border border-[#171717]/10">
                {PORTFOLIO_PROJECTS.map((proj, idx) => {
                  const isSelected = idx === activePreviewIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => setActivePreviewIndex(idx)}
                      className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap truncate focus-visible:outline-2 focus-visible:outline-[#A52332] ${
                        isSelected
                          ? 'bg-white text-[#171717] shadow-xs font-semibold'
                          : 'text-[#6F6B67] hover:text-[#171717]'
                      }`}
                    >
                      0{idx + 1}. {proj.title.replace(' UGC Ad', '')}
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 text-center text-[11px] text-[#6F6B67]">
                9:16 Vertical Sample Concepts · Click to watch full screen
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
