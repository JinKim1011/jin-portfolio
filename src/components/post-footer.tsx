import { Post } from "@/types/post";
import RevealEffect from "./reveal-effect";
import { ShareButton } from "./share-button";
import PostList from "./post-list";
import Button from "./ui/button";

type PostFooterProps = {
  relatedPosts: Post[];
};

const footerWrapper = "flex flex-col pb-16";
const actionWrapper = "flex gap-2 pb-16";
const relatedPost = "border-stroke flex w-full flex-col border-t-[0.5px]";
const relatedPostTitle =
  "text-label text-content-default w-fit pt-5 pb-2.5 select-none";

const mailto =
  "mailto:jinsu.kim1011@gmail.com?subject=Let%27s%20connect&body=Hi%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20I%27d%20love%20to%20connect.%0A%0A";

export default function PostFooter({ relatedPosts }: PostFooterProps) {
  return (
    <RevealEffect className={footerWrapper} delay={0.3}>
      <div className={actionWrapper}>
        <ShareButton />
        <Button label="EMAIL" href={mailto} />
      </div>
      <div className={relatedPost}>
        <h2 className={relatedPostTitle}>RELATED POSTS</h2>
        <PostList posts={relatedPosts} view="list" />
      </div>
    </RevealEffect>
  );
}
