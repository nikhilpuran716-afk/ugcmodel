import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  Upload,
  ChevronLeft,
  ChevronRight,
  Film,
  Mail,
  RotateCcw,
  Camera,
} from 'lucide-react';
import {
  PortfolioProject,
  PORTFOLIO_PROJECTS,
  getMailtoHref,
  resolveMediaSrc,
} from '../data/portfolioData';

interface VideoPlayerModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onSelectProject: (project: PortfolioProject) => void;
  customVideoUrls: Record<string, string>;
  customThumbnails: Record<string, string>;
  onUploadVideoFile: (projectId: string, file: File) => void;
  onUpdateThumbnail: (projectId: string, thumbnailDataUrl: string) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  project,
  onClose,
  onSelectProject,
  customVideoUrls,
  customThumbnails,
  onUploadVideoFile,
  onUpdateThumbnail,
}) => {
  const [videoFileValid, setVideoFileValid] = useState(false);
  const [videoProbeFinished, setVideoProbeFinished] = useState(false);
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isStoryboardPlaying, setIsStoryboardPlaying] = useState(false);
  const [frameSavedFeedback, setFrameSavedFeedback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  const currentIndex = project
    ? PORTFOLIO_PROJECTS.findIndex((p) => p.id === project.id)
    : -1;

  const customUrl = project ? customVideoUrls[project.id] : undefined;
  const customPoster = project ? customThumbnails[project.id] : undefined;
  const resolvedSrc = project
    ? customUrl || resolveMediaSrc(project.videoSrc)
    : '';
  const activePoster = project ? customPoster || project.posterSrc : '';

  useEffect(() => {
    if (!project) return;
    setVideoFileValid(Boolean(customUrl));
    setVideoProbeFinished(Boolean(customUrl));
    setActiveSceneIndex(0);
    setIsStoryboardPlaying(false);
    setFrameSavedFeedback(false);
  }, [project, customUrl]);

  useEffect(() => {
    if (!project) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && currentIndex !== -1) {
        const nextIdx = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;
        onSelectProject(PORTFOLIO_PROJECTS[nextIdx]);
      } else if (e.key === 'ArrowLeft' && currentIndex !== -1) {
        const prevIdx =
          (currentIndex - 1 + PORTFOLIO_PROJECTS.length) %
          PORTFOLIO_PROJECTS.length;
        onSelectProject(PORTFOLIO_PROJECTS[prevIdx]);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, currentIndex, onClose, onSelectProject]);

  useEffect(() => {
    if (!isStoryboardPlaying || !project) return;
    const interval = window.setInterval(() => {
      setActiveSceneIndex((prev) => {
        if (prev + 1 >= project.storyboardScenes.length) {
          setIsStoryboardPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 3200);
    return () => window.clearInterval(interval);
  }, [isStoryboardPlaying, project]);

  if (!project) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUploadVideoFile(project.id, file);
    setVideoFileValid(true);
    setVideoProbeFinished(true);
    e.target.value = '';
  };

  const handleCaptureCurrentFrame = () => {
    const vid = videoElementRef.current;
    if (!vid || !vid.videoWidth || !vid.videoHeight) return;
    const canvas = document.createElement('canvas');
    canvas.width = vid.videoWidth;
    canvas.height = vid.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onUpdateThumbnail(project.id, dataUrl);
    setFrameSavedFeedback(true);
    window.setTimeout(() => setFrameSavedFeedback(false), 2000);
  };

  const currentScene =
    project.storyboardScenes[activeSceneIndex] || project.storyboardScenes[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171717]/80 backdrop-blur-xs overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[960px] bg-[#F8F6F2] border border-[#171717]/15 rounded-xl shadow-2xl overflow-hidden my-auto">
        {/* Top Modal Header Bar */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-white border-b border-[#171717]/10">
          <div className="flex items-center gap-2 text-xs font-medium text-[#6F6B67] truncate">
            <span className="text-[#A52332] font-semibold">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.specLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate text-[#171717] font-semibold">{project.title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                const prevIdx =
                  (currentIndex - 1 + PORTFOLIO_PROJECTS.length) %
                  PORTFOLIO_PROJECTS.length;
                onSelectProject(PORTFOLIO_PROJECTS[prevIdx]);
              }}
              aria-label="Previous project"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#171717]/10 bg-[#F8F6F2] hover:bg-[#E8DED2] text-[#171717] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A52332]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                const nextIdx = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;
                onSelectProject(PORTFOLIO_PROJECTS[nextIdx]);
              }}
              aria-label="Next project"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#171717]/10 bg-[#F8F6F2] hover:bg-[#E8DED2] text-[#171717] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[#A52332]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close video player"
              className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#171717] hover:bg-[#A52332] text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A52332]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content Split: Left 9:16 Video Player / Right Creative Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left Column: 9:16 Vertical Video Player Viewport */}
          <div className="md:col-span-5 bg-[#171717] p-5 flex flex-col items-center justify-center">
            <div className="relative aspect-[9/16] w-full max-w-[300px] rounded-lg overflow-hidden bg-[#242220] border border-white/15 shadow-lg">
              <video
                ref={videoElementRef}
                key={resolvedSrc}
                src={resolvedSrc}
                poster={activePoster}
                controls
                playsInline
                preload="metadata"
                onLoadedData={() => {
                  setVideoFileValid(true);
                  setVideoProbeFinished(true);
                }}
                onError={() => {
                  setVideoFileValid(false);
                  setVideoProbeFinished(true);
                }}
                className={`w-full h-full object-cover ${
                  videoFileValid ? 'block' : 'hidden'
                }`}
              />

              {!videoFileValid && (
                <div className="relative w-full h-full flex flex-col justify-between">
                  <img
                    src={activePoster}
                    alt={`${project.title} poster preview`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="relative z-10 p-3.5 bg-gradient-to-b from-black/80 via-black/45 to-transparent text-white">
                    <div className="flex items-center justify-between text-[11px] font-medium mb-1">
                      <span className="text-[#E8DED2]">Placeholder Preview</span>
                      <span className="tabular-nums">{project.durationLabel}</span>
                    </div>
                    <p className="text-[10px] font-mono-code text-white/80 truncate">
                      Add file: {project.videoSrc}
                    </p>
                  </div>

                  <div className="relative z-10 p-4 pt-12 bg-gradient-to-t from-black/95 via-black/75 to-transparent text-white">
                    <div className="mb-3">
                      <p className="text-[11px] font-semibold text-[#E8DED2] mb-1">
                        {currentScene.label} ({currentScene.timeRange})
                      </p>
                      <p className="text-xs text-white/95 leading-snug mb-1.5">
                        {currentScene.visualDirection}
                      </p>
                      <p className="text-xs italic text-[#E8DED2] font-serif-display text-sm">
                        {currentScene.scriptLine}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      {project.storyboardScenes.map((scene, idx) => (
                        <button
                          key={scene.label}
                          type="button"
                          onClick={() => {
                            setIsStoryboardPlaying(false);
                            setActiveSceneIndex(idx);
                          }}
                          aria-label={`Jump to ${scene.label}`}
                          className={`h-1.5 rounded-full transition-colors ${
                            idx === activeSceneIndex
                              ? 'bg-[#A52332]'
                              : 'bg-white/30 hover:bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setIsStoryboardPlaying((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#A52332] hover:bg-[#8B1D2A] text-white rounded-md transition-colors whitespace-nowrap shrink-0"
                      >
                        {isStoryboardPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Pause Storyboard</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Play Storyboard</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsStoryboardPlaying(false);
                          setActiveSceneIndex(0);
                        }}
                        aria-label="Restart storyboard"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-white/15 hover:bg-white/25 text-white transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Upload & Frame Capture Controls */}
            <div className="mt-3 w-full max-w-[300px] flex flex-col gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#E8DED2] hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 rounded-md transition-colors duration-150 whitespace-nowrap"
              >
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {videoFileValid ? 'Replace Uploaded Video' : 'Upload Video (.mp4)'}
                </span>
              </button>

              {videoFileValid && (
                <button
                  type="button"
                  onClick={handleCaptureCurrentFrame}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-white bg-[#A52332] hover:bg-[#8B1D2A] rounded-md transition-colors duration-150 whitespace-nowrap"
                >
                  <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {frameSavedFeedback
                      ? 'Saved as Card Image!'
                      : 'Set Current Frame as Card Image'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Project Concept Details & Storyboard Breakdown */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#F8F6F2]">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6F6B67] mb-2">
                <span className="text-[#A52332] font-semibold">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.specLabel}</span>
                <span aria-hidden="true">·</span>
                <span>9:16 Vertical Format</span>
              </div>

              <h2
                id="modal-project-title"
                className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#171717] leading-tight mb-4"
              >
                {project.title}
              </h2>

              <div className="bg-white border border-[#171717]/10 rounded-lg p-4 mb-6 space-y-2.5 text-sm">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                  <span className="text-xs font-semibold text-[#6F6B67] sm:w-36 shrink-0">
                    Product Reference:
                  </span>
                  <span className="font-medium text-[#171717]">{project.productReference}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 border-t border-[#171717]/5 pt-2">
                  <span className="text-xs font-semibold text-[#6F6B67] sm:w-36 shrink-0">
                    Creative Concept:
                  </span>
                  <span className="text-[#171717]">{project.creativeConcept}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 border-t border-[#171717]/5 pt-2">
                  <span className="text-xs font-semibold text-[#6F6B67] sm:w-36 shrink-0">
                    Ad Format:
                  </span>
                  <span className="text-[#171717]">{project.format}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 border-t border-[#171717]/5 pt-2">
                  <span className="text-xs font-semibold text-[#6F6B67] sm:w-36 shrink-0">
                    Media File Path:
                  </span>
                  <code className="font-mono-code text-xs text-[#A52332]">
                    {project.videoSrc}
                  </code>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-semibold text-[#171717] tracking-wide mb-3">
                  Creative Structure &amp; Hook Breakdown
                </h3>
                <div className="space-y-2.5">
                  {project.storyboardScenes.map((scene, idx) => {
                    const isCurrent = !videoFileValid && idx === activeSceneIndex;
                    return (
                      <div
                        key={scene.label}
                        onClick={() => {
                          if (!videoFileValid) setActiveSceneIndex(idx);
                        }}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-white border-[#A52332]/40'
                            : 'bg-white/70 border-[#171717]/10 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#171717] mb-1">
                          <span>{scene.label}</span>
                          <span className="font-mono-code text-[11px] text-[#6F6B67] tabular-nums">
                            {scene.timeRange}
                          </span>
                        </div>
                        <p className="text-xs text-[#6F6B67] mb-1">{scene.visualDirection}</p>
                        <p className="text-xs font-medium text-[#171717] italic">
                          {scene.scriptLine}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#171717]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-xs text-[#6F6B67]">
                {videoProbeFinished && !videoFileValid ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-[#A52332] shrink-0" />
                    <span>
                      Upload your video or drop{' '}
                      <code className="font-mono-code text-[#171717]">{project.videoSrc}</code>{' '}
                      into the project to display its video frame.
                    </span>
                  </span>
                ) : (
                  <span>
                    Video frame automatically applied to the portfolio card image.
                  </span>
                )}
              </p>

              <a
                href={getMailtoHref(`Inquiry: Concept like "${project.title}"`)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#A52332] hover:bg-[#8B1D2A] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px]"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Request Similar Ad</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
