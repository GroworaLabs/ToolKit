import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is torque?',
    a: 'Torque is a rotational force — the tendency of a force to rotate an object around an axis. It equals the applied force multiplied by the perpendicular distance from the axis (the moment arm). A longer wrench handle produces more torque with the same force, which is why mechanics use breaker bars to loosen stubborn bolts.',
  },
  {
    q: 'What is the difference between Newton-metres and foot-pounds?',
    a: 'Both measure torque but use different unit systems. Newton-metres (N·m) is the SI standard: one N·m is the torque produced by one newton of force applied one metre from the axis. Foot-pounds (ft·lb) is the imperial unit: one ft·lb is one pound of force applied one foot from the axis. One ft·lb equals approximately 1.356 N·m.',
  },
  {
    q: 'Why do vehicle torque specs switch between ft-lb and N·m by market?',
    a: 'North American service manuals traditionally use ft·lb while European and international standards use N·m. The same specification — say, 100 N·m for a cylinder head bolt — appears as 74 ft·lb in a US manual. Using the wrong unit and torquing to the wrong number is a common mistake; always verify which unit your torque wrench is calibrated in.',
  },
  {
    q: 'What is a kilogram-force metre (kgf·m)?',
    a: 'A kgf·m is the torque produced by a one-kilogram weight acting at one metre from the pivot. It\'s an older metric unit still found in some Japanese and Eastern European vehicle documentation. One kgf·m equals 9.807 N·m, approximately 7.233 ft·lb. Most modern standards have replaced kgf·m with N·m.',
  },
  {
    q: 'How does torque relate to horsepower in an engine?',
    a: 'Horsepower is derived from torque and engine speed: HP = (Torque in ft·lb × RPM) ÷ 5252. Or in SI: kW = (N·m × RPM) ÷ 9549. At exactly 5,252 RPM, torque in ft·lb and horsepower are always numerically equal. Torque describes the pulling force available; power describes how fast that force can be applied.',
  },
  {
    q: 'What torque is typically needed to tighten wheel nuts?',
    a: 'Lug nut torque varies by vehicle but typical values range from 80–130 N·m (59–96 ft·lb) for passenger cars to 400–600 N·m (295–443 ft·lb) for large trucks. Always follow the manufacturer\'s specification in the owner\'s manual or service data. Over-torquing can stretch wheel studs; under-torquing risks wheel separation.',
  },
  {
    q: 'What is the difference between torque and moment of force?',
    a: 'In engineering, torque specifically refers to a twisting force that causes rotation about an axis (like tightening a bolt), while moment refers to a bending force that tends to cause rotation but not necessarily spinning (like a beam deflecting under load). In everyday usage and most conversion contexts, the terms are interchangeable and both are measured in N·m or ft·lb.',
  },
  {
    q: 'How accurate are click-type torque wrenches?',
    a: 'Quality click-type torque wrenches are typically accurate to ±4% of the displayed value per ISO 6789. A wrench set to 100 N·m will deliver between 96 and 104 N·m under ideal conditions. For critical fasteners (engine internals, brake caliper bolts, wheel nuts), have your torque wrench calibrated annually — click wrenches drift with use and especially after being dropped.',
  },
];

export const sidebarInfo = [
  { label: 'SI unit',      value: 'Newton-metre (N·m)' },
  { label: 'Imperial',     value: 'ft·lb · in·lb' },
  { label: 'Metric legacy', value: 'kgf·m · kgf·cm' },
  { label: 'Precision',    value: '6 significant figures' },
];
