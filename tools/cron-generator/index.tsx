import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is a cron expression?',
    a: 'A cron expression is a string of 5 (or 6) fields that defines when a scheduled task should run. The fields represent minute, hour, day-of-month, month, and day-of-week — separated by spaces. For example, "0 9 * * 1-5" means "at 09:00 every weekday". Cron is used in Unix/Linux systems, cloud schedulers (AWS EventBridge, GCP Cloud Scheduler), GitHub Actions, and most backend job frameworks.',
  },
  {
    q: 'What do the 5 cron fields mean?',
    a: 'Field 1 — Minute (0-59): which minute of the hour. Field 2 — Hour (0-23): which hour of the day (0 = midnight). Field 3 — Day of month (1-31): which day of the month. Field 4 — Month (1-12 or JAN-DEC): which month. Field 5 — Day of week (0-6 or SUN-SAT, where 0 = Sunday): which day of the week. An asterisk (*) means "every value" for that field.',
  },
  {
    q: 'What does the asterisk (*) mean in a cron expression?',
    a: 'An asterisk (*) is a wildcard meaning "every valid value". In the minute field, * means "every minute". In the month field, * means "every month". "* * * * *" means "every minute of every hour of every day". It\'s the most permissive value for any field.',
  },
  {
    q: 'What is the difference between */5 and 0-59/5?',
    a: 'Both mean "every 5 units", but the step syntax */5 is shorthand for the full range with a step — equivalent to 0-59/5 in the minute field. "*/5" in the minute field means "at minutes 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55". The slash (/) means "step" or "every N".',
  },
  {
    q: 'Can I specify multiple values or ranges in one field?',
    a: 'Yes. Use commas for lists: "1,15,30" in the minute field means "at minutes 1, 15, and 30". Use hyphens for ranges: "1-5" in the day-of-week field means "Monday through Friday". Combine them: "0,30 9-17 * * 1-5" means "at :00 and :30 of each hour from 9am to 5pm, weekdays only".',
  },
  {
    q: 'What timezone does cron use?',
    a: 'Traditional cron on Linux/Unix runs in the system timezone, which is usually UTC on servers. Cloud schedulers (AWS EventBridge, GCP Cloud Scheduler) let you specify a timezone explicitly. When in doubt, always write cron expressions in UTC and convert to local time in your documentation — this prevents daylight saving time bugs.',
  },
  {
    q: 'What is the difference between day-of-month and day-of-week?',
    a: 'Day-of-month (field 3) targets a specific calendar day: "15" means "on the 15th of every month". Day-of-week (field 5) targets a day name: "1" means "every Monday". When both are specified (not *), most cron implementations run the job if EITHER condition is true. To run on "the first Monday of the month" requires additional scripting logic — cron alone cannot express that.',
  },
  {
    q: 'How do I run a job every 30 minutes?',
    a: '"*/30 * * * *" runs at minute 0 and 30 of every hour (midnight, 00:30, 01:00, 01:30, ...). Alternatively "0,30 * * * *" is identical and more explicit. Do not use "30 * * * *" — that means "at minute 30 of every hour", which is once per hour, not every 30 minutes.',
  },
  {
    q: 'Does this generator support 6-field cron with seconds?',
    a: 'The standard Unix cron format has 5 fields (minute to day-of-week). Some systems like Spring Framework (@Scheduled), Quartz Scheduler, and AWS cron rules support a 6th field for seconds at the beginning. This generator produces standard 5-field expressions compatible with crontab, GitHub Actions, GCP, and most schedulers. Check your platform\'s documentation if you need sub-minute precision.',
  },
];

export const cronPresets = [
  { label: 'Every minute',       expr: '* * * * *',     desc: 'Runs at minute 0, 1, 2, … of every hour'        },
  { label: 'Every 5 minutes',    expr: '*/5 * * * *',   desc: 'Runs at :00, :05, :10, … of every hour'         },
  { label: 'Every 30 minutes',   expr: '*/30 * * * *',  desc: 'Runs at :00 and :30 of every hour'              },
  { label: 'Every hour',         expr: '0 * * * *',     desc: 'Runs at the start of every hour'                 },
  { label: 'Every day at 9am',   expr: '0 9 * * *',     desc: 'Runs at 09:00 UTC every day'                    },
  { label: 'Every weekday 9am',  expr: '0 9 * * 1-5',   desc: 'Runs at 09:00 UTC Monday–Friday'                },
  { label: 'Every Sunday midnight', expr: '0 0 * * 0',  desc: 'Runs at 00:00 UTC every Sunday'                 },
  { label: 'Every month 1st',    expr: '0 0 1 * *',     desc: 'Runs at midnight on the 1st of each month'      },
];
