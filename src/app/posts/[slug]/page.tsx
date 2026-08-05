import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostBySlug, getPosts } from "@/lib/posts";
import CoverImage from "@/components/ui/cover-image";
import { CodeCopyHydrator } from "@/components/code-copy-button";
import NavLinkItem from "@/components/ui/nav-link-item";
import {
  badgeColor,
  getCategoryVariant,
} from "@/lib/utils/category-badge-variants";

type PostDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts
    .filter((post) => !post.external)
    .map((post) => ({ slug: post.slug }));
}

const coverStyle = "shrink-0 w-full aspect-video object-cover my-5";
const coverSizes = "(max-width: 768px) 100vw, 50vw";

const headerWrapper = "flex flex-col gap-2.5 md:gap-1.5";

const titleWrapper = "flex flex-col gap-1 md:flex-row md:gap-2";
const titleClasses = "inline-block text-heading-strong text-content-default";
const subTitleClasses =
  "inline-block text-heading text-content-muted md:before:content-['—_']";

const metaWrapper = "flex items-center gap-2";
const timeClasses = "text-label text-content-muted";
const separatorClasses = "text-label-small text-content-muted/30";

async function PostDetailContent({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="py-16 font-sans">
      <header className={headerWrapper}>
        <div className={titleWrapper}>
          <h1 className={titleClasses}>{post.title}</h1>
          <h2 className={subTitleClasses}>{post.excerpt}</h2>
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
      <CoverImage
        src={post.cover ?? null}
        alt={post.title}
        width={640}
        height={360}
        sizes={coverSizes}
        className={coverStyle}
      />
      <div>
        {post.blocks.map((block) => (
          <div
            key={block.id}
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        ))}
        <CodeCopyHydrator />
      </div>
    </article>
  );
}

export default function PostDetailPage(props: PostDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <PostDetailContent {...props} />
    </Suspense>
  );
}
