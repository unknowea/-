
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, LinkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { Language } from '../types';

interface InviteFriendsProps {
  language: Language;
}

const InviteFriends: React.FC<InviteFriendsProps> = ({ language }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "/#/invite");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white">
      <div className="bg-[#0ea5e9] pt-10 pb-8 rounded-b-[3rem] flex flex-col items-center relative shadow-xl text-white">
        <button onClick={() => navigate(-1)} className="absolute left-6 top-10 p-1.5 hover:bg-white/20 rounded-full transition-colors"><ChevronLeftIcon className="w-5 h-5" /></button>
        <h1 className="text-2xl font-serif font-black tracking-wide uppercase">Invite Friends</h1>
      </div>

      <div className="px-6 py-10 flex flex-col items-center text-center">
        <div className="w-full max-w-[240px] bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-sky-50 p-2 mb-8">
          <img src="https://i.pinimg.com/originals/a0/0a/61/a00a618451f22e86156e52c8038c3539.jpg" alt="Icon" className="w-full rounded-[1.75rem] object-cover" />
        </div>

        <div className="text-center space-y-5 px-4 mb-10">
          <p className="text-xl font-serif text-zinc-800 leading-relaxed italic">"Invite your friends to grow in wisdom and grace."</p>
        </div>

        <button onClick={handleCopyLink} className="flex items-center space-x-3 text-[#0ea5e9] transition-all active:scale-95 mb-12 hover:scale-105">
          <div className="w-12 h-12 bg-sky-50 rounded-[1rem] flex items-center justify-center text-[#0ea5e9] shadow-md">
            <LinkIcon className="w-5 h-5 rotate-45" />
          </div>
          <span className="text-lg font-serif font-bold border-b-2 border-sky-100">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        <button 
          onClick={async () => {
            const shareData = {
              title: 'Merahe Tibeb',
              text: 'Check out Merahe Tibeb - your spiritual history companion!',
              url: window.location.origin + "/#/invite"
            };
            try {
              if (navigator.share) {
                await navigator.share(shareData);
              } else {
                handleCopyLink();
              }
            } catch (err) {
              handleCopyLink();
            }
          }}
          className="w-full bg-[#0ea5e9] text-white py-5 rounded-[2rem] shadow-2xl shadow-sky-500/30 text-lg font-black uppercase tracking-widest active:scale-[0.98] transition-all"
        >
          Share with Family
        </button>
      </div>
    </div>
  );
};

export default InviteFriends;
