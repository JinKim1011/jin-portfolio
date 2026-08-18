import Image from "next/image";

type ImageBlockProps = {
  src: string;
  alt: string;
  caption: string;
};

export function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  return (
    <figure className="relative">
      <Image
        src={src}
        alt={alt}
        width={640}
        height={360}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="mb-3 h-auto w-full shrink-0 object-cover"
      />
      {caption ? <figcaption className="mt-1">{caption}</figcaption> : null}
    </figure>
  );
}
