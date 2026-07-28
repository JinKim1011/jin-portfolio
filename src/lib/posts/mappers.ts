import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Post } from "@/types/post";
import {
  readTitle,
  readRichText,
  readCheckbox,
  readUrl,
  readDate,
  readMultiSelect,
  normalizeCategories,
  readCover,
} from "./properties";

export function mapNotionPageToPost(page: PageObjectResponse): Post {
  return {
    id: page.id,
    slug: readRichText(page, "slug"),
    title: readTitle(page, "title"),
    cover: readCover(page),
    excerpt: readRichText(page, "sub-title"),
    categories: normalizeCategories(readMultiSelect(page, "category")),
    publishedAt: readDate(page, "time"),
    published: readCheckbox(page, "published"),
    external: readCheckbox(page, "external"),
    externalUrl: readUrl(page, "link"),
  };
}
