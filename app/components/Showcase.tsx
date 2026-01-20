'use client';

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
  const progressPerCard = 1 / (totalCards + 1); // Cards appear much sooner

  // Showcase title and gradient: grow from bottom to center, then shrink
  // Use separate timing for showcase text (not tied to progressPerCard)
  const showcaseProgress = Math.min(1, scrollProgress / 0.3); // Independent showcase timing - more scroll to reach center
  
  // Entry phase: scale up from 0.3 to 1 as it enters from bottom and reaches center
  // Stay at center, then shrink as cards appear
  let titleScale, titleOpacity, gradientScale, gradientOpacity;
  
  if (showcaseProgress < 0.55) {
    // Growing phase: 0 to 0.55 progress - text grows until reaching center
    const growProgress = showcaseProgress / 0.55;
    titleScale = 0.3 + (growProgress * 0.7); // Scale from 0.3 to 1
    titleOpacity = Math.min(1, growProgress * 1.3); // Fade in smoothly
    gradientScale = 0.3 + (growProgress * 0.7); // Scale from 0.3 to 1
    gradientOpacity = Math.min(0.9, growProgress * 1.3); // Fade in smoothly
  } else if (showcaseProgress < 0.65) {
    // At center phase: 0.55 to 0.65 - stay at full size at center
    titleScale = 1;
    titleOpacity = 1;
    gradientScale = 1;
    gradientOpacity = 0.9;
  } else {
    // Shrinking phase: 0.65 to 1 progress - shrink after staying at center
    const shrinkProgress = (showcaseProgress - 0.65) / 0.35;
    titleScale = Math.max(0.2, 1 - shrinkProgress * 0.8);
    titleOpacity = Math.max(0, 1 - shrinkProgress * 1.3);
    gradientScale = Math.max(0, 1 - shrinkProgress * 1);
    gradientOpacity = Math.max(0, 0.9 - shrinkProgress * 0.9);
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
            transform: `scale(${gradientScale})`,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
          }}
        />

        {/* Showcase Title - shrinks gradually */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
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

        {/* Project Cards */}
        {projects.map((project, index) => {
          // Cards appear without delay
          const cardStartProgress = progressPerCard * (index + 1);
          const cardEndProgress = progressPerCard * (index + 2);
          
          const cardLocalProgress = (scrollProgress - cardStartProgress) / (cardEndProgress - cardStartProgress);
          
          // Calculate card position and opacity
          let cardY = 100; // Start from bottom (100vh)
          let cardOpacity = 0;
          let cardScale = 0.95;
          
          if (cardLocalProgress < 0) {
            // Card hasn't entered yet - keep it below
            cardY = 100;
            cardOpacity = 0;
            cardScale = 0.95;
          } else if (cardLocalProgress <= 0.4) {
            // Card is entering from bottom (0 to 0.4 progress)
            const entryProgress = cardLocalProgress / 0.4;
            cardY = 100 * (1 - entryProgress);
            cardOpacity = entryProgress;
            cardScale = 0.95 + (entryProgress * 0.05); // Scale from 0.95 to 1
          } else {
            // Card reached center and stays there - no more movement
            cardY = 0;
            cardScale = 1;
            
            // Check if next card is coming - if so, fade out current card while it stays in place
            const nextCardStartProgress = progressPerCard * (index + 2);
            const nextCardLocalProgress = (scrollProgress - nextCardStartProgress) / (cardEndProgress - cardStartProgress);
            
            if (nextCardLocalProgress > 0 && nextCardLocalProgress <= 0.4) {
              // Next card is entering (first 40% of its journey), fade out current card
              const fadeProgress = nextCardLocalProgress / 0.4;
              cardOpacity = 1 - fadeProgress;
            } else if (nextCardLocalProgress > 0.4) {
              // Next card has fully appeared, this card is gone
              cardOpacity = 0;
            } else {
              // No next card yet, stay fully visible
              cardOpacity = 1;
            }
          }
          
          // Internal reveal for text and image
          const revealProgress = Math.max(0, Math.min(1, (cardLocalProgress - 0.2) / 0.2));
          const textY = 16 * (1 - revealProgress);
          const textOpacity = revealProgress;
          const imageY = 24 * (1 - Math.max(0, Math.min(1, (cardLocalProgress - 0.25) / 0.2)));
          const imageOpacity = Math.max(0, Math.min(1, (cardLocalProgress - 0.25) / 0.2));
          
          // Only render if card has some visibility
          if (cardLocalProgress < -0.1 || cardOpacity <= 0) return null;
          
          return (
            <div 
              key={project.id}
              className="absolute inset-0 flex items-center justify-center px-6 lg:px-12"
              style={{
                opacity: cardOpacity,
                transform: `translateY(${cardY}%) scale(${cardScale})`,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                zIndex: 20 + index,
              }}
            >
              <div className="w-full max-w-7xl h-[80vh]">
                <div className="bg-black border border-gray-800/50 rounded-xl overflow-hidden h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                    {/* Left - Text */}
                    <div 
                      className="p-8 lg:p-12 flex flex-col justify-center"
                      style={{
                        opacity: textOpacity,
                        transform: `translateY(${textY}px)`,
                        transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
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
                      className="relative h-full bg-[#111]"
                      style={{
                        opacity: imageOpacity,
                        transform: `translateY(${imageY}px)`,
                        transition: 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="w-full h-full rounded-lg overflow-hidden bg-[#1a1a1a] border border-gray-800/30 flex items-center justify-center">
                          <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
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

