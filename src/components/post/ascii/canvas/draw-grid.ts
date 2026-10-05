import type { AsciiGrid } from "@/lib/posts/ascii/parse";

export type DrawAsciiGridOptions = {
  width: number;
  height: number;
  pixelRatio: number;
  fontFamily: string;
  color: string;
};

const lineHeightRatio = 1.2;
const fallbackCharacterWidthRatio = 0.62;

export function drawAsciiGrid(
  context: CanvasRenderingContext2D,
  grid: AsciiGrid,
  options: DrawAsciiGridOptions,
): void {
  const { width, height, pixelRatio, fontFamily, color } = options;

  const cssFont = `100px ${fontFamily}`;

  context.font = cssFont;

  const measuredCharacterWidth = context.measureText("M").width / 100;
  const characterWidthRatio =
    measuredCharacterWidth > 0
      ? measuredCharacterWidth
      : fallbackCharacterWidthRatio;

  const fontSize = width / (grid.columnCount * characterWidthRatio);
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

  context.save();
  context.beginPath();
  context.rect(0, 0, width, height);
  context.clip();

  for (let row = 0; row < grid.rowCount; row += 1) {
    for (let column = 0; column < grid.columnCount; column += 1) {
      const character = grid.rows[row][column];

      if (character === " ") continue;

      const x = offsetX + column * characterWidth;
      const y = offsetY + row * lineHeight;

      context.fillText(character, x, y);
    }
  }

  context.restore();
}
