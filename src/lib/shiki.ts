import { codeToHtml } from "shiki";

export async function highlightCode(code: string, lang = "text") {
  const htmlLight = await codeToHtml(code, {
    lang,
    themes: { light: "vscode-light" },
  });

  const htmlDark = await codeToHtml(code, {
    lang,
    themes: { dark: "vscode-dark-plus" },
  });

  return { htmlLight, htmlDark };
}
