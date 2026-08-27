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
        const href = t.href.trim();
        const isSafeHref =
          href.startsWith("/") ||
          href.startsWith("#") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:") ||
          href.startsWith("http://") ||
          href.startsWith("https://");

        if (isSafeHref) {
          const external =
            href.startsWith("http://") || href.startsWith("https://");
          const extraAttrs = external
            ? ' target="_blank" rel="noopener noreferrer"'
            : "";

          text = `<a href="${escapeAttr(href)}" class="${postInlineLinkClassName}"${extraAttrs}>${text}</a>`;
        }
      }
      return text;
    })
    .join("");
