'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

const titles = [
  'Frontend Developer',
  '💻',
  'Creative Engineer',
  '🎨',
  'Software Engineer',
  '⚙️',
  'UI/UX Explorer',
  '🧭',
  'Pixel Forger',
  '🔥',
  'React Lover',
  '⚛️',
];

const HeroMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(container, {
      xPercent: -50,
      duration: 20,
      ease: 'linear',
    });

    Observer.create({
      type: 'wheel,touch',
      onChangeY(self) {
        const direction = self.deltaY > 0 ? 1 : -1;
        const speed = 1 + Math.abs(self.deltaY) / 200;
        gsap.to(tl, { timeScale: direction * speed, duration: 0.5 });
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="absolute bottom-0 left-0 z-10 overflow-hidden w-full border-y border-neutral-800 bg-black text-white py-4">
      <div
        ref={containerRef}
        className="flex gap-12 whitespace-nowrap will-change-transform"
      >
        {[...titles, ...titles].map((title, index) => (
          <h2
            key={index}
            className="marquee-text text-base font-bold uppercase tracking-widest"
          >
            {title}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default HeroMarquee;
