"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phrases = [
  "Vintage soul, modern hair magic.",
  "Where beauty meets playful elegance.",
  "Effortless glam, every single day.",
  "Extensions made to express you.",
  "Step into your Carousel moment.",
];

export default function Description() {
  return (
    <div id='description' className="relative text-white text-[3vw] uppercase mt-[35vw] ml-[10vw] space-y-[4vh]">
      {phrases.map((phrase, index) => {
        return <AnimatedText key={index}>{phrase}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children }: { children: React.ReactNode }) {
    const text = useRef(null);
  
    useLayoutEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
  
      gsap.from(text.current, {
        scrollTrigger: {
          trigger: text.current,
          scrub: 1.5,
          start: "0px bottom",
          end: "bottom+=400px bottom",
          // markers: true, // uncomment to debug
        },
        opacity: 0,
        left: "-200px",
        ease: "power3.Out",
      });
    }, []);
  
    return (
      <p className="m-0 relative left-0" ref={text}>
        {children}
      </p>
    );
  }
  