'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const projects = [
  {
    id: 1,
    title: 'Adobe Firefly Contributor Portal',
    category: 'Product Design',
    description: 'The project explores the development process of generative AI and aims to improve the process by making data and feedback collection easier for the developers while engaging users in doing so.',
    image: '/project1.jpg',
  },
  {
    id: 2,
    title: 'Digital Spirometry App',
    category: 'Healthcare UX',
    description: 'A comprehensive mobile application for respiratory health monitoring, featuring real-time spirometry tests, result tracking, and personalized health insights for patients.',
    image: '/project2.jpg',
  },
  {
    id: 3,
    title: 'Projector HMI',
    category: 'Interaction Design',
    description: 'A Human Machine Interaction project aimed at enhancing the projecting experience by creating an intuitive and easy-to-use interface.',
    image: '/project3.jpg',
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw animated gradient orb
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.65;

      // Apply blur effect
      ctx.filter = 'blur(80px)';

      // Create multiple gradient layers for depth
      for (let i = 0; i < 3; i++) {
        const radius = baseRadius + Math.sin(frame * 0.01 + i) * 40;
        const gradient = ctx.createRadialGradient(
          centerX, centerY, radius * 0.1,
          centerX, centerY, radius
        );

        // Orange gradient (#ff6445 and lighter variations)
        gradient.addColorStop(0, `rgba(255, 150, 120, ${0.9 - i * 0.2})`);
        gradient.addColorStop(0.3, `rgba(255, 100, 69, ${0.7 - i * 0.15})`);
        gradient.addColorStop(0.6, `rgba(200, 70, 50, ${0.4 - i * 0.1})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Reset filter
      ctx.filter = 'none';

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on how much of the section has been scrolled
      const scrolled = windowHeight - rect.top;
      const totalScrollable = sectionHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate animations based on scroll progress
  const titleScale = Math.max(0.5, 1 - scrollProgress * 1.5);
  const titleOpacity = Math.max(0, 1 - scrollProgress * 2.5);
  const titleY = scrollProgress * -150;
  const showCards = scrollProgress > 0.1;
  const cardsOpacity = Math.min(1, (scrollProgress - 0.1) * 3);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
      style={{ minHeight: `${100 + projects.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated gradient background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: Math.max(0.3, 0.8 - scrollProgress),
          }}
        />

        {/* Showcase Title - Zooms out and fades */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{
            transform: `scale(${titleScale}) translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <div className="text-center px-8">
            <h2 className="text-6xl lg:text-8xl xl:text-[10rem] font-serif mb-6 tracking-tight text-white">
              Showcase
            </h2>
            <p className="text-lg lg:text-xl text-gray-400 font-light">
              Scroll through a curation of my best works
            </p>
          </div>
        </div>

        {/* Project Cards Container */}
        {showCards && (
          <div 
            className="absolute inset-0 flex items-center justify-center px-4 lg:px-8"
            style={{ opacity: cardsOpacity }}
          >
            <div className="relative w-full max-w-5xl">
              {projects.map((project, index) => {
                // Calculate individual card animations
                const cardStartProgress = 0.15 + index * 0.25;
                const cardProgress = Math.max(0, Math.min(1, (scrollProgress - cardStartProgress) * 4));
                const nextCardProgress = Math.max(0, Math.min(1, (scrollProgress - cardStartProgress - 0.25) * 4));
                
                // Card transforms
                const cardY = (1 - cardProgress) * 100 + nextCardProgress * -50;
                const cardScale = 1 - nextCardProgress * 0.05;
                const cardOpacity = cardProgress - nextCardProgress * 0.3;
                const cardZ = index * 10;
                
                if (cardProgress <= 0) return null;

                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 transition-transform duration-100"
                    style={{
                      transform: `translateY(${cardY}px) scale(${cardScale})`,
                      opacity: Math.max(0, cardOpacity),
                      zIndex: cardZ,
                    }}
                  >
                    <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                      {/* Project Preview Image */}
                      <div className="relative w-full h-[300px] lg:h-[400px] bg-gray-900 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-full h-full">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                // Fallback placeholder
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                            {/* Fallback gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-gray-900 flex items-center justify-center">
                              <span className="text-gray-500 text-lg">Project Preview</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Side decorative bars */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/80 to-transparent"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/80 to-transparent"></div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6 lg:p-8 bg-[#0a0a0a]">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                              {project.title}
                            </h3>
                            <p className="text-gray-500 text-sm uppercase tracking-wider mb-4">
                              {project.category}
                            </p>
                            <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-2xl">
                              {project.description}
                            </p>
                          </div>
                          <a 
                            href="#" 
                            className="flex items-center gap-2 text-white hover:text-[#FF6B4A] transition-colors ml-8 shrink-0"
                          >
                            <span className="text-sm font-medium">Full Project</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M7 17L17 7M17 7H7M17 7V17"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Scroll indicator - only show when title is visible */}
        {titleOpacity > 0.5 && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-50">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}

