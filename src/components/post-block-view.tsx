import { PostBlock } from "@/types/post";
import { ImageBlock } from "./image-block";
import { CodeBlock } from "./code-block";

export function PostBlockView({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "image":
      return (
        <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />
      );
    case "code":
      return <CodeBlock html={block.highlightedHtml} raw={block.raw} />;
    default:
      return <div dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
}
