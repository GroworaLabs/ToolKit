import {FaqItem} from "@/lib/types";


interface FaqSectionProps {
    items: FaqItem[];
    title?: string;
}

export function FaqSection({ items, title = 'Common questions' }: FaqSectionProps) {
    return (
        <section style={{ maxWidth: 640, margin: '64px auto 0', padding: '0 16px' }}>
            <p className="ov" style={{ marginBottom: 10 }}>FAQ</p>
            <h2 className="hdg" style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', marginBottom: 24 }}>
                {title}
            </h2>
            {items.map(item => (
                <details key={item.q} className="faq-item">
                    <summary>
                        <span>{item.q}</span>
                        <span className="faq-chevron" aria-hidden>+</span>
                    </summary>
                    <p className="faq-body">{item.a}</p>
                </details>
            ))}
        </section>
    );
}