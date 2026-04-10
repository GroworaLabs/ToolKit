export default function TorqueConverterContent() {
  const h2 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is torque ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>What is torque — the physics of rotational force</h2>
        <p style={p}>
          Torque is the rotational equivalent of linear force. While a linear force pushes or pulls an object in a straight line, torque causes an object to rotate around an axis. It is defined as the product of the applied force and the perpendicular distance from the pivot point to the line of action of the force — this distance is called the <strong style={{ color: 'var(--ink)' }}>moment arm</strong>.
        </p>
        <p style={p}>
          The formula is: <strong style={{ color: 'var(--ink)' }}>τ = F × r</strong>, where τ (tau) is torque, F is the applied force, and r is the moment arm length. This explains the intuitive experience of using a wrench: doubling the length of the wrench handle doubles the torque you can apply with the same hand force. A 0.3-metre wrench with 100 N of force produces 30 N·m of torque. A 0.6-metre breaker bar produces 60 N·m — enough to loosen fasteners that the shorter wrench can't budge.
        </p>
        <p style={p}>
          Torque is a vector quantity — it has both magnitude and direction. The direction is defined by the right-hand rule: if you curl the fingers of your right hand in the direction of rotation, your thumb points in the direction of the torque vector. Clockwise torque is conventionally negative, counterclockwise positive, though in practical fastener work these are simply called "tightening" and "loosening."
        </p>
      </section>

      {/* ── Units of torque ───────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Units of torque — SI, imperial, and legacy metric</h2>
        <p style={p}>
          Torque is measured in units of force multiplied by distance. Different unit systems produce different unit names, all representing the same physical quantity:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Unit', 'Symbol', 'Exact conversion to N·m', 'Common context'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Newton-metre',          'N·m',    '1 N·m',          'SI standard, modern engineering worldwide'],
                ['Foot-pound',            'ft·lb',  '1.35582 N·m',    'US / UK mechanical and automotive specs'],
                ['Inch-pound',            'in·lb',  '0.11298 N·m',    'Small fasteners, electronics assembly'],
                ['Inch-ounce',            'in·oz',  '0.00706 N·m',    'Very small fasteners, precision instruments'],
                ['Kilogram-force metre',  'kgf·m',  '9.80665 N·m',    'Older Japanese/European vehicle manuals'],
                ['Kilogram-force cm',     'kgf·cm', '0.09807 N·m',    'Legacy metric, some Eastern European specs'],
                ['Dyne-centimetre',       'dyn·cm', '0.0000001 N·m',  'CGS system, physics calculations'],
              ].map(([unit, sym, conv, ctx], i) => (
                <tr key={unit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{unit}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{sym}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{conv}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{ctx}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          The most critical conversion to memorise is: <strong style={{ color: 'var(--ink)' }}>1 ft·lb = 1.35582 N·m</strong>, or roughly 1.356. Running the calculation in the other direction: 1 N·m ≈ 0.7376 ft·lb. If you're working from a US service manual listing 80 ft·lb for a wheel nut, that's 80 × 1.356 = 108.5 N·m. Many torque wrenches switch between units, but knowing the mental conversion prevents accidental over- or under-torquing when the wrench is set to the wrong scale.
        </p>
      </section>

      {/* ── Torque in automotive engineering ─────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Torque in automotive engineering — engines, drivetrains, and wheels</h2>

        <h3 style={h3}>Engine torque vs horsepower</h3>
        <p style={p}>
          Engine torque and power are related but distinct. Torque is the twisting force the engine produces at the crankshaft at any given RPM. Power is the rate at which that torque can be delivered — specifically: <code style={code}>Power (kW) = Torque (N·m) × RPM ÷ 9549</code> or in imperial units: <code style={code}>HP = Torque (ft·lb) × RPM ÷ 5252</code>.
        </p>
        <p style={p}>
          This means a torque and power figure for an engine are always linked — there is no independently choosing one without the other. High torque at low RPM characterises diesel engines and is why they excel for towing: they can deliver enormous twisting force before the engine has spun up. High peak power at high RPM characterises naturally aspirated petrol engines used in motorsport. Turbocharged engines attempt to combine both by boosting torque across a broader RPM range.
        </p>

        <h3 style={h3}>The torque curve</h3>
        <p style={p}>
          A dyno (dynamometer) chart plots torque and power against engine RPM. The torque curve typically shows peak torque at moderate RPM, then falls off at higher speeds. The power curve rises steeply and peaks higher in the RPM range — because even as torque decreases, the faster rotation still increases power output until the falloff is too severe to compensate. The peak power RPM is always above the peak torque RPM. For power unit conversions related to engine output, see our <a href="/tools/power-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Power Converter</a>.
        </p>

        <h3 style={h3}>Gear ratios and torque multiplication</h3>
        <p style={p}>
          A transmission's gear ratios multiply engine torque before it reaches the wheels. A first gear ratio of 4:1 means the transmission output shaft rotates once for every four engine crankshaft rotations, but the output torque is four times the engine torque (minus losses). This is why vehicles accelerate most strongly from a standing start in first gear — the mechanical advantage is greatest. Lower gears multiply torque; higher gears multiply speed.
        </p>
      </section>

      {/* ── Torque specs for fasteners ────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Torque specifications for fasteners — why precision matters</h2>
        <p style={p}>
          Torque specifications for threaded fasteners exist because both under-torquing and over-torquing cause failures. A bolt tightened to the correct torque is slightly stretched within its elastic limit — this pre-tension is what keeps the joint clamped and resistant to vibration. Under-torqued bolts can loosen under vibration and thermal cycling. Over-torqued bolts can stretch beyond the elastic limit (yield), permanently elongating and reducing clamping force, or can strip threads entirely.
        </p>

        <h3 style={h3}>Reference torque values for common fasteners</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--ink)', color: '#fff' }}>
                {['Application', 'Typical range (N·m)', 'Typical range (ft·lb)'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Spark plugs (aluminium head)',  '20–30',      '15–22'],
                ['Wheel/lug nuts (passenger car)', '100–130',   '74–96'],
                ['Wheel/lug nuts (SUV/truck)',     '130–200',   '96–148'],
                ['Cylinder head bolts (typical)', '80–120',     '59–89'],
                ['Brake caliper bolts',           '25–50',      '18–37'],
                ['Drive shaft bolts',             '50–80',      '37–59'],
                ['Suspension control arm',        '80–140',     '59–103'],
                ['Bicycle stem bolts',            '4–6',        '3–4.4'],
                ['Bicycle bottom bracket',        '35–50',      '26–37'],
              ].map(([app, nm, ftlb], i) => (
                <tr key={app} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{app}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{nm}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{ftlb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          Always consult the manufacturer's service manual for the exact specification — these ranges are illustrative. Many critical fasteners (cylinder head bolts, connecting rod bolts) use an angle-tightening method instead of a pure torque spec: tighten to an initial torque value, then rotate a specific additional angle (e.g., "90° + 90°"). This angle method is more repeatable because it doesn't depend on thread friction, which varies with lubrication state.
        </p>
      </section>

      {/* ── Torque tools and measurement ─────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Torque tools — wrenches, drivers, and calibration</h2>

        <h3 style={h3}>Click-type torque wrenches</h3>
        <p style={p}>
          The most common torque wrench for automotive work. A spring-loaded mechanism releases with a distinct click when the preset torque is reached. Accuracy per ISO 6789 is typically ±4% of the reading. Important: store click wrenches backed off to their lowest setting — leaving the spring compressed at a high torque setting permanently distorts the spring and reduces accuracy. Have critical wrenches calibrated annually if they see regular use on safety-critical fasteners.
        </p>

        <h3 style={h3}>Beam-type torque wrenches</h3>
        <p style={p}>
          A simple, reliable design: a flexible beam deflects under load, and you read the torque from a scale as the needle deflects. No click mechanism, no spring degradation, no need for calibration. The disadvantage is requiring you to watch the scale while applying torque — impractical in tight spaces. Accuracy is typically ±3–4%. Many professionals keep a beam wrench for verification because it has no moving parts to wear out.
        </p>

        <h3 style={h3}>Digital torque wrenches and adapters</h3>
        <p style={p}>
          Digital torque wrenches use a strain gauge to display current torque on an LCD, alert with a beep/vibration at a preset value, and often log readings for service documentation. Digital torque adapters attach between a standard ratchet and socket to add torque measurement capability to existing tools. These are increasingly used in professional workshops and assembly lines where torque data logging is required for quality control and liability documentation.
        </p>
        <p style={p}>
          For bolt patterns that require tightening in a specific sequence (cylinder heads, flanged joints, wheel nuts on alloy wheels), the sequence matters as much as the torque value. Tightening in a star or cross pattern ensures even clamping and prevents distortion of gaskets and flanges.
        </p>
      </section>

    </div>
  );
}
