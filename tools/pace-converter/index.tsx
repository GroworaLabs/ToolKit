import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is running pace?',
    a: 'Running pace is the time it takes to cover one unit of distance — typically expressed as minutes per kilometre (min/km) or minutes per mile (min/mile). Pace is the inverse of speed: a faster runner has a lower (smaller) pace number. A 5:00 min/km pace means the runner covers one kilometre every five minutes.',
  },
  {
    q: 'How do I convert pace to speed?',
    a: 'To convert min/km to km/h: divide 60 by your pace in decimal minutes. For example, a 5:00 min/km pace = 60 ÷ 5 = 12 km/h. To convert min/mile to mph: divide 60 by your pace in decimal minutes. A 8:00 min/mile pace = 60 ÷ 8 = 7.5 mph. This tool does the conversion instantly in both directions.',
  },
  {
    q: 'What is a good running pace for a beginner?',
    a: 'Most beginners start at 7:00–9:00 min/km (11:15–14:30 min/mile), roughly 7–9 km/h. At this pace a 5K takes 35–45 minutes. Fitness level, age, terrain and weather all affect pace significantly. The most important thing for beginners is to maintain a conversational pace — if you can\'t hold a brief conversation, you\'re going too fast.',
  },
  {
    q: 'What pace do I need to finish a marathon in under 4 hours?',
    a: 'A sub-4-hour marathon requires an average pace faster than 5:41 min/km (9:09 min/mile). In km/h that\'s above 10.55 km/h (6.56 mph). Most training plans target a pace 10–20 seconds per km slower than goal race pace for long runs. Factor in aid station stops and realistic fatigue — going out too fast in the first half is the most common mistake.',
  },
  {
    q: 'Why do some countries use min/km and others min/mile?',
    a: 'Pace unit follows the local distance convention. Countries using the metric system (most of the world) express pace in min/km. The United States, United Kingdom and a few others traditionally use miles, so min/mile is standard in those contexts. Many GPS running watches support both and switch automatically based on locale settings.',
  },
  {
    q: 'How do I calculate a race finish time from pace?',
    a: 'Multiply pace (in minutes per unit) by the race distance in the same units. For a 10K at 5:30 min/km: 5.5 min/km × 10 km = 55 minutes. For a half marathon (21.097 km) at 5:30 min/km: 5.5 × 21.097 ≈ 116 minutes = 1 hour 56 minutes. Our tool shows predicted finish times for standard race distances alongside the pace conversion.',
  },
  {
    q: 'What is a negative split in running?',
    a: 'A negative split means running the second half of a race faster than the first half. It\'s widely considered the optimal pacing strategy because it prevents going out too fast and depleting glycogen stores early. Elite marathon runners almost always achieve negative splits. A 5-second-per-km negative split over a marathon saves several minutes in total finish time.',
  },
  {
    q: 'How does elevation gain affect pace?',
    a: 'A common rule of thumb is the Naismith rule: add 1 minute per 10 metres of ascent to your flat-ground time. More precise calculators use grade-adjusted pace (GAP). On a 10% uphill grade, equivalent flat pace is roughly 1:00–1:30 min/km slower. GPS watches with grade adjustment display GAP to let you maintain consistent effort regardless of terrain.',
  },
  {
    q: 'What is the difference between treadmill speed and outdoor pace?',
    a: 'Treadmill speed is shown in km/h or mph, while outdoor running is typically tracked as pace (min/km or min/mile). A treadmill set to 10 km/h corresponds to a 6:00 min/km outdoor pace. However, treadmill running is generally slightly easier than outdoor running at the same speed because there\'s no air resistance and the belt assists leg turnover slightly. Setting treadmill incline to 1% roughly compensates for this.',
  },
];

export const sidebarInfo = [
  { label: 'Pace units',    value: 'min/km · min/mile' },
  { label: 'Speed units',   value: 'km/h · mph · m/s' },
  { label: 'Race distances', value: '5K · 10K · HM · Marathon' },
  { label: 'Finish times',  value: 'Calculated automatically' },
];
