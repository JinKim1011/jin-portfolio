import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostBySlug, getPosts } from "@/lib/posts";
import CoverImage from "@/components/ui/cover-image";

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

async function PostDetailContent({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="font-sans">
      <header className="">
        <h1>{post.title}</h1>
        <h2>{post.excerpt}</h2>
        <CoverImage
          src={post.cover ?? null}
          alt={post.title}
          width={640}
          height={360}
          sizes={coverSizes}
          className={coverStyle}
        />
        <div className="flex gap-1">
          {post.categories.map((category, index) => (
            <span key={category}>
              <Link href={`/?category=${encodeURIComponent(category)}`}>
                {category}
              </Link>
              {index < post.categories.length - 1 && (
                <span className="ml-2" aria-hidden>
                  ·
                </span>
              )}
            </span>
          ))}
          <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
        </div>
      </header>

      <div>
        {post.blocks.map((block) => (
          <div
            key={block.id}
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        ))}
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
