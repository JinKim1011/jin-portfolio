import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang = "text") {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "light-plus", dark: "dark-plus" },
  });

  return { html };
}
