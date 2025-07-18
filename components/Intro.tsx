"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import verticalCarousel from "@/images/breannaCarouselCreator.jpg";
import horizontalCarousel from "@/images/carouselbathtubLuna.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Intro() {
  const background = useRef<HTMLDivElement | null>(null);
  const introImage = useRef<HTMLDivElement | null>(null);
  const mySection = useRef<HTMLElement | null>(null);
  const heading = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    if (!background.current || !introImage.current || !mySection.current || !heading.current) {
      console.log("One or more refs are undefined:", {
        background: background.current,
        introImage: introImage.current,
        mySection: mySection.current,
        heading: heading.current,
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    // console.log("🌀 Setting up GSAP ScrollTrigger for Intro");

    // Wait for smooth scroll to be ready
    const setupAnimation = () => {
      const scrollContainer = document.querySelector("[data-scroll-container]");
      if (!scrollContainer) {
        // console.log("Scroll container not found, retrying...");
        setTimeout(setupAnimation, 100);
        return;
      }

      // Kill any existing ScrollTrigger with the same ID
      const existingTrigger = ScrollTrigger.getById("intro-animation");
      if (existingTrigger) {
        // console.log("Killing existing intro ScrollTrigger");
        existingTrigger.kill();
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mySection.current,
          scrub: true,
          start: "top",
          end: "+=500px",
          scroller: "[data-scroll-container]",
          // markers: true,
          id: "intro-animation",
        },
      });

      timeline
        .from(background.current, { clipPath: `inset(15%)` })
        .to(introImage.current, { height: "200px" }, 0)
        .from(heading.current, { opacity: 0, y: 250 }, 0);

      // console.log("GSAP timeline steps added for Intro");

      // Return cleanup function
      return () => {
        if (timeline.scrollTrigger) {
          timeline.scrollTrigger.kill();
        }
        timeline.kill();
      };
    };

    // Add a small delay to ensure smooth scroll provider is ready
    const timer = setTimeout(setupAnimation, 200);

    return () => {
      clearTimeout(timer);
      const trigger = ScrollTrigger.getById("intro-animation");
      if (trigger) {
        trigger.kill();
      }
    };
  }, []);

  return (
    <section ref={mySection} className="w-full flex justify-center relative">
      {/* Temporary debug button */}
      {/* <button 
        onClick={() => {
          console.log("Manual ScrollTrigger refresh");
          ScrollTrigger.refresh();
          
          // Also try to refresh Locomotive Scroll if available
          const scrollContainer = document.querySelector("[data-scroll-container]");
          if (scrollContainer && (scrollContainer as any).__locomotive) {
            (scrollContainer as any).__locomotive.update();
          }
        }}
        className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded"
      >
        Refresh ScrollTrigger
      </button> */}
      
      {/* Debug info button */}
      {/* <button 
        onClick={() => {
          console.log("ScrollTrigger instances:", ScrollTrigger.getAll());
          console.log("GSAP tweens:", gsap.globalTimeline.getChildren());
        }}
        className="fixed top-4 right-48 z-50 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Debug Info
      </button> */}
      
      {/* Global cleanup button */}
      {/* <button 
        onClick={() => {
          console.log("Killing all ScrollTrigger instances");
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          console.log("All ScrollTrigger instances killed");
          
          // Force a page refresh to recreate everything
          window.location.reload();
        }}
        className="fixed top-4 right-80 z-50 bg-orange-500 text-white px-4 py-2 rounded"
      >
        Reset All
      </button> */}
      
      {/* Animation status indicator */}
      {/* <div 
        className="fixed top-16 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded"
        style={{ backgroundColor: 'green' }}
      >
        Animation Active
      </div> */}
      
      <div
        ref={background}
        className="w-full h-[140vh] absolute filter brightness-[.95]"
      >
        <Image
          src={horizontalCarousel}
          alt="background image"
          width={3041}
          height={2220}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      <div className="flex justify-center relative mt-[45vh]">
        <div
          ref={introImage}
          className="absolute h-[425px] w-[300px] filter brightness-[.95]"
        >
          <Image
            src={verticalCarousel}
            alt="intro image"
            width={2613}
            height={3382}
            priority
            className="object-cover object-top w-full h-full"
          />
        </div>
        <h1 ref={heading} className="text-white text-[7vw] z-[3] text-center whitespace-nowrap">
          Carousel Hair Extensions
        </h1>
      </div>
    </section>
  );
}

export default Intro;
