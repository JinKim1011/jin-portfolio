import { cva } from "class-variance-authority";

export const postBlockClassName = cva("", {
  variants: {
    type: {
      heading1: "text-heading text-content-default",
      heading2: "text-heading-small mt-14 mb-5 text-content-default",
      heading3: "text-body-strong mb-5 text-content-default",
      paragraph: "text-body mb-3 text-content-muted",
      listItem: "text-body text-content-muted",
      quote: "text-body text-content-muted",
      codeBlock: "overflow-x-auto p-3",
      code: "font-mono text-caption",
    },
    listType: {
      bulleted_list_item: "marker:text-foreground/70",
      numbered_list_item: "marker:text-foreground/70",
    },
  },
  defaultVariants: {
    type: "paragraph",
  },
});

export const postListClassName = cva("", {
  variants: {
    type: {
      bulleted_list_item: "list-[square] list-inside mb-5",
      numbered_list_item: "list-decimal list-outside pl-5 mb-5",
    },
  },
});
