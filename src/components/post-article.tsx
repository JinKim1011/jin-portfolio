import { Post, PostDetail } from "@/types/post";
import PostHeader from "./post-header";
import PostCover from "./post-cover";
import PostBody from "./post-body";
import PostFooter from "./post-footer";

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
