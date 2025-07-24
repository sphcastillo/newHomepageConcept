"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import verticalCarousel from "@/images/breannaCarouselCreator.jpg";
import horizontalCarousel from "@/images/carouselbathtubLuna.jpg";
import { setupIntroAnimation } from "@/utlils/useIntroAnimation";

export default function Intro() {
  const background = useRef<HTMLDivElement | null>(null);
  const introImage = useRef<HTMLDivElement | null>(null);
  const mySection = useRef<HTMLElement | null>(null);
  const heading = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    if (
      !background.current ||
      !introImage.current ||
      !mySection.current ||
      !heading.current
    )
      return;

    setupIntroAnimation({
      section: mySection.current,
      background: background.current,
      introImage: introImage.current,
      heading: heading.current,
    });
  }, { scope: mySection });

  return (
    <section
      id="intro"
      ref={mySection}
      className="w-full h-[60vh] sm:h-[73vh] md:h-[80vh] lg:h-[85vh] xl:h-[99vh] flex justify-center relative"
    >
      <div
        ref={background}
        className="w-full h-[60vh] sm:h-[73vh] md:h-[80vh] lg:h-[85vh] xl:h-[99vh] absolute filter brightness-[.95]"
      >
        <Image
          src={horizontalCarousel}
          alt="background image"
          width={3041}
          height={2220}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      <div className="flex justify-center relative xxs:mt-[10vh] sm:mt-[28vh] md:mt-[34vh] lg:mt-[33vh]">
        <div
          ref={introImage}
          className="absolute min-w-[70px] min-h-[70px] sm:h-[225px] sm:w-[245px] md:h-[275px] md:w-[300px] lg:w-[420px] lg:h-[398px] xl:w-[350px] xl:h-[380px] filter brightness-[.95]"
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
          className="absolute sm:-top-[26vh] md:-top-[29vh] lg:-top-[24vh] xl:-top-[28vh] text-white text-[7vw] xl:text-[5.5vw] z-[3] text-center whitespace-nowrap"
        >
          Carousel Hair Extensions
        </h1>
      </div>
    </section>
  );
}
