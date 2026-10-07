"use client";

import { useRef } from "react";
import CoverImage from "@/components/ui/cover-image";
import { cn } from "@/lib/utils/cn";
import { useAsciiStudio } from "@/components/effects/ascii/use-ascii-studio";

type AsciiCoverProps = {
  asciiCoverUrl: string | null;
  coverUrl: string | null;
  alt: string;
};

export default function AsciiCover({
  asciiCoverUrl,
  coverUrl,
  alt,
}: AsciiCoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const status = useAsciiStudio(canvasRef, asciiCoverUrl);

  return (
    <>
      <CoverImage
        key={coverUrl ?? "cover-fallback"}
        src={coverUrl}
        alt={alt}
        width={640}
        height={360}
        sizes="(max-width: 768px) calc(100vw - 40px), 640px"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity",
          status === "ready" ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />
    </>
  );
}
