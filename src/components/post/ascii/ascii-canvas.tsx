"use client";

import CoverImage from "@/components/ui/cover-image";
import { useAsciiCanvas } from "@/components/post/ascii/canvas/use-canvas";
import { cn } from "@/lib/utils/cn";

type AsciiCanvasProps = {
  asciiText: string;
  fallbackImageUrl: string | null;
  alt: string;
  className?: string;
  width: number;
  height: number;
  sizes?: string;
};

export default function AsciiCanvas({
  asciiText,
  fallbackImageUrl,
  alt,
  className,
  width,
  height,
  sizes,
}: AsciiCanvasProps) {
  const { containerRef, canvasRef, canvasReady, canvasFailed } = useAsciiCanvas(
    { asciiText },
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden font-mono", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <CoverImage
        src={fallbackImageUrl}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!canvasFailed && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={cn(
            "text-content-default absolute inset-0 h-full w-full transition-opacity",
            canvasReady ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />
      )}
    </div>
  );
}
