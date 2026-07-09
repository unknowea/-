import { Language } from '../types';

export interface CategoryItem {
  name: string;
  description: string;
  searchTerms: string;
}

// Fallback category lists for all 5 languages
export const FALLBACK_CATEGORIES: Record<string, Record<Language, CategoryItem[]>> = {
  monasteries: {
    Amharic: [
      { name: "ደብረ ዳሞ (Debre Damo)", description: "በ6ኛው ክፍለ ዘመን በአቡነ አረጋዊ የተመሰረተ። በ15 ሜትር ገመድ መውጫውና በአክሱማዊ የስነ-ህንጻ ጥበቡ ይታወቃል።", searchTerms: "Debre Damo, Abune Aregawi, Tigray" },
      { name: "አክሱም ጽዮን (Axum Tsion)", description: "በ4ኛው ክፍለ ዘመን በነገስታት ኢዛና እና ሳይዛና የተገነባ። የእግዚአብሔር ታቦተ ጽዮን (የቃል ኪዳኑ ታቦት) መገኛ ቅዱስ ስፍራ ነው።", searchTerms: "Axum Tsion, Ark of Covenant, Maryam Tsion" },
      { name: "ደብረ ሊባኖስ (Debre Libanos)", description: "በ13ኛው ክፍለ ዘመን በጻድቁ አቡነ ተክለ ሃይማኖት የተመሰረተ። ትልቅ መንፈሳዊ ማዕከልና የእጨጌ መቀመጫ ነው።", searchTerms: "Debre Libanos, Tekle Haymanot, Shewa" },
      { name: "ላሊበላ ውቅር አብያተ ክርስቲያናት (Lalibela)", description: "በ12ኛው-13ኛው ክፍለ ዘመን በንጉሥ ላሊበላ ከአንድ ወጥ ድንጋይ የተወቀሩ 11 አብያተ ክርስቲያናት፣ 'አዲሷ ኢየሩሳሌም'።", searchTerms: "Lalibela, King Lalibela, Rock-hewn" },
      { name: "ዋልድባ ገዳም (Waldiba)", description: "በ14ኛው ክፍለ ዘመን የተመሰረተ። 'የመነኮሳት በረሃ' በመባል የሚታወቅ፣ በጠነከረ ገዳማዊ ስርዓትና ሱባኤ የታወቀ።", searchTerms: "Waldiba, Monks, Asceticism" },
      { name: "ዝቋላ አቡነ ገብረ መንፈስ ቅዱስ (Zequala)", description: "በጠፋ እሳተ ጎመራ አናት ላይ የሚገኝ ገዳም፤ በአቡነ ገብረ መንፈስ ቅዱስ የተመሰረተ ታላቅ የጉዞ ስፍራ።", searchTerms: "Zequala, Gebre Menfas Qidus, Abo" },
      { name: "ደብረ ቢዘን (Debre Bizen)", description: "በ14ኛው ክፍለ ዘመን በአቡነ ፊልጶስ የተመሰረተ። ከተራራ አናት ላይ የሚገኝና ሴቶች እንዳይገቡ የሚከለክል ገዳም።", searchTerms: "Debre Bizen, Abune Filipos, Eritrea" },
      { name: "ዳጋ እስጢፋኖስ (Daga Estifanos)", description: "በጣና ሐይቅ ላይ የሚገኝ በ13ኛው ክፍለ ዘመን የተመሰረተ ገዳም። የታላላቅ ነገሥታት አስክሬን በክብር የተቀመጠበት።", searchTerms: "Daga Estifanos, Lake Tana, Emperors" },
      { name: "ጣና ቂርቆስ (Tana Qirqos)", description: "በጣና ሐይቅ ላይ የሚገኝ ጥንታዊ ገዳም። የቃል ኪዳኑ ታቦት ለአያሌ ዘመናት ተቀምጦበት የነበረ ቅዱስ ስፍራ።", searchTerms: "Tana Qirqos, Lake Tana, Ark" },
      { name: "መርጡለ ማርያም (Mertule Maryam)", description: "በጎጃም ምድር ለመጀመሪያ ጊዜ ለድንግል ማርያም የተሰራ ታላቅ ቤተ መቅደስ። በስነ-ህንጻው እጅግ አስደናቂ ነው።", searchTerms: "Mertule Maryam, Gojjam, Virgin Mary" }
    ],
    Geez: [
      { name: "ደብረ ዳሞ (Debre Damo)", description: "ዘተሐንጸ በ፮ኛው ክፍለ ዘመን በአቡነ አረጋዊ። ይትአወቅ በሐብል ዘ፲፭ ሜትር ወበሥነ ሕንጻ አክሱም።", searchTerms: "Debre Damo, Abune Aregawi, Tigray" },
      { name: "አክሱም ጽዮን (Axum Tsion)", description: "ዘተሐንጸ በ፬ኛው ክፍለ ዘመን በነገሥት ዔዛና ወሳይዛና። ውእቱ መቅደስ ቅዱስ ዘታቦተ ጽዮን።", searchTerms: "Axum Tsion, Ark of Covenant, Maryam Tsion" },
      { name: "ደብረ ሊባኖስ (Debre Libanos)", description: "ዘተሐንጸ በ፲፫ኛው ክፍለ ዘመን በጻድቅ አቡነ ተክለ ሃይማኖት። ታላቅ ማዕከል መንፈሳዊ።", searchTerms: "Debre Libanos, Tekle Haymanot, Shewa" },
      { name: "ላሊበላ (Lalibela)", description: "፲፩ አብያተ ክርስቲያናት ዘተወቀሩ እምኮከብ በንጉሥ ላሊበላ፣ 'ሐዳስ ኢየሩሳሌም'።", searchTerms: "Lalibela, King Lalibela, Rock-hewn" },
      { name: "ዋልድባ (Waldiba)", description: "ገዳም ቅዱስ ዘተመሠረተ በ፲፬ኛው ክፍለ ዘመን። ይትአወቅ በብሕትውና ወጾም ጽኑዕ።", searchTerms: "Waldiba, Monks, Asceticism" }
    ],
    Tigrinya: [
      { name: "ደብረ ዳሞ (Debre Damo)", description: "ኣብ መበል 6 ክፍለ ዘመን ብኣቡነ ኣረጋዊ ዝተመስረተ። ብገመድ ዝድየብ ጥንታዊ ገዳም እዩ።", searchTerms: "Debre Damo, Abune Aregawi, Tigray" },
      { name: "አክሱም ጽዮን (Axum Tsion)", description: "ኣብ መበል 4 ክፍለ ዘመን ዝተሃንጸ። ታቦተ ጽዮን ዝዓረፈሉ ቅዱስ ቦታ እዩ።", searchTerms: "Axum Tsion, Ark of Covenant, Maryam Tsion" },
      { name: "ደብረ ሊባኖስ (Debre Libanos)", description: "ብጻድቅ ኣቡነ ተክለ ሃይማኖት ዝተመስረተ ዓብዪ መንፈሳዊ ማእኸል።", searchTerms: "Debre Libanos, Tekle Haymanot" }
    ],
    English: [
      { name: "Debre Damo (ደብረ ዳሞ)", description: "6th Century - Founded by Abune Aregawi (one of the Nine Saints). Known for its 15m rope climb and Aksumite architecture.", searchTerms: "Debre Damo, Abune Aregawi, Tigray" },
      { name: "Axum Tsion (አክሱም ጽዮን)", description: "4th Century - Built by Kings Ezana and Saizana. It is the sacred home of the original Ark of the Covenant (Tabote Tsion).", searchTerms: "Axum Tsion, Ark of Covenant, Maryam Tsion" },
      { name: "Debre Libanos (ደብረ ሊባኖስ)", description: "13th Century - Founded by Saint Tekle Haymanot. A major spiritual center and the seat of the Ichege (Abbot).", searchTerms: "Debre Libanos, Tekle Haymanot, Shewa" },
      { name: "Lalibela Rock-Hewn Churches (ላሊበላ)", description: "12th-13th Century - Commissioned by King Lalibela. 11 monolithic churches carved from solid rock, representing 'New Jerusalem'.", searchTerms: "Lalibela, King Lalibela, Rock-hewn" },
      { name: "Waldiba (ዋልድባ)", description: "Established in the 14th Century. Known as the 'Desert of the Monks', famous for its strict asceticism and fasting.", searchTerms: "Waldiba, Monks, Asceticism" }
    ],
    AfaanOromo: [
      { name: "Debre Damo (ደብረ ዳሞ)", description: "Jaarraa 6ffaa keessa Abune Aregaawiin kan hundeeffame. Masaraa dachee dhiphoo fi kora fo'oo meetira 15n beekama.", searchTerms: "Debre Damo, Abune Aregawi, Tigray" },
      { name: "Axum Tsion (አክሱም ጽዮን)", description: "Jaarraa 4ffaa keessa Mootota Eezaanaa fi Sa'izaanaan kan ijaarame. Bakka qulqulluu Taabanni Tsiyoon itti argamudha.", searchTerms: "Axum Tsion, Ark of Covenant, Maryam Tsion" }
    ]
  },
  abnet: {
    Amharic: [
      { name: "ንባብ ቤት (Nebab Bet)", description: "የመጀመሪያው መሠረታዊ ደረጃ፤ የግዕዝ ፊደላትን፣ ንባብንና የመጀመሪያ ደረጃ ጸሎታትን መማሪያ ክፍል ነው።", searchTerms: "Nebab Bet, Alphabet, Ge'ez, Primary" },
      { name: "ዜማ ቤት (Zema Bet)", description: "የቅዱስ ያሬድን ድጓ፣ ጾመ ድጓ፣ ምዕራፍና ሌሎችንም የዜማ ክፍሎች በቃል የሚጠናበት ታላቅ ትምህርት ቤት ነው።", searchTerms: "Zema Bet, St Yared, Chant, Hymns" },
      { name: "ቅኔ ቤት (Qine Bet)", description: "የግዕዝ ሰዋስውን፣ የግጥም ጥበብንና 'ሰምና ወርቅ' የተሰኘውን የፍልስፍናና የምስጢር መንገድ መማሪያ ነው።", searchTerms: "Qine Bet, Poetry, Wax and Gold, Logic" },
      { name: "መጽሐፍ ቤት (Metsehaf Bet)", description: "የብሉይ ኪዳን፣ የሐዲስ ኪዳን፣ የሊቃውንትና የሥርዓተ ቤተክርስቲያን መጻሕፍትን ትርጓሜ (አንድምታ) መማሪያ ክፍል ነው።", searchTerms: "Metsehaf Bet, Theology, Bible commentary, Andemta" },
      { name: "አቋቋም (Aquaquam)", description: "በመቋሚያና በጸናጽል የሚከናወነውን መንፈሳዊ ወረብና የዜማ አካላዊ እንቅስቃሴ ማስተማሪያ ነው።", searchTerms: "Aquaquam, Movement, Sistrum, Drumming" }
    ],
    Geez: [
      { name: "ንባብ ቤት (Nebab Bet)", description: "ቀዳማይ መሠረት ዘፊደላተ ግዕዝ ወንባብ ቅዱስ።", searchTerms: "Nebab Bet, Alphabet, Ge'ez, Primary" },
      { name: "ዜማ ቤት (Zema Bet)", description: "ቤት ዘቅዱስ ያሬድ ማኅሌታይ፤ ለድጓ ወጾመ ድጓ።", searchTerms: "Zema Bet, St Yared, Chant" }
    ],
    Tigrinya: [
      { name: "ንባብ ቤት (Nebab Bet)", description: "ፊደላት ግዕዝን ስርዓተ ንባብን ዝመሃረሉ መበገሲ እዩ።", searchTerms: "Nebab Bet, Alphabet, Ge'ez" }
    ],
    English: [
      { name: "Nebab Bet (ንባብ ቤት)", description: "Foundational reading of Ge'ez Fidel and primary prayers. The elementary stage of the traditional curriculum.", searchTerms: "Nebab Bet, Alphabet, Ge'ez, Primary" },
      { name: "Zema Bet (ዜማ ቤት)", description: "Sacred music school of St. Yared, teaching Digua, Tsome Digua, and Me'eraf chants.", searchTerms: "Zema Bet, St Yared, Chant, Hymns" },
      { name: "Qine Bet (ቅኔ ቤት)", description: "Ge'ez poetry and semantic logic, stressing 'Sem'na Worq' (Wax and Gold) and poetic meters.", searchTerms: "Qine Bet, Poetry, Wax and Gold, Logic" },
      { name: "Metsehaf Bet (መጽሐፍ ቤት)", description: "Theological interpretation (Andemta) of the Bible, church law, and works of the Church Fathers.", searchTerms: "Metsehaf Bet, Theology, Bible commentary, Andemta" }
    ],
    AfaanOromo: [
      { name: "Nebab Bet (ንባብ ቤት)", description: "Siriiba bu'uraa qubee Sirna Ge'eez fi kadhannaawwan jalqabaa itti baratan.", searchTerms: "Nebab Bet, Alphabet, Ge'ez" }
    ]
  },
  teachers: {
    Amharic: [
      { name: "ቅዱስ ያሬድ (Saint Yared)", description: "በ6ኛው ክፍለ ዘመን የኖረ የቤተክርስቲያን ድንቅ ማኅሌታይ፤ የአምስት ዜማ ክፍሎችና የምልክት ስርዓት ፈጣሪ።", searchTerms: "Yared, Saint Yared, Zema, Music" },
      { name: "አቡነ ተክለ ሃይማኖት (Abune Tekle Haymanot)", description: "በ13ኛው ክፍለ ዘመን የነበሩ ታላቅ ጻድቅ፤ የሸዋ ገዳማዊ ስርዓት መስራችና ወንጌልን ያሰፉ አባት።", searchTerms: "Tekle Haymanot, Saint, Debre Libanos" },
      { name: "አቡነ ገብረ መንፈስ ቅዱስ (Abune Gebre Menfas Qidus)", description: "በቅድስናና በከፍተኛ ተጋድሎ የኖሩ፣ አራዊትን ያገሩና ለኢትዮጵያ ምድር የጸለዩ ታላቅ አባት (አቦ)።", searchTerms: "Gebre Menfas Qidus, Abo, Hermit" },
      { name: "አባ ጊዮርጊስ ዘጋስጫ (Abba Giyorgis of Gascha)", description: "እንደ አርጋኖንና መጽሐፈ ምስጢር ያሉ ታላላቅ የነቅዐ ሃይማኖትና የዜማ መጻሕፍትን የደረሱ ሊቅ።", searchTerms: "Giyorgis, Gascha, Writer, Arganon" },
      { name: "አቡነ ሰላማ ከሣቴ ብርሃን (Abune Selama)", description: "ለኢትዮጵያ የመጀመሪያው ጳጳስ በመሆን የክርስትናን ብርሃን ያበሩ ታላቅ አባት።", searchTerms: "Selama, Bishop, Axum, Frumentius" }
    ],
    Geez: [
      { name: "ቅዱስ ያሬድ (Saint Yared)", description: "ማኅሌታይ ዘምድርነ፤ ፈጣሬ ዜማ ወምልክት በ፮ኛው ክፍለ ዘመን።", searchTerms: "Yared, Saint Yared, Zema" },
      { name: "አቡነ ተክለ ሃይማኖት (Abune Tekle Haymanot)", description: "ዓምደ ሃይማኖት ዘምድረ ሸዋ፤ መሠረተ ስርዓተ ገዳም በ፲፫ኛው ክፍለ ዘመን።", searchTerms: "Tekle Haymanot, Saint" }
    ],
    Tigrinya: [
      { name: "ቅዱስ ያሬድ (Saint Yared)", description: "ኣብ መበል 6 ክፍለ ዘመን ዝነበረ ዓብዪ ማህሌታይን ደራሲ ዜማን እዩ።", searchTerms: "Yared, Saint Yared" }
    ],
    English: [
      { name: "Saint Yared (ቅዱስ ያሬድ)", description: "Mother of Ethiopian sacred music and creator of the unique five-chant liturgical notation system in the 6th century.", searchTerms: "Yared, Saint Yared, Zema, Music" },
      { name: "Abune Tekle Haymanot (አቡነ ተክለ ሃይማኖት)", description: "The pillar of Shewan monasticism who revived the church in the 13th century and founded Debre Libanos.", searchTerms: "Tekle Haymanot, Saint, Debre Libanos" },
      { name: "Abune Gebre Menfas Qidus (አቡነ ገብረ መንፈስ ቅዱስ)", description: "The highly revered Egyptian hermit who lived among wild beasts in Ethiopia, known for his extraordinary asceticism.", searchTerms: "Gebre Menfas Qidus, Abo, Hermit" },
      { name: "Abba Giyorgis of Gascha (አባ ጊዮርጊስ ዘጋስጫ)", description: "14th-century intellectual giant, theological writer, and author of 'Arganon' (Harp of Praise) and 'Metsehafe Mister'.", searchTerms: "Giyorgis, Gascha, Writer, Arganon" }
    ],
    AfaanOromo: [
      { name: "Saint Yared (ቅዱስ ያሬድ)", description: "Jaarraa 6ffaa keessa barreessaa sirba qulqulluu fi kalaqaa mallattoo sirbaa.", searchTerms: "Yared, Saint Yared" }
    ]
  },
  holidays: {
    Amharic: [
      { name: "መስቀል (Meskel)", description: "እቴጌ እሌኒ እውነተኛውን የክርስቶስ መስቀል ለማግኘት ያደረገችውን ፍለጋና መገኘት የምናስብበት በዓል (መስከረም 17)።", searchTerms: "Meskel, Finding of Cross, Demera" },
      { name: "ጥምቀት (Timket)", description: "ጌታችን በዮርዳኖስ ባሕር የተጠመቀበትን በዓል በታቦታት ጉዞና በውኃ መርጨት የምናከብረው ታላቅ በዓል (ጥር 11)።", searchTerms: "Timket, Baptism, Epiphany, Tabot" },
      { name: "ገና (Genna)", description: "የጌታችንን የልደት በዓል የምናስብበትና በልዩ መንፈሳዊ ስርዓት የሚከበረው በዓል (ታኅሣሥ 29/ጥር 7)።", searchTerms: "Genna, Christmas, Lasta, Lalibela" },
      { name: "ፋሲካ (Fasika)", description: "የጌታችንን ትንሳኤ ከ55 ቀናት ዓቢይ ጾም በኋላ በከፍተኛ ደስታና ምስጋና የምናከብረው በዓል ነው።", searchTerms: "Fasika, Resurrection, Easter, Lent" },
      { name: "ሕዳር ጽዮን (Hidar Tsion)", description: "ታቦተ ጽዮን ወደ አክሱም ምድር የመጣችበትንና ለድንግል ማርያም የምስጋና በዓል የምናቀርብበት ዕለት (ሕዳር 21)።", searchTerms: "Hidar Tsion, Axum, Maryam, Covenant" }
    ],
    Geez: [
      { name: "መስቀል (Meskel)", description: "ዝክረ ረክቦቱ ለዕፀ መስቀል ቅዱስ በእቴጌ እሌኒ።", searchTerms: "Meskel, Finding of Cross" },
      { name: "ጥምቀት (Timket)", description: "በዓለ አስተርዮተ ሥላሴ ወጥምቀተ እግዚእነ በዮርዳኖስ።", searchTerms: "Timket, Baptism" }
    ],
    Tigrinya: [
      { name: "መስቀል (Meskel)", description: "ረክቦት ናይቲ ክቡር መስቀል ጎይታና ብምኽንያት ደመራ ዝበዓለሉ በዓል እዩ።", searchTerms: "Meskel, Finding of Cross" }
    ],
    English: [
      { name: "Meskel (መስቀል)", description: "Commemorates the Finding of the True Cross by Queen Helena in the 4th century. Celebrated with the Demera bonfire (September 27).", searchTerms: "Meskel, Finding of Cross, Demera" },
      { name: "Timket (ጥምቀት)", description: "Ethiopian Epiphany, celebrating Christ's baptism in the Jordan. Known for the grand procession of Tabots to water bodies (January 19).", searchTerms: "Timket, Baptism, Epiphany, Tabot" },
      { name: "Genna (ገና)", description: "Ethiopian Christmas, celebrating the Nativity of Christ. Strongly associated with the ancient stone churches of Lalibela (January 7).", searchTerms: "Genna, Christmas, Lasta, Lalibela" },
      { name: "Fasika (ፋሲካ)", description: "Ethiopian Easter, celebrating the Resurrection of Jesus Christ after a deep 55-day period of fasting and prayer.", searchTerms: "Fasika, Resurrection, Easter, Lent" }
    ],
    AfaanOromo: [
      { name: "Meskel (መስቀል)", description: "Ayyaana argamuu fannoo qulqulluu yaadatamu, dhimma demeraa waliin wal qabata.", searchTerms: "Meskel, Finding of Cross" }
    ]
  }
};

