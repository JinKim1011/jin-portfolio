import { escapeAttr, escapeHtml } from "../utils/html";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import {
  postInlineCodeClassName,
  postInlineLinkClassName,
  postInlineUnderlineClassName,
} from "./block-styles";

export const renderRichText = (
  rich: RichTextItemResponse[] | undefined,
): string =>
  (rich ?? [])
    .map((t) => {
      let text = escapeHtml(t.plain_text);
      const { bold, italic, strikethrough, underline, code } = t.annotations;

      if (code)
        text = `<code class="${postInlineCodeClassName}">${text}</code>`;
      if (bold) text = `<strong>${text}</strong>`;
      if (italic) text = `<em>${text}</em>`;
      if (strikethrough) text = `<s>${text}</s>`;
      if (underline)
        text = `<u class="${postInlineUnderlineClassName}">${text}</u>`;
      if (t.href) {
        const external = t.href.startsWith("http");

        text = `
        <a 
            href="${escapeAttr(t.href)}"
            class="${postInlineLinkClassName}"
            ${external ? ' target="_blank" rel="noopener noreferrer"' : ""}
        >   
            ${text}
        </a>
        `;
      }
      return text;
    })
    .join("");
