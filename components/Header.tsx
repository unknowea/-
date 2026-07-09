
import React, { useState, useEffect } from 'react';
import { CHURCH_HEADER_IMG } from '../constants';

const Header: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-b-[3rem] shadow-2xl">
      <img 
        src={CHURCH_HEADER_IMG} 
        alt="Orthodox Church" 
        className="w-full h-full object-cover transition-transform duration-75 ease-out"
        style={{ transform: `translateY(${offsetY * 0.3}px) scale(1.1)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    </div>
  );
};

export default Header;
