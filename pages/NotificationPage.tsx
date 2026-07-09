
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeftIcon, 
  ClockIcon, 
  HandThumbUpIcon, 
  LanguageIcon,
  AcademicCapIcon
} from '@heroicons/react/24/solid';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

const NotificationPage: React.FC<{ language: Language }> = ({ language }) => {
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];
  const [selectedNotifLang, setSelectedNotifLang] = useState<string>('English');
  
  const [reminders, setReminders] = useState({
    prayer: { enabled: true, time: '06:00' },
    reading: { enabled: false, time: '20:00' }
  });

  const toggleReminder = (key: 'prayer' | 'reading') => {
    setReminders(prev => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled }
    }));
  };

  const handleTimeChange = (key: 'prayer' | 'reading', time: string) => {
    setReminders(prev => ({
      ...prev,
      [key]: { ...prev[key], time }
    }));
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white pb-32">
      <div className="bg-[#0ea5e9] pt-14 pb-12 rounded-b-[3.5rem] flex items-center px-6 relative shadow-lg text-white">
        <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white mr-4"><ChevronLeftIcon className="w-6 h-6" /></button>
        <h1 className="text-3xl font-serif-church font-medium tracking-wide">Notifications</h1>
      </div>

      <div className="px-5 pt-10 space-y-6">
        <div className="bg-gray-50 p-1 border border-gray-100 rounded-full flex gap-1 mb-10 shadow-inner">
          {['English', 'Amharic', 'Tigrinya'].map((label) => (
            <button
              key={label}
              onClick={() => setSelectedNotifLang(label)}
              className={`flex-grow py-3 px-4 rounded-full text-lg font-serif-church font-bold transition-all ${
                selectedNotifLang === label ? 'bg-[#0ea5e9] text-white shadow-lg' : 'text-zinc-400 hover:bg-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {[
            { id: 'prayer' as const, icon: HandThumbUpIcon, title: 'Prayer Reminder' },
            { id: 'reading' as const, icon: AcademicCapIcon, title: 'Reading Reminder' }
          ].map((item) => (
            <div key={item.id} className={`bg-white rounded-[1.5rem] p-7 shadow-xl border transition-all ${reminders[item.id].enabled ? 'border-sky-100' : 'border-gray-50 opacity-60'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-6 shadow-md ${reminders[item.id].enabled ? 'bg-sky-50 text-[#0ea5e9]' : 'bg-gray-100 text-zinc-400'}`}>
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-zinc-900">{item.title}</h3>
                </div>
                <button 
                  onClick={() => toggleReminder(item.id)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 shadow-inner ${reminders[item.id].enabled ? 'bg-[#0ea5e9]' : 'bg-zinc-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 ${reminders[item.id].enabled ? 'translate-x-6' : ''}`} />
                </button>
              </div>
              
              <div className="flex items-center justify-between pl-20">
                <div className="flex items-center text-zinc-400">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span className="text-xl font-serif">{reminders[item.id].time}</span>
                </div>
                <input 
                  type="time" 
                  value={reminders[item.id].time}
                  onChange={(e) => handleTimeChange(item.id, e.target.value)}
                  className="bg-sky-50 text-[#0ea5e9] px-4 py-2 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-sky-200 shadow-sm"
                />
              </div>
            </div>
          ))}
          <div className="bg-white rounded-[1.5rem] p-7 shadow-xl border border-gray-50 flex items-center">
            <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mr-6 text-[#0ea5e9] shadow-md"><LanguageIcon className="w-7 h-7" /></div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-zinc-900 leading-tight">Notification language</h3>
              <div className="flex items-center text-[#0ea5e9] font-black mt-1 uppercase text-xs tracking-widest">{selectedNotifLang}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
