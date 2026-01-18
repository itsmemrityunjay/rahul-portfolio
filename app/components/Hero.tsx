'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function Hero() {
  const [text, setText] = useState('RAHUL DHIMAN');
  const finalText = 'RAHUL DHIMAN';
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
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 lg:px-16 py-6 flex justify-between items-center">
        <div className="text-xl font-bold">RAHUL</div>
        <div className="flex items-center gap-8">
          <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
            Projects
          </a>
          <a href="#resume" className="text-gray-300 hover:text-white transition-colors">
            Resume
          </a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">
            About me
          </a>
          <button className="bg-[#FF6B4A] hover:bg-[#ff5533] px-8 py-3 rounded-full transition-colors">
            CONTACT
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex items-center justify-center min-h-screen px-8 lg:px-16">
        <div className="relative w-full max-w-[1400px]">
          {/* Small intro text */}
          <div className="absolute top-[-120px] left-0 text-[#FF6B4A] text-sm lg:text-base font-medium">
            (HELLO! I&apos;M RAHUL)
          </div>

          {/* Main text - background */}
          <div className="relative">
            <h1 className="text-[10vw] lg:text-[180px] font-bold leading-none tracking-tight text-center whitespace-nowrap">
              <span className="text-white">{text}</span>
            </h1>
          </div>

          {/* Floating Card - Absolute positioned 3D card with Lanyard */}
          <div className="floating-card-3d absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            {/* Lanyard String */}
            <div className="lanyard-string"></div>
            
            <div className="card-inner-3d perspective-container">
              <div className="card-content relative w-[280px] lg:w-[340px] h-[400px] lg:h-[480px] bg-[#FF6B4A] rounded-3xl overflow-hidden shadow-2xl">
                {/* Card tab/hole punch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-[#1a1a1a] rounded-b-2xl flex items-center justify-center z-20">
                  <span className="text-white text-xs font-medium">(PORTFOLIO)</span>
                  {/* Hole for lanyard */}
                  <div className="absolute top-2 w-3 h-3 bg-[#FF6B4A] rounded-full"></div>
                </div>
                
                {/* Profile Image */}
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8 pt-12">
                  <div className="w-full flex-1 flex items-center justify-center">
                    <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden grayscale">
                      <Image
                        src="/profile.jpg"
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Card text */}
                  <div className="text-white text-center space-y-2 mt-6">
                    <p className="text-xs font-medium uppercase">UI/UX</p>
                    <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                      PRODUCT<br/>DESIGNER
                    </h2>
                    <p className="text-[10px] uppercase tracking-wide opacity-80 mt-4">
                      @RAHULDHIMAN | RUP_DESIGNER | AYITRI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Passionate text */}
          <div className="absolute bottom-[-100px] right-0 text-[#FF6B4A] text-sm lg:text-base font-medium">
            I&apos;M DEEPLY PASSIONATE ABOUT DESIGN
          </div>
        </div>
      </div>

      {/* Bottom elements */}
      <div className="fixed bottom-8 left-8 lg:left-16 z-50">
        <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center text-white text-lg">
          01
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 lg:right-16 z-50 text-right">
        <p className="text-gray-500 text-sm">Leveled up at:</p>
        <p className="text-white font-bold text-lg">10KDESIGNERS</p>
      </div>
    </div>
  );
}
