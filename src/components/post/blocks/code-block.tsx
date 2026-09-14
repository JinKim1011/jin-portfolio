import CopyButton from "@/components/post/blocks/copy-button";

type CodeBlockProps = {
  html: string;
  raw: string;
};

export default function CodeBlock({ html, raw }: CodeBlockProps) {
  return (
    <div className="notion-code bg-surface-muted relative mb-5">
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div className="absolute top-3 right-3 z-10 inline-block">
        <CopyButton raw={raw} />
      </div>
    </div>
  );
}
