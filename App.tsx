
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AudioPage from './pages/AudioPage';
import BiblePage from './pages/BiblePage';
import Community from './pages/Community';
import Settings from './pages/Settings';
import AboutUs from './pages/AboutUs';
import NotificationPage from './pages/NotificationPage';
import ContentDetail from './pages/ContentDetail';
import PrayerRequestPage from './pages/PrayerRequestPage';
import InviteFriends from './pages/InviteFriends';
import CalendarPage from './pages/CalendarPage';
import BottomNav from './components/BottomNav';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('appLanguage') as Language) || 'Amharic';
  });
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('appFontSize') || '18');
  });
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('appFontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <HashRouter>
      <div className="main-container flex flex-col bg-white dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
        <main className="flex-grow pb-24">
          <Routes>
            <Route path="/" element={<Home language={language} setLanguage={setLanguage} />} />
            <Route path="/audio" element={<AudioPage language={language} setLanguage={setLanguage} />} />
            <Route path="/bible" element={<BiblePage language={language} setLanguage={setLanguage} />} />
            <Route path="/community" element={<Community language={language} setLanguage={setLanguage} />} />
            <Route path="/calendar" element={<CalendarPage language={language} />} />
            <Route path="/prayer-request" element={<PrayerRequestPage language={language} />} />
            <Route path="/invite-friends" element={<InviteFriends language={language} />} />
            <Route path="/about-us" element={<AboutUs language={language} setLanguage={setLanguage} />} />
            <Route path="/notifications" element={<NotificationPage language={language} />} />
            <Route path="/settings" element={<Settings 
              language={language} 
              setLanguage={setLanguage} 
              fontSize={fontSize}
              setFontSize={setFontSize}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />} />
            <Route path="/content/:categoryId" element={<ContentDetail language={language} fontSize={fontSize} />} />
            <Route path="/content/search" element={<ContentDetail language={language} fontSize={fontSize} />} />
            <Route path="/bible/:bookName" element={<ContentDetail language={language} fontSize={fontSize} isBible />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <BottomNav language={language} />
      </div>
    </HashRouter>
  );
};

export default App;
