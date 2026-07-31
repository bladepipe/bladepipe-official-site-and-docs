import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import Translate from '@docusaurus/Translate';

const OTP_LENGTH = 6;

interface MfaLoginStepProps {
  loading?: boolean;
  errorMessage?: string;
  onSubmit: (mfaCode: string) => void;
  onBack?: () => void;
}

const MfaLoginStep: React.FC<MfaLoginStepProps> = ({ loading = false, errorMessage = '', onSubmit, onBack }) => {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focusCell = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const updateDigits = (nextDigits: string[]) => {
    setDigits(nextDigits);
    const value = nextDigits.join('').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (value.length === OTP_LENGTH) {
      onSubmit(value);
    }
  };

  const handleInput = (index: number, rawValue: string) => {
    const raw = rawValue.replace(/\D/g, '');
    const nextDigits = [...digits];

    if (!raw) {
      nextDigits[index] = '';
      updateDigits(nextDigits);
      return;
    }

    const chars = raw.split('');
    nextDigits[index] = chars[0];
    let cursor = index + 1;
    for (let i = 1; i < chars.length && cursor < OTP_LENGTH; i += 1) {
      nextDigits[cursor] = chars[i];
      cursor += 1;
    }
    updateDigits(nextDigits);
    if (cursor < OTP_LENGTH) {
      focusCell(cursor);
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      const nextDigits = [...digits];
      nextDigits[index - 1] = '';
      updateDigits(nextDigits);
      focusCell(index - 1);
      event.preventDefault();
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!text) return;
    const nextDigits = Array.from({ length: OTP_LENGTH }, (_, index) => text[index] || '');
    updateDigits(nextDigits);
    focusCell(Math.min(text.length, OTP_LENGTH - 1));
  };

  const handleConfirm = () => {
    const value = digits.join('');
    if (/^\d{6}$/.test(value)) {
      onSubmit(value);
    }
  };

  return (
    <div className="w-full flex flex-col gap-[24px]">
      <div>
        <h3 className="text-[18px] font-bold leading-[28px] text-black mb-2">
          <Translate id="login.mfa.title">MFA Authentication</Translate>
        </h3>
        <p className="text-[14px] leading-[22px] text-[#555]">
          <Translate id="login.mfa.description">Please enter your 6-digit MFA code</Translate>
        </p>
      </div>

      <div className="flex gap-[10px]" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            className="w-[44px] h-[44px] border border-solid border-[#dcdee2] rounded-[6px] bg-white text-[20px] font-semibold text-center outline-none focus:border-[#0087c7] focus:shadow-[0_0_0_2px_rgba(0,135,199,0.15)]"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            disabled={loading}
            onChange={(event) => handleInput(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          />
        ))}
      </div>

      {errorMessage ? <p className="text-[14px] text-[#ed4014]">{errorMessage}</p> : null}

      <div className="flex gap-[12px]">
        {onBack ? (
          <Button className="h-[52px] rounded-full px-6" onClick={onBack} disabled={loading}>
            <Translate id="login.mfa.back">Back</Translate>
          </Button>
        ) : null}
        <Button
          type="primary"
          className="flex-1 h-[52px] bg-[#0087c7] text-white rounded-full font-bold text-[16px] hover:bg-[#0070a6]"
          loading={loading}
          onClick={handleConfirm}
        >
          <Translate id="login.mfa.confirm">Continue</Translate>
        </Button>
      </div>
    </div>
  );
};

export default MfaLoginStep;
