import type { Post, PostDetail, PostBlock } from "@/types/post";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { cacheLife, cacheTag } from "next/cache";
import { notion, notionDataSourceId } from "@/lib/notion";
import { mapNotionPageToPost } from "./mappers";
import { renderBlock } from "./blocks";
import { postListClassName } from "./block-styles";

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts");

  if (!notion || !notionDataSourceId) {
    return [];
  }

  const res = await notion.dataSources.query({
    data_source_id: notionDataSourceId,
    filter: { property: "published", checkbox: { equals: true } },
    sorts: [{ property: "time", direction: "descending" }],
  });

  return res.results
    .filter((r): r is PageObjectResponse => "properties" in r)
    .map(mapNotionPageToPost);
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`post:${slug}`);

  if (!notion || !notionDataSourceId) {
    return null;
  }

  const res = await notion.dataSources.query({
    data_source_id: notionDataSourceId,
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

  cacheTag(`post-id:${page.id}`);

  const post = mapNotionPageToPost(page);

  const blockRes = await notion.blocks.children.list({ block_id: page.id });
  const blocks = blockRes.results
    .filter((b): b is BlockObjectResponse => "type" in b)
    .map(renderBlock)
    .filter((b): b is Promise<PostBlock> => b !== null);

  const groupedBlocks: PostBlock[] = [];
  let currentListType: "bulleted_list_item" | "numbered_list_item" | null =
    null;
  let currentListItems: string[] = [];

  const flushList = () => {
    if (!currentListType || currentListItems.length === 0) return;

    groupedBlocks.push({
      id: `${currentListType}-${groupedBlocks.length}`,
      type: currentListType,
      html: `${currentListType === "bulleted_list_item" ? `<ul class="${postListClassName({ type: currentListType })}">` : `<ol class="${postListClassName({ type: currentListType })}">`}${currentListItems.join("")}${currentListType === "bulleted_list_item" ? "</ul>" : "</ol>"}`,
    });

    currentListType = null;
    currentListItems = [];
  };

  for (const block of blocks) {
    const blockType = (await block).type;
    if (
      blockType === "bulleted_list_item" ||
      blockType === "numbered_list_item"
    ) {
      if (currentListType && currentListType !== blockType) {
        flushList();
      }

      currentListType = blockType;
      currentListItems.push((await block).html);
      continue;
    }

    flushList();
    groupedBlocks.push(await block);
  }

  flushList();

  return { ...post, blocks: groupedBlocks };
}
