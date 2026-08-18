export async function copyText(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (!navigator.clipboard) return false;

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
