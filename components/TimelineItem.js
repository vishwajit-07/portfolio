import React from 'react';

// =================================================================
// 1. Desktop View Component (Centered Timeline)
// =================================================================
const TimelineItemDesktop = ({
  company,
  dateRange,
  position,
  description,
  isOrangeDot,
  isLastItem,
  dotColorClass,
  textColorClass
}) => (
  // Uses the original 3-column centered structure: Left Content | Dot/Line | Right Content
  <div className="flex flex-row items-start mb-10 relative">
    
    {/* Line connecting dots (Positioned at center: md:left-1/2) */}
    {!isLastItem && (
      <div 
        className="absolute left-1/2 -ml-0.5 top-[20px] bottom-[-40px] w-0.5 border-l-2 border-dashed border-blue-300 z-0"
      ></div>
    )}

    {/* Left Column: Degree/Title and Date (Right Aligned Text) */}
    <div className="w-1/2 pr-10 text-right relative z-10">
      <h3 className={`font-bold leading-tight ${textColorClass} text-xl`}>
        {company}
      </h3>
      <p className="text-gray-600 text-sm">{dateRange}</p>
    </div>

    {/* Center Column: Timeline Dot (Fixed width for positioning) */}
    <div className="flex flex-col items-center w-8 relative z-10">
      <div className={`w-4 h-4 rounded-full ${dotColorClass} flex-shrink-0 relative top-0.5`}></div>
    </div>

    {/* Right Column: Institution and Description (Left Aligned Text) */}
    <div className="w-1/2 pl-10 relative z-10">
      <h3 className={`font-bold leading-tight ${textColorClass} text-xl`}>
        {position}
      </h3>
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed mt-2">
          {description}
        </p>
      )}
    </div>
  </div>
);

// =================================================================
// 2. Mobile View Component (Left-Aligned Timeline)
// =================================================================
const TimelineItemMobile = ({
  company,
  dateRange,
  position,
  description,
  isOrangeDot,
  isLastItem,
  dotColorClass,
  textColorClass
}) => (
  // Left-aligned structure: Dot/Line | Content (stacked)
  // The content is offset right using pl-8
  <div className="flex flex-col mb-8 relative pl-8">

    {/* Line connecting dots (Absolute left-aligned) */}
    {!isLastItem && (
      <div 
        className="absolute left-2 -ml-0.5 top-5 bottom-[-40px] w-0.5 border-l-2 border-dashed border-blue-300 z-0"
      ></div>
    )}
    
    {/* Timeline Dot (Absolute left-aligned) */}
    <div 
      className={`absolute left-0.5 top-1 w-4 h-4 rounded-full ${dotColorClass} flex-shrink-0 z-10`}
    ></div>

    {/* All Content (Degree, Date, Institution, Description) is stacked vertically */}
    <div className="flex flex-col">
      {/* Degree/Title and Date */}
      <h3 className={`font-bold leading-tight ${textColorClass} text-lg`}>
        {company}
      </h3>
      <p className="text-gray-600 text-sm mb-2">{dateRange}</p>

      {/* Institution and Description */}
      <h3 className={`font-bold leading-tight ${textColorClass} text-lg`}>
        {position}
      </h3>
      {description && (
        <p className="text-gray-600 text-sm leading-relaxed mt-1">
          {description}
        </p>
      )}
    </div>
  </div>
);


// =================================================================
// 3. Main TimelineItem Component (Responsive Switch)
// =================================================================
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

  const props = {
    company,
    dateRange,
    position,
    description,
    isOrangeDot,
    isLastItem,
    dotColorClass,
    textColorClass,
  };

  return (
    <>
      {/* Render Mobile View (< 768px) */}
      <div className="md:hidden">
        <TimelineItemMobile {...props} />
      </div>

      {/* Render Desktop View (>= 768px) */}
      <div className="hidden md:block">
        <TimelineItemDesktop {...props} />
      </div>
    </>
  );
};

export default TimelineItem;
