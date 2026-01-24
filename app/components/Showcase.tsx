'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Adobe Firefly Contributor Portal',
    category: 'Product Design',
    description: 'The project explores the development process of generative AI and aims to improve the process by making data and feedback collection easier for the developers while engaging users in doing so.',
  },
  {
    id: 2,
    title: 'Digital Spirometry App',
    category: 'Healthcare UX',
    description: 'A comprehensive mobile application for respiratory health monitoring, featuring real-time spirometry tests, result tracking, and personalized health insights for patients.',
  },
  {
    id: 3,
    title: 'Projector HMI',
    category: 'Interaction Design',
    description: 'A Human Machine Interaction project aimed at enhancing the projecting experience by creating an intuitive and easy-to-use interface.',
  },
];

export default function Showcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Animated gradient canvas
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

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radiusX = Math.min(canvas.width, canvas.height) * 0.8;
      const radiusY = Math.min(canvas.width, canvas.height) * 0.35;

      ctx.filter = 'blur(80px)';

      for (let i = 0; i < 3; i++) {
        const animOffset = Math.sin(frame * 0.01 + i) * 20;
        const currentRadiusX = radiusX + animOffset;
        const currentRadiusY = radiusY + animOffset;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.scale(currentRadiusX / currentRadiusY, 1);
        
        const gradient = ctx.createRadialGradient(
          0, 0, currentRadiusY * 0.1,
          0, 0, currentRadiusY
        );

        // Orange gradient
        gradient.addColorStop(0, `rgba(255, 150, 120, ${0.9 - i * 0.2})`);
        gradient.addColorStop(0.3, `rgba(255, 100, 69, ${0.7 - i * 0.15})`);
        gradient.addColorStop(0.6, `rgba(200, 70, 50, ${0.4 - i * 0.1})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
        ctx.restore();
      }

      ctx.filter = 'none';
      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Track viewport width for width animation calculations
  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      const scrolled = windowHeight - rect.top;
      const totalScrollable = sectionHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCards = projects.length;
  const progressPerCard = 1 / (totalCards + 1);

  // Smooth continuous title and gradient animations - slower
  const showcaseProgress = Math.min(1, scrollProgress / 0.45);
  
  // Smooth easing function for natural motion
  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  let titleScale, titleOpacity, gradientScale, gradientOpacity;
  
  if (showcaseProgress < 0.5) {
    // Smooth grow phase with easing
    const t = showcaseProgress / 0.5;
    const easedProgress = easeInOutCubic(t);
    titleScale = 0.3 + (easedProgress * 0.7);
    titleOpacity = Math.min(1, easedProgress * 1.2);
    gradientScale = 0.3 + (easedProgress * 0.7);
    gradientOpacity = Math.min(0.9, easedProgress * 1.2);
  } else if (showcaseProgress < 0.6) {
    // Stay at center - smooth hold
    const holdProgress = (showcaseProgress - 0.5) / 0.1;
    titleScale = 1 - (holdProgress * 0.02); // Subtle breathing
    titleOpacity = 1;
    gradientScale = 1;
    gradientOpacity = 0.9;
  } else {
    // Smooth shrink phase with easing
    const t = (showcaseProgress - 0.6) / 0.4;
    const easedProgress = easeInOutCubic(t);
    titleScale = Math.max(0.2, 0.98 - easedProgress * 0.78);
    titleOpacity = Math.max(0, 1 - easedProgress * 1.2);
    gradientScale = Math.max(0, 1 - easedProgress);
    gradientOpacity = Math.max(0, 0.9 - easedProgress * 0.9);
  }

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ minHeight: `${(totalCards + 2) * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        
        {/* Animated gradient background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: gradientOpacity,
            transform: `scale(${gradientScale}) translateZ(0)`,
            transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity',
          }}
        />

        {/* Soft spotlight behind Showcase title */}
        <div className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center">
          <div className="h-[45vh] w-[45vw] max-w-4xl max-h-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),rgba(255,255,255,0.015),transparent_55%)] blur-3xl" />
        </div>

        {/* Showcase Title - shrinks gradually */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale}) translateZ(0)`,
            transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform, opacity',
          }}
        >
          <div className="text-center px-8">
            <h2 className="text-6xl lg:text-8xl xl:text-[10rem] font-serif mb-6 tracking-tight text-white">
              Projects!
            </h2>
            <p className="text-lg lg:text-xl font-light">
              Scroll through a curation of my best works
            </p>
          </div>
        </div>

        {/* Project Cards */}
        {projects.map((project, index) => {
          // Cards appear without delay
          const cardStartProgress = progressPerCard * (index + 1);
          const cardEndProgress = progressPerCard * (index + 2);
          
          const cardLocalProgress = (scrollProgress - cardStartProgress) / (cardEndProgress - cardStartProgress);
          
          // Smooth easing function
          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
          const easeInQuart = (t: number) => t * t * t * t;
          
          // Calculate card position and opacity with smooth easing
          let cardY = 100;
          let cardOpacity = 0;
          let cardScale = 0.9;
          
          if (cardLocalProgress < 0) {
            cardY = 100;
            cardOpacity = 0;
            cardScale = 0.9;
          } else if (cardLocalProgress <= 0.65) {
            // Smooth entry with easeOutQuart - slower
            const t = cardLocalProgress / 0.65;
            const easedProgress = easeOutQuart(t);
            cardY = 100 * (1 - easedProgress);
            cardOpacity = Math.min(1, easedProgress * 1.3);
            cardScale = 0.9 + (easedProgress * 0.1);
          } else {
            // Card at center
            cardY = 0;
            cardScale = 1;
            
            // Smooth fade out when next card approaches
            const nextCardStartProgress = progressPerCard * (index + 2);
            const nextCardLocalProgress = (scrollProgress - nextCardStartProgress) / (cardEndProgress - cardStartProgress);
            
            if (nextCardLocalProgress > 0 && nextCardLocalProgress <= 0.7) {
              const t = nextCardLocalProgress / 0.7;
              const easedFade = easeInQuart(t);
              cardOpacity = 1 - easedFade;
            } else if (nextCardLocalProgress > 0.7) {
              cardOpacity = 0;
            } else {
              cardOpacity = 1;
            }
          }
          
          // Force scale to 1 during width shrink window so width change stays visible
          const shrinkStart = 0.3;
          const shrinkEnd = 0.7;
          if (cardLocalProgress >= shrinkStart && cardLocalProgress <= shrinkEnd) {
            cardScale = 1;
          }

          // Smooth internal content reveals with easing - slower
          const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
          const textRevealProgress = Math.max(0, Math.min(1, (cardLocalProgress - 0.35) / 0.45));
          const imageRevealProgress = Math.max(0, Math.min(1, (cardLocalProgress - 0.4) / 0.45));
          
          const textY = 20 * (1 - easeOutCubic(textRevealProgress));
          const textOpacity = easeOutCubic(textRevealProgress);
          const imageY = 30 * (1 - easeOutCubic(imageRevealProgress));
          const imageOpacity = easeOutCubic(imageRevealProgress);
          
          // Only render if card has some visibility
          if (cardLocalProgress < -0.1 || cardOpacity <= 0) return null;

            // PHASE-BASED WIDTH ANIMATION (with earlier, slower shrink)
            const finalWidthPercent = 85; // Target final width: 85%
            let cardWidthPercent = 100;
            let cardMaxWidth = 'none';

            if (cardLocalProgress <= shrinkStart) {
              // PHASE 1 — Entry: maintain full width, NO max-width constraint
              cardWidthPercent = 100;
              cardMaxWidth = `${viewportWidth || 9999}px`;
            } else if (cardLocalProgress <= shrinkEnd) {
              // PHASE 2 — Shrink: animate width from 100% → 85% with gentler easing
              const t = (cardLocalProgress - shrinkStart) / (shrinkEnd - shrinkStart);
              const eased = easeInOutCubic(t);
              cardWidthPercent = 100 - (100 - finalWidthPercent) * eased;

              const maxStart = viewportWidth ? viewportWidth * 1.1 : 2000; // start high to avoid clamp
              const maxEnd = 1280;
              const maxLerp = maxStart + (maxEnd - maxStart) * eased;
              cardMaxWidth = `${maxLerp}px`;
            } else {
              // PHASE 3 & 4 — Hold and exit: maintain final width and max width
              cardWidthPercent = finalWidthPercent;
              cardMaxWidth = '1280px';
            }
          
          return (
            <div 
              key={project.id}
                className="absolute inset-0 overflow-hidden"
              style={{
                opacity: cardOpacity,
                transform: `translate3d(0, ${cardY}%, 0) scale(${cardScale})`,
                transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: 20 + index,
                willChange: 'transform, opacity',
              }}
            >
              <div
                  className="relative h-[80vh] mx-auto"
                style={{
                    width: `${cardWidthPercent}%`,
                    maxWidth: cardMaxWidth,
                    transition: 'width 1.6s cubic-bezier(0.16, 1, 0.3, 1), max-width 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    willChange: 'width, max-width',
                }}
              >
                <div className="pointer-events-none absolute inset-[-28px] rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),rgba(255,255,255,0.06),transparent_60%)] blur-2xl opacity-90" />
                <div className="bg-black border border-white/40 rounded-xl overflow-hidden h-full shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                    {/* Left - Text */}
                    <div 
                      className="p-8 lg:p-12 flex flex-col justify-center"
                      style={{
                        opacity: textOpacity,
                        transform: `translateY(${textY}px) translateZ(0)`,
                        transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        willChange: 'transform, opacity',
                      }}
                    >
                      <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm uppercase tracking-wider mb-6">
                        {project.category}
                      </p>
                      <p className="text-gray-400 text-base lg:text-lg leading-relaxed mb-8">
                        {project.description}
                      </p>
                      <a 
                        href="#" 
                        className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors w-fit group"
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
                          <path d="M7 17L17 7M17 7H7M17 7V17"/>
                        </svg>
                      </a>
                    </div>

                    {/* Right - Image */}
                    <div 
                      className="relative h-full bg-[#111] overflow-hidden"
                      style={{
                        opacity: imageOpacity,
                        transform: `translateY(${imageY}px)`,
                        transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {project.id === 1 ? (
                        <>
                          <Image
                            src="/project1.png"
                            alt="Adobe Firefly Contributor Portal preview"
                            fill
                            className="object-cover border"
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <div className="w-full h-full rounded-lg overflow-hidden bg-[#1a1a1a] border border-gray-800/30 flex items-center justify-center">
                            <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

