import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  // enableBlur = true,
  baseOpacity = 0.6,
  baseRotation = 3,
  // blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: 'opacity', color: '#ff9682' },
      {
        ease: 'none',
        opacity: 1,
        color: '#ffffff',
        stagger: 0.15,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=30%',
          end: 'center center',
          scrub: 2
        }
      }
    );

    // if (enableBlur) {
    //   gsap.fromTo(
    //     wordElements,
    //     { filter: `` },
    //     {
    //       ease: 'none',
    //       filter: 'blur(0px)',
    //       stagger: 0.15,
    //       scrollTrigger: {
    //         trigger: el,
    //         scroller,
    //         start: 'top bottom-=20%',
    //         end: wordAnimationEnd,
    //         scrub: 1.5
    //       }
    //     }
    //   );
    // }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd]);

  return (
    <h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p className={`text-[clamp(1rem,2vw,3rem)] leading-[1.5] font-regular ${textClassName}`}>{splitText}</p>
    </h2>
  );
};

export default ScrollReveal;
