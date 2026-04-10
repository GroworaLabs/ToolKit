export default function PaceConverterContent() {
  const h2 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── Pace vs speed ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Pace vs speed — two ways to describe how fast you run</h2>
        <p style={p}>
          Running performance can be described using two mathematically inverse quantities: <strong style={{ color: 'var(--ink)' }}>pace</strong> and <strong style={{ color: 'var(--ink)' }}>speed</strong>. Speed is the distance covered per unit of time — kilometres per hour (km/h) or miles per hour (mph). Pace is the time taken to cover a unit of distance — minutes per kilometre (min/km) or minutes per mile (min/mile). A faster runner has a higher speed but a lower (smaller) pace number.
        </p>
        <p style={p}>
          The conversion between them is straightforward: <strong style={{ color: 'var(--ink)' }}>Speed (km/h) = 60 ÷ Pace (min/km)</strong>. Running at a 5:00 min/km pace means covering 1 km every 5 minutes, which is 60 ÷ 5 = 12 km/h. Conversely, a treadmill set to 10 km/h corresponds to a pace of 60 ÷ 10 = 6:00 min/km.
        </p>
        <p style={p}>
          Runners typically prefer pace over speed because it directly answers the question "how long will this distance take?" at a glance. Coaches, GPS watches, race results, and training plans overwhelmingly use pace. Treadmills and cycling, by contrast, display speed — a common source of confusion when comparing workout metrics between disciplines.
        </p>
      </section>

      {/* ── Pace at common race distances ─────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Pace targets for standard race distances</h2>
        <p style={p}>
          Knowing the pace required to hit a target finish time at each standard race distance is essential for race planning. The table below shows required pace in min/km and min/mile for common finish time goals:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Race', 'Distance', 'Finish time', 'Required min/km', 'Required min/mile'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['5K',         '5 km',       'Sub 20:00',  '< 4:00', '< 6:26'],
                ['5K',         '5 km',       'Sub 25:00',  '< 5:00', '< 8:03'],
                ['5K',         '5 km',       'Sub 30:00',  '< 6:00', '< 9:39'],
                ['10K',        '10 km',      'Sub 40:00',  '< 4:00', '< 6:26'],
                ['10K',        '10 km',      'Sub 50:00',  '< 5:00', '< 8:03'],
                ['10K',        '10 km',      'Sub 60:00',  '< 6:00', '< 9:39'],
                ['Half marathon', '21.097 km', 'Sub 1:45', '< 4:58', '< 7:59'],
                ['Half marathon', '21.097 km', 'Sub 2:00', '< 5:41', '< 9:09'],
                ['Marathon',   '42.195 km',  'Sub 3:00',   '< 4:15', '< 6:50'],
                ['Marathon',   '42.195 km',  'Sub 3:30',   '< 4:58', '< 7:59'],
                ['Marathon',   '42.195 km',  'Sub 4:00',   '< 5:41', '< 9:09'],
              ].map(([race, dist, time, km, mile], i) => (
                <tr key={`${race}-${time}`} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{race}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{dist}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{time}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{km}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{mile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          These are minimum average paces required — in practice, runners have to maintain those paces for the entire race, including the second half when fatigue accumulates. Most training plans recommend running long runs at 60–90 seconds per km slower than goal race pace to build aerobic base without excessive recovery cost.
        </p>
      </section>

      {/* ── Training zones by pace ────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Training zones — how pace relates to effort and heart rate</h2>
        <p style={p}>
          Structured running training divides effort into zones, each with a purpose. The zones are defined by heart rate percentage, pace relative to threshold, or perceived exertion. Understanding where a given pace falls in your personal zone structure helps you train effectively and avoid overtraining:
        </p>

        <h3 style={h3}>Zone 1–2: Easy / recovery running</h3>
        <p style={p}>
          Easy running at conversational pace — you can speak in full sentences without breathlessness. For most runners, this corresponds to 65–75% of maximum heart rate. Most coaches recommend 70–80% of total training volume be in this zone. It builds aerobic base, improves fat metabolism, and allows recovery between harder sessions. A typical easy pace is 60–90+ seconds per km slower than 5K race pace.
        </p>

        <h3 style={h3}>Zone 3: Marathon pace / aerobic threshold</h3>
        <p style={p}>
          Comfortably hard effort — you can speak in short phrases but conversation is disrupted. Approximately 80–87% max HR. This zone is controversial in modern training literature: some coaches call it "junk miles" because it's too hard to be truly restorative and not hard enough to produce significant training adaptations. Marathon pace falls in this zone for most recreational runners.
        </p>

        <h3 style={h3}>Zone 4: Lactate threshold / tempo</h3>
        <p style={p}>
          Lactate threshold (LT) pace is roughly 10K to half-marathon race pace — an effort you could sustain for about 60 minutes at maximum effort. At this pace, lactate production just matches lactate clearance. Training here raises the lactate threshold, allowing you to sustain faster paces aerobically. Tempo runs of 20–40 minutes at this effort are a staple of competitive training programs.
        </p>

        <h3 style={h3}>Zone 5: VO2max intervals</h3>
        <p style={p}>
          Roughly 3K to 5K race pace — very hard effort sustainable for only a few minutes. Training here stimulates maximum oxygen uptake (VO2max) improvements. Typically done in intervals: 800m to 1600m repeats with equal or slightly shorter recovery. This zone requires significant recovery time and should be limited to 1–2 sessions per week for recreational runners.
        </p>
      </section>

      {/* ── Grade-adjusted pace ───────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Grade-adjusted pace — accounting for hills and elevation</h2>
        <p style={p}>
          Running uphill at the same heart rate as flat ground produces a slower pace — the extra work of climbing means you're expending the same effort for less horizontal distance. <strong style={{ color: 'var(--ink)' }}>Grade-adjusted pace (GAP)</strong> converts your actual hill pace to an equivalent flat-ground pace that represents the same physiological effort.
        </p>
        <p style={p}>
          The classic rule of thumb is Naismith's Rule: add 1 minute of time for every 10 metres of ascent. More precise modern formulas use the gradient percentage. On a 10% uphill grade, your equivalent flat pace is approximately 1:00–1:30 min/km slower. On a 10% downhill, you're moving faster with less effort — roughly 0:30–0:45 min/km equivalent saving, though very steep descents become harder again due to braking forces on the quadriceps.
        </p>
        <p style={p}>
          Modern GPS watches (Garmin, Polar, Coros) display GAP in real time. This lets trail runners maintain consistent physiological effort regardless of terrain by targeting a GAP rather than an absolute pace. When analysing a hilly run for training purposes, GAP is a more meaningful metric than actual pace — a 6:30 min/km average on a hilly course may represent the same effort as a 5:30 min/km flat run.
        </p>
        <p style={p}>
          For planning multi-sport events or calculating total time for hikes combining running and elevation gain, having accurate time estimates is critical. Our <a href="/tools/time-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Time Converter</a> helps with converting between hours, minutes, and seconds when calculating finish times and segment splits.
        </p>
      </section>

      {/* ── Pace across other sports ──────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Pace in other endurance sports — cycling, swimming, and walking</h2>

        <h3 style={h3}>Cycling speed vs running pace</h3>
        <p style={p}>
          Cyclists use speed (km/h or mph) rather than pace — the inverse convention from running. This means raw numbers aren't comparable: a "fast" runner at 5:00 min/km is moving at 12 km/h, while a "slow" recreational cyclist might average 20–25 km/h. The effort levels can be similar because wind resistance, which scales with the square of velocity, makes cycling harder at higher speeds. A Tour de France stage might be won at 45+ km/h average.
        </p>

        <h3 style={h3}>Swimming pace (per 100m)</h3>
        <p style={p}>
          Swimmers express pace as time per 100 metres in a pool. Competitive swimmers target 1:00–1:15 per 100m (SCM). Open water swimmers target 1:20–1:45 per 100m depending on conditions, wetsuit use, and drafting. For triathlon planning, converting swim pace to total swim time and then integrating with cycle speed and run pace requires consistent unit handling across all three disciplines.
        </p>

        <h3 style={h3}>Walking and hiking pace</h3>
        <p style={p}>
          Average walking pace for adults is 4–5 km/h, or 12–15 min/km. Brisk walking is 6–7 km/h (8:30–10 min/km). Racewalking peaks around 15 km/h (4:00 min/km) — faster than many recreational runners. For hiking with significant elevation gain, pace becomes highly variable; most route planning uses Naismith's Rule or digital mapping tools that calculate expected duration rather than pace per se. Distance conversion between kilometres and miles is essential when comparing international race results; our <a href="/tools/length-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Length Converter</a> handles this instantly.
        </p>
      </section>

    </div>
  );
}
