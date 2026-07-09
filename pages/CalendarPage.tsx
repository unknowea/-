import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Info, 
  X, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Language } from '../types';
import { 
  MONTH_NAMES, 
  WEEKDAYS, 
  HOLIDAYS_BY_MONTH, 
  toGeezNumeral, 
  gregorianToEthiopian, 
  ethiopianToGregorian, 
  getDaysInEthiopianMonth,
  HolidayDetail
} from '../components/calendarData';

interface CalendarPageProps {
  language: Language;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ language }) => {
  // Get today's Ethiopian date for initial state
  const todayGreg = new Date();
  const todayEt = gregorianToEthiopian(todayGreg);

  const [currentYear, setCurrentYear] = useState<number>(todayEt.year);
  const [currentMonth, setCurrentMonth] = useState<number>(todayEt.month);
  const [selectedDay, setSelectedDay] = useState<number | null>(todayEt.day);
  const [selectedHoliday, setSelectedHoliday] = useState<HolidayDetail | null>(null);

  // Sync selection when month changes
  useEffect(() => {
    // If we are looking at the current Ethiopian month/year, default to today.
    if (currentYear === todayEt.year && currentMonth === todayEt.month) {
      setSelectedDay(todayEt.day);
    } else {
      setSelectedDay(1); // default to first of the month
    }
  }, [currentMonth, currentYear]);

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(13);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 13) {
      setCurrentMonth(1);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const handleGoToToday = () => {
    setCurrentYear(todayEt.year);
    setCurrentMonth(todayEt.month);
    setSelectedDay(todayEt.day);
  };

  // Calculations for current month view
  const daysInMonth = getDaysInEthiopianMonth(currentYear, currentMonth);
  const firstDayGreg = ethiopianToGregorian(currentYear, currentMonth, 1);
  const startDayOfWeek = firstDayGreg.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Date range formatted subtitle
  const lastDayGreg = ethiopianToGregorian(currentYear, currentMonth, daysInMonth);
  
  const formatDateRangeSubtitle = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const startStr = firstDayGreg.toLocaleDateString(language === 'English' ? 'en-US' : 'am-ET', options);
    const endStr = lastDayGreg.toLocaleDateString(language === 'English' ? 'en-US' : 'am-ET', options);
    return `${startStr} - ${endStr}`;
  };

  // Check if a specific day is "today"
  const isToday = (day: number) => {
    return (
      currentYear === todayEt.year &&
      currentMonth === todayEt.month &&
      day === todayEt.day
    );
  };

  // Get holidays for the current month
  const monthHolidays = HOLIDAYS_BY_MONTH[currentMonth] || [];

  // Find holiday for a specific day
  const getHolidayForDay = (day: number) => {
    return monthHolidays.find(h => h.day === day) || null;
  };

  // Helper to translate labels
  const getUIString = (key: string) => {
    const strings: Record<string, Record<Language, string>> = {
      today: {
        Amharic: 'ዛሬ',
        Geez: 'ዛሬ',
        Tigrinya: 'ሎሚ',
        English: 'Today',
        AfaanOromo: 'Harr\'a'
      },
      holidaysTitle: {
        Amharic: 'የወሩ በዓላትና አጽዋማት',
        Geez: 'በዓላት ወአጽዋማት ዘወርኅ',
        Tigrinya: 'በዓላትን አጽዋማትን ናይቲ ወርሒ',
        English: 'Holidays & Fasts of the Month',
        AfaanOromo: 'Ayyaanaafi Sooma Ji\'ichaa'
      },
      noHolidays: {
        Amharic: 'በዚህ ወር የተመዘገቡ ታላላቅ በዓላት የሉም።',
        Geez: 'በዝ ወርኅ አልቦ በዓላት ዘተጻሕፈ።',
        Tigrinya: 'ኣብዚ ወርሒ ዝተመዝገቡ ዓበይቲ በዓላት የለዉን።',
        English: 'No major holidays recorded for this month.',
        AfaanOromo: 'Ayyaanni gurguddaan ji\'a kana keessatti hin argamu.'
      },
      majorFeast: {
        Amharic: 'አቢይ በዓል',
        Geez: 'ዓቢይ በዓል',
        Tigrinya: 'ዓብዪ በዓል',
        English: 'Major Feast',
        AfaanOromo: 'Ayyaana Guddaa'
      },
      minorFeast: {
        Amharic: 'ንዑስ በዓል',
        Geez: 'ንዑስ በዓል',
        Tigrinya: 'ንእሽቶ በዓል',
        English: 'Minor Feast',
        AfaanOromo: 'Ayyaana Xiqqaa'
      },
      fastDay: {
        Amharic: 'የጾም ዕለት',
        Geez: 'ዕለተ ጾም',
        Tigrinya: 'መዓልቲ ጾም',
        English: 'Fast Day',
        AfaanOromo: 'Guyyaa Soomaa'
      },
      close: {
        Amharic: 'ዝጋ',
        Geez: 'ዕፁ',
        Tigrinya: 'ዕጸው',
        English: 'Close',
        AfaanOromo: 'Cufi'
      },
      detailsTitle: {
        Amharic: 'የበዓሉ ዝርዝር ማብራሪያ',
        Geez: 'ትርጓሜ በዓል',
        Tigrinya: 'ዝርዝር መብርሂ በዓል',
        English: 'Holiday Details',
        AfaanOromo: 'Ibsa Ayyaanaa'
      },
      historyTitle: {
        Amharic: 'ታሪካዊ ማብራሪያና ትውፊት',
        Geez: 'ታሪካዊ ማብራሪያና ትውፊት',
        Tigrinya: 'ታሪካዊ መብርሂን ትውፊትን',
        English: 'Historical Narration & Tradition',
        AfaanOromo: 'Seenaa fi Duudhaa'
      }
    };
    return strings[key]?.[language] || strings[key]?.['English'];
  };

  // Get active holiday detail based on selection
  const activeHoliday = selectedDay ? getHolidayForDay(selectedDay) : null;

  return (
    <div className="max-w-xl mx-auto min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-32 transition-colors duration-300">
      {/* Header Banner */}
      <div className="bg-[#0ea5e9] p-6 pb-12 rounded-b-[3rem] shadow-xl text-white text-center relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <button 
            onClick={handleGoToToday}
            className="flex items-center gap-1 bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white text-xs font-black py-1.5 px-3 rounded-full uppercase tracking-wider shadow-inner"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            {getUIString('today')}
          </button>
          <span className="text-xs font-black uppercase tracking-widest bg-white/10 py-1 px-3 rounded-full">
            Ethiopian Calendar
          </span>
          <div className="w-16"></div> {/* Spacer to align */}
        </div>

        {/* Month Selector */}
        <div className="flex items-center justify-between gap-2 my-5 relative z-10">
          <button 
            onClick={handlePrevMonth}
            className="w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/25 active:scale-95 transition-all rounded-full text-white shadow"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold tracking-tight">
              {MONTH_NAMES[language][currentMonth - 1]} {currentYear}
            </h1>
            <p className="text-[11px] text-sky-100 font-bold uppercase tracking-widest mt-1.5 opacity-90">
              {formatDateRangeSubtitle()}
            </p>
          </div>

          <button 
            onClick={handleNextMonth}
            className="w-10 h-10 flex items-center justify-center bg-white/15 hover:bg-white/25 active:scale-95 transition-all rounded-full text-white shadow"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-4 space-y-6 -mt-6 relative z-10">
        {/* Calendar Grid Card */}
        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-xl p-5">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {WEEKDAYS[language].map((dayName, idx) => (
              <span 
                key={idx} 
                className={`text-[11px] font-black uppercase tracking-widest text-center py-1 ${
                  idx === 0 ? 'text-red-500' : 'text-zinc-400 dark:text-zinc-500'
                }`}
              >
                {dayName}
              </span>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-y-2 gap-x-1">
            {/* Empty cells for starting offset */}
            {Array.from({ length: startDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="aspect-square"></div>
            ))}

            {/* Active days of the month */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const cellGreg = ethiopianToGregorian(currentYear, currentMonth, day);
              const isCellToday = isToday(day);
              const isSelected = selectedDay === day;
              const holiday = getHolidayForDay(day);

              // Gregorian short formatted day inside the cell
              const cellGregStr = cellGreg.toLocaleDateString(language === 'English' ? 'en-US' : 'am-ET', {
                month: 'short',
                day: 'numeric'
              });

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-between p-1.5 transition-all duration-200 active:scale-90 border relative ${
                    isSelected
                      ? 'bg-[#0ea5e9] border-[#0ea5e9] text-white shadow-lg shadow-sky-500/20'
                      : isCellToday
                      ? 'bg-sky-50 dark:bg-sky-950/40 border-[#0ea5e9] text-[#0ea5e9] font-black'
                      : 'bg-transparent border-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                  }`}
                >
                  {/* Top: Ge'ez Numeral */}
                  <span className={`text-xs font-serif font-black ${isSelected ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {toGeezNumeral(day)}
                  </span>

                  {/* Middle: Arabic Numeral in Parentheses */}
                  <span className={`text-[10px] opacity-75 leading-none ${isSelected ? 'text-white/95' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {day}
                  </span>

                  {/* Bottom: Gregorian day */}
                  <span className={`text-[8px] font-bold tracking-tighter uppercase leading-none ${
                    isSelected ? 'text-white/80' : isCellToday ? 'text-[#0ea5e9]' : 'text-zinc-400 dark:text-zinc-500'
                  }`}>
                    {cellGregStr}
                  </span>

                  {/* Holiday Dot Indicator */}
                  {holiday && (
                    <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${
                      isSelected 
                        ? 'bg-white' 
                        : holiday.type === 'major' 
                        ? 'bg-sky-500' 
                        : holiday.type === 'fast' 
                        ? 'bg-indigo-500' 
                        : 'bg-emerald-500'
                    }`}></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Info panel (collapsible summary card) */}
        {selectedDay && (
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-900 border border-sky-100 dark:border-zinc-800 rounded-3xl p-5 shadow-lg relative overflow-hidden transition-all duration-300">
            {/* Background decoration */}
            <div className="absolute right-0 top-0 opacity-10 dark:opacity-5 pointer-events-none">
              <Sparkles className="w-24 h-24 text-sky-500 -mr-4 -mt-4" />
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-[10px] text-sky-600 dark:text-sky-400 font-bold uppercase tracking-widest">
                  Selected Date • የተመረጠ ቀን
                </h4>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-serif mt-1">
                  {MONTH_NAMES[language][currentMonth - 1]} {toGeezNumeral(selectedDay)} ({selectedDay}), {currentYear}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Gregorian: {ethiopianToGregorian(currentYear, currentMonth, selectedDay).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            {/* Display active holiday of the selected day */}
            {activeHoliday ? (
              <div className="mt-4 pt-4 border-t border-sky-200/50 dark:border-zinc-800 space-y-3">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm ${
                    activeHoliday.type === 'major' 
                      ? 'bg-sky-500 text-white' 
                      : activeHoliday.type === 'fast'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}>
                    {getUIString(activeHoliday.type === 'major' ? 'majorFeast' : activeHoliday.type === 'fast' ? 'fastDay' : 'minorFeast')}
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#0ea5e9]" />
                    Saints Commemoration
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-zinc-950 dark:text-zinc-50 leading-snug">
                    {activeHoliday.name[language]}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-1.5 leading-relaxed line-clamp-3">
                    {activeHoliday.desc[language]}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedHoliday(activeHoliday)}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#0ea5e9] hover:text-sky-600 dark:text-sky-400 transition-colors uppercase tracking-wider mt-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  Read Full History
                </button>
              </div>
            ) : (
              <div className="mt-3 pt-3 border-t border-sky-200/10 dark:border-zinc-800">
                <p className="text-xs italic text-zinc-400 dark:text-zinc-500">
                  Daily saints commemoration and liturgical readings apply. Click other days to see recorded holidays.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Month Holidays List Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-100 uppercase tracking-wider font-serif">
              {getUIString('holidaysTitle')}
            </h2>
            <span className="text-[10px] font-black text-[#0ea5e9] bg-sky-50 dark:bg-sky-950/40 px-3 py-1 rounded-full uppercase tracking-wider border border-sky-100 dark:border-sky-950">
              {monthHolidays.length} Events
            </span>
          </div>

          {monthHolidays.length > 0 ? (
            <div className="space-y-3">
              {monthHolidays.map((holiday, idx) => {
                const isSelected = selectedDay === holiday.day;
                const holGreg = ethiopianToGregorian(currentYear, currentMonth, holiday.day);
                
                return (
                  <button 
                    key={idx}
                    onClick={() => {
                      setSelectedDay(holiday.day);
                      setSelectedHoliday(holiday);
                    }}
                    className={`w-full flex items-center p-4 rounded-[2rem] border transition-all active:scale-95 text-left group shadow ${
                      isSelected
                        ? 'bg-sky-500/5 dark:bg-sky-500/5 border-sky-400 shadow-md scale-[1.01]'
                        : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 hover:border-sky-100 dark:hover:border-sky-950'
                    }`}
                  >
                    {/* Day Square */}
                    <div className="w-14 h-14 bg-sky-500/10 dark:bg-zinc-800 flex flex-col items-center justify-center rounded-2xl mr-4 group-hover:bg-[#0ea5e9]/10 transition-colors shrink-0 shadow-inner">
                      <span className="text-lg font-black text-sky-600 dark:text-sky-400 leading-none">
                        {holiday.day}
                      </span>
                      <span className="text-[9px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
                        {MONTH_NAMES[language][currentMonth - 1].slice(0, 4)}
                      </span>
                    </div>

                    {/* Information */}
                    <div className="grow min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                          holiday.type === 'major' 
                            ? 'bg-sky-500 text-white' 
                            : holiday.type === 'fast'
                            ? 'bg-indigo-500 text-white'
                            : 'bg-emerald-500 text-white'
                        }`}>
                          {getUIString(holiday.type === 'major' ? 'majorFeast' : holiday.type === 'fast' ? 'fastDay' : 'minorFeast')}
                        </span>
                        <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-bold">
                          {holGreg.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-zinc-900 dark:text-zinc-100 truncate group-hover:text-[#0ea5e9] transition-colors">
                        {holiday.name[language]}
                      </h3>
                    </div>

                    <ChevronRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-[#0ea5e9] shrink-0 transition-transform group-hover:translate-x-1" />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 px-4 bg-white dark:bg-zinc-900 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow">
              <CalendarIcon className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
              <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500">
                {getUIString('noHolidays')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Detail Modal / Dialog */}
      {selectedHoliday && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 shadow-2xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden animate-scale-up">
            {/* Modal Header */}
            <div className="bg-[#0ea5e9] p-6 text-white text-center relative overflow-hidden flex-none">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
              
              <button 
                onClick={() => setSelectedHoliday(null)}
                className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-black/10 hover:bg-black/20 text-white rounded-full transition-all active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              <span className={`text-[9px] font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full inline-block mb-3`}>
                {getUIString(selectedHoliday.type === 'major' ? 'majorFeast' : selectedHoliday.type === 'fast' ? 'fastDay' : 'minorFeast')}
              </span>

              <h2 className="text-xl font-serif font-black tracking-tight px-4 leading-tight">
                {selectedHoliday.name[language]}
              </h2>

              <p className="text-[10px] text-sky-100 font-bold uppercase tracking-widest mt-2">
                {MONTH_NAMES[language][currentMonth - 1]} {selectedHoliday.day} • {ethiopianToGregorian(currentYear, currentMonth, selectedHoliday.day).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-grow">
              <div>
                <h4 className="text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest mb-1.5">
                  {getUIString('detailsTitle')}
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium whitespace-pre-line">
                  {selectedHoliday.desc[language]}
                </p>
              </div>

              {/* Long History Narration Section */}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5">
                <h4 className="text-[10px] text-[#0ea5e9] dark:text-sky-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {getUIString('historyTitle')}
                </h4>
                <div className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line bg-sky-50/25 dark:bg-zinc-950/40 p-4 rounded-2xl border border-sky-100/20 dark:border-zinc-800/20">
                  {getHolidayHistory(currentMonth, selectedHoliday.day, language)}
                </div>
              </div>

              {/* Liturgical quote background card */}
              <div className="bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100/40 dark:border-sky-950/40 p-4 rounded-2xl">
                <p className="text-xs italic text-sky-800 dark:text-sky-300 font-medium leading-relaxed">
                  "የቅዱሳን መታሰቢያ ለበረከት ነው፤ የጻድቅ ስም ለዘላለም ይኖራል" — ምሳሌ 10፥7
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-center flex-none">
              <button 
                onClick={() => setSelectedHoliday(null)}
                className="w-full bg-[#0ea5e9] text-white font-black py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-sky-600 active:scale-95 transition-all uppercase text-[11px] tracking-widest"
              >
                {getUIString('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getHolidayHistory = (month: number, day: number, lang: Language): string => {
  const histories: Record<string, Record<Language, string>> = {
    '1-1': {
      Amharic: `ርዕሰ ዓውደ ዓመት (እንቁጣጣሽ) የኢትዮጵያ አዲስ ዓመት መጀመሪያ ሲሆን ታላቅ ታሪካዊና መንፈሳዊ ትርጉም አለው።

በአንደኛው ወገን የኖኅ የቃልኪዳን ቀስተ ደመና የታየበት እና የጥፋት ውሃ መድረቁ የተበሰረበት ዕለት ነው። በሌላ በኩል ደግሞ የሳባ ንግሥት ከንጉሥ ሰሎሞን ዘንድ ተመልሳ ስትመጣ ለሠራዊቷና ለሕዝቧ "እንቁ ዕንቁ ለቤተመቅደስ ማጌጫ ይሁን" በማለት የሰጠችውን እንቁ በማሰብ እንቁጣጣሽ ተባለ። 

በሃይማኖታዊ ትውፊትም የአዲስ ዘመን መክፈቻ ተደርጎ የሚከበር ሲሆን፣ አሮጌው አልፎ አዲስ የሚተካበት፣ ተስፋና በረከት የሚታሰብበት ቅዱስ ዕለት።`,
      Geez: `ርዕሰ ዓውደ ዓመት (እንቁጣጣሽ) የኢትዮጵያ አዲስ ዓመት መጀመሪያ ሲሆን ታላቅ ታሪካዊና መንፈሳዊ ትርጉም አለው።

በአንደኛው ወገን የኖኅ የቃልኪዳን ቀስተ ደመና የታየበት እና የጥፋት ውሃ መድረቁ የተበሰረበት ዕለት ነው። በሌላ በኩል ደግሞ የሳባ ንግሥት ከንጉሥ ሰሎሞን ዘንድ ተመልሳ ስትመጣ ለሠራዊቷና ለሕዝቧ "እንቁ ዕንቁ ለቤተመቅደስ ማጌጫ ይሁን" በማለት የሰጠችውን እንቁ በማሰብ እንቁጣጣሽ ተባለ። 

በሃይማኖታዊ ትውፊትም የአዲስ ዘመን መክፈቻ ተደርጎ የሚከበር ሲሆን፣ አሮጌው አልፎ አዲስ የሚተካበት፣ ተስፋና በረከት የሚታሰብበት ቅዱስ ዕለት።`,
      Tigrinya: `እንቁጣጣሽ (ሓድሽ ዓመት) መጀመርታ ሓድሽ ዓመት ኢትዮጵያ እዩ።

ብሓደ ወገን ኖህ ካብ ማይ ኣይሂ ድሕሪ ምድሓኑ ቀስተ ደመና ዝረኣየሉን ምድሪ ዝነቐጸትሉን ዕለት እዩ። በቲ ካልእ ሸነኽ ድማ ንግስቲ ሳባ ካብ ንጉስ ሰሎሞን ተመሊሳ ክትመጽእ ከላ ንሰራዊታን ህዝባን "ዕንቚ ዕንቚ" ዝብል ናይ ኣቀባብላ ውህብቶ ዝሃበትሉ ታሪኽ ይዝከር።

እዚ ዕለት እዚ ተፈጥሮ ዝሕደሰሉ፣ ሓድሽ ተስፋን ሰላምን ዝበሰረሉ ቅዱስ ዕለት እዩ።`,
      English: `Enkutatash (the Ethiopian New Year) marks the beginning of the year on Meskerem 1. It carries deep theological, historical, and cosmic significance.

Biblically, it is associated with the receding of the Great Flood during the time of Noah, where the dove returned with an olive branch, signifying a covenant of peace between God and creation. 

Historically, the name 'Enkutatash' translates to 'gift of jewels'. Tradition holds that when the legendary Queen of Sheba returned to Ethiopia after her famous visit to King Solomon in Jerusalem, her chiefs welcomed her back with precious gems. This season also coincides with the physical renewal of nature, when fields turn golden with 'Adey Abeba' daisies after the rainy season.`,
      AfaanOromo: `Enkutatash (Bara Haaraa Itoophiyaa) jalqaba bara haaraa Meskerem 1 irratti kabajama. Seenaa fi hiika hafuuraa bal'aa qaba.

Akka amantii kootti, kakuu bishaan badii booda addeessaa fi qorannoo dachee irratti uumamedha. Gara biraatiin, seenaan mootummaa Saabaa (Nigist Saba) deebitee dhufeen wal-qabata.`
    },
    '1-17': {
      Amharic: `በዓለ መስቀል ንግሥት ዕሌኒ የጌታችንን መስቀል ፍለጋ ወደ ኢየሩሳሌም ሄዳ ያገኘችበትን ታሪካዊ ክስተት የሚያስብ ታላቅ በዓል ነው።

በ፫፳፮ ዓ.ም ንግሥት ዕሌኒ የጌታችንን መስቀል ፍለጋ ወደ ኢየሩሳሌም ሄደች። በወቅቱ መስቀሉ የተቀበረበት ስፍራ በቆሻሻ ተራራ ተሸፍኖ ነበር። እርሷ ግን በጸሎትና በሱባኤ ሆና፣ የአረጋዊው ኪርያቆስን ምክር በመስማት ደመራ አስደምራ እጣን ስታጥን፣ የዕጣኑ ጢስ ወደ ሰማይ ወጥቶ ወደ ታች በመመለስ መስቀሉ የተቀበረበትን ስፍራ አመለከታት።

ቁፋሮውንም አስጀምራ መጋቢት ፲ ቀን አገኘችው። መስከረም ፲፯ ቀን ደግሞ መስቀሉ የተገኘበትን ታላቅ መቅደስ ቅዳሴ ቤቱን አከበረች። በኢትዮጵያ ይህ በዓል ከዩኔስኮ የማይዳሰሱ ቅርሶች መካከል ተመዝግቧል።`,
      Geez: `በዓለ መስቀል ንግሥት ዕሌኒ የጌታችንን መስቀል ፍለጋ ወደ ኢየሩሳሌም ሄዳ ያገኘችበትን ታሪካዊ ክስተት የሚያስብ ታላቅ በዓል ነው።

በ፫፳፮ ዓ.ም ንግሥት ዕሌኒ የጌታችንን መስቀል ፍለጋ ወደ ኢየሩሳሌም ሄደች። በወቅቱ መስቀሉ የተቀበረበት ስፍራ በቆሻሻ ተራራ ተሸፍኖ ነበር። እርሷ ግን በጸሎትና በሱባኤ ሆና፣ የአረጋዊው ኪርያቆስን ምክር በመስማት ደመራ አስደምራ እጣን ስታጥን፣ የዕጣኑ ጢስ ወደ ሰማይ ወጥቶ ወደ ታች በመመለስ መስቀሉ የተቀበረበትን ስፍራ አመለከታት።

ቁፋሮውንም አስጀምራ መጋቢት ፲ ቀን አገኘችው። መስከረም ፲፯ ቀን ደግሞ መስቀሉ የተገኘበትን ታላቅ መቅደስ ቅዳሴ ቤቱን አከበረች። በኢትዮጵያ ይህ በዓል ከዩኔስኮ የማይዳሰሱ ቅርሶች መካከል ተመዝግቧል።`,
      Tigrinya: `በዓለ መስቀል ንግስቲ ዕሌኒ ንዕንጨት መስቀል ጎይታና ካብ ትሕቲ ምድሪ ዝረኸበትሉ ታሪኽ ዝዝከረሉ ዓብዪ በዓል እዩ።

ኣብ 326 ዓ.ም ንግስቲ ዕሌኒ ናብ የሩሳሌም ብምኻድ መስቀል ክርስቶስ ንምድላይ ሱባኤ ሓዘት። በቲ እዋን እቲ ጸላእቲ ክርስትና መስቀሉ ንምድፋን ጉሓፍ ክእክቡሉ ስለ ዝገበሩ ዓብዪ እምባ ኮይኑ ነበረ። ንግስቲ ዕሌኒ ግን ብምኽሪ ሓደ ኣረጋዊ ኪርያኮስ ደመራ ኣንዲዳ ምስ ጸለየት፣ እቲ ትኪ ናብ ሰማይ ዓሪጉ ተመሊሱ መስቀል ዝተቐብረሉ ቦታ ኣመልከታ።

እዚ ቅዱስ በዓል እዚ ብዩኔስኮ ከም ዘይድሰስ ቅርስ ሰብኣውነት ተመዝጊቡ ይርከብ።`,
      English: `The Feast of Meskel commemorates the miraculous Finding of the True Cross of Jesus Christ by Queen Helena (Empress Eleni) in the year 326 AD.

After her conversion to Christianity, Empress Helena traveled to Jerusalem to locate the cross on which Christ was crucified. The location had been hidden under a massive mound of refuse by the opponents of early Christians to obscure its memory. Following the advice of an elder named Kirakos, she gathered wood and lit a massive bonfire (Demera). She prayed, and the fragrant smoke from the incense rose high into the air and bowed back down, pointing directly to the spot where the Holy Cross lay buried. 

Excavations began immediately, and the True Cross was unearthed on Megabit 10. The cathedral built over the site was consecrated on Meskerem 17, which is why the main feast is celebrated on this day. In Ethiopia, the festival is celebrated with the burning of a large ceremonial bonfire (Demera) and is officially registered as a UNESCO Intangible Cultural Heritage of Humanity.`,
      AfaanOromo: `Ayyaana fannoo qulqulluu (Masqala) seenaa Mootummaa Eeleenii fannoo gooftaa dachee jalaa barbaaddee argattee yaadatamu dha.`
    },
    '3-6': {
      Amharic: `ቁስቋም ለማርያም እመቤታችን ቅድስት ድንግል ማርያም ከልጇ ከኢየሱስ ክርስቶስ፣ ከቅዱስ ዮሴፍና ከሰሎሜ ጋር በግብፅ ያደረጉትን የስደት ዘመን ፍጻሜ የሚያስብ ታላቅ በዓል ነው።

ሄሮድስ ሕፃኑን ለመግደል በነበረው ክፉ ምኞት ምክንያት ቅዱስ ቤተሰቡ ወደ ግብፅ ተሰደዱ። በስደት ዘመናቸው ታላላቅ መከራዎችን ካሳለፉ በኋላ መጨረሻ ላይ በደብረ ቁስቋም ተራራ ላይ ለአርባ ቀናት ያህል አርፈዋል።

መልአኩ ቅዱስ ገብርኤል ለዮሴፍ በህልም ተገልጦ "የሕፃኑን ነፍስ የሚሹት ሞተዋልና ተነስተህ ወደ እስራኤል ተመለስ" በማለት የስደቱን ማክተም አበሰረ። ይህ በዓል በተለይ በኢትዮጵያ ቤተክርስቲያን ከጥቅምት ፳፮ እስከ ሕዳር ፮ ባለው ጊዜ ውስጥ በሚዘመረው የማኅሌተ ጽጌ ጸሎትና ምስጋና ፍጻሜ ተደርጎ በታላቅ ድምቀት ይከበራል።`,
      Geez: `ቁስቋም ለማርያም እመቤታችን ቅድስት ድንግል ማርያም ከልጇ ከኢየሱስ ክርስቶስ፣ ከቅዱስ ዮሴፍና ከሰሎሜ ጋር በግብፅ ያደረጉትን የስደት ዘመን ፍጻሜ የሚያስብ ታላቅ በዓል ነው።

ሄሮድስ ሕፃኑን ለመግደል በነበረው ክፉ ምኞት ምክንያት ቅዱስ ቤተሰቡ ወደ ግብፅ ተሰደዱ። በስደት ዘመናቸው ታላላቅ መከራዎችን ካሳለፉ በኋላ መጨረሻ ላይ በደብረ ቁስቋም ተራራ ላይ ለአርባ ቀናት ያህል አርፈዋል።

መልአኩ ቅዱስ ገብርኤል ለዮሴፍ በህልም ተገልጦ "የሕፃኑን ነፍስ የሚሹት ሞተዋልና ተነስተህ ወደ እስራኤል ተመለስ" በማለት የስደቱን ማክተም አበሰረ። ይህ በዓል በተለይ በኢትዮጵያ ቤተክርስቲያን ከጥቅምት ፳፮ እስከ ሕዳር ፮ ባለው ጊዜ ውስጥ በሚዘመረው የማኅሌተ ጽጌ ጸሎትና ምስጋና ፍጻሜ ተደርጎ በታላቅ ድምቀት ይከበራል።`,
      Tigrinya: `ቁስቋም ለማርያም እመቤትና ምስ ልጃን ቅዱስ ዮሴፍን ሰሎሜን ኣብ ምድረ ግብጺ ዘሕለፈቶ ናይ ስደት እዋን ፍጻሜ ዝዝከረሉ ቅዱስ ዕለት እዩ።

ንጉስ ሄሮድስ ነቲ ሕፃን ክቀትሎ ስለ ዝደለየ ቅዱስ ስድራቤት ናብ ግብጺ ተሰደዱ። ኣብቲ ስደት መከራታትን ጸበባን ድሕሪ ምሕላፎም ንኣርብዓ መዓልቲ ኣብ ደብረ ቁስቋም ዓረፉ።

መልኣኽ ቅዱስ ገብርኤል ንዮሴፍ ተገሊጹ ናብ ሃገሮም ክምለሱ ከም ዘለዎም ምስ ነገሮም ስደቶም ኣብቂዑ ተመልሱ። እዚ ዕለት እዚ ፍጻሜ "ማሕሌተ ጽጌ" እዩ።`,
      English: `Qusquam Maryam commemorates the end of the exile of the Holy Family (the Virgin Mary, Child Jesus, Saint Joseph, and Salome) in Egypt and their peaceful return to Israel.

To escape King Herod's decree ordering the massacre of all male infants, the Holy Family fled from Judea to Egypt. They wandered through various wildernesses and towns under harsh conditions for over three years. Their final sanctuary was Mount Qusquam, where they rested for forty days. 

At the end of this period, the Archangel Gabriel appeared to Joseph in a dream, telling him that Herod was dead and that it was safe to return. In the Ethiopian tradition, this feast is highly celebrated as the culmination of the 40-day 'Tsige' season (the Season of the Flowers), which features beautiful midnight hymns of 'Mahlete Tsige' praising Saint Mary.`,
      AfaanOromo: `Ayyaana Qusquwam Maariyaam, godaansa gooftaa fi maatii isaa gara biyya Gibxi dhuma isaa kan yaadatamu dha.`
    },
    '3-21': {
      Amharic: `ሕዳር ጽዮን (ጽዮን ማርያም) የታቦተ ጽዮን (የቃል ኪዳኑ ታቦት) በንጉሥ ቀዳማዊ ምኒልክ አማካኝነት ከአክሱም መምጣት ጋር የተያያዘ ታላቅ ታሪካዊ በዓል ነው።

በ፩ሺህ ቅድመ ልደተ ክርስቶስ ንጉሥ ቀዳማዊ ምኒልክ ታቦተ ጽዮንን ከኢየሩሳሌም ወደ አክሱም አመጣ። ይህ ታቦት የእግዚአብሔርን ህልውናና ጥበቃ የሚያሳይ ሲሆን፣ በአክሱም ጽዮን ቤተክርስቲያን ውስጥ በክብር ተቀምጧል።

በየዓመቱ በአሥር ሺዎች የሚቆጠሩ ምዕመናንና ካህናት ነጭ ልብስ ለብሰው ወደ ቅድስት ከተማ አክሱም በመጓዝ በታላቅ ዝማሬ፣ በያሬዳዊ ዜማና በክብር ያከብሩታል። በዓሉ የኢትዮጵያ መንፈሳዊና ታሪካዊ አንድነት ተምሳሌት ነው።`,
      Geez: `ሕዳር ጽዮን (ጽዮን ማርያም) የታቦተ ጽዮን (የቃል ኪዳኑ ታቦት) በንጉሥ ቀዳማዊ ምኒልክ አማካኝነት ከአክሱም መምጣት ጋር የተያያዘ ታላቅ ታሪካዊ በዓል ነው።

በ፩ሺህ ቅድመ ልደተ ክርስቶስ ንጉሥ ቀዳማዊ ምኒልክ ታቦተ ጽዮንን ከኢየሩሳሌም ወደ አክሱም አመጣ። ይህ ታቦት የእግዚአብሔርን ህልውናና ጥበቃ የሚያሳይ ሲሆን፣ በአክሱም ጽዮን ቤተክርስቲያን ውስጥ በክብር ተቀምጧል።

በየዓመቱ በአሥር ሺዎች የሚቆጠሩ ምዕመናንና ካህናት ነጭ ልብስ ለብሰው ወደ ቅድስት ከተማ አክሱም በመጓዝ በታላቅ ዝማሬ፣ በያሬዳዊ ዜማና በክብር ያከብሩታል። በዓሉ የኢትዮጵያ መንፈሳዊና ታሪካዊ አንድነት ተምሳሌት ነው።`,
      Tigrinya: `ሕዳር ጽዮን (ጽዮን ማርያም) ጽላት ኪዳን (ታቦተ ጽዮን) ብንጉስ ቀዳማዊ ምኒልክ ኣቢሉ ካብ የሩሳሌም ናብ ኣኽሱም ዝመጸሉ ቅዱስ ታሪኽ ዝዝከረሉ ዓብዪ በዓል እዩ።

ኣብ 1000 ቅድሚ ልደተ ክርስቶስ እቲ ጽላት ናብ ቅድስት ሃገር ኣኽሱም ኣተወ። እዚ ታቦት እዚ ንህላወን ቃልኪዳንን እግዚአብሔር መረጋገጺ እዩ።

በብዓመቱ ኣብዚ ዕለት እዚ ዓሰርተታት ኣሽሓት ሰዓብቲ እምነት ናብ ኣኽሱም ጽዮን ብምኻድ ብዝማሬን ቅዳሴን የብዕልዎ።`,
      English: `Hidar Tsion is one of the most solemn and historic feasts in the Ethiopian Orthodox Church, commemorating the arrival of the Ark of the Covenant (Tabote Tsion) in Axum.

Traditional accounts record that in the 10th Century BC, King Menelik I (son of the Queen of Sheba and King Solomon) traveled to Jerusalem to visit his father. Upon his return, he brought the Ark of the Covenant, which represented God's physical presence and His divine laws. The Ark found its ultimate sanctuary in Axum, making it the 'Second Jerusalem'. 

Every year on Hidar 21, tens of thousands of white-robed pilgrims, priests, and deacons perform beautiful liturgical dances and songs called 'Wereda' around the Church of Our Lady Mary of Zion in Axum, celebrating centuries of unbroken covenant.`,
      AfaanOromo: `Ayyaana Tsiyoon Maariyaam Axumitti kabajamu seenaa qulqulluu kakuu moofaa dhufeen wal-qabata.`
    },
    '4-19': {
      Amharic: `የታኅሣሥ ገብርኤል በዓል በተለይም በሐረርጌ ቁሉቢ ገብርኤል ቤተክርስቲያን በታላቅ ክብርና ማዕበለ ሕዝብ ይከበራል።

በዓሉ የቅዱሳኑን ሕፃናት (ሲድራቅ፣ ሚሳቅና አብደናጎ) ከሚነድ የባቢሎን እሳት ያዳነበትን ተአምር ያስባል። ቅዱስ ገብርኤል ፈጥኖ ደራሽና መጋቢ መልአክ መሆኑ በዚህ ዕለት ይዘከራል።

የቁሉቢ ገብርኤል ቤተክርስቲያን በንጉሥ ሚካኤል ዘመን ተመስርቶ በዓፄ ኃይለ ሥላሴ ዘመን በታላቅ ደረጃ የታነጸ ሲሆን፣ በአሁኑ ሰዓት በሚሊዮን የሚቆጠሩ ምዕመናን ከሀገር ውስጥና ከውጭ ስዕለት ለመሳምና ምስጋና ለማቅረብ የሚጓዙበት ታላቅ የሀገር ቅርስና መንፈሳዊ ስፍራ ሆኗል።`,
      Geez: `የታኅሣሥ ገብርኤል በዓል በተለይም በሐረርጌ ቁሉቢ ገብርኤል ቤተክርስቲያን በታላቅ ክብርና ማዕበለ ሕዝብ ይከበራል።

በዓሉ የቅዱሳኑን ሕፃናት (ሲድራቅ፣ ሚሳቅና አብደናጎ) ከሚነድ የባቢሎን እሳት ያዳነበትን ተአምር ያስባል። ቅዱስ ገብርኤል ፈጥኖ ደራሽና መጋቢ መልአክ መሆኑ በዚህ ዕለት ይዘከራል።

የቁሉቢ ገብርኤል ቤተክርስቲያን በንጉሥ ሚካኤል ዘመን ተመስርቶ በዓፄ ኃይለ ሥላሴ ዘመን በታላቅ ደረጃ የታነጸ ሲሆን፣ በአሁኑ ሰዓት በሚሊዮን የሚቆጠሩ ምዕመናን ከሀገር ውስጥና ከውጭ ስዕለት ለመሳምና ምስጋና ለማቅረብ የሚጓዙበት ታላቅ የሀገር ቅርስና መንፈሳዊ ስፍራ ሆኗል።`,
      Tigrinya: `በዓል ታኅሣሥ ገብርኤል (በዓል ቁሉቢ) ሊቀ መላእክት ቅዱስ ገብርኤል ነቶም ሰለስተ ህፃናት ካብ ጕሁር እቶን ሓዊ ዘድሓነሉ ተኣምር ዝዝከረሉ ዕለት እዩ።

እዚ በዓል እዚ ብፍላይ ኣብ ቁሉቢ ገብርኤል ብሚሊዮናት ህዝቢ ዝተረኽበሉ ዓብዪ ጉዕዞ ንግደት ይካየደሉ እዩ። ምእመናን ስእለቶም ንምፍጻምን ጸበል ክረኽቡን ይሳተፉ።`,
      English: `Tahsas Gabriel celebrates the deliverance of the three holy youth (Hananiah, Azariah, and Mishael) from the blazing furnace of Babylon by the Archangel Gabriel.

As documented in the Book of Daniel, King Nebuchadnezzar ordered that anyone who refused to bow before his golden image be thrown into a fiery furnace. The three faithful youth refused to worship the idol, holding onto their faith in the True God. When cast into the furnace, the Archangel Gabriel descended, drove away the flames, and walked with them unharmed. 

In Ethiopia, this feast is synonymous with the Kulubi Gabriel Cathedral pilgrimage in eastern Hararghe. Established in the late 19th Century, Kulubi Gabriel has grown into a massive national sanctuary where millions of believers gather to fulfill vows, receive baptism, and offer gratitude for answered prayers.`,
      AfaanOromo: `Ayyaana Qulqulluu Gabri'eel isa Kulubitti kabajamu seenaa ajaa'ibsiisaa gargaarsa ergamaa kanaa ibsa.`
    },
    '4-29': {
      Amharic: `የልደተ ክርስቶስ በዓል (ገና) የመለኮት ሰብአዊ የመሆን ምስጢር የሚገለጥበት ታላቅ የደስታ ዕለት ነው።

በነቢያት ትንቢት መሰረት ጌታችን በቤተልሔም በረት ተወለደ። በኢትዮጵያ ይህ በዓል ከላሊበላ ውቅር አብያተ ክርስቲያናት ጋር ጥብቅ ቁርኝት አለው።

በዓሉን አስመልክቶ ሕፃናትና ጎልማሶች "የገና ጨዋታ" የተባለውን ባህላዊ ስፖርት የሚጫወቱ ሲሆን ይህም በዓሉን ልዩ ታሪካዊና ባህላዊ ድምቀት ይሰጠዋል። ካህናቱ በላሊበላ አብያተ ክርስቲያናት ላይ ቆመው የሚዘምሩት "በዛ ኩሉ" (ሁሉን የሚያድን) የተሰኘው ያሬዳዊ ዜማ የበዓሉ ዋነኛ መንፈሳዊ ውበት ነው።`,
      Geez: `የልደተ ክርስቶስ በዓል (ገና) የመለኮት ሰብአዊ የመሆን ምስጢር የሚገለጥበት ታላቅ የደስታ ዕለት ነው።

በነቢያት ትንቢት መሰረት ጌታችን በቤተልሔም በረት ተወለደ። በኢትዮጵያ ይህ በዓል ከላሊበላ ውቅር አብያተ ክርስቲያናት ጋር ጥብቅ ቁርኝት አለው።

በዓሉን አስመልክቶ ሕፃናትና ጎልማሶች "የገና ጨዋታ" የተባለውን ባህላዊ ስፖርት የሚጫወቱ ሲሆን ይህም በዓሉን ልዩ ታሪካዊና ባህላዊ ድምቀት ይሰጠዋል። ካህናቱ በላሊበላ አብያተ ክርስቲያናት ላይ ቆመው የሚዘምሩት "በዛ ኩሉ" (ሁሉን የሚያድን) የተሰኘው ያሬዳዊ ዜማ የበዓሉ ዋነኛ መንፈሳዊ ውበት ነው።`,
      Tigrinya: `ልደተ ክርስቶስ (ገና) ጐይታና የሱስ ክርስቶስ ኣብ በዓቲ ቤተልሔም ዝተወለደሉ ዓብዪ ምስጢረ ስጋዌ እዩ።

ኣብ ኢትዮጵያ እዚ በዓል እዚ ምስ ውቕር ኣብያተ ክርስቲያናት ላሊበላ ዝተኣሳሰረ እዩ። ካህናት ኣብ ገደል ደው ኢሎም "በዛ ኲሉ" ዝብል ያሬዳዊ ዜማ ይዝምሩ።

ብባህላዊ መዳይ ድማ "ጸወታ ገና" ብምጽዋት ታሪኻዊ ባህሊ ይንጸባረቕ።`,
      English: `Lidet (Ethiopian Christmas / Genna) celebrates the Nativity of our Lord Jesus Christ in Bethlehem.

Spiritual and historical accounts tie Lidet intimately to the rock-hewn churches of Lalibela, constructed by King Lalibela to emulate the holy topography of Jerusalem. During Lidet, priests stand along the cliffs of Lalibela's monolithic churches chanting the majestic 'Beza Kullu' ('Redeemer of All') hymns. 

Culturally, Genna is accompanied by 'Yegena Chewata', a traditional field hockey-like game played with wooden sticks and a leather ball. Tradition says the shepherds played this game to celebrate hearing the angels' announcement of Christ's birth.`,
      AfaanOromo: `Ganna (Ayyaana Dhaloota Kiristoos) dhaloota Iyyasuus Kiristoos dachee irratti raawwatame yaadata.`
    },
    '5-11': {
      Amharic: `ጥምቀት የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ዋነኛ መታወቂያ የሆነ ታላቅ በዓል ነው። ጌታችን በዮርዳኖስ ወንዝ በዮሐንስ እጅ የተጠመቀበትና ሥላሴ የተገለጡበት ምስጢር ይታሰብበታል።

በዋዜማው (ከተራ) ታቦታት ከየአብያተ ክርስቲያናቱ ወጥተው ወደ ባሕረ ጥምቀት ይጓዛሉ። ሌሊቱን ሙሉ በጸሎትና በኪዳን አድረው፣ ማለዳ ላይ ባህሩ ተባርኮ ሕዝቡ ይረጫል።

ይህ በዓል በዩኔስኮ የሰው ልጅ የማይዳሰስ ቅርስ ሆኖ ተመዝግቧል። የጥምቀት በዓል ሃይማኖታዊ ስርዓቱን የጠበቀና ታላቅ ሀገራዊ አንድነትን የሚገልጽ የቱሪዝም መስህብ ነው።`,
      Geez: `ጥምቀት የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ዋነኛ መታወቂያ የሆነ ታላቅ በዓል ነው። ጌታችን በዮርዳኖስ ወንዝ በዮሐንስ እጅ የተጠመቀበትና ሥላሴ የተገለጡበት ምስጢር ይታሰብበታል።

በዋዜማው (ከተራ) ታቦታት ከየአብያተ ክርስቲያናቱ ወጥተው ወደ ባሕረ ጥምቀት ይጓዛሉ። ሌሊቱን ሙሉ በጸሎትና በኪዳን አድረው፣ ማለዳ ላይ ባህሩ ተባርኮ ሕዝቡ ይረጫል።

ይህ በዓል በዩኔስኮ የሰው ልጅ የማይዳሰስ ቅርስ ሆኖ ተመዝግቧል። የጥምቀት በዓል ሃይማኖታዊ ስርዓቱን የጠበቀና ታላቅ ሀገራዊ አንድነትን የሚገልጽ የቱሪዝም መስህብ ነው።`,
      Tigrinya: `በዓለ ጥምቀት ጐይታና ኣብ ፈለገ ዮርዳኖስ ብኢድ ዮሃንስ ዝተጠመቐሉ ምስጢረ ሥላሴ ዝተገልጸሉ ዓብዪ በዓል እዩ።

ኣብ ዋዜማ እቲ በዓል (ከተራ) ታቦታት ናብ ባሕረ ጥምቀት ይወርዱ። ምሉእ ለይቲ ብጸሎትን ዝማሬን ድሕሪ ምሕዳር ማይ ተባሪኹ ህዝቢ ይንጸግ።

እዚ በዓል እዚ ብዩኔስኮ ከም ዘይድሰስ ቅርስ ሰብኣውነት ተመዝጊቡ ኣሎ።`,
      English: `Timket is the grand festival of Epiphany, celebrating the Baptism of Jesus Christ in the River Jordan by John the Baptist, which revealed the Holy Trinity.

The celebration begins on Timket Eve, known as 'Ketera', when the Tabots (sacred replicas of the Ark of the Covenant) are carried from their respective churches to a central outdoor water basin. Believers dressed in traditional white 'Netela' accompany the procession with drumming and singing. 

Following a solemn overnight prayer vigil, the waters are blessed at dawn. The patriarch or priests plunge a gold cross into the water and extinguish a blessed candle in it, before sprinkling the holy water over the gathered crowds. Timket is renowned for its vibrant, colorful processions and is inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity.`,
      AfaanOromo: `Ayyaana Cuuphaa (Timqata) guddaa gooftaa keenyaa, bishaan eebbifamee kan dhangala'udha.`
    },
    '5-12': {
      Amharic: `ቃና ዘገሊላ ከጥምቀት ማግስት የሚከበር ሲሆን ጌታችን በገሊላ ቃና ከተማ በተደረገ ሰርግ ላይ ውኃውን ወደ ወይን በመለወጥ ያደረገውን የመጀመሪያ ተአምር ያስባል።

ይህ በዓል ጌታችን ለትዳርና ለቤተሰብ የሰጠውን ታላቅ ክብርና በረከት የሚያሳይ ነው።

በወቅቱ ሰርግ ቤት ወይን አልቆ ሳለ፣ እመቤታችን ቅድስት ድንግል ማርያም ለልጇ "ወይን የላቸውም" በማለት ባቀረበችው ልመና መሰረት ጌታችን ስድስቱን የድንጋይ ጋኖች ውሃ ሞልተው እንዲያቀርቡ አድርጓል። ውሃውንም ወደ ምርጥ ወይን በመለወጥ ክብሩን ገልጧል።`,
      Geez: `ቃና ዘገሊላ ከጥምቀት ማግስት የሚከበር ሲሆን ጌታችን በገሊላ ቃና ከተማ በተደረገ ሰርግ ላይ ውኃውን ወደ ወይን በመለወጥ ያደረገውን የመጀመሪያ ተአምር ያስባል።

ይህ በዓል ጌታችን ለትዳርና ለቤተሰብ የሰጠውን ታላቅ ክብርና በረከት የሚያሳይ ነው።

በወቅቱ ሰርግ ቤት ወይን አልቆ ሳለ፣ እመቤታችን ቅድስት ድንግል ማርያም ለልጇ "ወይን የላቸውም" በማለት ባቀረበችው ልመና መሰረት ጌታችን ስድስቱን የድንጋይ ጋኖች ውሃ ሞልተው እንዲያቀርቡ አድርጓል። ውሃውንም ወደ ምርጥ ወይን በመለወጥ ክብሩን ገልጧል።`,
      Tigrinya: `ቃና ዘገሊላ ጐይታና ኣብ ገሊላ ኣብ ዝተገብረ መርዓ ማይ ናብ ወይኒ ብምቕያር ዝገበሮ ቀዳማይ ተኣምር እዩ።

እዚ በዓል እዚ ጐይታና ንትሕዝቶ ቃልኪዳን ሓዳርን ስድራቤትን ዘለዎ ክብርን ፍቕርን ዘርእይ እዩ። እመቤትና ማርያም "ወይኒ የብሎምን" ኢላ ብዘቕረበቶ ልመና እዩ ተኣምር ተፈጺሙ።`,
      English: `Kana ZeGelila (Cana of Galilee) is celebrated on the day after Timket. It commemorates Jesus' first public miracle, performed during a wedding feast in the town of Cana in Galilee.

When the wedding host ran out of wine, Saint Mary approached Jesus and said, 'They have no wine'. Under her intercession, Jesus commanded the servants to fill six stone water jars to the brim with water. He then transformed the water into high-quality wine, saving the wedding host from humiliation and revealing His glory to His disciples. 

This feast honors the sanctity of marriage and family life in the Orthodox tradition.`,
      AfaanOromo: `Yaadannoo gooftaan bishaan gara daadhiitti jijjiire, gaa'elaa fi maatii kabaje.`
    },
    '6-16': {
      Amharic: `ኪዳነ ምሕረት ማለት የይቅርታና የምሕረት ቃልኪዳን ማለት ነው።

እመቤታችን ቅድስት ድንግል ማርያም በጎልጎታ ስትጸልይ፣ ልጇ ኢየሱስ ክርስቶስ ተገልጦ "የስምሽን መታሰቢያ ለሚያደርጉ፣ በቃልኪዳንሽ ለሚማጸኑና ለተራቡት በስምሽ ለሚያበሉ ሁሉ ይቅርታንና መንግስተ ሰማያትን እሰጣቸዋለሁ" በማለት የገባላትን ቃልኪዳን የምናስብበት በዓል ነው።

ይህ ታላቅ ቃልኪዳን እግዚአብሔር ለእመቤታችን የሰጣት የጸጋ ስጦታ ሲሆን፣ ምዕመናን በእርሷ አማላጅነትና ይቅርታ ተስፋ የሚያደርጉበት የጽናታቸው ምንጭ ነው።`,
      Geez: `ኪዳነ ምሕረት ማለት የይቅርታና የምሕረት ቃልኪዳን ማለት ነው።

እመቤታችን ቅድስት ድንግል ማርያም በጎልጎታ ስትጸልይ፣ ልጇ ኢየሱስ ክርስቶስ ተገልጦ "የስምሽን መታሰቢያ ለሚያደርጉ፣ በቃልኪዳንሽ ለሚማጸኑና ለተራቡት በስምሽ ለሚያበሉ ሁሉ ይቅርታንና መንግስተ ሰማያትን እሰጣቸዋለሁ" በማለት የገባላትን ቃልኪዳን የምናስብበት በዓል ነው።

ይህ ታላቅ ቃልኪዳን እግዚአብሔር ለእመቤታችን የሰጣት የጸጋ ስጦታ ሲሆን፣ ምዕመናን በእርሷ አማላጅነትና ይቅርታ ተስፋ የሚያደርጉበት የጽናታቸው ምንጭ ነው።`,
      Tigrinya: `ኪዳነ ምሕረት ማለት ቃል ኪዳን ይቕሬታን ምሕረትን ማለት እዩ።

እመቤታችን ቅድስቲ ድንግል ማርያም ኣብ ቀራንዮ ክትጽልይ ከላ የሱስ ክርስቶስ ተገሊጹ ብስምኪ ንዝልምኑን ንድኻታት ንዝምግቡን ኩሎም ይቕረ ክብለሎም እዩ።

እዚ ቅዱስ ዕለት እዚ ምእመናን ኣብ ኣማላድነት እመቤትና ዘለዎም ተስፋ ዝገልጽ እዩ።`,
      English: `Kidane Mihret (the Covenant of Mercy) commemorates the divine promise given by Jesus Christ to His mother, the Virgin Mary.

According to holy traditions, while Mary was praying fervently at Golgotha, her Son appeared to her in great glory. He promised her that He would grant mercy, forgiveness, and salvation to anyone who seeks her intercession, commemorates her feasts, does acts of charity, or feeds the hungry in her name. 

This covenant highlights Mary's role as the advocate and helper of humanity in the Orthodox theological tradition, offering hope and solace to those who call upon her.`,
      AfaanOromo: `Kidaane Mihrat (Kakuu Araaraa) Iyyasuus Kiristoos haadha isaa Dubree Maariyaamiif araara yaadatamu dha.`
    },
    '12-13': {
      Amharic: `ደብረ ታቦር (ቡሄ) ጌታችን በታቦር ተራራ ላይ ብርሃነ መለኮቱን ለደቀ መዛሙርቱ የገለጠበት ታላቅ በዓል ነው።

በባህላዊው መንገድ ልጆች በየሰፈሩ ጅራፍ በማጮህ የጌታችንን ክብርና ኃይል ያበስራሉ። እንዲሁም ችቦ በማብራት የብርሃኑ መገለጥ ይታሰባል።

ባህላዊው "ሆያ ሆዬ" መዝሙርም በዚህ በዓል የሚዘመር ታሪካዊ ቅርስ ሲሆን፣ ልጆች በየቤቱ እየዞሩ ሲዘምሩ በረከትና ባህላዊ "ቡሄ ሙልሙል" ዳቦ ይሰጣቸዋል። በዓሉ የብርሃንና የደስታ በዓል ተደርጎ ይወሰዳል።`,
      Geez: `ደብረ ታቦር (ቡሄ) ጌታችን በታቦር ተራራ ላይ ብርሃነ መለኮቱን ለደቀ መዛሙርቱ የገለጠበት ታላቅ በዓል ነው።

በባህላዊው መንገድ ልጆች በየሰፈሩ ጅራፍ በማጮህ የጌታችንን ክብርና ኃይል ያበስራሉ። እንዲሁም ችቦ በማብራት የብርሃኑ መገለጥ ይታሰባል።

ባህላዊው "ሆያ ሆዬ" መዝሙርም በዚህ በዓል የሚዘመር ታሪካዊ ቅርስ ሲሆን፣ ልጆች በየቤቱ እየዞሩ ሲዘምሩ በረከትና ባህላዊ "ቡሄ ሙልሙል" ዳቦ ይሰጣቸዋል። በዓሉ የብርሃንና የደስታ በዓል ተደርጎ ይወሰዳል።`,
      Tigrinya: `በዓል ደብረ ታቦር (ቡሄ) ጐይታና ኣብ ታቦር ተራራ ብርሃነ መለኮቱ ዝገለጸሉ ቅዱስ በዓል እዩ።

ቆልዑት ጅራፍ ብምጽዋት ሓይሊ ኣምላኽ ይእውጁ። ባህላዊ ጸወታታትን "ሆያ ሆዬ" ዝብሉ ዝማሬታትን ብምድማፅ ይካሄድ።

ስድራቤታት ባህላዊ "ሙልሙል" ባኒ የዳልዉ።`,
      English: `Debre Tabor (also known as Buhe) commemorates the Transfiguration of Jesus Christ on Mount Tabor.

As recorded in the Synoptic Gospels, Jesus took Peter, James, and John up a high mountain, where He was transfigured before them. His face shone like the sun, and His garments became white as light. The prophets Moses and Elijah appeared talking with Him, and a voice from a bright cloud declared, 'This is my beloved Son, with whom I am well pleased; listen to Him'. 

In Ethiopian culture, Buhe is celebrated with children cracking whips to symbolize the thunderous voice of God the Father on Mount Tabor. Young boys form groups and go door-to-door singing traditional 'Hoya Hoye' carols, receiving a special baked bread called 'Mulmul' or coins from neighbors. At night, families light torches (Chibo) representing the divine light that illuminated the mountain.`,
      AfaanOromo: `Debre Tabor (Buhee) ifa gooftaa gaara Tabor irratti argame seenaa uummataa fi hafuuraa kabajamu dha.`
    },
    '12-16': {
      Amharic: `ፍልሰታ ለማርያም የእመቤታችን ቅድስት ድንግል ማርያም ስጋ ከሞት ተነስቶ ወደ ሰማይ ማረጉ የሚታሰብበት ታላቅ በዓል ነው።

ሐዋርያት የእመቤታችንን ስጋ ትንሣኤና ዕርገት ለማየት ያደረጉትን የሁለት ሳምንት ጾምና ሱባኤ መሠረት በማድረግ ምዕመናን በታላቅ ተጋድሎና በየቀኑ በሚቆረብ ቅዳሴ ያሳልፉታል።

በነሐሴ ፲፮ ቀን ጾሙ የሚፈታ ሲሆን፣ ታላቁ የበዓል ሥነ ሥርዓት ይከናወናል። ይህ በዓል በኢትዮጵያ ውስጥ ካሉት ሰባቱ አጽዋማት አንዱ የሆነውና ሕፃናት ሳይቀሩ በታላቅ ጉጉትና ፍቅር የሚጾሙት ልዩ በዓል ነው።`,
      Geez: `ፍልሰታ ለማርያም የእመቤታችን ቅድስት ድንግል ማርያም ስጋ ከሞት ተነስቶ ወደ ሰማይ ማረጉ የሚታሰብበት ታላቅ በዓል ነው።

ሐዋርያት የእመቤታችንን ስጋ ትንሣኤና ዕርገት ለማየት ያደረጉትን የሁለት ሳምንት ጾምና ሱባኤ መሠረት በማድረግ ምዕመናን በታላቅ ተጋድሎና በየቀኑ በሚቆረብ ቅዳሴ ያሳልፉታል።

በነሐሴ ፲፮ ቀን ጾሙ የሚፈታ ሲሆን፣ ታላቁ የበዓል ሥነ ሥርዓት ይከናወናል። ይህ በዓል በኢትዮጵያ ውስጥ ካሉት ሰባቱ አጽዋማት አንዱ የሆነውና ሕፃናት ሳይቀሩ በታላቅ ጉጉትና ፍቅር የሚጾሙት ልዩ በዓል ነው።`,
      Tigrinya: `ፍልሰታ ለማርያም ዕርገት ሥጋ እመቤትና ቅድስቲ ድንግል ማርያም ናብ ሰማይ ዝዝከረሉ ዕለት እዩ።

ሐዋርያት ትንሳኤ ሥጋሃ ንምርኣይ ክልተ ሰሙን ዝጾምዎ ጾም መሠረት ብምግባር ምእመናን ይጽልዩ።

ኣብ 16 ነሓሰ እቲ ጾም ይፍታሕ። እዚ ጾም እዚ ብፍላይ ንህፃናት ሓዊሱ ብፍቕሪ ዝጽወም እዩ።`,
      English: `Filseta (the Assumption of Saint Mary) commemorates the bodily resurrection and assumption of the Virgin Mary into heaven.

According to Orthodox sacred tradition, following Mary's death (Dormition), the Apostles buried her body in Gethsemane. However, she was resurrected by her Son on the third day and translated to heaven. The Apostle Thomas, who was absent, witnessed her bodily ascent and received her shroud as proof. Upon sharing this, the other Apostles wished to witness this wonder, fasting and praying for two weeks. On the 15th day (Nehase 16), they beheld her in glory. 

Today, the 16-day Fast of Filseta is one of the most widely kept fasts in Ethiopia, marked by intense prayer, daily liturgy (Kedase), and holy communion, culminating in Nehase 16.`,
      AfaanOromo: `Sooma Filsetaa (Boqonnaa Maariyaam) xumura sooma guyyaa 16 kabajamu, ol-fudhatama ishee ibsa.`
    },
    '1-27': {
      Amharic: `የመድኃኔዓለም በዓል የዓለም መድኃኒት የሆነው ጌታችን ኢየሱስ ክርስቶስ ለአዳምና ለልጆቹ ያደረገውን የማዳን ውለታ የምናስብበት ታላቅ በዓል ነው።

ጌታችን ኢየሱስ ክርስቶስ በፍቅሩና በምሕረቱ ሰውን ለማዳን በፈቃዱ በመስቀል ላይ ተሰቅሎ ሞቷል። ይህ በዓል የሰው ልጅ ከኃጢአት ባርነት ነፃ የወጣበትን፣ የዘላለም ሕይወትንም ያገኘበትን ታላቅ ድኅነት በምስጋና የምናስብበት ቅዱስ ዕለት ነው። በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ታላቅ ሥርዓትና አምልኮት የሚፈጸምበት ዓመታዊ በዓል ነው።`,
      Geez: `የመድኃኔዓለም በዓል የዓለም መድኃኒት የሆነው ጌታችን ኢየሱስ ክርስቶስ ለአዳምና ለልጆቹ ያደረገውን የማዳን ውለታ የምናስብበት ታላቅ በዓል ነው።`,
      Tigrinya: `ናይ ዓለም መድሓኒት ዝኾነ ጎይታና ኢየሱስ ክርስቶስ ንኣዳምን ንደቁን ዝገበሮ ናይ ምድሓን ውዕለት ዝዝከረሉ ዓብዪ በዓል ።`,
      English: `The Feast of Medhane Alem (Savior of the World) is celebrated on Meskerem 27. It commemorates the salvation and redemption wrought by Jesus Christ for humanity.

Through His crucifixion, death, and resurrection, Christ broke the bonds of sin and death, offering eternal life to mankind. This day is celebrated with deep gratitude and reverence across all parish churches in Ethiopia, emphasizing God's infinite love and mercy for His creation.`,
      AfaanOromo: `Ayyaana guddaa fayiisaa addunyaa kan ta'e Gooftaa keenya Iyyasuus Kiristoos fayyinna namaaf tolche yaadatamu.`
    },
    '3-12': {
      Amharic: `የሊቀ መላእክት የቅዱስ ሚካኤል ዓመታዊ በዓል በሕዳር ፲፪ ቀን በታላቅ ድምቀት ይከበራል።

ይህ ዕለት ቅዱስ ሚካኤል በትዕቢት ተሞልቶ በእግዚአብሔር ላይ ያመፀውንና መልአክነቱን ያጣውን ሳጥናኤልን ድል አድርጎ የቆመበት፣ በዚሁም ታማኝነቱ ምክንያት በእግዚአብሔር ዘንድ ባለሟልነትንና በመላእክት ሁሉ ላይ አለቅነትን የተሾመበት ታላቅ የድል ዕለት ነው። ቅዱስ ሚካኤል የሰላም, የረድኤት እና የቃልኪዳን መልአክ በመሆኑ በምዕመናን ዘንድ ታላቅ ፍቅርና ክብር አለው።`,
      Geez: `ሊቀ መላእክት ቅዱስ ሚካኤል ክቡር።`,
      Tigrinya: `ዕብዪ በዓል ሊቀ መላእክት ቅዱስ ሚካኤል ናይ ሕዳር ወርሒ።`,
      English: `The annual feast of Saint Michael the Archangel is celebrated on Hidar 12. It commemorates the great victory of Saint Michael over Lucifer (Satnael), who rebelled against God.

Due to his loyalty and humility, Michael was appointed as the Prince of the Heavenly Host. Saint Michael is revered as the patron of peace, protection, and intercession, delivering the faithful from danger and adversity.`,
      AfaanOromo: `St. Michael`
    },
    '5-21': {
      Amharic: `የአስቴርዮ ማርያም በዓል እመቤታችን ቅድስት ድንግል ማርያም ከዚህ ዓለም በሞት ያረፈችበትን ዕለት የሚያስብ በዓል ነው።

በጥር ፳፩ ቀን እመቤታችን በነነዌ ከተማ በሰላም አረፈች። ሐዋርያት ሊቀብሯት ሲዘጋጁ አይሁድ ቅዱስ ሥጋዋን ለማቃጠል ስላሰቡ መልአከ እግዚአብሔር ሥጋዋን ነጥቆ ወደ ገነት ወሰደው። ይህ በዓል የእመቤታችንን የሥጋ ዕረፍት መታሰቢያ ሲሆን፣ በረድኤትና በምልጃዋ የምንማጸንበት ታላቅ መንፈሳዊ በዓል ነው።`,
      Geez: `ዕረፍታ ለእመቤታችን ማርያም ድንግል በሰላም።`,
      Tigrinya: `ዕረፍቲ እመቤትና ቅድስቲ ድንግል ማርያም (ዕርገት ነፍሳ)።`,
      English: `The Feast of Asterio Maryam on Tir 21 commemorates the dormition (falling asleep) of the Blessed Virgin Mary.

According to holy tradition, when Saint Mary departed from this earthly life, the Apostles gathered to bury her. However, to protect her sacred body from hostile elements, the angels of God translated her body to Paradise under the tree of life. It is a day of solemn reflection and gratitude for her motherly intercession.`,
      AfaanOromo: `Asterio Maryam`
    },
    '8-2': {
      Amharic: `የስቅለት በዓል ጌታችንና መድኃኒታችን ኢየሱስ ክርስቶስ ለሰው ልጆች ድኅነት ሲል በቀራንዮ አደባባይ በመስቀል ላይ የሞተበት ታላቅ የሕማማት ሳምንት ዓርብ ነው።

ጌታችን ለአዳምና ለልጆቹ ፍቅር ሲል ግርፋትን፣ ስድብንና መከራን ሁሉ ተቀብሎ በመስቀል ላይ ተሰቅሏል። በዚህ ዕለት ምዕመናን ሙሉ ቀን በመጾም፣ ስግደት በመስገድና የሕማማት መጻሕፍትን በማንበብ ፍጹም በሆነ ጸሎትና ሐዘን ያሳልፉታል።`,
      Geez: `ዕለተ ስቅለቱ ለእግዚእነ በጎልጎታ።`,
      Tigrinya: `ጐይታና የሱስ ክርስቶስ ስለ ድሕነትና ዝተሰቐለሉ ዓርቢ ስቕለት።`,
      English: `Good Friday (Siklet) commemorates the passion, crucifixion, and death of Jesus Christ on Golgotha for the salvation of humanity.

Christ willingly bore the cross, stripes, spit, and humiliation to redeem mankind from the bondage of sin. The day is observed with deep fasting, thousands of prostrations (Sigdet), and continuous reading of the homilies and biblical passages of Christ's passion.`,
      AfaanOromo: `Good Friday (Siklet)`
    },
    '8-4': {
      Amharic: `የትንሣኤ በዓል (ፋሲካ) ጌታችን ሞትን አሸንፎ፣ የሲኦልን ደጆች ሰብሮና መቃብርን ክፈት አድርጎ በታላቅ ኃይልና ሥልጣን የተነሳበት የብርሃንና የድል በዓል ነው።

ይህ በዓል የክርስትና እምነት መሠረትና የሕይወት መታደስ ማረጋገጫ ነው። ምዕመናን ለ፶፮ ቀናት ያህል የቆዩትን ታላቁን የዓብይ ጾም በታላቅ በዓልና ደስታ ይፈታሉ። በኢትዮጵያ ባህል ቤተሰቦች ተሰባስበው ዶሮ፣ በግ በማረድ በደስታ ያከብሩታል።`,
      Geez: `ትንሣኤሁ ለክርስቶስ እምነ ሙታን በኃይል ታዕካ።`,
      Tigrinya: `ዓብዪ ዓመታዊ በዓል ትንሣኤ (ፋሲካ) ጎይታና።`,
      English: `Fasika (Easter) celebrates the glorious resurrection of Jesus Christ from the dead, conquering death and breaking the gates of Hades.

This feast is the core foundation of the Christian faith, symbolizing the ultimate triumph of life over death, and light over darkness. It marks the culmination of the 56-day Great Lent, celebrated with grand home feasts, traditional sourdough bread (Dabo), and joyful family gatherings.`,
      AfaanOromo: `Easter - Fasika`
    },
    '8-23': {
      Amharic: `የቅዱስ ጊዮርጊስ ዓመታዊ በዓል የሚያዝያ ሀያ ሦስት ቀን ነው። የሰማዕታት አለቃ የሆነው ቅዱስ ጊዮርጊስ ሰባት ዓመት ሙሉ መከራ ከተቀበለ በኋላ የሰማዕትነት አክሊልን የተቀዳጀበት ዕለት ነው።

ቅዱስ ጊዮርጊስ ስለ ክርስቶስ እምነቱ ሲል በነገሥታት ፊት በመቆም ምስክርነቱን የሰጠ ሲሆን፣ ሰባት ዓመት ሙሉ ታላላቅ መከራዎችንና ሥቃዮችን በጽናት ተቀብሏል። በመጨረሻም የሰማዕትነት አክሊልን ተቀዳጅቷል። በኢትዮጵያ የነፃነትና የድል አርማ ተደርጎ የሚወሰድ ታላቅ አባት ነው።`,
      Geez: `ዕረፍቱ ለቅዱስ ጊዮርጊስ ኮከበ ልዳ።`,
      Tigrinya: `ዓመታዊ በዓል ዕረፍቲ ቅዱስ ጊዮርጊስ።`,
      English: `The annual feast of Saint George of Lydda is celebrated on Miyazya 23. Known as the Prince of Martyrs, he courageously confessed his faith before the pagan Roman emperors.

He endured horrific tortures over a span of seven years before receiving his martyr's crown. Saint George is deeply loved in Ethiopia, serving as a symbol of victory, faith, and military valor, famously associated with the Battle of Adwa.`,
      AfaanOromo: `St. George`
    },
    '9-1': {
      Amharic: `የእመቤታችን ልደታ ማርያም የግንቦት መጀመሪያ ቀን ነው። እመቤታችን ቅድስት ድንግል ማርያም ከወላጆቿ ከኢያቄም እና ከሐና የተወለደችበት ታላቅ ዓመታዊ በዓል ነው።

ይህ በዓል የድኅነታችን መጀመሪያ፣ የኪዳን ዋዜማ በመሆኑ በቤተክርስቲያን ታላቅ ክብርና ዝማሬ ይቀርብበታል።`,
      Geez: `ልደታ ለማርያም እምኢያቄም ወሐና።`,
      Tigrinya: `ዓብዪ ዓመታዊ በዓል ልደት እመቤትና ማርያም።`,
      English: `Lideta Maryam commemorates the miraculous birth of the Blessed Virgin Mary to her righteous parents, Joachim and Anne, on Ginbot 1.

Her birth is regarded as the dawn of salvation, ushering in the covenant of mercy and the path to the Incarnation of Jesus Christ. It is celebrated with joyful midnight hymns and parish liturgies.`,
      AfaanOromo: `Lideta Maryam`
    },
    '9-13': {
      Amharic: `የዕርገት በዓል ጌታችን በክብርና በምስጋና ወደ ሰማይ ያረገበት ዕለት ነው። ከትንሣኤ በኃላ በአርባኛው ቀን የሚከበር በዓል ነው።

ጌታችን ለደቀ መዛሙርቱ ተገልጦላቸው ከባረካቸው በኋላ በክብር ወደ ሰማይ አርጓል፣ በአብ ቀኝም ተቀምጧል። ይህ በዓል ለሰዎች ሁሉ ወደ ሰማይ የመግባት ተስፋ የተሰጠበት ታላቅ መንፈሳዊ በዓል ነው።`,
      Geez: `ዕረፍቱ ለእግዚእነ በክብር ወበስብሐት።`,
      Tigrinya: `በዓል ዕርገት ጎይታ የሱስ ክርስቶስ ናብ ሰማይ።`,
      English: `The Feast of the Ascension (Erget) is celebrated 40 days after Easter. It commemorates Jesus Christ ascending bodily into heaven in the presence of His disciples.

He blessed them and was taken up in glory, seated at the right hand of the Father. This feast reaffirms the hope of heavenly ascension and eternal life for all believers.`,
      AfaanOromo: `Ascension - Erget`
    },
    '9-23': {
      Amharic: `የጰራቅሊጦስ በዓል ከትንሣኤ በኃላ በሀምሳኛው ቀን የሚከበር በዓል ነው። ለሐዋርያት የእውነት መንፈስ (መንፈስ ቅዱስ) የወረደበት ዕለት ነው።

በዚህ ዕለት ሐዋርያት በአንድነት ተሰብስበው ሳለ፣ የመንፈስ ቅዱስ ኃይል በእሳት ላንቃዎች አምሳል ወርዶባቸዋል። በልዩ ልዩ ቋንቋዎች እንዲናገሩና ወንጌልን በዓለም ሁሉ እንዲሰብኩ ታላቅ ኃይልና ድፍረትን ሰጥቷቸዋል።`,
      Geez: `ጰራቅሊጦስ ወረደ መንፈስ ቅዱስ።`,
      Tigrinya: `በዓል ጰራቅሊጦስ (ምውራድ መንፈስ ቅዱስ)።`,
      English: `Pentecost (Paraclitos) is celebrated 50 days after Easter. It commemorates the descent of the Holy Spirit upon the Apostles in the form of tongues of fire.

This miraculous event empowered the Apostles to speak in diverse tongues and boldly preach the Gospel to all nations, marking the birth of the worldwide Christian Church.`,
      AfaanOromo: `Pentecost - Paraclitos`
    },
    '12-24': {
      Amharic: `የአቡነ ተክለ ሃይማኖት ዓመታዊ በዓል የነሐሴ ሀያ ራት ቀን ነው። ታላቁ የኢትዮጵያ ጻድቅ አባት አቡነ ተክለ ሃይማኖት በብዙ ገድልና ጸሎት ኖረው ያረፉበት ዕለት ነው።

አቡነ ተክለ ሃይማኖት በብዙ ገድል፣ ጾምና ጸሎት የኖሩ፣ ወንጌልን በኢትዮጵያ ምድር በሰፊው የሰበኩ ታላቅ ጻድቅ ናቸው። በአንድ እግራቸው ቆመው ለሰባት ዓመታት ያህል በመጸለይና በብዙ ተአምራት የታወቁ በመሆናቸው በምዕመናን ዘንድ ታላቅ ፍቅርና ክብር አላቸው።`,
      Geez: `ዕረፍቱ ለአቡነ ተክለ ሃይማኖት ዘምድረ ሸዋ።`,
      Tigrinya: `ዓመታዊ ዓብዪ በዓል ዕረፍቲ አቡነ ተክለ ሃይማኖት።`,
      English: `The annual feast of Saint Tekle Haymanot is celebrated on Nehase 24. He is one of Ethiopia's most revered saints, renowned for his monastic devotion and evangelism.

He traveled extensively preaching the Gospel and established the historic monastery of Debre Libanos. Tradition holds that he prayed standing on one foot for seven years, and his legacy remains a foundational pillar of Ethiopian monasticism.`,
      AfaanOromo: `Abune Tekle Haymanot`
    }
  };

  const key = `${month}-${day}`;
  const defaultHistories: Record<Language, string> = {
    Amharic: `በዚህ ቅዱስ ዕለት በኢትዮጵያ ቤተክርስቲያን ታሪክና ስንክሳር (የቅዱሳን ሕይወት መዝገብ) መሠረት የዕለቱ ቅዱሳንና ሰማዕታት ይዘከራሉ።

ቅዱሳን የጽድቅና የቅድስና ሕይወታቸውን በታማኝነት በመፈጸም ለእኛ አርአያ ሆነዋል። የእነርሱ መታሰቢያ በዓል እኛም በሕይወታችን መንፈሳዊ ጥንካሬንና እምነትን እንድንማር ያነሳሳናል። 

በዕለቱ የሚከናወኑት የኪዳን ጸሎት፣ ምስጋናና ቅዳሴዎች ምዕመናንን በረከትን ያሳድላሉ።`,
    Geez: `በዚህ ቅዱስ ዕለት በኢትዮጵያ ቤተክርስቲያን ታሪክና ስንክሳር (የቅዱሳን ሕይወት መዝገብ) መሠረት የዕለቱ ቅዱሳንና ሰማዕታት ይዘከራሉ።

ቅዱሳን የጽድቅና የቅድስና ሕይወታቸውን በታማኝነት በመፈጸም ለእኛ አርአያ ሆነዋል። የእነርሱ መታሰቢያ በዓል እኛም በሕይወታችን መንፈሳዊ ጥንካሬንና እምነትን እንድንማር ያነሳሳናል። 

በዕለቱ የሚከናወኑት የኪዳን ጸሎት፣ ምስጋናና ቅዳሴዎች ምዕመናንን በረከትን ያሳድላሉ።`,
    Tigrinya: `ኣብዚ ቅዱስ ዕለት እዚ ብመሰረት ታሪኽ ቤተክርስቲያንን መጽሓፈ ስንክሳርን ናይቲ መዓልቲ ቅዱሳንን ሰማዕታትን ይዝከሩ።

ቅዱሳን ናይ ጽድቅን ቅድስናን ህይወቶም ብእምነት ብምፍጻም ንዓና ኣብነት ኮይኖሙና እዮም። በዓላቶም ምዝካር ድማ ኣብ መንፈሳዊ ህይወትና ንኽንጠናኸር ይሕግዘና።`,
    English: `On this sacred day, we commemorate the saints, martyrs, and angelic hosts assigned in the Synaxarium (the book of saints' departures and miracles) and liturgical readings of the Ethiopian Orthodox Tewahedo Church.

The lives of the saints serve as timeless beacons of faith, endurance, and love for God. Commemorating them reminds us of our spiritual heritage and encourages continuous devotion. 

The daily covenant prayers (Kidan), liturgies, and hymns of Saint Yared offered in parish temples globally enrich the spiritual lives of believers.`,
    AfaanOromo: `Guyyaa qulqulluu kana irratti, yaadannoo qulqullootaa fi wareegamtoota mana kiristaanaa kan yaadatamu dha. Jireenya qulqullootaa irraa barumsa amantii fi obsaa ni arganna.`
  };

  return histories[key]?.[lang] || defaultHistories[lang] || defaultHistories['English'];
};

export default CalendarPage;
