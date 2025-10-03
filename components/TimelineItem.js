// components/TimelineItem.jsx

import React from 'react';

const TimelineItem = ({
  company,
  dateRange,
  position,
  description,
  isOrangeDot = true,
  isLastItem = false
}) => {
  const dotColorClass = isOrangeDot ? 'bg-orange-500' : 'bg-gray-700';
  const textColorClass = 'text-gray-800';

  return (
    // **Change 1: Increased margin for better visual separation**
    <div className="flex items-start mb-10 relative">
      
      {/* **NEW: Absolute Positioned Line (The Fix)**
        This line now stretches from the center of the current dot to the next.
        It starts just below the current dot (top-[20px]) and extends to the bottom of the container. 
      */}
      {!isLastItem && (
        <div 
          className="absolute left-1/2 -ml-0.5 top-[20px] bottom-[-40px] w-0.5 border-l-2 border-dashed border-blue-300 z-0"
        ></div>
      )}

      {/* Left Column: Company and Date */}
      <div className="w-1/2 pr-10 text-right relative z-10">
        <h3 className={`font-bold text-xl leading-tight ${textColorClass}`}>{company}</h3>
        <p className="text-gray-600 text-sm">{dateRange}</p>
      </div>

      {/* Center Column: Timeline Dot (Now simpler) */}
      <div className="flex flex-col items-center w-8 relative z-10">
        {/* Dot container ensures the dot is centered */}
        {/* top-0.5 pushes the dot down slightly to align with the text */}
        <div className={`w-4 h-4 rounded-full ${dotColorClass} flex-shrink-0 relative top-0.5`}></div>
        {/* The previous internal dashed line is removed since the absolute line handles it */}
      </div>

      {/* Right Column: Position and Description */}
      <div className="w-1/2 pl-10 relative z-10">
        <h3 className={`font-bold text-xl leading-tight ${textColorClass} pt-0.5`}>{position}</h3>
        {description && (
          <p className="text-gray-600 text-sm leading-relaxed mt-2">{description}</p>
        )}
      </div>
    </div>
  );
};

export default TimelineItem;