import type { Post, PostDetail, PostBlock } from "@/types/post";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cacheLife } from "next/cache";
import { notion, notionDatabaseId } from "@/lib/notion";
import { mapNotionPageToPost } from "./mappers";
import { renderBlock } from "./blocks";

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("hours");

  if (!notion || !notionDatabaseId) {
    return [];
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
  "use cache";
  cacheLife("hours");

  if (!notion || !notionDatabaseId) {
    return null;
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

  const groupedBlocks: PostBlock[] = [];
  let currentListType: "bulleted_list_item" | "numbered_list_item" | null =
    null;
  let currentListItems: string[] = [];

  const flushList = () => {
    if (!currentListType || currentListItems.length === 0) return;

    groupedBlocks.push({
      id: `${currentListType}-${groupedBlocks.length}`,
      type: currentListType,
      html: `${currentListType === "bulleted_list_item" ? "<ul>" : "<ol>"}${currentListItems.join("")}${currentListType === "bulleted_list_item" ? "</ul>" : "</ol>"}`,
    });

    currentListType = null;
    currentListItems = [];
  };

  for (const block of blocks) {
    if (
      block.type === "bulleted_list_item" ||
      block.type === "numbered_list_item"
    ) {
      if (currentListType && currentListType !== block.type) {
        flushList();
      }

      currentListType = block.type;
      currentListItems.push(block.html);
      continue;
    }

    flushList();
    groupedBlocks.push(block);
  }

  flushList();

  return { ...post, blocks: groupedBlocks };
}
