import { Client } from "@notionhq/client";

const notionToken = process.env.NOTION_TOKEN;
export const notionDatabaseId = process.env.NOTION_DATABASE_ID;

if (!notionToken) {
  console.warn("Access token is not set — Notion content will be unavailable.");
}

export const notion = notionToken ? new Client({ auth: notionToken }) : null;
