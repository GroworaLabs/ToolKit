import { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'Who invented Morse code and why was it created?',
    a: `Morse code was developed in the early 1840s by Samuel Morse, an American artist and inventor, together with his assistant Alfred Vail. The system was designed for use with the electric telegraph — a technology that could send electrical pulses over long wire lines. Before Morse code, there was no practical way to encode the letters of the alphabet as distinct electrical signals. Morse and Vail's solution was elegantly simple: assign each letter a unique sequence of short pulses called dots and long pulses called dashes. Letters that appear most frequently in English — E, T, A, O — received the shortest codes to speed up transmission, while rare letters like Q and Z received longer ones. This frequency-based assignment was one of the first examples of variable-length encoding, the same principle that underlies modern compression algorithms. The first official long-distance telegraph message in Morse code was transmitted on May 24, 1844 from Washington D.C. to Baltimore, Maryland.`,
  },
  {
    q: 'How does Morse code encoding work — what are dots and dashes?',
    a: `Morse code encodes each letter and digit as a specific sequence of two symbols: a short signal called a dot, written as a period, and a long signal called a dash, written as a hyphen. The duration of a dot is the base unit of time; a dash is three times the length of a dot. The space between elements within a character is one dot-length. The space between separate characters within a word is three dot-lengths. The space between words is seven dot-lengths. In written Morse, spaces within a character are implicit, characters are separated by a single space, and words are separated by a forward slash with spaces around it. For example, the letter H is four dots, the letter E is one dot, and the letter O is three dashes. The famous SOS distress signal is three dots, three dashes, three dots — with no inter-character spacing it is treated as one continuous symbol rather than three separate letters.`,
  },
  {
    q: 'What characters are supported by the Morse code translator?',
    a: `The standard International Morse code defines codes for all 26 letters of the Latin alphabet, digits 0 through 9, and a set of punctuation marks. This tool supports all of these: letters, all ten digits, and common punctuation including period, comma, question mark, apostrophe, exclamation mark, forward slash, parentheses, ampersand, colon, semicolon, equals sign, plus, hyphen, underscore, double quote, dollar sign, and the at sign. Characters not in the Morse alphabet — accented letters, Cyrillic, Arabic, CJK characters, and most symbols — are represented as a question mark in the output to indicate they have no standard Morse equivalent. The space character is encoded as a forward slash to separate words. If you see many question marks in your output, it means your input contains characters that do not have standard Morse code assignments.`,
  },
  {
    q: 'How do I decode Morse code back to text?',
    a: `To decode Morse code with this tool, switch the direction toggle to Morse to Text and paste your Morse code into the input. The decoder expects a specific format: individual Morse code elements for one letter separated by a single space, and words separated by a space-slash-space. For example, four dots, space, one dot, space-slash-space, two dots decodes to "HI". This is the standard written Morse format. Common mistakes when manually entering Morse for decoding include using incorrect dash characters instead of a standard hyphen, forgetting spaces between letters, or using the wrong word separator. If you receive Morse code from another source, verify it follows the space-separated format before pasting. Unknown codes that do not match any letter in the table are shown as a question mark in the decoded output.`,
  },
  {
    q: 'Is Morse code still used today?',
    a: `Yes, Morse code remains in active use in several contexts despite being over 180 years old. Amateur radio operators worldwide still use Morse code — known in that community as CW, short for continuous wave — and proficiency in Morse is a point of pride and technical skill. Many national amateur radio licensing bodies still include Morse code in their exams. Aviation uses Morse code identifiers for radio navigation beacons — the three-letter identifiers for VORs and NDBs are transmitted in Morse at regular intervals so pilots can confirm they have tuned the correct beacon. Military units in some countries retain Morse as a fallback communication method that works under conditions where voice communication is compromised. Accessibility technology uses Morse as an input method for people with motor disabilities who can only operate a single switch, with each dot and dash triggering a letter.`,
  },
  {
    q: 'What is the difference between American Morse and International Morse?',
    a: `There are two major historical variants of Morse code. American Morse code, also called Railroad Morse, was the original system developed by Morse and Vail for landline telegraph in the United States. It used a third signal type: a medium-length pause within certain letters, in addition to dots and dashes, which made it more efficient for experienced operators but harder to learn. International Morse code, also called Continental Morse, was standardized in the 1850s at international telegraph conferences to facilitate communication across borders. It eliminated the pause-within-character concept, used only dots and dashes, and became the global standard. Today, "Morse code" universally refers to International Morse code as specified by ITU-R M.1677-1. American Morse is no longer in practical use except as a historical curiosity. This tool implements International Morse code.`,
  },
  {
    q: 'How is Morse code used in emergency situations?',
    a: `The most famous emergency use of Morse code is the SOS signal: three dots, three dashes, three dots. This sequence was standardized at the 1906 International Radio Telegraphic Convention as the universal maritime distress signal because it is easy to remember, simple to transmit even by an untrained person, and distinct enough to be recognized even through noise and interference. SOS can be transmitted with any device capable of producing a signal: a radio, a flashlight, a mirror, a whistle, or even tapping on a surface. The Titanic famously used both the older CQD distress signal and the newer SOS in its distress transmissions in 1912. Beyond SOS, Morse code allows people to communicate without voice in situations where speaking is dangerous or impossible — for example, hostages have communicated their location by blinking in Morse during televised broadcasts.`,
  },
  {
    q: 'What is transmission speed measured in and how fast can Morse be sent?',
    a: `Morse code transmission speed is measured in words per minute, calibrated using the five-letter word PARIS as the standard test word. PARIS takes exactly 50 dot-lengths to transmit, making it a consistent benchmark. A trained beginner can copy Morse at about 5 words per minute. Comfortable conversational speed is typically 13 to 20 words per minute. Proficient amateur operators work at 20 to 30 words per minute. The world record for hand-keying Morse code is over 60 words per minute, achieved by highly experienced operators using a special paddle key that generates dots and dashes semi-automatically. Machine-generated Morse has no practical speed limit — computers can transmit arbitrarily fast. In practice, shortwave propagation conditions set the upper limit of reliable machine-to-machine communication.`,
  },
  {
    q: 'Can Morse code be used as an accessibility input method?',
    a: `Yes. Morse code is a recognized accessibility input method for people who have limited motor control and can only operate a single switch or button. Devices called single-switch Morse keyboards allow users to input text by tapping a button — one tap for a dot, holding for a dash, a pause to confirm a letter, a longer pause for a space. This makes full text input possible for people with conditions such as ALS, cerebral palsy, or severe arthritis who cannot use a conventional keyboard. Google's Gboard keyboard for Android includes a Morse code input mode for exactly this purpose. Eye-tracking systems can also be configured to accept Morse input via intentional blinks. The historical resonance of a 180-year-old encoding system finding new life in accessibility technology is a remarkable example of technology longevity.`,
  },
];

export const morseReference = [
  { char: 'A', code: '.-'   }, { char: 'B', code: '-...' }, { char: 'C', code: '-.-.' },
  { char: 'D', code: '-..'  }, { char: 'E', code: '.'    }, { char: 'F', code: '..-.' },
  { char: 'G', code: '--.'  }, { char: 'H', code: '....' }, { char: 'I', code: '..'   },
  { char: 'J', code: '.---' }, { char: 'K', code: '-.-'  }, { char: 'L', code: '.-..' },
  { char: 'M', code: '--'   },
];
