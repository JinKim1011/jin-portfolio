import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPosts, getPostPageData } from "@/lib/posts";
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
  const pageData = await getPostPageData(slug);

  if (!pageData) notFound();

  return (
    <PostArticle post={pageData.post} relatedPosts={pageData.relatedPosts} />
  );
}

export default function PostDetailPage(props: PostDetailPageProps) {
  return (
    <Suspense fallback={null}>
      <PostDetailContent {...props} />
    </Suspense>
  );
}
