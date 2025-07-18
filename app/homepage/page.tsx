"use client";

import Intro from "@/components/Intro";
import Description from "@/components/Description";
import Projects from "@/components/Projects";
import HomepageCollection from "@/components/HomepageCollection";

export default function Homepage() {
  return (
    <div>
      <section className="bg-[linear-gradient(to_top,_#ff9a9e_0%,_#fecfef_99%,_#fecfef_100%)]">
        <Intro />
        <Description />
        <div className="pt-20 h-[60vh]">
          <HomepageCollection />
        </div>
        <Projects />
      </section>
      <section className="min-h-[300px] w-full bg-[linear-gradient(to_top,_#fecfef,_#fce3ec,_#e0f7f1,_#4dd8ae)] transition-all duration-1000 ease-in-out">
      {/* Optional: Add decorative elements or text */}
    </section>
    </div>
  );
}