// Extremely detailed historical / theological detail contents for specific items in all 5 languages
export const FALLBACK_ITEM_DETAILS: Record<string, Partial<Record<Language, string>>> = {
  default: {
    Amharic: `# ታሪካዊና መንፈሳዊ መግለጫ

ይህ ስለ መረጡት መንፈሳዊ አርዕስት የቀረበ ሰፊና ጥንታዊ ታሪክ ነው። የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ከጥንት ጀምሮ ታሪኳን፣ እምነቷን እና ስርዓቷን በንቃት ጠብቃ አቆይታለች።

## ታሪካዊ አመጣጥ
ከጥንት ነገሥታት ዘመን ጀምሮ የነበሩ ቅዱሳን አባቶች፣ መነኮሳትና ሊቃውንት ይህንን መንፈሳዊ ቅርስ ለትውልድ እንዲተላለፍ ታላቅ ተጋድሎ አድርገዋል። በየገዳማቱ የሚገኙ ጥንታዊ የብራና መጻሕፍት ለዚህ ምስክር ናቸው።

## ሥርዓተ እምነትና ባህል
ይህ መንፈሳዊ ቅርስ በሊቃውንቱ ዘንድ ትልቅ ቦታ የሚሰጠው ሲሆን፣ በሥርዓተ ማኅሌትና በቅዱስ ቅዳሴ ላይ በስፋት ጥቅም ላይ ይውላል። የሃይማኖታችን መሠረት የሆነውን እውነት በምሳሌና በምስጢር ይገልጻል።

IMAGE_TAGS: [ethiopian orthodox ancient spiritual heritage]`,
    Geez: `# ዜና መዋዕል ወታሪክ ቅዱስ

ዝንቱ ታሪክ ውእቱ ዘአበው ቀደምት ዘተረክበ በቤተ ክርስቲያን ዘኢትዮጵያ።

## አመጣጥ ታሪክ
እምዘመነ ነገሥት ነገሡ በሃይማኖት ወአጽንዑ ስርዓተ።

IMAGE_TAGS: [geez ancient manuscript orthodox]`,
    Tigrinya: `# ታሪካዊ መግለጺ

እዚ ብዛዕባ ዝሓረኹምዎ መንፈሳዊ ኣርእስቲ ዝርዝር መግለጺ እዩ።

IMAGE_TAGS: [tigray orthodox history church]`,
    English: `# Historical and Spiritual Detail

This is a comprehensive historical and theological overview of your selected subject in the Ethiopian Orthodox Tewahedo Church tradition.

## Historical Origin & Context
The roots of this spiritual subject date back to ancient times, nurtured by holy fathers, ascetic monks, and church scholars. The preservation of this knowledge has been secured through centuries of handwritten Ge'ez manuscripts and sacred oral traditions.

## Liturgical and Theological Significance
In the Tewahedo Orthodox faith, this element plays a critical role in the liturgical cycle, reinforcing core christological and triune doctrines. It is celebrated or studied with deep reverence and intellectual rigor.

IMAGE_TAGS: [ethiopian orthodox ancient spiritual heritage]`,
    AfaanOromo: `# Seenaa fi Ibsa Dubbii

Kun seenaa bal'aa fi qulqulluu dhimma ati filatterraatti dhiyaatedha.

IMAGE_TAGS: [oromo orthodox heritage church]`
  },
  "Debre Damo (ደብረ ዳሞ)": {
    Amharic: `# ገዳመ ደብረ ዳሞ - ታሪካዊና መንፈሳዊ ጉዞ

ደብረ ዳሞ በሰሜን ኢትዮጵያ በትግራይ ክልል የሚገኝ ሲሆን፣ በሀገራችን ካሉ ጥንታዊ ገዳማት ቀዳሚውን ስፍራ ይይዛል።

## ታሪካዊ አመጣጥና አወቃቀር
ገዳሙ በ6ኛው ክፍለ ዘመን በዓፄ ገብረ መስቀል ዘመነ መንግሥት ከዘጠኙ ቅዱሳን አንዱ በሆኑት በአቡነ አረጋዊ ተመሠረተ። ገዳሙ የሚገኘው ከፍ ባለ፣ ጠፍጣፋና ገደላማ በሆነ ተራራ (እምባ) አናት ላይ ነው። ወደ ገዳሙ ለመግባት 15 ሜትር የሚያህል ርዝመት ያለውንና ከቆዳ የተሰራ ጠንካራ ገመድ መጠቀም ግድ ይላል። ይህ ራሱ የመንፈሳዊ ተጋድሎና ከዓለም የመለየት ምልክት ተደርጎ ይወሰዳል።

## የአቡነ አረጋዊ ተጋድሎ
በገዳማዊው ትውፊት መሠረት፣ አቡነ አረጋዊ ወደዚህ አስቸጋሪ ተራራ ለመውጣት ሲሞክሩ እግዚአብሔር ታላቅ ዘንዶ ልኮላቸው በዘንዶው ጅራት ተጠምጥመው ወደ ላይ ወጥተዋል። ይህ ተአምር በቤተክርስቲያን ስዕላት ላይ በስፋት ይሳላል። ጻድቁ በዚያ ስፍራ በታላቅ ጾምና ጸሎት በተጋድሎ ኖረዋል።

## ሥነ-ህንጻና ቅርሶች
በገዳሙ አናት ላይ የሚገኘው ቤተክርስቲያን በሀገራችን ሳይፈርስ የቆየ ጥንታዊው ህንጻ ሲሆን፣ የአክሱማዊ የስነ-ህንጻ ጥበብ ቁልጭ ብሎ ይታይበታል። ከእንጨትና ከድንጋይ የተገነባ፣ እጅግ አስደናቂ ጣሪያና ሳንቃዎች ያሉት ነው። ገዳሙ እጅግ በርካታ ጥንታዊ የብራና መጻሕፍትን፣ የወርቅና ብር መስቀሎችን እንዲሁም የነገሥታት ስጦታዎችን በቅዱስ ማከማቻው ይዞ ይገኛል።

ገዳሙ ለሴቶች ፍፁም የተከለከለ ሲሆን፣ ለወንድ መነኮሳትና ተማሪዎች ብቻ ክፍት ነው።

IMAGE_TAGS: [debre damo rope church ethiopia]`,
    English: `# Debre Damo Monastery - Comprehensive History

Debre Damo is one of the most ancient, famous, and structurally unique monasteries in Ethiopia, located on a sheer-cliff mountain in Tigray.

## Historical Foundations
Founded in the 6th century during the reign of King Gebre Meskel, the monastery owes its origin to Abune Aregawi (Za-Mikael), one of the celebrated Nine Saints who traveled from the Byzantine Empire to escape persecution and strengthen the Orthodox faith in Axum.

## The Rope and the Ascent
Debre Damo is situated atop a flat-topped mountain or "amba" with vertical cliffs. The only way to access the monastery is by climbing a 15-meter thick leather rope (jebd), pulled up by resident monks. This dramatic ascent symbolizes the monk's absolute separation from the secular world and his upward climb toward heavenly wisdom.

## Architectural and Artistic Significance
The main church of Debre Damo is widely recognized as the oldest intact church structure in Ethiopia. It showcases classical Aksumite architectural styles, including alternating layers of stone and wood (known as "monkey heads") and beautifully carved wooden ceilings depicting animals and geometric patterns. The treasury houses invaluable ancient Ge'ez manuscripts, gold processional crosses, and historic royal garments.

True to its highly ascetic rules, the monastery is strictly off-limits to women, as well as female animals.

IMAGE_TAGS: [debre damo rope church ethiopia]`,
    Geez: `# ደብረ ዳሞ ገዳም ቅዱስ

ደብረ ዳሞ ውእቱ ቀዳማይ ወጥንታዊ ገዳም ዘሀገረ ኢትዮጵያ በክፍለ ዘመነ አክሱም።

IMAGE_TAGS: [debre damo ancient orthodox]`,
    Tigrinya: `# ገዳም ደብረ ዳሞ

ገዳም ደብረ ዳሞ ኣብ ትግራይ ዝርከብ ጥንታዊ ገዳም እዩ። ብገመድ ጥራይ ዝድየብ ፍሉይ ስርዓት ኣለዎ።

IMAGE_TAGS: [debre damo tigray church]`,
    AfaanOromo: `# Debre Damo

Debre Damo bakka seena qabeessa jaarraa 6ffaa keessa hundeeffamedha.

IMAGE_TAGS: [debre damo ethiopia]`
  },
  "Axum Tsion (አክሱም ጽዮን)": {
    Amharic: `# ርዕሰ አድባራት ቅድስተ ቅዱሳን ማርያም ጽዮን በአክሱም

አክሱም ማርያም ጽዮን በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ውስጥ እጅግ ቅዱስና ዋነኛው መንፈሳዊ ማዕከል ነው።

## የታቦተ ጽዮን መምጣትና ታሪክ
ይህች ቤተክርስቲያን ለመጀመሪያ ጊዜ የተገነባችው በ4ኛው ክፍለ ዘመን በክርስትናን በሀገሪቱ ባወጁት በነገስታት አብርሃ ወአጽብሃ (ኢዛና እና ሳይዛና) ዘመን ነው። የቤተክርስቲያኑ ዋነኛ ቅድስና የሚመነጨው በብሉይ ኪዳን እግዚአብሔር ለሙሴ የሰጠው የቃል ኪዳኑ ታቦት (ታቦተ ጽዮን) እውነተኛ መቀመጫ ከመሆኗ ነው። ታቦቱ በቀዳማዊ ምኒልክ (የንጉሥ ሰሎሞንና የንግሥት ሳባ ልጅ) አማካኝነት ከእየሩሳሌም ወደ ኢትዮጵያ እንደመጣ በትውፊት ይታመናል።

## ህንጻዎቹና ታሪካዊ ለውጦች
በታሪክ ውስጥ ማርያም ጽዮን ሦስት ጊዜ ተገንብታለች። የመጀመሪያው የአክሱም ዘመን ታላቅ ህንጻ በዮዲት ጉዲት ውድመት ደርሶበታል። ሁለተኛው በመካከለኛው ዘመን ተገንብቶ በአህመድ ግራኝ ተቃጥሏል። አሁን የሚታየው ጥንታዊው የፋሲለደስ ህንጻ በ17ኛው ክፍለ ዘመን በንጉሥ ፋሲለደስ የተሰራ ሲሆን፣ ሴቶች እዚያ እንዳይገቡ ይከለከላል። በአጠገቡ በዓፄ ኃይለ ሥላሴ ዘመነ መንግሥት የተገነባው ዘመናዊና ሰፊው ካቴድራል ለሁሉም ክፍት ሆኖ ያገለግላል።

## የቃል ኪዳኑ ታቦት ጠባቂ
ታቦተ ጽዮን የምትገኘው በካቴድራሉ አቅራቢያ ባለችው ልዩ የእቃ ቤት (Chapel of the Tablet) ውስጥ ነው። ለዚህ ታቦት ዕድሜ ልኩን እንዲጠብቅ የሚሾም አንድ ቅዱስ መነኩሴ (እጩ ጠባቂ) ብቻ አለ። ከእርሱ ውጪ ማንም ሰው፣ የሀገሪቱ ፓትርያርክም ቢሆን፣ ወደ መቅደሱ ገብቶ ታቦቱን ማየት አይፈቀድለትም።

IMAGE_TAGS: [axum tsion ark covenant chapel]`,
    English: `# Church of Our Lady Mary of Zion (Axum Tsion)

The Church of Our Lady Mary of Zion (Maryam Tsion) in Axum is the most sacred sanctuary and spiritual heart of the Ethiopian Orthodox Tewahedo Church.

## Historical Origin
Established in the 4th century during the co-reign of Kings Ezana and Saizana (Abraha and Atsbeha), this cathedral marks the official adoption of Christianity as the state religion of the Aksumite Empire. It was originally built as a massive, multi-tiered cathedral, unmatched in its scale at the time.

## The Ark of the Covenant (Tabote Tsion)
According to the sacred chronicle *Kebra Nagast* (Glory of Kings), the original Ark of the Covenant was brought from Jerusalem to Ethiopia by Menelik I, the son of King Solomon and the Queen of Sheba. The Ark is preserved in the high-security Chapel of the Tablet adjacent to the old church. A single consecrated monk, known as the Guardian of the Ark, is appointed for life to watch over it. He is the only human permitted to enter the chapel or look upon the Ark.

## Architectural Developments
Over the millennia, the church suffered major destructions, first by Queen Gudit in the 10th century, and later by Ahmad ibn Ibrahim al-Ghazi (Gragn) in the 16th century. Emperor Fasilides rebuilt the historic stone cathedral in the 17th century, which remains restricted to male visitors. In the 1960s, Emperor Haile Selassie commissioned a magnificent new modern cathedral with a large dome, open to both men and women, which now serves as the main worship hall.

IMAGE_TAGS: [axum tsion ark covenant chapel]`
  }
};

