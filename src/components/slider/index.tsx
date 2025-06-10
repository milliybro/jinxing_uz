import React from 'react';

interface SliderProps {
  max: number;
  value: number;
  bg: string;
}

const Slider: React.FC<SliderProps> = ({ max, value, bg }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="slider-container">
      <div className="slider-value dark:text-[#fcfcfc]">{value.toLocaleString()}</div>
      <div className="slider-bar">
        <div className={`slider-progress bg-[${bg}]`}  style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="slider-labels">
        <span>0</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Slider;
