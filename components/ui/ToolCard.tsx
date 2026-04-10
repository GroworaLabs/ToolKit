import Link from 'next/link';
import type { ToolMeta } from '../../lib/types';
import { TOOL_ICONS } from '../icons';

interface ToolCardProps {
    tool: ToolMeta;
}

export function ToolCard({ tool }: ToolCardProps) {
    const Icon = TOOL_ICONS[tool.slug] ?? (() => null);

    if (tool.live) {
        const href = `/tools/${tool.slug}`;
        return (
            <Link href={href} className="tc-live">
                <div className="ti"><Icon size={15} /></div>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{tool.name}</div>
                    <div className="tc-tagline" style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 3 }}>{tool.tagline}</div>
                </div>
                <span className="badge b-green">Live</span>
            </Link>
        );
    }

    return (
        <div className="tc-soon" aria-disabled="true" title="Coming soon">
            <div className="ti"><Icon size={15} /></div>
            <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1.2 }}>{tool.name}</div>
                <div className="tc-tagline" style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 3 }}>{tool.tagline}</div>
            </div>
            <span className="badge b-gray">Soon</span>
        </div>
    );
}