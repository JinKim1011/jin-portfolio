import { useEffect, useState, type RefObject } from "react";
import { mountStudio, normalizeStudioSettings } from "asciify-engine/studio";
import asciifyConfig from "@/components/effects/ascii/asciify-config.json";

export type RenderStatus = "loading" | "ready" | "failed";

const studioLimits = {
  maxDimension: 1280,
  maxCells: 24576,
};

const mobileStudioLimits = {
  maxDimension: 768,
  maxCells: 12000,
};

export function useAsciiStudio(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  asciiCoverUrl: string | null,
) {
  const [status, setStatus] = useState<RenderStatus>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !asciiCoverUrl) {
      setStatus("failed");
      console.error("Canvas or ascii cover url is empty");
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    let disposed = false;
    let studio: Awaited<ReturnType<typeof mountStudio>> | null = null;
    let controller: AbortController | null = null;

    const mountAsciiStudio = async (isMobile: boolean) => {
      controller?.abort();
      studio?.destroy();

      controller = new AbortController();
      studio = null;
      setStatus("loading");

      const settings = normalizeStudioSettings({
        ...asciifyConfig,
        cellSize: isMobile ? 10 : asciifyConfig.cellSize,
      });
      const limits = isMobile ? mobileStudioLimits : studioLimits;
      const currentController = controller;

      try {
        const instance = await mountStudio(canvas, asciiCoverUrl, {
          settings,
          maxDimension: limits.maxDimension,
          maxCells: limits.maxCells,
          adaptive: true,
          signal: currentController.signal,
          onError: (error) => {
            if (disposed || currentController.signal.aborted) return;

            setStatus("failed");
            currentController.abort();
            console.error("Failed to mount ASCII studio", error);
          },
        });

        if (disposed || currentController.signal.aborted) {
          instance.destroy();
          return;
        }

        studio = instance;
        setStatus("ready");
      } catch (error) {
        if (disposed || currentController.signal.aborted) return;

        setStatus("failed");
        console.error("Failed to mount ASCII studio", error);
      }
    };
    const handleViewportChange = (event: MediaQueryListEvent) => {
      void mountAsciiStudio(event.matches);
    };

    void mountAsciiStudio(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      disposed = true;
      mediaQuery.removeEventListener("change", handleViewportChange);
      controller?.abort();
      studio?.destroy();
    };
  }, [asciiCoverUrl, canvasRef]);

  return status;
}
