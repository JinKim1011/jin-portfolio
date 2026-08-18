import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  html: string;
  raw: string;
};

export function CodeBlock({ html, raw }: CodeBlockProps) {
  return (
    <div className="notion-code">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="absolute top-3 right-3 z-10 inline-block">
        <CopyButton raw={raw} />
      </div>
    </div>
  );
}
