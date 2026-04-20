import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is the difference between energy and power?',
    a: 'Energy is the total amount of work done or heat transferred, measured in joules, kilowatt-hours, or calories. Power is the rate at which energy is used or produced, measured in watts (joules per second). A 1,000 W microwave running for 5 minutes uses 5,000 watt-seconds = 5 kJ of energy. You can convert power units with our Power Converter.',
  },
  {
    q: 'What is the difference between a calorie and a kilocalorie?',
    a: 'A calorie (cal, also called a "small calorie" or "gram calorie") is the energy needed to raise the temperature of 1 gram of water by 1 °C. A kilocalorie (kcal) equals 1,000 calories and is the unit used on food labels — what Americans call a "Calorie" with a capital C is actually a kilocalorie. A banana (about 100 kcal) contains 418,680 joules of chemical energy.',
  },
  {
    q: 'How many joules are in a kilowatt-hour?',
    a: 'One kilowatt-hour equals exactly 3,600,000 joules (3.6 MJ). The conversion follows directly from the definition: 1 kW = 1,000 J/s, and 1 hour = 3,600 seconds, so 1 kWh = 1,000 × 3,600 = 3,600,000 J. The kilowatt-hour is the standard unit for billing electrical energy consumption on utility bills.',
  },
  {
    q: 'What is a BTU and when is it used?',
    a: 'A British Thermal Unit (BTU) is the amount of heat needed to raise the temperature of one pound of water by one degree Fahrenheit. It equals approximately 1,055 joules. BTUs are widely used in the United States for rating heating and cooling equipment (furnaces, air conditioners), natural gas billing, and comparing fuel energy content.',
  },
  {
    q: 'What is an electronvolt and who uses it?',
    a: 'An electronvolt (eV) is the energy gained by a single electron accelerating through a 1-volt electric potential difference. It equals 1.602 × 10⁻¹⁹ joules — an incredibly tiny amount by everyday standards. Particle physicists and semiconductor engineers use electronvolts because atomic-scale energies fall in convenient eV ranges: visible light photons are 1.7–3.3 eV, X-rays are thousands of eV (keV), and particle colliders operate at billions of eV (GeV) or trillions (TeV).',
  },
  {
    q: 'How do I convert between food calories and exercise energy?',
    a: 'Food energy in kilocalories (kcal) converts directly: 1 kcal = 4,186.8 J ≈ 4.19 kJ. A 70 kg person running at moderate pace burns roughly 400–600 kcal per hour (1.67–2.51 MJ). To burn off a 250 kcal chocolate bar, you would need about 25–30 minutes of running. The body is roughly 20–25% mechanically efficient, meaning most of that energy becomes heat rather than forward motion.',
  },
  {
    q: 'What is a therm and how does it relate to natural gas?',
    a: 'A therm equals exactly 100,000 BTU or about 105.5 MJ. It is the standard billing unit for natural gas in the US and UK. One therm is approximately the energy in 100 cubic feet (1 CCF) of natural gas at standard conditions. US households typically use 50–100 therms per month during heating season and 15–30 therms in summer (for cooking and hot water only).',
  },
  {
    q: 'How much energy does a typical household use per year?',
    a: 'The average US household consumes about 10,500 kWh of electricity per year (37.8 GJ) plus about 500–700 therms of natural gas (52.8–73.9 GJ) for heating and hot water. Total primary energy is roughly 90–110 GJ per year. European households typically use less — about 3,500–4,500 kWh of electricity and less gas due to smaller homes and more efficient appliances.',
  },
];

export const sidebarInfo = [
  { label: 'Base SI unit',    value: 'Joule (J)' },
  { label: 'Common units',    value: 'J · kJ · kcal · kWh · BTU' },
  { label: 'Thermal',         value: 'cal · kcal · BTU · therm' },
  { label: 'Precision',       value: '6 significant figures' },
];
