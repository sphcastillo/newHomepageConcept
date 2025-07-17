"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let locomotiveScroll: any;
    
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const scrollContainer = document.querySelector(
        "[data-scroll-container]"
      ) as HTMLElement;
      if (!scrollContainer) return;

      locomotiveScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        lerp: 0.1,
        multiplier: 1,
      });

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
          return value !== undefined
            ? locomotiveScroll.scrollTo(value, {
                duration: 0,
                disableLerp: true,
              })
            : locomotiveScroll.scroll.instance?.scroll?.y || 0;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed",
      });

      locomotiveScroll.on("scroll", ScrollTrigger.update);
      ScrollTrigger.addEventListener("refresh", () => locomotiveScroll.update());
      
      // Wait for everything to be ready
      setTimeout(() => {
        ScrollTrigger.refresh();
        if (locomotiveScroll) locomotiveScroll.update();
        setIsReady(true);
        console.log("🚀 Smooth scroll and ScrollTrigger ready!");
      }, 100);

      window.addEventListener("load", () => {
        ScrollTrigger.refresh();
        if (locomotiveScroll) locomotiveScroll.update();
        setIsReady(true);
      });
    })();

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
      setIsReady(false);
    };
  }, []);

  return (
    <>
      {children}
      {/* Add a global ready state indicator */}
      {/* {isReady && (
        <div className="fixed bottom-4 left-4 z-50 bg-green-500 text-white px-3 py-1 rounded text-sm">
          Scroll Ready
        </div>
      )} */}
    </>
  );
}
