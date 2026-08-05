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

export function decodeBase64Utf8(b64: string): string {
  return new TextDecoder().decode(
    Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)),
  );
}

export function getRawCodeFromElement(
  element: HTMLElement | null,
): string | null {
  if (!element) return null;
  const b64 = element.dataset?.rawCodeB64;
  if (!b64) return null;
  return decodeBase64Utf8(b64);
}

export async function copyCodeFromElement(
  element: HTMLElement | null,
): Promise<boolean> {
  const code = getRawCodeFromElement(element);
  if (!code) return false;
  return copyText(code);
}
