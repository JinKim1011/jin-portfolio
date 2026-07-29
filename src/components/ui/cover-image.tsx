"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "@radix-ui/react-icons";

type CoverImageProps = {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
};

export default function CoverImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
}: CoverImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`${className ?? ""} bg-surface-muted text-content-muted flex items-center justify-center overflow-hidden`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon aria-hidden className="size-3" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
