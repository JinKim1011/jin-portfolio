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
