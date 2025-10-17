import React from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalNavbar from '@theme-original/Navbar';
import Navbar from '@site/src/components/Navbar';

export default function NavbarWrapper(props) {
  const location = useLocation();
  
  // 检查是否在文档页面
  const isDocsPage = location.pathname.startsWith('/docs/') || 
                     location.pathname.startsWith('/ccDocs/') || 
                     location.pathname.startsWith('/dmDocs/');
  
  // 检查是否为移动端
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // 在文档页面且为移动端时使用 Docusaurus 自带的 navbar
  if (isDocsPage && isMobile) {
    return <OriginalNavbar {...props} />;
  }
  
  // 其他情况使用自定义 navbar
  return <Navbar />;
} 