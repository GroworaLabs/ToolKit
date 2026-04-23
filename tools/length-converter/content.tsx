export default function LengthConverterContent() {
  const h2   = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p    = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3   = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── The metre and the SI system ───────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>The metre — the base unit of length in the SI system</h2>
        <p style={p}>
          The <strong style={{ color: 'var(--ink)' }}>metre (m)</strong> is the SI base unit of length, and one of the most precisely defined units in all of science. Since 2019, one metre is officially defined as the distance light travels in a vacuum in exactly <strong style={{ color: 'var(--ink)' }}>1/299,792,458 of a second</strong>. This definition ties the metre to the speed of light — a universal physical constant — making it reproducible anywhere in the universe without reference to any physical artefact. Before 2019, the metre was defined by a platinum-iridium bar stored at the International Bureau of Weights and Measures in France.
        </p>
        <p style={p}>
          SI prefixes make the metre scale across 30 orders of magnitude, giving scientists and engineers the right unit for any context. A <strong style={{ color: 'var(--ink)' }}>kilometre (km)</strong> is 1,000 metres — the standard for road distances in most of the world. A <strong style={{ color: 'var(--ink)' }}>centimetre (cm)</strong> is 0.01 metres — widely used for body measurements, clothing sizes, and screen dimensions. A <strong style={{ color: 'var(--ink)' }}>millimetre (mm)</strong> is 0.001 metres — the precision unit for engineering drawings, rainfall gauges, and medical imaging.
        </p>
        <p style={p}>
          Going smaller: a <strong style={{ color: 'var(--ink)' }}>micrometre (µm)</strong> is 10⁻⁶ metres, used in precision manufacturing and biology (human hair is 50–100 µm; bacteria are 1–10 µm). A <strong style={{ color: 'var(--ink)' }}>nanometre (nm)</strong> is 10⁻⁹ metres, used in semiconductor technology — modern transistors are measured in single-digit nanometres. An <strong style={{ color: 'var(--ink)' }}>angstrom (Å)</strong> equals 10⁻¹⁰ metres and appears in atomic physics and X-ray crystallography, where atomic bond lengths are 1–3 Å.
        </p>
        <p style={p}>
          The metric system itself traces back to the French Revolution of 1790, when the Académie des Sciences was tasked with creating a rational, universal system of measurement. The original metre was defined as one ten-millionth of the distance from the North Pole to the equator along the Paris meridian — a definition that connected the unit to the Earth's geometry. While that definition has since been replaced, it established the metre's role as a truly international standard.
        </p>
      </section>

      {/* ── Imperial units ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Inches, feet, yards, and miles — the Imperial and US Customary system</h2>
        <p style={p}>
          The United States, along with Liberia and Myanmar, continues to use US Customary units for everyday life — a system that evolved from British Imperial measures. Despite widespread perception to the contrary, all Imperial units are now defined precisely in terms of the metre, giving them the same reproducibility as SI units.
        </p>

        <h3 style={h3}>The inch</h3>
        <p style={p}>
          One <strong style={{ color: 'var(--ink)' }}>inch (in)</strong> is defined as exactly <code style={code}>2.54 cm</code> since the international yard and pound agreement of 1959. The inch is ubiquitous in the US: monitor sizes are quoted in diagonal inches (a "27-inch monitor" has a 27-inch diagonal), lumber dimensions use inches, and rainfall is measured in inches. In the UK, the inch survives mainly for TV screen sizes and waist measurements.
        </p>

        <h3 style={h3}>The foot</h3>
        <p style={p}>
          One <strong style={{ color: 'var(--ink)' }}>foot (ft)</strong> equals exactly 12 inches = <code style={code}>30.48 cm</code>. Height in the US and UK is typically expressed in feet and inches: a 5′10″ person is <code style={code}>5 × 30.48 + 10 × 2.54 = 177.8 cm</code>. Aviation universally uses feet for altitude — a cruising altitude of "35,000 feet" equals 10,668 metres. Ceiling heights, room dimensions, and swimming pool depths are commonly expressed in feet in the US.
        </p>

        <h3 style={h3}>The yard</h3>
        <p style={p}>
          One <strong style={{ color: 'var(--ink)' }}>yard (yd)</strong> equals 3 feet = <code style={code}>0.9144 m</code>. The yard is used in American football (the field is 100 yards end-to-end, 120 yards including end zones), golf (hole distances are in yards), and fabric/textile measurements. In construction, concrete volumes are quoted in cubic yards ("yards" of concrete). One mile is exactly 1,760 yards.
        </p>

        <h3 style={h3}>The mile</h3>
        <p style={p}>
          One <strong style={{ color: 'var(--ink)' }}>statute mile (mi)</strong> equals exactly <code style={code}>1,609.344 m</code> = 5,280 feet = 1,760 yards. The word "mile" descends from the Latin <em>mille passuum</em> ("a thousand paces," where one Roman pace was two steps). Road distances in the US and UK are measured in miles; virtually every other country uses kilometres. To convert kilometres to miles, multiply by 0.621371. To convert miles to kilometres, multiply by 1.60934.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Unit', 'Symbol', 'Exact in metres', 'Common use'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Inch',           'in',  '0.0254 m',    'Screen sizes, rain gauges, pipe diameters'],
                ['Foot',           'ft',  '0.3048 m',    'Height, ceiling height, aviation altitude'],
                ['Yard',           'yd',  '0.9144 m',    'Football field, golf, fabric'],
                ['Statute mile',   'mi',  '1,609.344 m', 'Road distances (US/UK), running races'],
                ['Nautical mile',  'nmi', '1,852 m',     'Aviation and maritime navigation'],
              ].map(([unit, sym, metres, use], i) => (
                <tr key={unit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{unit}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{sym}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{metres}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Nautical mile ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>The nautical mile — navigation and Earth's geometry</h2>
        <p style={p}>
          One <strong style={{ color: 'var(--ink)' }}>nautical mile (nmi)</strong> is defined as exactly <code style={code}>1,852 metres</code>, which corresponds to one arcminute (1/60 of a degree) of latitude along a meridian. This elegant definition ties the nautical mile directly to Earth's geometry: moving one nautical mile north or south changes your latitude by precisely one arcminute. This property makes the nautical mile intrinsically useful for celestial navigation and charting.
        </p>
        <p style={p}>
          Speed at sea and in aviation is measured in <strong style={{ color: 'var(--ink)' }}>knots</strong> — one knot equals one nautical mile per hour. A commercial jet typically cruises at 480–520 knots (890–960 km/h). Container ships travel at 14–25 knots; high-speed ferries at 30–40 knots. The knot is the only unit in common use that is itself defined as a compound unit (a speed, not a pure distance).
        </p>
        <p style={p}>
          The nautical mile is approximately 15% longer than the statute mile (1,852 m vs 1,609 m). A 100-nautical-mile offshore sailing race covers about 185 km, while a 100-statute-mile road race covers 161 km. This difference is significant enough to cause confusion when mixing navigation and road-distance contexts, particularly in coastal regions where both systems are used.
        </p>
      </section>

      {/* ── Astronomical distances ────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Astronomical distances — AU, light-years, and parsecs</h2>
        <p style={p}>
          Beyond the metre's SI multiples, astronomers use specialised units that make interstellar distances manageable. These units are not part of the SI but are accepted for use alongside it.
        </p>

        <h3 style={h3}>Astronomical Unit (AU)</h3>
        <p style={p}>
          One <strong style={{ color: 'var(--ink)' }}>astronomical unit (AU)</strong> is exactly <code style={code}>149,597,870,700 m</code> — approximately the mean distance from the Earth to the Sun. The AU is used within the solar system: Mars is about 1.52 AU from the Sun; Jupiter is 5.2 AU; the outer edge of the Oort Cloud (the Sun's gravitational influence) extends to roughly 100,000 AU.
        </p>

        <h3 style={h3}>Light-year</h3>
        <p style={p}>
          A <strong style={{ color: 'var(--ink)' }}>light-year (ly)</strong> is the distance light travels in one year: approximately <code style={code}>9.461 × 10¹⁵ m</code> (about 9.46 petametres or 63,241 AU). It is used for interstellar distances. The nearest star system, Alpha Centauri, is 4.37 light-years away. The Andromeda galaxy is 2.537 million light-years away. The observable universe extends approximately 46.5 billion light-years in every direction.
        </p>

        <h3 style={h3}>Parsec</h3>
        <p style={p}>
          A <strong style={{ color: 'var(--ink)' }}>parsec (pc)</strong> equals approximately 3.086 × 10¹⁶ m (3.26 light-years). One parsec is the distance at which one AU subtends an angle of one arcsecond — making it naturally tied to the parallax method used to measure stellar distances. Professional astronomers prefer parsecs over light-years because parsec-based distances come directly from measurement; light-years require an additional conversion step.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Unit', 'In metres', 'In km', 'Example distance'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1 AU',        '1.496 × 10¹¹ m', '~150,000,000 km',      'Earth–Sun distance'],
                ['1 light-year','9.461 × 10¹⁵ m', '~9,461,000,000,000 km','Nearest stars'],
                ['1 parsec',    '3.086 × 10¹⁶ m', '~30,860,000,000,000 km','Stellar astronomy'],
                ['1 kiloparsec','3.086 × 10¹⁹ m', '~3.09 × 10¹⁶ km',      'Galactic structure'],
              ].map(([unit, m, km, ex], i) => (
                <tr key={unit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>{unit}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{m}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{km}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Common conversions ────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Most useful length conversions — quick reference</h2>
        <p style={p}>
          These conversions come up constantly in travel, sport, construction, and everyday life. The exact factors below are what our converter uses — no rounding is applied until the display step.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['From', 'To', 'Multiply by', 'Practical example'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['km',    'miles',  '0.621371', '10 km = 6.21 mi (common running race)'],
                ['miles', 'km',     '1.609344', '26.2 mi = 42.195 km (marathon)'],
                ['m',     'feet',   '3.280840', '1.8 m = 5 ft 10.9 in (average male height)'],
                ['feet',  'm',      '0.304800', '6 ft = 1.829 m'],
                ['cm',    'inches', '0.393701', '30 cm = 11.81 in'],
                ['inches','cm',     '2.540000', '12 in (1 foot) = 30.48 cm'],
                ['nmi',   'km',     '1.852000', '60 nmi = 111.12 km (1° latitude)'],
                ['yards', 'metres', '0.914400', '100 yd = 91.44 m (football field)'],
              ].map(([from, to, mult, ex], i) => (
                <tr key={from + to} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{from}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{to}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>×{mult}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Precision in engineering ──────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Length precision in engineering and manufacturing</h2>
        <p style={p}>
          The choice of length unit in engineering is not arbitrary — it reflects the precision required by the application. In mechanical engineering, drawings use millimetres for general dimensions and micrometres for tolerances. A shaft might be specified as <code style={code}>50.000 ± 0.013 mm</code> (a tolerance of 13 µm, typical for a precision fit). CNC machines routinely hold tolerances of 1–10 µm.
        </p>
        <p style={p}>
          In semiconductor manufacturing, feature sizes are measured in nanometres. Intel's "7nm" process (actually closer to 5–7 nm by conventional measurement) places billions of transistors on a chip the size of a fingernail. The gate length of a modern MOSFET transistor is approximately 5–10 nm — about 50 silicon atoms wide. Extreme ultraviolet (EUV) lithography uses light with a wavelength of 13.5 nm to pattern these features.
        </p>
        <p style={p}>
          In civil engineering and surveying, GPS receivers can achieve horizontal accuracy of 1–3 cm with standard techniques and sub-centimetre accuracy with differential GPS (DGPS). Road construction typically specifies tolerances of ±3 mm for pavement thickness and ±5 mm for elevation. Bridge girder fabrication requires tolerances in the range of 1–3 mm across spans of tens of metres.
        </p>
        <p style={p}>
          Everyday measuring tools illustrate the same principle: a standard ruler resolves to 1 mm; a vernier calliper to 0.1 mm (100 µm); a micrometer to 0.01 mm (10 µm); a laser interferometer to nanometres or better. The unit you choose for a measurement should match the precision of your measurement device and the tolerance requirements of your application.
        </p>
      </section>

      {/* ── Human-scale reference ─────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Human-scale length references — grounding abstract numbers</h2>
        <p style={p}>
          Abstract unit conversions become intuitive when anchored to familiar scales. These reference points help build a mental model for length across many orders of magnitude:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Reference', 'Approximate length', 'Notes'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Width of a human hair',     '50–100 µm',    'Varies by person and hair colour'],
                ['Thickness of a credit card','0.76 mm',      'ISO/IEC 7810 standard'],
                ['Standard A4 paper width',   '210 mm',       '8.27 inches'],
                ['Average adult male height', '1.75 m',       'US average; ~5 ft 9 in'],
                ['Standard door height',      '2.03–2.13 m',  '6 ft 8 in – 7 ft'],
                ['Olympic swimming pool',     '50 m',         'FINA standard'],
                ['Football field (NFL)',       '109.7 m',      '120 yards including end zones'],
                ['Runway at a major airport', '3,000–4,500 m','Varies by airport category'],
                ['Mount Everest',             '8,848.86 m',   'Height above sea level (2020 survey)'],
                ['Diameter of Earth',         '12,742 km',    'Mean diameter'],
                ['Earth–Moon distance',       '384,400 km',   'Mean distance'],
                ['Earth–Sun distance',        '149.6 million km','1 AU'],
              ].map(([ref, len, note], i) => (
                <tr key={ref} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--ink)', fontWeight: 600 }}>{ref}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{len}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
