import Link from 'next/link';
import type { GuideMeta } from '../../lib/types';

interface GuideCardProps {
  guide: GuideMeta;
}

export function GuideCard({ guide }: GuideCardProps) {
  const date = guide.publishedAt
    ? new Date(guide.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  return (
    <Link href={`/guides/${guide.slug}`} className="guide-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
        <span className="badge b-blue" style={{ flexShrink: 0 }}>{guide.category}</span>
        {date && (
          <span style={{ fontSize: 11, color: 'var(--ink-3)', flexShrink: 0 }}>{date}</span>
        )}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.35, marginBottom: 6 }}>
        {guide.title}
      </div>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>
        {guide.description}
      </div>
      {guide.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
          {guide.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 11, padding: '2px 7px',
                background: 'var(--page-bg)', border: '1px solid var(--border)',
                borderRadius: 99, color: 'var(--ink-3)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
