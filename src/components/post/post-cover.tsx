import { PostDetail } from "@/types/post";
import RevealEffect from "@/components/reveal-effect";
import CoverImage from "@/components/ui/cover-image";

type PostCoverProps = {
  post: PostDetail;
};

const coverStyle = "shrink-0 w-full aspect-video object-cover";
const coverSizes = "(max-width: 768px) 100vw, 50vw";

export default function PostCover({ post }: PostCoverProps) {
  return (
    <RevealEffect delay={0.1}>
      <CoverImage
        src={post.cover ?? null}
        alt={post.title}
        width={640}
        height={360}
        sizes={coverSizes}
        className={coverStyle}
      />
    </RevealEffect>
  );
}
