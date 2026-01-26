'use client';

import Image from 'next/image';
import React from 'react';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const projects = [
  {
    id: 1,
    title: 'Adobe Firefly Contributor Portal',
    category: 'Product Design',
    image: '/project1.png',
    description:
      'The project explores the development process of generative AI and aims to improve the process by making data and feedback collection easier for the developers while engaging users in doing so.',
  },
  {
    id: 2,
    title: 'Digital Spirometry App',
    category: 'Healthcare UX',
    image: '/xyz.png',
    description:
      'A comprehensive mobile application for respiratory health monitoring, featuring real-time spirometry tests, result tracking, and personalized health insights for patients.',
  },
  {
    id: 3,
    title: 'Projector HMI',
    category: 'Interaction Design',
    image: '/project1.png',
    description:
      'A Human Machine Interaction project aimed at enhancing the projecting experience by creating an intuitive and easy-to-use interface.',
  },
];

export default function StackCard() {
  return (
    <ScrollStack className="h-screen">
      {projects.map((project, index) => (
        <ScrollStackItem
          key={project.id}
          itemClassName="!p-0 !h-auto !my-10 !bg-transparent !shadow-none !rounded-none"
        >
          <div className="relative mx-auto w-full max-w-6xl aspect-[16/7] h-auto">
            <div className="pointer-events-none absolute inset-[-28px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),rgba(255,255,255,0.06),transparent_60%)] blur-2xl opacity-90" />
            <div className="bg-black overflow-hidden h-full shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-gradient-to-br to-[#FF8C5A] via-[#FF6B4A] from-[#FF5533]">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/90 text-xs uppercase tracking-wider mb-6">{project.category}</p>
                  <p className="text-white/95 max-w-[500px] text-sm lg:text-base leading-relaxed mb-8">
                    {project.description}
                  </p>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors w-fit group"
                  >
                    <span className="text-sm font-medium">Full Project</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>

                <div className="relative h-full bg-[#111] overflow-hidden">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="w-full h-full rounded-lg overflow-hidden bg-[#1a1a1a] border border-gray-800/30 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}