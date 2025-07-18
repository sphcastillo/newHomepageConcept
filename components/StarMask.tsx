"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function StarMask() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 4]);
  const blur = useTransform(scrollYProgress, [0, 1], ["0px", "25px"]);

  return (
    <div ref={ref} className="relative h-[300vh] text-white">
      <div className="flex justify-center text-5xl p-24">
        <h2 className='text-center tracking-wide'>
          Inspired by a love for all things vintage, Breanna has curated a space
          that blends old-school charm with the latest hair trends, offering a
          unique aesthetic that’s both playful and sophisticated. Carousel Hair
          Extensions offers a handpicked selection of premium extensions in a
          variety of lengths, textures, and colors, all designed to help you
          transform your look with ease and confidence
        </h2>
      </div>
      {/* SVG Mask Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="star-mask">
              <rect width="100%" height="100%" fill="white" />
              <motion.path
                d="M50 15 L61 39 L88 39 L66 58 L75 85 L50 68 L25 85 L34 58 L12 39 L39 39 Z"
                fill="black"
                style={{ scale }}
                transform="translate(0 0)"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="white"
            mask="url(#star-mask)"
          />
        </motion.svg>

        {/* Optional Shadow Element */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full"
          style={{ filter: blur }}
        >
          <div className="w-full h-full bg-white opacity-[0.05]" />
        </motion.div>
      </div>

      {/* Background Content */}
      <div className="absolute top-0 w-full text-center pt-[200vh] text-5xl">
        <p>✨ You Made It ✨</p>
      </div>
    </div>
  );
}
export default StarMask;

