import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostBySlug, getPosts, getRelatedPosts } from "@/lib/posts";
import PostArticle from "@/components/post-article";

type PostDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts
    .filter((post) => !post.external)
    .map((post) => ({ slug: post.slug }));
}

async function PostDetailContent({ params }: PostDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const posts = await getPosts();
  const relatedPosts = getRelatedPosts(post, posts);

  return <PostArticle post={post} relatedPosts={relatedPosts} />;
}

export default function PostDetailPage(props: PostDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <PostDetailContent {...props} />
    </Suspense>
  );
}
