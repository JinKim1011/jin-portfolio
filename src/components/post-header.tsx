import { PostDetail } from "@/types/post";
import {
  badgeColor,
  getCategoryVariant,
} from "@/lib/utils/category-badge-variants";
import ScrambleText from "./scramble-text";
import NavLinkItem from "./ui/nav-link-item";

type PostHeaderProps = {
  post: PostDetail;
};

const headerWrapper = "flex flex-col gap-2.5 md:gap-1.5";
const titleWrapper = "flex flex-col gap-1 md:flex-row md:gap-2";
const titleClasses = "inline-block text-heading-strong text-content-default";
const subTitleClasses =
  "inline-block text-heading text-content-muted md:before:content-['—_']";
const metaWrapper = "flex items-center gap-2";
const timeClasses = "text-label text-content-muted";
const separatorClasses = "text-label-small text-content-muted/30";

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className={headerWrapper}>
      <div className={titleWrapper}>
        <ScrambleText
          text={post.title}
          className={titleClasses}
          as="h1"
          playOnMount={true}
        />
        <ScrambleText
          text={post.excerpt}
          className={subTitleClasses}
          as="h2"
          playOnMount={true}
        />
      </div>
      <div className={metaWrapper}>
        {post.categories.map((category) => (
          <NavLinkItem
            key={category}
            href={`/?category=${encodeURIComponent(category)}`}
            label={category}
            size="md"
            isBadge={true}
            badgeClassName={badgeColor({
              tag: getCategoryVariant(category),
            })}
          />
        ))}
        <span className={separatorClasses}>/</span>
        <time className={timeClasses}>
          {new Date(post.publishedAt)
            .toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
            .replace(/\//g, ".")}
        </time>
      </div>
    </header>
  );
}
