import { Language } from '../types';

export interface LocalizedText {
  Amharic: string;
  Geez: string;
  Tigrinya: string;
  English: string;
  AfaanOromo: string;
}

export interface Monastery {
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  category: 'rock' | 'lake' | 'mountain' | 'historical' | 'cave';
}

const descriptions: Record<'rock' | 'lake' | 'mountain' | 'historical' | 'cave', LocalizedText> = {
  rock: {
    Amharic: 'በተራራ ላይ ካለ አንድ ወጥ ድንጋይ ተፈልፍሎ የተሰራ፣ አስደናቂ ጥንታዊ ስነ-ህንጻ ያለው የኢትዮጵያ ታሪካዊ ቅርስ።',
    Geez: 'ውቅር እምነ ከኮከብ ዘተገብረ በሥርዓተ ጥበብ ዘቀደሙ አበው።',
    Tigrinya: 'ካብ ሓደ ዓቢ እምኒ ተወቂሩ ዝተሰርሐ፣ ፍሉይ ጥንታዊ ስነ-ህንጻን ታሪካዊ ርስትን ዘለዎ መካን።',
    English: 'An extraordinary rock-hewn sanctuary carved out of monolithic rock, displaying ancient architecture and spiritual heritage.',
    AfaanOromo: 'Ijaarsa dhagaa jabaa tokko keessaa bocamee hojjetame, seenaa fi aadaa durii dinqisiisaa qabu.'
  },
  lake: {
    Amharic: 'በሐይቅ መካከል በሚገኙ ደሴቶች ላይ የተመሰረተ፣ በርካታ ታሪካዊ የብራና መጻሕፍትንና ንዋያተ ቅድሳትን የያዘ ጥንታዊ ገዳም።',
    Geez: 'ገዳም ዘውስተ ባሕር ዘፍሉጥ በብዙኃን መጻሕፍት ወንዋያተ ቅድሳት እምጥንት።',
    Tigrinya: 'ኣብ ማእከል ቀላይ ኣብ ዝርከባ ደሴታት ዝተመስረተ፣ ብዙሓት ጥንታውያን መጻሕፍትን ንዋያተ ቅድሳትን ዝሓዘ ቅዱስ ገዳም።',
    English: 'A serene island sanctuary located on a majestic lake, preserving ancient manuscripts, sacred treasures, and a rich spiritual legacy.',
    AfaanOromo: 'Gadaamo odola haroo keessatti argamu, kan barruulee seenaa fi qabeenya qulqulluu qabu.'
  },
  mountain: {
    Amharic: 'በአስደናቂ ገደላማና ተራራማ ቦታዎች ላይ የተመሰረተ፣ በጥብቅ የገዳማዊ ስርዓትና በጽኑ ተጋድሎ የሚታወቅ ታላቅ ገዳም።',
    Geez: 'ገዳም ዘደብረ ላዕል ዘፍሉጥ በትጋህ ወበተጋድሎ መነኮሳት መዋዕለ ረድኤት።',
    Tigrinya: 'ኣብ ኣዝዩ ገደላማን ኣኽራናትን ዝተመስረተ፣ ብጥኑቕ ስርዓተ ምንኵስናን ጽኑዕ ተጋድሎን ዝፍለጥ ዓቢ ገዳም።',
    English: 'A magnificent sanctuary perched on breathtaking cliffs and mountains, famous for its strict ascetic life and ancient spiritual strength.',
    AfaanOromo: 'Gadaamo fiixee tulluu jabaa irratti argamu, kan sirna jabaa fi qajeelfama amantiin beekame.'
  },
  historical: {
    Amharic: 'በኢትዮጵያ ታሪክ ውስጥ ትልቅ መንፈሳዊ፣ ባህላዊና ትምህርታዊ ሚና የነበረውና ጥንታውያን ቅርሶችን የያዘ ታሪካዊ ገዳም።',
    Geez: 'ዐቢይ መካን ዘታሪክ ወመንፈሳዊ ርስተ አበው ቅዱሳን ዘመነ መንግሥት።',
    Tigrinya: 'ኣብ ታሪክ ኢትዮጵያ ዓቢ መንፈሳዊ፣ ባህላውን ትምህርታውን ተራ ዝነበሮ፣ ጥንታውያን ርስቲ ዝሓዘ ታሪካዊ ማእከል።',
    English: 'A monumental historical center of spirituality, culture, and education, housing invaluable national and religious relics.',
    AfaanOromo: 'Gadaamo seenaa amantii fi aadaa keessatti iddoo guddaa qabu, kan qabeenya durii tiin badhaadhe.'
  },
  cave: {
    Amharic: 'በተፈጥሮ ዋሻዎች ውስጥ በተራቀቀ ጥበብ የተሰራ፣ የተሰወረ ጸሎትና ሱባኤ የሚደረግበት ጥንታዊ ቅዱስ ገዳም።',
    Geez: 'ገዳም ዘውስተ በዓት ዘፍሉጥ በጸሎት ወበሱባኤ ቅዱሳን ኅሩያን።',
    Tigrinya: 'ኣብ ውሽጢ ባህርያዊ በዓት ብሉጽ ስነ-ህንጻ ዝተሃነጸ፣ ናይ ጸሎትን ሱባኤን ፍሉይ ቅዱስ ስፍራ።',
    English: 'A hidden cave sanctuary crafted with exquisite craftsmanship, serving as a peaceful haven for silent contemplation and prayer.',
    AfaanOromo: 'Gadaamo holqa keessatti arkamu, kan bakka kadhannaafii seenaa dinqisiisaa qabu.'
  }
};

