'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CometCard } from "@/components/ui/comet-card";
import Noise from '@/components/Noise'


export default function Hero() {
  const [text, setText] = useState('RAHUL DHIMAN');
  const finalText = 'RAHUL DHIMAN   ';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText((prevText) =>
        finalText
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration) {
              return finalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image with Noise */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <Noise
          patternSize={150}
          patternScaleX={3}
          patternScaleY={2}
          patternRefreshInterval={2}
          patternAlpha={30}
        />
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 flex justify-between items-center">
        <div className="text-lg sm:text-xl font-bold">RAHUL</div>
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <a href="#projects" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
            Projects
          </a>
          <a href="#resume" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
            Resume
          </a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
            About me
          </a>
          <button className="bg-[#FF6B4A] hover:bg-[#ff5533] px-6 lg:px-8 py-2 lg:py-3 rounded-full transition-colors text-sm lg:text-base">
            CONTACT
          </button>
        </div>
        {/* Mobile menu button */}
        <button className="md:hidden text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
        </button>
      </nav>

      {/* Hero Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16">
        <div className="relative w-full max-w-[1400px]">
          {/* Small intro text */}
          <div className="absolute top-[-10px] sm:top-[-20px] left-0 text-[#FF6B4A] text-xs sm:text-sm lg:text-base font-medium">
            (HELLO! I&apos;M RAHUL)
          </div>

          {/* Main text - background */}
          <div className="relative w-full overflow-hidden">
            <h1 className="text-[11vw] text-nowrap sm:text-[9vw] md:text-[7vw] lg:text-[120px] xl:text-[180px] font-bold leading-none tracking-[-0.02em] text-center mx-auto">
              <span className="text-white">{text}</span>
            </h1>
          </div>

          {/* Floating Card - Lanyard Image */}
          <div className="floating-card-3d absolute top-1 left-1/2 transform -translate-x-1/2 -translate-y-[55%] sm:-translate-y-[58%] md:-translate-y-[60%] z-10">
            <CometCard className="w-[200px] sm:w-[280px] md:w-[350px] lg:w-[450px] xl:w-[550px]">
              <div className="relative w-full h-[300px] sm:h-[420px] md:h-[520px] lg:h-[870px] xl:h-[720px] rounded-2xl overflow-hidden backdrop-blur-sm">
                <Image
                  src="/Group 11.png"
                  alt="Lanyard Card"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </CometCard>
          </div>

          

    


          {/* Passionate text */}
          <div className="absolute bottom-[-30px] sm:bottom-[-40px] right-0 text-[#FF6B4A] text-xs sm:text-sm lg:text-base font-medium text-right">
            I&apos;M DEEPLY PASSIONATE ABOUT DESIGN
          </div>
        </div>
      </div>

      {/* Bottom elements */}
 
      

    </div>
  );
}
