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
  const textColumnsContainer = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // Wait for Locomotive Scroll to be ready
    const initAnimations = () => {
      const scrollContainer = document.querySelector("[data-scroll-container]") as HTMLElement;
      
      if (!container.current || !imageContainer.current || !projectsList.current || !textColumnsContainer.current || !scrollContainer) {
        console.log("❌ Missing refs or scroll container, retrying...");
        setTimeout(initAnimations, 100);
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      console.log("✅ Starting animations setup");

      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container.current || 
            trigger.vars.trigger === projectsList.current) {
          trigger.kill();
        }
      });

      // 1. Pin the image container so it stays in place
      const pinImageTrigger = ScrollTrigger.create({
        trigger: container.current,
        start: "top center",
        end: () => `+=${projectsList.current!.offsetHeight + 400}`,
        pin: imageContainer.current,
        pinSpacing: false,
        scroller: scrollContainer,
        onUpdate: (self) => {
          console.log("📌 Pin progress:", self.progress);
        }
      });

      // 2. Move text columns up as we scroll
      const textScrollTrigger = ScrollTrigger.create({
        trigger: container.current,
        start: "top center",
        end: () => `+=${projectsList.current!.offsetHeight}`,
        scroller: scrollContainer,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMove = progress * -200; // Adjust this value to control how much text moves up
          gsap.set(textColumnsContainer.current, {
            y: yMove,
            ease: "none"
          });
        }
      });

      // 3. Handle project selection based on scroll position
      const projectSelectionTrigger = ScrollTrigger.create({
        trigger: projectsList.current,
        start: "top center",
        end: "bottom center",
        scroller: scrollContainer,
        onUpdate: (self) => {
          const progress = self.progress;
          const projectIndex = Math.floor(progress * projects.length);
          const clampedIndex = Math.min(Math.max(projectIndex, 0), projects.length - 1);
          
          if (clampedIndex !== selectedProject) {
            console.log("🔄 Changing project to:", clampedIndex);
            setSelectedProject(clampedIndex);
          }
        }
      });

      // 4. Animate the projects list to end up next to the image
      const projectsListTrigger = ScrollTrigger.create({
        trigger: projectsList.current,
        start: "top bottom",
        end: "top center",
        scroller: scrollContainer,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // Move the projects list up to align with the pinned image
          const yMove = progress * -300; // Adjust this value as needed
          gsap.set(projectsList.current, {
            y: yMove,
            ease: "none"
          });
        }
      });

      console.log("📋 All triggers created successfully");

      // Force refresh after a short delay
      setTimeout(() => {
        ScrollTrigger.refresh();
        console.log("🔄 ScrollTrigger refreshed");
      }, 200);

      // Cleanup function
      return () => {
        console.log("🧹 Cleaning up Projects animations");
        pinImageTrigger.kill();
        textScrollTrigger.kill();
        projectSelectionTrigger.kill();
        projectsListTrigger.kill();
      };
    };

    // Start initialization with a delay to ensure Locomotive Scroll is ready
    const timeoutId = setTimeout(initAnimations, 300);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [selectedProject]);

  return (
    <div
      ref={container}
      className="relative text-black p-[10%]"
      data-scroll-section
      id="projects"
    >
      {/* Main content row */}
      <div className="flex justify-between gap-[5%]">
        {/* Image - This will be pinned */}
        <div
          ref={imageContainer}
          className="w-[40%] h-[500px] relative shrink-0 overflow-hidden"
        >
          <Image
            src={projects[selectedProject].src}
            alt="project image"
            priority
            className="object-contain transition-all duration-700 ease-out h-full w-full"
            style={{
              transform: `scale(1.05)`
            }}
          />
        </div>

        {/* Text Columns - These will move up */}
        <div ref={textColumnsContainer} className="flex gap-[5%] w-[50%]">
          <div className="flex h-[500px] w-[45%] items-start">
            <p className="text-[1.6vw] font-bold text-white">
              Welcome to Carousel Hair Extensions— whether you're
              adding length and volume to your hair or exploring our stylish
              collection of tees and hoodies, this is your destination for all
              things beauty.
            </p>
          </div>
          <div className="flex h-[500px] w-[45%] items-end">
            <p className="text-[1.6vw] font-bold text-white">
              Carousel Hair Extensions offers a handpicked selection of premium
              extensions in a variety of lengths, textures, and colors, all
              designed to help you transform your look with ease and confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[20vh]" />

      {/* Project List - This will move up to align with the image */}
      <div ref={projectsList} className="flex flex-col relative">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseOver={() => {
              console.log("🖱️ Hovering over project:", index);
              setSelectedProject(index);
            }}
            className={`w-full text-white flex justify-end border-b border-white uppercase text-[3vw] transition-all duration-500 cursor-pointer ${
              index === selectedProject ? 'text-gray-300 scale-105' : 'hover:text-gray-200'
            }`}
          >
            <h2 className="m-0 mt-[40px] mb-[20px] cursor-default">
              {project.title}
            </h2>
          </div>
        ))}
      </div>

      {/* Final spacer to enable scroll */}
      <div className="h-[100vh]" />
    </div>
  );
}

export default Projects;