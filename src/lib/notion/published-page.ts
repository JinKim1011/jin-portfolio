import { isNotionClientError } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion, notionDataSourceId } from "@/lib/notion";

function errorResponse(message: string, status: number) {
  return Response.json({ message }, { status });
}

export async function getCurrentPublishedPage(
  pageId: string,
  version: string | null,
  resourceName: string,
): Promise<PageObjectResponse | Response> {
  if (!version) {
    return errorResponse(`${resourceName} version is required`, 400);
  }
  if (!notion) return errorResponse("Notion is not configured", 503);
  if (!notionDataSourceId) {
    return errorResponse("Notion data source is not configured", 503);
  }

  try {
    const response = await notion.pages.retrieve({ page_id: pageId });

    if (!("properties" in response)) {
      return errorResponse("Notion page not found", 404);
    }

    if (
      response.parent.type !== "data_source_id" ||
      response.parent.data_source_id !== notionDataSourceId
    ) {
      return errorResponse("Unauthorized page", 404);
    }

    const published = response.properties.published;
    if (published?.type !== "checkbox" || !published.checkbox) {
      return errorResponse(`${resourceName} not found`, 404);
    }

    if (version !== response.last_edited_time) {
      return errorResponse(`${resourceName} version is no longer current`, 409);
    }

    return response;
  } catch (error) {
    if (isNotionClientError(error) && error.code === "object_not_found") {
      return errorResponse("Notion page not found", 404);
    }

    console.error(`Failed to retrieve Notion ${resourceName.toLowerCase()} page`, {
      pageId,
      error,
    });
    return errorResponse(
      `Failed to retrieve ${resourceName.toLowerCase()} page`,
      502,
    );
  }
}
