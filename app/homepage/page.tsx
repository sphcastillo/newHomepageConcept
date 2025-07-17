"use client";

import Intro from "@/components/Intro";
import Description from "@/components/Description";
import Projects from "@/components/Projects";

export default function Homepage() {
  return (
    <div>
      <section className="bg-[linear-gradient(to_top,_#ff9a9e_0%,_#fecfef_99%,_#fecfef_100%)]">
        <Intro />
        <Description />
        <div className="mt-[5vh] mb-[60vh]">
        </div>
        <Projects />
      </section>
    </div>
  );
}
