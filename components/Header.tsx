"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const wordSpans = headerRef.current?.querySelectorAll(".word span");

    if (!wordSpans || wordSpans.length === 0) return;

    gsap.fromTo(
      wordSpans,
      {
        clipPath: "inset(100% 0 0 0)",
        opacity: 0,
      },
      {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        ease: "power2.out",
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#sparkle-overture", // 👈 This section
          start: "bottom bottom",       // when the bottom of sparkle hits the bottom of viewport
          toggleActions: "play none none none",
          once: true,
          // markers: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={headerRef}
      className="left-0 w-full h-16 bg-transparent z-50 p-4 flex justify-between items-center"
    >
      <div className="flex justify-center items-center text-white font-bold tracking-widest overflow-hidden gap-2">
        {["Carousel", "Hair", "Extensions"].map((word, i) => (
          <span
            key={i}
            className="word inline-block overflow-hidden"
            style={{ display: "inline-block" }}
          >
            <span className="inline-block">{word}</span>
          </span>
        ))}
      </div>
      <div className="flex justify-center items-center text-white font-bold tracking-widest overflow-hidden gap-2">
        {["Home", "About", "Contact"].map((word, i) => (
          <span
            key={i}
            className="word inline-block overflow-hidden"
            style={{ display: "inline-block" }}
          >
            <span className="inline-block">{word}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Header;
