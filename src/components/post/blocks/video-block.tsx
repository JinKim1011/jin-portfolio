"use client";

import { useRef, useState } from "react";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";

type VideoBlockProps = {
  src: string;
  kind: "youtube" | "file";
  caption: string;
};

export default function VideoBlock({ src, kind, caption }: VideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const isFile = kind === "file";

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <figure className="mb-5">
      <div
        className="group relative w-full"
        onClick={togglePlayback}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            togglePlayback();
          }
        }}
        role={isFile ? "button" : undefined}
        tabIndex={isFile ? 0 : undefined}
        aria-label={
          isFile ? (playing ? "Pause video" : "Play video") : undefined
        }
      >
        {isFile ? (
          <>
            <video
              ref={videoRef}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="relative size-full cursor-pointer object-cover"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            <span
              aria-hidden
              className="bg-surface-muted/50 pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              {playing ? (
                <PauseIcon className="size-10" />
              ) : (
                <PlayIcon className="size-10" />
              )}
            </span>
          </>
        ) : (
          <iframe
            src={src}
            title={caption || "Embedded video"}
            className="size-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      {caption ? (
        <figcaption className="text-caption text-content-default/70 mt-2">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