// Simple Bible books fallback data
export const FALLBACK_BIBLE_BOOKS: Record<string, Partial<Record<Language, string>>> = {
  default: {
    Amharic: `# ስለ መረጡት የመጽሐፍ ቅዱስ ክፍል

ይህ መጽሐፍ በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን መጽሐፍ ቅዱስ (81 መጻሕፍት) ውስጥ ትልቅ ቦታ አለው።

## ሃይማኖታዊና ታሪካዊ ትርጉም
የኢትዮጵያ ሊቃውንት ይህንን መጽሐፍ በጥንታዊው 'አንድምታ' ትርጓሜ እየተነተኑ ምስጢሩን ለትውልድ ያቆዩታል። በሥርዓተ ማኅሌትና በቅዳሴ ጊዜ በስፋት ይነበባል።

## ዋና ዋና መልዕክቶች
መጽሐፉ የእግዚአብሔርን ታላቅነት፣ ለሰዎች ያለውን ፍቅርና የቤተክርስቲያንን እምነት የሚገልጹ አስተምህሮዎችን ይዟል።`,
    English: `# Overview of the Selected Bible Book

This holy scripture belongs to the 81-book biblical canon of the Ethiopian Orthodox Tewahedo Church.

## Theological & Liturgical Context
The scholars of the Ethiopian Orthodox Church interpret this text using the traditional 'Andemta' commentary system. It is heavily integrated into the church's daily liturgical hours and seasonal fasts.

## Key Themes and Significance
This book contains powerful revelations concerning divine majesty, redemptive history, and the moral calling of believers.`
  },
  "ኦሪት ዘፍጥረት (Genesis)": {
    Amharic: `# ኦሪት ዘፍጥረት - ስነ-መለኮታዊ ትንታኔ

ኦሪት ዘፍጥረት በአምስቱ የኦሪት መጻሕፍት (ብሉይ ኪዳን) የመጀመሪያው መጽሐፍ ነው።

## የኢትዮጵያ ቤተክርስቲያን ትርጓሜ (አንድምታ)
በኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ቤተክርስቲያን ሊቃውንት ትርጓሜ ዘንድ፣ ዘፍጥረት የእግዚአብሔርን የፍጥረት ጥበብና ፈጣሪነት በስፋት ይተነትናል። ሰባቱ እለታተ ፍጥረት እያንዳንዳቸው መንፈሳዊና ምስጢራዊ ትርጉሞች አሏቸው። ለምሳሌ፣ ብርሃን መፈጠሩ የክርስቶስን ወደ ዓለም መምጣት እንደሚያመለክት ይተረጎማል።

## ዋና ዋና ክፍሎች
1. **የዓለም አፈጣጠር (ምዕ 1-2):** እግዚአብሔር ዓለምን በቃሉ ካለመኖር ወደ መኖር ማምጣቱ።
2. **የሰው ልጅ መውደቅና የመጀመሪያው ተስፋ (ምዕ 3):** አዳምና ሔዋን በሰሩት ስህተት ከገነት መውጣታቸውና እግዚአብሔር የሰጠው የድኅነት ቃል ኪዳን።
3. **የአባቶች ታሪክ:** የአብርሃም፣ የይስሐቅ፣ የያዕቆብና የዮሴፍ የህይወት ጉዞና እግዚአብሔር ከእነርሱ ጋር የገባው ቃል ኪዳን።

## በሊტურጂያ ውስጥ ያለው ሚና
ይህ መጽሐፍ በዓቢይ ጾም ወቅት በሰፊው የሚነበብ ሲሆን፣ የሰው ልጅ መጀመሪያ ከየት እንደመጣና የእግዚአብሔር ቸርነት ምን ያህል ታላቅ እንደነበር በጸሎት ሰዓታት እንድናሰላስል ይረዳል።`,
    English: `# Genesis - Theological and Historical Overview

The Book of Genesis (Orit Zefitret) stands as the first book of the Octateuch in the Ethiopian Orthodox Tewahedo Church's 81-book biblical canon.

## Traditional Interpretation (Andemta)
In the traditional Ethiopian patristic commentary, Genesis is interpreted not merely as historical record, but as deep christological mystery. The creation of light on the first day is viewed as a precursor to the incarnation of Christ, the true light of the world. The creation of Adam in the image of God is heavily analyzed in relation to the ultimate redemption wrought by Christ.

## Structure and Major Themes
1. **Creation (Ch. 1-2):** Outlining God's creative wisdom in bringing the universe into existence *ex nihilo* (from nothingness).
2. **The Fall and the Protoevangelium (Ch. 3):** The transgression of Adam and Eve, their expulsion from Paradise, and the immediate promise of the Seed who would crush the serpent (interpreted as the Incarnate Word).
3. **The Patriarchal Covenants:** The histories of Abraham, Isaac, Jacob, and Joseph, demonstrating God's historical faithfulness and covenantal selection.

## Liturgical Use
Genesis is extensively read during the Liturgical hours of the Great Lent (Abiy Tsome). It serves as a reminder of the primordial state of humanity and calls believers to repentance and restoration of the divine image.`
  }
};
