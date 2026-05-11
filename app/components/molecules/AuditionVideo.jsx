'use client';

import { useEffect, useState } from 'react';

/** Видео для аудирования: poster — первый кадр из файла; при ошибке — fallbackPoster. */
export default function AuditionVideo({ src, className, fallbackPoster }) {
  const [poster, setPoster] = useState(undefined);

  useEffect(() => {
    if (!src || typeof window === 'undefined') return;

    setPoster(undefined);
    let cancelled = false;
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.preload = 'auto';
    video.src = src;
    video.setAttribute(
      'style',
      'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0.01;pointer-events:none;z-index:-1'
    );
    document.body.appendChild(video);

    const fail = () => {
      if (!cancelled && fallbackPoster) setPoster(fallbackPoster);
    };

    const captureFrame = () => {
      if (cancelled) return;
      const w = video.videoWidth;
      const h = video.videoHeight;
      if (!w || !h) {
        fail();
        return;
      }
      try {
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          fail();
          return;
        }
        ctx.drawImage(video, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        if (!cancelled) setPoster(dataUrl);
      } catch {
        fail();
      }
    };

    const onLoadedData = () => {
      if (cancelled) return;
      try {
        video.currentTime = 0.001;
      } catch {
        fail();
      }
    };

    const onSeeked = () => {
      captureFrame();
    };

    video.addEventListener('loadeddata', onLoadedData);
    video.addEventListener('seeked', onSeeked);
    video.addEventListener('error', fail);

    try {
      video.load();
    } catch {
      fail();
    }

    return () => {
      cancelled = true;
      video.removeEventListener('loadeddata', onLoadedData);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('error', fail);
      video.removeAttribute('src');
      try {
        video.load();
      } catch {
        /* ignore */
      }
      if (video.parentNode) video.parentNode.removeChild(video);
    };
  }, [src, fallbackPoster]);

  return (
    <video
      className={className}
      controls
      playsInline
      preload="metadata"
      poster={poster}
      src={src}
    />
  );
}
