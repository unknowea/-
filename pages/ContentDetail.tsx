
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeftIcon, MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

const ContentDetail: React.FC<any> = ({ language, fontSize, isBible }) => {
  const { categoryId, bookName } = useParams<{ categoryId?: string; bookName?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const t = TRANSLATIONS[language];
  
  const [list, setList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [detailContent, setDetailContent] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('query');
    const imageParam = params.get('image');

    if (queryParam) {
      handleSelectItem(queryParam, imageParam || undefined);
    } else if (isBible) {
      fetchBibleDetail();
    } else {
      fetchCategoryList();
    }
  }, [categoryId, bookName, language, isBible, location.search]);

  const fetchBibleDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/bible', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookName, language }),
      });
      if (!response.ok) {
        throw new Error('Server returned an error');
      }
      const data = await response.json();
      setDetailContent(data.text || '');
      setImageUrl(`https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=1200`);
    } catch (e) { 
      console.error(e); 
      setDetailContent("Unable to load history at this moment.");
    } finally { setLoading(false); }
  };

  const fetchCategoryList = async () => {
    if (!categoryId || categoryId === 'search') return;
    setLoading(true);
    try {
      const response = await fetch('/api/gemini/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId, language }),
      });
      if (!response.ok) {
        throw new Error('Server returned an error');
      }
      const data = await response.json();
      setList(data || []);
    } catch (e) { 
      console.error(e); 
      setList([]);
    } finally { setLoading(false); }
  };

  const handleSelectItem = async (itemName: string, providedImage?: string) => {
    setSelectedItem(itemName);
    setLoading(true);
    if (providedImage) {
      setImageUrl(providedImage);
    }
    try {
      const response = await fetch('/api/gemini/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName, language }),
      });
      if (!response.ok) {
        throw new Error('Server returned an error');
      }
      const data = await response.json();
      const text = data.text || '';
      
      const tagsMatch = text.match(/IMAGE_TAGS:\s*(.*)/i);
      const cleanContent = text.replace(/IMAGE_TAGS:\s*(.*)/i, '').trim();
      setDetailContent(cleanContent);
      
      if (!providedImage) {
        let keywords = tagsMatch ? tagsMatch[1] : itemName;
        setImageUrl(`https://loremflickr.com/1200/800/${encodeURIComponent(keywords.replace(/[\[\]]/g, ''))}/all`);
      }
    } catch (e) { 
      console.error(e); 
      setDetailContent("Could not fetch details. Please try again.");
    } finally { setLoading(false); }
  };

  const filteredList = useMemo(() => {
    return list.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [list, searchQuery]);

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white dark:bg-zinc-950 pb-32 shadow-xl transition-colors duration-300">
      <div className="sticky top-0 bg-[#0ea5e9] text-white px-6 py-8 flex items-center shadow-lg z-50 rounded-b-[3rem]">
        <button onClick={() => selectedItem ? setSelectedItem(null) : navigate(-1)} className="mr-5 p-2 hover:bg-white/20 rounded-full text-white transition-colors">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-black truncate uppercase leading-none">{selectedItem || bookName || t[categoryId] || 'History'}</h1>
      </div>

      {imageUrl && (selectedItem || isBible) && !loading && (
        <div className="relative w-full h-[32vh] overflow-hidden shadow-lg animate-in fade-in duration-700">
           <img src={imageUrl} className="w-full h-full object-cover brightness-95" alt="Detail" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
           <h2 className="absolute bottom-4 left-6 right-6 text-white text-2xl font-black uppercase drop-shadow-xl tracking-tighter">{selectedItem || bookName}</h2>
        </div>
      )}

      <div className="px-6 pt-8">
        {(selectedItem || isBible) && !loading && (
          <div className="mb-10 border-b-2 border-[#0ea5e9]/10 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black uppercase text-[#0ea5e9] tracking-tighter leading-tight drop-shadow-sm">{selectedItem || bookName}</h2>
            </div>
            <div className="flex items-center space-x-2 bg-sky-50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40 px-3.5 py-1.5 rounded-full shadow-sm animate-pulse">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0ea5e9]">
                {language === 'Amharic' && 'በጉግል የተረጋገጠ ታሪክ (20+ መስመሮች)'}
                {language === 'Geez' && 'በጉግል ዘተረክበ ታሪክ (፳+ መስመሮች)'}
                {language === 'Tigrinya' && 'ብጉግል ዝተረጋገጸ ታሪክ (20+ መስመራት)'}
                {language === 'AfaanOromo' && "Seenaa Google irraa mirkanaa'e (Sarara 20+)"}
                {language === 'English' && 'Grounded via Google Search (20+ Lines)'}
              </span>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-12 h-12 border-4 border-sky-100 border-t-[#0ea5e9] rounded-full animate-spin"></div>
            <p className="mt-5 font-black uppercase tracking-widest text-[#0ea5e9] text-[10px] animate-pulse">Loading Wisdom</p>
          </div>
        ) : selectedItem || isBible ? (
          <article className="text-zinc-800 dark:text-zinc-300 pb-24 prose prose-sky dark:prose-invert max-w-none" style={{ fontSize: `${fontSize}px` }}>
            {detailContent.split('\n').map((line, i) => {
              const trimmed = line.trim();
              if (!trimmed) return <div key={i} className="h-4" />;
              if (trimmed.startsWith('#')) return <h3 key={i} className="text-[#0ea5e9] font-black text-lg mb-3 mt-6 uppercase">{trimmed.replace(/^#+\s*/, '')}</h3>;
              return <p key={i} className="mb-4 font-serif-church leading-relaxed text-justify opacity-90">{trimmed}</p>;
            })}
            <div className="mt-12 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center">
              <p className="text-[#0ea5e9] italic font-serif-church text-base opacity-60 underline decoration-sky-100 dark:decoration-sky-900 underline-offset-8">
                {TRANSLATIONS[language].aboutUnderline}
              </p>
            </div>
          </article>
        ) : (
          <div className="space-y-8">
            <div className="relative group">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 dark:text-zinc-600 group-focus-within:text-[#0ea5e9]" />
              <input 
                type="text" 
                placeholder={t.search} 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                className="w-full pl-14 pr-4 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-[1.25rem] border border-gray-100 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-sky-500/20 font-bold shadow-lg text-base" 
              />
            </div>
            <div className="grid grid-cols-1 gap-5">
              {filteredList.map((item, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleSelectItem(item.name)} 
                  className="w-full flex items-center justify-between p-6 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-xl hover:shadow-2xl hover:border-sky-50 dark:hover:border-sky-900 transition-all text-left group active:scale-95"
                >
                  <div className="flex-grow pr-4">
                    <span className="text-lg font-black text-zinc-900 dark:text-zinc-100 group-hover:text-[#0ea5e9] mb-2 block transition-colors tracking-tight">{item.name}</span>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium line-clamp-3 leading-relaxed">{item.description}</p>
                  </div>
                  <ChevronRightIcon className="w-6 h-6 text-[#0ea5e9] group-hover:translate-x-1.5 transition-transform" />
                </button>
              ))}
              {filteredList.length === 0 && <p className="text-center py-20 opacity-30 font-bold dark:text-zinc-100">No entries found.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetail;
