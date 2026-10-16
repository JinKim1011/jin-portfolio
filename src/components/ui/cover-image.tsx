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
  loading?: "eager" | "lazy";
  quality?: number;
  unoptimized?: boolean;
};

export default function CoverImage({
  src,
  alt,
  width,
  height,
  sizes,
  className,
  quality,
  preload = false,
  loading,
  unoptimized = false,
}: CoverImageProps) {
  const [failed, setFailed] = useState(false);
  const [load, setload] = useState(true);

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
          quality={quality}
          preload={preload}
          loading={loading}
          unoptimized={unoptimized}
          className={cn(className, ` ${load ? "bg-surface-muted" : "bg-none"}`)}
          onError={() => {
            console.warn("Post image failed to load", { alt, src });
            setFailed(true);
          }}
          onLoad={() => setload(false)}
        />
      )}
    </>
  );
}
