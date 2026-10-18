export function getContentType(
  response: Response,
  defaultContentType: string,
): string {
  return response.headers.get("content-type") ?? defaultContentType;
}
