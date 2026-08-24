import { PostDetail } from "@/types/post";
import RevealEffect from "./reveal-effect";
import PostBlockView from "./post-block-view";

type PostBodyProps = {
  post: PostDetail;
};

export default function PostBody({ post }: PostBodyProps) {
  return (
    <RevealEffect delay={0.2}>
      {post.blocks.map((block) => (
        <PostBlockView key={block.id} block={block} />
      ))}
    </RevealEffect>
  );
}
