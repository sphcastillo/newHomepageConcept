"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const phrases = [
  "Vintage soul, modern hair magic.",
  "Where beauty meets playful elegance.",
  "Effortless glam, every single day.",
  "Extensions made to express you.",
  "Step into your Carousel moment.",
];

export default function Description() {
  return (
    <div id='description' className="relative text-white text-[3vw] uppercase ml-[10vw] space-y-[4vh] -mt-[16vh]">
      {phrases.map((phrase, index) => {
        return <AnimatedText key={index} index={index}>{phrase}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children, index }: { children: React.ReactNode; index: number }) {
    const text = useRef<HTMLParagraphElement | null>(null);
  
    useGSAP(() => {
        gsap.from(text.current, {
          scrollTrigger: {
            trigger: text.current,
            scrub: true,
            start: "0px bottom",
            end: "bottom+=400px bottom",
          },
          opacity: 0,
          left: "-200px",
          ease: "power3.out",
        });
      }, { scope: text });
  
    return (
      <p className="m-0 relative left-0" ref={text}>
        {children}
      </p>
    );
  }
  