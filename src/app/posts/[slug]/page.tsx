import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostBySlug, getPosts } from "@/lib/posts";
import CoverImage from "@/components/ui/cover-image";
import PostBlockView from "@/components/post-block-view";
import { ShareButton } from "@/components/share-button";
import RevealEffect from "@/components/reveal-effect";
import PostList from "@/components/post-list";

type PostDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts
    .filter((post) => !post.external)
    .map((post) => ({ slug: post.slug }));
}

const coverStyle = "shrink-0 w-full aspect-video object-cover";
const coverSizes = "(max-width: 768px) 100vw, 50vw";

const footerWrapper = "flex flex-col gap-14";

async function PostDetailContent({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const posts = await getPosts();
  const relatedPosts = posts.filter(
    (relatedPost) =>
      relatedPost.id !== post.id &&
      relatedPost.categories.some((category) =>
        post.categories.includes(category),
      ),
  );

  return (
    <article className="flex flex-col gap-14 pt-16 pb-14 font-sans">
      <PostHeader {...post} />
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
      <RevealEffect delay={0.6}>
        {post.blocks.map((block) => (
          <PostBlockView key={block.id} block={block} />
        ))}
      </RevealEffect>
      <div className={footerWrapper}>
        <ShareButton />
        <div className="border-stroke flex w-full flex-col border-t-[0.5px]">
          <h2 className="text-label text-content-default pt-5 pb-2.5">
            RELATED POSTS
          </h2>
          <PostList posts={relatedPosts} view="list" />
        </div>
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
