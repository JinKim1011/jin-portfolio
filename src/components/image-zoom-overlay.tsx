"use client";

import { createPortal } from "react-dom";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { easings } from "@/lib/utils/motion-easing";
import ImageOverlayGuide from "./image-overlay-guide";

type ImageZoomOverlayProps = {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
};

const imageStyle = cva(
  "h-auto max-h-screen w-auto max-w-[100vw] object-contain",
  {
    variants: {
      loading: {
        true: "bg-surface-muted",
        false: "bg-none",
      },
    },
    defaultVariants: {
      loading: true,
    },
  },
);

const wrapperStyle =
  "fixed inset-0 z-50 flex items-center justify-center overflow-hidden overscroll-none touch-none bg-surface-overlay backdrop-blur-[2px]";

const keyboardGuideWrapper =
  "absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-3 whitespace-nowrap text-label-small text-content-default bg-surface/50 p-2 backdrop-blur-[1px]";

const keyboardStyle =
  "text-caption bg-surface-muted border-stroke h-fit rounded border-[0.5px] px-1 text-[0.9em]";

const keyboardSeparator = "text-label-small text-content-muted/50";

export default function ImageZoomOverlay({
  src,
  alt,
  open,
  onClose,
}: ImageZoomOverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  const downPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "+":
        case "=":
          transformRef.current?.zoomIn();
          break;
        case "-":
        case "_":
          transformRef.current?.zoomOut();
          break;
        case "0":
          transformRef.current?.resetTransform();
          break;
      }
    };

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    const start = downPos.current;
    downPos.current = null;

    if (start) {
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (Math.hypot(dx, dy) > 5) return;
    }
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onPointerDown={(e) => {
            downPos.current = { x: e.clientX, y: e.clientY };
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className={wrapperStyle}
          transition={{ duration: 0.2, ease: easings.easeOutQuart }}
        >
          <TransformWrapper
            ref={transformRef}
            initialScale={1}
            minScale={1}
            maxScale={5}
            centerOnInit
            wheel={{ step: 0.02 }}
            doubleClick={{ mode: "toggle", step: 2 }}
            panning={{ velocityDisabled: true }}
          >
            <TransformComponent
              wrapperClass="!h-screen !w-screen"
              contentClass="!h-screen !w-screen flex items-center justify-center"
            >
              <motion.div
                className="inline-flex"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: easings.easeOutQuart }}
              >
                <Image
                  src={src}
                  alt={alt}
                  width={640}
                  height={360}
                  onLoad={() => setLoading(false)}
                  sizes="100vw"
                  draggable={false}
                  className={imageStyle({ loading })}
                />
              </motion.div>
            </TransformComponent>
          </TransformWrapper>
          <ImageOverlayGuide />
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
