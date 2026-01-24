'use client'

import { useEffect } from "react";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import About from "./components/About";
import Showcase from "./components/Showcase";
import Work from "./components/Work";
import Lenis from 'lenis'
import Connect from "./components/Connect";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Listen for the scroll event and log the event data
    lenis.on('scroll', (e) => {
      console.log(e);
    });

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black  min-h-screen">
      <Hero />
      <div className="pt-10 "><TechStack /></div>
      
      <About />
      <Showcase />
      <Work />
      <Connect />
    </div>
  );
}
