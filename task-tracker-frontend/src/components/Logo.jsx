import React from 'react';

function Logo({ size = "medium" }) {
  // Size classes based on the size prop
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    large: "w-16 h-16"
  };
  
  return (
    <div className={`${sizeClasses[size]} bg-blue-600 rounded-lg flex items-center justify-center mx-auto`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-2/3 h-2/3" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    </div>
  );
}

export default Logo;