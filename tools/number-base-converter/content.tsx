export default function NumberBaseConverterContent() {
  const h2 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p  = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3 = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is a number base ─────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>What is a number base — and why do computers care?</h2>
        <p style={p}>
          A number base, or radix, is the number of distinct digits a positional numbering system uses to represent values. The decimal system you use every day has a base of 10 — it uses the digits 0 through 9. When you exhaust all single digits and count past 9, you carry over to the next column and start again. The value of each column is a power of 10: ones, tens, hundreds, thousands, and so on.
        </p>
        <p style={p}>
          Computers work at the hardware level with transistors that have exactly two stable states — on and off, represented as 1 and 0. This makes <strong style={{ color: 'var(--ink)' }}>binary (base 2)</strong> the natural language of computing hardware. Every piece of data your CPU processes — text, images, video, code — is ultimately stored and manipulated as sequences of binary digits (bits).
        </p>
        <p style={p}>
          While binary is what the hardware speaks, humans find long strings of 0s and 1s impractical to read and write. That's where hexadecimal and octal come in as shorthand representations that map cleanly onto binary without conversion ambiguity. Understanding how to move between these bases is a fundamental skill for systems programmers, network engineers, embedded developers, and anyone who reads compiler output or debugger disassembly.
        </p>
      </section>

      {/* ── The four bases explained ──────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Binary, octal, decimal and hexadecimal — a practical comparison</h2>
        <p style={p}>
          Each base has a distinct domain where it appears most naturally in modern computing and engineering:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Base', 'Name', 'Digits', 'Typical use', 'Prefix'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['2',  'Binary',      '0–1',    'CPU instructions, file storage, flags, network protocols', '0b'],
                ['8',  'Octal',       '0–7',    'Unix file permissions (chmod), some legacy protocols',      '0o or 0'],
                ['10', 'Decimal',     '0–9',    'Human-readable numbers, display values, user input',        'None'],
                ['16', 'Hexadecimal', '0–9 A–F','Memory addresses, colour codes, byte dumps, hash values',  '0x or #'],
              ].map(([base, name, digits, use, prefix], i) => (
                <tr key={base} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--ink)', fontFamily: 'JetBrains Mono, monospace' }}>{base}</td>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--ink)' }}>{name}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)' }}>{digits}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{use}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{prefix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          The same integer — let's use 255 — looks completely different in each base: decimal <code style={code}>255</code>, hex <code style={code}>FF</code>, octal <code style={code}>377</code>, binary <code style={code}>11111111</code>. They all represent exactly the same value. Knowing how to move between these representations is essential when reading memory dumps, writing bitfield operations, configuring permissions, or parsing network packets.
        </p>
      </section>

      {/* ── How conversion works ──────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>How number base conversion works — the algorithm</h2>

        <h3 style={h3}>Any base → decimal</h3>
        <p style={p}>
          To convert a number from any base to decimal, multiply each digit by its base raised to its positional power (starting at 0 from the right), then sum the results. For binary <code style={code}>1011</code>:
        </p>
        <div style={{ background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 18px', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: 'var(--ink-2)', marginBottom: 20 }}>
          (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰) = 8 + 0 + 2 + 1 = <strong style={{ color: 'var(--green)' }}>11</strong>
        </div>
        <p style={p}>
          For hexadecimal <code style={code}>2F</code> where F = 15: (2 × 16¹) + (15 × 16⁰) = 32 + 15 = <strong style={{ color: 'var(--ink)' }}>47</strong>.
        </p>

        <h3 style={h3}>Decimal → any base (repeated division)</h3>
        <p style={p}>
          To convert a decimal number to another base, repeatedly divide the number by the target base and collect remainders in reverse order. To convert 47 to hexadecimal: 47 ÷ 16 = 2 remainder 15 (F), then 2 ÷ 16 = 0 remainder 2. Reading remainders bottom-up: <code style={code}>2F</code>. This works for any base.
        </p>

        <h3 style={h3}>Binary ↔ Hexadecimal (shortcut)</h3>
        <p style={p}>
          Because 16 = 2⁴, each hexadecimal digit maps exactly to a group of 4 binary bits (a nibble). This makes binary-to-hex conversion trivial without going through decimal: split binary digits into groups of 4 from the right, convert each group directly. Binary <code style={code}>1010 1111</code> → A + F → <code style={code}>AF</code>. This relationship is why hex is so prevalent in computing — it's compact binary.
        </p>
      </section>

      {/* ── Real-world uses ───────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Where each base appears in real-world development</h2>

        <h3 style={h3}>Binary in bitwise operations</h3>
        <p style={p}>
          Bitwise operations (AND, OR, XOR, NOT, shifts) operate on individual bits within a value. They're used for permission flags, network subnet masks, hardware register manipulation, and performance-critical code paths. Understanding the binary representation of values is essential for predicting the output of operations like <code style={code}>value &amp; 0xFF</code> (isolate lowest byte) or <code style={code}>flags | (1 &lt;&lt; 3)</code> (set bit 3).
        </p>
        <p style={p}>
          Our <a href="/tools/hash-generator" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Hash Generator</a> outputs hash values in hexadecimal — understanding hex is essential for working with SHA-256 outputs, checksums, and content-addressable storage systems.
        </p>

        <h3 style={h3}>Hexadecimal in memory and debugging</h3>
        <p style={p}>
          Every debugger, memory viewer, and disassembler works in hexadecimal. A 64-bit memory address like <code style={code}>0x7fff5fbff8a0</code> is 12 hex characters — representing 48 bits of address space. When you see a segmentation fault or access violation, the address in the error message is always hex. Core dumps and crash logs are written entirely in hex because it's the most compact human-readable binary representation.
        </p>

        <h3 style={h3}>Hex colour codes in web development</h3>
        <p style={p}>
          CSS colour codes like <code style={code}>#FF5733</code> are simply three hex bytes: red (FF = 255), green (57 = 87), blue (33 = 51). The full 6-digit hex colour space covers all 16,777,216 possible RGB colours. Short codes like <code style={code}>#F53</code> expand each digit to two identical digits: <code style={code}>#FF5533</code>. If you need to convert between hex colour codes and RGB or HSL, see our <a href="/tools/color-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Color Converter</a>.
        </p>

        <h3 style={h3}>Octal for Unix file permissions</h3>
        <p style={p}>
          Linux and macOS file permissions are three groups of three bits (owner / group / others), each encoding read (r=4), write (w=2), execute (x=1). Since three bits perfectly maps to one octal digit, permissions are expressed in octal. <code style={code}>chmod 755</code> sets rwx (7) for owner, r-x (5) for group, r-x (5) for others. Understanding this octal-to-binary mapping makes Linux administration intuitive rather than rote memorisation.
        </p>
      </section>

      {/* ── Two's complement ─────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Two's complement — how computers store negative numbers</h2>
        <p style={p}>
          Unsigned binary can only represent zero and positive numbers. To represent negative integers, virtually all modern processors use <strong style={{ color: 'var(--ink)' }}>two's complement</strong> encoding. In two's complement, the most significant bit (MSB) is the sign bit: 0 for positive, 1 for negative. The value of the MSB is treated as a large negative number.
        </p>
        <p style={p}>
          To negate a number in two's complement: invert all bits (flip 0→1 and 1→0), then add 1. This elegant trick means a single hardware adder handles both addition and subtraction without special cases. In an 8-bit signed integer, the range is −128 to +127. The value −1 is represented as <code style={code}>11111111</code> (all ones), and −128 as <code style={code}>10000000</code>.
        </p>
        <p style={p}>
          Two's complement explains some seemingly odd behaviour in integer arithmetic: in C, an <code style={code}>int8_t</code> holding 127 that overflows by adding 1 becomes −128, not 128. This is intentional and defined by the two's complement representation. Understanding this prevents subtle bugs in low-level code, especially when working with network protocols and binary file formats where specific byte patterns have precise numeric meanings. The <a href="/tools/data-storage-converter" style={{ color: 'var(--green)', textDecoration: 'underline' }}>Data Storage Converter</a> is useful when thinking about how many bits or bytes are needed to represent values of a given magnitude.
        </p>
      </section>

    </div>
  );
}
