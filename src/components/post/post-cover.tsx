import { PostDetail } from "@/types/post";
import AsciiCover from "@/components/effects/ascii/ascii-cover";

type PostCoverProps = {
  post: PostDetail;
};

export default function PostCover({ post }: PostCoverProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <AsciiCover
        asciiCoverUrl={`/ascii-covers/${post.slug}.png`}
        coverUrl={post.cover}
        alt={post.title}
        preload
      />
    </div>
  );
}
