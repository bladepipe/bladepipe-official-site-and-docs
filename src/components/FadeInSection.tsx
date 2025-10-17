import React, { useRef, useEffect, useState, ReactNode } from 'react';

export default function FadeInSection({ children, className = '', immediate = false }: { children: ReactNode, className?: string, immediate?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return; // 如果是立即显示，不需要观察器
    
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={
        `${className} transition-all duration-[1200ms] ease-out ` +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')
      }
    >
      {children}
    </div>
  );
} 