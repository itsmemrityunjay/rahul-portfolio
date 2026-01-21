'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const workItems = [
  {
    id: 1,
    title: 'COLOR MATERIAL FINISH',
    image: '/work1.jpg',
    alt: 'VR Headsets showcasing color, material, and finish variations'
  },
  {
    id: 2,
    title: 'Minimalism',
    image: '/work2.jpg',
    alt: 'Minimalism design with color palette'
  },
  {
    id: 3,
    title: 'Unacademy',
    image: '/work3.jpg',
    alt: 'Unacademy brand design'
  },
  {
    id: 4,
    title: 'Everest Masala',
    image: '/work4.jpg',
    alt: 'Everest Masala product packaging'
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Animation phases:
  // Phase 1 (0-0.3): Cards come from bottom to center in grid formation
  // Phase 2 (0.3-0.6): Cards split left and right (horizontal only)
  // Phase 3 (0.6-1.0): Center text appears

  const getCardTransform = (index: number) => {
    // Cards arrangement: 0=top-left, 1=top-right, 2=bottom-left, 3=bottom-right
    const isLeft = index % 2 === 0;
    const isTop = index < 2;
    
    // Grid spacing in viewport units
    const gridSpacingX = 17; // Horizontal spacing between cards
    const gridSpacingY = 22; // Vertical spacing between cards
    
    // Initial grid positions (2x2 grid)
    const initialGridX = isLeft ? -gridSpacingX : gridSpacingX;
    const initialGridY = isTop ? -gridSpacingY : gridSpacingY;
    
    // Phase 1: Coming from bottom (0-0.3) - maintaining grid formation
    if (scrollProgress < 0.3) {
      const phase1Progress = scrollProgress / 0.3;
      const startY = 120; // Start below viewport
      const endY = initialGridY; // End at grid position
      const currentY = startY + ((endY - startY) * phase1Progress);
      
      return {
        x: initialGridX,
        y: currentY,
        scale: 0.85 + (phase1Progress * 0.15), // Scale from 0.85 to 1
        opacity: phase1Progress,
      };
    }
    
    // Phase 2: Split horizontally (0.3-0.6) - NO vertical movement
    if (scrollProgress < 0.6) {
      const phase2Progress = (scrollProgress - 0.3) / 0.3;
      
      // Move horizontally only: left cards go more left, right cards go more right
      const targetX = isLeft ? -35 : 35; // Move further to sides (half off-screen)
      
      const currentX = initialGridX + ((targetX - initialGridX) * phase2Progress);
      const currentY = initialGridY; // Stay at same vertical position
      const currentScale = 1 - (phase2Progress * 0.15); // Minimal shrink: 1 to 0.85
      
      return {
        x: currentX,
        y: currentY,
        scale: currentScale,
        opacity: 1, // Stay fully visible
      };
    }
    
    // Phase 3: Settled position (0.6-1.0) - cards half off-screen
    const finalX = isLeft ? -35 : 35; // Half of cards outside viewport
    
    return {
      x: finalX,
      y: initialGridY, // No vertical movement
      scale: 0.85, // Minimal size reduction
      opacity: 0.8, // Stay visible, slight fade for text contrast
    };
  };

  // Center text animation (appears earlier in phase 2)
  const getCenterTextOpacity = () => {
    if (scrollProgress < 0.4) return 0;
    const textProgress = (scrollProgress - 0.4) / 0.3;
    return Math.min(1, textProgress);
  };

  const getCenterTextScale = () => {
    if (scrollProgress < 0.4) return 0.8;
    const textProgress = (scrollProgress - 0.4) / 0.3;
    return 0.8 + (Math.min(1, textProgress) * 0.2);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white"
      style={{ minHeight: '300vh' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-gray-900 via-black to-black opacity-50" />
        
        {/* Work Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {workItems.map((item, index) => {
            const transform = getCardTransform(index);
            
            return (
              <div
                key={item.id}
                className="absolute w-[38vw] max-w-[480px] h-[42vh] max-h-[280px]"
                style={{
                  transform: `translate(${transform.x}vw, ${transform.y}vh) scale(${transform.scale})`,
                  opacity: transform.opacity,
                  transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out',
                  willChange: 'transform, opacity',
                }}
              >
                <div className="relative w-full h-full overflow-hidden bg-white shadow-2xl">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="40vw"
                    priority
                  />
                  {/* Overlay for better text contrast if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Text - "There's More" */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{
            opacity: getCenterTextOpacity(),
            transform: `scale(${getCenterTextScale()})`,
            transition: 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          <h2 className="text-7xl md:text-8xl lg:text-9xl font-serif mb-6 text-white text-center leading-tight">
            There&apos;s<br />More
          </h2>
          <a 
            href="#archive" 
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors pointer-events-auto group mt-4"
          >
            <span className="text-lg">Check out the Archive</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
