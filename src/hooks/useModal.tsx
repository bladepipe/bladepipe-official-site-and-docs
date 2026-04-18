import React, { useState, useCallback, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

// useModal Hook
export function useModal() {
  const [visible, setVisible] = useState(false);
  const open = useCallback(() => setVisible(true), []);
  const close = useCallback(() => setVisible(false), []);
  return { visible, open, close };
}

// Modal 组件
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  width?: string | number;
  hideCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({ visible, onClose, title, children, width = 400, hideCloseButton = false }) => {
  const [show, setShow] = useState(visible);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      setTimeout(() => setActive(true), 10);
      document.body.style.overflow = 'hidden'; // 禁止滚动
    } else if (show) {
      setActive(false);
      const timer = setTimeout(() => setShow(false), 250);
      // 动画结束后恢复滚动
      timer &&
        setTimeout(() => {
          document.body.style.overflow = '';
        }, 250);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
    // 组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  if (!show) return null;

  const widthStyle =
    typeof width === 'number'
      ? { width: `min(100%, ${width}px)`, maxWidth: 'min(90vw, 100%)' as const }
      : { width, maxWidth: 'min(90vw, 100%)' as const };

  const modalContent = (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-3 py-4 sm:p-6 bg-black/20 overflow-y-auto overscroll-contain transition-colors duration-200 ${active ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      role="presentation">
      <div
        className={`bg-white rounded-xl shadow-xl flex flex-col p-0 max-w-[90vw] max-h-[min(92dvh,calc(100dvh-32px))] min-h-0 overflow-hidden transform transition-all duration-250 ${active ? 'scale-100 opacity-100 animate-fadeIn' : 'scale-95 opacity-0'}`}
        style={{
          ...widthStyle,
          transition: 'opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1)',
        }}
        onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className='flex items-center justify-between pt-5 px-6 pb-0 flex-shrink-0'>
            <span className='text-lg font-semibold text-gray-900'>{title}</span>
            {!hideCloseButton && (
              <button
                className='appearance-none bg-transparent border-none p-0 m-0 text-2xl text-gray-400 hover:text-gray-600 ml-3 cursor-pointer focus:outline-none'
                onClick={onClose}
                aria-label='关闭'>
                ×
              </button>
            )}
          </div>
        )}
        <div className="text-base text-gray-800 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};
