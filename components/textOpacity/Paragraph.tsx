'use client'

import { useScroll, useTransform, motion} from "framer-motion";
import { useRef } from "react";

function Paragraph({paragraph}: {paragraph: string}) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start 0.9", "start 0.25"]
    })

    const opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

    return (
        <motion.p 
          ref={container}         
          className='flex flex-wrap max-w-[1280px] leading-none p-[40px] text-black text-[60px]'
          style={{opacity}}
        >
          {paragraph}
        </motion.p>
      )
}
export default Paragraph