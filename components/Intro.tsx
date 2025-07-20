"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import verticalCarousel from "@/images/breannaCarouselCreator.jpg";
import horizontalCarousel from "@/images/carouselbathtubLuna.jpg";

export default function Intro() {
  const background = useRef<HTMLDivElement | null>(null);
  const introImage = useRef<HTMLDivElement | null>(null);
  const mySection = useRef<HTMLElement | null>(null);
  const heading = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (!background.current || !introImage.current || !mySection.current)
        return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: mySection.current,
            start: "top",
            end: "+=400px",
            scrub: true,
            // markers: true,
          },
        })
        .fromTo(
          background.current,
          { clipPath: "inset(15%)" },
          { clipPath: "inset(0%)", ease: 'sine.out', duration: 1 }
        )
        .to(introImage.current, { height: "250px", ease: "none" }, 0)
        .from(heading.current, { opacity: 0, y: 250 }, 0);
    },
    { scope: mySection }
  );

  return (
    <section
      id="intro"
      ref={mySection}
      className="w-full h-[120vh] flex justify-center relative"
    >
      <div
        ref={background}
        className="w-full h-[120vh] absolute filter brightness-[.95]"
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
        <h1
          ref={heading}
          className="text-white text-[7vw] z-[3] text-center whitespace-nowrap"
        >
          Carousel Hair Extensions
        </h1>
      </div>
    </section>
  );
}
