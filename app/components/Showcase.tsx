'use client';

import Image from 'next/image';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import ReactLenis from 'lenis/react';
import { useRef } from 'react';

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  href: string;
};

const projects: Project[] = [
  {
    title: 'ScrapSync',
    category: 'Service Design',
    description:
      'ScrapSync reimagines construction waste management using reverse logistics. It enables leftover materials to be collected, sorted, and reused for social initiatives like animal shelters and disaster-relief housing—creating value from what would otherwise be discarded.',
    image: '/project3.png',
    href: '#',
  },
  {
    title: 'FYNDO',
    category: 'Service Design · UX Research · Product Design',
    description:
      'A digital Lost & Found system designed to reduce confusion and stress around misplaced items on campus. FYNDO brings students, faculty, and security onto one platform with clear reporting, ownership verification, and real-time status updates.',
    image: '/xyz.png',
    href: '#',
  },
  {
    title: 'SeeBeyond',
    category: 'Omni-Channel Experience Design · UX Research · Product Strategy',
    description:
      'An end-to-end study-abroad experience that supports students and parents across planning, applications, and post-arrival life. SeeBeyond combines digital tools and physical spaces to reduce misinformation, ease decision-making, and build confidence throughout the journey.',
    image: '/project4.png',
    href: '#',
  },
];

type StickyCardProps = {
  index: number;
  project: Project;
  progress: MotionValue<number>;
};

const StickyCard = ({ index, project, progress }: StickyCardProps) => {
  const targetScale = Math.max(0.5, 1 - (projects.length - index - 1) * 0.1);
  const scale = useTransform(progress, [index * 0.25, 1], [1, targetScale]);
  // Offset starts at 82, reduces to 12, then to 0 when 3rd card appears
  // For 3rd card (index 2), use higher offset of 252
  const baseOffset = useTransform(progress, [0, 0.5, 1], index === 2 ? [852, 152, 0] : [382, 12, 0]);
  const topValue = useTransform(baseOffset, (offset) => `calc(50vh - ${520 / 2}px + ${index * offset}px)`);
  const isFirstCard = index === 0;
  
  // Sequential appearance: each card appears only after previous card reaches final state
  // Card 0: appears at progress 0
  // Card 1: appears at progress 0.25 (when card 0 finishes)
  // Card 2: appears at progress 0.5 (when card 1 finishes)
  const appearThreshold = index * 0.25;
  const opacity = useTransform(progress, [appearThreshold - 0.05, appearThreshold], [0, 1]);

  return (
    <div className="sticky top-0 flex items-center justify-center">
      <motion.div
        style={{
          scale,
          opacity,
          // Center the card vertically; offset each subsequent card slightly lower (animates from 82px to 12px spacing)
          top: topValue,
          zIndex: projects.length - index,
        }}
        className="relative h-[520px] w-full max-w-8xl origin-center overflow-hidden rounded-[6px] border border-white/30 bg-[#0a0a0b] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
      >
        <div className={`grid h-full grid-cols-1 ${index === 1 ? 'md:grid-cols-[1.2fr_1.05fr]' : 'md:grid-cols-[1.05fr_1.2fr]'}`}>
          {index === 1 ? (
            <>
              <div className="relative h-full bg-[#0f1013] md:border-r md:border-white/30">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 868px) 55vw, 100vw"
                  priority={isFirstCard}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
              <div className={`flex h-full flex-col justify-between gap-4 px-10 py-10 text-white md:px-12 bg-gradient-to-br from-[#070b2b]/80 to-black`}>
                <div className="space-y-4">
                  <h3 className="text-2xl  font-semibold tracking-tight md:text-[26px]">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-white/70 md:text-base">
                    {project.category}
                  </p>
                  <p className="max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                    {project.description}
                  </p>
                </div>
                <a
                  href={project.href}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/80"
                >
                  Full Project
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    
                  </span>
                </a>
              </div>
            </>
          ) : (
            <>
              <div className={`flex h-full flex-col justify-between gap-4 px-10 py-10 text-white md:px-12 ${
                index === 0
                  ? 'bg-gradient-to-br from-[#fdd35f]/30 to-black'
                  : index === 2
                  ? 'bg-gradient-to-br from-[#5e2217]/40 to-black'
                  : 'bg-black'
              }`}>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold tracking-tight md:text-[26px]">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-white/70 md:text-base">
                    {project.category}
                  </p>
                  <p className="max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                    {project.description}
                  </p>
                </div>
                <a
                  href={project.href}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/80"
                >
                  Full Project
                  <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    
                  </span>
                </a>
              </div>
              <div className="relative h-full bg-[#0f1013] md:border-l md:border-white/30">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 868px) 55vw, 100vw"
                  priority={isFirstCard}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="bg-black text-white">
      <ReactLenis root>
        <div
          id="projects"
          ref={containerRef}
          className="relative flex w-full flex-col items-center justify-center pb-[45vh] pt-[30vh]"
        >
          <div className="absolute inset-0 flex items-start justify-center pointer-events-none">
            {/* Orange radial glow background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[55vh] w-[70vw] max-w-[1100px] max-h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,153,51,0.45),rgba(255,94,0,0.22),transparent_60%)] blur-3xl" />
            </div>
            {/* Title + underline + subtitle */}
            <div className="relative z-10 mt-[10vh] px-6 text-center">
              <h2 className="text-6xl md:text-8xl lg:text-[6rem] font-serif tracking-tight">Case Studies</h2>
              <div className="mx-auto mt-4 h-[2px] w-[65%] max-w-2xl bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0" />
              <p className="mt-6 text-base md:text-lg text-white/80">
                Deep dives into my design process
              </p>
            </div>
          </div>
          {projects.map((project, index) => (
            <StickyCard
              key={`${project.title}-${index}`}
              index={index}
              project={project}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </ReactLenis>
    </section>
  );
}

/**
 * Skiper 16 StickyCard_001 — React + Framer Motion
 * Inspired rebuild with respect to the original creator.
 * Author: @gurvinder-singh02 — https://gxuri.in
 */

