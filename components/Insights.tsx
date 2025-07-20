"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/ProjectsData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Insights() {
  const container = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useGSAP(
    () => {
      console.log("useGSAP running - imageLoaded:", imageLoaded);
      console.log("imageContainer.current:", !!imageContainer.current);
      console.log("container.current:", !!container.current);
      
      if (imageContainer.current && container.current && imageLoaded) {
        console.log("Creating ScrollTrigger - imageLoaded:", imageLoaded);
        console.log("✅ ScrollTrigger created successfully");
        
        ScrollTrigger.create({
          trigger: imageContainer.current,
          pin: true,
          start: "top-=100px",
          end: "bottom top",
        });
      } else if (imageContainer.current && container.current && !imageLoaded) {
        console.log("⏳ Waiting for image to load before creating ScrollTrigger...");
      }
    },
    { scope: container, dependencies: [imageLoaded] }
  );

  const handleImageLoad = () => {
    console.log("🖼️ Image loaded successfully");
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error("❌ Image failed to load");
  };

  return (
    <div ref={container} className="relative text-white font-bold p-[10%]">
      <div className="flex justify-between gap-[5%]">
        <div
          ref={imageContainer}
          className="w-[40%] h-[600px] relative shrink-0"
        >
          <Image
            src={projects[selectedProject].src}
            width={500}
            height={750}
            alt="project image"
            priority={true}
            className="object-cover h-full w-full"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </div>
        <div className="w-[20%] text-[1.6vw] flex h-[100%]">
          <p>
            The flora is characterized by the presence of high elevation
            wetland, as well as yellow straw, broom sedge, tola de agua and tola
            amaia.
          </p>
        </div>
        <div className="w-[20%] text-[1.6vw] flex h-[100%] items-end">
          <p>
            Some, like the southern viscacha, vicuña and Darwins rhea, are
            classified as endangered species. Others, such as Andean goose,
            horned coot, Andean gull, puna tinamou and the three flamingo
            species inhabiting in Chile (Andean flamingo, Chilean flamingo, and
            Jamess flamingo) are considered vulnerable.
          </p>
        </div>
      </div>

      <div className="flex flex-col relative mt-[200px]">
        {projects.map((project, index) => {
          return (
            <div
              key={index}
              onMouseOver={() => {
                setSelectedProject(index);
              }}
              className='"w-full text-white flex justify-end border-b border-white uppercase text-[3vw]"'
            >
              <h2 className="m-0 mt-[40px] mb-[20px] cursor-default">
                {project.title}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
