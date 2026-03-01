"use client";
import { useEffect, useState } from "react";

export const GlobalCursor = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div 
        className="h-[800px] w-[800px] rounded-full bg-cyan-500/5 blur-[120px] transition-opacity duration-500"
        style={{
          transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)`,
          position: "absolute",
        }}
      />
    </div>
  );
};