"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function InsightsAnimation({
  container,
  imageContainer,
  projectList,
}: {
  container: HTMLElement;
  imageContainer: HTMLElement;
  projectList: HTMLElement;
}) {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    ScrollTrigger.create({
      trigger: container,
      pin: imageContainer,
      start: "top top",
      end: "bottom bottom", // scroll entire Insights section
      scrub: true,
    });
  });

  mm.add("(max-width: 767px)", () => {
    ScrollTrigger.create({
      trigger: container,
      pin: imageContainer,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    });
  });

  return () => {
    mm.kill();
  };
}
