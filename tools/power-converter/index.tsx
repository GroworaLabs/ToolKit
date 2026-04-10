import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between power and energy?',
    a: 'Power is the rate at which energy is transferred or consumed, measured in watts (joules per second). Energy is the total amount transferred over time, measured in joules or kilowatt-hours. A 100 W bulb running for 10 hours consumes 1 kWh of energy. You can use our Energy Converter to work with energy units separately.',
  },
  {
    q: 'How many watts is one horsepower?',
    a: 'Mechanical horsepower (the most common in North America for vehicle specs) equals 745.7 watts. Electrical horsepower is exactly 746 watts. Metric horsepower (PS, used in Europe for car ratings) equals 735.5 watts. The differences are small but matter when comparing international vehicle specifications.',
  },
  {
    q: 'Why does Europe use kW for car power instead of horsepower?',
    a: 'The European Union standardised on kilowatts for official power ratings because watts and kilowatts are SI units with unambiguous definitions. Horsepower is a legacy unit with multiple conflicting definitions. EU type approval documents always list power in kW, though manufacturers typically include horsepower (PS) alongside for consumer marketing.',
  },
  {
    q: 'What is a BTU/hr and when is it used?',
    a: 'BTU/hr (British Thermal Units per hour) measures heat transfer rate and is widely used in the United States for HVAC systems (air conditioners, furnaces, heat pumps) and industrial heating. One ton of refrigeration — the standard air-conditioning capacity unit — equals 12,000 BTU/hr or approximately 3.517 kW.',
  },
  {
    q: 'How do I calculate my electricity bill from appliance wattage?',
    a: 'Multiply the appliance wattage by hours of daily use to get watt-hours per day, then divide by 1,000 to get kWh per day. Multiply by your electricity rate (e.g. $0.15/kWh) to get daily cost. A 2,000 W electric heater running 8 hours/day uses 16 kWh/day. At $0.15/kWh that\'s $2.40 per day or about $72 per month.',
  },
  {
    q: 'What is a megawatt and who uses that unit?',
    a: 'A megawatt (MW) equals 1,000 kilowatts or 1,000,000 watts. It\'s used for large-scale power generation: a typical utility-scale wind turbine produces 2–3 MW, a nuclear reactor unit produces 1,000–1,600 MW, and a large city might require several thousand MW of total generating capacity. Grid operators and energy planners work in MW and GW.',
  },
  {
    q: 'How much power does a typical home use?',
    a: 'An average US household uses about 1.2–1.5 kW of average continuous power, totalling roughly 10,500 kWh per year. Peak demand is much higher — a home with central air conditioning may briefly draw 5–10 kW when the compressor starts. European homes typically use less: around 500–900 W average due to smaller spaces and more efficient appliances.',
  },
  {
    q: 'What is reactive power and how does it differ from real power?',
    a: 'Real power (watts) is power that actually does work — runs motors, lights bulbs, generates heat. Reactive power (volt-amperes reactive, VAR) is power that oscillates between source and load due to inductance and capacitance in AC circuits. It doesn\'t do useful work but must still flow through wires. The ratio of real to apparent (total) power is the power factor, ideally close to 1.0.',
  },
];

export const sidebarInfo = [
  { label: 'Base SI unit',    value: 'Watt (W)' },
  { label: 'Common units',    value: 'W · kW · MW · HP · BTU/hr' },
  { label: 'HP variants',     value: 'Mechanical · Electrical · Metric' },
  { label: 'Precision',       value: '6 significant figures' },
];
