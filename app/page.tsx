"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Insights from "@/components/Insights";
import Intro from "@/components/Intro";
import Description from "@/components/Description";
import HomepageCollection from "@/components/HomepageCollection";

// Register plugins outside the component to prevent re-registration on every render
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const box1 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (box1.current) {
      // console.log("Setting up animation for:", box1.current);
      gsap.to(box1.current, {
        x: "100vw",
        scrollTrigger: {
          trigger: box1.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) =>
            console.log("ScrollTrigger progress:", self.progress),
        },
      });
    }
  });

  return (
    <div className="bg-[linear-gradient(to_top,_#ff9a9e_0%,_#fecfef_99%,_#fecfef_100%)]">
      <Intro />
      <Description />
      <div className="pt-20 h-[80vh]">
        <HomepageCollection />
      </div>
      <Insights />

      {/* <div className="h-screen w-screen bg-orange-400"></div> */}
      {/* The animated box */}
      {/* <div className="h-20 w-20 bg-blue-500" ref={box1}></div> */}
      {/* <div className="h-screen w-screen bg-orange-400"></div>  */}
    </div>
  );
}
