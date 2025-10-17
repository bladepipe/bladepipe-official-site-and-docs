import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // 监听屏幕尺寸变化
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初始检查
    checkIsMobile();

    // 添加监听器
    window.addEventListener('resize', checkIsMobile);

    // 清理监听器
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // 根据屏幕尺寸调整显示的页码数量
  const generateResponsivePageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // 移动端显示更少的页码
    const maxPages = isMobile ? 3 : 7;
    
    if (totalPages <= maxPages) {
      // 如果总页数小于等于最大显示数，显示所有页码
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        // 移动端简化逻辑：当前页 ± 1
        if (currentPage <= 2) {
          pages.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 1) {
          pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage, '...', totalPages);
        }
      } else {
        // 桌面端复杂逻辑
        if (currentPage <= 3) {
          pages.push(1, 2, 3, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
        } else {
          pages.push(1, '...', currentPage, '...', totalPages);
        }
      }
    }
    
    return pages;
  };

  const responsivePageNumbers = generateResponsivePageNumbers();

  return (
    <div className="custom-pagination-container w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-0 h-[56px] flex justify-between items-center pt-[20px]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
      {/* Previous Button */}
      <div className="flex-shrink-0 flex justify-start items-center">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`cursor-pointer flex gap-[6px] items-center disabled:cursor-not-allowed transition-colors duration-200 bg-transparent ${
            currentPage === 1 
              ? 'text-[#CCCCCC]' 
              : 'text-[#131415] hover:text-[#0087c7]'
          }`}
          style={{ background: 'transparent', backgroundColor: 'transparent' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path 
              d="M10.6667 13.3333L5.33333 8L10.6667 2.66667" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[14px] font-bold leading-[20px] hidden sm:inline" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            <Translate id="pagination.previous">Previous</Translate>
          </span>
        </button>
      </div>

      {/* Page Numbers */}
      <div className="flex gap-[2px] items-center overflow-x-auto scrollbar-hide">
        {responsivePageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <div 
                key={`ellipsis-${index}`}
                className="cursor-pointer w-[32px] sm:w-[40px] h-[32px] sm:h-[36px] flex items-center justify-center rounded-[8px] px-[6px] sm:px-[8px] py-[6px] sm:py-[8px] flex-shrink-0"
              >
                <span className="text-[#262A2B] text-[12px] sm:text-[14px] font-medium leading-[18px] sm:leading-[20px]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  ...
                </span>
              </div>
            );
          }
          
          const isActive = currentPage === page;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`cursor-pointer w-[32px] sm:w-[40px] h-[32px] sm:h-[36px] flex items-center justify-center rounded-[8px] px-[6px] sm:px-[8px] py-[6px] sm:py-[8px] transition-colors duration-200 border-none outline-none cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-[#EFF2F6] text-[#131415]'
                  : 'bg-transparent text-[#262A2B] hover:bg-[#EFF2F6]'
              }`}
            >
              <span className="text-[12px] sm:text-[14px] font-medium leading-[18px] sm:leading-[20px]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                {page}
              </span>
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <div className="flex-shrink-0 flex justify-end items-center">
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`cursor-pointer flex gap-[6px] items-center disabled:cursor-not-allowed transition-colors duration-200 bg-transparent ${
            currentPage === totalPages 
              ? 'text-[#CCCCCC]' 
              : 'text-[#131415] hover:text-[#0087c7]'
          }`}
          style={{ background: 'transparent', backgroundColor: 'transparent' }}
        >
          <span className="text-[14px] font-bold leading-[20px] hidden sm:inline" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            <Translate id="pagination.next">Next</Translate>
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
            <path 
              d="M5.33333 2.66667L10.6667 8L5.33333 13.3333" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;