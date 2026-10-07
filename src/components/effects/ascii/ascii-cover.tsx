"use client";

import { useEffect, useRef, useState } from "react";
import { mountStudio, normalizeStudioSettings } from "asciify-engine/studio";
import asciifyConfig from "@/components/effects/ascii/asciify-config.json";
import CoverImage from "@/components/ui/cover-image";
import { cn } from "@/lib/utils/cn";

type RenderStatus = "loading" | "ready" | "failed";

type AsciiCoverProps = {
  asciiCoverUrl: string | null;
  coverUrl: string | null;
  alt: string;
  preload?: boolean;
};

const studioLimits = {
  maxDimension: 1280,
  maxCells: 24576,
};

const mobileStudioLimits = {
  maxDimension: 768,
  maxCells: 12000,
};

export default function AsciiCover({
  asciiCoverUrl,
  coverUrl,
  alt,
  preload = false,
}: AsciiCoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [status, setStatus] = useState<RenderStatus>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !asciiCoverUrl) {
      setStatus("failed");

      console.error("Canvas or ascii cover url is empty");
      return;
    }

    const controller = new AbortController();
    let disposed = false;
    let studio: Awaited<ReturnType<typeof mountStudio>> | null = null;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const settings = normalizeStudioSettings({
      ...asciifyConfig,
      cellSize: isMobile ? 10 : asciifyConfig.cellSize,
    });
    const limits = isMobile ? mobileStudioLimits : studioLimits;

    const handleFailure = (error: unknown) => {
      if (disposed || controller.signal.aborted) return;

      setStatus("failed");
      controller.abort();
      console.error("Failed to mount ASCII studio", error);
    };

    void mountStudio(canvas, asciiCoverUrl, {
      settings,
      maxDimension: limits.maxDimension,
      maxCells: limits.maxCells,
      adaptive: true,
      signal: controller.signal,
      onError: handleFailure,
    })
      .then((instance) => {
        if (disposed) {
          instance.destroy();
          return;
        }

        studio = instance;
        setStatus("ready");
      })
      .catch((error: unknown) => {
        if (disposed || controller.signal.aborted) return;

        handleFailure(error);
      });

    return () => {
      disposed = true;
      controller.abort();
      studio?.destroy();
    };
  }, [asciiCoverUrl]);

  return (
    <>
      <CoverImage
        key={coverUrl ?? "cover-fallback"}
        src={coverUrl}
        alt={alt}
        width={1440}
        height={810}
        sizes="(max-width: 768px) calc(100vw - 40px), 728px"
        preload={preload}
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
