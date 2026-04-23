import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between MB and MiB?',
    a: 'MB (megabyte) uses the SI decimal prefix — 1 MB = 1,000,000 bytes (1,000²). MiB (mebibyte) uses the IEC binary prefix — 1 MiB = 1,048,576 bytes (1,024²). Hard drive manufacturers use SI (decimal) units because the numbers are larger. Operating systems historically used binary units but labelled them incorrectly as "MB." Windows still shows binary units labelled as "MB/GB." macOS switched to SI units in macOS 10.6 (Snow Leopard).',
  },
  {
    q: 'Why does my 1 TB hard drive show only 931 GB in Windows?',
    a: 'A "1 TB" hard drive contains exactly 1,000,000,000,000 bytes by the manufacturer\'s SI definition. Windows displays storage using binary units: 1,000,000,000,000 ÷ 1,073,741,824 (1 GiB) ≈ 931. So the drive really is 931 GiB, which Windows calls "931 GB." The drive isn\'t smaller than advertised — it\'s a units labelling mismatch. macOS correctly shows ≈1.0 TB by using SI units consistently.',
  },
  {
    q: 'What is the difference between a bit and a byte?',
    a: 'A bit is the smallest unit of digital information — it holds either 0 or 1. A byte is 8 bits. Network speeds are measured in bits per second (Mbps, Gbps) because network protocols transmit one bit at a time. Storage and file sizes are measured in bytes. So a 100 Mbps connection downloads at roughly 12.5 MB/s (100 ÷ 8). Always check whether a spec uses bits or bytes — the lowercase "b" vs uppercase "B" distinction matters.',
  },
  {
    q: 'How many bytes is a gigabyte?',
    a: 'In SI (decimal): 1 GB = 1,000,000,000 bytes (10⁹). In binary: 1 GiB = 1,073,741,824 bytes (2³⁰). The 7.4% difference (73,741,824 bytes) is why a "1 GB" flash drive shows less capacity in some operating systems. For memory (RAM), manufacturers also use binary units — a "16 GB RAM" module typically contains exactly 17,179,869,184 bytes (16 GiB).',
  },
  {
    q: 'What is a petabyte and how much data is that?',
    a: 'A petabyte (PB) equals 1,000 terabytes or 1,000,000 gigabytes in SI units (10¹⁵ bytes). To put it in context: 1 PB could hold about 500 billion pages of standard text, or 200,000 years of HD video, or the digitised content of about 20 million file cabinets. Hyperscale data centres like AWS, Google, and Meta store exabytes (1,000 PB) to zetabytes of data.',
  },
  {
    q: 'What prefixes do SI and IEC use for data?',
    a: 'SI (decimal, base 1000): kilo (KB = 10³), mega (MB = 10⁶), giga (GB = 10⁹), tera (TB = 10¹²), peta (PB = 10¹⁵). IEC (binary, base 1024): kibi (KiB = 2¹⁰), mebi (MiB = 2²⁰), gibi (GiB = 2³⁰), tebi (TiB = 2⁴⁰), pebi (PiB = 2⁵⁰). The IEC prefixes were standardised in 1998 to eliminate ambiguity, but adoption is inconsistent — most consumer products still use SI labels for binary quantities.',
  },
  {
    q: 'How do cloud storage providers measure data?',
    a: 'Cloud providers (AWS, Google Cloud, Azure) use SI (decimal) units: 1 GB = 1,000,000,000 bytes, 1 TB = 1,000,000,000,000 bytes. This means 1 TB of cloud storage holds slightly more data than 1 TiB of binary storage (1,000 GB vs 1,024 GiB in old-style labelling). Billing is always decimal, so when comparing cloud pricing to local storage specs, use the same unit system.',
  },
  {
    q: 'What is the largest data storage unit?',
    a: 'Standard SI prefixes go: kilo (10³) → mega (10⁶) → giga (10⁹) → tera (10¹²) → peta (10¹⁵) → exa (10¹⁸) → zetta (10²¹) → yotta (10²⁴). The global internet is estimated to transmit about 400 exabytes per month. Total data ever created is measured in zettabytes. The entire human genome is about 1.5 GB; the entire human brain\'s estimated information capacity is roughly 2.5 petabytes.',
  },
];

export const sidebarInfo = [
  { label: '1 KB (SI)',   value: '1,000 B'          },
  { label: '1 KiB',       value: '1,024 B'          },
  { label: '1 MB (SI)',   value: '1,000,000 B'      },
  { label: '1 MiB',       value: '1,048,576 B'      },
  { label: '1 GB (SI)',   value: '10⁹ bytes'        },
  { label: '1 GiB',       value: '2³⁰ bytes'        },
];
