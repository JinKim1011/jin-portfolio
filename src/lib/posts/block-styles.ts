import { cva } from "class-variance-authority";

export const postBlockClassName = cva("", {
  variants: {
    type: {
      heading1: "text-heading-strong text-content-default",
      heading2: "text-heading mt-14 mb-5 text-content-default",
      heading3: "text-body-strong mb-5 text-content-default",
      paragraph: "text-body mb-3 text-content-default/70",
      listItem: "text-body text-content-default/70",
      quote: "text-body text-content-default/70",
      codeBlock: "overflow-x-auto p-3",
      code: "font-mono text-caption",
      image: "mb-3 text-caption text-content-muted",
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
      bulleted_list_item: "list-[square] list-inside mb-5",
      numbered_list_item: "list-decimal list-outside pl-5 mb-5",
    },
  },
});
