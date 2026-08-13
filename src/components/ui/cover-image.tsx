"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "../icons";

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
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const handleError = () => {
    if (src) {
      console.warn("Cover image failed to load", { alt, src });
      setFailedSrc(src);
    }
  };

  if (!src || failedSrc === src) {
    return (
      <div
        className={`${className ?? ""} bg-surface-muted text-content-muted flex items-center justify-center overflow-hidden`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon aria-hidden className="size-4" />
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
      onError={handleError}
    />
  );
}
