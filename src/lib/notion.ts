import { Client } from "@notionhq/client";

const notionToken = process.env.NOTION_TOKEN;

if (!notionToken) {
  console.warn("Access token is not set — Notion content will be unavailable.");
}

export const notionDataSourceId = process.env.NOTION_DATA_SOURCE_ID;

export const notion = new Client({ auth: notionToken });
