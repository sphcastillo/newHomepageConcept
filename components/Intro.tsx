"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import verticalCarousel from "@/images/breannaCarouselCreator.jpg";
import backgroundIntro from "@/images/homepage/desktopBackgroundIntro.png";
import mobileBackground from "@/images/homepage/lunaMobileBathtub.png";
import { setupIntroAnimation } from "@/utlils/useIntroAnimation";

export default function Intro() {
  const background = useRef<HTMLDivElement | null>(null);
  const introImage = useRef<HTMLDivElement | null>(null);
  const mySection = useRef<HTMLElement | null>(null);
  const heading = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
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
    },
    { scope: mySection }
  );

  return (
    <section
      id="intro"
      ref={mySection}
      className="w-full h-[90vh] sm:h-[73vh] md:h-[80vh] lg:h-[90vh] xl:h-[99vh] flex justify-center relative"
    >
      <div
        ref={background}
        className="w-full h-[90vh] sm:h-[73vh] md:h-[80vh] lg:h-[90vh] xl:h-[99vh] absolute filter brightness-[.95]"
      >
        <Image
          src={mobileBackground}
          alt="Mobile background"
          width={1080}
          height={1920}
          className="object-contain w-full h-full block sm:hidden transition-opacity duration-500"
          priority
        />
        <Image
          src={backgroundIntro}
          alt="background image"
          width={3041}
          height={2220}
          className="object-cover w-full h-full sm:block hidden transition-opacity duration-500"
          priority
        />
      </div>

      <div className="flex justify-center relative mt-[40vh] sm:mt-[28vh] md:mt-[34vh] lg:mt-[33vh]">
        <div
          ref={introImage}
          className="absolute min-w-[180px] min-h-[160px] sm:h-[225px] sm:w-[245px] md:h-[275px] md:w-[300px] xl:w-[350px] xl:h-[380px] filter brightness-[.95]"
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
          className="absolute -top-[25vh] sm:-top-[26vh] md:-top-[29vh] xl:-top-[28vh] text-white text-[7vw] xl:text-[5.5vw] z-[3] text-center whitespace-nowrap"
        >
          Carousel Hair Extensions
        </h1>
      </div>
    </section>
  );
}
