export default function BitrateConverterContent() {
  const h2 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── Bits vs bytes ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Bits, bytes, and why the difference matters for internet speed</h2>
        <p style={p}>
          The single most common source of confusion in digital communication is the difference between <strong style={{ color: 'var(--ink)' }}>bits</strong> and <strong style={{ color: 'var(--ink)' }}>bytes</strong>. A bit is the fundamental unit of digital information — a single binary digit, either 0 or 1. A byte is 8 bits. This factor-of-8 relationship is fixed and never changes, but it causes enormous confusion because different parts of the digital ecosystem use different units without always making it explicit.
        </p>
        <p style={p}>
          Internet service providers advertise connection speeds in <strong style={{ color: 'var(--ink)' }}>megabits per second (Mbps)</strong> — note the lowercase "b." Your download manager, operating system network monitor, and file manager display transfer speeds in <strong style={{ color: 'var(--ink)' }}>megabytes per second (MB/s)</strong> — note the uppercase "B." A 100 Mbps connection has a theoretical maximum download speed of 100 ÷ 8 = 12.5 MB/s. This is not a problem with your connection — it is the expected behaviour.
        </p>
        <p style={p}>
          The convention of advertising in bits per second is not accidental: network protocols transmit data serially bit by bit, so bits per second is the natural unit for channel capacity. File sizes, by contrast, have been measured in bytes since the earliest computers. Both conventions are correct in their domains — the confusion arises only at their intersection.
        </p>
      </section>

      {/* ── Bitrate scales reference ──────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Bitrate reference — from IoT sensors to fibre backbone links</h2>
        <p style={p}>
          Bitrates span roughly ten orders of magnitude in modern networking and computing:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Bitrate', 'MB/s equivalent', 'Typical application'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['1 kbps',    '0.000125 MB/s', 'IoT sensors, text SMS, old dial-up modems'],
                ['56 kbps',   '0.007 MB/s',    'Classic 56k dial-up modem'],
                ['1 Mbps',    '0.125 MB/s',    'Basic web browsing, low-quality audio streaming'],
                ['10 Mbps',   '1.25 MB/s',     'SD video streaming, light office work'],
                ['25 Mbps',   '3.125 MB/s',    'Netflix-recommended minimum for 4K streaming'],
                ['100 Mbps',  '12.5 MB/s',     'Typical home fibre entry-level plan'],
                ['1 Gbps',    '125 MB/s',       'Gigabit fibre, NVMe SSD sequential read'],
                ['10 Gbps',   '1,250 MB/s',    'Data centre links, high-end storage'],
                ['100 Gbps',  '12,500 MB/s',   'Internet backbone, undersea cables'],
                ['400 Gbps+', '50,000+ MB/s',  'Modern backbone, DWDM optical systems'],
              ].map(([br, mbs, app], i) => (
                <tr key={br} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 600 }}>{br}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{mbs}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{app}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          Note that SI prefixes in networking are decimal: 1 Mbps = 1,000 kbps = 1,000,000 bps. File sizes can use either decimal (MB = 1,000,000 bytes) or binary (MiB = 1,048,576 bytes) prefixes depending on context. This contributes to the apparent discrepancy between advertised drive capacity and what operating systems display. Our <a href="/tools/data-storage-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Data Storage Converter</a> handles both SI and binary prefixes for file size conversions.
        </p>
      </section>

      {/* ── Video bitrate ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Video bitrate — resolution, codec, and quality trade-offs</h2>
        <p style={p}>
          Video bitrate determines the amount of data used to represent each second of video. Higher bitrate means more data per second, which generally produces better image quality — but at the cost of larger file sizes and higher bandwidth requirements for streaming. The relationship between bitrate and perceived quality is not linear, however: codec efficiency, scene complexity, and content type all interact.
        </p>

        <h3 style={h3}>Bitrate recommendations by resolution and codec</h3>
        <div style={{ overflowX: 'auto', marginBottom: 20 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Resolution', 'H.264 (AVC)', 'H.265 (HEVC)', 'AV1'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['480p (SD)',     '1–2 Mbps',   '0.5–1 Mbps',  '0.4–0.8 Mbps'],
                ['720p (HD)',     '3–5 Mbps',   '1.5–2.5 Mbps','1.2–2 Mbps'],
                ['1080p (FHD)',   '8–12 Mbps',  '4–6 Mbps',    '3–5 Mbps'],
                ['1440p (QHD)',   '16–24 Mbps', '8–12 Mbps',   '6–10 Mbps'],
                ['2160p (4K)',    '35–68 Mbps', '15–30 Mbps',  '12–20 Mbps'],
                ['4K 60fps',      '50–80 Mbps', '25–40 Mbps',  '18–28 Mbps'],
              ].map(([res, h264, h265, av1], i) => (
                <tr key={res} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{res}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{h264}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{h265}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{av1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          Modern streaming platforms use variable bitrate (VBR) encoding, allocating more bits to complex scenes (fast motion, detailed textures) and fewer to simple ones (static backgrounds, talking heads). This is more efficient than constant bitrate (CBR), which wastes bits on simple content and may underprovide for complex scenes. When encoding for broadcast or archiving, professionals often specify a target bitrate, a minimum, and a maximum to control both file size and quality floor.
        </p>

        <h3 style={h3}>Codec efficiency comparison</h3>
        <p style={p}>
          H.265 (HEVC) achieves roughly 40–50% better compression than H.264 at the same quality level. AV1, the royalty-free codec developed by the Alliance for Open Media, achieves another 30–40% improvement over HEVC. The trade-off is encoding complexity: AV1 encoding is computationally expensive and until recently required dedicated hardware acceleration for real-time use. Newer devices include AV1 hardware encoders (Apple M3, Nvidia RTX 40-series, Intel Arc), making real-time AV1 streaming viable.
        </p>
      </section>

      {/* ── Audio bitrate ─────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Audio bitrate — codecs, quality thresholds, and streaming tiers</h2>
        <p style={p}>
          Audio requires far less bandwidth than video, but the relationship between bitrate and perceived quality is still significant. The relevant comparison is always codec-specific: 128 kbps MP3 and 128 kbps AAC are not the same listening experience — AAC is generally considered equivalent to MP3 at roughly 170 kbps due to its more efficient encoding.
        </p>

        <h3 style={h3}>MP3 (MPEG-1 Audio Layer III)</h3>
        <p style={p}>
          The ubiquitous legacy format. At 128 kbps, compression artefacts (pre-echo, smearing of transients) are audible on good headphones with well-trained ears. At 192 kbps, most listeners find the quality acceptable for casual listening. At 320 kbps — the maximum MP3 bitrate — the format is considered transparent (indistinguishable from lossless) for most listeners on typical consumer equipment. MP3 uses psychoacoustic modelling to discard audio information humans are least likely to perceive: sounds masked by louder simultaneous frequencies, and frequencies at the edges of human hearing.
        </p>

        <h3 style={h3}>AAC, Opus, and modern codecs</h3>
        <p style={p}>
          AAC (Advanced Audio Coding) was designed as the successor to MP3 and achieves similar transparency at 128 kbps that MP3 requires 192 kbps to match. Opus, an open-source codec used in WebRTC and modern streaming platforms, is excellent at low bitrates — it outperforms both MP3 and AAC below 64 kbps, making it the codec of choice for voice communication. Apple Music's lossless tier streams at 1,411 kbps (CD quality: 16-bit/44.1 kHz) or up to 9,216 kbps (hi-res 24-bit/192 kHz). Spotify's "Very High" tier delivers 320 kbps OGG Vorbis.
        </p>
        <p style={p}>
          For podcast and voice content, 64 kbps AAC or 96 kbps MP3 is sufficient. Music at 192 kbps AAC is high quality for most listeners. If storage and bandwidth are unconstrained, lossless formats (FLAC, ALAC) eliminate any encoding quality loss. The file size difference is significant: a 3-minute song at 320 kbps MP3 ≈ 7.2 MB; the same song as FLAC ≈ 25–35 MB.
        </p>
      </section>

      {/* ── Download time calculation ─────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Calculating download time — putting bitrate to practical use</h2>
        <p style={p}>
          The most common practical application of bitrate conversion is estimating how long a file transfer will take given a known connection speed. The formula is: <strong style={{ color: 'var(--ink)' }}>Time (seconds) = File size (bits) ÷ Connection speed (bps)</strong>.
        </p>
        <p style={p}>
          The key step is ensuring consistent units. A 4 GB file needs to be converted to bits: 4 GB × 1,024 MB/GB × 1,024 KB/MB × 1,024 bytes/KB × 8 bits/byte = 34,359,738,368 bits (≈ 34.4 Gbits). On a 100 Mbps connection (100,000,000 bps): 34,359,738,368 ÷ 100,000,000 ≈ 344 seconds ≈ 5 minutes 44 seconds. This is the theoretical maximum; real-world TCP/IP overhead, server limits, and network congestion typically reduce effective throughput to 70–90% of the rated speed.
        </p>
        <p style={p}>
          When working with very large files or archival storage — multi-terabyte video archives, scientific datasets, backup systems — the unit conversions become unwieldy and errors creep in easily. For exploring the relationship between storage capacity and the amount of data transferable over various connections, our <a href="/tools/data-storage-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Data Storage Converter</a> provides the full SI and binary prefix hierarchy for file sizes. For calculations involving the time component, see our <a href="/tools/time-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Time Converter</a> to move between seconds, minutes, hours, and days.
        </p>
      </section>

    </div>
  );
}
