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
  const container = useRef(null);
  const imageContainer = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({
      trigger: imageContainer.current,
      pin: true,
      start: "top-=100px",
      end: document.body.offsetHeight - window.innerHeight - 50,
    });
  }, []);

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
          className="w-[40%] h-[500px] relative shrink-0"
        >
          <Image
            src={projects[selectedProject].src}
            alt="project image"
            priority
            className="object-cover w-full h-full"
          />
        </div>

        {/* Text Columns */}
        <div className="flex h-[500px] w-[20%]  items-start">
          <p className="text-[1.6vw] font-bold text-white">
            Welcome to Carousel Hair Extensions— whether you’re
            adding length and volume to your hair or exploring our stylish
            collection of tees and hoodies, this is your destination for all
            things beauty.
          </p>
        </div>
        <div className="flex h-[500px] w-[20%] items-end">
          <p className="text-[1.6vw] font-bold text-white">
            Carousel Hair Extensions offers a handpicked selection of premium
            extensions in a variety of lengths, textures, and colors, all
            designed to help you transform your look with ease and confiden
          </p>
        </div>
      </div>

      {/* Project List Below */}
      <div className="flex flex-col relative mt-[200px]">
        {projects.map((project, index) => (
          <div
            key={index}
            onMouseOver={() => setSelectedProject(index)}
            className="w-full text-white flex justify-end border-b border-white uppercase text-[3vw]"
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
