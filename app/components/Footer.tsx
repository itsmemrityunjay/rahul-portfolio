import Image from 'next/image';

const iconStroke = '#ffffff';

function LinkedinIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconStroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 17v-7" />
      <circle cx="7" cy="8" r="1" />
      <path d="M11 17v-4a2 2 0 0 1 4 0v4" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconStroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconStroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17.5" cy="6.5" r="0.7" fill={iconStroke} stroke="none" />
    </svg>
  );
}



export default function Footer() {
  return (
    <>
      <footer
        className="relative w-full bg-black pb-16 -top-14 text-white md:pt-32 border-t border-white/70 rounded-t-[12%]"
        style={{ boxShadow: '' }}
      >
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col md:flex-row gap-12 px-6 md:gap-16 md:items-center">
          {/* Left div - Text content */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Find me at:</span>
            </div>
            <div className="flex items-center gap-6">
              <LinkedinIcon />
              <XIcon />
              <InstagramIcon />
            </div>

            <div className="text-left text-lg leading-8 text-[#f3f3f3] pt-4 md:pt-8">
              <p>Thank you for visiting my portfolio!</p>
              <p>It has been Designed &amp; Developed by me with Love &lt;3</p>
            </div>
          </div>

          {/* Right div - Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative h-96 w-96 md:h-[28rem] md:w-[28rem] footer-portrait-float">
              <Image
                src="/rahul1.png"
                alt="Rahul portrait illustration"
                fill
                sizes="(min-width: 768px) 28rem, 24rem"
                className="object-contain drop-shadow-[0_20px_70px_rgba(255,107,74,0.35)]"
                priority
              />
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .footer-portrait-float {
          animation: footerFloat 2s ease-in-out infinite;
        }

        @keyframes footerFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
