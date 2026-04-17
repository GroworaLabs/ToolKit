export default function PowerConverterContent() {
  const h2 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is power ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>What is power — and how is it different from energy?</h2>
        <p style={p}>
          Power is the rate at which energy is transferred or converted over time. In physics, it answers the question: how fast is work being done? The SI unit of power is the <strong style={{ color: 'var(--ink)' }}>watt (W)</strong>, defined as one joule of energy transferred per second. This seemingly simple definition underlies everything from the rating on a light bulb to the output specification of a nuclear power station.
        </p>
        <p style={p}>
          The distinction between power and energy is one of the most commonly confused concepts in everyday technical communication. Energy is the total amount of work done or heat transferred — measured in joules, kilowatt-hours, or calories. Power is the speed at which that energy flows. A 100 W light bulb and a 10 W LED both consume electrical energy, but the incandescent bulb does so ten times faster. Running both for one hour, the bulb uses 100 Wh and the LED uses 10 Wh of energy. To explore energy units themselves, see our <a href="/tools/energy-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Energy Converter</a>.
        </p>
        <p style={p}>
          The relationship is expressed simply as: <strong style={{ color: 'var(--ink)' }}>Power = Energy ÷ Time</strong>, or rearranged: Energy = Power × Time. This is why your electricity bill charges you for kilowatt-hours — the product of kilowatts (power) and hours (time). Understanding this relationship is fundamental to calculating energy costs, sizing solar panels, specifying generators, and comparing appliance efficiency ratings.
        </p>
      </section>

      {/* ── The watt and its multiples ────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>The watt and its multiples — from microwatts to terawatts</h2>
        <p style={p}>
          Power spans an extraordinary range in modern applications — from nanowatts in a wristwatch battery to gigawatts in a large power plant. The watt's SI prefix system scales seamlessly across this range:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Unit', 'Symbol', 'Value', 'Typical application'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Microwatt',  'µW',  '0.000001 W',       'Bluetooth Low Energy beacons, pacemakers'],
                ['Milliwatt',  'mW',  '0.001 W',          'Wireless earbuds, small LEDs, IoT sensors'],
                ['Watt',       'W',   '1 W',               'Smartphone charging, small motors, light bulbs'],
                ['Kilowatt',   'kW',  '1,000 W',           'Electric vehicle motors, home HVAC, ovens'],
                ['Megawatt',   'MW',  '1,000,000 W',       'Wind turbines, large industrial facilities'],
                ['Gigawatt',   'GW',  '1,000,000,000 W',  'Nuclear power plants, national grid capacity'],
                ['Terawatt',   'TW',  '10¹² W',            'Global electricity consumption (~3 TW average)'],
              ].map(([unit, sym, val, app], i) => (
                <tr key={unit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{unit}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{sym}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{val}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          For scale: the human body at rest produces roughly 80 W of heat. A typical laptop draws 45–65 W. A domestic microwave oven runs at 700–1200 W. A Tesla Model 3 electric motor peaks at about 283 kW (roughly 380 horsepower). The entire global average electricity consumption sits around 3 terawatts — three trillion watts flowing continuously across all human civilisation.
        </p>
      </section>

      {/* ── Horsepower variants ───────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Horsepower — three definitions, one confusing legacy</h2>
        <p style={p}>
          Horsepower is a pre-SI unit of power that originated with James Watt in the 18th century to help sell steam engines — he defined it as the power of a strong draft horse doing useful work, so potential buyers could understand how many horses a steam engine could replace. The unit persists today, especially in automotive and engineering contexts, but with three different definitions that cause genuine confusion:
        </p>

        <h3 style={h3}>Mechanical (imperial) horsepower</h3>
        <p style={p}>
          Defined as exactly <strong style={{ color: 'var(--ink)' }}>550 foot-pounds per second</strong>, which equals 745.69987 watts. This is the standard in North America for engine ratings, compressor specifications, and general mechanical engineering. When a US manufacturer says an engine produces 400 HP, they mean mechanical horsepower.
        </p>

        <h3 style={h3}>Metric horsepower (PS / CV / PK)</h3>
        <p style={p}>
          The metric horsepower — called PS in German (Pferdestärke), CV in French and Spanish (cheval-vapeur), and PK in Dutch — is defined as the power required to lift 75 kilograms by one metre in one second. This equals exactly <strong style={{ color: 'var(--ink)' }}>735.499 watts</strong>, about 1.4% less than mechanical horsepower. European vehicle specifications historically used PS; EU regulations now require kW as the primary rating, with PS shown alongside. A car rated at 200 PS produces about 197 mechanical HP.
        </p>

        <h3 style={h3}>Electrical horsepower</h3>
        <p style={p}>
          Defined by the National Electrical Manufacturers Association (NEMA) as exactly <strong style={{ color: 'var(--ink)' }}>746 watts</strong> — slightly higher than mechanical horsepower. Used for electric motor ratings in North America. The difference between electrical and mechanical HP is less than 0.04%, negligible for most practical purposes but occasionally relevant in precision electrical engineering.
        </p>

        <p style={p}>
          The formula connecting horsepower to torque and engine speed is: <code style={code}>HP = (Torque ft·lb × RPM) ÷ 5252</code>. At exactly 5,252 RPM, a torque curve and a power curve always intersect — this is why automotive dyno charts always show the horsepower and torque lines crossing at the same point. For torque unit conversion, use our <a href="/tools/torque-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Torque Converter</a>.
        </p>
      </section>

      {/* ── BTU/hr and HVAC ───────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>BTU/hr — the power unit that runs your home's heating and cooling</h2>
        <p style={p}>
          The <strong style={{ color: 'var(--ink)' }}>British Thermal Unit per hour (BTU/hr)</strong> is a power unit used almost exclusively in the United States for HVAC (heating, ventilation, and air conditioning) equipment. One BTU is the amount of heat needed to raise one pound of water by one degree Fahrenheit. One BTU/hr equals approximately 0.293 watts, making it a small unit — a standard central air conditioner produces 24,000–60,000 BTU/hr.
        </p>
        <p style={p}>
          HVAC capacity in the US is also expressed in <strong style={{ color: 'var(--ink)' }}>tons of refrigeration</strong> — a bizarre unit that refers to the cooling capacity of melting one ton (2,000 pounds) of ice over 24 hours. One ton of refrigeration equals 12,000 BTU/hr or approximately 3.517 kW. A standard residential central air conditioner is typically 2–5 tons (24,000–60,000 BTU/hr or 7–17.5 kW).
        </p>
        <p style={p}>
          For furnaces and boilers, output is rated in BTU/hr as well — a typical residential gas furnace ranges from 60,000 to 120,000 BTU/hr (17–35 kW). The efficiency rating (AFUE — Annual Fuel Utilization Efficiency) describes how much input fuel energy becomes output heat. A 95% AFUE furnace converts 95 BTU/hr of gas combustion energy into 95 BTU/hr of useful heat.
        </p>
      </section>

      {/* ── Power consumption of common devices ──────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Power consumption of common devices — a practical reference</h2>
        <p style={p}>
          Understanding the power draw of common devices helps with calculating electricity bills, sizing backup batteries, designing off-grid solar systems, and evaluating the impact of energy efficiency choices:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Device', 'Typical power', 'Notes'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['LED bulb (800 lm)', '8–10 W', 'Replaces a 60 W incandescent'],
                ['Laptop computer', '30–65 W', 'Varies by workload; gaming laptops up to 150 W'],
                ['Desktop PC + monitor', '100–400 W', 'Gaming rigs can exceed 600 W under load'],
                ['Smartphone charging', '5–30 W', 'Fast charging up to 65–120 W'],
                ['Refrigerator', '100–200 W', '~1.5 kWh/day running average'],
                ['Washing machine', '500–2,000 W', 'Heating water dominates energy use'],
                ['Electric kettle', '1,500–3,000 W', 'Short duration but high power'],
                ['Central air conditioner', '1,500–5,000 W', '2–5 ton residential unit'],
                ['Electric vehicle charging', '7.2–22 kW (AC)', 'Level 2; DC fast charging up to 350 kW'],
                ['Electric oven', '2,000–5,000 W', 'Depends on element count and size'],
              ].map(([dev, pwr, note], i) => (
                <tr key={dev} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{dev}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{pwr}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          To calculate monthly energy cost from wattage: multiply the device's watts by daily hours of use, divide by 1000 (to get kWh), then multiply by your electricity rate. A 2,000 W electric oven used 1 hour daily costs: 2 kWh × 30 days × $0.15/kWh = $9.00 per month at a typical US rate. European rates average €0.25–0.35/kWh, making the same oven cost €15–21 per month.
        </p>
      </section>

      {/* ── Power in electrical engineering ──────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Real power, reactive power, and apparent power in AC circuits</h2>
        <p style={p}>
          In direct current (DC) circuits, power calculation is straightforward: <code style={code}>P = V × I</code> (watts = volts × amps). AC circuits used in homes and industry are more complex because voltage and current can be out of phase due to inductive (motors, transformers) and capacitive (large electronics) loads.
        </p>
        <p style={p}>
          This gives rise to three distinct power quantities. <strong style={{ color: 'var(--ink)' }}>Real power</strong> (measured in watts, W) is the actual power doing useful work — running a motor, generating heat, producing light. <strong style={{ color: 'var(--ink)' }}>Reactive power</strong> (measured in volt-amperes reactive, VAR) represents power that oscillates back and forth between the source and the load without doing net work — it's the "wasted" overhead required by inductive and capacitive components. <strong style={{ color: 'var(--ink)' }}>Apparent power</strong> (measured in volt-amperes, VA) is the product of RMS voltage and RMS current, and equals the vector sum of real and reactive power.
        </p>
        <p style={p}>
          The ratio of real power to apparent power is the <strong style={{ color: 'var(--ink)' }}>power factor</strong>, ranging from 0 to 1. A purely resistive load (like an electric heater) has a power factor of 1.0. Industrial motors typically have a power factor of 0.7–0.9. Utilities penalise industrial customers for poor power factors because reactive current still flows through (and heats) transmission lines even though it does no useful work. This is why large industrial facilities install capacitor banks — to correct power factor and reduce energy waste.
        </p>
        <p style={p}>
          When sizing a UPS (uninterruptible power supply) or generator for equipment, the VA rating matters more than the watt rating. A 1,000 VA UPS can supply 1,000 W only to purely resistive loads; to mixed inductive loads it may safely supply only 700–800 W. Always check both the VA and watt ratings when specifying backup power equipment. For calculating how long a given energy source can supply a given power load, our <a href="/tools/time-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Time Converter</a> can help with the unit conversions involved.
        </p>
      </section>

    </div>
  );
}
