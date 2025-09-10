import { StaticImageData } from "next/image";
import type { Dispatch, SetStateAction } from "react";

export type ModalState = { active: boolean; index: number };

export interface FeaturedProject {
    title: string;
    title1: string;
    title2: string;
    src: StaticImageData | string;
    color?: string;
    href?: string;
    newTab?: boolean;
  }

export interface Work {
    index: number;
    title: string;
    setModal: Dispatch<SetStateAction<ModalState>>;
}