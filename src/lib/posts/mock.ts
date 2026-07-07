import type { PostDetail } from "@/types/post";

export const MOCK_POSTS: PostDetail[] = [
  {
    id: "mock-1",
    slug: "hello-world",
    title: "Hello, world",
    categories: ["CASE STUDY"],
    excerpt: "First post placeholder. Wire up NOTION_TOKEN to replace this.",
    publishedAt: "2026-07-01",
    published: true,
    external: false,
    externalUrl: null,
    blocks: [
      {
        id: "b1",
        type: "paragraph",
        html: "<p>This is mock content served because Notion is not configured yet.</p>",
      },
    ],
  },
];
