import { cva } from "class-variance-authority";

export const postBlockClassName = cva("", {
  variants: {
    type: {
      heading1: "text-heading-strong text-content-default",
      heading2: "text-heading mt-16 mb-5 text-content-default",
      heading3: "text-body-strong mb-5 text-content-default",
      paragraph: "text-body mb-5 text-content-default/70",
      listItem: "text-body text-content-default/70",
      quote: "text-body text-content-default/70",
      callout: "text-body text-content-default/70",
    },
    listType: {
      bulleted_list_item: "marker:text-content-default/70",
      numbered_list_item: "marker:text-content-default/70",
    },
  },
  defaultVariants: {
    type: "paragraph",
  },
});

export const postListClassName = cva("", {
  variants: {
    type: {
      bulleted_list_item: "list-[square] list-outside pl-5 mb-5",
      numbered_list_item: "list-decimal list-outside pl-5 mb-5",
    },
  },
});

export const postInlineCodeClassName =
  "notion-inline-code bg-surface-muted border-stroke rounded border-[0.5px] px-1 py-0.5 text-[0.9em] text-content-feedback-warning/80";

export const postInlineLinkClassName =
  "text-content-default decoration-[0.5px] decoration-content-interactive/50 hover:decoration-content-interactive-hover/50 underline underline-offset-[6px]";

export const postInlineUnderlineClassName =
  "underline-offset-[6px] decoration-content-muted/50 decoration-dotted";
