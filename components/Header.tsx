"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    // Glow & slide animation on header
    gsap.fromTo(
      headerEl,
      {
        opacity: 0,
        y: -40,
        boxShadow: "0 0 0px rgba(255, 105, 180, 0)", // no glow at start
      },
      {
        opacity: 1,
        y: 0,
        boxShadow: "0 0 15px rgba(255, 105, 180, 0.4)", // pink glow
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#sparkle-overture",
          start: "bottom bottom",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          // optional: remove glow after a few seconds
          gsap.to(headerEl, {
            boxShadow: "0 0 0px rgba(255, 105, 180, 0)",
            duration: 2,
            ease: "power2.out",
            delay: 1,
          });
        },
      }
    );

    // Stagger nav item fade-ins
    gsap.fromTo(
      navItemsRef.current,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        delay: 1, // start just after header appears
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#sparkle-overture",
          start: "bottom bottom",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div
      ref={headerRef}
      className="left-0 w-full h-16 bg-transparent z-50 p-4 flex justify-between items-center"
    >
      <div className="flex justify-center items-center text-white font-bold tracking-widest">
        Carousel Hair Extensions
      </div>
      <div>
        <ul className="flex gap-4 text-white font-light cursor-pointer">
          {["Home", "About", "Contact"].map((label, i) => (
            <li
              key={label}
              ref={(el) => {
                if (el) navItemsRef.current[i] = el;
              }}
              className="opacity-0 hover:underline underline-offset-4 decoration-pink-400"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
