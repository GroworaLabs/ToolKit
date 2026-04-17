const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
    {children}
  </h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>{children}</p>
);

const NATO_FULL = [
  ['A','Alpha','AL fah'],['B','Bravo','BRAH voh'],['C','Charlie','CHAR lee'],
  ['D','Delta','DELL tah'],['E','Echo','EKK oh'],['F','Foxtrot','FOKS trot'],
  ['G','Golf','GOLF'],['H','Hotel','hoh TEL'],['I','India','IN dee ah'],
  ['J','Juliet','JEW lee ETT'],['K','Kilo','KEY loh'],['L','Lima','LEE mah'],
  ['M','Mike','MIKE'],['N','November','no VEM ber'],['O','Oscar','OSS cah'],
  ['P','Papa','pah PAH'],['Q','Quebec','keh BECK'],['R','Romeo','ROH mee oh'],
  ['S','Sierra','see AIR ah'],['T','Tango','TANG go'],['U','Uniform','YOU nee form'],
  ['V','Victor','VIK tah'],['W','Whiskey','WISS key'],['X','X-ray','ECKS ray'],
  ['Y','Yankee','YANG key'],['Z','Zulu','ZOO loo'],
];

export default function NatoAlphabetContent() {
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is NATO alphabet ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>What is the NATO phonetic alphabet and why was it created?</H2>
        <P>
          The NATO phonetic alphabet — formally called the International Radiotelephony Spelling Alphabet —
          is a system in which each of the 26 letters of the Latin alphabet is assigned a specific code word.
          Rather than saying "B as in Boy" or any other improvised word that might be misheard, every
          communicator worldwide uses the same agreed-upon words: Alpha, Bravo, Charlie, Delta, and so on
          through Zulu. This standardization eliminates ambiguity entirely across languages, accents,
          and noise levels.
        </P>
        <P>
          The system was developed in the early 1950s by the International Civil Aviation Organization,
          which needed a single unambiguous spelling alphabet for global air traffic control. The ICAO
          conducted extensive testing by broadcasting candidate code words to speakers of different first
          languages and measuring which words were most reliably understood across language groups. Words
          that sounded too similar to each other in any major language were replaced. The final set was
          adopted in 1956 and subsequently adopted by NATO, the International Telecommunication Union,
          and the International Maritime Organization. It has remained unchanged since — making it one
          of the most stable international technical standards in existence.
        </P>
        <P>
          The fundamental problem the phonetic alphabet solves is letter confusion over imperfect audio.
          Radio communication, telephone calls, and intercoms introduce noise, distortion, and compression
          artifacts. In these conditions, many letters sound nearly identical: B and D, F and S, M and N,
          P and B, S and F, T and D. Mishearing a single letter in an aircraft callsign, a runway
          designation, a medication name, or an account number can have consequences ranging from
          inconvenient to catastrophic. By replacing each letter with a phonetically distinct, multi-syllable
          word, the phonetic alphabet makes single-letter errors essentially impossible even under poor
          audio conditions.
        </P>
      </section>

      {/* ── How to use ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>How to use the NATO alphabet converter</H2>
        <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            {
              n: '1',
              title: 'Type or paste your text',
              desc: 'Enter any text into the input field. Letters are converted to their NATO code words. Digits use the modified aviation pronunciation (3 is Tree, 4 is Fower, 5 is Fife, 9 is Niner). Spaces between words produce a visible word break in the output. Characters with no phonetic equivalent are passed through unchanged.',
            },
            {
              n: '2',
              title: 'Choose card or inline view',
              desc: 'The tool offers two display modes. Card view shows each character as a large individual card — useful for reading aloud during a call where you need to clearly see each word. Inline view shows the full phonetic string in a compact row — useful for copying into a chat message or email.',
            },
            {
              n: '3',
              title: 'Read each word aloud',
              desc: 'When spelling something over the phone or radio, say each NATO word clearly and at a comfortable pace. For names, a common convention is to say the letter first, then the word: "B as in Bravo, R as in Romeo." This helps listeners who may be unfamiliar with the phonetic alphabet catch up without getting lost.',
            },
            {
              n: '4',
              title: 'Copy the phonetic string',
              desc: 'Click Copy to send the full NATO spelling to your clipboard. Paste it into a chat, a ticket, or an email to communicate a difficult string — such as a license key, account number, or unusual name — in a format the recipient can read back letter by letter without ambiguity.',
            },
          ].map(({ n, title, desc }) => (
            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                <P>{desc}</P>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Full reference table ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Complete NATO alphabet reference with pronunciation</H2>
        <P>
          The table below shows all 26 NATO code words with ICAO-recommended pronunciation. Stressed
          syllables are shown in uppercase. Note that Lima is pronounced LEE mah (like the city in Peru,
          not the bean), and Papa is pah PAH with roughly equal stress on both syllables.
        </P>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Letter', 'Code word', 'Pronunciation'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {NATO_FULL.map(([letter, word, pron], i) => (
                <tr key={letter} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '9px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: 15, color: 'var(--green)' }}>{letter}</td>
                  <td style={{ padding: '9px 14px', fontWeight: 600, color: 'var(--ink)' }}>{word}</td>
                  <td style={{ padding: '9px 14px', color: 'var(--ink-3)', fontStyle: 'italic' }}>{pron}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>NATO numbers and modified pronunciations</H2>
        <P>
          Numbers in the ICAO system use modified pronunciations specifically designed to avoid confusion
          over radio. Standard English number names share sounds with each other and with common words,
          causing misunderstandings in noisy audio conditions. The modified forms add distinctive sounds
          that make each digit uniquely identifiable.
        </P>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Digit', 'Standard', 'Aviation pronunciation', 'Why it changed'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['3', 'Three', 'Tree',   '"Three" sounds like the letter T in some accents'],
                ['4', 'Four',  'Fower',  '"Four" sounds like "fore" and other English words'],
                ['5', 'Five',  'Fife',   'Extra consonant makes it more distinct from "nine"'],
                ['9', 'Nine',  'Niner',  'Extra syllable distinguishes from German "nein" (no)'],
                ['0', 'Zero',  'Zero',   'Unchanged — already distinct enough'],
              ].map(([digit, std, av, why], i) => (
                <tr key={digit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--green)', fontSize: 15 }}>{digit}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{std}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{av}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <P>
          Modified number pronunciations are primarily used in aviation and formal military communication.
          In civilian contexts — customer service calls, IT support, everyday phone conversations — standard
          number names are perfectly adequate. Reserve the modified pronunciations for high-stakes radio
          communication where digit-level accuracy is critical.
        </P>
      </section>

      {/* ── Use cases ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Where the NATO alphabet is used in everyday life</H2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            {
              title: 'Customer service and call centers',
              body: 'Call center staff in banking, insurance, and telecommunications are typically trained in the NATO phonetic alphabet to reduce transcription errors when capturing names, email addresses, and reference numbers over the phone. When a customer says their email is "b-j-a-t-k-o at gmail dot com," the representative may mishear B as D or J as K. Asking "could you spell that phonetically?" and receiving "Bravo, Juliet, Alpha, Tango, Kilo, Oscar" eliminates all ambiguity. This is why the NATO alphabet is standard training material for almost every customer-facing phone role.',
            },
            {
              title: 'IT support and password communication',
              body: 'IT professionals regularly need to communicate complex strings over the phone: temporary passwords, VPN keys, license codes, server hostnames, and network credentials. A password like "xK7#mP2!" is nearly impossible to convey reliably over voice without a phonetic alphabet. Spelling it as "X-ray, Kilo, Seven, hash, Mike, Papa, Two, exclamation" removes all uncertainty and eliminates the need to repeat the string multiple times due to mishearing.',
            },
            {
              title: 'Aviation air traffic control',
              body: 'Aviation is the most rigorous use of the phonetic alphabet. Aircraft callsigns, gate numbers, runway designations, taxiway names, and waypoint identifiers are all communicated phonetically. A private Cessna registered N12345 is identified as November One Two Three Four Five. Runway 27L is Two Seven Left. Navigation waypoints are five-letter codes like ALPHA BRAVO CHARLIE that are read letter by letter using NATO words. The stakes — aircraft separation and human life — make phonetic clarity a non-negotiable professional standard.',
            },
            {
              title: 'Emergency services and dispatch',
              body: 'Police, fire, and medical dispatchers use the phonetic alphabet to communicate vehicle license plates, suspect names, street names, and address suffixes without ambiguity. In the United Kingdom, most emergency services now use the NATO alphabet for interoperability with other agencies and with international responders. During multi-agency emergency responses where teams from different organizations communicate on shared radio channels, a common phonetic standard prevents miscommunication that could delay critical actions.',
            },
            {
              title: 'Medical communication',
              body: 'In healthcare, the consequences of miscommunication can be severe. Medical personnel use phonetic spelling to confirm drug names, patient identifiers, allergy information, and dosage instructions. Medication names in particular are notorious for sounding similar: the names Celebrex, Cerebyx, and Celexa have all been confused with each other in clinical settings, with potentially dangerous results. Spelling a drug name phonetically before dispensing is a recognized patient safety practice in high-risk environments such as emergency departments and intensive care units.',
            },
          ].map(({ title, body }) => (
            <div key={title} style={{ padding: '18px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
              <P>{body}</P>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tips ── */}
      <section style={{ marginBottom: 48 }}>
        <H2>Tips for learning and using the NATO alphabet</H2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {[
            { tip: 'Learn in groups of six', desc: 'Alpha through Foxtrot, Golf through Lima, Mike through Sierra, Tango through Zulu. The rhythm of six is natural and the groups align with memory chunking principles.' },
            { tip: 'Say the letter first', desc: 'When spelling for someone unfamiliar with the alphabet, say "B as in Bravo" rather than just "Bravo." The letter-first format ensures comprehension even if the listener does not know the NATO words.' },
            { tip: 'Watch out for Lima', desc: 'Lima is pronounced LEE mah, not LYE mah. Mispronouncing it to rhyme with the bean causes confusion. The correct pronunciation rhymes with "see-ya."' },
            { tip: 'Practice with your name', desc: 'Type your full name into the tool and read the NATO words aloud repeatedly. Personal names are the most common things you will need to spell phonetically, so starting there builds immediately useful recall.' },
            { tip: 'Use it for passwords', desc: 'When communicating a password or key over voice, spell it phonetically. This prevents transcription errors caused by mishearing and removes the need to repeat the string multiple times.' },
            { tip: 'The alphabet is universal', desc: 'The same 26 words are used in aviation, maritime, military, and civilian contexts worldwide. Learning it once gives you a skill that works in every English-language voice communication context.' },
          ].map(({ tip, desc }) => (
            <div key={tip} style={{ padding: '14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)', marginBottom: 6 }}>{tip}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.55 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
