import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between bits and bytes?',
    a: 'A bit is the smallest unit of digital data — a single 0 or 1. A byte is 8 bits. Internet speeds are measured in bits per second (Mbps), while file sizes are measured in bytes (MB, GB). This is why a 100 Mbps connection downloads a 100 MB file in about 8 seconds, not 1 second. ISPs advertise in Mbps (bits) while your download progress bar shows MB/s (bytes).',
  },
  {
    q: 'Why does my 100 Mbps plan only show 11–12 MB/s in download speed?',
    a: '100 Megabits per second ÷ 8 bits per byte = 12.5 Megabytes per second. That\'s the theoretical maximum. Real-world speeds are slightly lower due to TCP/IP overhead (protocol headers), network congestion, router processing, and the fact that ISP speeds are typically "up to" values measured under ideal conditions. 10–12 MB/s on a 100 Mbps plan is completely normal.',
  },
  {
    q: 'What bitrate do I need to stream 4K video?',
    a: 'Netflix recommends 25 Mbps for 4K UHD streaming. YouTube 4K at 60fps uses 20–25 Mbps. Disney+ and Apple TV+ use more efficient HEVC/H.265 encoding and can deliver 4K at 15–20 Mbps. For comfortable 4K streaming you want at least 50 Mbps available on your connection to handle the stream plus other household usage without buffering.',
  },
  {
    q: 'What is the difference between Mbps and MBps?',
    a: 'Capitalisation matters here. Mbps = megabits per second (lowercase b). MBps = megabytes per second (uppercase B). One MBps = 8 Mbps. Most internet service providers use Mbps. Your operating system\'s network monitor and many download managers use MB/s (megabytes per second). Always check which unit is being used before comparing figures.',
  },
  {
    q: 'How do I calculate how long a file will take to download?',
    a: 'Download time = file size in bits ÷ connection speed in bps. Convert file size to bits (multiply GB by 8,589,934,592 or MB by 8,388,608), then divide by your speed in bps. Practical shortcut: divide file size in MB by your speed in MB/s. A 4 GB file (4,096 MB) on a 100 Mbps (12.5 MB/s) connection takes 4,096 ÷ 12.5 = 328 seconds ≈ 5.5 minutes.',
  },
  {
    q: 'What audio bitrate should I use for music?',
    a: 'For MP3: 128 kbps is acceptable for casual listening, 192 kbps is good quality, 320 kbps is considered transparent (indistinguishable from the source for most listeners). For AAC/Opus: 128 kbps sounds better than 128 kbps MP3 due to better encoding efficiency. Streaming services: Spotify uses 24 kbps (mobile low), 96 kbps (normal), 160 kbps (high), 320 kbps (Very High). Apple Music streams lossless at 1,411 kbps.',
  },
  {
    q: 'What is the difference between upload and download speed?',
    a: 'Download speed is how fast data comes from the internet to your device — streaming video, loading web pages, receiving files. Upload speed is how fast data goes from your device to the internet — video calls, sending files, live streaming. Most residential internet plans are asymmetric (ADSL, cable) with much faster download than upload. Fibre connections are often symmetric.',
  },
  {
    q: 'What does Gbps mean and when will home internet reach that speed?',
    a: 'Gbps = gigabits per second = 1,000 Mbps. Gigabit (1 Gbps) home fibre is already widely available in many countries. Some providers offer 2.5 Gbps, 5 Gbps, or even 10 Gbps plans in dense urban areas. At 1 Gbps (125 MB/s), a 4K Blu-ray rip (~50 GB) downloads in about 7 minutes. Multi-gigabit home connections are most useful when multiple people are doing bandwidth-intensive tasks simultaneously.',
  },
];

export const sidebarInfo = [
  { label: 'Bit units',    value: 'bps · kbps · Mbps · Gbps · Tbps' },
  { label: 'Byte units',   value: 'B/s · KB/s · MB/s · GB/s' },
  { label: '1 byte',       value: '= 8 bits (always)' },
  { label: 'SI prefix',    value: '1 kbps = 1,000 bps' },
];
