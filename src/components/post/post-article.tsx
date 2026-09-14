import { Post, PostDetail } from "@/types/post";
import PostHeader from "@/components/post/post-header";
import PostCover from "@/components/post/post-cover";
import PostBody from "@/components/post/post-body";
import PostFooter from "@/components/post/post-footer";

type PostArticleProps = {
  relatedPosts: Post[];
  post: PostDetail;
};

export default function PostArticle({ post, relatedPosts }: PostArticleProps) {
  return (
    <article className="flex flex-col gap-14 font-sans">
      <PostHeader post={post} />

      <PostCover post={post} />

      <PostBody post={post} />

      <PostFooter relatedPosts={relatedPosts} />
    </article>
  );
}
