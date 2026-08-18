import Image from "next/image";

type ImageBlockProps = {
  src: string;
  alt: string;
  caption: string;
};

export function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <figure className="relative">
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="bg-surface-muted text-content-muted flex aspect-video items-center justify-center"
        >
          <ImageIcon aria-hidden className="size-4" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={640}
          height={360}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={imageStyle({ loading })}
          onError={() => {
            console.warn("Post image failed to load", { alt, src });
            setFailed(true);
          }}
          onLoad={() => setLoading(false)}
        />
      )}
      {caption ? <figcaption className="mt-1">{caption}</figcaption> : null}
    </figure>
  );
}
