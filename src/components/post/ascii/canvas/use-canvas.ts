"use client";

import { useEffect, useRef, useState } from "react";
import { createAsciiCanvasRuntime } from "@/components/post/ascii/canvas/runtime";
import { parseAscii } from "@/lib/posts/ascii/parse";

type UseAsciiCanvasOptions = {
  asciiText: string;
};

export function useAsciiCanvas({ asciiText }: UseAsciiCanvasOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [canvasReady, setCanvasReady] = useState(false);
  const [canvasFailed, setCanvasFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const grid = parseAscii(asciiText);
    const context = canvas.getContext("2d");

    if (!grid || !context) {
      setCanvasFailed(true);
      return;
    }

    setCanvasReady(false);
    setCanvasFailed(false);

    const runtime = createAsciiCanvasRuntime({
      container,
      canvas,
      context,
      grid,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
    });

    runtime.start();
    setCanvasReady(true);

    return runtime.dispose;
  }, [asciiText]);

  return {
    containerRef,
    canvasRef,
    canvasReady,
    canvasFailed,
  };
}
