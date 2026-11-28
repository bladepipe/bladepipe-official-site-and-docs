import React, { useEffect, useRef, type RefObject } from 'react';

export default function ScrollCtaBackground({ sectionRef }: { sectionRef: RefObject<HTMLElement> }) {
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const bounds = section.getBoundingClientRect();
      const distance = Math.min(Math.max(window.innerHeight - bounds.top, 0), window.innerHeight + bounds.height);
      const primaryOffset = reducedMotion.matches ? 0 : 500 - distance;
      const secondaryOffset = reducedMotion.matches ? 0 : 500 - distance * 0.5;

      if (primaryRef.current) {
        primaryRef.current.style.transform = `translate3d(0, ${primaryOffset}px, 0)`;
      }
      if (secondaryRef.current) {
        secondaryRef.current.style.transform = `translate3d(0, ${secondaryOffset}px, 0)`;
      }
    };

    const requestUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: 'url(/img/home/guideBack.svg)',
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    transform: 'translate3d(0, 500px, 0)',
    willChange: 'transform',
  };

  return (
    <>
      <div ref={primaryRef} data-cta-background="primary" aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none" style={backgroundStyle} />
      <div ref={secondaryRef} data-cta-background="secondary" aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none" style={{ ...backgroundStyle, opacity: 0.5 }} />
    </>
  );
}
