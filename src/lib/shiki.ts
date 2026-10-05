import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang = "text") {
  const html = await codeToHtml(code, {
    lang,
    theme: "dark-plus",
  });

  return { html };
}
