import { Language } from '../types';

export const MONTH_NAMES: Record<Language, string[]> = {
  Amharic: ['መስከረም', 'ጥቅምት', 'ሕዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'],
  Geez: ['መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'],
  Tigrinya: ['መስከረም', 'ጥቅምቲ', 'ሕዳር', 'ታኅሣሥ', 'ጥሪ', 'የካቲት', 'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሓምለ', 'ነሓሰ', 'ጳጉሜ'],
  English: ['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit', 'Megabit', 'Miyazya', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'],
  AfaanOromo: ['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit', 'Megabit', 'Miyazya', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume']
};

export const WEEKDAYS: Record<Language, string[]> = {
  Amharic: ['እሑ', 'ሰኞ', 'ማክ', 'ረቡ', 'ሐሙ', 'ዓር', 'ቅዳ'],
  Geez: ['እሑ', 'ሰኞ', 'ማክ', 'ረቡ', 'ሐሙ', 'ዓር', 'ቅዳ'],
  Tigrinya: ['እሑ', 'ሰኞ', 'ማክ', 'ረቡ', 'ሐሙ', 'ዓር', 'ቅዳ'],
  English: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  AfaanOromo: ['Dil', 'Wix', 'Kib', 'Rob', 'Kam', 'Jim', 'San']
};

export interface HolidayDetail {
  day: number;
  name: Record<Language, string>;
  desc: Record<Language, string>;
  type: 'major' | 'minor' | 'fast';
}

// Fixed Monthly Holidays and notable moveable feasts calculated/mapped for ET 2018 (2025/2026 Gregorian)
export const HOLIDAYS_BY_MONTH: Record<number, HolidayDetail[]> = {
  1: [ // Meskerem
    {
      day: 1,
      name: {
        Amharic: 'ርዕሰ ዓውደ ዓመት (እንቁጣጣሽ)',
        Geez: 'ርዕሰ ዓውደ ዓመት (እንቁጣጣሽ)',
        Tigrinya: 'እንቁጣጣሽ (ሓድሽ ዓመት)',
        English: 'Enkutatash (Ethiopian New Year)',
        AfaanOromo: 'Enkutatash (Hagayya)'
      },
      desc: {
        Amharic: 'እንቁጣጣሽ (አዲስ ዓመት)፦ የመስከረም መጀመሪያ ቀን። የዘመን መለወጫ እና የቅዱስ ዮሐንስ መጥምቅ መታሰቢያ በዓል ነው።',
        Geez: 'ቅዳሜ ዕለት ዘአዲስ ዓመት ዘኢትዮጵያ። መክፈቻ ዘመን በዮሐንስ መጥምቅ።',
        Tigrinya: 'መጀመርታ ሓድሽ ዓመት ኢትዮጵያ። ተፈጥሮ ዝሕደሰሉን ቅዱስ ዮሃንስ ዝዝከረሉን ዕለት።',
        English: 'The start of the Ethiopian New Year. It marks the transition of seasons, blooming of yellow daisies (Adey Abeba), and commemorates Saint John the Baptist.',
        AfaanOromo: 'Mootummaa bara haaraa Itoophiyaa. Adey Abebaan kan duresse dhufe dha.'
      },
      type: 'major'
    },
    {
      day: 2,
      name: {
        Amharic: 'ቅዱስ ዮሐንስ መጥምቅ',
        Geez: 'ቅዱስ ዮሐንስ መጥምቅ',
        Tigrinya: 'ቅዱስ ዮሃንስ መጥምቅ',
        English: 'St. John the Baptist',
        AfaanOromo: 'St. John the Baptist'
      },
      desc: {
        Amharic: 'ጌታችንን ያጠመቀው የቅዱስ ዮሐንስ መጥምቅ በዓለ ዕረፍት።',
        Geez: 'ዕረፍቱ ለቅዱስ ዮሐንስ መጥምቅ ዘአጥመቆ ለክርስቶስ።',
        Tigrinya: 'ዕረፍቲ ናይቲ ንጎይታ ዘጠመቐ ቅዱስ ዮሃንስ መጥምቅ።',
        English: 'Commemoration of the martyrdom/departure of Saint John the Baptist, who paved the way for Jesus Christ.',
        AfaanOromo: 'Guyyaa yaadannoo Qulqulluu Yohannis Cuuphaa.'
      },
      type: 'minor'
    },
    {
      day: 10,
      name: {
        Amharic: 'ጸደኒያ ለማርያም',
        Geez: 'ጸደኒያ ለማርያም',
        Tigrinya: 'ጸደኒያ ለማርያም',
        English: 'Tsedeniya Maryam',
        AfaanOromo: 'Tsedeniya Maryam'
      },
      desc: {
        Amharic: 'በሶርያ በምትገኘው ጸደኒያ በምትባል ስፍራ የእመቤታችን ቅድስት ድንግል ማርያም ሥዕል ተአምር ያደረገበት ዕለት።',
        Geez: 'በዓለ ሥዕላ ለማርያም ዘሃገረ ጸደኒያ በሶርያ።',
        Tigrinya: 'ኣብ ሶርያ ኣብ እትርከብ ጸደኒያ ስእሊ እመቤትና ተኣምር ዝገበረሉ ዕለት።',
        English: 'Feast commemorating the miracle of the icon of our Holy Lady Saint Mary in Tsedeniya, Syria, which wept holy oil.',
        AfaanOromo: 'Guyyaa yaadannoo fakkii dubree Maariyaam isa Tsedeniyaa mirra zayita dhangalaase.'
      },
      type: 'minor'
    },
    {
      day: 17,
      name: {
        Amharic: 'በዓለ መስቀል',
        Geez: 'በዓለ መስቀል',
        Tigrinya: 'በዓለ መስቀል',
        English: 'Finding of the True Cross (Meskel)',
        AfaanOromo: 'Finding of the True Cross (Meskel)'
      },
      desc: {
        Amharic: 'የመስቀል በዓል፦ የመስከረም አሥራ ሰባት ቀን። ንግሥት ዕሌኒ የጌታችንን እውነተኛ መስቀል በደመራ ጭስ አማካኝነት ከተቀበረበት ቦታ የፈለገችበትና ያገኘችበት ዕለት ነው።',
        Geez: 'ብእሴተ እግዚአብሔር ንግሥት ዕሌኒ ረከበቶ ለዕፀ መስቀል ዕውር።',
        Tigrinya: 'ንግስቲ ዕሌኒ ዕንጨት መስቀል ጎይታ ዝረኸበትሉን ዘበሰረትሉን ዓብዪ በዓል።',
        English: 'The magnificent feast of the Finding of the True Cross by Queen Helena, celebrated with the lighting of bonfires (Demera). Listed as UNESCO Intangible Cultural Heritage.',
        AfaanOromo: 'Ayyaana Masqalaa guddaa, dachee irratti argama fannoo yaadatamu.'
      },
      type: 'major'
    },
    {
      day: 21,
      name: {
        Amharic: 'ብርሃነ ማርያም',
        Geez: 'ብርሃነ ማርያም',
        Tigrinya: 'ብርሃነ ማርያም',
        English: 'Birhane Maryam',
        AfaanOromo: 'Birhane Maryam'
      },
      desc: {
        Amharic: 'የእመቤታችን የቅድስት ድንግል ማርያም ወርሃዊ በዓል።',
        Geez: 'ዝክረ በዓላ ለእመቤታችን ድንግል ማርያም ዘመስከረም።',
        Tigrinya: 'ወርሓዊ በዓል ናይ እመቤትና ቅድስቲ ድንግል ማርያም ናይ መስከረም ወርሒ።',
        English: 'Monthly commemoration of Saint Mary, particularly celebrated in Meskerem as "Birhane Maryam" (Light of Mary).',
        AfaanOromo: 'Ayyaana ji\'aa Dubree Maariyaam dhaloota ifaa yaadatamu.'
      },
      type: 'minor'
    },
    {
      day: 27,
      name: {
        Amharic: 'የመድኃኔዓለም በዓል',
        Geez: 'በዓለ መድኃኔዓለም',
        Tigrinya: 'በዓል መድኃኔዓለም',
        English: 'Feast of Medhane Alem (Savior of the World)',
        AfaanOromo: 'Ayyaana Medhane Alem (Fayyisaa Addunyaa)'
      },
      desc: {
        Amharic: 'የመድኃኔዓለም በዓል፦ የመስከረም ሀያ ሰባት ቀን። የዓለም መድኃኒት የሆነው ጌታችን ኢየሱስ ክርስቶስ ለአዳምና ለልጆቹ ያደረገው የማዳን ውለታ የሚታሰብበት ታላቅ በዓል ነው።',
        Geez: 'በዓለ መድኃኔዓለም ዘገብረ መድኃኒተ ለኩሉ ዓለም።',
        Tigrinya: 'ናይ ዓለም መድሓኒት ዝኾነ ጎይታና ኢየሱስ ክርስቶስ ንኣዳምን ንደቁን ዝገበሮ ናይ ምድሓን ውዕለት ዝዝከረሉ ዓብዪ በዓል።',
        English: 'The great feast commemorating Jesus Christ as Medhane Alem ("Savior of the World"), celebrating His ultimate act of salvation and mercy for humanity.',
        AfaanOromo: 'Ayyaana guddaa fayiisaa addunyaa kan ta\'e Gooftaa keenya Iyyasuus Kiristoos fayyinna namaaf tolche yaadatamu.'
      },
      type: 'major'
    },
    {
      day: 29,
      name: {
        Amharic: 'ቅድስት አርሴማ',
        Geez: 'ቅድስት አርሴማ',
        Tigrinya: 'ቅድስት አርሴማ',
        English: 'St. Arsema',
        AfaanOromo: 'St. Arsema'
      },
      desc: {
        Amharic: 'የቅድስት አርሴማ ሰማዕትነት የተፈጸመበት ታላቅ በዓል።',
        Geez: 'ስምዕታ ለቅድስት ሰማዕት አርሴማ።',
        Tigrinya: 'ሰማዕትነት ናይ ሰማዕት ቅድስት አርሴማ ዝዝከረሉ ዕለት።',
        English: 'Commemoration of the martyrdom of Saint Arsema (Hripsime), the heroic virgin saint revered for her purity and devotion.',
        AfaanOromo: 'Guyyaa yaadannoo Qulqulluu Arseemaa ishee Wareegamtuu.'
      },
      type: 'minor'
    }
  ],
  2: [ // Tikimt
    {
      day: 5,
      name: {
        Amharic: 'አቡነ ገብረ መንፈስ ቅዱስ',
        Geez: 'አቡነ ገብረ መንፈስ ቅዱስ',
        Tigrinya: 'አቡነ ገብረ መንፈስ ቅዱስ',
        English: 'Abune Gebre Menfas Qidus',
        AfaanOromo: 'Abune Gebre Menfas Qidus'
      },
      desc: {
        Amharic: 'የጻድቁ የአቡነ ገብረ መንፈስ ቅዱስ (አቦ) ወርሃዊ መታሰቢያ በዓል።',
        Geez: 'ዝክረ በዓሉ ለጻድቅ ገብረ መንፈስ ቅዱስ።',
        Tigrinya: 'መዘኻኸሪ ናይቲ ጻድቕ አቡነ ገብረ መንፈስ ቅዱስ።',
        English: 'The monthly feast of the great hermit saint, Abune Gebre Menfas Qidus, renowned for his extreme asceticism and love for animals.',
        AfaanOromo: 'Yaadannoo Abune Gebre Menfas Qidus (Aboo) isa jaalatamaa.'
      },
      type: 'minor'
    },
    {
      day: 14,
      name: {
        Amharic: 'አቡነ አረጋዊ',
        Geez: 'አቡነ አረጋዊ',
        Tigrinya: 'አቡነ አረጋዊ',
        English: 'Abune Aragawi',
        AfaanOromo: 'Abune Aragawi'
      },
      desc: {
        Amharic: 'ከዘጠኙ ቅዱሳን አንዱ የሆኑት የአቡነ አረጋዊ በዓለ ዕረፍት (ደብረ ዳሞ)።',
        Geez: 'ዕረፍቱ ለአረጋዊ ዘደብረ ዳሞ ሰማያዊ።',
        Tigrinya: 'ዕረፍቲ ናይቲ ካብ ትሽዓተ ቅዱሳን ሓደ ዝኾነ አቡነ አረጋዊ (ደብረ ዳሞ)።',
        English: 'Annual feast of Abune Aragawi (Za-Mikael), one of the Nine Saints who established monasticism in Ethiopia and climbed Mount Debre Damo on a serpent.',
        AfaanOromo: 'Guyyaa yaadannoo Abune Aragawi isa gaara Debre Damo koran.'
      },
      type: 'major'
    },
    {
      day: 17,
      name: {
        Amharic: 'ቅዱስ እስጢፋኖስ',
        Geez: 'ቅዱስ እስጢፋኖስ',
        Tigrinya: 'ቅዱስ እስጢፋኖስ',
        English: 'St. Stephen the Protomartyr',
        AfaanOromo: 'St. Stephen'
      },
      desc: {
        Amharic: 'የመጀመሪያው ሰማዕት የቅዱስ እስጢፋኖስ በዓለ መታሰቢያ።',
        Geez: 'ሊቀ ዲያቆናት ወቀዳሜ ሰማዕት እስጢፋኖስ።',
        Tigrinya: 'ቀዳማይ ሰማዕት ቅዱስ እስጢፋኖስ ዝዝከረሉ ዕለት።',
        English: 'Commemoration of Saint Stephen, the first Christian martyr and chief deacon.',
        AfaanOromo: 'Yaadannoo Qulqulluu Isxifanos wareegamaa jalqabaa.'
      },
      type: 'minor'
    },
    {
      day: 28,
      name: {
        Amharic: 'ቅዱስ አማኑኤል',
        Geez: 'ቅዱስ አማኑኤል',
        Tigrinya: 'ቅዱስ አማኑኤል',
        English: 'St. Emmanuel',
        AfaanOromo: 'St. Emmanuel'
      },
      desc: {
        Amharic: 'የጌታችን የመድኃኒታችን የኢየሱስ ክርስቶስ በዓለ አማኑኤል ("እግዚአብሔር ከእኛ ጋር ነው")።',
        Geez: 'በዓለ አማኑኤል ቃለ እግዚአብሔር ዘወረደ።',
        Tigrinya: 'በዓል አማኑኤል ጐይታናን መድሓኒናን የሱስ ክርስቶስ።',
        English: 'Commemoration of Emmanuel ("God with us"), celebrating the divine incarnation and protection of Jesus Christ.',
        AfaanOromo: 'Guyyaa yaadannoo Amaanu\'eel (Waaqayyo nu wajjin jira).'
      },
      type: 'minor'
    },
    {
      day: 30,
      name: {
        Amharic: 'ቅዱስ ማርቆስ',
        Geez: 'ቅዱስ ማርቆስ',
        Tigrinya: 'ቅዱስ ማርቆስ',
        English: 'St. Mark the Evangelist',
        AfaanOromo: 'St. Mark'
      },
      desc: {
        Amharic: 'የወንጌላዊው ቅዱስ ማርቆስ ወርሃዊ መታሰቢያ።',
        Geez: 'ዝክረ በዓሉ ለማርቆስ ወንጌላዊ።',
        Tigrinya: 'ወርሓዊ ዝክረ በዓል ቅዱስ ማርቆስ ወንጌላዊ።',
        English: 'Monthly commemoration of Saint Mark the Evangelist, writer of the Gospel and founder of the Church of Alexandria.',
        AfaanOromo: 'Yaadannoo Qulqulluu Marqos ergamaa fi barreessaa wangeelaa.'
      },
      type: 'minor'
    }
  ],
  3: [ // Hidar
    {
      day: 6,
      name: {
        Amharic: 'ቁስቋም ለማርያም',
        Geez: 'ቁስቋም ለማርያም',
        Tigrinya: 'ቁስቋም ለማርያም',
        English: 'Qusquam Maryam',
        AfaanOromo: 'Qusquam Maryam'
      },
      desc: {
        Amharic: 'እመቤታችን በስደት ዘመኗ በግብፅ ቁስቋም ደብረ ተራራ ያረፈችበትና ስደቷ ያበቃበት መታሰቢያ።',
        Geez: 'እመቤታችን ዘሃገረ ቁስቋም በምድረ ግብፅ።',
        Tigrinya: 'እመቤትና ምስ ቅዱስ ዮሴፍን ሰሎሜን ኣብ ስደት ምድረ ግብጺ ዘብቅዓሉ ቅዱስ ዕለት።',
        English: 'Feast commemorating the end of the Holy Family\'s exile and their return from Egypt, centering on Mount Qusquam.',
        AfaanOromo: 'Guyyaa yaadannoo dhuma godaansa maatii qulqulluu biyya Gibxi.'
      },
      type: 'major'
    },
    {
      day: 7,
      name: {
        Amharic: 'ሕንጸተ ቤተ ክርስቲያን',
        Geez: 'ሕንጸተ ቤተ ክርስቲያን',
        Tigrinya: 'ሕንጸተ ቤተ ክርስቲያን',
        English: 'Consecration of the Church of St. Mary',
        AfaanOromo: 'Consecration of the Church'
      },
      desc: {
        Amharic: 'በእመቤታችን ስም የመጀመሪያዋ ቤተክርስቲያን የታነጸችበትን (ፊልጵስዩስ) ታላቅ መታሰቢያ።',
        Geez: 'ሕንጸተ ቤተ ክርስቲያን ዘፊልጵስዩስ በስመ ማርያም።',
        Tigrinya: 'ቀዳማይ ቤተክርስቲያን ብስም እመቤትና ማርያም ዝተሃነጸሉ ዕለት።',
        English: 'Commemoration of the consecration of the first church dedicated to the Virgin Mary in Philippi by the Apostles.',
        AfaanOromo: 'Consecration mana kiristaanaa jalqabaa Dubree Maariyaamiif ijaarame.'
      },
      type: 'minor'
    },
    {
      day: 12,
      name: {
        Amharic: 'ቅዱስ ሚካኤል',
        Geez: 'ቅዱስ ሚካኤል',
        Tigrinya: 'ቅዱስ ሚካኤል',
        English: 'St. Michael the Archangel',
        AfaanOromo: 'St. Michael'
      },
      desc: {
        Amharic: 'የቅዱስ ሚካኤል ዓመታዊ በዓል፦ የሕዳር አሥራ ሁለት ቀን። ቅዱስ ሚካኤል ሳጥናኤልን ድል አድርጎ የቆመበትና የመላእክት አለቃ ሆኖ የተሾመበት ዕለት ነው።',
        Geez: 'ሊቀ መላእክት ቅዱስ ሚካኤል ክቡር።',
        Tigrinya: 'ዕብዪ በዓል ሊቀ መላእክት ቅዱስ ሚካኤል ናይ ሕዳር ወርሒ።',
        English: 'The major annual feast of Saint Michael the Archangel, celebrating his appointment as chief of the heavenly hosts.',
        AfaanOromo: 'Ayyaana waggaa ergamaa ol\'aanaa Qulqulluu Mikaa\'eel.'
      },
      type: 'major'
    },
    {
      day: 13,
      name: {
        Amharic: 'እግዚአብሔር አብ',
        Geez: 'እግዚአብሔር አብ',
        Tigrinya: 'እግዚአብሔር አብ',
        English: 'Feast of God the Father',
        AfaanOromo: 'Feast of God the Father'
      },
      desc: {
        Amharic: 'የእግዚአብሔር አብ ዓመታዊ በዓለ መታሰቢያ።',
        Geez: 'በዓለ እግዚአብሔር አብ ፈጣሪ ኩሉ ዓለም።',
        Tigrinya: 'ዓመታዊ በዓለ እግዚአብሔር አብ ፈጣሪ ዂሉ።',
        English: 'Special annual feast dedicated to God the Father, focusing on His creation and unconditional love.',
        AfaanOromo: 'Ayyaana Waaqa Abbaa uumaa hundumaa yaadatamu.'
      },
      type: 'major'
    },
    {
      day: 15,
      name: {
        Amharic: 'ጾመ ነቢያት (መጀመሪያ)',
        Geez: 'ጾመ ነቢያት',
        Tigrinya: 'ጾመ ነቢያት',
        English: 'Beginning of the Prophets Fast (Tsome Nebiyat)',
        AfaanOromo: 'Tsome Nebiyat'
      },
      desc: {
        Amharic: 'የገና ጾም (ጾመ ነቢያት) መጀመሪያ ቀን።',
        Geez: 'ቀዳሜ ዕለት ዘጾመ ነቢያት (ጾመ ገና)።',
        Tigrinya: 'መጀመርታ ጾመ ነቢያት (ጾመ ገና)።',
        English: 'The start of the fast preceding the Nativity, also known as the Fast of the Prophets (Tsome Nebiyat) or Christmas Fast.',
        AfaanOromo: 'Guyyaa jalqabaa sooma nabiif (sooma gannaa).'
      },
      type: 'fast'
    },
    {
      day: 21,
      name: {
        Amharic: 'ጽዮን ማርያም',
        Geez: 'ጽዮን ማርያም',
        Tigrinya: 'ጽዮን ማርያም',
        English: 'Hidar Tsion Maryam (St. Mary of Axum)',
        AfaanOromo: 'Hidar Tsion Maryam'
      },
      desc: {
        Amharic: 'የታቦተ ጽዮን ወደ ኢትዮጵያ (አክሱም) መምጣትና የተሰጣት ቃልኪዳን የሚታሰብበት ታላቅ ታሪካዊ በዓል።',
        Geez: 'ጽዮን ማርያም ዘሃገረ አክሱም ዘእምነቱ ጽላት።',
        Tigrinya: 'ዓብዪ ዓመታዊ በዓል ጽዮን ማርያም ኣብ አክሱም። ጽላት ኪዳን ዝመጸሉ ዕለት።',
        English: 'The grand annual pilgrimage and feast of Saint Mary of Axum (Hidar Tsion), celebrating the arrival of the Ark of the Covenant in Ethiopia.',
        AfaanOromo: 'Ayyaana Tsiyoon Maariyaam Axumitti kabajamu guddaa.'
      },
      type: 'major'
    },
    {
      day: 25,
      name: {
        Amharic: 'ቅዱስ መርቆሬዎስ',
        Geez: 'ቅዱስ መርቆሬዎስ',
        Tigrinya: 'ቅዱስ መርቆሬዎስ',
        English: 'St. Mercurius (Philopater)',
        AfaanOromo: 'St. Mercurius'
      },
      desc: {
        Amharic: 'የታላቁ ሰማዕት የቅዱስ መርቆሬዎስ (ፒልፓተር) ዓመታዊ በዓል።',
        Geez: 'ሰማዕት መርቆሬዎስ ክቡር።',
        Tigrinya: 'ዕረፍቲ ናይቲ ዓብዪ ሰማዕት ቅዱስ መርቆሬዎስ።',
        English: 'The annual feast of Saint Mercurius, a military commander who was martyred for refusing to sacrifice to pagan idols.',
        AfaanOromo: 'Yaadannoo Qulqulluu Marqorewoos loltuu wareegamaa.'
      },
      type: 'major'
    },
    {
      day: 26,
      name: {
        Amharic: 'አቡነ ሀብተ ማርያም',
        Geez: 'አቡነ ሀብተ ማርያም',
        Tigrinya: 'አቡነ ሀብተ ማርያም',
        English: 'Abune Habte Maryam',
        AfaanOromo: 'Abune Habte Maryam'
      },
      desc: {
        Amharic: 'የኢትዮጵያዊው ጻድቅ አቡነ ሀብተ ማርያም ዕረፍት።',
        Geez: 'ዕረፍቱ ለጻድቅ አቡነ ሀብተ ማርያም ጽጌ።',
        Tigrinya: 'ዕረፍቲ ናይቲ ጻድቕ አቡነ ሀብተ ማርያም።',
        English: 'The annual feast commemorating the departure of the righteous Ethiopian father, Saint Habte Maryam.',
        AfaanOromo: 'Guyyaa yaadannoo abbaa amantii Abune Habte Maariyaam.'
      },
      type: 'major'
    }
  ],
  4: [ // Tahsas
    {
      day: 3,
      name: {
        Amharic: 'በዓታ ለማርያም',
        Geez: 'በዓታ ለማርያም',
        Tigrinya: 'በዓታ ለማርያም',
        English: 'Presentation of the Virgin Mary (Ba\'ata)',
        AfaanOromo: 'Ba\'ata Maryam'
      },
      desc: {
        Amharic: 'እመቤታችን ቅድስት ድንግል ማርያም በሦስት ዓመቷ ወደ ቤተ መቅደስ የገባችበት ታላቅ በዓል።',
        Geez: 'ባዕታ ለማርያም በቤተ መቅደስ።',
        Tigrinya: 'እመቤታችን ቅድስቲ ድንግል ማርያም ኣብ ሳልሰይቲ ዓመታ ናብ ቤተ መቕደስ ዝአተወትሉ ዕለት።',
        English: 'Feast of the Presentation of Saint Mary in the Temple at Jerusalem at the age of three.',
        AfaanOromo: 'Ayyaana Maariyaam gara mana qulqullummaa ishee waggaa sadiitti galte.'
      },
      type: 'major'
    },
    {
      day: 6,
      name: {
        Amharic: 'ቅድስት አርሴማ',
        Geez: 'ቅድስት አርሴማ',
        Tigrinya: 'ቅድስት አርሴማ',
        English: 'St. Arsema',
        AfaanOromo: 'St. Arsema'
      },
      desc: {
        Amharic: 'የቅድስት አርሴማ ወርሃዊ መታሰቢያ።',
        Geez: 'ዝክረ በዓላ ለቅድስት አርሴማ ሰማዕት።',
        Tigrinya: 'ወርሓዊ ዝክረ በዓል ናይ ቅድስት አርሴማ።',
        English: 'Monthly feast of Saint Arsema, the virgin martyr of Armenia.',
        AfaanOromo: 'Yaadannoo ji\'aa Qulqulluu Arseemaa ishee durba wareegamtuu.'
      },
      type: 'minor'
    },
    {
      day: 19,
      name: {
        Amharic: 'በዓለ ቅዱስ ገብርኤል',
        Geez: 'ቅዱስ ገብርኤል',
        Tigrinya: 'ቅዱስ ገብርኤል',
        English: 'St. Gabriel the Archangel (Kulubi)',
        AfaanOromo: 'St. Gabriel'
      },
      desc: {
        Amharic: 'የቅዱስ ገብርኤል ዓመታዊ በዓል፦ የታኅሣሥ አሥራ ዘጠኝ ቀን። ቅዱስ ገብርኤል ሦስቱን ሕፃናት ከሚነድ እሳት ያዳነበትና ለአናንያ፣ ለአዛርያና ለሚሳኤል ረዳት ሆኖ የተገለጠበት ዕለት ነው።',
        Geez: 'ሊቀ መላእክት ቅዱስ ገብርኤል በሳንዮ።',
        Tigrinya: 'ዓብዪ ዓመታዊ በዓል ቅዱስ ገብርኤል (ቁሉቢ ገብርኤል)።',
        English: 'The mega annual feast of Saint Gabriel the Archangel, drawing millions of pilgrims to the Kulubi Gabriel shrine.',
        AfaanOromo: 'Ayyaana waggaa Qulqulluu Gabri\'eel inni Kulubitti kabajamu.'
      },
      type: 'major'
    },
    {
      day: 22,
      name: {
        Amharic: 'ብስራተ ገብርኤል',
        Geez: 'ብስራተ ገብርኤል',
        Tigrinya: 'ብስራተ ገብርኤል',
        English: 'Annunciation of St. Gabriel',
        AfaanOromo: 'Annunciation of St. Gabriel'
      },
      desc: {
        Amharic: 'ቅዱስ ገብርኤል ለእመቤታችን የልደተ ክርስቶስን የምስራች ያበሰረበት ዕለት።',
        Geez: 'ብስራተ ገብርኤል ለእመቤታችን ማርያም ድንግል ፈጣሪ።',
        Tigrinya: 'ቅዱስ ገብርኤል ንእመቤትና ምስራች ዝነገረሉ ቅዱስ ዕለት።',
        English: 'The Feast of the Annunciation, commemorating when Angel Gabriel announced the birth of Christ to the Virgin Mary.',
        AfaanOromo: 'Guyyaa ergamaan Gabri\'eel misiraachoo dhaloota gooftaa Dubreef hime.'
      },
      type: 'minor'
    },
    {
      day: 24,
      name: {
        Amharic: 'አቡነ ተክለ ሃይማኖት',
        Geez: 'አቡነ ተክለ ሃይማኖት',
        Tigrinya: 'አቡነ ተክለ ሃይማኖት',
        English: 'Abune Tekle Haymanot',
        AfaanOromo: 'Abune Tekle Haymanot'
      },
      desc: {
        Amharic: 'የአቡነ ተክለ ሃይማኖት ወርሃዊ በዓል።',
        Geez: 'ዝክረ በዓሉ ለአቡነ ተክለ ሃይማኖት።',
        Tigrinya: 'ወርሓዊ በዓል ናይ ጻድቕ አቡነ ተክለ ሃይማኖት።',
        English: 'Monthly celebration of the birth and monastic zeal of Saint Tekle Haymanot, the chief monk of Shoa.',
        AfaanOromo: 'Yaadannoo ji\'aa Abune Tekle Haymanot.'
      },
      type: 'minor'
    },
    {
      day: 28,
      name: {
        Amharic: 'ጾመ ገሃድ',
        Geez: 'ጾመ ገሃድ',
        Tigrinya: 'ጾመ ገሃድ',
        English: 'Christmas Eve (Tsome Gehad)',
        AfaanOromo: 'Christmas Eve'
      },
      desc: {
        Amharic: 'የልደተ ክርስቶስ (ገና) ዋዜማ ጾም።',
        Geez: 'ጾመ ገሃድ ዋዜማ ልደት።',
        Tigrinya: 'ጾም ገሃድ ዋዜማ ልደት።',
        English: 'The strict day-long fast of the Eve of the Nativity (Christmas Eve).',
        AfaanOromo: 'Sooma qophii guyyaa dhaloota gooftaa.'
      },
      type: 'fast'
    },
    {
      day: 29,
      name: {
        Amharic: 'ልደተ ክርስቶስ (ገና)',
        Geez: 'ልደተ ክርስቶስ',
        Tigrinya: 'ልደተ ክርስቶስ (ገና)',
        English: 'Lidet (Ethiopian Christmas / Genna)',
        AfaanOromo: 'Genna (Christmas)'
      },
      desc: {
        Amharic: 'የገና በዓል (ልደት)፦ የታኅሣሥ ሀያ ዘጠኝ ቀን (በዘመነ ዮሐንስ ታኅሣሥ ሀያ ስምንት)። ጌታችን መድኃኒታችን ኢየሱስ ክርስቶስ በቤተልሔም ግራት በሥጋ የተወለደበት ታላቅ የደስታ በዓል ነው።',
        Geez: 'ልደቱ ለክርስቶስ በቤተልሔም ዘይሁዳ።',
        Tigrinya: 'ዓብዪ በዓል ልደት (ገና) ጐይታና የሱስ ክርስቶስ።',
        English: 'Lidet (Christmas) celebrating the birth of Jesus Christ in Bethlehem. Celebrated on Tahsas 29 (or 28 in leap years). Includes traditional Genna game.',
        AfaanOromo: 'Ayyaana dhaloota Iyyasuus Kiristoos (Ganna) kabajamu.'
      },
      type: 'major'
    }
  ],
  5: [ // Tir
    {
      day: 6,
      name: {
        Amharic: 'ግዝረተ ኢየሱስ',
        Geez: 'ግዝረተ ኢየሱስ',
        Tigrinya: 'ግዝረተ ኢየሱስ',
        English: 'Circumcision of Jesus',
        AfaanOromo: 'Circumcision of Jesus'
      },
      desc: {
        Amharic: 'ጌታችን የኦሪትን ህግ ለመፈጸም በስምንተኛው ቀን የተገዘረበት መታሰቢያ።',
        Geez: 'ግዝረቱ ለኢየሱስ ክርስቶስ በስምኑ ዕለት።',
        Tigrinya: 'ጐይታና የሱስ ክርስቶስ ኣብ ሻምናይ መዓልቲ ዝተገዘረሉ ዕለት።',
        English: 'Feast of the Circumcision of Jesus on the 8th day after birth to fulfill the Mosaic Law.',
        AfaanOromo: 'Kutannoo gooftaa dhalate guyyaa saddeetatti yaadatamu.'
      },
      type: 'minor'
    },
    {
      day: 7,
      name: {
        Amharic: 'ቅድስት ሥላሴ',
        Geez: 'ቅድስት ሥላሴ',
        Tigrinya: 'ቅድስት ሥላሴ',
        English: 'Holy Trinity',
        AfaanOromo: 'Holy Trinity'
      },
      desc: {
        Amharic: 'የቅድስት ሥላሴ ወርሃዊ በዓል።',
        Geez: 'ዝክረ በዓላ ለቅድስት ሥላሴ።',
        Tigrinya: 'ወርሓዊ ዝክረ በዓል ቅድስት ሥላሴ።',
        English: 'Monthly celebration of the Holy Trinity (Ab, Weled, Menfes Qidus).',
        AfaanOromo: 'Yaadannoo ji\'aa Sadbackground qulqulluu.'
      },
      type: 'minor'
    },
    {
      day: 10,
      name: {
        Amharic: 'ጾመ ገሃድ',
        Geez: 'ጾመ ገሃድ',
        Tigrinya: 'ጾመ ገሃድ',
        English: 'Epiphany Eve (Tsome Gehad)',
        AfaanOromo: 'Epiphany Eve'
      },
      desc: {
        Amharic: 'የጥምቀት ዋዜማ (ገሃድ) ጾም።',
        Geez: 'ጾመ ገሃድ ዋዜማ ጥምቀት።',
        Tigrinya: 'ዋዜማ ጥምቀት ጾመ ገሃድ።',
        English: 'Strict fasting day on the Eve of the Epiphany (Timket Eve).',
        AfaanOromo: 'Sooma qophii guyyaa cuuphaa gooftaa.'
      },
      type: 'fast'
    },
    {
      day: 11,
      name: {
        Amharic: 'በዓለ ጥምቀት',
        Geez: 'በዓለ ጥምቀት',
        Tigrinya: 'በዓለ ጥምቀት',
        English: 'Timket (Ethiopian Epiphany)',
        AfaanOromo: 'Timket (Epiphany)'
      },
      desc: {
        Amharic: 'የጥምቀት በዓል፦ የጥር አሥራ አንድ ቀን። ጌታችን በዮርዳኖስ ወንዝ በቅዱስ ዮሐንስ እጅ የተጠመቀበትና ምስጢረ ሥላሴ የተገለጠበት በዓል ነው።',
        Geez: 'በዓለ ጥምቀቱ ለክርስቶስ በፈለገ ዮርዳኖስ።',
        Tigrinya: 'ዓብዪ ዓመታዊ በዓል ጥምቀት ጎይታ የሱስ ክርስቶስ ኣብ ፈለገ ዮርዳኖስ።',
        English: 'Timket, the majestic Ethiopian Epiphany celebrating Christ\'s baptism. Tabots (holy replicas of the Ark) are taken to water bodies with holy processions.',
        AfaanOromo: 'Ayyaana Cuuphaa (Timqata) guddaa gooftaa keenyaa.'
      },
      type: 'major'
    },
    {
      day: 12,
      name: {
        Amharic: 'ቃና ዘገሊላ / ቅዱስ ሚካኤል',
        Geez: 'ቃና ዘገሊላ / ቅዱስ ሚካኤል',
        Tigrinya: 'ቃና ዘገሊላ / ቅዱስ ሚካኤል',
        English: 'Kana ZeGelila / St. Michael',
        AfaanOromo: 'Kana ZeGelila / St. Michael'
      },
      desc: {
        Amharic: 'የቃና ዘገሊላ በዓል፦ የጥር አሥራ ሁለት ቀን። ጌታችን በሰርግ ቤት ውኃውን ወደ ወይን ጠጅ በመለወጥ የመጀመሪያውን ተአምር ያደረገበት ዕለት ነው።',
        Geez: 'ቃና ዘገሊላ ዘረሰዮ ማየ ወይነ እግዚእነ።',
        Tigrinya: 'ጐይታና ኣብ ቃና ዘገሊላ መርዓ ማይ ናብ ወይኒ ዝለወጠሉን ወርሓዊ ቅዱስ ሚካኤልን።',
        English: 'Commemoration of Jesus\' first miracle at the wedding of Cana in Galilee (turning water into wine), paired with the monthly St. Michael feast.',
        AfaanOromo: 'Yaadannoo milki gooftaa bishaan gara daadhiitti jijjiire.'
      },
      type: 'major'
    },
    {
      day: 13,
      name: {
        Amharic: 'ቅዱስ ሩፋኤል',
        Geez: 'ቅዱስ ሩፋኤል',
        Tigrinya: 'ቅዱስ ሩፋኤል',
        English: 'St. Raphael the Archangel',
        AfaanOromo: 'St. Raphael'
      },
      desc: {
        Amharic: 'የፈዋሹ መልአክ የቅዱስ ሩፋኤል ወርሃዊ መታሰቢያ።',
        Geez: 'ሊቀ መላእክት ቅዱስ ሩፋኤል ፈዋሽ።',
        Tigrinya: 'ወርሓዊ በዓል ቅዱስ ሩፋኤል መልአክ ፈውስ።',
        English: 'Monthly commemoration of Saint Raphael the Archangel, known for healing, travel guidance, and protecting families.',
        AfaanOromo: 'Yaadannoo ji\'aa ergamaa fayyinaa Qulqulluu Rufaa\'eel.'
      },
      type: 'minor'
    },
    {
      day: 21,
      name: {
        Amharic: 'የአስቴርዮ ማርያም (ዕረፍት)',
        Geez: 'አስተርዮ ለማርያም',
        Tigrinya: 'አስተርዮ ለማርያም',
        English: 'Asterio Maryam (Dormition of St. Mary)',
        AfaanOromo: 'Asterio Maryam'
      },
      desc: {
        Amharic: 'የአስቴርዮ ማርያም (ዕረፍት)፦ የጥር ሀያ አንድ ቀን። የእመቤታችን የቅድስት ድንግል ማርያም የሥጋ ዕረፍት የሚታሰብበት በዓል ነው።',
        Geez: 'ዕረፍታ ለእመቤታችን ማርያም ድንግል በሰላም።',
        Tigrinya: 'ዕረፍቲ እመቤትና ቅድስቲ ድንግል ማርያም (ዕርገት ነፍሳ)።',
        English: 'Feast of the Dormition (falling asleep) of Saint Mary, celebrating her earthly departure and the assumption of her soul.',
        AfaanOromo: 'Ayyaana boqonnaa qulqullummaa Dubree Maariyaam.'
      },
      type: 'major'
    },
    {
      day: 25,
      name: {
        Amharic: 'ጾመ ነነዌ (2018)',
        Geez: 'ጾመ ነነዌ',
        Tigrinya: 'ጾመ ነነዌ',
        English: 'Nineveh Fast (2018)',
        AfaanOromo: 'Nineveh Fast'
      },
      desc: {
        Amharic: 'የነነዌ ጾም መጀመሪያ ቀን (ለሦስት ቀናት የሚጾም ልዩ የንስሐ ጾም)።',
        Geez: 'ጾመ ነነዌ ሠለስተ ዕለታተ።',
        Tigrinya: 'መጀመርታ ጾመ ነነዌ (ንስሓ)።',
        English: 'The start of the 3-day Fast of Nineveh, representing Jonah\'s time inside the whale and the repentance of Nineveh.',
        AfaanOromo: 'Sooma neneewee guyyaa jalqabaa.'
      },
      type: 'fast'
    }
  ],
  6: [ // Yekatit
    {
      day: 9,
      name: {
        Amharic: 'ዐቢይ ጾም - ሁዳዴ (2018)',
        Geez: 'ጾመ ዐቢይ',
        Tigrinya: 'ዓብዪ ጾም',
        English: 'Great Lent - Hudade (2018)',
        AfaanOromo: 'Great Lent (Hudade)'
      },
      desc: {
        Amharic: 'ጌታችን የጾመውን 55 ቀናት ጾም የምንጾምበት የታላቁ ሁዳዴ ጾም መጀመሪያ ዕለት።',
        Geez: 'ቀዳሜ ዕለት ዘጾመ ዐቢይ ዓምሳ ወሐምሳ ዕለታተ።',
        Tigrinya: 'መጀመርታ ዓብዪ ጾም (ሁዳዴ)።',
        English: 'The beginning of the 55-day Great Lent (Abiy Tsome/Hudade), commemorating Jesus Christ\'s temptation and fast in the wilderness.',
        AfaanOromo: 'Jalqaba sooma guddaa (Hudaadee) kan guyyaa 55.'
      },
      type: 'fast'
    },
    {
      day: 16,
      name: {
        Amharic: 'ኪዳነ ምሕረት',
        Geez: 'ኪዳነ ምሕረት',
        Tigrinya: 'ኪዳነ ምሕረት',
        English: 'Kidane Mihret (Covenant of Mercy)',
        AfaanOromo: 'Kidane Mihret'
      },
      desc: {
        Amharic: 'እመቤታችን ቅድስት ድንግል ማርያም ከልጇ ከወዳጇ ዘንድ ለሰው ልጆች ድኅነት ቃልኪዳን የተቀበለችበት ታላቅ ዓመታዊ በዓል።',
        Geez: 'ኪዳነ ምሕረት ለእመቤታችን ድንግል ማርያም ዘየካቲት።',
        Tigrinya: 'ዓመታዊ በዓል ኪዳነ ምሕረት እመቤትና ድንግል ማርያም።',
        English: 'The grand annual feast of the Covenant of Mercy (Kidane Mihret), celebrating Christ\'s promise to Mary that he will forgive those who pray in her name.',
        AfaanOromo: 'Ayyaana Kidaane Mihrat dubree Maariyaam kakuu fayyinaa.'
      },
      type: 'major'
    },
    {
      day: 23,
      name: {
        Amharic: 'ቅዱስ ጊዮርጊስ',
        Geez: 'ቅዱስ ጊዮርጊስ',
        Tigrinya: 'ቅዱስ ጊዮርጊስ',
        English: 'St. George',
        AfaanOromo: 'St. George'
      },
      desc: {
        Amharic: 'የሰማዕቱ የቅዱስ ጊዮርጊስ ወርሃዊ መታሰቢያ።',
        Geez: 'ዝክረ ሰማዕት ክቡር ጊዮርጊስ ዘልዳ።',
        Tigrinya: 'ወርሓዊ ዝክረ በዓል ቅዱስ ጊዮርጊስ።',
        English: 'Monthly feast of Saint George of Lydda, the legendary dragon-slayer and champion of faith.',
        AfaanOromo: 'Yaadannoo ji\'aa Qulqulluu Giyoorgis loltuu amantii.'
      },
      type: 'minor'
    }
  ],
  7: [ // Megabit
    {
      day: 5,
      name: {
        Amharic: 'አቡነ ገብረ መንፈስ ቅዱስ',
        Geez: 'አቡነ ገብረ መንፈስ ቅዱስ',
        Tigrinya: 'አቡነ ገብረ መንፈስ ቅዱስ',
        English: 'Abune Gebre Menfas Qidus (Abo)',
        AfaanOromo: 'Abune Gebre Menfas Qidus'
      },
      desc: {
        Amharic: 'የታላቁ ጻድቅ አቡነ ገብረ መንፈስ ቅዱስ ዓመታዊ በዓለ ዕረፍት (መጋቢት አቦ)።',
        Geez: 'ዕረፍቱ ለጻድቅ አቡነ ገብረ መንፈስ ቅዱስ።',
        Tigrinya: 'ዓመታዊ በዓል ዕረፍቲ አቡነ ገብረ መንፈስ ቅዱስ።',
        English: 'The annual commemoration of the entry of Abune Gebre Menfas Qidus (Abo) into eternal life.',
        AfaanOromo: 'Ayyaana waggaa boqonnaa Abune Gebre Menfas Qidus.'
      },
      type: 'major'
    },
    {
      day: 6,
      name: {
        Amharic: 'ደብረ ዘይት (2018)',
        Geez: 'ደብረ ዘይት',
        Tigrinya: 'ደብረ ዘይት',
        English: 'Debre Zeyt / Mid-Lent (2018)',
        AfaanOromo: 'Debre Zeyt'
      },
      desc: {
        Amharic: 'የታላቁ ጾም እኩሌታ (ደብረ ዘይት)፤ የክርስቶስ ዳግም ምጽአት የሚታሰብበት ዕለት።',
        Geez: 'ደብረ ዘይት እኩሌታ ጾም ዘዳግም ምጽአት።',
        Tigrinya: 'ፍርቂ ጾም ደብረ ዘይት (ካልኣይ ምጽኣት ዝዝከረሉ)።',
        English: 'Debre Zeyt, the middle of Lent. It focuses on Mount of Olives and Christ\'s teachings about the Second Coming and End Times.',
        AfaanOromo: 'Gidduu galeessa sooma guddaa, gaara ejersaa (Debre Zeyt).'
      },
      type: 'fast'
    },
    {
      day: 10,
      name: {
        Amharic: 'በዓለ መስቀል (መካከለኛ)',
        Geez: 'በዓለ መስቀል',
        Tigrinya: 'በዓለ መስቀል',
        English: 'Mid-Meskel',
        AfaanOromo: 'Mid-Meskel'
      },
      desc: {
        Amharic: 'የጌታችን የመድኃኒታችን የኢየሱስ ክርስቶስ መስቀል መታሰቢያ በዓል።',
        Geez: 'በዓለ መስቀል ዘእኩሌታ።',
        Tigrinya: 'ዝክረ በዓል ቅዱስ መስቀል።',
        English: 'Special monthly commemoration of the Holy Cross.',
        AfaanOromo: 'Yaadannoo fannoo qulqulluu.'
      },
      type: 'minor'
    },
    {
      day: 27,
      name: {
        Amharic: 'ሆሣዕና / መድኃኔዓለም (2018)',
        Geez: 'ሆሣዕና / መድኃኔዓለም',
        Tigrinya: 'ሆሣዕና / መድኃኔዓለም',
        English: 'Hosanna / Medhane Alem (2018)',
        AfaanOromo: 'Hosanna / Medhane Alem'
      },
      desc: {
        Amharic: 'የሆሣዕና (የክርስቶስ በክብር ወደ ኢየሩሳሌም መግባት) እና የመድኃኔዓለም መታሰቢያ በዓል።',
        Geez: 'ሆሣዕና በአርያም ወበዓለ መድኃኔዓለም።',
        Tigrinya: 'በዓል ሆሳዕና (ጐይታ ብኽብሪ ዝአተወሉ)።',
        English: 'Hosanna (Palm Sunday) celebrating Jesus\' triumphal entry into Jerusalem riding a donkey, and the feast of Medhane Alem (Savior of the World).',
        AfaanOromo: 'Ayyaana Hosaana gooftaa kabajaan gara Yerusaalem gale.'
      },
      type: 'major'
    },
    {
      day: 29,
      name: {
        Amharic: 'በዓለ ወልድ',
        Geez: 'በዓለ ወልድ',
        Tigrinya: 'በዓለ ወልድ',
        English: 'Feast of God the Son',
        AfaanOromo: 'Feast of God the Son'
      },
      desc: {
        Amharic: 'የእግዚአብሔር ወልድ (ኢየሱስ ክርስቶስ) በዓል መታሰቢያ።',
        Geez: 'በዓለ ወልድ ዋሕድ።',
        Tigrinya: 'በዓለ ወልድ ዋሕድ የሱስ ክርስቶስ።',
        English: 'Special monthly dedication to God the Son, commemorating His incarnation and saving work.',
        AfaanOromo: 'Yaadannoo ji\'aa Iyyaasuss Kiristoos Ilma Waaqayyo.'
      },
      type: 'minor'
    }
  ],
  8: [ // Miyazya
    {
      day: 2,
      name: {
        Amharic: 'ስቅለት - ዓርብ (2018)',
        Geez: 'ዓርበ ስቅለት',
        Tigrinya: 'ዓርቢ ስቅለት',
        English: 'Good Friday - Siklet (2018)',
        AfaanOromo: 'Good Friday (Siklet)'
      },
      desc: {
        Amharic: 'የስቅለት በዓል፦ እንደየዓመቱ የባሕረ ሐሳብ ስሌት ቀኑ የሚለዋወጥ የሕማማት ሳምንት ዓርብ ቀን ነው። ጌታችን ስለ ሰው ልጆች ድኅነት በመስቀል ላይ የሞተበት ዕለት ነው።',
        Geez: 'ዕለተ ስቅለቱ ለእግዚእነ በጎልጎታ።',
        Tigrinya: 'ጐይታና የሱስ ክርስቶስ ስለ ድሕነትና ዝተሰቐለሉ ዓርቢ ስቕለት።',
        English: 'Good Friday (Siklet). A day of deep fasting, bowing (Sigdet), and continuous prayers, commemorating the crucifixion of Jesus Christ on Golgotha.',
        AfaanOromo: 'Guyyaa fannifamuu gooftaa (Siklet) gaddaa fi kadhannaa.'
      },
      type: 'major'
    },
    {
      day: 4,
      name: {
        Amharic: 'ትንሣኤ - ፋሲካ (2018)',
        Geez: 'በዓለ ትንሣኤ',
        Tigrinya: 'በዓለ ትንሣኤ (ፋሲካ)',
        English: 'Resurrection - Fasika (2018)',
        AfaanOromo: 'Easter - Fasika'
      },
      desc: {
        Amharic: 'የትንሣኤ በዓል (ፋሲካ)፦ እንደየዓመቱ አቆጣጠር ቀኑ የሚለዋወጥ ታላቅ በዓል ነው። ጌታችን ሞትን አሸንፎ መቃብርን ክፈት አድርጎ የተነሳበት የብርሃን በዓል ነው።',
        Geez: 'ትንሣኤሁ ለክርስቶስ እምነ ሙታን በኃይል ታዕካ።',
        Tigrinya: 'ዓብዪ ዓመታዊ በዓል ትንሣኤ (ፋሲካ) ጎይታና።',
        English: 'Fasika (Ethiopian Easter), celebrating the glorious Resurrection of Jesus Christ from the dead, breaking the bonds of hell and death.',
        AfaanOromo: 'Ayyaana du\'aa ka\'uu gooftaa (Fasikaa) guddaa.'
      },
      type: 'major'
    },
    {
      day: 23,
      name: {
        Amharic: 'የቅዱስ ጊዮርጊስ ዓመታዊ በዓል',
        Geez: 'ቅዱስ ጊዮርጊስ',
        Tigrinya: 'ቅዱስ ጊዮርጊስ',
        English: 'St. George of Lydda',
        AfaanOromo: 'St. George'
      },
      desc: {
        Amharic: 'የቅዱስ ጊዮርጊስ ዓመታዊ በዓል፦ የሚያዝያ ሀያ ሦስት ቀን። የሰማዕታት አለቃ የሆነው ቅዱስ ጊዮርጊስ ሰባት ዓመት ሙሉ መከራ ከተቀበለ በኋላ የሰማዕትነት አክሊልን የተቀዳጀበት ዕለት ነው።',
        Geez: 'ዕረፍቱ ለቅዱስ ጊዮርጊስ ኮከበ ልዳ።',
        Tigrinya: 'ዓመታዊ በዓል ዕረፍቲ ቅዱስ ጊዮርጊስ።',
        English: 'The major annual feast of Saint George of Lydda, commemorating his martyrdom and heroic witnessing for Christ.',
        AfaanOromo: 'Ayyaana waggaa wareegamuu Qulqulluu Giyoorgis.'
      },
      type: 'major'
    },
    {
      day: 28,
      name: {
        Amharic: 'ርዕሰ ካህናት',
        Geez: 'ርዕሰ ካህናት',
        Tigrinya: 'ርዕሰ ካህናት',
        English: 'St. Athanasius (Head of Priests)',
        AfaanOromo: 'St. Athanasius'
      },
      desc: {
        Amharic: 'የእስክንድርያው ሊቀ ጳጳስ የቅዱስ አትናቴዎስ በዓል መታሰቢያ።',
        Geez: 'ዕረፍቱ ለአትናቴዎስ ሐዋርያዊ።',
        Tigrinya: 'ዝክረ በዓል ቅዱስ አትናቴዎስ ርእሰ ካህናት።',
        English: 'Commemoration of Saint Athanasius the Apostolic, Patriarch of Alexandria, defender of the Orthodox faith against Arianism.',
        AfaanOromo: 'Yaadannoo Qulqulluu Atnaatewoos Abbaa amantii.'
      },
      type: 'minor'
    },
    {
      day: 30,
      name: {
        Amharic: 'ቅዱስ ማርቆስ',
        Geez: 'ቅዱስ ማርቆስ',
        Tigrinya: 'ቅዱስ ማርቆስ',
        English: 'St. Mark the Evangelist',
        AfaanOromo: 'St. Mark'
      },
      desc: {
        Amharic: 'የወንጌላዊው የቅዱስ ማርቆስ በዓለ ዕረፍት።',
        Geez: 'ዕረፍቱ ለማርቆስ ወንጌላዊ በዓለ ስብሐት።',
        Tigrinya: 'ዕረፍቲ ናይ ቅዱስ ማርቆስ ወንጌላዊ።',
        English: 'Annual feast of Saint Mark the Evangelist, marking his martyrdom in Alexandria, Egypt.',
        AfaanOromo: 'Ayyaana waggaa wareegamuu Qulqulluu Marqos.'
      },
      type: 'major'
    }
  ],
  9: [ // Ginbot
    {
      day: 1,
      name: {
        Amharic: 'የእመቤታችን ልደታ ማርያም',
        Geez: 'ልደታ ለማርያም',
        Tigrinya: 'ልደታ ለማርያም',
        English: 'Lideta Maryam (Birth of St. Mary)',
        AfaanOromo: 'Lideta Maryam'
      },
      desc: {
        Amharic: 'የእመቤታችን ልደታ ማርያም፦ የግንቦት መጀመሪያ ቀን። እመቤታችን ቅድስት ድንግል ማርያም ከወላጆቿ ከኢያቄም እና ከሐና የተወለደችበት ታላቅ ዓመታዊ በዓል ነው።',
        Geez: 'ልደታ ለማርያም እምኢያቄም ወሐና።',
        Tigrinya: 'ዓብዪ ዓመታዊ በዓል ልደት እመቤትና ማርያም።',
        English: 'Lideta Maryam, celebrating the blessed birth of the Virgin Mary to her holy parents, Joachim and Anne.',
        AfaanOromo: 'Ayyaana dhaloota Dubree Maariyaam (Lideta).'
      },
      type: 'major'
    },
    {
      day: 11,
      name: {
        Amharic: 'ቅዱስ ያሬድ',
        Geez: 'ቅዱስ ያሬድ',
        Tigrinya: 'ቅዱስ ያሬድ',
        English: 'St. Yared',
        AfaanOromo: 'St. Yared'
      },
      desc: {
        Amharic: 'የኢትዮጵያ ቤተክርስቲያን መዝሙርና ዜማ አባት የቅዱስ ያሬድ መታሰቢያ።',
        Geez: 'ያሬድ ማኅሌታይ ዘማኅሌተ ሰማይ።',
        Tigrinya: 'ዝክረ በዓል ቅዱስ ያሬድ ወሃቢ ዜማ።',
        English: 'The annual feast of Saint Yared, the 6th-century ecclesiastical hymnologist who composed the spiritual musical notation system of Ethiopia.',
        AfaanOromo: 'Yaadannoo Qulqulluu Yaared Abbaa muuziqaa mana kiristaanaa.'
      },
      type: 'major'
    },
    {
      day: 12,
      name: {
        Amharic: 'አቡነ ተክለ ሃይማኖት',
        Geez: 'አቡነ ተክለ ሃይማኖት',
        Tigrinya: 'አቡነ ተክለ ሃይማኖት',
        English: 'Abune Tekle Haymanot',
        AfaanOromo: 'Abune Tekle Haymanot'
      },
      desc: {
        Amharic: 'የጻድቁ የአቡነ ተክለ ሃይማኖት የተቆረጠው እግራቸው የሚታሰብበት በዓል።',
        Geez: 'ዝክረ በዓሉ ለአቡነ ተክለ ሃይማኖት።',
        Tigrinya: 'ዝክረ በዓል ቅዱስ ተክለ ሃይማኖት።',
        English: 'Special celebration of Abune Tekle Haymanot, focusing on his continuous prayers standing on one leg for seven years.',
        AfaanOromo: 'Yaadannoo Abune Tekle Haymanot amantii isaanii.'
      },
      type: 'minor'
    },
    {
      day: 13,
      name: {
        Amharic: 'የዕርገት በዓል (2018)',
        Geez: 'በዓለ ዕርገት',
        Tigrinya: 'በዓለ ዕርገት',
        English: 'Ascension - Erget (2018)',
        AfaanOromo: 'Ascension - Erget'
      },
      desc: {
        Amharic: 'የዕርገት በዓል፦ ከትንሣኤ በኃላ በአርባኛው ቀን የሚከበር በዓል ነው። ጌታችን በክብርና በምስጋና ወደ ሰማይ ያረገበት ዕለት ነው።',
        Geez: 'ዕርገቱ ለእግዚእነ በክብር ወበስብሐት።',
        Tigrinya: 'በዓል ዕርገት ጎይታ የሱስ ክርስቶስ ናብ ሰማይ።',
        English: 'The Ascension (Erget) of our Lord Jesus Christ, celebrating His physical ascent to heaven 40 days after His resurrection.',
        AfaanOromo: 'Ayyaana ol-ba\'iinsa gooftaa gara samiitti (Erget).'
      },
      type: 'major'
    },
    {
      day: 21,
      name: {
        Amharic: 'እመቤታችን ማርያም (ደብረ ምጥማቅ)',
        Geez: 'ደብረ ምጥማቅ ማርያም',
        Tigrinya: 'እመቤታችን ማርያም',
        English: 'St. Mary (Debre Mitmaq)',
        AfaanOromo: 'Debre Mitmaq Maryam'
      },
      desc: {
        Amharic: 'እመቤታችን በግብፅ ደብረ ምጥማቅ በተአምር ለብዙዎች የታየችበት ታላቅ መታሰቢያ።',
        Geez: 'ማርያም ዘደብረ ምጥማቅ ዘግብፅ።',
        Tigrinya: 'እመቤትና ኣብ ደብረ ምጥማቅ ግብጺ ብተኣምር ዝተገልጸትሉ ዕለት።',
        English: 'The apparitions of Saint Mary at Debre Mitmaq, Egypt, where she was visible to thousands of Christians and Muslims for several days.',
        AfaanOromo: 'Mul\'achuu Maariyaam gaara Debre Mitmaq.'
      },
      type: 'major'
    },
    {
      day: 23,
      name: {
        Amharic: 'የጰራቅሊጦስ በዓል (2018)',
        Geez: 'ጰራቅሊጦስ',
        Tigrinya: 'ጰራቅሊጦስ',
        English: 'Pentecost - Paraclitos (2018)',
        AfaanOromo: 'Pentecost - Paraclitos'
      },
      desc: {
        Amharic: 'የጰራቅሊጦስ በዓል፦ ከትንሣኤ በኃላ በሀምሳኛው ቀን የሚከበር በዓል ነው። ለሐዋርያት የእውነት መንፈስ (መንፈስ ቅዱስ) የወረደበት ዕለት ነው።',
        Geez: 'ጰራቅሊጦስ ወረደ መንፈስ ቅዱስ።',
        Tigrinya: 'በዓል ጰራቅሊጦስ (ምውራድ መንፈስ ቅዱስ)።',
        English: 'Pentecost (Paraclitos), celebrating the descent of the Holy Spirit upon the Apostles 50 days after the Resurrection.',
        AfaanOromo: 'Bu\'insa Hafuura Qulqulluu (Pentecost).'
      },
      type: 'major'
    },
    {
      day: 24,
      name: {
        Amharic: 'ጾመ ሐዋርያት (2018)',
        Geez: 'ጾመ ሐዋርያት',
        Tigrinya: 'ጾመ ሐዋርያት',
        English: 'Apostles Fast (2018)',
        AfaanOromo: 'Apostles Fast'
      },
      desc: {
        Amharic: 'የሐዋርያት ጾም (ጾመ ሰኔ) መጀመሪያ ቀን።',
        Geez: 'ቀዳሜ ዕለት ዘጾመ ሐዋርያት።',
        Tigrinya: 'መጀመርታ ጾመ ሐዋርያት (ጾመ ሰኔ)።',
        English: 'The start of the Fast of the Apostles (Tsome Senay), taken up by the Apostles after receiving the Holy Spirit.',
        AfaanOromo: 'Jalqaba sooma ergamaa.'
      },
      type: 'fast'
    },
    {
      day: 26,
      name: {
        Amharic: 'ጾመ ድኅነት (2018)',
        Geez: 'ጾመ ድኅነት',
        Tigrinya: 'ጾመ ድኅነት',
        English: 'Fast of Salvation (2018)',
        AfaanOromo: 'Fast of Salvation'
      },
      desc: {
        Amharic: 'የረቡዕና ዓርብ ጾም ከበዓለ ሃምሳ በኋላ የሚጀመርበት ዕለት።',
        Geez: 'ጾመ ድኅነት ረቡዕ ወዓርብ።',
        Tigrinya: 'ጾመ ድኅነት (ጾም ረቡዕን ዓርብን)።',
        English: 'The resumption of the weekly Wednesday and Friday fasts after the 50-day post-resurrection fast-free period.',
        AfaanOromo: 'Deebi\'uu sooma Roobii fi Jimaataa.'
      },
      type: 'fast'
    }
  ],
  10: [ // Sene
    {
      day: 12,
      name: {
        Amharic: 'ቅዱስ ሚካኤል',
        Geez: 'ቅዱስ ሚካኤል',
        Tigrinya: 'ቅዱስ ሚካኤል',
        English: 'St. Michael (Sene Michael)',
        AfaanOromo: 'St. Michael'
      },
      desc: {
        Amharic: 'የሊቀ መላእክት የቅዱስ ሚካኤል ዓመታዊ በዓል።',
        Geez: 'ቅዱስ ሚካኤል ሊቀ መላእክት ክቡር።',
        Tigrinya: 'ዓመታዊ በዓል ቅዱስ ሚካኤል ናይ ሰኔ ወርሒ።',
        English: 'Annual feast of Saint Michael the Archangel in Sene, celebrating his intercession and delivery of Israelites.',
        AfaanOromo: 'Ayyaana waggaa Qulqulluu Mikaa\'eel.'
      },
      type: 'major'
    },
    {
      day: 20,
      name: {
        Amharic: 'ሕንጸተ ቤተ ክርስቲያን (ሰኔ ጎልጎታ)',
        Geez: 'ሰኔ ጎልጎታ',
        Tigrinya: 'ሰኔ ጎልጎታ',
        English: 'Sene Golgota',
        AfaanOromo: 'Sene Golgota'
      },
      desc: {
        Amharic: 'እመቤታችን ማርያም በጎልጎታ ያደረገችውን ጸሎትና የተቀበለችውን ቃልኪዳን የሚዘክር ታላቅ በዓል።',
        Geez: 'ሰኔ ጎልጎታ ለእመቤታችን ድንግል ማርያም።',
        Tigrinya: 'ሰኔ ጎልጎታ ጸሎት እመቤትና ማርያም ዝዝከረሉ ዕለት።',
        English: 'Sene Golgota, commemorating the prayers of Saint Mary at Golgotha and the divine covenant she received from her Son.',
        AfaanOromo: 'Ayyaana Sene Golgota Dubree Maariyaam.'
      },
      type: 'major'
    },
    {
      day: 30,
      name: {
        Amharic: 'ዮሐንስ መጥምቅ',
        Geez: 'ዮሐንስ መጥምቅ',
        Tigrinya: 'ቅዱስ ዮሃንስ መጥምቅ',
        English: 'Birth of St. John the Baptist',
        AfaanOromo: 'Birth of St. John the Baptist'
      },
      desc: {
        Amharic: 'የቅዱስ ዮሐንስ መጥምቅ የልደት በዓል።',
        Geez: 'ልደቱ ለዮሐንስ መጥምቅ ቃለ እግዚአብሔር።',
        Tigrinya: 'ልደት ቅዱስ ዮሃንስ መጥምቅ።',
        English: 'Feast of the Nativity of Saint John the Baptist, prophesied by Isaiah and Malachi.',
        AfaanOromo: 'Guyyaa dhaloota Qulqulluu Yohannis Cuuphaa.'
      },
      type: 'major'
    }
  ],
  11: [ // Hamle
    {
      day: 5,
      name: {
        Amharic: 'ጴጥሮስና ጳውሎስ',
        Geez: 'ጴጥሮስ ወጳውሎስ',
        Tigrinya: 'ጴጥሮስ ወጳውሎስ',
        English: 'St. Peter and St. Paul',
        AfaanOromo: 'St. Peter and St. Paul'
      },
      desc: {
        Amharic: 'የቅዱሳን ሐዋርያት የቅዱስ ጴጥሮስና የቅዱስ ጳውሎስ የሰማዕትነት መታሰቢያ በዓል።',
        Geez: 'ሰማዕትነቶሙ ለጴጥሮስ ወጳውሎስ ሊቃነ ሐዋርያት።',
        Tigrinya: 'ሰማዕትነት ናይ ሊቃነ ሐዋርያት ቅዱስ ጴጥሮስን ቅዱስ ጳውሎስን።',
        English: 'The martyrdom of Saint Peter and Saint Paul, the pillars and chief leaders of the early Apostles, in Rome under Nero.',
        AfaanOromo: 'Wareegama Qulqulluu Pheexiroos fi Phaawuloos.'
      },
      type: 'major'
    },
    {
      day: 7,
      name: {
        Amharic: 'ቅድስት ሥላሴ',
        Geez: 'ቅድስት ሥላሴ',
        Tigrinya: 'ቅድስት ሥላሴ',
        English: 'Holy Trinity (Hamle)',
        AfaanOromo: 'Holy Trinity'
      },
      desc: {
        Amharic: 'የቅድስት ሥላሴ ዓመታዊ ታላቅ በዓል (ሐምሌ ሥላሴ)።',
        Geez: 'በዓለ ሥላሴ እምአበው ቅዱሳን።',
        Tigrinya: 'ዓብዪ ዓመታዊ በዓል ቅድስት ሥላሴ ናይ ሐምሌ ወርሒ።',
        English: 'The grand annual feast of the Holy Trinity, particularly focusing on the manifestation of God to Abraham under the Oak of Mamre.',
        AfaanOromo: 'Ayyaana waggaa Sadbackground Qulqulluu.'
      },
      type: 'major'
    },
    {
      day: 19,
      name: {
        Amharic: 'ቅዱስ ገብርኤል',
        Geez: 'ቅዱስ ገብርኤል',
        Tigrinya: 'ቅዱስ ገብርኤል',
        English: 'St. Gabriel the Archangel',
        AfaanOromo: 'St. Gabriel'
      },
      desc: {
        Amharic: 'የቅዱስ ገብርኤል ወርሃዊ በዓል።',
        Geez: 'ዝክረ በዓሉ ለቅዱስ ገብርኤል መጋቤ ሐዲስ።',
        Tigrinya: 'ወርሓዊ በዓል ቅዱስ ገብርኤል መልአክ።',
        English: 'Monthly commemoration of Saint Gabriel the Archangel, messenger of good news and savior of the three holy children from the fiery furnace.',
        AfaanOromo: 'Yaadannoo ji\'aa Qulqulluu Gabri\'eel.'
      },
      type: 'minor'
    },
    {
      day: 22,
      name: {
        Amharic: 'ቅዱስ ኡራኤል',
        Geez: 'ቅዱስ ኡራኤል',
        Tigrinya: 'ቅዱስ ኡራኤል',
        English: 'St. Uriel the Archangel',
        AfaanOromo: 'St. Uriel'
      },
      desc: {
        Amharic: 'የሊቀ መላእክት የቅዱስ ኡራኤል ዓመታዊ ታላቅ በዓል (የክርስቶስን ደም በብርሃን ጽዋ በዓለም የረጨበት)።',
        Geez: 'ሊቀ መላእክት ቅዱስ ኡራኤል ብፁዕ።',
        Tigrinya: 'ዓብዪ ዓመታዊ በዓል ቅዱስ ኡራኤል መልአክ።',
        English: 'The major annual feast of Saint Uriel the Archangel, celebrated for sprinkling the precious blood of Christ over the earth using a cup of light.',
        AfaanOromo: 'Ayyaana waggaa Qulqulluu Uuraa\'eel.'
      },
      type: 'major'
    },
    {
      day: 26,
      name: {
        Amharic: 'አቡነ ሀብተ ማርያም',
        Geez: 'አቡነ ሀብተ ማርያም',
        Tigrinya: 'አቡነ ሀብተ ማርያም',
        English: 'Abune Habte Maryam',
        AfaanOromo: 'Abune Habte Maryam'
      },
      desc: {
        Amharic: 'የጻድቁ የአቡነ ሀብተ ማርያም ወርሃዊ በዓል።',
        Geez: 'ዝክረ በዓሉ ለአቡነ ሀብተ ማርያም።',
        Tigrinya: 'ወርሓዊ ዝክረ በዓል አቡነ ሀብተ ማርያም።',
        English: 'Monthly commemoration of the righteous monk, Abune Habte Maryam.',
        AfaanOromo: 'Yaadannoo ji\'aa Abune Habte Maariyaam.'
      },
      type: 'minor'
    }
  ],
  12: [ // Nehase
    {
      day: 1,
      name: {
        Amharic: 'ጾመ ፍልሰታ (መጀመሪያ)',
        Geez: 'ጾመ ፍልሰታ',
        Tigrinya: 'ጾመ ፍልሰታ',
        English: 'Fast of the Assumption (Filseta)',
        AfaanOromo: 'Fast of the Assumption (Filseta)'
      },
      desc: {
        Amharic: 'የጾመ ፍልሰታ (የእመቤታችን ጾም) መጀመሪያ ቀን።',
        Geez: 'ቀዳሜ ዕለት ዘጾመ ፍልሰታ ለእመቤታችን።',
        Tigrinya: 'መጀመርታ ጾመ ፍልሰታ እመቤትና ማርያም።',
        English: 'The beginning of the 16-day Fast of the Assumption of the Virgin Mary (Tsome Filseta), widely observed with daily liturgies and fasting.',
        AfaanOromo: 'Jalqaba sooma boqonnaa Maariyaam (Filsetaa).'
      },
      type: 'fast'
    },
    {
      day: 7,
      name: {
        Amharic: 'ዕንቅተ ለማርያም',
        Geez: 'ዕንቅተ ለማርያም',
        Tigrinya: 'ዕንቅተ ለማርያም',
        English: 'Filseta / St. Mary',
        AfaanOromo: 'Filseta'
      },
      desc: {
        Amharic: 'ጾመ ፍልሰታን ተከትሎ የሚከበር የእመቤታችን ቅድስት ድንግል ማርያም በዓል።',
        Geez: 'ዝክረ በዓላ ለእመቤታችን ዘፍልሰታ።',
        Tigrinya: 'በዓል እመቤትና ማርያም ኣብ ጾመ ፍልሰታ።',
        English: 'Special liturgy and celebration during the Fast of Assumption, celebrating the immaculate nature of Saint Mary.',
        AfaanOromo: 'Kadhannaa fi kabaja boqonnaa Maariyaam gidduutti.'
      },
      type: 'minor'
    },
    {
      day: 13,
      name: {
        Amharic: 'የደብረ ታቦር በዓል',
        Geez: 'ደብረ ታቦር',
        Tigrinya: 'ደብረ ታቦር',
        English: 'Transfiguration of Christ (Buhe)',
        AfaanOromo: 'Debre Tabor (Buhe)'
      },
      desc: {
        Amharic: 'የደብረ ታቦር በዓል፦ የነሐሴ አሥራ ሦስት ቀን። ጌታችን በታቦር ተራራ ላይ መለኮታዊ ክብሩን ለደቀ መዛሙርቱ የገለጠበት በዓል ነው።',
        Geez: 'ደብረ ታቦር ዘገለጠ ብርሃነ መለኮቱ እግዚእነ።',
        Tigrinya: 'ዓብዪ ዓመታዊ በዓል ደብረ ታቦር (ቡሄ) ጎይታ።',
        English: 'The feast of the Transfiguration of Jesus Christ on Mount Tabor (Buhe). Celebrated with cracking of whips, singing of songs ("Hoya Hoye"), and burning of torches (Chibo).',
        AfaanOromo: 'Ayyaana gaara Tabor (Buhee) ifa ergamaa mul\'ate.'
      },
      type: 'major'
    },
    {
      day: 16,
      name: {
        Amharic: 'የፍልሰታ ማርያም (ዕርገት)',
        Geez: 'ፍልሰታ ለማርያም / ኪዳነ ምሕረት',
        Tigrinya: 'ፍልሰታ ለማርያም / ኪዳነ ምሕረት',
        English: 'Assumption of Mary / Kidane Mihret',
        AfaanOromo: 'Assumption of Mary'
      },
      desc: {
        Amharic: 'የፍልሰታ ማርያም (ዕረገት)፦ የነሐሴ አሥራ ስድስት ቀን። የእመቤታችን ቅዱስ ሥጋዋ ወደ ሰማይ የፈለሰበት (ያረገበት) ታላቅ በዓል ነው።',
        Geez: 'በዓለ ፍልሰታ ለማርያም ውስተ ሰማይ በስብሐት።',
        Tigrinya: 'ፍጻሜ ጾመ ፍልሰታ እመቤትና ድንግል ማርያም ዕርገት ሥጋሃ።',
        English: 'The Feast of the Assumption of the Virgin Mary, celebrating the translation of her body to heaven, marking the completion of the 16-day fast.',
        AfaanOromo: 'Guyyaa xumura sooma Filsetaa, Maariyaam gara samiitti fudhatamte.'
      },
      type: 'major'
    },
    {
      day: 24,
      name: {
        Amharic: 'የአቡነ ተክለ ሃይማኖት ዓመታዊ በዓል',
        Geez: 'አቡነ ተክለ ሃይማኖት',
        Tigrinya: 'አቡነ ተክለ ሃይማኖት',
        English: 'Abune Tekle Haymanot',
        AfaanOromo: 'Abune Tekle Haymanot'
      },
      desc: {
        Amharic: 'የአቡነ ተክለ ሃይማኖት ዓመታዊ በዓል፦ የነሐሴ ሀያ አራት ቀን። ታላቁ የኢትዮጵያ ጻድቅ አባት አቡነ ተክለ ሃይማኖት በብዙ ገድልና ጸሎት ኖረው ያረፉበት ዕለት ነው።',
        Geez: 'ዕረፍቱ ለአቡነ ተክለ ሃይማኖት ዘምድረ ሸዋ።',
        Tigrinya: 'ዓመታዊ ዓብዪ በዓል ዕረፍቲ አቡነ ተክለ ሃይማኖት።',
        English: 'The major annual feast of Saint Tekle Haymanot, celebrating his entry into eternal glory and his massive influence on Christianity in Ethiopia.',
        AfaanOromo: 'Ayyaana waggaa boqonnaa Abune Tekle Haymanot.'
      },
      type: 'major'
    }
  ],
  13: [ // Pagume
    {
      day: 3,
      name: {
        Amharic: 'ቅዱስ ሩፋኤል',
        Geez: 'ቅዱስ ሩፋኤል',
        Tigrinya: 'ቅዱስ ሩፋኤል',
        English: 'St. Raphael the Archangel',
        AfaanOromo: 'St. Raphael'
      },
      desc: {
        Amharic: 'የመልአኩ የቅዱስ ሩፋኤል ታላቅ በዓል፤ በጳጉሜ 3 የሚዘንበው ዝናብ ቅዱስ ጠበል ተደርጎ የሚቆጠርበት ዕለት።',
        Geez: 'ሊቀ መላእክት ቅዱስ ሩፋኤል ዘጳጉሜን።',
        Tigrinya: 'በዓል ቅዱስ ሩፋኤል መልአክ (ማይ ጸበል ዘውርድ)።',
        English: 'The grand annual feast of Saint Raphael the Archangel during the 13th month of Pagume. The rain that falls on this day is blessed as holy water (Tsebel).',
        AfaanOromo: 'Ayyaana waggaa Qulqulluu Rufaa\'eel inni bishaan roobaa eebbisu.'
      },
      type: 'major'
    }
  ]
};

// Ge'ez converter functions
const GEEZ_NUMERALS = [
  '', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱', '፲',
  '፲፩', '፲፪', '፲፫', '፲፬', '፲፭', '፲፮', '፲፯', '፲፰', '፲፱', '፳',
  '፳፩', '፳፪', '፳፫', '፳፬', '፳፭', '፳፮', '፳፯', '፳፰', '፳፱', '፴'
];

export function toGeezNumeral(num: number): string {
  return GEEZ_NUMERALS[num] || num.toString();
}

function getStartOfETYearLocal(y: number): Date {
  const isPrevLeap = (y - 1) % 4 === 3;
  const startDay = isPrevLeap ? 12 : 11;
  return new Date(y + 7, 8, startDay, 0, 0, 0, 0); // Sept is 8
}

export function gregorianToEthiopian(gDate: Date): { year: number; month: number; day: number } {
  const gMidnight = new Date(gDate.getFullYear(), gDate.getMonth(), gDate.getDate(), 0, 0, 0, 0);
  
  let y = gDate.getFullYear() - 8;
  let startOfETYear = getStartOfETYearLocal(y);
  
  if (gMidnight.getTime() < startOfETYear.getTime()) {
    y = y - 1;
    startOfETYear = getStartOfETYearLocal(y);
  }
  
  const diffMs = gMidnight.getTime() - startOfETYear.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  
  const etMonth = Math.floor(diffDays / 30) + 1;
  const etDay = (diffDays % 30) + 1;
  
  return { year: y, month: etMonth, day: etDay };
}

export function ethiopianToGregorian(y: number, m: number, d: number): Date {
  const startOfETYear = getStartOfETYearLocal(y);
  const diffDays = (m - 1) * 30 + (d - 1);
  return new Date(startOfETYear.getFullYear(), startOfETYear.getMonth(), startOfETYear.getDate() + diffDays, 0, 0, 0, 0);
}

export function getDaysInEthiopianMonth(y: number, m: number): number {
  if (m >= 1 && m <= 12) return 30;
  if (m === 13) {
    return (y % 4 === 3) ? 6 : 5;
  }
  return 30;
}
