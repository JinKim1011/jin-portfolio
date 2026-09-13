import type { PostBlock } from "@/types/post";
import { ImageBlock } from "./image-block";
import { CodeBlock } from "./code-block";
import CalloutBlock from "./callout-block";
import { VideoBlock } from "./video-block";

export default function PostBlockView({ block }: { block: PostBlock }) {
  switch (block.type) {
    case "image":
      return (
        <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />
      );
    case "code":
      return <CodeBlock html={block.highlightedHtml} raw={block.raw} />;
    case "callout":
      return <CalloutBlock html={block.html} />;
    case "video":
      return <VideoBlock src={block.src} />;
    default:
      return <div dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
}
