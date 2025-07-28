"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/data/ProjectsData";
import { InsightsAnimation } from "@/utlils/animations/useInsightAnimation";
import { useGSAP } from "@gsap/react";

export default function Insights() {
  const container = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const projectList = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useGSAP(
    () => {
      if (container.current && imageContainer.current && imageLoaded) {
        return InsightsAnimation({
          container: container.current,
          imageContainer: imageContainer.current,
        });
      }
    },
    { scope: container, dependencies: [imageLoaded] }
  );

  return (
    <div
      ref={container}
      className="relative text-white font-bold p-[5%] md:p-[10%]"
    >
      <div className="flex flex-col md:flex-row justify-between gap-[5%] items-center md:items-start">
        {/* Image wrapper for centering */}
        <div className="w-full md:w-[40%] flex justify-center">
          <div
            ref={imageContainer}
            className="w-full max-w-md h-[500px] md:h-[600px] flex items-center justify-center"
          >
            <Image
              src={projects[selectedProject].src}
              width={500}
              height={750}
              alt="project image"
              priority
              className="object-contain w-full h-full"
              onLoad={() => setImageLoaded(true)}
              onError={() => console.error("❌ Image failed to load")}
            />
          </div>
        </div>

        {/* Text Columns */}
        <div className="w-full md:w-[40%] flex flex-col lg:flex-row gap-8 mt-8 md:mt-0">
          <div className="w-full lg:w-[50%] flex">
            <p className="text-[18px] md:text-[1.4vw]">
              Welcome to Carousel Hair Extensions! Whether you’re adding length
              or volume to your hair, this is your destination for all things
              beauty. Carousel Hair Extensions offers a handpicked selection of
              premium extensions in a variety of lengths, textures, and colors,
              all designed to help you transform your look with ease and
              confidence.
            </p>
          </div>
          <div className="w-full lg:w-[50%] flex md:items-start">
            <p className="text-[18px] md:text-[1.4vw]">
              Inspired by a love for all things vintage, Breanna has curated a
              space that blends old-school charm with the latest hair trends.
              The result is a unique aesthetic that’s both playful and
              sophisticated—where timeless style meets modern glamour in every
              detail of your experience.
            </p>
          </div>
        </div>
      </div>

      <div ref={projectList} className="flex flex-col relative mt-[100px] md:mt-[200px]">
        {projects.map((project, index) => {
          return (
            <div
              key={index}
              onMouseOver={() => {
                setSelectedProject(index);
              }}
              className="w-full text-white flex justify-end border-b border-white uppercase "
            >
              <h2 className="m-0 mt-[40px] mb-[20px] cursor-default text-[18px] md:text-[2.4vw]">
                {project.title}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="h-[20vh] md:h-[10vh]" />
    </div>
  );
}
