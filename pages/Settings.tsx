
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LANGUAGES, TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { 
  BellIcon, 
  InformationCircleIcon, 
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/solid';

const Settings: React.FC<any> = ({ language, setLanguage, fontSize, setFontSize, darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];

  const SettingItem = ({ icon: Icon, title, subtitle, onClick, value, customIcon, rightElement }: any) => (
    <div 
      onClick={onClick}
      className={`w-full bg-white dark:bg-zinc-900 rounded-[2rem] p-6 mb-4 flex items-center border border-gray-100 dark:border-zinc-800 shadow-xl transition-all ${onClick ? 'active:scale-95 cursor-pointer hover:border-sky-100 dark:hover:border-sky-900' : ''}`}
    >
      <div className="w-14 h-14 bg-[#0ea5e9] rounded-[1rem] flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-500/20">
        {customIcon ? customIcon : <Icon className="w-6 h-6 text-white" />}
      </div>
      <div className="ml-5 flex-grow text-left">
        <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">{title}</h3>
        {subtitle && <p className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">{subtitle}</p>}
      </div>
      {value && <span className="text-zinc-400 dark:text-zinc-500 mr-2 font-black">{value}</span>}
      {rightElement}
    </div>
  );

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white dark:bg-zinc-950 pb-32 transition-colors duration-300">
      <div className="relative pt-12 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-[#0ea5e9] shadow-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 90% 100%, 10% 100%, 0 80%)' }} />
        <h1 className="relative z-10 text-center text-4xl font-black text-white tracking-tighter uppercase mt-4">{t.settings}</h1>
      </div>

      <div className="px-6 space-y-8 -mt-6">
        {/* Language Selection */}
        <div className="bg-gray-50 dark:bg-zinc-900/50 p-2 border border-gray-100 dark:border-zinc-800 rounded-[2rem] flex items-center justify-between overflow-x-auto no-scrollbar shadow-inner">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id as Language)}
              className={`whitespace-nowrap px-6 py-3 rounded-[1.25rem] text-lg font-black transition-all duration-300 shadow-xl active:scale-95 ${
                language === lang.id ? 'bg-[#0ea5e9] text-white shadow-sky-500/30' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <div className="pt-2">
          {/* Dark Mode Toggle */}
          <SettingItem 
            icon={darkMode ? MoonIcon : SunIcon} 
            title={t.darkMode} 
            onClick={() => setDarkMode(!darkMode)}
            rightElement={
              <button 
                onClick={(e) => { e.stopPropagation(); setDarkMode(!darkMode); }}
                className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${darkMode ? 'bg-[#0ea5e9]' : 'bg-zinc-300'}`}
              >
                <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-6' : ''}`} />
              </button>
            }
          />

          <SettingItem icon={BellIcon} title={t.notificationAndReminder} onClick={() => navigate('/notifications')} />
          
          <div className="relative">
            <SettingItem 
              customIcon={<div className="text-white font-black text-xl flex items-center justify-center"><span className="leading-none">T</span><span className="text-sm leading-none mt-1">T</span></div>} 
              title={t.textSize} 
            />
            <div className="px-10 pb-6 -mt-6">
               <input 
                type="range" 
                min="14" 
                max="32" 
                value={fontSize} 
                onChange={(e) => setFontSize(parseInt(e.target.value))} 
                className="w-full h-1.5 bg-sky-50 rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]" 
               />
            </div>
          </div>

          <SettingItem icon={InformationCircleIcon} title={t.aboutUs} onClick={() => navigate('/about-us')} />
        </div>

        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase text-zinc-300 dark:text-zinc-600 tracking-[0.3em] px-2">{t.preview}</h3>
          <div className="bg-gray-50 dark:bg-zinc-900/50 p-10 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800 shadow-inner min-h-[150px]" style={{ fontSize: `${fontSize}px` }}>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300 font-serif-church italic">{t.historyPreview}</p>
          </div>
        </div>

        <div className="text-center pt-8 pb-10 opacity-30">
          <p className="text-xl font-serif-church text-zinc-400">App Version 30.0.8</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
