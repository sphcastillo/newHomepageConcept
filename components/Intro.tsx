"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import verticalCarousel from "@/images/newVerticalGlitz.jpg";
import horizontalCarousel from "@/images/carouselbathtubLuna.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



function Intro() {
  const background = useRef(null);
  const introImage = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    console.log("🌀 Setting up GSAP ScrollTrigger");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top",
        end: "+=500px",
      },
    });

    timeline
      .from(background.current, { clipPath: `inset(15%)` })
      .to(introImage.current, { height: "200px" }, 0);
  }, []);

  return (
    <section className="w-full flex justify-center relative">
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

      <div className="flex justify-center relative mt-[35vh]">
        <div
          ref={introImage}
          className="absolute h-[475px] w-[350px] filter brightness-[.95]"
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
        <h1 className="text-white text-[7vw] z-[3] text-center whitespace-nowrap">
          Carousel Hair Extensions
        </h1>
      </div>
    </section>
  );
}

export default Intro;
