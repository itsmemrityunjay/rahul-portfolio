import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import About from "./components/About";
import Showcase from "./components/Showcase";

export default function Home() {
  return (
    <div className="bg-black  min-h-screen">
      <Hero />
      <div className="pt-10 "><TechStack /></div>
      
      <About />
      <Showcase />
    </div>
  );
}
