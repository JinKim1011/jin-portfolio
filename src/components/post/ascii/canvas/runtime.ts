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
  let frameId: number | null = null;
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

  const stopAnimation = () => {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  const animate = (time: number) => {
    draw(time);

    if (pointer.active && !reducedMotion) {
      frameId = requestAnimationFrame(animate);
    } else {
      frameId = null;
    }
  };

  const handlePointerMove = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();

    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
    pointer.active = true;

    if (!reducedMotion && frameId === null) {
      frameId = requestAnimationFrame(animate);
    }
  };

  const handlePointerLeave = () => {
    pointer.active = false;
    stopAnimation();
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
      stopAnimation();
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    },
  };
}
