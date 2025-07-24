"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CarouselInMotion() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 1], [1, 1, 2.6]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "25px"]);

  return (
    <div ref={ref} className="relative h-[400vh] text-white">
      {/* Section Text */}
      <div className="flex justify-center text-5xl p-24">
        <h2 className="text-center tracking-wide max-w-5xl">
          Inspired by a love for all things vintage, Breanna has curated a space
          that blends old-school charm with the latest hair trends, offering a
          unique aesthetic that’s both playful and sophisticated.
        </h2>
      </div>

      {/* Sticky Masked Section */}
      <div className="sticky top-0 h-screen w-full overflow-visible flex items-center justify-center">
        {/* 🎥 Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/CarouselExtensions.mp4" 
          autoPlay
          muted
          loop
          playsInline
        />

        {/* 🌀 SVG Mask Layer */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ff9a9e" />
              <stop offset="99%" stopColor="#fecfef" />
              <stop offset="100%" stopColor="#fecfef" />
            </linearGradient>
            <mask id="star-mask">
              <rect width="100%" height="100%" fill="white" />
              <motion.path
                d="M50 15 
                  C57.5 30, 70 40, 85 50 
                  C70 60, 57.5 70, 50 85 
                  C42.5 70, 30 60, 15 50 
                  C30 40, 42.5 30, 50 15Z"
                fill="black"
                style={{ scale }}
              />
            </mask>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#gradient)"
            mask="url(#star-mask)"
          />
        </motion.svg>

        {/* 🌫️ Optional Blurred Glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ filter: blur }}
        >
          <div className="w-full h-full opacity-[0.05]" />
        </motion.div>
      </div>

      {/* Content Below Scroll */}
      <div className="absolute top-[200vh] w-full text-center" />
    </div>
  );
}


