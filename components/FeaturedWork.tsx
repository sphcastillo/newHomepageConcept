import { FeaturedProjects } from "@/data/FeaturedProjects";
import Build from "./Build";

function FeaturedWork() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[70%]">
        <div className="flex justify-center items-center text-6xl font-bold pb-24">
          <h2>Featured Work</h2>
        </div>

        {FeaturedProjects.map((project, index) => {
          return <Build project={project} key={index} />;
        })}
      </div>
    </section>
  );
}
export default FeaturedWork;
