"use client";

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

function Projects() {
  const [selectedProject, setSelectedProject] = useState(0);
  const container = useRef<HTMLDivElement | null>(null);
  const imageContainer = useRef<HTMLDivElement | null>(null);
  const projectsList = useRef<HTMLDivElement | null>(null);
  const textColumn1 = useRef<HTMLDivElement | null>(null);
  const textColumn2 = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    console.log("🔧 Projects useLayoutEffect started");
    console.log("🔧 Refs check:", {
      container: container.current,
      imageContainer: imageContainer.current,
      projectsList: projectsList.current,
      textColumn1: textColumn1.current,
      textColumn2: textColumn2.current
    });

    gsap.registerPlugin(ScrollTrigger);
    
    if (!imageContainer.current || !projectsList.current || !container.current || !textColumn1.current || !textColumn2.current) {
      console.log("❌ Missing refs, returning early");
      return;
    }

    console.log("✅ All refs found, creating animations");

    // Check if smooth scroll is available
    const scrollContainer = document.querySelector("[data-scroll-container]");
    console.log("🔍 Smooth scroll container found:", scrollContainer);

    // Pin the image container
    const pinTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=200%",
      pin: imageContainer.current,
      pinSpacing: true,
      scroller: scrollContainer || undefined,
      onUpdate: (self) => {
        console.log("📌 Pin trigger progress:", self.progress);
      }
    });

    // Animate text columns to move up
    const textAnimation = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "+=150%",
      scrub: 1,
      scroller: scrollContainer || undefined,
      onUpdate: (self) => {
        console.log("📊 Text animation progress:", self.progress);
        if (textColumn1.current && textColumn2.current) {
          gsap.set([textColumn1.current, textColumn2.current], {
            y: self.progress * -200
          });
        }
      }
    });

    // Animate projects list to move up
    const projectsAnimation = ScrollTrigger.create({
      trigger: projectsList.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      scroller: scrollContainer || undefined,
      onUpdate: (self) => {
        console.log("📊 Projects animation progress:", self.progress);
        if (projectsList.current) {
          gsap.set(projectsList.current, {
            y: self.progress * -300
          });
        }
      }
    });

    // Handle project selection based on scroll
    const projectTrigger = ScrollTrigger.create({
      trigger: projectsList.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      scroller: scrollContainer || undefined,
      onUpdate: (self) => {
        const progress = self.progress;
        console.log("📊 Project trigger progress:", progress);
        const projectIndex = Math.floor(progress * (projects.length - 1));
        const clampedIndex = Math.min(Math.max(projectIndex, 0), projects.length - 1);
        
        if (clampedIndex !== selectedProject) {
          console.log("🔄 Changing project from", selectedProject, "to", clampedIndex);
          setSelectedProject(clampedIndex);
        }
      }
    });

    console.log("📋 All triggers created:", { pinTrigger, textAnimation, projectsAnimation, projectTrigger });

    // Log all ScrollTrigger instances
    console.log("📋 All ScrollTrigger instances:", ScrollTrigger.getAll());

    // Force a refresh after a short delay
    setTimeout(() => {
      console.log("🔄 Forcing ScrollTrigger refresh");
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      console.log("🧹 Cleaning up Projects animations");
      if (pinTrigger) pinTrigger.kill();
      if (textAnimation) textAnimation.kill();
      if (projectsAnimation) projectsAnimation.kill();
      if (projectTrigger) projectTrigger.kill();
    };
  }, []);

  console.log("🎨 Projects component rendering, selectedProject:", selectedProject);

  return (
    <div
      ref={container}
      className="relative text-black p-[10%] data-scroll-section"
      id="projects"
    >
      <div className="flex justify-between gap-[5%]">
        {/* Image */}
        <div
          ref={imageContainer}
          className="w-[40%] h-[500px] relative shrink-0 overflow-hidden"
        >
          <Image
            src={projects[selectedProject].src}
            alt="project image"
            priority
            className="object-contain transition-all duration-700 ease-out h-full"
            style={{
              transform: `translateY(${selectedProject * -30}px) scale(1.05)`
            }}
          />
        </div>

        {/* Text Columns */}
        <div ref={textColumn1} className="flex h-[500px] w-[20%] items-start">
          <p className="text-[1.6vw] font-bold text-white">
            Welcome to Carousel Hair Extensions— whether you're
            adding length and volume to your hair or exploring our stylish
            collection of tees and hoodies, this is your destination for all
            things beauty.
          </p>
        </div>
        <div ref={textColumn2} className="flex h-[500px] w-[20%] items-end">
          <p className="text-[1.6vw] font-bold text-white">
            Carousel Hair Extensions offers a handpicked selection of premium
            extensions in a variety of lengths, textures, and colors, all
            designed to help you transform your look with ease and confiden
          </p>
        </div>
      </div>

      {/* Project List */}
      <div ref={projectsList} className="flex flex-col relative mt-[200px]">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseOver={() => {
              console.log("🖱️ Hovering over project:", index);
              setSelectedProject(index);
            }}
            className={`w-full text-white flex justify-end border-b border-white uppercase text-[3vw] transition-all duration-500 ${
              index === selectedProject ? 'text-gray-300 scale-105' : 'hover:text-gray-200'
            }`}
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
