'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CometCard } from "@/components/ui/comet-card";
import Noise from '@/components/Noise'


export default function Hero() {
  const [text, setText] = useState('RAHUL DHIMAN');
  const [isInAboutSection, setIsInAboutSection] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector('section[class*="About"]') || 
                          document.querySelector('[id="about"]') ||
                          document.querySelector('section:has(h2:contains("About"))');
      
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        // Check if about section is in viewport (top of section is above middle of screen)
        setIsInAboutSection(rect.top < window.innerHeight / 2 && rect.bottom > 0);
      }

      // Track active tab based on scroll position
      const sections = [
        { id: 'about', label: 'about' },
        { id: 'projects', label: 'projects' },
        { id: 'resume', label: 'resume' },
        { id: 'contact', label: 'contact' },
      ];

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
            setActiveTab(section.label);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-grey/70 to-transparent z-10" />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-4 sm:px-8 lg:px-16 py-4 sm:py-6 flex justify-between items-center transition-all duration-300 ${isInAboutSection ? 'bg-black' : 'bg-transparent'}`}>
        <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center nav-logo-float cursor-pointer hover:opacity-80 transition-opacity">
          <Image
            src="/rahul1.png"
            alt="Rahul logo"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-contain"
            priority
          />
        </button>
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <a href="#about" onClick={() => setActiveTab('about')} className={`transition-colors text-sm lg:text-base uppercase ${activeTab === 'about' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}>
            About me
          </a>
          <a href="#projects" onClick={() => setActiveTab('projects')} className={`transition-colors text-sm lg:text-base uppercase ${activeTab === 'projects' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Projects
          </a>
          <a href="#resume" onClick={(e) => { e.preventDefault(); setActiveTab('resume'); setIsResumeModalOpen(true); }} className={`transition-colors text-sm lg:text-base uppercase ${activeTab === 'resume' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Resume
          </a>
          <a href="#contact" onClick={() => setActiveTab('contact')} className={`transition-colors text-sm lg:text-base uppercase ${activeTab === 'contact' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}>
            Contact
          </a>
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
          <div className="absolute top-[-10px] sm:top-[-20px] left-5 text-[#FF6B4A] text-xs sm:text-sm lg:text-base font-medium">
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
          <div className="absolute bottom-[-30px] sm:bottom-[-40px] uppercase right-5 text-[#FF6B4A] text-xs sm:text-sm lg:text-base font-medium text-right">
            (Design, for me, is about clarity and impact)
          </div>
        </div>
      </div>

      {/* Bottom elements */}
 
      </div>

      {/* Resume Modal */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black border border-white/20 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-black border-b border-white/20 p-4 flex justify-between items-center">
              <h3 className="text-white text-lg font-semibold">Resume</h3>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div className="w-full h-[calc(90vh-70px)]">
              <iframe
                src="/resume.pdf"
                className="w-full h-full"
                title="Resume"
              />
            </div>
          </div>
        </div>
      )}
      

      <style jsx>{`
        .nav-logo-float {
          animation: navFloat 2s ease-in-out infinite;
        }

        @keyframes navFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
