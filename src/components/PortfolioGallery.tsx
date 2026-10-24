import React, { useState, useMemo } from 'react';
import {
  PORTFOLIO_SECTION,
  PORTFOLIO_PROJECTS,
  PortfolioProject,
} from '../data/portfolioData';
import { VideoCard } from './VideoCard';

interface PortfolioGalleryProps {
  onSelectProject: (project: PortfolioProject) => void;
  customVideoUrls: Record<string, string>;
  customThumbnails: Record<string, string>;
  onUploadVideoFile: (projectId: string, file: File) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  onSelectProject,
  customVideoUrls,
  customThumbnails,
  onUploadVideoFile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(PORTFOLIO_PROJECTS.map((p) => p.category)));
    return ['All', ...unique];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section
      id="work"
      aria-labelledby="portfolio-heading"
      className="py-20 md:py-28 border-b border-[#171717]/10 scroll-mt-16"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header + Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#A52332] tracking-wide mb-2">
              01 · Selected Sample Work
            </p>
            <h2
              id="portfolio-heading"
              className="font-serif-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#171717] leading-[1.12] tracking-tight text-balance mb-4"
            >
              {PORTFOLIO_SECTION.heading}
            </h2>
            <p className="text-base text-[#6F6B67] leading-relaxed">
              {PORTFOLIO_SECTION.supportingCopy}
            </p>
          </div>

          {/* Interactive Filter Tabs (Functional Segmented Buttons) */}
          <div
            role="group"
            aria-label="Filter sample ads by category"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#E8DED2]/70 rounded-lg border border-[#171717]/10 self-start lg:self-auto"
          >
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[36px] focus-visible:outline-2 focus-visible:outline-[#A52332] ${
                    isActive
                      ? 'bg-white text-[#171717] font-semibold shadow-xs'
                      : 'text-[#6F6B67] hover:text-[#171717]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid (4 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => {
            const originalIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.id === project.id);
            return (
              <VideoCard
                key={project.id}
                project={project}
                index={originalIndex}
                customVideoUrl={customVideoUrls[project.id]}
                customThumbnailUrl={customThumbnails[project.id]}
                onSelect={onSelectProject}
                onUploadVideoFile={onUploadVideoFile}
              />
            );
          })}
        </div>

        {/* Speculative Work Disclaimer */}
        <div className="mt-10 pt-6 border-t border-[#171717]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#6F6B67]">
          <p>{PORTFOLIO_SECTION.disclaimer}</p>
          <p className="whitespace-nowrap shrink-0">
            Format: 9:16 Vertical Short-Form Video
          </p>
        </div>
      </div>
    </section>
  );
};
