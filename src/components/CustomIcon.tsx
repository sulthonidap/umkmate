import React from 'react';

interface CustomIconProps {
  className?: string;
  size?: number;
}

const CustomIcon: React.FC<CustomIconProps> = ({ className = '', size = 24 }) => {
  return (
    <div 
      className={`bg-white rounded-lg border border-gray-100 flex items-center justify-center ${className}`}
      style={{ 
        width: size + 8, 
        height: size + 8,
        // padding: '4px'
      }}
    >
      <img 
        src="/icon_nobg.PNG" 
        alt="TemanEkspor Icon"
        style={{ 
          width: size, 
          height: 'auto',
          maxHeight: size,
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default CustomIcon; 