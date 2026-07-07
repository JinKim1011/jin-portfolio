import type { Post, PostDetail, PostBlock } from "@/types/post";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { notion, notionDatabaseId } from "@/lib/notion";
import { mapNotionPageToPost } from "./mappers";
import { renderBlock } from "./blocks";
import { MOCK_POSTS } from "./mock";

export async function getPosts(): Promise<Post[]> {
  if (!notion || !notionDatabaseId) {
    return MOCK_POSTS.map(({ blocks: _blocks, ...post }) => post);
  }

  const res = await notion.databases.query({
    database_id: notionDatabaseId,
    filter: { property: "published", checkbox: { equals: true } },
    sorts: [{ property: "time", direction: "descending" }],
  });

  return res.results
    .filter((r): r is PageObjectResponse => "properties" in r)
    .map(mapNotionPageToPost);
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (!notion || !notionDatabaseId) {
    return MOCK_POSTS.find((p) => p.slug === slug) ?? null;
  }

  const res = await notion.databases.query({
    database_id: notionDatabaseId,
    filter: {
      and: [
        { property: "slug", rich_text: { equals: slug } },
        { property: "published", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  });

  const page = res.results.find(
    (r): r is PageObjectResponse => "properties" in r,
  );
  if (!page) return null;

  const post = mapNotionPageToPost(page);

  const blockRes = await notion.blocks.children.list({ block_id: page.id });
  const blocks = blockRes.results
    .filter((b): b is BlockObjectResponse => "type" in b)
    .map(renderBlock)
    .filter((b): b is PostBlock => b !== null);

  return { ...post, blocks };
}
