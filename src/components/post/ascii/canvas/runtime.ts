import {
  drawAsciiGrid,
  type AsciiPointer,
} from "@/components/post/ascii/canvas/draw-grid";
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
  canvas,
  context,
  grid,
  reducedMotion,
}: CreateRuntimeOptions) {
  const pointer: AsciiPointer = {
    x: 0,
    y: 0,
    active: false,
  };

  const draw = (time: number) => {
    const rect = container.getBoundingClientRect();
    const styles = getComputedStyle(container);

    drawAsciiGrid(context, grid, {
      width: Math.max(1, rect.width),
      height: Math.max(1, rect.height),
      pixelRatio: window.devicePixelRatio || 1,
      fontFamily: styles.fontFamily,
      color: styles.color,
      pointer,
      reducedMotion,
      time,
    });
  };

  const handlePointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();

    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;
  };

  const handlePointerLeave = () => {
    pointer.active = false;
    draw(performance.now());
  };

  const resizeObserver = new ResizeObserver(() => {
    draw(performance.now());
  });

  return {
    start() {
      resizeObserver.observe(container);
      canvas.addEventListener("pointermove", handlePointerMove);
      canvas.addEventListener("pointerleave", handlePointerLeave);
      draw(performance.now());
    },

    dispose() {
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    },
  };
}
