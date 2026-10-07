"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

type CoverImageProps = {
  src: string | null;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  preload?: boolean;
};

export default function CoverImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  preload = false,
}: CoverImageProps) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <>
      {failed || !src ? (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            className,
            "text-content-muted flex aspect-video items-center justify-center",
          )}
        >
          <ImageIcon aria-hidden className="size-4" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          preload={preload}
          className={cn(
            className,
            ` ${loading ? "bg-surface-muted" : "bg-none"}`,
          )}
          onError={() => {
            console.warn("Post image failed to load", { alt, src });
            setFailed(true);
          }}
          onLoad={() => setLoading(false)}
        />
      )}
    </>
  );
}
