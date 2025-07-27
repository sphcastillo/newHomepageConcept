import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function setupIntroAnimation({
  section,
  background,
  introImage,
  heading,
}: {
  section: HTMLElement;
  background: HTMLElement;
  introImage: HTMLElement;
  heading: HTMLElement;
}) {
  let mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: "(max-width: 413px)",
      isXxs: "(min-width: 414px) and (max-width: 539px)",
      isXs: "(min-width: 540px) and (max-width: 639px)",
      isSm: "(min-width: 640px) and (max-width: 767px)",
      isMd: "(min-width: 768px) and (max-width: 1023px)",
      isLg: "(min-width: 1024px) and (max-width: 1279px)",
      isXl: "(min-width: 1280px)",
    },
    (context) => {
      const conditions = context.conditions as {
        isMobile: boolean;
        isXxs: boolean;
        isXs: boolean;
        isSm: boolean;
        isMd: boolean;
        isLg: boolean;
        isXl: boolean;
      };

      const createTimeline = (scrollEnd: string, animDuration: number) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: scrollEnd,
              pin: true,
              scrub: true,
              // markers: true,
            },
          })
          .fromTo(
            background,
            { clipPath: "inset(54%)" },
            { clipPath: "inset(0%)", ease: "sine.inOut", duration: animDuration }
          )
          .fromTo(
            introImage,
            { y: -500, rotation: -10, opacity: 0 },
            {
              y: 0,
              rotation: 0,
              opacity: 1,
              ease: "power3.out",
              duration: 1.2,
            },
            0
          )
          .fromTo(
            heading,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: "power2.out" }
          );
      };

      if (conditions.isXxs || conditions.isXs) createTimeline("+=100vh", 3);
      if (conditions.isSm) createTimeline("+=800px", 1);
      if (conditions.isMd || conditions.isLg || conditions.isXl) createTimeline("+=1000px", 1);
    }
  );
}
