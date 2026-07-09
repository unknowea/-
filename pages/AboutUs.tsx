
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

const AboutUs: React.FC<{ language: Language; setLanguage: (lang: Language) => void }> = ({ language, setLanguage }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white pb-32 transition-colors duration-300">
      <div className="pt-20 pb-16 flex flex-col items-center relative bg-[#0ea5e9] rounded-b-[4rem] shadow-xl text-white">
        <button onClick={() => navigate(-1)} className="absolute left-8 top-20 p-2.5 hover:bg-white/20 rounded-full transition-colors text-white">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <div className="w-44 h-44 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 border-4 border-white">
           <img src="https://i.ibb.co/3mS6qfN/merahe-icon.jpg" alt="Icon" className="w-full h-full object-cover" />
        </div>
        <div className="bg-white/10 backdrop-blur-md px-12 py-4 mb-3 rounded-full border border-white/20">
           <h1 className="text-4xl font-black tracking-tighter uppercase">{t.aboutTitle}</h1>
        </div>
        <p className="text-base font-black opacity-80 uppercase tracking-[0.2em]">{t.aboutSubtitle}</p>
      </div>

      <div className="px-8 space-y-12 mt-12 pb-32">
        <div className="w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-50">
          <div className="space-y-10 text-zinc-800 leading-relaxed text-2xl">
            <p className="font-black text-3xl text-[#0ea5e9] mb-6 text-center uppercase tracking-tighter">{t.aboutWelcome}</p>
            <div className="space-y-8 opacity-95">
              {t.aboutBody.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="text-justify whitespace-pre-line font-medium leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <div className="pt-8 border-t-2 border-sky-50 mt-10">
              <div className="text-[#0ea5e9] italic font-black text-center space-y-4 text-2xl">
                <p className="underline underline-offset-[10px] decoration-4 decoration-[#0ea5e9]/20">{t.aboutUnderline}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-2xl">
          <h3 className="text-2xl font-black text-zinc-900 mb-8 uppercase tracking-tighter decoration-[#0ea5e9] decoration-4 underline underline-offset-8">
            {t.getInTouch}
          </h3>
          <div className="space-y-2">
            <h4 className="text-sm font-black text-zinc-300 ml-16 mb-2 uppercase tracking-widest">{t.emailUs}</h4>
            <a href="mailto:MeraheTibeb2006@gmail.com" className="flex items-center space-x-5 group">
              <div className="w-12 h-12 bg-[#0ea5e9] rounded-xl flex items-center justify-center shadow-xl group-active:scale-95 transition-transform text-white">
                <EnvelopeIcon className="w-6 h-6" />
              </div>
              <span className="text-lg font-black text-[#0ea5e9] border-b-2 border-transparent hover:border-sky-400 transition-all tracking-tight">
                MeraheTibeb2006@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
