"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useLayoutEffect } from "react";

interface SlideshowProps {
  images: string[];
  onImageClick?: (src: string) => void;
}

export const Slideshow = ({ images, onImageClick }: SlideshowProps) => {
  const [dragLimit, setDragLimit] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const computeWidth = () => {
      if (carouselRef.current && contentRef.current) {
        const carouselWidth = carouselRef.current.offsetWidth;
        const contentWidth = contentRef.current.scrollWidth;
        setDragLimit(contentWidth > carouselWidth ? carouselWidth - contentWidth : 0);
      }
    };

    const observer = new ResizeObserver(() => {
      computeWidth();
    });

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    computeWidth();

    return () => observer.disconnect();
  }, [images]);

  return (
    <div 
      ref={carouselRef}
      className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <motion.div
        ref={contentRef}
        drag="x"
        dragConstraints={{ left: dragLimit, right: 0 }}
        dragElastic={0.1}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex gap-6 w-max pb-4"
      >
        {images.map((src, i) => (
          <motion.div 
            key={src} 
            layoutId={onImageClick ? src : undefined}
            onClick={() => onImageClick?.(src)} 
            className="relative h-[400px] w-[300px] md:w-[600px] flex-shrink-0 overflow-hidden rounded-3xl border border-white/5 bg-white/5"
          >
            <Image 
              src={src} 
              alt="Preview" 
              fill 
              unoptimized
              priority={i === 0} 
              className="object-cover pointer-events-none"
              sizes="(max-width: 768px) 300px, 600px"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};