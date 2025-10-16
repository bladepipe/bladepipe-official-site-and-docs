import React, { useRef, useEffect, useState } from 'react';
import Translate from '@docusaurus/Translate';

export default function BusinessData() {
  // Intersection Observer 检测进入视口
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // 目标数字
  const clients = 100;
  const downloads = 10000;
  const members = 5000;

  // 优化：所有数字递增动画共用一个 requestAnimationFrame 循环
  const [count, setCount] = useState({ clients: 0, downloads: 0, members: 0 });
  useEffect(() => {
    if (!visible) return;
    let start = { clients: 0, downloads: 0, members: 0 };
    const end = { clients, downloads, members };
    const duration = 1200;
    let startTime: number | null = null;
    let frame: number;
    function animate(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount({
        clients: Math.floor(progress * (end.clients - start.clients) + start.clients),
        downloads: Math.floor(progress * (end.downloads - start.downloads) + start.downloads),
        members: Math.floor(progress * (end.members - start.members) + start.members),
      });
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [visible, clients, downloads, members]);

  return (
    <section ref={sectionRef} className="w-full flex justify-center items-center bg-white py-8 md:py-16">
      <div className="w-full max-w-[1320px] flex flex-col md:flex-row items-center justify-between gap-6 md:gap-5 bg-white px-2 md:p-3">
        {/* 卡片1 */}
        <div className="flex items-center h-[104px] rounded-[100px] bg-white py-8 md:py-10 gap-4 md:gap-8 w-full md:w-[213px] max-w-[400px] mx-auto md:mx-0">
          <div className="w-[56px] h-[56px] md:w-[64px] md:h-[64px] flex items-center justify-center bg-white rounded-full ml-2">
            <img
              src="/img/home/icon/business1.svg"
              alt="business1"
              className="w-full h-full object-contain min-w-[56px] min-h-[56px] md:min-w-[64px] md:min-h-[64px]"
              style={{ display: 'block' }}
            />
          </div>
          <div className="flex flex-col justify-start items-start ml-2 md:ml-4">
            <span className="text-[36px] md:text-[48px] font-bold leading-[44px] md:leading-[60px] text-[#131316] font-['Plus Jakarta Sans']">{count.clients}+</span>
            <span className="text-[14px] md:text-[16px] font-bold leading-[20px] md:leading-[24px] text-black/80 font-['Plus Jakarta Sans']">
              <Translate id="business.clients">clients</Translate>
            </span>
          </div>
        </div>
        {/* 分割线 */}
        <div className="hidden md:block w-px h-20 bg-black/40 mx-8"></div>
        <div className="block md:hidden w-4/5 h-px bg-black/20 my-4 mx-auto"></div>
        {/* 卡片2 */}
        <div className="flex items-center h-[104px] rounded-[100px] bg-white py-8 md:p-10 gap-4 md:gap-8 w-full md:w-[325px] max-w-[500px] mx-auto md:mx-0">
          <div className="w-[48px] h-[48px] md:w-[60px] md:h-[60px] flex items-center justify-center bg-white rounded-full ml-2">
            <img
              src="/img/home/icon/business2.svg"
              alt="business2"
              className="w-full h-full object-contain min-w-[48px] min-h-[48px] md:min-w-[60px] md:min-h-[60px]"
              style={{ display: 'block' }}
            />
          </div>
          <div className="flex flex-col justify-start items-start ml-2 md:ml-4">
            <span className="text-[36px] md:text-[48px] font-bold leading-[44px] md:leading-[60px] text-black font-['Plus Jakarta Sans']">{count.downloads.toLocaleString()}+</span>
            <span className="text-[14px] md:text-[16px] font-bold leading-[20px] md:leading-[24px] text-[#18181a] font-['Plus Jakarta Sans']">
              <Translate id="business.downloads">downloads</Translate>
            </span>
          </div>
        </div>
        {/* 分割线 */}
        <div className="hidden md:block w-px h-20 bg-black/40 mx-8"></div>
        <div className="block md:hidden w-4/5 h-px bg-black/20 my-4 mx-auto"></div>
        {/* 卡片3 */}
        <div className="flex items-center h-[104px] rounded-[100px] bg-white py-8 md:py-10 gap-4 md:gap-8 w-full md:w-[313px] max-w-[500px] mx-auto md:mx-0">
          <div className="w-[44px] h-[48px] md:w-[52px] md:h-[58px] flex items-center justify-center bg-white rounded-full ml-2">
            <img
              src="/img/home/icon/business3.svg"
              alt="business3"
              className="w-full h-full object-contain min-w-[44px] min-h-[48px] md:min-w-[52px] md:min-h-[58px]"
              style={{ display: 'block' }}
            />
          </div>
          <div className="flex flex-col justify-start items-start ml-2 md:ml-4">
            <span className="text-[36px] md:text-[48px] font-bold leading-[44px] md:leading-[60px] text-black font-['Plus Jakarta Sans']">{count.members.toLocaleString()}+</span>
            <span className="text-[14px] md:text-[16px] font-bold leading-[20px] md:leading-[24px] text-[#18181a] font-['Plus Jakarta Sans']">
              <Translate id="business.members">community members</Translate>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
} 