import { PostDetail } from "@/types/post";
import RevealEffect from "@/components/effects/reveal-effect";
import AsciiCanvas from "@/components/post/ascii/ascii-canvas";

type PostCoverProps = {
  post: PostDetail;
};

const coverStyle = "shrink-0 w-full aspect-video object-cover";
const coverSizes = "(max-width: 768px) 100vw, 50vw";

export default function PostCover({ post }: PostCoverProps) {
  return (
    <RevealEffect delay={0.1}>
      <AsciiCanvas
        asciiText={post.coverAscii ?? ""}
        fallbackImageUrl={post.cover}
        alt={post.title}
        width={640}
        height={360}
        sizes={coverSizes}
        className={coverStyle}
      />
    </RevealEffect>
  );
}
