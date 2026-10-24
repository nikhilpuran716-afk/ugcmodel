import React, { useState, useEffect, useRef } from 'react';
import { Play, Film, ArrowUpRight, Upload } from 'lucide-react';
import { PortfolioProject, resolveMediaSrc } from '../data/portfolioData';

interface VideoCardProps {
  project: PortfolioProject;
  index: number;
  customVideoUrl?: string;
  customThumbnailUrl?: string;
  onSelect: (project: PortfolioProject) => void;
  onUploadVideoFile: (projectId: string, file: File) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  project,
  index,
  customVideoUrl,
  customThumbnailUrl,
  onSelect,
  onUploadVideoFile,
}) => {
  const [posterFailed, setPosterFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(Boolean(customVideoUrl));
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resolvedVideoSrc = customVideoUrl || resolveMediaSrc(project.videoSrc);
  const activePosterImage = customThumbnailUrl || project.posterSrc;

  // Keep video playing continuously (muted + loop) without requiring hover
  useEffect(() => {
    setPosterFailed(false);
    if (customVideoUrl) {
      setVideoReady(true);
    }
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {
      // Ignore browser autoplay block if any
    });
  }, [resolvedVideoSrc, customVideoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadVideoFile(project.id, file);
    }
    e.target.value = '';
  };

  return (
    <article className="group bg-white border border-[#171717]/10 rounded-lg overflow-hidden flex flex-col justify-between transition-colors duration-150 hover:border-[#171717]/30">
      {/* Top 9:16 Vertical Media Container */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Watch ${project.title} (${project.specLabel})`}
        onClick={() => onSelect(project)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(project);
          }
        }}
        className="relative aspect-[9/16] w-full bg-[#E8DED2] overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#A52332]"
      >
        {/* Fallback Poster Image (shown behind video or when no video file is loaded yet) */}
        {!posterFailed ? (
          <img
            src={activePosterImage}
            alt={`${project.title} — ${project.productReference} video preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setPosterFailed(true)}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#E8DED2]">
            <Film className="w-8 h-8 text-[#A52332] mb-2" aria-hidden="true" />
            <p className="font-serif-display text-xl font-semibold text-[#171717]">
              {project.title}
            </p>
            <p className="text-xs text-[#6F6B67] mt-1">{project.productReference}</p>
          </div>
        )}

        {/* Always-visible, continuously playing muted loop video when a video is uploaded/present */}
        <video
          ref={videoRef}
          key={resolvedVideoSrc}
          src={resolvedVideoSrc}
          poster={activePosterImage}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onLoadedMetadata={(e) => {
            setVideoReady(true);
            e.currentTarget.muted = true;
            e.currentTarget.play().catch(() => {});
          }}
          onCanPlay={(e) => {
            setVideoReady(true);
            e.currentTarget.play().catch(() => {});
          }}
          onError={() => {
            if (!customVideoUrl) {
              setVideoReady(false);
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02] ${
            videoReady || Boolean(customVideoUrl)
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* Top Scrim: Index & Spec Label */}
        <div className="absolute top-0 inset-x-0 p-3.5 bg-gradient-to-b from-black/65 via-black/25 to-transparent text-white flex items-center justify-between text-xs font-medium z-10">
          <span>
            0{index + 1} · {project.specLabel}
          </span>
          <span className="tabular-nums">{project.durationLabel}</span>
        </div>

        {/* Center Play Affordance Button */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#171717]/75 group-hover:bg-[#A52332] text-white transition-transform duration-150 group-hover:scale-105 shadow-md"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </span>
        </div>

        {/* Bottom Scrim: Video Status & Direct Upload Trigger */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 pt-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white flex items-center justify-between gap-2 z-10">
          <p
            className="text-[11px] text-white/85 font-mono-code truncate"
            title={project.videoSrc}
          >
            {customVideoUrl || videoReady ? 'Video Playing' : project.videoSrc}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={handleFileChange}
            onClick={(e) => e.stopPropagation()}
            className="hidden"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            title="Upload your video to set its playback on this card"
            className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold bg-white/20 hover:bg-[#A52332] text-white rounded transition-colors whitespace-nowrap shrink-0"
          >
            <Upload className="w-3 h-3" aria-hidden="true" />
            <span>{customVideoUrl ? 'Change Video' : 'Upload Video'}</span>
          </button>
        </div>
      </div>

      {/* Card Body: Editorial Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#6F6B67] mb-2">
            <span className="text-[#A52332] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.specLabel}</span>
          </div>

          <h3 className="font-serif-display text-2xl font-semibold text-[#171717] leading-snug mb-2">
            {project.title}
          </h3>

          <p className="text-xs font-semibold text-[#171717] mb-2">
            Product: <span className="font-normal text-[#6F6B67]">{project.productReference}</span>
          </p>

          <p className="text-sm text-[#6F6B67] leading-relaxed mb-4">
            {project.creativeConcept}.
          </p>
        </div>

        <div className="pt-3.5 border-t border-[#171717]/10 flex flex-col gap-3">
          <p className="text-xs text-[#6F6B67]">
            <span className="font-medium text-[#171717]">Format:</span> {project.format}
          </p>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="w-full inline-flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold text-[#171717] bg-[#F8F6F2] hover:bg-[#A52332] hover:text-white border border-[#171717]/10 rounded-md transition-colors duration-150 whitespace-nowrap min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
          >
            <span>Watch Video</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};
