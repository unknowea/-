
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language, Category } from '../types';
import { ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { TRANSLATIONS, RELIGIOUS_BANNER, LANGUAGES } from '../constants';
import churchBanner from '../src/assets/images/New top.png';

const Home: React.FC<{ language: Language; setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language];

  const categories: Category[] = [
    { id: 'monasteries', title: { Amharic: 'ገዳማት', Geez: 'ገዳማት', Tigrinya: 'ገዳማት', English: 'Monasteries', AfaanOromo: 'Gadamootaa' } },
    { id: 'abnet', title: { Amharic: 'የአብነት ትምህርት', Geez: 'ትምህርተ ቤተ ክርስቲያን', Tigrinya: 'ትምህርቲ አብነት', English: 'Church Education', AfaanOromo: 'Barnoota Mana Kiristaanaa' } },
    { id: 'teachers', title: { Amharic: 'ታዋቂ መምህራን', Geez: 'ዐበይት መምህራን', Tigrinya: 'ዓበይቲ መምህራን', English: 'Great Teachers(Eminent Teachers)', AfaanOromo: 'Barsiisota Beekamoo'} },
    { id: 'holidays', title: { Amharic: 'በዓላት', Geez: 'በዓላት', Tigrinya: 'በዓላት', English: 'Holidays', AfaanOromo: 'Ayyaanota' } }
  ];

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase();
    return categories.filter(cat => 
      cat.title[language].toLowerCase().includes(query)
    );
  }, [categories, searchQuery, language]);

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setShowCategories(true);
  };

  const languageOptions = LANGUAGES;

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="relative w-full h-[32vh] overflow-hidden rounded-b-[3rem] shadow-2xl mb-8">
        <img 
          src={churchBanner} 
          className="w-full h-full object-cover" 
          alt="Church Banner" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
      </div>
      
      {!showCategories ? (
        <div className="px-6 space-y-5 pb-32">
          {languageOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleLanguageSelect(opt.id)}
              className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800 hover:shadow-2xl transition-all active:scale-95 group"
            >
              <span className="flex-grow text-center text-2xl font-black text-zinc-800 dark:text-zinc-100 group-hover:text-[#0ea5e9] transition-colors tracking-tight">
                {opt.label}
              </span>
              <ChevronRightIcon className="w-6 h-6 text-zinc-300 dark:text-zinc-600 group-hover:text-[#0ea5e9] group-hover:translate-x-1.5 transition-transform" />
            </button>
          ))}
        </div>
      ) : (
        <div className="px-6 space-y-6 pb-32 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-2xl font-black text-[#0ea5e9] tracking-tighter uppercase">{t.categories}</h2>
            <button 
              onClick={() => setShowCategories(false)}
              className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 hover:text-sky-600 transition-colors uppercase tracking-widest border border-gray-100 dark:border-zinc-800 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 shadow-lg active:scale-95"
            >
              {t.changeLanguage}
            </button>
          </div>

          <div className="relative group">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-[#0ea5e9]" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-[1.25rem] border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 font-bold text-base shadow-lg"
            />
          </div>

          <div className="space-y-4">
            {filteredCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/content/${cat.id}`)}
                className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-900 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800 hover:shadow-2xl transition-all group active:scale-95"
              >
                <div className="text-left">
                  <span className="text-xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-[#0ea5e9] leading-tight tracking-tight">
                    {cat.title[language]}
                  </span>
                </div>
                <div className="text-[#0ea5e9] transition-transform group-hover:translate-x-1.5">
                  <ChevronRightIcon className="w-6 h-6" strokeWidth={3} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
