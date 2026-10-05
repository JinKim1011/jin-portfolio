import { drawAsciiGrid } from "@/components/post/ascii/canvas/draw-grid";
import type { AsciiGrid } from "@/lib/posts/ascii/parse";

type CreateRuntimeOptions = {
  container: HTMLDivElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  grid: AsciiGrid;
  reducedMotion: boolean;
};

export function createAsciiCanvasRuntime({
  container,
  context,
  grid,
}: CreateRuntimeOptions) {
  const draw = () => {
    const rect = container.getBoundingClientRect();
    const styles = getComputedStyle(container);

    drawAsciiGrid(context, grid, {
      width: Math.max(1, rect.width),
      height: Math.max(1, rect.height),
      pixelRatio: window.devicePixelRatio || 1,
      fontFamily: styles.fontFamily,
      color: styles.color,
    });
  };

  const resizeObserver = new ResizeObserver(draw);

  return {
    start() {
      resizeObserver.observe(container);
      draw();
    },

    dispose() {
      resizeObserver.disconnect();
    },
  };
}
