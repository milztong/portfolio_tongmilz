"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Slideshow } from "./Slideshow";
import Image from "next/image";

export const ProjectGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  return (
    <div className="relative w-full">
      <Slideshow 
        images={images} 
        onImageClick={(src) => setSelectedImage(src)} 
      />

      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md cursor-zoom-out"
            />

            <motion.div
              layoutId={selectedImage} 
              className="relative w-full max-w-4xl h-[80vh] flex items-center justify-center"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            >
              <Image
                src={selectedImage}
                alt="Detail View"
                fill
                unoptimized
                className="object-contain"
                priority
              />
              
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 m-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};