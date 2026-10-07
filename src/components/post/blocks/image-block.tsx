"use client";

import Image from "next/image";
import { ImageIcon } from "@/components/icons";
import { useState } from "react";
import { cva } from "class-variance-authority";
import dynamic from "next/dynamic";

type ImageBlockProps = {
  src: string;
  alt: string;
  caption: string;
};

const imageStyle = cva("h-auto w-full shrink-0 object-cover cursor-zoom-in", {
  variants: {
    loading: {
      true: "bg-surface-muted",
      false: "bg-none",
    },
  },
  defaultVariants: {
    loading: true,
  },
});

const ImageZoomOverlay = dynamic(
  () => import("@/components/post/blocks/image-zoom-overlay"),
  { ssr: false },
);

export default function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <figure className="relative mb-5">
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="bg-surface-muted text-content-muted flex aspect-video items-center justify-center"
        >
          <ImageIcon aria-hidden className="size-4" />
        </div>
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            width={1440}
            height={810}
            sizes="(max-width: 768px) calc(100vw - 40px), 728px"
            loading="lazy"
            className={imageStyle({ loading })}
            onError={() => {
              console.warn("Post image failed to load", { alt, src });
              setFailed(true);
            }}
            onLoad={() => setLoading(false)}
            onClick={() => setZoomOpen(true)}
            role="button"
            aria-haspopup="dialog"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setZoomOpen(true);
              }
            }}
          />
          <ImageZoomOverlay
            src={src}
            alt={alt}
            open={zoomOpen}
            onClose={() => setZoomOpen(false)}
          />
        </>
      )}
      {caption ? (
        <figcaption className="text-caption text-content-default/70 mt-2">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
