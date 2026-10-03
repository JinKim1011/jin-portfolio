"use client";

import { useRef, useState } from "react";

type VideoBlockProps = {
  src: string;
  kind: "youtube" | "file";
  caption: string;
};

export default function VideoBlock({ src, kind, caption }: VideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

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
        className="group relative aspect-video w-full"
        onClick={togglePlayback}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            togglePlayback();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={playing ? "Pause video" : "Play video"}
      >
        {kind === "youtube" ? (
          <iframe
            src={`${src}?autoplay=1&mute=1&loop=1`}
            title={caption || "Embedded video"}
            className="size-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="size-full cursor-pointer object-cover"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        )}
      </div>
      {caption ? (
        <figcaption className="text-caption mt-1">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
