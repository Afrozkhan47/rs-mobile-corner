import { business } from './business';

export const meetRahimContent = {
  humanLine: 'Every device is personally repaired by RBS.',
  role: `Founder · ${business.name}`,
  credentials: [
    { value: String(business.established), label: 'Established' },
    { value: business.experience, label: 'Years' },
    { value: business.repairs, label: 'Repairs' },
  ],
  timeline: ['Spark', 'Learning', '2021', 'Community', 'Today'] as const,
} as const;

export const founderMilestones = [
  {
    id: 'spark',
    title: 'The Spark',
    year: '',
    description:
      'A curiosity for how things work. From opening up old phones to understanding every component inside — the spark was lit early.',
    accent: '⚡',
  },
  {
    id: 'learning',
    title: 'Learning Mobile Repair',
    year: '',
    description:
      'Self-taught through countless hours of practice, YouTube tutorials, and hands-on experimentation. Every failed repair was a lesson.',
    accent: '🔧',
  },
  {
    id: 'opening',
    title: 'Opening Day',
    year: '2021',
    description:
      'Shop No. 5, Aurum Vrundavan, Dighi, Pune — RS Mobile Corner opened its doors. A small shop with big ambitions.',
    accent: '🏪',
  },
  {
    id: 'community',
    title: 'Growing Community',
    year: '',
    description:
      'Word spread through Dighi and beyond. Honest pricing, transparent diagnosis, and genuine care built a loyal customer base.',
    accent: '🤝',
  },
  {
    id: 'milestone',
    title: '500+ Repairs',
    year: '',
    description:
      'Half a thousand devices given a second life. From cracked screens to dead motherboards — every repair done personally.',
    accent: '🏆',
  },
  {
    id: 'trust',
    title: 'Trusted Local Brand',
    year: '',
    description:
      'Known across Dighi for honest repairs and transparent service. Rahim Bhai treats every device as if it were his own.',
    accent: '⭐',
  },
  {
    id: 'today',
    title: 'Today',
    year: '2026',
    description:
      'The journey continues. 6+ years of experience, a growing reputation, and a commitment to giving every phone a second life.',
    accent: '🚀',
  },
] as const;
