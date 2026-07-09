
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { MagnifyingGlassIcon, ChevronRightIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import { LANGUAGES, TRANSLATIONS } from '../constants';

const BiblePage: React.FC<{ language: Language; setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'monasteries' | 'abnet' | 'teachers' | 'holidays'>('monasteries');
  const [searchQuery, setSearchQuery] = useState('');
  const t = TRANSLATIONS[language];

  const data = {
    monasteries: [
      { 
        name: "Debre Damo (ደብረ ዳሞ)", 
        info: "6th Century - Founded by Abune Aregawi (one of the Nine Saints). Known for its 15m rope climb and Aksumite architecture.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Debre_Damo_Monastery.jpg/1200px-Debre_Damo_Monastery.jpg"
      },
      { 
        name: "Axum Tsion (አክሱም ጽዮን)", 
        info: "4th Century - Built by Kings Ezana and Saizana. It is the sacred home of the original Ark of the Covenant (Tabote Tsion).",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Church_of_Our_Lady_Mary_of_Zion%2C_Aksum.jpg/1200px-Church_of_Our_Lady_Mary_of_Zion%2C_Aksum.jpg"
      },
      { 
        name: "Debre Libanos (ደብረ ሊባኖስ)", 
        info: "13th Century - Founded by Saint Tekle Haymanot. A major spiritual center and the seat of the Ichege (Abbot).",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Debre_Libanos_Monastery.jpg/1200px-Debre_Libanos_Monastery.jpg"
      },
      {
        name: "Lalibela Rock-Hewn Churches (ላሊበላ)",
        info: "12th-13th Century - Commissioned by King Lalibela. 11 monolithic churches carved from solid rock, representing 'New Jerusalem'.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Lalibela_San_Giorgio.jpg/1200px-Lalibela_San_Giorgio.jpg"
      },
      { 
        name: "Waldiba (ዋልድባ)", 
        info: "Established in the 14th Century. Known as the 'Desert of the Monks', famous for its strict asceticism and fasting.",
        image: "https://images.unsplash.com/photo-1544013508-222218bcc383?q=80&w=1200"
      },
      {
        name: "Zequala Abune Gebre Menfas Qidus (ዝቋላ)",
        info: "12th Century - Located on an extinct volcano crater. Founded by Abune Gebre Menfas Qidus, a major pilgrimage site.",
        image: "https://images.unsplash.com/photo-1590059125010-826002061215?q=80&w=1200"
      },
      { 
        name: "Debre Bizen (ደብረ ቢዘን)", 
        info: "14th Century - Founded by Abune Filipos. Located on a mountain peak, it strictly prohibits females from entering.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Debre_Bizen.jpg/1200px-Debre_Bizen.jpg"
      },
      { 
        name: "Daga Estifanos (ዳጋ እስጢፋኖስ)", 
        info: "13th Century - Located on Lake Tana. It houses the mummified remains of several medieval Ethiopian Emperors.",
        image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1200"
      },
      {
        name: "Mertule Maryam (መርጡለ ማርያም)",
        info: "The first church in Ethiopia dedicated to the Virgin Mary, located in Gojjam. Known for its architectural grandeur.",
        image: "https://images.unsplash.com/photo-1544013508-222218bcc383?q=80&w=1200"
      },
      { 
        name: "Tana Qirqos (ጣና ቂርቆስ)", 
        info: "Ancient island monastery on Lake Tana. Tradition says it housed the Ark of the Covenant for 800 years.",
        image: "https://images.unsplash.com/photo-1590059125010-826002061215?q=80&w=1200"
      },
      {
        name: "Debre Werq (ደብረ ወርቅ)",
        info: "Established in Gojjam. Known as 'Mountain of Gold', famous for its traditional church education and sacred treasures.",
        image: "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1200"
      },
      { 
        name: "Gunda Gunde (ጉንዳ ጉንዴ)", 
        info: "14th Century - Ewqofos monastery in Tigray. Famous for its manuscript production and strict isolation in a deep canyon.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Debre_Damo_Monastery.jpg/1200px-Debre_Damo_Monastery.jpg"
      }
    ],
    abnet: [
      { name: "Nebab Bet (ንባብ ቤት)", info: "Foundational reading of Ge'ez Fidel and primary prayers." },
      { name: "Zema Bet (ዜማ ቤት)", info: "Sacred music school of St. Yared, teaching Digua, Tsome Digua, and Me'eraf." },
      { name: "Qine Bet (ቅኔ ቤት)", info: "Ge'ez poetry and semantic logic, stressing 'Sem'na Worq' (Wax and Gold)." },
      { name: "Metsehaf Bet (መጽሐፍ ቤት)", info: "Theological interpretation (Andemta) of the Bible and Church Fathers." },
      { name: "Digua Bet (ድጓ ቤት)", info: "Specialization in church hymns, rhythms, and notations created by St. Yared." },
      { name: "Aquaquam (አቋቋም)", info: "Liturgical movements, handling the staff (Maqwamiya) and sisterum (Tsenatsil)." },
      { name: "Qurban Bet (ቁርባን ቤት)", info: "Learning the preparation of the Holy Eucharist (Mewa) and ritual purity." },
      { name: "Felsefena (ፍልስፍና)", info: "Higher level of logic and philosophy within the ecclesiastical school system." }
    ],
    teachers: [
      { name: "Saint Yared (ቅዱስ ያሬድ)", info: "Mother of Ethiopian sacred music and the father of the liturgical notation system." },
      { name: "Abune Tekle Haymanot (አቡነ ተክለ ሃይማኖት)", info: "The pillar of Shewan monasticism who revived the church in the 13th century." },
      { name: "Abune Gebre Menfas Qidus (አቡነ ገብረ መንፈስ ቅዱስ)", info: "The hermit of the animals (Abo) known for his extreme devotion and love for creation." },
      { name: "Abba Giyorgis of Gascha (አባ ጊዮርጊስ ዘጋስጫ)", info: "Prolific author of hymns and theological works like Arganon and Metsehafe Mister." },
      { name: "Abune Selama Kesate Birhan (አቡነ ሰላማ ከሣቴ ብርሃን)", info: "The first Bishop of Ethiopia who brought the light of Christianity in the 4th century." },
      { name: "Abba Pantaleon (አባ ጰንጠሌዎን)", info: "One of the Nine Saints who established many monasteries and translated scriptures." },
      { name: "Abune Samuel of Waldiba (አቡነ ሳሙኤል ዘዋልድባ)", info: "Famous for establishing the strict ascetic tradition in the Waldiba desert." },
      { name: "Abune Ewostatewos (አቡነ ኤዎስጣቴዎስ)", info: "Champion of the Sabbath and founder of the Egyptian-Ethiopian monastic connection." },
      { name: "Walda Haywat (ወልደ ሕይወት)", info: "Rationalist philosopher and author of the Hatata (Inquiry) following Zera Yacob." }
    ],
    holidays: [
      { name: "Meskel (መስቀል)", info: "The Finding of the True Cross by Queen Helena (September 27)." },
      { name: "Timket (ጥምቀት)", info: "The baptism of Christ (Epiphany), celebrated with the procession of Tabots (January 19)." },
      { name: "Genna (ገና)", info: "Ethiopian Nativity celebration including the Gena game (January 7)." },
      { name: "Fasika (ፋሲካ)", info: "Ethiopian Easter (Resurrection of Christ) after a 55-day Great Lent." },
      { name: "Enkutatash (እንቁጣጣሽ)", info: "Ethiopian New Year and feast of St. John the Baptist (September 11)." },
      { name: "Hidar Tsion (ሕዳር ጽዮን)", info: "The arrival of the Ark of the Covenant at Axum (November 30)." },
      { name: "Hosanna (ሆሣዕና)", info: "Palm Sunday, celebrating Christ's triumphal entry into Jerusalem." },
      { name: "Buhe (ቡሄ)", info: "The Transfiguration of Christ (Debre Tabor), known for torches and whips (August 19)." },
      { name: "Asterio Maryam (አስተርዮ ማርያም)", info: "The Dormition of the Virgin Mary (January 29)." },
      { name: "Ba'ata (ባዕታ)", info: "The Presentation of the Virgin Mary in the Temple (December 12)." },
      { name: "Pagume (ጳጉሜ)", info: "The 13th month of the Ethiopian calendar, a period of fasting and prayer." },
      { name: "Paraclitos (ጰራቅሊጦስ)", info: "Pentecost, celebrating the descent of the Holy Spirit on the Apostles." }
    ]
  };

  const currentList = data[activeTab];
  
  const filteredList = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return currentList;
    const allItems = [...data.monasteries, ...data.abnet, ...data.teachers, ...data.holidays];
    return allItems.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.info.toLowerCase().includes(query)
    );
  }, [currentList, searchQuery, activeTab]);

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white dark:bg-zinc-950 pb-32 transition-colors duration-300">
      <div className="bg-[#0ea5e9] px-6 py-10 flex flex-col space-y-6 text-white sticky top-0 z-40 shadow-xl rounded-b-[3rem]">
        <div className="flex items-center space-x-4">
          <AcademicCapIcon className="w-8 h-8 opacity-90" />
          <h1 className="text-2xl font-black tracking-tighter uppercase">{t.search}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id as Language)}
              className={`flex-grow py-2 px-3 rounded-xl text-[10px] font-black transition-all border shadow-lg active:scale-95 ${
                language === lang.id ? 'bg-white text-[#0ea5e9] shadow-xl scale-110' : 'bg-sky-400/20 text-white border-sky-400/30'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <div className="relative group">
          <MagnifyingGlassIcon className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-white/50" />
          <input 
            type="text" 
            placeholder="Search spiritual histories..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="w-full pl-14 pr-6 py-4 bg-sky-400/20 text-white rounded-[1.25rem] border border-sky-400/30 focus:outline-none focus:ring-2 focus:ring-white/30 font-bold placeholder:text-white/40 shadow-inner text-base" 
          />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {!searchQuery && (
          <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-3">
            {['monasteries', 'abnet', 'teachers', 'holidays'].map((id) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                  activeTab === id ? 'bg-[#0ea5e9] text-white shadow-xl' : 'bg-gray-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-gray-100 dark:border-zinc-800'
                }`}
              >
                {t[id] || id}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 animate-in fade-in duration-500">
          {filteredList.map((item: any, i) => (
            <button 
              key={i} 
              onClick={() => navigate(`/content/search?query=${encodeURIComponent(item.name)}`)} 
              className="w-full bg-white dark:bg-zinc-900 rounded-[2rem] shadow-xl border border-gray-100 dark:border-zinc-800 flex flex-col overflow-hidden group transition-all hover:shadow-2xl active:scale-95"
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 bg-sky-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-[#0ea5e9] font-black text-xl shadow-inner group-hover:bg-[#0ea5e9] group-hover:text-white transition-colors">
                    {i + 1}
                  </div>
                  <div className="text-left">
                    <span className="text-xl font-black text-zinc-900 dark:text-zinc-100 group-hover:text-[#0ea5e9] tracking-tight transition-colors">{item.name}</span>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1.5">{item.info}</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-6 h-6 text-[#0ea5e9] group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          ))}

          {filteredList.length === 0 && (
            <div className="py-32 text-center opacity-30">
               <MagnifyingGlassIcon className="w-16 h-16 mx-auto mb-4" />
               <p className="font-black uppercase tracking-widest text-sm">{t.noResults}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BiblePage;