const images: Record<'rock' | 'lake' | 'mountain' | 'historical' | 'cave', string> = {
  rock: 'https://images.unsplash.com/photo-1590059125010-826002061215?q=80&w=600&auto=format&fit=crop',
  lake: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop',
  mountain: 'https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=600&auto=format&fit=crop',
  historical: 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=600&auto=format&fit=crop',
  cave: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=600&auto=format&fit=crop'
};

const rawMonasteriesData: Array<{
  am: string;
  gz: string;
  tg: string;
  en: string;
  om: string;
  cat: 'rock' | 'lake' | 'mountain' | 'historical' | 'cave';
}> = [
  { am: 'ሀይቅ እስጢፋኖስ', gz: 'ሐይቅ እስጢፋኖስ', tg: 'ገዳም ሐይቅ እስጢፋኖስ', en: 'Lake Hayq Estifanos Monastery', om: 'Monasterii Hayqis Isxifanos', cat: 'lake' },
  { am: 'ሊቀ አእላፍ እንጦጦ ራጉኤል', gz: 'እንጦጦ ራጉኤል', tg: 'እንጦጦ ራጉኤል', en: 'Entoto Raguel Monastery', om: 'Monasterii Enxooxoo Raagu\'el', cat: 'mountain' },
  { am: 'ማኅበረ ሥላሴ', gz: 'ማኅበረ ሥላሴ', tg: 'ገዳም ማኅበረ ሥላሴ', en: 'Mahbere Selassie Monastery', om: 'Monasterii Mahibara Sillaasee', cat: 'mountain' },
  { am: 'ማንዳባ ኮተት ማርያም', gz: 'ማንዳባ ኮተት ማርያም', tg: 'ማንዳባ ኮተት ማርያም', en: 'Mandaba Kotet Maryam', om: 'Monasterii Maandaabaa Kotet Maariyaam', cat: 'lake' },
  { am: 'ማንዳባ መድኃኔዓለም', gz: 'ማንዳባ መድኃኔዓለም', tg: 'ማንዳባ መድኃኔዓለም', en: 'Mandaba Medhanealem', om: 'Monasterii Maandaabaa Medhaane\'alem', cat: 'lake' },
  { am: 'ማርያም ቆርቆር', gz: 'ማርያም ቆርቆር', tg: 'ማርያም ቆርቆር', en: 'Maryam Korkor Church', om: 'Mana Kiristaanaa Maariyaam Qorqor', cat: 'rock' },
  { am: 'ምሁር ኢየሱስ', gz: 'ምሁር ኢየሱስ', tg: 'ምሁር ኢየሱስ', en: 'Mehur Iyesus Monastery', om: 'Monasterii Mihur Iyesuus', cat: 'mountain' },
  { am: 'ምድረ ከብድ አቡነ ገብረ መንፈስ ቅዱስ', gz: 'ምድረ ከብድ ገብረ መንፈስ ቅዱስ', tg: 'ምድረ ከብድ ገብረ መንፈስ ቅዱስ', en: 'Midre Kebd Gebre Menfes Kidus', om: 'Midre Kebd Abune Gebre Menfes Kidus', cat: 'historical' },
  { am: 'ምፅሌ ፋሲሊደስ', gz: 'ምፅሌ ፋሲሊደስ', tg: 'ምፅሌ ፋሲሊደስ', en: 'Mitsle Fasilides Monastery', om: 'Monasterii Mitsle Faasiliides', cat: 'historical' },
  { am: 'ረማ መድኃኔዓለም', gz: 'ረማ መድኃኔዓለም', tg: 'ረማ መድኃኔዓለም', en: 'Rema Medhanealem Monastery', om: 'Monasterii Remaa Medhaane\'alem', cat: 'lake' },
  { am: 'ሰሜነሽ ኪዳነ ምህረት', gz: 'ሰሜነሽ ኪዳነ ምህረት', tg: 'ሰሜነሽ ኪዳነ ምህረት', en: 'Semenesh Kidane Mihret', om: 'Semenesh Kidaane Mihret', cat: 'mountain' },
  { am: 'ናዕኩቶ ለአብ', gz: 'ናዕኩቶ ለአብ', tg: 'ገዳም ናዕኩቶ ለአብ', en: "Ne'akuto Le'Ab Monastery", om: 'Monasterii Na\'akuto Le\'ab', cat: 'cave' },
  { am: 'ናርጋ ሥላሴ', gz: 'ናርጋ ሥላሴ', tg: 'ናርጋ ሥላሴ', en: 'Narga Selassie Monastery', om: 'Monasterii Naargaa Sillaasee', cat: 'lake' },
  { am: 'አባ አፍጼ', gz: 'አባ አፍጼ', tg: 'አባ አፍጼ', en: 'Abba Afse Monastery', om: 'Monasterii Abbaa Afsee', cat: 'historical' },
  { am: 'አባ ገሪማ', gz: 'አባ ገሪማ', tg: 'አባ ገሪማ', en: 'Abba Garima Monastery', om: 'Monasterii Abbaa Gariimaa', cat: 'historical' },
  { am: 'አባ ጰንጠሌዎን', gz: 'አባ ጰንጠሌዎን', tg: 'አባ ጰንጠሌዎን', en: 'Abba Pentelewon Monastery', om: 'Monasterii Abbaa Pentelewoon', cat: 'mountain' },
  { am: 'አባ ሰላማ', gz: 'አባ ሰላማ', tg: 'አባ ሰላማ', en: 'Abba Salama Monastery', om: 'Monasterii Abbaa Salaamaa', cat: 'mountain' },
  { am: 'አባ ሳሙኤል', gz: 'አባ ሳሙኤል ዘዋልድባ', tg: 'አባ ሳሙኤል ዘዋልድባ', en: 'Abba Samuel of Waldiba', om: 'Monasterii Abbaa Saamu\'eel', cat: 'mountain' },
  { am: 'አባ ዮሐኒ', gz: 'አባ ዮሐኒ', tg: 'አባ ዮሐኒ', en: 'Abba Yohani Monastery', om: 'Monasterii Abbaa Yohaanii', cat: 'mountain' },
  { am: 'አብርሃ አጽብሃ', gz: 'አብርሃ ወአጽብሃ', tg: 'አብርሃ አጽብሃ', en: 'Abraha we Atsbeha Church', om: 'Mana Kiristaanaa Abrahaa de Atsbehaa', cat: 'rock' },
  { am: 'አቡነ የማታ ጉህ', gz: 'አቡነ የማታ ጉህ', tg: 'አቡነ የማታ ጉህ', en: 'Abune Yemata Guh', om: 'Monasterii Abune Yemaata Guh', cat: 'rock' },
  { am: 'አቡነ በትረ ማሪያም', gz: 'አቡነ በትረ ማሪያም', tg: 'አቡነ በትረ ማሪያም', en: 'Abune Betre Maryam Monastery', om: 'Monasterii Abune Betre Maariyaam', cat: 'lake' },
  { am: 'አካፋ ማርያም', gz: 'አካፋ ማርያም', tg: 'አካፋ ማርያም', en: 'Akafa Maryam Monastery', om: 'Monasterii Akaafaa Maariyaam', cat: 'lake' },
  { am: 'አምባ ግሸን', gz: 'ደብረ ከርቤ ግሸን', tg: 'ግሸን ደብረ ከርቤ', en: 'Amba Gishen (Debre Kerbe)', om: 'Ambaa Gishen', cat: 'mountain' },
  { am: 'አንገራ ተክለ ሃይማኖት', gz: 'አንገራ ተክለ ሃይማኖት', tg: 'አንገራ ተክለ ሃይማኖት', en: 'Angera Tekle Haymanot Monastery', om: 'Angara Takla Haaymaanot', cat: 'mountain' },
  { am: 'አሸተን ማርያም', gz: 'አሸተን ማርያም', tg: 'አሸተን ማርያም', en: 'Asheten Maryam Monastery', om: 'Monasterii Asheten Maariyaam', cat: 'mountain' },
  { am: 'አዙዋ ማርያም', gz: 'አዝዋ ማርያም', tg: 'አዝዋ ማርያም', en: 'Azwa Maryam Monastery', om: 'Monasterii Azwaa Maariyaam', cat: 'lake' },
  { am: 'አዝዋ ማርያም', gz: 'አዝዋ ማርያም', tg: 'አዝዋ ማርያም', en: 'Azwa Maryam Monastery', om: 'Monasterii Azwaa Maariyaam', cat: 'lake' },
  { am: 'አቃቂ ፈለገ ጊዮን ቅዱስ ገብርኤል', gz: 'ፈለገ ጊዮን ገብርኤል', tg: 'ፈለገ ጊዮን ገብርኤል', en: 'Akaki Felege Gion Saint Gabriel', om: 'Aqaaqii Felege Giyoon Qulqulluu Gabri\'eel', cat: 'historical' },
  { am: 'እንጦጦ ማርያም', gz: 'እንጦጦ ማርያም', tg: 'እንጦጦ ማርያም', en: 'Entoto Maryam Church', om: 'Mana Kiristaanaa Enxooxoo Maariyaam', cat: 'mountain' },
  { am: 'እንጦስ ኢየሱስ', gz: 'እንጦስ ኢየሱስ', tg: 'እንጦስ ኢየሱስ', en: 'Entos Iyesus Monastery', om: 'Monasterii Entos Iyesuus', cat: 'lake' },
  { am: 'ኤዎስጣቴዎስ', gz: 'ኤዎስጣቴዎስ', tg: 'ኤዎስጣቴዎስ', en: 'Eostateos Monastery', om: 'Monasterii Ewoostatewos', cat: 'mountain' },
  { am: 'ክብራን ገብርኤል', gz: 'ክብራን ገብርኤል', tg: 'ክብራን ገብርኤል', en: 'Kebran Gabriel Monastery', om: 'Monasterii Kibraan Gabri\'eel', cat: 'lake' },
  { am: 'ኬብራን ገብርኤል', gz: 'ክብራን ገብርኤል', tg: 'ክብራን ገብርኤል', en: 'Kebran Gabriel Monastery', om: 'Monasterii Kibraan Gabri\'eel', cat: 'lake' },
  { am: 'ኮከበ ከዋክብት ዘቋላ', gz: 'ኮከበ ከዋክብት ዘቋላ', tg: 'ኮከበ ከዋክብት ዘቋላ', en: 'Kokebe Kewakibt of Zuqualla', om: 'Kokebe Kewakibt Zuqaalaa', cat: 'mountain' },
  { am: 'ቁልቢ ገብርኤል', gz: 'ቁልቢ ገብርኤል', tg: 'ቁልቢ ገብርኤል', en: 'Kulubi Gabriel Sanctuary', om: 'Kuluubii Gabri\'eel', cat: 'historical' },
  { am: 'ቁስቋም ገዳም', gz: 'ደብረ ፀሐይ ቁስቋም', tg: 'ገዳም ቁስቋም', en: 'Qusquam Monastery', om: 'Monasterii Qusquaam', cat: 'historical' },
  { am: 'በአታ ገዳም', gz: 'በአታ ለማርያም', tg: 'በአታ ገዳም', en: 'Ba\'ata Monastery', om: 'Monasterii Ba\'ataa', cat: 'historical' },
  { am: 'ባሕር ጋሊላ', gz: 'ባሕር ጋሊላ', tg: 'ባሕር ጋሊላ', en: 'Bahir Galila Monastery', om: 'Monasterii Baahir Gaaliilaa', cat: 'lake' },
  { am: 'ቤት ሥላሴ', gz: 'ቤት ሥላሴ', tg: 'ቤት ሥላሴ', en: 'Bet Selassie Church', om: 'Mana Kiristaanaa Bet Sillaasee', cat: 'rock' },
  { am: 'ቤተ ማርያም', gz: 'ቤተ ማርያም', tg: 'ቤተ ማርያም', en: 'Bete Maryam Church', om: 'Mana Kiristaanaa Bete Maariyaam', cat: 'rock' },
  { am: 'ቤተ ሥላሴ', gz: 'ቤተ ሥላሴ', tg: 'ቤተ ሥላሴ', en: 'Bete Selassie Church', om: 'Mana Kiristaanaa Bete Sillaasee', cat: 'rock' },
  { am: 'ብሪጊዳ ማርያም', gz: 'ብሪጊዳ ማርያም', tg: 'ብሪጊዳ ማርያም', en: 'Brigida Maryam Church', om: 'Mana Kiristaanaa Brigidaa Maariyaam', cat: 'historical' },
  { am: 'ተክለሃይማኖት', gz: 'ደብረ ሊባኖስ ተክለሃይማኖት', tg: 'ተክለሃይማኖት', en: 'Saint Tekle Haymanot Monastery', om: 'Qulqulluu Takla Haaymaanot', cat: 'historical' },
  { am: 'ታድ ባቢ ማርያም', gz: 'ታድ ባቢ ማርያም', tg: 'ታድ ባቢ ማርያም', en: 'Tad Babi Maryam Monastery', om: 'Monasterii Taad Baabii Maariyaam', cat: 'historical' },
  { am: 'ኡራ ኪዳነ ምሕረት', gz: 'ኡራ ኪዳነ ምሕረት', tg: 'ኡራ ኪዳነ ምሕረት', en: 'Ura Kidane Mihret Monastery', om: 'Monasterii Uraa Kidaane Mihret', cat: 'lake' },
  { am: 'ውቅሮ ቺርኮስ', gz: 'ውቅሮ ቺርኮስ', tg: 'ውቅሮ ቺርኮስ', en: 'Wukro Chirkos Rock Church', om: 'Mana Kiristaanaa Wuqroo Ciirkoos', cat: 'rock' },
  { am: 'ይኩኖ አምላክ', gz: 'ይኩኖ አምላክ', tg: 'ይኩኖ አምላክ', en: 'Yekuno Amlak Monastery', om: 'Monasterii Yikuno Amlak', cat: 'lake' },
  { am: 'ይምርሃነ ክርስቶስ', gz: 'ይምርሃነ ክርስቶስ', tg: 'ይምርሃነ ክርስቶስ', en: 'Yemrehanna Krestos Cave Church', om: 'Mana Kiristaanaa Yimrihaana Kireestos', cat: 'cave' },
  { am: 'ይጋንዳ ተለሃይማኖት', gz: 'ይጋንዳ ተክለሃይማኖት', tg: 'ይጋንዳ ተክለሃይማኖት', en: 'Yiganda Tekle Haymanot Monastery', om: 'Monasterii Yigaandat Takla Haaymaanot', cat: 'lake' },
  { am: 'ደብረ ዓባይ', gz: 'ደብረ ዓባይ', tg: 'ደብረ ዓባይ', en: 'Debre Abay Monastery', om: 'Monasterii Debre Aabaay', cat: 'mountain' },
  { am: 'ደብረ አስጎሪ', gz: 'ደብረ አስጎሪ', tg: 'ደብረ አስጎሪ', en: 'Debre Asgori Monastery', om: 'Monasterii Debre Asgorii', cat: 'mountain' },
  { am: 'ደብረ ቢዘን', gz: 'ደብረ ቢዘን', tg: 'ገዳም ደብረ ቢዘን', en: 'Debre Bizen Monastery', om: 'Monasterii Debre Biizen', cat: 'mountain' },
  { am: 'ደብረ ዳሞ', gz: 'ደብረ ዳሞ', tg: 'ደብረ ዳሞ', en: 'Debre Damo Monastery', om: 'Monasterii Debre Daamoo', cat: 'mountain' },
  { am: 'ደብረ ገሪዛን', gz: 'ደብረ ገሪዛን', tg: 'ደብረ ገሪዛን', en: 'Debre Gerizan Monastery', om: 'Monasterii Debre Geriizaan', cat: 'mountain' },
  { am: 'ደብረ ጉር', gz: 'ደብረ ጉር', tg: 'ደብረ ጉር', en: 'Debre Gur Monastery', om: 'Monasterii Debre Guur', cat: 'mountain' },
  { am: 'ደብረ ሊባኖስ', gz: 'ደብረ ሊባኖስ', tg: 'ደብረ ሊባኖስ', en: 'Debre Libanos Monastery', om: 'Monasterii Debre Libaanos', cat: 'mountain' },
  { am: 'ደብረ ማዕሶ', gz: 'ደብረ ማዕሶ', tg: 'ደብረ ማዕሶ', en: 'Debre Ma\'eso Monastery', om: 'Monasterii Debre Ma\'esoo', cat: 'mountain' },
  { am: 'ደብረ ማርያም', gz: 'ደብረ ማርያም', tg: 'ደብረ ማርያም', en: 'Debre Maryam Monastery', om: 'Monasterii Debre Maariyaam', cat: 'lake' },
  { am: 'ደብረ ማርያም ቆርቆር', gz: 'ደብረ ማርያም ቆርቆር', tg: 'ደብረ ማርያም ቆርቆር', en: 'Debre Maryam Korkor Monastery', om: 'Monasterii Debre Maariyaam Qorqor', cat: 'rock' },
  { am: 'ደብረ ሲና', gz: 'ደብረ ሲና', tg: 'ደብረ ሲና', en: 'Debre Sina Monastery', om: 'Monasterii Debre Siinaa', cat: 'mountain' },
  { am: 'ደብረ ሲና ማርያም', gz: 'ደብረ ሲና ማርያም', tg: 'ደብረ ሲና ማርያም', en: 'Debre Sina Maryam Monastery', om: 'Monasterii Debre Siinaa Maariyaam', cat: 'lake' },
  { am: 'ደብረ ጽጌ', gz: 'ደብረ ጽጌ', tg: 'ደብረ ጽጌ', en: 'Debre Tsige Monastery', om: 'Monasterii Debre Tsigee', cat: 'mountain' },
  { am: 'ደብረ መጥምቅ ፃድቃኔ ማርያም', gz: 'ፃድቃኔ ማርያም', tg: 'ፃድቃኔ ማርያም', en: 'Debre Metmiq Tsadiqane Maryam', om: 'Debre Metmiq Tsadiqane Maryam', cat: 'historical' },
  { am: 'ዲማ ጊዮርጊስ', gz: 'ዲማ ጊዮርጊስ', tg: 'ዲማ ጊዮርጊስ', en: 'Dima Giorgis Monastery', om: 'Monasterii Diimaa Giyorgis', cat: 'historical' },
  { am: 'ድማ ጊዮርጊስ', gz: 'ዲማ ጊዮርጊስ', tg: 'ዲማ ጊዮርጊስ', en: 'Dima Giorgis Monastery', om: 'Monasterii Diimaa Giyorgis', cat: 'historical' },
  { am: 'ዳጋ እስጢፋኖስ', gz: 'ዳጋ እስጢፋኖስ', tg: 'ዳጋ እስጢፋኖስ', en: 'Daga Estifanos Monastery', om: 'Monasterii Dagaa Isxifanos', cat: 'lake' },
  { am: 'ዳንኤል ቆርቆር', gz: 'ዳንኤል ቆርቆር', tg: 'ዳንኤል ቆርቆር', en: 'Daniel Korkor Church', om: 'Mana Kiristaanaa Daani\'eel Qorqor', cat: 'rock' },
  { am: 'ጋራ ጉራ ማርያም', gz: 'ጋራ ጉራ ማርያም', tg: 'ጋራ ጉራ ማርያም', en: 'Gara Gura Maryam Monastery', om: 'Monasterii Gaara Guuraa Maariyaam', cat: 'mountain' },
  { am: 'ገብረ መንፈስ ቅዱስ', gz: 'ገብረ መንፈስ ቅዱስ', tg: 'ገብረ መንፈስ ቅዱስ', en: 'Abune Gebre Menfes Kidus Monastery', om: 'Abune Gebre Menfes Kidus', cat: 'historical' },
  { am: 'ግሸን ደብረ ከርቤ', gz: 'ግሸን ደብረ ከርቤ', tg: 'ግሸን ደብረ ከርቤ', en: 'Gishen Debre Kerbe Monastery', om: 'Gishen Debre Kerbe', cat: 'mountain' },
  { am: 'ግሸን ማርያም', gz: 'ግሸን ማርያም', tg: 'ግሸን ማርያም', en: 'Gishen Maryam Sanctuary', om: 'Gishen Maariyaam', cat: 'mountain' },
  { am: 'ጎንደር ፋሲል ግቢ', gz: 'አድያም ሰገድ ኢያሱ', tg: 'ፋሲል ግቢ', en: 'Gondar Fasil Ghebbi Castle', om: 'Gondar Faasil Gibbee', cat: 'historical' },
  { am: 'ጉንዳ ጉንዴ', gz: 'ጉንዳ ጉንዴ', tg: 'ጉንዳ ጉንዴ', en: 'Gunda Gunde Monastery', om: 'Monasterii Gunda Gunde', cat: 'mountain' },
  { am: 'ጉንዳ ጉንዶ', gz: 'ጉንዳ ጉንዴ', tg: 'ጉንዳ ጉንዴ', en: 'Gunda Gunde Monastery', om: 'Monasterii Gunda Gunde', cat: 'mountain' },
  { am: 'ጣና ቂርቆስ', gz: 'ጣና ቂርቆስ', tg: 'ጣና ቂርቆስ', en: 'Tana Qirqos Island Monastery', om: 'Monasterii Xaanaa Qiirqoos', cat: 'lake' },
  { am: 'ጣና ቸርቆስ', gz: 'ጣና ቂርቆስ', tg: 'ጣና ቂርቆስ', en: 'Tana Qirqos Island Monastery', om: 'Monasterii Xaanaa Qiirqoos', cat: 'lake' },
  { am: 'ጭላሎ አቡነ ተክለሃይማኖት', gz: 'ጭላሎ ተክለሃይማኖት', tg: 'ጭላሎ ተክለሃይማኖት', en: 'Chilalo Abune Tekle Haymanot', om: 'Ciilaaloo Abune Takle Haymanot', cat: 'mountain' },
  { am: 'ጻድቃኔ ማርያም', gz: 'ጻድቃኔ ማርያም', tg: 'ጻድቃኔ ማርያም', en: 'Tsadiqane Maryam Sanctuary', om: 'Tsadiqane Maariyaam', cat: 'historical' },
  { am: 'ዘርዓ ያዕቆብ', gz: 'ዘርዓ ያዕቆብ', tg: 'ዘርዓ ያዕቆብ', en: 'Zera Yacob Monastic Retreat', om: 'Zera Yacob', cat: 'historical' },
  { am: 'ዙቋላ', gz: 'ደብረ ዙቋላ', tg: 'ገዳም ዙቋላ', en: 'Mount Zuqualla Monastery', om: 'Monasterii Zuqaalaa', cat: 'mountain' },
  { am: 'ዞዝ አምባ ጊዮርጊስ', gz: 'ዞዝ አምባ ጊዮርጊስ', tg: 'ዞዝ አምባ ጊዮርጊስ', en: 'Zoz Amba Giorgis Monastery', om: 'Monasterii Zoz Ambaa Giyorgis', cat: 'mountain' },
  { am: 'ዋልድባ', gz: 'ገዳመ ዋልድባ', tg: 'ገዳም ዋልድባ', en: 'Waldiba Monastery', om: 'Monasterii Waldiibaa', cat: 'mountain' }
];

export const monasteriesData: Monastery[] = rawMonasteriesData.map(item => ({
  name: {
    Amharic: item.am,
    Geez: item.gz,
    Tigrinya: item.tg,
    English: item.en,
    AfaanOromo: item.om
  },
  description: descriptions[item.cat],
  image: images[item.cat],
  category: item.cat
}));
