"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { PlayCircle } from "lucide-react";
import {
  getCloudinaryVideoPoster,
  getProjectMediaUrl,
} from "@/lib/cloudinary";

interface ProjectMediaProps {
  image: string;
  video?: string;
  title: string;
  className?: string;
  mediaClassName?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  previewOnHover?: boolean;
  showHint?: boolean;
}

export default function ProjectMedia({
  image,
  video,
  title,
  className,
  mediaClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  width = 1200,
  height = 720,
  previewOnHover = true,
  showHint = true,
}: ProjectMediaProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isPreviewActive, setIsPreviewActive] = useState(false);

  const imageUrl = getProjectMediaUrl(image, "image", width, height);
  const videoUrl =
    shouldLoadVideo && video ? getProjectMediaUrl(video, "video", width, height) : undefined;

  const activatePreview = () => {
    if (!video || !previewOnHover) {
      return;
    }

    setShouldLoadVideo(true);
    setIsPreviewActive(true);
    void videoRef.current?.play().catch(() => undefined);
  };

  const deactivatePreview = () => {
    setIsPreviewActive(false);

    if (!videoRef.current) {
      return;
    }

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      className={clsx("relative h-full w-full overflow-hidden", className)}
      onMouseEnter={activatePreview}
      onMouseLeave={deactivatePreview}
      onFocus={activatePreview}
      onBlur={deactivatePreview}
      tabIndex={video && previewOnHover ? 0 : undefined}
      aria-label={
        video && previewOnHover ? `${title} video preview` : `${title} cover image`
      }
    >
      <Image
        src={imageUrl}
        alt={`${title} project preview`}
        fill
        priority={priority}
        sizes={sizes}
        className={clsx(
          "object-cover transition duration-500 ease-out",
          video && isPreviewActive ? "scale-[1.02] opacity-0" : "scale-100 opacity-100",
          mediaClassName
        )}
      />

      {video && videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={getCloudinaryVideoPoster(video, width)}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => {
            if (isPreviewActive) {
              void videoRef.current?.play().catch(() => undefined);
            }
          }}
          className={clsx(
            "absolute inset-0 h-full w-full object-cover transition duration-500 ease-out",
            isPreviewActive ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
            mediaClassName
          )}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-bg/15 to-transparent" />

      {video && showHint && (
        <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[11px] font-medium tracking-[0.18em] text-white/90 uppercase backdrop-blur">
          <PlayCircle size={14} />
          Hover Preview
        </div>
      )}
    </div>
  );
}
