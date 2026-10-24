/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PortfolioProject } from './data/portfolioData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PortfolioGallery } from './components/PortfolioGallery';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import {
  extractVideoFrameDataUrl,
  loadAllUploadedVideos,
  saveUploadedVideo,
} from './utils/videoMediaStore';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(
    null
  );
  const [customVideoUrls, setCustomVideoUrls] = useState<Record<string, string>>(
    {}
  );
  const [customThumbnails, setCustomThumbnails] = useState<Record<string, string>>(
    {}
  );
  const [uploadedBlobs, setUploadedBlobs] = useState<Record<string, Blob>>({});

  // Restore any previously uploaded videos and their extracted thumbnail images from IndexedDB
  useEffect(() => {
    loadAllUploadedVideos().then((storedMap) => {
      const urls: Record<string, string> = {};
      const thumbs: Record<string, string> = {};
      for (const [projectId, entry] of Object.entries(storedMap)) {
        urls[projectId] = entry.objectUrl;
        if (entry.thumbnailDataUrl) {
          thumbs[projectId] = entry.thumbnailDataUrl;
        }
      }
      if (Object.keys(urls).length > 0) {
        setCustomVideoUrls((prev) => ({ ...urls, ...prev }));
      }
      if (Object.keys(thumbs).length > 0) {
        setCustomThumbnails((prev) => ({ ...thumbs, ...prev }));
      }
    });
  }, []);

  const handleUploadVideoFile = async (projectId: string, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setCustomVideoUrls((prev) => ({
      ...prev,
      [projectId]: objectUrl,
    }));
    setUploadedBlobs((prev) => ({
      ...prev,
      [projectId]: file,
    }));

    const extractedThumbnail = await extractVideoFrameDataUrl(objectUrl);
    if (extractedThumbnail) {
      setCustomThumbnails((prev) => ({
        ...prev,
        [projectId]: extractedThumbnail,
      }));
    }

    await saveUploadedVideo(
      projectId,
      file,
      extractedThumbnail || '',
      file.name
    );
  };

  const handleUpdateThumbnail = async (
    projectId: string,
    thumbnailDataUrl: string
  ) => {
    setCustomThumbnails((prev) => ({
      ...prev,
      [projectId]: thumbnailDataUrl,
    }));
    const existingBlob = uploadedBlobs[projectId];
    if (existingBlob) {
      await saveUploadedVideo(
        projectId,
        existingBlob,
        thumbnailDataUrl,
        'uploaded-video.mp4'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F2] text-[#171717]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#A52332] focus:text-white focus:rounded-md focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1">
        <Hero
          onSelectProject={(project) => setSelectedProject(project)}
          customVideoUrls={customVideoUrls}
          customThumbnails={customThumbnails}
        />

        <PortfolioGallery
          onSelectProject={(project) => setSelectedProject(project)}
          customVideoUrls={customVideoUrls}
          customThumbnails={customThumbnails}
          onUploadVideoFile={handleUploadVideoFile}
        />

        <Services />

        <About />

        <Contact />
      </main>

      <Footer />

      <VideoPlayerModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(project) => setSelectedProject(project)}
        customVideoUrls={customVideoUrls}
        customThumbnails={customThumbnails}
        onUploadVideoFile={handleUploadVideoFile}
        onUpdateThumbnail={handleUpdateThumbnail}
      />
    </div>
  );
}
