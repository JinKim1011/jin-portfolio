import { Post } from "@/types/post";
import RevealEffect from "./reveal-effect";
import CoverImage from "./ui/cover-image";

type PostCoverProps = {
  post: Post;
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
