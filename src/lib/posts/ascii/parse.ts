export interface AsciiGrid {
  rows: string[];
  rowCount: number;
  columnCount: number;
}

export function parseAscii(text: string): AsciiGrid | null {
  const normalized = text.replace(/\r\n?/g, "\n");
  const rows = normalized.split("\n");

  if (rows.at(-1) === "") {
    rows.pop();
  }

  if (rows.length === 0) return null;

  const columnCount = Math.max(...rows.map((row) => row.length));
  if (columnCount === 0) return null;

  const normalizedRows = rows.map((row) => row.padEnd(columnCount, " "));

  return {
    rows: normalizedRows,
    rowCount: normalizedRows.length,
    columnCount,
  };
}
