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
        return <AnimatedText key={index} index={index}>{phrase}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children, index }: { children: React.ReactNode; index: number }) {
    const text = useRef(null);
  
    useLayoutEffect(() => {
      const setupAnimation = () => {
        const scrollContainer = document.querySelector("[data-scroll-container]");
        if (!scrollContainer) {
          console.log("Scroll container not found, retrying...");
          setTimeout(setupAnimation, 100);
          return;
        }

        // Kill any existing ScrollTrigger with the same ID
        const existingTrigger = ScrollTrigger.getById(`description-text-${index}`);
        if (existingTrigger) {
          console.log(`Killing existing description ScrollTrigger ${index}`);
          existingTrigger.kill();
        }
        
        if (!text.current) {
          console.log("Text ref is null");
          return;
        }

        gsap.registerPlugin(ScrollTrigger);
    
        const tween = gsap.from(text.current, {
          scrollTrigger: {
            trigger: text.current,
            scrub: 1.5,
            start: "0px bottom",
            end: "bottom+=400px bottom",
            scroller: "[data-scroll-container]",
            markers: true,
            id: `description-text-${index}`,
          },
          opacity: 0,
          left: "-200px",
          ease: "power3.Out",
        });

        console.log(`Description text ${index} animation set up`);

        // Return cleanup function
        return () => {
          if (tween.scrollTrigger) {
            tween.scrollTrigger.kill();
          }
          tween.kill();
        };
      };

      // Add a small delay to ensure smooth scroll provider is ready
      const timer = setTimeout(setupAnimation, 300);

      // Return cleanup function
      return () => {
        clearTimeout(timer);
        const trigger = ScrollTrigger.getById(`description-text-${index}`);
        if (trigger) {
          trigger.kill();
        }
      };
    }, [index]);
  
    return (
      <p className="m-0 relative left-0" ref={text}>
        {children}
      </p>
    );
  }
  