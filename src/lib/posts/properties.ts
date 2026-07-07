import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export function readTitle(page: PageObjectResponse, name: string): string {
  const prop = page.properties[name];
  if (prop?.type !== "title") return "";
  return prop.title.map((t) => t.plain_text).join("");
}

export function readRichText(page: PageObjectResponse, name: string): string {
  const prop = page.properties[name];
  if (prop?.type !== "rich_text") return "";
  return prop.rich_text.map((t) => t.plain_text).join("");
}

export function readCheckbox(page: PageObjectResponse, name: string): boolean {
  const prop = page.properties[name];
  return prop?.type === "checkbox" ? prop.checkbox : false;
}

export function readUrl(page: PageObjectResponse, name: string): string | null {
  const prop = page.properties[name];
  return prop?.type === "url" ? prop.url : null;
}

export function readDate(page: PageObjectResponse, name: string): string {
  const prop = page.properties[name];
  return prop?.type === "date" ? (prop.date?.start ?? "") : "";
}

export function readMultiSelect(
  page: PageObjectResponse,
  name: string,
): string[] {
  const prop = page.properties[name];
  if (prop?.type !== "multi_select") return [];
  return prop.multi_select.map((o) => o.name);
}

export function normalizeCategories(raw: string[]): string[] {
  return raw.map((r) => r.toUpperCase());
}
