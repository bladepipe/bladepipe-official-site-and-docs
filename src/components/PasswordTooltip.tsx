import React, { useEffect, useRef } from 'react';
import { Tooltip } from 'antd';
import Translate from '@docusaurus/Translate';

interface PasswordTooltipProps {
  children: React.ReactNode;
  showPassError: boolean;
  passValid: {
    len: boolean;
    letter: boolean;
    special: boolean;
  };
  overlayStyle?: React.CSSProperties;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
}

export default function PasswordTooltip({ 
  children, 
  showPassError, 
  passValid, 
  overlayStyle = { width: 300 },
  placement = 'right'
}: PasswordTooltipProps) {
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPassError && childrenRef.current) {
      const inputElement = childrenRef.current.querySelector('input') as HTMLInputElement | HTMLTextAreaElement;
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [showPassError]);

  return (showPassError ? (
    <Tooltip
      placement={placement}
      trigger="focus"
      title={
        <div className="w-56">
          <div className="flex items-center">
            {passValid.len ? (
              <span className="text-red-500 mr-2">●</span>
            ) : (
              <span className="text-green-500 mr-2">●</span>
            )}
            <Translate id="resetPwd.form.password.length">Length should be 8-32 characters</Translate>
          </div>
          <div className="flex items-center">
            {passValid.letter ? (
              <span className="text-red-500 mr-2">●</span>
            ) : (
              <span className="text-green-500 mr-2">●</span>
            )}
            <Translate id="resetPwd.form.password.format">Must contain both letters and numbers</Translate>
          </div>
          <div className="flex items-center">
            {passValid.special ? (
              <span className="text-red-500 mr-2">●</span>
            ) : (
              <span className="text-green-500 mr-2">●</span>
            )}
            <Translate id="resetPwd.form.password.special">Must contain special characters ($%^&#_)</Translate>
          </div>
        </div>
      }
      overlayStyle={overlayStyle}
    >
      <div ref={childrenRef}>
        {children}
      </div>
    </Tooltip>
  ) : children);
}
