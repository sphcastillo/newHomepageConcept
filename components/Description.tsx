"use client";
import { useRef } from "react";
import gsap from "gsap";
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
    <div
      id="description"
      className="relative text-white sm:text-[4vw] md:text-[4vw] lg:text-[4.2vw] xl:text-[3.3vw] uppercase sm:ml-[5vw] md:ml-[6vw] lg:ml-[4vw] xl:ml-[5vw] space-y-[4vh] sm:-mt-[9.7vh] md:-mt-[10vh] xl:-mt-[14.3vh]"
    >
      {phrases.map((phrase, index) => {
        return (
          <AnimatedText key={index} index={index}>
            {phrase}
          </AnimatedText>
        );
      })}
    </div>
  );
}

function AnimatedText({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const text = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 539px)",
        isXs: "(min-width: 540px) and (max-width: 639px)",
        isSm: "(min-width: 640px) and (max-width: 767px)",
        isMd: "(min-width: 768px) and (max-width: 1023px)",
        isLg: "(min-width: 1024px)",
        // isXl : "(min-width: 1280px)",
      },
      (context) => {
        const conditions = context.conditions as {

          isMobile: boolean;
          isXs: boolean;
          isSm: boolean;
          isMd: boolean;
          isLg: boolean;
          // isXl: boolean;
        };


        if(conditions.isSm) {
          gsap.from(text.current, {
            scrollTrigger: {
              trigger: text.current,
              scrub: true,
              start: "0px bottom",
              end: "bottom+=500px bottom",
            },
            opacity: 0,
            left: "-200px",
            ease: "power3.out",
          });
        }

        if(conditions.isMd) {
          gsap.from(text.current, {
            scrollTrigger: {
              trigger: text.current,
              scrub: true,
              start: "0px bottom",
              end: "bottom+=500px bottom",
            },
            opacity: 0,
            left: "-200px",
            ease: "power3.out",
          });
        }

        
      }
    ),
      { scope: text };
  });

  return (
    <p className="m-0 relative left-0" ref={text}>
      {children}
    </p>
  );
}
