
import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { LANGUAGES, TRANSLATIONS } from '../constants';
import { 
  PlayIcon, 
  PauseIcon, 
  MicrophoneIcon, 
  ArrowDownTrayIcon, 
  ArrowPathIcon,
  XMarkIcon,
  ForwardIcon,
  BackwardIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/solid';

// Helper: Decode Base64 to Uint8Array
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper: Convert Raw PCM (16-bit) to a WAV Blob for standard <audio> usage
function pcmToWav(pcmData: Int16Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + pcmData.length * 2);
  const view = new DataView(buffer);
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + pcmData.length * 2, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true); // Byte rate
  view.setUint16(32, 2, true); // Block align
  view.setUint16(34, 16, true); // Bits per sample
  writeString(36, 'data');
  view.setUint32(40, pcmData.length * 2, true);
  let offset = 44;
  for (let i = 0; i < pcmData.length; i++, offset += 2) {
    view.setInt16(offset, pcmData[i], true);
  }
  return new Blob([buffer], { type: 'audio/wav' });
}

const AudioPage: React.FC<any> = ({ language, setLanguage }) => {
  const [activeTab, setActiveTab] = useState<'monasteries' | 'abnet' | 'teachers' | 'holidays'>('monasteries');
  const [playingItem, setPlayingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<{ message: string; details?: string } | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const t = TRANSLATIONS[language];

  const data = {
    monasteries: [
      { 
        name: "Debre Damo (ደብረ ዳሞ)", 
        info: "6th Century - Founded by Abune Aregawi. Accessible only by rope climb.", 
        prompt: "Spiritual history of Debre Damo monastery, the rope climb, and its Aksumite origins.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Debre_Damo_Monastery.jpg/1200px-Debre_Damo_Monastery.jpg"
      },
      { 
        name: "Axum Tsion (አክሱም ጽዮን)", 
        info: "4th Century - Home of the Ark of the Covenant.", 
        prompt: "Comprehensive history of Aksum Tsion and the Ark of the Covenant.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Church_of_Our_Lady_Mary_of_Zion%2C_Aksum.jpg/1200px-Church_of_Our_Lady_Mary_of_Zion%2C_Aksum.jpg"
      },
      { 
        name: "Debre Libanos (ደብረ ሊባኖስ)", 
        info: "13th Century - Founded by Saint Tekle Haymanot.", 
        prompt: "Life of Tekle Haymanot and the founding of the Shewan spiritual center.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Debre_Libanos_Monastery.jpg/1200px-Debre_Libanos_Monastery.jpg"
      },
      { 
        name: "Waldiba (ዋልድባ)", 
        info: "14th Century - The spiritual desert of ascetics.", 
        prompt: "Immersive spiritual description of Waldiba and its role in Ethiopian monasticism.",
        image: "https://images.unsplash.com/photo-1544013508-222218bcc383?q=80&w=1200"
      }
    ],
    abnet: [
      { name: "Zema Bet (ዜማ ቤት)", info: "Liturgical Chant", prompt: "The training of Saint Yared's music. Explain Ge'ez, Ezel, and Araray modes." },
      { name: "Qine Bet (ቅኔ ቤት)", info: "Poetry & Logic", prompt: "The artistic depths of Ge'ez poetry and the 'Wax and Gold' philosophy." },
      { name: "Metsehaf Bet (መጽሐፍ ቤት)", info: "Interpretation", prompt: "The path of interpreting the Bible in the Tewahedo tradition." }
    ],
    teachers: [
      { name: "Saint Yared (ቅዱስ ያሬድ)", info: "The Father of Music", prompt: "Exhaustive biography of Saint Yared and the origin of divine music." },
      { name: "Tekle Haymanot (ተክለ ሃይማኖት)", info: "The Great Light", prompt: "Full life history, miracles, and legacy of Abune Tekle Haymanot." }
    ],
    holidays: [
      { name: "Meskel (መስቀል)", info: "True Cross", prompt: "The history of Queen Helena and the discovery of the True Cross." },
      { name: "Timket (ጥምቀት)", info: "Epiphany", prompt: "Scriptural meaning of Timket and the blessing of the waters." }
    ]
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const changeSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5, 2];
    const nextIndex = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const newSpeed = speeds[nextIndex];
    setPlaybackRate(newSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = newSpeed;
    }
  };

  const downloadAudio = async () => {
    if (audioUrl) {
      setIsDownloading(true);
      try {
        // Simple delay to show the spinner/feedback as requested
        await new Promise(resolve => setTimeout(resolve, 800));
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `${playingItem?.name || 'History'}.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.error("Download failed", e);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const generateAudio = async (item: any) => {
    setPlayingItem(item);
    setIsLoading(true);
    setError(null);
    setAudioUrl(null);
    setIsPlaying(false);

    try {
      const response = await fetch('/api/gemini/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName: item.name, prompt: item.prompt, language }),
      });
      if (!response.ok) {
        throw new Error('Server returned an error');
      }
      const data = await response.json();
      const base64Audio = data.audioBase64;
      if (!base64Audio) throw new Error("The narration service is currently unavailable.");

      const rawData = decodeBase64(base64Audio);
      const int16Data = new Int16Array(rawData.buffer);
      const wavBlob = pcmToWav(int16Data, 24000);
      const url = URL.createObjectURL(wavBlob);
      
      setAudioUrl(url);
      
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: item.name,
          artist: 'መራሔ ጥበብ',
          album: t[activeTab],
          artwork: [{ src: 'https://i.ibb.co/3mS6qfN/merahe-icon.jpg', sizes: '512x512', type: 'image/jpeg' }]
        });
        
        navigator.mediaSession.setActionHandler('play', () => audioRef.current?.play());
        navigator.mediaSession.setActionHandler('pause', () => audioRef.current?.pause());
        navigator.mediaSession.setActionHandler('seekbackward', () => { if(audioRef.current) audioRef.current.currentTime -= 10; });
        navigator.mediaSession.setActionHandler('seekforward', () => { if(audioRef.current) audioRef.current.currentTime += 10; });
      }

    } catch (err: any) {
      setError({ 
        message: "Unable to start the history audio.", 
        details: "Please check your internet connection and try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-white dark:bg-zinc-950 pb-72 transition-colors duration-300">
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onTimeUpdate={handleAudioTimeUpdate} 
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}

      <div className="bg-[#0ea5e9] p-5 pb-10 rounded-b-[3rem] shadow-lg text-white text-center">
        <MicrophoneIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
        <h1 className="text-3xl font-serif font-black uppercase mb-6 tracking-wider">{t.audio}</h1>
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
        <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-3">
          {Object.keys(data).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat as any)}
              className={`flex-shrink-0 px-6 py-3 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                activeTab === cat ? 'bg-[#0ea5e9] text-white shadow-xl' : 'bg-gray-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-gray-100 dark:border-zinc-800'
              }`}
            >
              {t[cat] || cat}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 p-8 rounded-[3rem] text-center animate-in zoom-in-95">
             <ExclamationCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
             <p className="text-xl text-red-800 dark:text-red-200 font-black mb-2">{error.message}</p>
             <p className="text-sm text-red-600 dark:text-red-400 mb-8">{error.details}</p>
             <button 
               onClick={() => playingItem && generateAudio(playingItem)} 
               className="bg-red-500 text-white px-10 py-5 rounded-[1.5rem] font-black text-sm uppercase shadow-xl active:scale-95 transition-transform"
             >
               Retry History
             </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5">
          {data[activeTab].map((item: any, idx: number) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => generateAudio(item)}
              className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all active:scale-[0.98] ${
                playingItem?.name === item.name 
                  ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800 shadow-inner' 
                  : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-xl hover:shadow-2xl hover:border-sky-200 dark:hover:border-sky-900'
              }`}
            >
              <div className="flex items-center space-x-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all overflow-hidden relative ${
                  playingItem?.name === item.name ? 'bg-[#0ea5e9] text-white shadow-lg' : 'bg-gray-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-600'
                }`}>
                  {item.image && (
                    <img src={item.image} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${playingItem?.name === item.name ? 'opacity-20' : 'opacity-100'}`} alt="" referrerPolicy="no-referrer" />
                  )}
                  <div className="relative z-10">
                    {playingItem?.name === item.name && isLoading ? <ArrowPathIcon className="w-8 h-8 animate-spin" /> : 
                     playingItem?.name === item.name && isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8 ml-1" />}
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-100 leading-tight tracking-tight">{item.name}</h3>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">{item.info}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {(playingItem || isLoading) && (
        <div className="fixed bottom-24 left-4 right-4 z-[60] animate-in slide-in-from-bottom-10">
          <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-sky-50 dark:border-sky-900 p-6">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3 overflow-hidden">
                   <div className="w-14 h-14 bg-[#0ea5e9] rounded-[1rem] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      {isLoading ? <ArrowPathIcon className="w-6 h-6 animate-spin" /> : <MicrophoneIcon className="w-6 h-6" />}
                   </div>
                   <div className="overflow-hidden">
                      <h4 className="text-lg font-black text-zinc-900 dark:text-zinc-100 truncate w-40 tracking-tight">{playingItem?.name || 'Preparing...'}</h4>
                      <p className="text-[10px] text-[#0ea5e9] font-black uppercase tracking-widest leading-none mt-1">{t[activeTab]}</p>
                   </div>
                </div>
                <div className="flex items-center space-x-2">
                   <button 
                     onClick={changeSpeed}
                     className="px-3 py-1.5 bg-sky-50 dark:bg-sky-900/30 rounded-xl text-[10px] font-black text-[#0ea5e9] shadow-sm border border-sky-100 dark:border-sky-800 active:scale-90"
                   >
                     {playbackRate}x
                   </button>
                   {audioUrl && (
                     <button 
                       onClick={downloadAudio} 
                       disabled={isDownloading}
                       className="p-2 text-zinc-300 dark:text-zinc-600 hover:text-[#0ea5e9] transition-colors relative active:scale-90"
                     >
                       {isDownloading ? <ArrowPathIcon className="w-5 h-5 animate-spin" /> : <ArrowDownTrayIcon className="w-5 h-5" />}
                     </button>
                   )}
                   <button onClick={() => { setPlayingItem(null); setAudioUrl(null); }} className="p-2 text-zinc-300 dark:text-zinc-600 hover:text-red-400 transition-colors active:scale-90">
                     <XMarkIcon className="w-5 h-5" />
                   </button>
                </div>
             </div>
             <div className="space-y-2 mb-6">
                <input 
                  type="range" 
                  min="0" 
                  max={duration || 100} 
                  value={currentTime} 
                  onChange={handleSeek} 
                  className="w-full h-3 bg-sky-50 dark:bg-sky-900/30 rounded-lg appearance-none cursor-pointer accent-[#0ea5e9]" 
                />
                <div className="flex justify-between text-[10px] font-black text-zinc-400 dark:text-zinc-500 px-1">
                   <span>{formatTime(currentTime)}</span>
                   <span>{formatTime(duration)}</span>
                </div>
             </div>
             <div className="flex items-center justify-center space-x-8">
                <button onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)} className="text-zinc-200 dark:text-zinc-700 hover:text-sky-400 transition-colors active:scale-90">
                   <BackwardIcon className="w-8 h-8" />
                </button>
                <button onClick={togglePlay} disabled={isLoading} className="w-16 h-16 bg-[#0ea5e9] rounded-full flex items-center justify-center text-white shadow-2xl shadow-sky-500/40 active:scale-90 transition-transform">
                   {isPlaying ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8 ml-1" />}
                </button>
                <button onClick={() => audioRef.current && (audioRef.current.currentTime += 10)} className="text-zinc-200 dark:text-zinc-700 hover:text-sky-400 transition-colors active:scale-90">
                   <ForwardIcon className="w-8 h-8" />
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPage;
