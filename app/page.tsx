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

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  return (
    <>
      <div className="bg-[linear-gradient(to_top,_#ff9a9e_0%,_#fecfef_99%,_#fecfef_100%)]">
        <Header />
        <Intro />
        <Description />
        <div className="pt-40 ht-[40vh] sm:pt-20 sm:h-[80vh]"></div>
        <Insights />
      </div>
    </>
  );
}
