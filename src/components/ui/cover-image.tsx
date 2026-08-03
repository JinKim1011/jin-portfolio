"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const handleError = () => {
    if (src) {
      console.warn("Cover image failed to load", { alt, src });
    }
    setFailed(true);
  };

  if (!src || failed) {
    return (
      <div
        className={`${className ?? ""} bg-surface-muted text-content-muted flex items-center justify-center overflow-hidden`}
        role="img"
        aria-label={alt}
      >
        <ImageIcon aria-hidden className="size-3.5" />
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
