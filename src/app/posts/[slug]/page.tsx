import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostBySlug } from "@/lib/posts";

type PostDetailPageProps = {
  params: Promise<{ slug: string }>;
};

async function PostDetailContent({
  params,
}: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="">
      <header className="">
        <h1>{post.title}</h1>
        <div className="flex gap-1">
          {post.categories.map((category, index) => (
            <span key={category}>
              <Link
                href={`/?category=${encodeURIComponent(category)}`}
                className="hover:text-foreground"
              >
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
