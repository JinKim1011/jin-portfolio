import Image from "next/image";

type ImageBlockProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  caption: string;
  className?: string;
};

export function ImageBlock({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  caption,
}: ImageBlockProps) {
  return (
    <figure>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
      />
      {caption ? <figcaption className="mt-1">{caption}</figcaption> : null}
    </figure>
  );
}
