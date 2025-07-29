"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Insights from "@/components/Insights";
import Intro from "@/components/Intro";
import Description from "@/components/Description";
import HomepageCollection from "@/components/HomepageCollection";
import CarouselInMotion from "@/components/CarouselInMotion";
import TextOpacity from "@/components/textOpacity/TextOpacity";
import Header from "@/components/Header";
import SparkleBackground from "@/components/SparkleBackground";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const sparkleSectionRef = useRef<HTMLDivElement>(null);
  const [hideSparkle, setHideSparkle] = useState(false);

  useGSAP(() => {
    gsap.to("#sparkle-overture", {
      scrollTrigger: {
        trigger: "#sparkle-overture",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onLeave: () => {
          setHideSparkle(true);
        },
      },
      opacity: 0,
      y: -100,
      ease: "power2.out",
    });
  }, []);

  return (
    <>
      <div className="bg-[linear-gradient(to_top,_#ff9a9e_0%,_#fecfef_99%,_#fecfef_100%)]">
        {!hideSparkle && (
          <section
            id="sparkle-overture"
            ref={sparkleSectionRef}
            className="relative h-screen overflow-hidden"
          >
            <SparkleBackground />
          </section>
        )}

        <section id="carousel-overture" className="relative z-10">

            {/* <div className="sticky top-0 z-50">
              <Header />
            </div> */}
            <Intro />
            <Description />




          <div className="pt-40 ht-[40vh] sm:pt-20 sm:h-[80vh]"></div>
          <Insights />
        </section>

        <TextOpacity />
        <CarouselInMotion />
      </div>
    </>
  );
}
