import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the NATO phonetic alphabet and why was it created?',
    a: `The NATO phonetic alphabet — formally called the International Radiotelephony Spelling Alphabet — is a system in which each letter of the Latin alphabet is assigned a specific code word. The code words are: Alpha, Bravo, Charlie, Delta, Echo, Foxtrot, Golf, Hotel, India, Juliet, Kilo, Lima, Mike, November, Oscar, Papa, Quebec, Romeo, Sierra, Tango, Uniform, Victor, Whiskey, X-ray, Yankee, and Zulu. It was developed in the 1950s by the International Civil Aviation Organization and later adopted by NATO and the ITU to standardize voice communication across different languages. The main problem it solves is ambiguity: over radio or telephone links, many letters sound similar — B and D, F and S, M and N, P and B — and mishearing a single letter can cause critical errors in air traffic control, military operations, and emergency services. By replacing each letter with a distinct, easily-pronounced word, the phonetic alphabet eliminates ambiguity even when audio quality is poor.`,
  },
  {
    q: 'How is the NATO phonetic alphabet used in everyday life outside of the military?',
    a: `While the NATO phonetic alphabet originated in military and aviation contexts, it has widespread everyday use. Customer service representatives use it to confirm spelling of names, email addresses, and account numbers over phone calls — for example, saying "Sierra, Mike, India, Tango, Hotel" to confirm "SMITH". Call center staff in banking, insurance, and telecommunications are typically trained in the phonetic alphabet specifically to reduce errors when capturing data verbally. IT support staff use it to dictate complex passwords, license keys, and configuration strings character by character. Police and emergency dispatchers use it to transmit vehicle registration plates, names, and addresses without ambiguity. Medical personnel use phonetic spelling to confirm drug names, patient identifiers, and dosages. In software development, developers use it in voice calls to dictate variable names, API keys, or commit hashes where one wrong character can break everything.`,
  },
  {
    q: 'What phonetic alphabets existed before the NATO version?',
    a: `Before the current NATO alphabet was standardized, many different phonetic spelling alphabets were in use, often varying by country, military branch, and era. The British "Able Baker" alphabet used in World War II included words like Able, Baker, Charlie, Dog, Easy, Fox — some of which influenced the modern version. The United States military used a similar Able Baker alphabet until 1956 when the current ICAO/NATO alphabet was adopted. The ICAO developed the modern alphabet through extensive testing in the early 1950s, broadcasting candidate words to speakers of different languages to measure intelligibility and eliminate words that were too similar-sounding or difficult to pronounce for non-native English speakers. Several rounds of revision were needed before the final ICAO alphabet was adopted in 1956. It has remained unchanged since, making it one of the most stable international technical standards in existence.`,
  },
  {
    q: 'How should the NATO phonetic words be pronounced?',
    a: `The ICAO publishes official pronunciation guides with phonetic stress markings for each code word, specifically designed for international intelligibility. Key pronunciations that differ from common English usage include: Alpha pronounced AL fah, Charlie as CHAR lee, Golf as a single syllable, Hotel as hoh TEL, India as IN dee ah, Juliet as JEW lee ETT, Kilo as KEY loh, Lima as LEE mah which is like the city in Peru not the bean, November as no VEM ber, Oscar as OSS cah, Papa as pah PAH with equal stress on both syllables, Quebec as keh BECK, Sierra as see AIR ah, Tango as TANG go, Uniform as YOU nee form, Victor as VIK tah, Whiskey as WISS key, Yankee as YANG key, and Zulu as ZOO loo. Lima is perhaps the most commonly mispronounced — saying LYE mah instead of LEE mah can cause confusion on radio because it sounds more like a different word to some listeners.`,
  },
  {
    q: 'Is the NATO phonetic alphabet used the same way worldwide?',
    a: `The NATO phonetic alphabet is used by ICAO for civil aviation worldwide, by NATO for military communication, by the ITU for radio communication, and by maritime authorities through the International Maritime Organization. This means the same alphabet is used whether you are at an airport in Tokyo, a naval base in Norway, or a call center in India — it truly is the global standard for phonetic spelling. However, some regional or professional variations exist. The emergency services in the United Kingdom traditionally used a different alphabet called the Police Alphabet though most forces now use the NATO alphabet for interoperability. In everyday civilian use, people sometimes improvise their own phonetic words such as Apple, Boston, California rather than using the official NATO words — while creative, this defeats the purpose since the other party may not recognize the improvised words as phonetic indicators, leading to the same ambiguity the system was designed to avoid.`,
  },
  {
    q: 'How do I spell my name in NATO phonetic alphabet?',
    a: `To spell your name in NATO, simply convert each letter to its corresponding code word separated by a pause or the word "dash" for hyphens. For example, the name JAMES would be spelled Juliet, Alpha, Mike, Echo, Sierra. For a name like RACHEL: Romeo, Alpha, Charlie, Hotel, Echo, Lima. Spaces between first and last names are indicated by a brief pause — you typically say "space" or just pause before continuing with the next word. Numbers in names or addresses use standard number words, though in aviation certain numbers have special pronunciations: 3 is Tree, 4 is Fower, 5 is Fife, 9 is Niner, and the decimal point is Decimal. When spelling over the phone, a common convention is to say the letter first, then the code word: "B as in Bravo, R as in Romeo, A as in Alpha" — this helps listeners who may be unfamiliar with the phonetic alphabet.`,
  },
  {
    q: 'How is the NATO phonetic alphabet used in aviation?',
    a: `Aviation is the most rigorous and widespread use of the NATO phonetic alphabet. Air traffic controllers and pilots use it constantly: aircraft callsigns, gate numbers, runway designations, taxiway names, and waypoint identifiers are all communicated using phonetic spelling. Aircraft are identified by a phonetic callsign — a private Cessna registered N12345 would be November One Two Three Four Five. Runway designations use the phonetic alphabet for suffix letters — Runway 27L is Two Seven Left, not Two Seven Lima, while Runway 27C is Two Seven Charlie. Navigation waypoints in airways are five-letter codes that are read phonetically letter by letter. Even emergency declarations follow strict phonetic protocols: MAYDAY MAYDAY MAYDAY, this is November One Two Three, declaring an emergency. The stakes — aircraft separation and human life — make phonetic clarity a non-negotiable professional standard.`,
  },
  {
    q: 'Can I use this tool for learning or practicing the NATO phonetic alphabet?',
    a: `Yes. Typing words into the tool and reading the NATO words aloud is an effective way to memorize the code words through repetitive association. Start with common letters in your name or frequently used words. Type your full name repeatedly, reading the NATO words aloud each time. Move on to common English words like HELP, STOP, CALL, and spell them phonetically. Over time, you will start to recall the NATO word for each letter instinctively. One memory technique is to learn the first six letters as a phrase: Alpha Bravo Charlie Delta Echo Foxtrot — the rhythm is easy to remember. Then learn Golf through Mike, November through Tango, and Uniform through Zulu as groups. Another technique is to associate each NATO word with a vivid mental image that starts with the corresponding letter. People who use the phonetic alphabet professionally typically achieve full recall within a few weeks of daily use.`,
  },
];

export const natoTable = [
  { letter: 'A', word: 'Alpha',    phonetic: 'AL fah'     },
  { letter: 'B', word: 'Bravo',    phonetic: 'BRAH voh'   },
  { letter: 'C', word: 'Charlie',  phonetic: 'CHAR lee'   },
  { letter: 'D', word: 'Delta',    phonetic: 'DELL tah'   },
  { letter: 'E', word: 'Echo',     phonetic: 'EKK oh'     },
  { letter: 'F', word: 'Foxtrot',  phonetic: 'FOKS trot'  },
  { letter: 'G', word: 'Golf',     phonetic: 'GOLF'       },
  { letter: 'H', word: 'Hotel',    phonetic: 'hoh TEL'    },
  { letter: 'I', word: 'India',    phonetic: 'IN dee ah'  },
  { letter: 'J', word: 'Juliet',   phonetic: 'JEW lee ETT'},
  { letter: 'K', word: 'Kilo',     phonetic: 'KEY loh'    },
  { letter: 'L', word: 'Lima',     phonetic: 'LEE mah'    },
  { letter: 'M', word: 'Mike',     phonetic: 'MIKE'       },
];
