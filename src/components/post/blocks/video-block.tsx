type VideoBlockProps = {
  src: string;
  caption: string;
};

export default function VideoBlock({ src, caption }: VideoBlockProps) {
  return (
    <figure className="mb-5">
      <iframe
        src={src}
        title={caption || "Embedded video"}
        className="aspect-video w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {caption ? (
        <figcaption className="text-caption mt-1">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
