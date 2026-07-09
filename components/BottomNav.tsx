
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, MicrophoneIcon, MagnifyingGlassIcon, UsersIcon, Cog6ToothIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Language } from '../types';

interface BottomNavProps {
  language: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ language }) => {
  const navItems = [
    { to: '/', icon: HomeIcon, label: 'Home' },
    { to: '/audio', icon: MicrophoneIcon, label: 'Audio' },
    { to: '/bible', icon: MagnifyingGlassIcon, label: 'Explore' },
    { to: '/community', icon: UsersIcon, label: 'Community' },
    { to: '/calendar', icon: CalendarIcon, label: 'Calendar' },
    { to: '/settings', icon: Cog6ToothIcon, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pointer-events-none">
      <div className="max-w-xl mx-auto bg-[#0ea5e9] text-white shadow-2xl relative overflow-hidden pointer-events-auto rounded-[2rem] border-t border-white/10">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => 
                `flex flex-col items-center justify-center space-y-1 transition-all duration-300 w-full h-full ${
                  isActive 
                    ? 'bg-black/10' 
                    : 'opacity-80 hover:opacity-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2.5 rounded-xl transition-all duration-500 ${isActive ? 'bg-white/20' : ''}`}>
                    <item.icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`text-[11px] font-bold text-center leading-none tracking-tight transition-all ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
