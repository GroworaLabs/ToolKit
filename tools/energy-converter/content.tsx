export default function EnergyConverterContent() {
  const h2 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is energy ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>What is energy — and why are there so many units for it?</h2>
        <p style={p}>
          Energy is the capacity to do work or transfer heat. It is one of the most fundamental concepts in physics, appearing in every branch of science and engineering. The SI unit of energy is the <strong style={{ color: 'var(--ink)' }}>joule (J)</strong>, defined as the work done when a force of one newton moves an object one metre. One joule is also one watt-second — the energy delivered by one watt of power in one second.
        </p>
        <p style={p}>
          The reason so many energy units exist is historical: different fields developed their own units before SI standardisation. Chemists and nutritionists use calories. Electrical engineers use kilowatt-hours. The HVAC and natural gas industry uses BTUs and therms. Physicists working at atomic scales use electronvolts. Each unit was chosen to give convenient numbers in its domain — a food label reading "1,046,700 joules" would be less practical than "250 kilocalories."
        </p>
        <p style={p}>
          The relationship between energy and <a href="/tools/power-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>power</a> is straightforward: <strong style={{ color: 'var(--ink)' }}>Energy = Power × Time</strong>. A 100-watt light bulb running for one hour consumes 100 Wh = 360,000 J = 360 kJ. This is why your electricity bill charges in kilowatt-hours — the product of power (kilowatts) and time (hours).
        </p>
      </section>

      {/* ── The joule and SI multiples ────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>The joule and its multiples — from nanojoules to exajoules</h2>
        <p style={p}>
          Energy scales across an extraordinary range in nature and technology. The joule's SI prefix system handles this seamlessly:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Unit', 'Symbol', 'Value', 'Typical example'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Millijoule',  'mJ',  '0.001 J',       'Energy of a flying mosquito'],
                ['Joule',       'J',   '1 J',           'Lifting an apple one metre against gravity'],
                ['Kilojoule',   'kJ',  '1,000 J',       'Energy in a small snack bar (500–800 kJ)'],
                ['Megajoule',   'MJ',  '1,000,000 J',   'Energy in 1 litre of petrol (≈34 MJ)'],
                ['Gigajoule',   'GJ',  '10⁹ J',         'Monthly gas heating for a European home'],
                ['Terajoule',   'TJ',  '10¹² J',        'Energy released by 1 tonne of TNT (≈4.2 TJ)'],
                ['Petajoule',   'PJ',  '10¹⁵ J',        'Annual electricity output of a small power plant'],
                ['Exajoule',    'EJ',  '10¹⁸ J',        'Global primary energy consumption: ~580 EJ/year'],
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
          For everyday context: a human body at rest burns roughly 80 joules per second (80 W). A full charge of a modern smartphone battery stores about 40–50 kJ. A litre of petrol contains approximately 34 MJ of chemical energy — enough to power a 100 W bulb for nearly four days straight.
        </p>
      </section>

      {/* ── Calories and food energy ──────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Calories — the confusing unit on every food label</h2>
        <p style={p}>
          The calorie has one of the most confusing naming conventions in science. There are actually two different "calories":
        </p>

        <h3 style={h3}>Small calorie (cal)</h3>
        <p style={p}>
          Also called the gram calorie or thermochemical calorie. It is the energy required to raise the temperature of one gram of water by one degree Celsius (from 14.5 to 15.5 °C). One small calorie equals <strong style={{ color: 'var(--ink)' }}>4.1868 joules</strong> (by the thermochemical definition). This unit is used in chemistry and physics.
        </p>

        <h3 style={h3}>Large Calorie (kcal / Cal)</h3>
        <p style={p}>
          Also called the kilocalorie, food calorie, or dietary Calorie (with a capital C). It equals 1,000 small calories or <strong style={{ color: 'var(--ink)' }}>4,186.8 joules</strong>. This is the unit on food nutrition labels. When a food label says "250 Calories," it means 250 kilocalories = 1,046,700 joules = about 1.05 MJ. The EU requires food labels to show both kcal and kJ.
        </p>

        <p style={p}>
          The human body needs roughly 2,000–2,500 kcal (8.4–10.5 MJ) of food energy per day. Of that, about 60–75% goes to basal metabolism (keeping organs running, maintaining body temperature), 10% to digesting food, and the remainder to physical activity. Elite endurance athletes may consume 5,000–8,000 kcal (21–33 MJ) daily during competition or heavy training.
        </p>
      </section>

      {/* ── Kilowatt-hours ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Kilowatt-hours — the unit your electricity bill is measured in</h2>
        <p style={p}>
          The <strong style={{ color: 'var(--ink)' }}>kilowatt-hour (kWh)</strong> is the standard unit for measuring electrical energy consumption. One kWh is the energy delivered by 1 kilowatt of power sustained for 1 hour, equal to exactly 3,600,000 joules (3.6 MJ). Despite being a unit of energy (not power), it is far more practical than joules for everyday billing because typical household consumption falls in convenient ranges of hundreds of kWh per month.
        </p>
        <p style={p}>
          The average US household consumes about 886 kWh per month (10,632 kWh per year). At a national average rate of roughly $0.16/kWh, that's about $142 per month. European households average 200–400 kWh/month due to smaller homes and more efficient appliances, but at higher rates (€0.25–0.40/kWh).
        </p>
        <p style={p}>
          For quick mental conversion: <code style={code}>1 kWh ≈ 860 kcal ≈ 3,412 BTU ≈ 3.6 MJ</code>. A Tesla Model 3 Long Range battery stores about 75 kWh (270 MJ) — equivalent to the energy in about 2.3 US gallons (8.7 litres) of petrol, though the electric motor converts it to motion roughly 3× more efficiently than a combustion engine.
        </p>
      </section>

      {/* ── BTU and therms ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>BTU and therms — energy units in heating and natural gas</h2>
        <p style={p}>
          The <strong style={{ color: 'var(--ink)' }}>British Thermal Unit (BTU)</strong> is the amount of heat required to raise the temperature of one pound of water by one degree Fahrenheit. One BTU equals approximately 1,055 joules. Despite the name, the BTU is primarily used in the United States — the UK has mostly moved to SI units for energy.
        </p>
        <p style={p}>
          BTUs are the standard for comparing energy content of fuels in the US: natural gas contains about 1,030 BTU per cubic foot, a gallon of petrol about 120,000 BTU, a gallon of diesel about 137,000 BTU, and a cord of firewood about 20 million BTU. HVAC equipment is also rated in BTU/hr (a power unit) — see our <a href="/tools/power-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Power Converter</a> for those conversions.
        </p>
        <p style={p}>
          A <strong style={{ color: 'var(--ink)' }}>therm</strong> equals exactly 100,000 BTU (105.5 MJ) and is the primary billing unit for natural gas in the US and UK. One therm is roughly the energy in 100 cubic feet of natural gas at standard conditions. Monthly gas bills typically show consumption in therms: 50–100 therms in winter (heating) and 15–30 therms in summer (hot water and cooking only).
        </p>
      </section>

      {/* ── Energy content of fuels ───────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Energy content of common fuels — a practical comparison</h2>
        <p style={p}>
          Comparing the energy density of different fuels is essential for engineering, energy policy, and understanding why the energy transition is so complex:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Fuel', 'Energy per unit', 'MJ equivalent', 'Notes'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Natural gas',     '1,030 BTU/ft³',      '1.09 MJ/ft³',   'Clean-burning; lowest CO₂ per MJ of fossil fuels'],
                ['Petrol (gasoline)', '34.2 MJ/litre',    '120,000 BTU/gal', 'Most common transport fuel worldwide'],
                ['Diesel',           '38.6 MJ/litre',     '137,000 BTU/gal', 'Higher density than petrol; more energy per litre'],
                ['Coal (bituminous)', '24–35 MJ/kg',      '~29 MJ/kg avg',   'Varies widely by grade and moisture content'],
                ['Wood (dry)',        '16–21 MJ/kg',       '~18 MJ/kg avg',  'Moisture content heavily affects usable energy'],
                ['Lithium-ion battery', '0.36–0.95 MJ/kg', '~0.7 MJ/kg',    '50× less dense than petrol — but 3× motor efficiency'],
                ['Hydrogen (compressed)', '120 MJ/kg',     '340 BTU/ft³',    'Highest mass-energy density; very low volume density'],
              ].map(([fuel, eper, mj, note], i) => (
                <tr key={fuel} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{fuel}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{eper}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{mj}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          The energy density gap between chemical fuels and batteries explains why electric vehicles need heavy battery packs and why long-haul aviation is difficult to electrify. A fully loaded Boeing 787 carries about 100 tonnes of jet fuel containing 4.3 million MJ of energy — replacing that with current lithium-ion batteries would require roughly 6,000 tonnes, far exceeding the aircraft's maximum takeoff weight.
        </p>
      </section>

      {/* ── Electronvolts ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Electronvolts — measuring energy at the atomic scale</h2>
        <p style={p}>
          An <strong style={{ color: 'var(--ink)' }}>electronvolt (eV)</strong> is the kinetic energy gained by a single electron when it accelerates through an electric potential difference of one volt. It equals exactly <code style={code}>1.602176634 × 10⁻¹⁹ J</code> — an inconceivably tiny amount by macroscopic standards, but a convenient unit at the atomic and subatomic scale.
        </p>
        <p style={p}>
          Visible light photons carry energies of 1.7 eV (red) to 3.3 eV (violet). The bandgap of silicon — the energy needed to free an electron for conduction — is 1.12 eV, which is why silicon solar cells can harvest visible light. Medical X-rays use photons of 20–150 keV (thousands of eV). The Large Hadron Collider at CERN accelerates protons to 6.5 TeV (6.5 trillion eV) — still only about the kinetic energy of a flying mosquito, concentrated into a single subatomic particle.
        </p>
        <p style={p}>
          In particle physics, mass and energy are often expressed in the same units via Einstein's <code style={code}>E = mc²</code>. The proton mass is 938.3 MeV/c², and the Higgs boson mass is 125.1 GeV/c². This interchangeability of mass and energy units is routine in high-energy physics.
        </p>
      </section>

    </div>
  );
}
