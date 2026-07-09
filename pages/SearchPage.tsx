
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { ChevronDownIcon, MagnifyingGlassIcon, ChevronRightIcon, LanguageIcon } from '@heroicons/react/24/solid';
import { LANGUAGES, TRANSLATIONS } from '../constants';

const BiblePage: React.FC<{ language: Language; setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'monasteries' | 'abnet' | 'teachers' | 'holidays'>('monasteries');
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language];

  // Specific lists with historical context
  const data = {
    monasteries: [
      { name: "Debre Damo (ደብረ ዳሞ)", info: "6th Century - Founded by Abune Aregawi (Tigray)" },
      { name: "Abba Garima (አባ ገሪማ)", info: "6th Century - Garima Gospels (Tigray)" },
      { name: "Gunda Gunde (ጉንዳ ጉንዴ)", info: "14-15th Century - Ancient Books (Tigray)" },
      { name: "Daga Estifanos (ዳጋ እስጢፋኖስ)", info: "13th Century - Royal Tombs (Amhara)" },
      { name: "Ura Kidane Mehret (ኡራ ቂዳነ ምሕረት)", info: "17th Century - Iconography (Amhara)" },
      { name: "Debre Libanos (ደብረ ሊባኖስ)", info: "1284 AD - St. Tekle Haymanot (Oromia)" },
      { name: "Axum Tsion (አክሱም ጽዮን)", info: "1st-4th Century - Ark of Covenant" },
      { name: "Waldiba (ዋልድባ)", info: "Early Foundations - Asceticism" },
      { name: "Tana Qirqos (ጣና ቂርቆስ)", info: "Ancient Foundation - History of the Ark" },
    ],
    abnet: [
      { name: "Nebab Bet (ንባብ ቤት)", info: "Level 1: Reading & Alphabet" },
      { name: "Zema Bet (ዜማ ቤት)", info: "Level 2: Liturgical Chant & Hymns" },
      { name: "Qine Bet (ቅኔ ቤት)", info: "Level 3: Poetry & Logic" },
      { name: "Metsehaf Bet (መጽሐፍ ቤት)", info: "Level 4: Biblical Interpretation" },
      { name: "Aquaquam (አቋቋም)", info: "Church Movements & Drumming" },
      { name: "Digua (ድጓ)", info: "The Treasury of Hymns" },
    ],
    teachers: [
      { name: "Saint Yared (ቅዱስ ያሬድ)", info: "Founder of Ethiopic Music (6th Century)" },
      { name: "Abune Tekle Haymanot (አቡነ ተክለ ሃይማኖት)", info: "Founder of Debre Libanos (13th Century)" },
      { name: "Abune Gebre Menfas Qidus (አቡነ ገብረ መንፈስ ቅዱስ)", info: "Life History (Abo)" },
      { name: "Abba Samuel (አባ ሳሙኤል)", info: "Monastic Leader of Waldebba" },
      { name: "The Nine Saints (ተስዓቱ ቅዱሳን)", info: "Byzantine Teachers (6th Century)" },
    ],
    holidays: [
      { name: "Meskel (መስቀል)", info: "Origin: Finding of the True Cross (4th Century)" },
      { name: "Timket (ጥምቀት)", info: "Origin: Epiphany - Celebration of Baptism" },
      { name: "Genna (ገና)", info: "Origin: Birth of Christ - Lasta/Lalibela history" },
      { name: "Fasika (ፋሲካ)", info: "Origin: Resurrection History" },
      { name: "Hidar Tsion (ህዳር ጽዮን)", info: "Axum - Arrival of the Ark" },
    ]
  };

  const currentList = data[activeTab];
  
  const filteredList = useMemo(() => {
    if (!searchQuery.trim()) return currentList;
    const query = searchQuery.toLowerCase();
    const allItems = [...data.monasteries, ...data.abnet, ...data.teachers, ...data.holidays];
    return allItems.filter(item => item.name.toLowerCase().includes(query));
  }, [currentList, searchQuery, activeTab]);

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white transition-colors duration-300 pb-32">
      {/* Sky Blue Header Area */}
      <div className="bg-[#0ea5e9] px-6 py-10 flex flex-col space-y-6 text-white sticky top-0 z-40 shadow-2xl rounded-b-[3rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MagnifyingGlassIcon className="w-7 h-7 fill-white drop-shadow-md" />
            <h1 className="text-2xl font-black tracking-tight uppercase">{t.search}</h1>
          </div>
        </div>

        {/* 5 Language Buttons - Sky Blue Theme */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 opacity-80">
            <LanguageIcon className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Select Language</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setLanguage(lang.id as Language)}
                className={`flex-grow py-2 px-3 rounded-xl text-[10px] font-black transition-all border ${
                  language === lang.id 
                    ? 'bg-white text-[#0ea5e9] border-white shadow-xl scale-105' 
                    : 'bg-black/10 text-white border-white/20 hover:bg-black/20'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" />
          <input 
            type="text" 
            placeholder="Search histories..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full pl-14 pr-6 py-4 bg-black/20 text-white rounded-[1.5rem] border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 font-bold text-sm shadow-inner placeholder:text-white/40" 
          />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Category Tabs in Sky Blue */}
        {!searchQuery && (
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-3">
            {[
              { id: 'monasteries', label: t.monasteries },
              { id: 'abnet', label: t.abnet },
              { id: 'teachers', label: t.teachers },
              { id: 'holidays', label: t.holidays }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-md active:scale-95 ${
                  activeTab === cat.id 
                    ? 'bg-[#0ea5e9] text-white' 
                    : 'bg-gray-100 text-zinc-500 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
          {filteredList.map((item, i) => (
            <button 
              key={i} 
              onClick={() => navigate(`/content/search?query=${encodeURIComponent(item.name)}`)} 
              className="w-full p-6 bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 flex items-center justify-between group transition-all active:scale-[0.98] hover:bg-gray-50"
            >
              <div className="flex items-center space-x-5">
                <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-600 font-black text-sm transition-all group-hover:bg-[#0ea5e9] group-hover:text-white shadow-md">
                  {i + 1}
                </div>
                <div className="text-left">
                  <span className="text-base font-black text-zinc-800 group-hover:text-[#0ea5e9] transition-colors tracking-tight leading-tight">
                    {item.name}
                  </span>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">
                    {item.info}
                  </p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-[#0ea5e9] group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
          
          {filteredList.length === 0 && (
            <div className="text-center py-24 opacity-50">
              <MagnifyingGlassIcon className="w-16 h-16 mx-auto mb-4 text-zinc-300" />
              <p className="text-zinc-500 font-black text-sm uppercase tracking-widest">{t.noResults}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiblePage;
