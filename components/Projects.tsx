'use client';

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import image1 from "@/images/BreannaCreator.png";
import image2 from "@/images/breannablue1.jpg";
import image3 from "@/images/breannablue2.jpg";
import image4 from "@/images/breannablue3.jpg";
import image5 from "@/images/breannamirror.jpg";
import image6 from "@/images/breannatub2.jpg";
import image7 from "@/images/oldHollywoodGlamour.png";

const projects = [
  { title: "Salar de Atacama", src: image1 },
  { title: "Valle de la luna", src: image2 },
  { title: "Miscanti Lake", src: image3 },
  { title: "Miniques Lagoons", src: image4 },
  { title: "Salar de Atacama", src: image5 },
  { title: "Valle de la luna", src: image6 },
  { title: "Miscanti Lake", src: image7 },
];

function Projects({ locoScroll }: { locoScroll: any }) {
  const container = useRef<HTMLDivElement | null>(null);
  const pinWrap = useRef<HTMLDivElement | null>(null);
  const imageContainer = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState(0);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const scrollContainer = document.querySelector("[data-scroll-container]");

    if (!scrollContainer || !imageContainer.current || !pinWrap.current) return;

    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        if (locoScroll) {
          if (arguments.length) {
            locoScroll.scrollTo(value, 0, 0);
          }
          return locoScroll.scroll.instance.scroll.y;
        }
        return 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: (scrollContainer as HTMLElement).style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.create({
      trigger: pinWrap.current,
      start: "top top",
      end: "+=1500",
      pin: imageContainer.current,
      scrub: true,
      scroller: scrollContainer,
      pinType: "transform",
    });

    ScrollTrigger.addEventListener("refresh", () => {
      if (locoScroll) locoScroll.update();
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [locoScroll]);

  return (
    <div
      ref={container}
      className="relative text-black p-[10%] data-scroll-section"
      id="projects"
    >
      {/* Pin Section Wrap */}
      <div ref={pinWrap} className="flex justify-between gap-[5%]">
        {/* Image */}
        <div ref={imageContainer} className="w-[40%] h-[700px] relative shrink-0">
          <Image
            src={projects[selectedProject].src}
            alt="project image"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Text Columns */}
        <div className="flex h-[700px] w-[20%] text-[1.6vw] items-end">
          <p>
            The flora is characterized by the presence of high elevation wetland,
            as well as yellow straw, broom sedge, tola de agua and tola amaia.
          </p>
        </div>
        <div className="flex h-[700px] w-[20%] text-[1.6vw] items-end">
          <p>
            Some, like the southern viscacha, vicuña and Darwin's rhea, are
            classified as endangered species. Others, such as Andean goose,
            horned coot, Andean gull, puna tinamou and the three flamingo
            species inhabiting Chile are considered vulnerable.
          </p>
        </div>
      </div>

      {/* Project List Below */}
      <div className="flex flex-col relative mt-[200px]">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseOver={() => setSelectedProject(index)}
            className="w-full text-black flex justify-end border-b border-black uppercase text-[3vw]"
          >
            <h2 className="m-0 mt-[40px] mb-[20px] cursor-default">
              {project.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Spacer to enable scroll */}
      <div className="h-[100vh]" />
    </div>
  );
}

export default Projects;
