"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const InteractiveHero = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const moveX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);

  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = event.clientX - rect.left;
    const centerY = event.clientY - rect.top;
    x.set(centerX / rect.width - 0.5);
    y.set(centerY / rect.height - 0.5);
    setGlowPos({ x: centerX, y: centerY });
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden touch-none"
    >
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:45px_45px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div 
          className="pointer-events-none absolute -z-10 h-[600px] w-[600px] rounded-full bg-cyan-500/10 blur-[120px]"
          style={{ left: glowPos.x - 300, top: glowPos.y - 300, position: 'absolute' }}
        />

        <motion.div
          style={{ x: moveX, y: moveY, rotateX, rotateY, perspective: 1000 }}
          className="flex flex-col items-center text-center gap-8"
        >
          <div className="flex flex-col gap-2">
            <h1 className="text-7xl md:text-9xl font-bold tracking-tightest text-white selection:bg-cyan-500">
              TONG MILZ
            </h1>
            <p className="text-2xl md:text-4xl text-neutral-600 font-light tracking-tight">Design. Develop. Deploy</p>
          </div>
          <p className="max-w-md text-lg md:text-xl text-neutral-400 leading-relaxed font-light">
            Konzepte in Code verwandeln. Lösungen statt nur Zeilen.
          </p>
        </motion.div>
    </div>
  );
};