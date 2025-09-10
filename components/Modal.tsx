'use client';

import { useRef, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import gsap from 'gsap';
import type { ModalState, FeaturedProject } from '@/typings';

const easeBezier: [number, number, number, number] = [0.76, 0, 0.24, 1];
const easeOutBezier: [number, number, number, number] = [0.32, 0, 0.67, 0];

const scaleAnimation: Variants = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: easeBezier },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: easeOutBezier },
  },
};

export default function Modal({
  modal,
  projects,
}: {
  modal: ModalState;
  projects: FeaturedProject[];
}) {
  const { active, index } = modal;

  const modalContainer = useRef<HTMLDivElement | null>(null);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorLabel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;

    const xMoveContainer = gsap.quickTo(modalContainer.current, 'left', { duration: 0.8, ease: 'power3' });
    const yMoveContainer = gsap.quickTo(modalContainer.current, 'top', { duration: 0.8, ease: 'power3' });

    const xMoveCursor = gsap.quickTo(cursor.current, 'left', { duration: 0.5, ease: 'power3' });
    const yMoveCursor = gsap.quickTo(cursor.current, 'top', { duration: 0.5, ease: 'power3' });

    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'left', { duration: 0.45, ease: 'power3' });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, 'top', { duration: 0.45, ease: 'power3' });

    const onMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className="h-[350px] w-[400px] absolute z-40 bg-white overflow-hidden pointer-events-none flex items-center justify-center [will-change:transform]"
      >
        <div
          style={{ top: `${index * -100}%` }}
          className="absolute h-full w-full transition-[top] duration-500 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
        >
          {projects.map((project, i) => (
            <div
              key={`modal_${i}`}
              style={{ backgroundColor: project.color ?? '#ffffff' }}
              className="h-full w-full flex items-center justify-center"
            >
              <Image
                src={project.src}
                alt={`${(project as any).title ?? `${project.title1 ?? ''} ${project.title2 ?? ''}`.trim()}`}
                width={300}
                height={300}
                className="w-[300px] h-auto"
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className="w-20 h-20 rounded-full bg-[#f5c15d] text-white absolute z-50 flex items-center justify-center text-[14px] font-light pointer-events-none [will-change:transform]"
      />
      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? 'enter' : 'closed'}
        className="w-20 h-20 rounded-full bg-transparent text-white absolute z-50 flex items-center justify-center text-[14px] font-light pointer-events-none [will-change:transform]"
      >
        View
      </motion.div>
    </>
  );
}
