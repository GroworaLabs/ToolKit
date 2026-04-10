import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'How is reading time calculated?',
    a: 'Reading time is calculated by dividing the word count by your selected reading speed in words per minute (WPM). For example, a 1,200-word article at 238 WPM takes approximately 5 minutes. The average adult reading speed is 238 WPM according to research published in Reading Psychology. Adjust the WPM slider to match your own pace.',
  },
  {
    q: 'What is the average adult reading speed?',
    a: 'The average adult reads 200–250 words per minute for non-fiction and slightly faster for fiction. Research by Marc Brysbaert (2019, Reading Psychology) found the average silent reading rate to be 238 WPM. Skilled readers reach 300–400 WPM without speed-reading techniques. The default in this tool is 238 WPM.',
  },
  {
    q: 'What is speaking time and how is it different from reading time?',
    a: 'Speaking time estimates how long it would take to read the text aloud — useful for speeches, podcasts, presentations, and voiceovers. The average speaking rate is 130–150 WPM, significantly slower than silent reading. This tool uses 140 WPM as the default speaking speed. Adjust it if you speak faster or slower.',
  },
  {
    q: 'Can I enter a word count directly without pasting text?',
    a: 'Yes. Switch to "Word count" mode using the tab selector. Enter any number and the tool instantly shows reading and speaking time. This is useful when you know the target length of an article you haven\'t written yet, or when checking if a piece fits within a time slot.',
  },
  {
    q: 'What WPM should I use for different content types?',
    a: 'Use 150–180 WPM for dense technical content, legal documents, or academic papers where comprehension matters more than speed. Use 238 WPM (default) for standard blog posts and non-fiction. Use 280–320 WPM for light fiction or content you\'re already familiar with. For presentations, 120–140 WPM is standard for clear speech with pauses.',
  },
  {
    q: 'How accurate is the reading time estimate?',
    a: 'The estimate is accurate for simple continuous text. It doesn\'t account for code blocks (which take longer to parse), images, tables, or re-reading dense passages. For technical documentation or reference material, actual reading time is typically 20–40% longer than the estimate. For narrative content it\'s quite accurate.',
  },
  {
    q: 'Why do Medium, Substack and other platforms show different reading times?',
    a: 'Platforms use slightly different WPM baselines: Medium uses ~265 WPM, some platforms use 200 WPM. They may also include or exclude code, images, and embeds differently. The estimates will be close but rarely identical. This tool lets you set your own WPM so you can match whatever baseline you prefer.',
  },
  {
    q: 'Is my text stored or sent to any server?',
    a: 'No. All analysis runs locally in your browser using JavaScript. Your text is never transmitted to any server, logged, or stored. The tool is safe to use with unpublished drafts, confidential documents, or any private content.',
  },
];

export const readingStats = [
  { label: 'Average reading speed',  value: '238 WPM',  desc: 'Silent reading — adult average (Brysbaert, 2019)' },
  { label: 'Average speaking speed',  value: '140 WPM',  desc: 'Presentation / podcast / voiceover pace'          },
  { label: 'Technical content',       value: '150 WPM',  desc: 'Code, legal, academic — slower for comprehension' },
  { label: 'Speed reading',           value: '400+ WPM', desc: 'Reduced comprehension at this pace'               },
];
