import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';

interface RotatingWord {
  key: string;
  defaultText: string;
}

interface RotatingWordsProps {
  words: (string | RotatingWord)[];
  interval?: number;
  className?: string;
}

export default function RotatingWords({ words, interval = 2000, className = '' }: RotatingWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, 500); // 动画持续时间的一半
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  // 找出最长的单词来设置宽度
  const maxWord = words.reduce((max, word) => {
    const wordText = typeof word === 'string' ? word : word.defaultText;
    const maxText = typeof max === 'string' ? max : max.defaultText;
    return wordText.length > maxText.length ? word : max;
  }, words[0]);

  // 渲染单个词汇，支持国际化和普通文本
  const renderWord = (word: string | RotatingWord) => {
    if (typeof word === 'string') {
      // 如果是普通字符串，直接显示
      return word;
    } else {
      // 如果是对象，使用国际化
      return (
        <Translate id={word.key}>
          {word.defaultText}
        </Translate>
      );
    }
  };

  return (
    <span className={`inline-block relative min-w-[160px] sm:min-w-[200px] lg:min-w-[240px] ${className}`}>
      <span
        className={`absolute left-0 transition-all duration-500 whitespace-nowrap ${
          isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {renderWord(words[currentIndex])}
      </span>
      <span className="opacity-0 whitespace-nowrap">
        {renderWord(maxWord)}
      </span>
      {/* 使用最长的单词作为占位，保持布局稳定 */}
    </span>
  );
}
