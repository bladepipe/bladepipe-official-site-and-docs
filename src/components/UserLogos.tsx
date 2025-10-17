import React from 'react';

const logos = [
  '/img/home/logo/logo1.png',
  '/img/home/logo/logo3.png',
  '/img/home/logo/logo4.png',
  '/img/home/logo/logo5.png',
  '/img/home/logo/logo6.png',
  '/img/home/logo/logo7.png',
  '/img/home/logo/logo8.png',
  '/img/home/logo/logo9.png',
  '/img/home/logo/logo10.png'
];

export default function UserLogos() {
  return (
    <section className="w-full flex justify-center items-center overflow-x-hidden">
      <div className="w-[1728px] h-[146px] flex items-center relative">
        {/* 滚动容器 */}
        <div className="flex items-center gap-16 animate-logo-scroll whitespace-nowrap">
          {logos.concat(logos).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`User Logo ${idx % logos.length + 1}`}
              className="h-[80px] w-auto object-contain inline-block select-none"
              draggable={false}
              style={{ minWidth: 120 }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes logo-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-logo-scroll {
          animation: logo-scroll 30s linear infinite;
        }
        @media (max-width: 1800px) {
          .w-\[1728px\] { width: 100vw; }
        }
      `}</style>
    </section>
  );
} 