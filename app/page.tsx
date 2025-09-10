import Landing from "@/components/Landing";
import FeaturedWork from "@/components/FeaturedWork";
import ProjectGallery from "@/components/ProjectGallery";

export default function Home() {

  return (
    <main>
      <div className='pt-[300px] pb-[700px]'><ProjectGallery /></div>
      <div className='py-100'><FeaturedWork /></div>

      <Landing />
    </main>
  )
}