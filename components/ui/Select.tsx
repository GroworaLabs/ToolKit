import { useState, useRef, useEffect, useId, CSSProperties } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectGroup {
  group: string;
  options: SelectOption[];
}

type SelectItem = SelectOption | SelectGroup;

function isGroup(item: SelectItem): item is SelectGroup {
  return 'group' in item;
}

function flatOptions(items: SelectItem[]): SelectOption[] {
  return items.flatMap(item => isGroup(item) ? item.options : [item]);
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  items: SelectItem[];
  /** Visual overrides for the trigger (fontSize, fontWeight, fontFamily, padding…).
   *  Layout sizing (width, minWidth, maxWidth) also accepted here — extracted and
   *  applied to the wrapper so the trigger always fills its container. */
  style?: CSSProperties;
  placeholder?: string;
}

const IcoChevron = ({ open }: { open: boolean }) => (
  <svg
    width="14" height="14" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ flexShrink: 0, transition: 'transform .15s', transform: open ? 'rotate(180deg)' : 'none' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Select({ value, onChange, items, style, placeholder }: SelectProps) {
  const [open, setOpen]             = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const flat     = flatOptions(items);
  const selected = flat.find(o => o.value === value);

  // Separate layout props (go to wrapper) from visual props (go to trigger)
  const {
    width, minWidth, maxWidth,
    ...visualStyle
  } = style ?? {};

  const isAutoWidth = width === 'auto';

  const wrapStyle: CSSProperties = {
    position: 'relative',
    display:  isAutoWidth ? 'inline-flex' : 'block',
    width:    isAutoWidth ? undefined : (width ?? '100%'),
    minWidth,
    maxWidth,
  };

  useEffect(() => {
    if (!open) return;
    setHighlighted(value || flat[0]?.value || null);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open || !highlighted || !listRef.current) return;
    const el = listRef.current.querySelector<HTMLLIElement>(`[data-value="${CSS.escape(highlighted)}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlighted, open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown')) {
      e.preventDefault(); setOpen(true); return;
    }
    if (!open) return;
    const idx = flat.findIndex(o => o.value === highlighted);
    if      (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(flat[Math.min(idx + 1, flat.length - 1)]?.value ?? highlighted); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(flat[Math.max(idx - 1, 0)]?.value ?? highlighted); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (highlighted) { onChange(highlighted); setOpen(false); } }
    else if (e.key === 'Escape' || e.key === 'Tab') { setOpen(false); }
  };

  const triggerStyle: CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
    width: '100%',
    minHeight: 40,
    border: `1.5px solid ${open ? 'var(--green)' : 'var(--border)'}`,
    borderRadius: 'var(--r-s)',
    backgroundColor: 'var(--white)', color: 'var(--ink)',
    padding: '0 10px 0 12px',
    fontSize: 14, fontFamily: 'inherit', cursor: 'pointer',
    outline: 'none', boxSizing: 'border-box',
    boxShadow: open ? '0 0 0 3px rgba(5,150,105,.09)' : 'none',
    transition: 'border-color .15s, box-shadow .15s',
    userSelect: 'none',
    ...visualStyle,
  };

  const dropStyle: CSSProperties = {
    position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 999,
    minWidth: '100%',
    maxWidth: 'min(400px, calc(100vw - 32px))',
    background: 'var(--white)', border: '1.5px solid var(--border)',
    borderRadius: 'var(--r-m)', boxShadow: '0 4px 20px rgba(0,0,0,.12)',
    overflowY: 'auto', maxHeight: 'min(280px, 50vh)',
    padding: '4px 0', listStyle: 'none', margin: 0,
  };

  return (
    <div
      ref={rootRef}
      style={wrapStyle}
      role="combobox"
      aria-expanded={open}
      aria-haspopup="listbox"
      aria-controls={`${id}-list`}
      tabIndex={0}
      onKeyDown={handleKey}
      onClick={() => setOpen(v => !v)}
    >
      <div style={triggerStyle}>
        <span style={{
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
          color: selected ? 'var(--ink)' : 'var(--ink-4)',
        }}>
          {selected?.label ?? placeholder ?? '—'}
        </span>
        <IcoChevron open={open} />
      </div>

      {open && (
        <ul id={`${id}-list`} ref={listRef} role="listbox" style={dropStyle}>
          {items.map((item, gi) => {
            if (isGroup(item)) {
              return (
                <li key={gi}>
                  <div style={{
                    padding: '8px 14px 4px',
                    fontSize: 11, fontWeight: 700, color: 'var(--ink-3)',
                    textTransform: 'uppercase', letterSpacing: '.06em',
                  }}>
                    {item.group}
                  </div>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {item.options.map(opt => (
                      <OptionItem
                        key={opt.value} opt={opt}
                        selected={value === opt.value}
                        highlighted={highlighted === opt.value}
                        onHover={setHighlighted}
                        onSelect={v => { onChange(v); setOpen(false); }}
                        indent
                      />
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <OptionItem
                key={item.value} opt={item}
                selected={value === item.value}
                highlighted={highlighted === item.value}
                onHover={setHighlighted}
                onSelect={v => { onChange(v); setOpen(false); }}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

function OptionItem({ opt, selected, highlighted, onHover, onSelect, indent }: {
  opt: SelectOption; selected: boolean; highlighted: boolean;
  onHover: (v: string) => void; onSelect: (v: string) => void; indent?: boolean;
}) {
  return (
    <li
      role="option"
      aria-selected={selected}
      data-value={opt.value}
      onMouseEnter={() => onHover(opt.value)}
      onMouseDown={e => { e.preventDefault(); onSelect(opt.value); }}
      style={{
        minHeight: 44,
        padding: `0 ${indent ? 20 : 14}px`,
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 14, cursor: 'pointer',
        background: highlighted ? 'var(--page-bg)' : 'transparent',
        color: selected ? 'var(--green)' : 'var(--ink)',
        fontWeight: selected ? 600 : 400,
        transition: 'background .08s',
        userSelect: 'none',
      }}
    >
      <span style={{ width: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {selected && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {opt.label}
      </span>
    </li>
  );
}
