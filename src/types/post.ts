export interface Post {
  id: string;
  slug: string;
  title: string;
  cover: string | null;
  categories: string[];
  excerpt: string;
  publishedAt: string;
  published: boolean;
  // When true, the list links to `externalUrl` instead of a detail page
  external: boolean;
  externalUrl: string | null;
}

export interface PostBlock {
  id: string;
  type: string;
  html: string;
}

export interface PostDetail extends Post {
  blocks: PostBlock[];
}

export type PostView = "list" | "card";

export interface StaticBlock {
  id: string;
  type:
    | "paragraph"
    | "heading_1"
    | "heading_2"
    | "heading_3"
    | "bulleted_list_item"
    | "numbered_list_item"
    | "quote";
  html: string;
}

export interface CodeBlock {
  id: string;
  type: "code";
  highlightedHtml: string;
  raw: string;
}

export interface ImageBlock {
  id: string;
  type: "image";
  src: string;
  alt: string;
  caption: string;
}
