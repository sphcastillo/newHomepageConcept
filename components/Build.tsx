"use client";
import type { FeaturedProject } from "@/typings";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";


export default function Build({ project }: { project: FeaturedProject }) {
  const [isActive, setIsActive] = useState(false);
  const { title1, title2, src } = project;

  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      className="border-t-2 border-black pt-[0.8vw] pb-[0.8vw] cursor-pointer w-full flex justify-center items-center last:border-b-2"
    >
      <p className="text-[5vw] m-0 mr-[0.75vw]">{title1}</p>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isActive ? "10vw" : 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="flex justify-center overflow-hidden"
      >
        <Image
          src={src}
          alt={`${title1} ${title2}`}
          width={500}
          height={500}
          className="w-[10vw] h-auto"
          aria-hidden="true"
        />
      </motion.div>

      <p className="m-0 ml-[0.75vw] text-[5vw] text-black">{title2}</p>
    </div>
  );
}
