import type { AsciiGrid } from "@/lib/posts/ascii/parse";

export type AsciiPointer = {
  x: number;
  y: number;
  active: boolean;
};

export type DrawAsciiGridOptions = {
  width: number;
  height: number;
  pixelRatio: number;
  fontFamily: string;
  color: string;
  pointer: AsciiPointer;
  reducedMotion: boolean;
  time: number;
};

const characterWidthRatio = 0.62;
const lineHeightRatio = 1.08;
export function drawAsciiGrid(
  context: CanvasRenderingContext2D,
  grid: AsciiGrid,
  options: DrawAsciiGridOptions,
): void {
  const {
    width,
    height,
    pixelRatio,
    fontFamily,
    color,
  } = options;

  const fontSize = Math.min(
    width / (grid.columnCount * characterWidthRatio),
    height / (grid.rowCount * lineHeightRatio),
  );

  const characterWidth = fontSize * characterWidthRatio;
  const lineHeight = fontSize * lineHeightRatio;
  const gridWidth = characterWidth * grid.columnCount;
  const gridHeight = lineHeight * grid.rowCount;
  const offsetX = (width - gridWidth) / 2;
  const offsetY = (height - gridHeight) / 2;

  context.canvas.width = Math.round(width * pixelRatio);
  context.canvas.height = Math.round(height * pixelRatio);

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.fillStyle = color;
  context.font = `${fontSize}px ${fontFamily}`;
  context.textBaseline = "top";
  context.textAlign = "left";

  for (let row = 0; row < grid.rowCount; row += 1) {
    for (let column = 0; column < grid.columnCount; column += 1) {
      const character = grid.rows[row][column];
      if (character === " ") continue;

      const baseX = offsetX + column * characterWidth;
      const baseY = offsetY + row * lineHeight;
      context.fillText(character, baseX, baseY);
    }
  }
}
