import React from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showTooltip?: boolean;
  tooltipFormatter?: (value: number) => string;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
  thumbClassName?: string;
  tooltipClassName?: string;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showTooltip = true,
  tooltipFormatter,
  className = '',
  trackClassName = '',
  fillClassName = '',
  thumbClassName = '',
  tooltipClassName = ''
}) => {
  // 计算百分比位置
  const percentage = ((value - min) / (max - min)) * 100;

  // 格式化显示值
  const formatValue = (val: number) => {
    if (tooltipFormatter) {
      return tooltipFormatter(val);
    }
    return val.toString();
  };

  // 计算新值的通用函数
  const calculateNewValue = (clientX: number, trackElement: HTMLElement) => {
    const rect = trackElement.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPercentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const newValue = min + (newPercentage / 100) * (max - min);

    // 根据step调整值
    const steppedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    return clampedValue;
  };

  // 处理轨道点击
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const newValue = calculateNewValue(e.clientX, e.currentTarget);
    onChange(newValue);
  };

  // 处理轨道触摸
  const handleTrackTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const newValue = calculateNewValue(touch.clientX, e.currentTarget);
      onChange(newValue);
    }
  };

  // 处理鼠标拖拽
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const sliderTrack = document.querySelector('[data-slider-track]') as HTMLElement;
      if (!sliderTrack) return;

      const newValue = calculateNewValue(moveEvent.clientX, sliderTrack);
      onChange(newValue);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // 处理触摸拖拽
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const handleTouchMove = (moveEvent: TouchEvent) => {
      moveEvent.preventDefault(); // 防止页面滚动
      const sliderTrack = document.querySelector('[data-slider-track]') as HTMLElement;
      if (!sliderTrack || moveEvent.touches.length === 0) return;

      const touch = moveEvent.touches[0];
      const newValue = calculateNewValue(touch.clientX, sliderTrack);
      onChange(newValue);
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className={`relative ${className}`}>
      {/* 滑块轨道 */}
      <div
        data-slider-track
        className={`w-full h-[6px] bg-gray-200 rounded-full relative cursor-pointer ${trackClassName}`}
        onMouseDown={handleTrackClick}
        onTouchStart={handleTrackTouch}
      >
        {/* 填充部分 */}
        <div
          className={`h-full bg-green-500 rounded-full ${fillClassName}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 滑块手柄 */}
      <div
        className={`absolute w-[20px] h-[20px] bg-white rounded-full cursor-pointer border-2 border-solid border-[#0087c7] shadow-lg ${thumbClassName}`}
        style={{
          left: `${percentage}%`,
          top: '-7px',
          transform: 'translateX(-50%)'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />

      {/* 数值提示 */}
      {showTooltip && (
        <div
          className={`whitespace-nowrap absolute top-[-50px] transform -translate-x-1/2 bg-white px-[12px] py-[8px] rounded-[8px] text-[16px] font-bold text-[#0087c7] shadow-lg border border-gray-200 ${tooltipClassName}`}
          style={{ left: `${percentage}%` }}
        >
          {formatValue(value)}
        </div>
      )}
    </div>
  );
};

export default Slider;
