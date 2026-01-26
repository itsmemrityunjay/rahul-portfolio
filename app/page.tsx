'use client'

import { useEffect } from "react";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import About from "./components/About";
import Showcase from "./components/Showcase";
import Work from "./components/Work";
import StackCard from "./components/StackCard";
import Lenis from 'lenis'
import Connect from "./components/Connect";
import Footer from "./components/Footer";

export default function Home() {
  useEffect(() => {
    // Initialize Lenis with disabled state so it doesn't interfere with Showcase scroll
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1, // Smooth scrolling factor
      wheelMultiplier: 1,
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
      {/* <StackCard /> */}
      <Showcase />
      <Work />
      <Connect />
      <Footer />
    </div>
  );
}
