'use client';

import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs } from 'react-icons/si';

const techLogos = [
  { src: "/figma.png", alt: "Figma", title: "Figma", href: "https://www.figma.com" },
  { src: "/illustrator.png", alt: "Illustrator", title: "Illustrator", href: "https://www.adobe.com/products/illustrator.html" },
  { src: "/photoshop.png", alt: "Photoshop", title: "Photoshop", href: "https://www.adobe.com/products/photoshop.html" },
];

export default function TechStack() {
  const renderLogoWithText = (item: any) => {
    const isImage = 'src' in item;
    
    return (
      <div className="flex relative z-100 flex-row items-center gap-6  transition-transform ">
        <div className="text-5xl text-white hover:text-orange-500 transition-colors ">
          {isImage ? (
            <img 
              src={item.src} 
              alt={item.alt} 
              className="w-15 h-15 object-contain"
            />
          ) : (
            item.node
          )}
        </div>
        <span className="text-xl tracking-wider  capitalize text-center whitespace-nowrap">
          {item.title}
        </span>
      </div>
    );
  };

  return (
    <section className=" bg-black/95 border-t border-b  border-[#95959544]  py-3 text-white ">
      <div className="">
       
        
        <div style={{ height: '60px', position: 'relative', overflow: 'hidden'}}>
          <LogoLoop
            logos={techLogos}
            speed={60}
            direction="left"
            logoHeight={120}
            gap={240}
            pauseOnHover={true}
          
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Technology stack"
            renderItem={renderLogoWithText}
          />
        </div>
      </div>
    </section>
  );
}
