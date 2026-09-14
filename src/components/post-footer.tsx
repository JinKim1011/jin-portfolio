import { Post } from "@/types/post";
import RevealEffect from "@/components/reveal-effect";
import { ShareButton } from "@/components/share-button";
import PostList from "@/components/posts/post-list";
import Button from "@/components/ui/button";
import { contact } from "@/lib/constants/contact";

type PostFooterProps = {
  relatedPosts: Post[];
};

const footerWrapper = "flex flex-col";
const actionWrapper = "flex gap-2 pb-16";
const relatedPost = "border-stroke flex w-full flex-col border-t-[0.5px] pb-16";
const relatedPostTitle =
  "text-label text-content-default w-fit pt-5 pb-2.5 select-none";

export default function PostFooter({ relatedPosts }: PostFooterProps) {
  const uniqueCategories = [
    ...new Set(relatedPosts.flatMap((post) => post.categories)),
  ];

  return (
    <RevealEffect className={footerWrapper} delay={0.3}>
      <div className={actionWrapper}>
        <ShareButton />
        <Button label="EMAIL" href={contact} />
      </div>
      {relatedPosts?.length > 0 && (
        <div className={relatedPost}>
          <h2 className={relatedPostTitle}>
            MORE {uniqueCategories.join(", ")} POSTS
          </h2>
          <PostList posts={relatedPosts} view="list" />
        </div>
      )}
    </RevealEffect>
  );
}
