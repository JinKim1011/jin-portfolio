type VideoBlockProps = {
  src: string;
  caption: string;
};

export function VideoBlock({ src, caption }: VideoBlockProps) {
  return (
    <figure className="relative mb-5">
      <iframe
        src={src}
        title={caption || "Embedded video"}
        className="mb-5 aspect-video w-full"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {caption ? (
        <figcaption className="text-caption text-content-muted mt-1">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
