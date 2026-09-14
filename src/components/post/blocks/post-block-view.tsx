import type { PostBlock } from "@/types/post";
import ImageBlock from "@/components/post/blocks/image-block";
import CodeBlock from "@/components/post/blocks/code-block";
import CalloutBlock from "@/components/post/blocks/callout-block";
import VideoBlock from "@/components/post/blocks/video-block";

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
      return <VideoBlock src={block.src} caption={block.caption} />;
    default:
      return <div dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
}
