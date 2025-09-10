'use client'

import { FeaturedProjects } from "@/data/FeaturedProjects";
import { useState } from "react";
import Work from "./Work";
import Modal from "./Modal";
import type { ModalState } from "@/typings";


export default function ProjectGallery() {
    const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
    return (
        <main className='flex h-screen items-center justify-center'>
        <div className='w-[1000px] flex flex-col items-center justify-center'>
            {FeaturedProjects.map((project, index) => {
                return <Work index={index} title={project.title} setModal={setModal} key={index}/>
            })}
        </div>
        <Modal modal={modal} projects={FeaturedProjects}/>
      </main>
    )
}