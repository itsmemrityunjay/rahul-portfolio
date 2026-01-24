'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from './ScrollReveal';



export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative pt-30 bg-black text-white flex items-center justify-center px-8 lg:px-16 "
    >
      <div className="w-full">
        {/* Hello! Heading */}
        <div className={`flex items-center justify-center gap-8 mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex-1 h-[1px] bg-gray-700"></div>
          <h2 className="text-4xl lg:text-5xl font-serif italic text-gray-300">About me!</h2>
          <div className="flex-1 h-[1px] bg-gray-700"></div>
        </div>

        {/* Main Content with Floating Badges */}
        <div className="relative">
          {/* Floating skill badges - Left side */}
          <div className={`floating-badge absolute top-[60px] left-[0%] lg:left-[1%] transition-all duration-[1500ms] ease-out delay-100 ${isVisible ? 'opacity-100 translate-x-0 rotate-[3deg]' : 'opacity-0 -translate-x-[120vw]'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6445] rounded-full translate-x-1 translate-y-1"></div>
              <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
                <div className="w-7 h-7 bg-[#FF6B4A] rounded-lg flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="5" height="5" fill="white" rx="1"/>
                    <rect x="9" y="2" width="5" height="5" fill="white" rx="1"/>
                    <rect x="2" y="9" width="5" height="5" fill="white" rx="1"/>
                    <rect x="9" y="9" width="5" height="5" fill="white" rx="1"/>
                  </svg>
                </div>
                <span className="text-black font-medium">Design systems</span>
              </div>
            </div>
          </div>

          <div className={`floating-badge absolute top-[155px] left-[0%] lg:left-[1%] transition-all duration-[1500ms] ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[120vw]'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6445] rounded-full translate-x-1 translate-y-1"></div>
              <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
                <div className="w-7 h-7 bg-gray-800 rounded-lg flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <rect x="3" y="3" width="10" height="10" stroke="white" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <span className="text-black font-medium">UI/UX</span>
              </div>
            </div>
          </div>

          <div className={`floating-badge absolute top-[260px] rotate-[-3deg] left-[0%] lg:left-[1%] transition-all duration-[1500ms] ease-out delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[120vw]'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6445] rounded-full translate-x-1 translate-y-1"></div>
              <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
                <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" fill="none"/>
                    <line x1="11" y1="11" x2="14" y2="14" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <span className="text-black font-medium">Research</span>
              </div>
            </div>
          </div>

          {/* Floating skill badges - Right side */}
          <div className={`floating-badge absolute top-[60px] right-[0%] lg:right-[1%] rotate-[-3deg] transition-all duration-[1500ms] ease-out delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[120vw]'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6445] rounded-full translate-x-1 translate-y-1"></div>
              <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
                <div className="w-7 h-7 bg-green-400 rounded-lg flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3L10 7L14 8L10 9L8 13L6 9L2 8L6 7L8 3Z" fill="white"/>
                  </svg>
                </div>
                <span className="text-black font-medium">Animation</span>
              </div>
            </div>
          </div>

          <div className={`floating-badge absolute top-[155px] right-[0%] lg:right-[1%] transition-all duration-[1500ms] ease-out delay-[900ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[120vw]'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6445] rounded-full translate-x-1 translate-y-1"></div>
              <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
                <div className="w-7 h-7 bg-pink-500 rounded-lg flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="3" fill="white"/>
                    <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="2 2"/>
                  </svg>
                </div>
                <span className="text-black font-medium">Prototyping</span>
              </div>
            </div>
          </div>

          <div className={`floating-badge absolute top-[260px] rotate-[3deg] right-[0%] lg:right-[1%] transition-all duration-[1500ms] ease-out delay-[1100ms] ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[120vw]'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ff6445] rounded-full translate-x-1 translate-y-1"></div>
              <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-lg">
                <div className="w-7 h-7 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L6 6L2 8L6 10L8 14L10 10L14 8L10 6L8 2Z" fill="white"/>
                    <circle cx="8" cy="8" r="2" fill="white"/>
                  </svg>
                </div>
                <span className="text-black font-medium">Strategy</span>
              </div>
            </div>
          </div>

          {/* Main Text */}
          <div className={`text-center px-2 py-8 transition-all duration-1000 delay-700 max-w-4xl mx-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <ScrollReveal
  baseOpacity={0.3}
  enableBlur
  baseRotation={0}
  blurStrength={4}
>
            I’m a UI/UX Designer  who loves creating clean and meaningful digital experiences. I enjoy breaking down messy problems, understanding user needs, and designing solutions that actually make sense. I care about both how a product looks and how it works, and I’m always curious to learn and improve.


            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
