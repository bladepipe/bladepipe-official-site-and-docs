import React, { useState, useEffect, useRef } from 'react';
import { Button, message } from 'antd';
import { useConstantStore } from '@site/src/store/constant';
import { sendCode } from '@site/src/apis/verify';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { translate } from '@docusaurus/Translate';

const COUNTDOWN_SECONDS = 60;

interface CountDownButtonProps {
  email?: string;
  phoneNumber?: string;
  phoneAreaCode?: string;
  verifyCodeType: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

const CountDownButton: React.FC<CountDownButtonProps> = ({ email, phoneNumber, phoneAreaCode, verifyCodeType, onError, onSuccess }) => {
  const { siteConfig } = useDocusaurusContext();
  const siteBrand = siteConfig.customFields?.siteBrand;

  const [loading, setLoading] = useState(false);
  const [counting, setCounting] = useState(false);
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 过滤后端技术性错误，仅对可读错误进行展示
  const shouldShowError = (errorMessage: string) => {
    if (!errorMessage) return false;
    try {
      const errorObj = JSON.parse(errorMessage);
      return !errorObj.error;
    } catch {
      const technicalErrorKeywords = ['error', 'Error', 'exception', 'Exception', 'stack', 'trace'];
      return !technicalErrorKeywords.some((keyword) => errorMessage.includes(keyword));
    }
  };

  // 根据 sitebrand 动态设置 verifyType
  const verifyType = siteBrand === 'bladepipe' ? 'EMAIL_VERIFY_CODE' : 'SMS_VERIFY_CODE';

  // 根据 sitebrand 获取对应的联系方式和错误提示
  const contactValue = siteBrand === 'bladepipe' ? email : phoneNumber;
  const contactType = siteBrand === 'bladepipe' ? 'email' : 'phone number';

  useEffect(() => {
    if (counting) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setCounting(false);
            return COUNTDOWN_SECONDS;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [counting]);

  const handleGetCode = async () => {
    if (!contactValue) {
      const errorMessage =
        siteBrand === 'bladepipe'
          ? translate({ id: 'countdownButton.error.enterEmail', message: 'Please enter your email' })
          : translate({ id: 'countdownButton.error.enterPhone', message: 'Please enter your phone number' });
      onError?.(errorMessage);
      return;
    }
    setLoading(true);
    try {
      const res: any = await sendCode({
        [siteBrand === 'bladepipe' ? 'email' : 'phoneNumber']: contactValue,
        verifyType,
        verifyCodeType,
        phoneAreaCode: siteBrand === 'bladepipe' ? undefined : phoneAreaCode || 'CHINA'
      });
      if (res && res.success) {
        setCounting(true);
        message.success(translate({ id: 'countdownButton.success.sent', message: 'Verification code sent successfully' }));
        onSuccess?.(); // 发送成功时清除错误
      } else {
        const genericMsg = translate({ id: 'countdownButton.error.sendFailed', message: 'Failed to send verification code' });
        // 不返回后端原始报错，仅在可读时提示通用信息，否则清空
        if (shouldShowError(res?.msg)) {
          onError?.(res?.msg);
        } else {
          onError?.(genericMsg);
        }
      }
    } catch (e) {
      // 网络或异常情况统一提示通用错误文案
      const genericMsg = translate({ id: 'countdownButton.error.sendFailed', message: 'Failed to send verification code' });
      onError?.(genericMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className={`w-full h-[52px] text-[14px] font-medium leading-[20px] rounded-[8px] ${counting ? 'bg-[#F5F5F5] text-[#787070] border border-solid border-[#11101a] border-opacity-20' : 'bg-[#0087c7] text-white hover:bg-[#0070a6] !border-none'}`}
      disabled={counting}
      onClick={handleGetCode}
      type={counting ? 'default' : 'primary'}
      loading={loading}>
      {counting ? `${seconds}S` : translate({ id: 'countdownButton.button.getCode', message: 'Get Code' })}
    </Button>
  );
};

export default CountDownButton;
