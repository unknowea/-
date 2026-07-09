
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, MagnifyingGlassIcon, ArrowsUpDownIcon, HeartIcon as HeartOutline, CheckCircleIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid, ChevronLeftIcon as ChevronLeftSolid } from '@heroicons/react/24/solid';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

const PrayerRequestPage: React.FC<{ language: Language }> = ({ language }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ask' | 'pray'>('ask');
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [submitted, setSubmitted] = useState(false);
  const [prayedSet, setPrayedSet] = useState<Set<string>>(new Set());
  
  const t = TRANSLATIONS[language];

  const initialRequests = [
    { id: '1', name: 'Wolete Maskal', time: '38m ago', request: 'Giving thanks for health and peace in our family.', timestamp: Date.now() - 38 * 60 * 1000, count: 12 },
    { id: '2', name: 'Wolde Senbet', time: '44m ago', request: 'Please pray for my spiritual journey as I study the Abnet school.', timestamp: Date.now() - 44 * 60 * 1000, count: 5 },
    { id: '3', name: 'Kidane Meheret', time: '1h ago', request: 'Asking for protection for our community.', timestamp: Date.now() - 60 * 60 * 1000, count: 24 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !request) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setRequest('');
      setActiveTab('pray');
    }, 2000);
  };

  const togglePray = (id: string) => {
    const next = new Set(prayedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setPrayedSet(next);
  };

  const sortedAndFiltered = useMemo(() => {
    let res = initialRequests.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.request.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return res.sort((a, b) => sortOrder === 'newest' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp);
  }, [searchQuery, sortOrder]);

  return (
    <div className="min-h-screen bg-white text-black pb-32 max-w-xl mx-auto">
      <div className="bg-[#0ea5e9] p-5 pt-10 flex flex-col items-center text-white relative shadow-xl rounded-b-[3rem]">
        <button onClick={() => navigate(-1)} className="absolute left-6 top-10 p-2 hover:bg-white/20 rounded-full transition-colors text-white">
          <ChevronLeftSolid className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black tracking-tighter mb-5 uppercase">{t.prayerRequest}</h1>
        <div className="flex w-full relative bg-sky-400/20 rounded-xl p-1 shadow-inner">
          <button onClick={() => setActiveTab('ask')} className={`flex-1 py-2 text-xs font-black transition-all rounded-lg ${activeTab === 'ask' ? 'bg-white text-[#0ea5e9] shadow-xl' : 'text-white'}`}>{t.ask}</button>
          <button onClick={() => setActiveTab('pray')} className={`flex-1 py-2 text-xs font-black transition-all rounded-lg ${activeTab === 'pray' ? 'bg-white text-[#0ea5e9] shadow-xl' : 'text-white'}`}>{t.pray}</button>
        </div>
      </div>

      <div className="p-6 pt-10">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3 animate-in zoom-in-90">
             <CheckCircleIcon className="w-16 h-16 text-[#0ea5e9]" />
             <h2 className="text-xl font-black text-zinc-900">Request Sent</h2>
             <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px] text-center">The community will pray for you.</p>
          </div>
        ) : activeTab === 'ask' ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-zinc-300 ml-1 tracking-widest">{t.name}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name" 
                className="w-full p-5 bg-white border border-gray-100 rounded-[1.25rem] text-base font-black shadow-lg outline-none focus:ring-2 focus:ring-sky-500/20 transition-all" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase text-zinc-300 ml-1 tracking-widest">{t.request}</label>
              <textarea 
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                placeholder="How can we pray for you?" 
                className="w-full p-5 h-48 bg-white border border-gray-100 rounded-[1.25rem] text-base font-black shadow-lg outline-none focus:ring-2 focus:ring-sky-500/20 transition-all resize-none" 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-4 rounded-xl text-lg font-black bg-[#0ea5e9] text-white shadow-2xl shadow-sky-500/40 active:scale-95 transition-transform uppercase tracking-tighter"
            >
              {t.submit}
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="relative flex-grow">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search prayers" 
                  className="w-full pl-12 pr-6 py-4 bg-white rounded-[1.25rem] border border-gray-100 text-xs font-black shadow-lg outline-none" 
                />
              </div>
              <button onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')} className="flex items-center px-4 py-4 bg-sky-50 border border-sky-100 rounded-2xl text-[#0ea5e9] font-black uppercase text-[10px] shadow-lg active:scale-95 transition-transform">
                <ArrowsUpDownIcon className="w-4 h-4 mr-2" />
                {sortOrder === 'newest' ? t.newest : t.oldest}
              </button>
            </div>
            <div className="space-y-6">
              {sortedAndFiltered.map((item) => (
                <div key={item.id} className="bg-white rounded-[2rem] p-6 border border-gray-50 flex items-start space-x-5 shadow-xl hover:shadow-2xl transition-all group">
                  <div className="w-12 h-12 bg-sky-50 rounded-[1rem] flex items-center justify-center text-[#0ea5e9] shadow-inner group-hover:bg-[#0ea5e9] group-hover:text-white transition-colors"><UserIcon className="w-6 h-6" /></div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-3">
                       <h4 className="text-lg font-black text-zinc-800 tracking-tight">{item.name}</h4>
                       <span className="text-[10px] font-bold text-zinc-300">{item.time}</span>
                    </div>
                    <p className="text-base text-zinc-500 leading-relaxed font-medium mb-5 opacity-90">{item.request}</p>
                    <button 
                      onClick={() => togglePray(item.id)}
                      className={`flex items-center space-x-3 px-6 py-2.5 rounded-full active:scale-95 transition-all shadow-md ${prayedSet.has(item.id) ? 'bg-[#0ea5e9] text-white' : 'bg-sky-50 text-[#0ea5e9]'}`}
                    >
                      {prayedSet.has(item.id) ? <HeartSolid className="w-5 h-5" /> : <HeartOutline className="w-5 h-5" />}
                      <span className="text-[10px] font-black uppercase tracking-widest">{prayedSet.has(item.id) ? 'Prayed' : 'Pray'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerRequestPage;
