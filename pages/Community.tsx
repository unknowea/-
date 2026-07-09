
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlusIcon, 
  EnvelopeIcon,
  ChatBubbleLeftEllipsisIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Language } from '../types';
import { TRANSLATIONS, LANGUAGES } from '../constants';

const Community: React.FC<any> = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];

  const handleFeedback = () => {
    window.location.href = "mailto:MeraheTibeb2006@gmail.com?subject=App Feedback";
  };

  const handleContact = () => {
    window.location.href = "mailto:MeraheTibeb2006@gmail.com?subject=Contact Request";
  };

  const getRateUsSubtitle = () => {
    switch(language) {
      case 'Amharic': return 'ኮከብ በመስጠት ይደግፉን';
      case 'Geez': return 'ኮከብ በመስጠት ይደግፉን';
      case 'Tigrinya': return 'ኮኸብ ብምሃብ ይደግፉና';
      case 'AfaanOromo': return 'Sadarkaa Nuuf Kennaa';
      default: return 'Support with 5 Stars';
    }
  };

  const communityActions = [
    { icon: ChatBubbleLeftEllipsisIcon, title: 'Send Feedback', subtitle: 'Share Thoughts', action: handleFeedback },
    { icon: StarIcon, title: t.rateUs, subtitle: getRateUsSubtitle(), action: () => window.open('https://play.google.com/store/apps', '_blank') },
    { icon: UserPlusIcon, title: 'Invite friends', subtitle: 'Grow together', action: () => navigate('/invite-friends') },
    { icon: EnvelopeIcon, title: 'Contact Us', subtitle: 'Reach out', action: handleContact },
  ];

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white dark:bg-zinc-950 pb-32 transition-colors duration-300">
      <div className="bg-[#0ea5e9] p-6 pb-12 rounded-b-[3rem] shadow-xl text-white text-center">
        <h1 className="text-2xl font-serif font-bold mb-6 uppercase tracking-widest">{t.community}</h1>
        <div className="flex flex-wrap justify-center gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setLanguage(lang.id as Language)}
              className={`py-2 px-4 rounded-xl text-[10px] font-black transition-all border shadow-lg active:scale-95 ${
                language === lang.id ? 'bg-white text-[#0ea5e9] shadow-xl scale-110' : 'bg-sky-400/20 text-white border-sky-400/30'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-6">
        <div className="space-y-5">
          {communityActions.map((item, idx) => (
            <button 
              key={idx}
              onClick={item.action} 
              className="w-full flex items-center p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-50 dark:border-zinc-800 shadow-xl hover:shadow-2xl hover:border-sky-50 dark:hover:border-sky-900 transition-all active:scale-95 group"
            >
              <div className="w-14 h-14 bg-sky-50 dark:bg-zinc-800 flex items-center justify-center rounded-2xl mr-5 group-hover:bg-[#0ea5e9] transition-colors shadow-inner">
                <item.icon className="w-7 h-7 text-[#0ea5e9] group-hover:text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">{item.title}</h3>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">{item.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
