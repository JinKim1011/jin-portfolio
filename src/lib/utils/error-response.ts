export function errorResponse(message: string, status: number) {
  return Response.json({ message }, { status });
}
