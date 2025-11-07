// import React, { useState, useRef, useEffect } from 'react';
// import { useLocation } from '@docusaurus/router';
// import OriginalSearchBar from '@easyops-cn/docusaurus-search-local/dist/client/client/theme/SearchBar';
// import './styles.css';
//
// export default function SearchBar(props: any) {
//   const [isOpen, setIsOpen] = useState(false);
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const location = useLocation();
//
//   // 点击外部关闭搜索框
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//
//     if (isOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isOpen]);
//
//   // ESC 键关闭
//   useEffect(() => {
//     const handleEsc = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         setIsOpen(false);
//       }
//     };
//
//     if (isOpen) {
//       document.addEventListener('keydown', handleEsc);
//     }
//
//     return () => {
//       document.removeEventListener('keydown', handleEsc);
//     };
//   }, [isOpen]);
//
//   // 禁止页面滚动
//   useEffect(() => {
//     if (isOpen) {
//       // 保存当前滚动位置
//       const scrollY = window.scrollY;
//       document.body.style.position = 'fixed';
//       document.body.style.top = `-${scrollY}px`;
//       document.body.style.width = '100%';
//       document.body.style.overflow = 'hidden';
//     } else {
//       // 恢复滚动位置
//       const scrollY = document.body.style.top;
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.width = '';
//       document.body.style.overflow = '';
//       window.scrollTo(0, parseInt(scrollY || '0') * -1);
//     }
//
//     return () => {
//       // 组件卸载时恢复
//       document.body.style.position = '';
//       document.body.style.top = '';
//       document.body.style.width = '';
//       document.body.style.overflow = '';
//     };
//   }, [isOpen]);
//
//   // 快捷键支持 (Cmd/Ctrl + K)
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
//         event.preventDefault();
//         setIsOpen(true);
//       }
//     };
//
//     document.addEventListener('keydown', handleKeyDown);
//
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);
//
//   // 监听路由变化，跳转时关闭搜索框
//   useEffect(() => {
//     if (isOpen) {
//       setIsOpen(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location.pathname]);
//
//   return (
//     <div className="custom-search-wrapper" ref={searchContainerRef}>
//       {/* 搜索图标按钮 */}
//       <button
//         className="search-icon-button"
//         onClick={() => setIsOpen(!isOpen)}
//         aria-label="搜索"
//         type="button"
//       >
//         <svg
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <circle cx="11" cy="11" r="8"></circle>
//           <path d="m21 21-4.35-4.35"></path>
//         </svg>
//       </button>
//
//       {/* 搜索框弹出层 */}
//       {isOpen && (
//         <div className="search-popup" onClick={() => setIsOpen(false)}>
//           <div className="search-popup-content" onClick={(e) => e.stopPropagation()}>
//             <OriginalSearchBar {...props} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
//
