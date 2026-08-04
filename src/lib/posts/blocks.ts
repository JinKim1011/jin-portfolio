import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { PostBlock } from "@/types/post";
import { postBlockClassName } from "@/lib/posts/block-styles";
import { highlightCode } from "../shiki";

export async function renderBlock(
  block: BlockObjectResponse,
): Promise<PostBlock | null> {
  const toText = (rich: { plain_text: string }[] | undefined): string =>
    (rich ?? []).map((t) => escapeHtml(t.plain_text)).join("");

  const withClassName = (tag: string, className: string, content: string) =>
    `<${tag} class="${className}">${content}</${tag}>`;

  switch (block.type) {
    case "paragraph":
      return {
        id: block.id,
        type: block.type,
        html: withClassName(
          "p",
          postBlockClassName({ type: "paragraph" }),
          toText(block.paragraph.rich_text),
        ),
      };
    case "heading_1":
      return {
        id: block.id,
        type: block.type,
        html: withClassName(
          "h1",
          postBlockClassName({ type: "heading1" }),
          toText(block.heading_1.rich_text),
        ),
      };
    case "heading_2":
      return {
        id: block.id,
        type: block.type,
        html: withClassName(
          "h2",
          postBlockClassName({ type: "heading2" }),
          toText(block.heading_2.rich_text),
        ),
      };
    case "heading_3":
      return {
        id: block.id,
        type: block.type,
        html: withClassName(
          "h3",
          postBlockClassName({ type: "heading3" }),
          toText(block.heading_3.rich_text),
        ),
      };
    case "bulleted_list_item":
      return {
        id: block.id,
        type: block.type,
        html: withClassName(
          "li",
          postBlockClassName({
            type: "listItem",
            listType: block.type,
          }),
          toText(block.bulleted_list_item.rich_text),
        ),
      };
    case "numbered_list_item":
      return {
        id: block.id,
        type: block.type,
        html: withClassName(
          "li",
          postBlockClassName({
            type: "listItem",
            listType: block.type,
          }),
          toText(block.numbered_list_item.rich_text),
        ),
      };
    case "quote":
      return {
        id: block.id,
        type: block.type,
        html: withClassName(
          "blockquote",
          postBlockClassName({ type: "quote" }),
          toText(block.quote.rich_text),
        ),
      };
    case "code": {
      const raw = (block.code.rich_text ?? [])
        .map((text) => text.plain_text)
        .join("");
      const lang = block.code?.language ?? "text";
      const { htmlLight, htmlDark } = await highlightCode(raw, lang);

      const rawB64 = Buffer.from(raw, "utf8").toString("base64");

      return {
        id: block.id,
        type: block.type,
        html: `<div class="notion-code" data-raw-code-b64="${rawB64}"><div class="shiki-light">${htmlLight}</div><div class="shiki-dark">${htmlDark}</div></div>`,
      };
    }
    default:
      return null;
  }
}

export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
