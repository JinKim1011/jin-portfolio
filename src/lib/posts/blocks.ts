import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { PostBlock } from "@/types/post";

export function renderBlock(block: BlockObjectResponse): PostBlock | null {
  const toText = (rich: { plain_text: string }[] | undefined): string =>
    (rich ?? []).map((t) => escapeHtml(t.plain_text)).join("");

  switch (block.type) {
    case "paragraph":
      return {
        id: block.id,
        type: block.type,
        html: `<p>${toText(block.paragraph.rich_text)}</p>`,
      };
    case "heading_1":
      return {
        id: block.id,
        type: block.type,
        html: `<h1>${toText(block.heading_1.rich_text)}</h1>`,
      };
    case "heading_2":
      return {
        id: block.id,
        type: block.type,
        html: `<h2>${toText(block.heading_2.rich_text)}</h2>`,
      };
    case "heading_3":
      return {
        id: block.id,
        type: block.type,
        html: `<h3>${toText(block.heading_3.rich_text)}</h3>`,
      };
    case "bulleted_list_item":
      return {
        id: block.id,
        type: block.type,
        html: `<li>${toText(block.bulleted_list_item.rich_text)}</li>`,
      };
    case "numbered_list_item":
      return {
        id: block.id,
        type: block.type,
        html: `<li>${toText(block.numbered_list_item.rich_text)}</li>`,
      };
    case "quote":
      return {
        id: block.id,
        type: block.type,
        html: `<blockquote>${toText(block.quote.rich_text)}</blockquote>`,
      };
    case "code":
      return {
        id: block.id,
        type: block.type,
        html: `<pre><code>${toText(block.code.rich_text)}</code></pre>`,
      };
    default:
      return null;
  }
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
