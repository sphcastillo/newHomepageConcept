"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SparkleStar from "./SparkleStar";

export default function SparkleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparkleDataRef = useRef<
    { top: number; left: number; scale: number; fill: string }[]
  >([]);
  const [ready, setReady] = useState(false);

  const pinkHues = [
    "#FFC0CB", "#FFB6C1", "#FF69B4", "#FF1493", "#FF85B3", "#FDAEAE",
    "#FEC5E5", "#FFBAD2", "#FDB9C8", "#FF6F91", "#FFA3B1", "#FF99CC",
    "#FFDDE2", "#FFD1DC", "#FFAACD", "#FBB3CE", "#FF8DAA", "#F9C1D9", "#FFBED1"
  ];

  const sparkleCount = 120;

  useEffect(() => {
    const cols = Math.ceil(Math.sqrt(sparkleCount));
    const rows = Math.ceil(sparkleCount / cols);
    const jitter = 0.9;

    const sparkleData = Array.from({ length: sparkleCount }).map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const scale = 0.4 + Math.random() * 1.4;
        const jitter = 0.9;
      
        const estimatedSizePercent = scale * 5; // rough estimate of % footprint
        const maxTop = 100 - estimatedSizePercent;
      
        const top = Math.min(
          (row + Math.random() * jitter) * (100 / rows),
          maxTop
        );
      
        const left = Math.min(
          (col + Math.random() * jitter) * (100 / cols),
          100 - estimatedSizePercent
        );
      
        return {
          top,
          left,
          scale,
          fill: pinkHues[Math.floor(Math.random() * pinkHues.length)],
        };
      });
      

    sparkleDataRef.current = sparkleData;
    setReady(true);

    requestAnimationFrame(() => {
      const sparkles = gsap.utils.toArray<HTMLElement>(".sparkle");

      sparkles.forEach((star, index) => {
        const initialScale = gsap.getProperty(star, "scale") as number;

        // ✨ Pulse animation (all)
        gsap.fromTo(
          star,
          {
            opacity: 0.5,
            scale: initialScale,
          },
          {
            opacity: 1,
            scale: initialScale + 0.25,
            repeat: -1,
            yoyo: true,
            duration: 1.8 + Math.random(),
            ease: "sine.inOut",
            delay: Math.random() * 3,
            repeatDelay: 1 + Math.random() * 1.5,
          }
        );

        // ✨ Gentle float for some stars
        if (index % 3 === 0) {
          gsap.to(star, {
            x: "+=10",
            y: "-=5",
            duration: 4 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2,
          });
        }
      });
      gsap.to(".scroll-prompt", {
        scrollTrigger: {
          trigger: "#sparkle-overture",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        y: -20,
        ease: "sine.out",
      });

    });
  }, []);

  if (!ready) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
    >
      {sparkleDataRef.current.map(({ top, left, scale, fill }, i) => (
        <div
          key={i}
          className="sparkle absolute opacity-70"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            transform: `scale(${scale})`,
          }}
        >
          <SparkleStar fill={fill} />
        </div>
      ))}

      {/* ✨ Scroll prompt */}
      <div className="scroll-prompt absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-center top-[65vh] md:top-[75vh]" >

        <span className="font-cursive text-xl font-bold text-white tracking-wider">
        Take a twirl below
        </span>
        <svg
          className="w-5 h-5 sm:w-7 sm:h-7 text-white mt-1 animate-bounce"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 14a.75.75 0 01-.53-.22l-4-4a.75.75 0 111.06-1.06L10 12.19l3.47-3.47a.75.75 0 011.06 1.06l-4 4A.75.75 0 0110 14z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
