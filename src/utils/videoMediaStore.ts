/**
 * Utility for extracting poster images (frames) from uploaded/local video files
 * and persisting uploaded video Blobs + thumbnails in IndexedDB so they remain
 * available across preview refreshes.
 */

const DB_NAME = 'faceless_ugc_studio_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'uploaded_videos';

export interface StoredVideoRecord {
  projectId: string;
  videoBlob: Blob;
  thumbnailDataUrl: string;
  fileName: string;
  updatedAt: number;
}

function openMediaDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'projectId' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveUploadedVideo(
  projectId: string,
  videoBlob: Blob,
  thumbnailDataUrl: string,
  fileName: string
): Promise<void> {
  try {
    const db = await openMediaDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const record: StoredVideoRecord = {
        projectId,
        videoBlob,
        thumbnailDataUrl,
        fileName,
        updatedAt: Date.now(),
      };
      store.put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // Ignore storage errors in restricted environments
  }
}

export async function loadAllUploadedVideos(): Promise<
  Record<string, { objectUrl: string; thumbnailDataUrl: string; fileName: string }>
> {
  try {
    const db = await openMediaDb();
    const records = await new Promise<StoredVideoRecord[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
    db.close();

    const result: Record<
      string,
      { objectUrl: string; thumbnailDataUrl: string; fileName: string }
    > = {};
    for (const rec of records) {
      if (rec.videoBlob) {
        result[rec.projectId] = {
          objectUrl: URL.createObjectURL(rec.videoBlob),
          thumbnailDataUrl: rec.thumbnailDataUrl,
          fileName: rec.fileName || 'uploaded-video.mp4',
        };
      }
    }
    return result;
  } catch {
    return {};
  }
}

/**
 * Extracts a crisp image frame from a video URL (Blob URL or /videos/*.mp4)
 * so the card `<img>` displays the actual frame from the video.
 */
export function extractVideoFrameDataUrl(
  videoUrl: string,
  seekTimeSeconds?: number
): Promise<string | null> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    let resolved = false;

    const finish = (dataUrl: string | null) => {
      if (resolved) return;
      resolved = true;
      video.removeAttribute('src');
      video.load();
      resolve(dataUrl);
    };

    const timeoutId = window.setTimeout(() => finish(null), 6000);

    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';

    video.onloadedmetadata = () => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      const targetTime =
        typeof seekTimeSeconds === 'number'
          ? seekTimeSeconds
          : duration > 1.2
          ? 0.8
          : duration > 0.2
          ? duration * 0.25
          : 0.05;
      try {
        video.currentTime = targetTime;
      } catch {
        // If seeking fails, capture immediately on loadeddata
      }
    };

    const captureFrame = () => {
      try {
        const width = video.videoWidth || 720;
        const height = video.videoHeight || 1280;
        if (!width || !height) {
          window.clearTimeout(timeoutId);
          finish(null);
          return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          window.clearTimeout(timeoutId);
          finish(null);
          return;
        }
        ctx.drawImage(video, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        window.clearTimeout(timeoutId);
        finish(dataUrl);
      } catch {
        window.clearTimeout(timeoutId);
        finish(null);
      }
    };

    video.onseeked = () => {
      captureFrame();
    };

    video.onloadeddata = () => {
      // Fallback if onseeked doesn't fire within 400ms
      window.setTimeout(() => {
        if (!resolved && video.readyState >= 2) {
          captureFrame();
        }
      }, 350);
    };

    video.onerror = () => {
      window.clearTimeout(timeoutId);
      finish(null);
    };

    video.src = videoUrl;
  });
}
