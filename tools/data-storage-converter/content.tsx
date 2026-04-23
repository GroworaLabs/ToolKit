export default function DataStorageConverterContent() {
  const h2   = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p    = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3   = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── Bits and bytes ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Bits vs bytes — the foundation of digital storage</h2>
        <p style={p}>
          Every piece of digital information ultimately comes down to binary digits. A <strong style={{ color: 'var(--ink)' }}>bit</strong> (binary digit) is the smallest possible unit of digital information — it holds either 0 or 1. Eight bits make one <strong style={{ color: 'var(--ink)' }}>byte</strong>, which can represent 256 distinct values (2⁸). Almost all storage capacity, file sizes, and memory specifications are expressed in bytes or their multiples.
        </p>
        <p style={p}>
          The bit/byte distinction matters enormously in practice. Network speeds are specified in <strong style={{ color: 'var(--ink)' }}>bits per second</strong> (Mbps, Gbps) because network hardware transmits data one bit at a time. File sizes and storage are in <strong style={{ color: 'var(--ink)' }}>bytes</strong>. A "100 Mbps" internet connection delivers 100 million bits per second — divide by 8 to get about <code style={code}>12.5 MB/s</code> maximum file download speed. This discrepancy is a frequent source of frustration: an internet plan advertised as "1 Gbps" downloads a 1 GB file in about 8 seconds in ideal conditions, not 1 second.
        </p>
        <p style={p}>
          Network hardware and internet service providers universally use bits; operating systems, cloud storage dashboards, and file managers universally use bytes. The industry convention uses a lowercase "b" for bits and an uppercase "B" for bytes. A Wi-Fi router spec listing "Wi-Fi 6 — 9.6 Gbps" means 9.6 gigabits per second — roughly 1.2 GB/s of raw throughput before protocol overhead. Always check the capitalisation when comparing specs.
        </p>
      </section>

      {/* ── SI vs binary ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>SI (decimal) vs IEC (binary) units — the MB vs MiB confusion</h2>
        <p style={p}>
          There are two competing and simultaneously-in-use systems for measuring data storage, and understanding the difference is essential for anyone who works with computers. The conflict arises from two different interpretations of the same prefixes — a problem that has persisted for decades and still causes confusion on a daily basis.
        </p>

        <h3 style={h3}>SI (decimal) units — base 1000</h3>
        <p style={p}>
          The International System of Units (SI) defines kilo as 10³ = 1,000, mega as 10⁶ = 1,000,000, and so on in powers of 10. Hard drive manufacturers, SSD makers, and USB flash drive manufacturers use SI definitions because they make their products' capacities appear larger. A "1 TB" drive contains exactly 1,000,000,000,000 bytes by this definition. Cloud providers (AWS, Google Cloud, Azure) bill storage in SI units. Networking bandwidth is also expressed in SI units: a 1 Gbps port transmits 1,000,000,000 bits per second.
        </p>

        <h3 style={h3}>IEC (binary) units — base 1024</h3>
        <p style={p}>
          In 1998, the International Electrotechnical Commission (IEC) introduced unambiguous binary prefixes to resolve the confusion: <strong style={{ color: 'var(--ink)' }}>kibi (KiB)</strong> = 2¹⁰ = 1,024 bytes, <strong style={{ color: 'var(--ink)' }}>mebi (MiB)</strong> = 2²⁰ = 1,048,576 bytes, <strong style={{ color: 'var(--ink)' }}>gibi (GiB)</strong> = 2³⁰ = 1,073,741,824 bytes, and so on. These are precisely defined for binary computing. RAM, CPU caches, virtual memory pages, and file system allocation blocks are all naturally measured in powers of 2, so IEC units are the correct choice for these. Windows has always displayed storage in binary units but labelled them incorrectly as "MB/GB." macOS switched to SI units in 10.6 Snow Leopard (2009), eliminating its own "missing space" issue.
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Unit', 'Standard', 'Bytes (exact)', 'vs SI baseline'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['KB (kilobyte)',  'SI',  '1,000',                    '—'],
                ['KiB (kibibyte)','IEC', '1,024',                    '+2.4%'],
                ['MB (megabyte)', 'SI',  '1,000,000',                '—'],
                ['MiB (mebibyte)','IEC', '1,048,576',                '+4.9%'],
                ['GB (gigabyte)', 'SI',  '1,000,000,000',            '—'],
                ['GiB (gibibyte)','IEC', '1,073,741,824',            '+7.4%'],
                ['TB (terabyte)', 'SI',  '1,000,000,000,000',        '—'],
                ['TiB (tebibyte)','IEC', '1,099,511,627,776',        '+9.95%'],
                ['PB (petabyte)', 'SI',  '1,000,000,000,000,000',    '—'],
                ['PiB (pebibyte)','IEC', '1,125,899,906,842,624',    '+12.6%'],
              ].map(([unit, std, bytes, diff], i) => (
                <tr key={unit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: std === 'IEC' ? 'var(--amber)' : 'var(--blue)', fontWeight: 600 }}>{unit}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--ink-3)' }}>{std}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-2)' }}>{bytes}</td>
                  <td style={{ padding: '10px 14px', fontSize: 12, color: diff === '—' ? 'var(--ink-4)' : 'var(--amber)', fontWeight: diff !== '—' ? 600 : 400 }}>{diff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          Notice how the difference grows with scale: at the kilobyte level, the discrepancy is only 2.4%, but by the time you reach petabytes, IEC units are 12.6% larger than their SI counterparts. At the exabyte level (a common unit for hyperscale data centres), the difference exceeds 15%.
        </p>
      </section>

      {/* ── Hard drive "missing" space ────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Why does a "1 TB" drive show only 931 GB in Windows?</h2>
        <p style={p}>
          This is one of the most frequently asked questions in consumer technology, and the answer requires understanding the SI vs binary distinction above. A hard drive labelled "1 TB" contains exactly <code style={code}>1,000,000,000,000 bytes</code> using the SI decimal definition that the manufacturer (correctly) applied. When Windows Explorer displays the drive capacity, it performs the division using binary units:
        </p>
        <p style={p}>
          <code style={code}>1,000,000,000,000 bytes ÷ 1,073,741,824 (1 GiB) ≈ 931.32</code>
        </p>
        <p style={p}>
          Windows then labels this as "931 GB" — using the SI symbol for a binary quantity. So Windows is showing you the correct number of gibibytes (GiB), but mislabelling them as gigabytes (GB). The drive is not smaller than advertised; there is no "missing" space — it is a unit labelling inconsistency that has persisted since the 1990s. macOS avoids this confusion entirely by displaying storage in SI units: the same 1 TB drive shows as "1.0 TB" in macOS Finder.
        </p>
        <p style={p}>
          The practical takeaway: when comparing storage capacities, always check what OS is being used to measure. A 512 GB SSD shows as 477 GiB (≈477 "GB" in Windows) and 512 GB in macOS. For cloud storage, AWS and Azure quote in SI units (GB = 10⁹ bytes) and bill accordingly.
        </p>
      </section>

      {/* ── RAM vs storage ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>RAM vs storage — why they're measured differently</h2>
        <p style={p}>
          RAM (Random Access Memory) and persistent storage (SSDs, HDDs) serve very different roles, and they have traditionally been measured using different conventions — RAM in binary, storage in whatever the manufacturer chooses.
        </p>
        <p style={p}>
          <strong style={{ color: 'var(--ink)' }}>RAM is always binary.</strong> A "16 GB RAM" module contains exactly 2³⁴ = 17,179,869,184 bytes (16 GiB). RAM chips are manufactured in power-of-2 capacities by necessity — memory controllers and addressing hardware are built around binary arithmetic. You will never see a 16.384 GB RAM stick; the 4-byte difference between 16 GB (SI) and 16 GiB (IEC) would require non-standard addressing logic.
        </p>
        <p style={p}>
          <strong style={{ color: 'var(--ink)' }}>Persistent storage is marketed in SI.</strong> Hard drives, SSDs, and flash storage are fabricated in layouts that don't inherently require power-of-2 capacities, so manufacturers adopted SI units to present larger-looking numbers. A 1 TB NVMe SSD contains 1,000,000,000,000 bytes — exactly 1 TB in SI, but only 931 GiB in binary.
        </p>
        <p style={p}>
          <strong style={{ color: 'var(--ink)' }}>CPU caches are binary by construction.</strong> L1, L2, and L3 CPU caches are always specified in KiB or MiB: a CPU with "12 MB L3 cache" typically has 12 × 1,048,576 = 12,582,912 bytes of cache — though some manufacturers have started using SI here too, adding ambiguity.
        </p>
      </section>

      {/* ── Network speed vs file size ────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Network speeds and file transfer — converting Mbps to MB/s</h2>
        <p style={p}>
          Understanding the relationship between advertised network speed (in bits) and actual file transfer rate (in bytes) is essential for developers building data pipelines, selecting cloud storage tiers, or debugging slow uploads.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Connection speed', 'Theoretical max MB/s', 'Realistic MB/s', 'Time to transfer 1 GB'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['10 Mbps (old ADSL)',  '1.25 MB/s',  '0.8–1.0 MB/s', '~17–21 min'],
                ['100 Mbps (cable)',    '12.5 MB/s',  '8–11 MB/s',    '~90–120 sec'],
                ['1 Gbps (fibre/LAN)', '125 MB/s',   '80–110 MB/s',  '~9–12 sec'],
                ['2.5 Gbps (Wi-Fi 6)', '312.5 MB/s', '150–250 MB/s', '~4–7 sec'],
                ['10 Gbps (LAN)',       '1,250 MB/s', '600–950 MB/s', '~1–1.7 sec'],
                ['40 Gbps (InfiniBand)','5,000 MB/s', '3,500–4,500 MB/s','<1 sec'],
              ].map(([speed, max, real, time], i) => (
                <tr key={speed} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{speed}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-2)' }}>{max}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)' }}>{real}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-3)' }}>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          Realistic throughput is lower than the theoretical maximum due to TCP/IP overhead (typically 3–5%), protocol headers, retransmission, and network congestion. For production systems, a safe rule of thumb is to budget for 70–80% of the advertised link speed for sustained bulk transfers.
        </p>
      </section>

      {/* ── Scale reference ───────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Data storage at scale — from kilobytes to zettabytes</h2>
        <p style={p}>
          Understanding the scale of modern data requires anchoring abstract units to real-world examples. The gap between a kilobyte and a zettabyte spans 18 orders of magnitude — a range comparable to the difference between the width of a human hair and the distance from Earth to the Sun.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Unit', 'SI size', 'Real-world example'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Kilobyte (KB)', '10³ B',  'Short email; a plain-text tweet'],
                ['Megabyte (MB)', '10⁶ B',  '1 min of MP3 at 128 kbps; a JPEG photo'],
                ['Gigabyte (GB)', '10⁹ B',  'HD movie (1–3 GB); a modern smartphone app'],
                ['Terabyte (TB)', '10¹² B', '200,000 MP3 songs; a consumer hard drive'],
                ['Petabyte (PB)', '10¹⁵ B', 'All US academic research libraries combined'],
                ['Exabyte (EB)',  '10¹⁸ B', 'Global internet traffic per month (~400 EB, 2024)'],
                ['Zettabyte (ZB)','10²¹ B', 'Total data created and replicated worldwide per year'],
                ['Yottabyte (YB)','10²⁴ B', 'Estimated storage needed to hold the internet (future)'],
              ].map(([unit, size, ex], i) => (
                <tr key={unit} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{unit}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{size}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          To put hyperscale in context: in 2024, global internet traffic exceeds 400 exabytes per month. The entire text of all Wikipedia articles in all languages is roughly 22 GB — a trivially small fraction of a single data centre. Google's total storage capacity across all data centres is estimated in the tens of exabytes. The human genome — 3.2 billion base pairs — encodes to about 800 MB in raw form and about 1.5 GB in a practical VCF file format.
        </p>
      </section>

    </div>
  );
}
