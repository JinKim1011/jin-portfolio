import { revalidateTag } from "next/cache";
import { verifyWebhookSignature } from "@notionhq/client";

type WebhookPayload = {
  pageId?: string;
  slug?: string;
  event?: string;
  published?: boolean;
  updatedAt?: string;
  databaseId?: string;
  verification_token?: string;
};

function getVerificationToken() {
  return process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN;
}

export async function POST(request: Request) {
  const verificationToken = getVerificationToken();
  if (!verificationToken) {
    return Response.json(
      { error: "NOTION_WEBHOOK_VERIFICATION_TOKEN is not configured" },
      { status: 500 },
    );
  }

  const rawRequestBody = await request.text();

  const isValid = await verifyWebhookSignature({
    body: rawRequestBody,
    signature: request.headers.get("x-notion-signature"),
    verificationToken,
  });

  if (!isValid) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = JSON.parse(rawRequestBody) as WebhookPayload;

  revalidateTag("posts", { expire: 0 });

  if (payload.pageId) {
    revalidateTag(`post-id:${payload.pageId}`, { expire: 0 });
  }

  if (payload.slug) {
    revalidateTag(`post:${payload.slug}`, { expire: 0 });
  }

  return Response.json({
    ok: true,
    invalidated: [
      "posts",
      payload.pageId ? `post-id:${payload.pageId}` : null,
      payload.slug ? `post:${payload.slug}` : null,
    ].filter(Boolean),
  });
}
