'use client';

export default function About() {
  return (
    <section className="relative min-h-screen bg-black text-white flex items-center justify-center px-8 lg:px-16 py-20">
      <div className="max-w-5xl w-full">
        {/* Hello! Heading */}
        <div className="flex items-center justify-center gap-8 mb-16">
          <div className="flex-1 h-[1px] bg-gray-700"></div>
          <h2 className="text-4xl lg:text-5xl font-serif italic text-gray-300">Hello!</h2>
          <div className="flex-1 h-[1px] bg-gray-700"></div>
        </div>

        {/* Main Content with Floating Badges */}
        <div className="relative">
          {/* Floating skill badges */}
          <div className="floating-badge absolute top-[-40px] left-[5%] lg:left-[10%]">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="w-8 h-8 bg-[#FF6B4A] rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" fill="white" rx="1"/>
                  <rect x="9" y="2" width="5" height="5" fill="white" rx="1"/>
                  <rect x="2" y="9" width="5" height="5" fill="white" rx="1"/>
                  <rect x="9" y="9" width="5" height="5" fill="white" rx="1"/>
                </svg>
              </div>
              <span className="text-black font-medium">Design systems</span>
            </div>
          </div>

          <div className="floating-badge absolute top-[80px] left-[0%] lg:left-[5%]">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3" y="3" width="10" height="10" stroke="white" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <span className="text-black font-medium">UI/UX</span>
            </div>
          </div>

          <div className="floating-badge absolute top-[180px] left-[2%] lg:left-[8%]">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" fill="none"/>
                  <line x1="11" y1="11" x2="14" y2="14" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
              <span className="text-black font-medium">Research</span>
            </div>
          </div>

          <div className="floating-badge absolute top-[-50px] right-[8%] lg:right-[12%]">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3L10 7L14 8L10 9L8 13L6 9L2 8L6 7L8 3Z" fill="white"/>
                </svg>
              </div>
              <span className="text-black font-medium">Animation</span>
            </div>
          </div>

          <div className="floating-badge absolute top-[90px] right-[2%] lg:right-[5%]">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="3" fill="white"/>
                  <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="2 2"/>
                </svg>
              </div>
              <span className="text-black font-medium">Prototyping</span>
            </div>
          </div>

          <div className="floating-badge absolute top-[190px] right-[5%] lg:right-[10%]">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L6 6L2 8L6 10L8 14L10 10L14 8L10 6L8 2Z" fill="white"/>
                  <circle cx="8" cy="8" r="2" fill="white"/>
                </svg>
              </div>
              <span className="text-black font-medium">Strategy</span>
            </div>
          </div>

          {/* Main Text */}
          <div className="text-center px-4 py-8">
            <p className="text-2xl lg:text-4xl font-light leading-relaxed">
              <span className="text-white">I&apos;m a Product and UX Designer with </span>
              <span className="text-white font-medium">1+ years of experience</span>
              <br />
              <span className="text-white">and </span>
              <span className="text-white font-medium">3+ live projects</span>
              <span className="text-white"> — </span>
              <span className="text-gray-500">creating digital products that blend</span>
              <br />
              <span className="text-gray-500">simplicity and purpose.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
