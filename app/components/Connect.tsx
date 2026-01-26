import FloatingLines from '@/components/FloatingLines';
import Link from 'next/link';

export default function Connect() {
  return (
    <div id="contact" style={{ width: '100%', height: '800px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <FloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        // Array - specify line count per wave; Number - same count for all waves
        lineCount={5}
        // Array - specify line distance per wave; Number - same distance for all waves
        lineDistance={5}
        bendRadius={5}
        bendStrength={1.5}
        interactive={true}
        parallax={true}
      />
      <div style={{ position: 'absolute', zIndex: 10, textAlign: 'center' }}>
        <h2 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem', fontFamily: 'serif' }}>
          That’s it for now. Curious to know more?
        </h2>
        <Link
          href="mailto:rahuldhiman4441@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 text-xl border-2 border-white rounded-[50px] bg-transparent text-white font-medium transition-all duration-300 hover:bg-[#ff6445] hover:text-white hover:border-0"
        >
          Let’s connect →
        </Link>
        <p className="mt-8 max-w-[600px] text-base text-white text-center mx-auto">
          I’d love to chat about design, ideas, or potential collaborations.
        </p>
      </div>
    </div>
  );
}