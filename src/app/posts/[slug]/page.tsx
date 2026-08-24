import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPostBySlug, getPosts, getRelatedPosts } from "@/lib/posts";
import PostBlockView from "@/components/post-block-view";
import RevealEffect from "@/components/reveal-effect";
import PostHeader from "@/components/post-header";
import PostFooter from "@/components/post-footer";
import PostCover from "@/components/post-cover";
import PostBody from "@/components/post-body";

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

  return (
    <article className="flex flex-col gap-14 pt-16 pb-14 font-sans">
      <PostHeader post={post} />

      <PostCover post={post} />

      <PostBody post={post} />

      <PostFooter relatedPosts={relatedPosts} />
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
