import { useState, useCallback } from 'react';

function parseIP(ip: string): number | null {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(Number);
  if (nums.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return null;
  return ((nums[0] << 24) | (nums[1] << 16) | (nums[2] << 8) | nums[3]) >>> 0;
}

function numToIP(n: number): string {
  return [
    (n >>> 24) & 255,
    (n >>> 16) & 255,
    (n >>> 8)  & 255,
     n & 255,
  ].join('.');
}

function numToBinary(n: number): string {
  return (n >>> 0).toString(2).padStart(32, '0').match(/.{8}/g)!.join('.');
}

interface SubnetInfo {
  networkAddress:   string;
  broadcastAddress: string;
  subnetMask:       string;
  wildcardMask:     string;
  firstHost:        string;
  lastHost:         string;
  totalHosts:       number;
  usableHosts:      number;
  ipBinary:         string;
  maskBinary:       string;
  networkBinary:    string;
  ipClass:          string;
}

function calcSubnet(ip: string, prefix: number): SubnetInfo | null {
  const ipNum = parseIP(ip);
  if (ipNum === null || prefix < 0 || prefix > 32) return null;

  const mask      = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
  const network   = (ipNum & mask) >>> 0;
  const broadcast = (network | (~mask >>> 0)) >>> 0;

  let firstHost: number, lastHost: number, usable: number;
  if (prefix >= 31) {
    firstHost = network;
    lastHost  = broadcast;
    usable    = Math.pow(2, 32 - prefix);
  } else {
    firstHost = (network + 1) >>> 0;
    lastHost  = (broadcast - 1) >>> 0;
    usable    = Math.pow(2, 32 - prefix) - 2;
  }

  const firstOctet = (ipNum >>> 24) & 255;
  const ipClass =
    firstOctet < 128 ? 'A' :
    firstOctet < 192 ? 'B' :
    firstOctet < 224 ? 'C' :
    firstOctet < 240 ? 'D (Multicast)' : 'E (Reserved)';

  return {
    networkAddress:   numToIP(network),
    broadcastAddress: numToIP(broadcast),
    subnetMask:       numToIP(mask),
    wildcardMask:     numToIP(~mask >>> 0),
    firstHost:        numToIP(firstHost),
    lastHost:         numToIP(lastHost),
    totalHosts:       Math.pow(2, 32 - prefix),
    usableHosts:      usable,
    ipBinary:         numToBinary(ipNum),
    maskBinary:       numToBinary(mask),
    networkBinary:    numToBinary(network),
    ipClass,
  };
}

const IcoCopy  = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IcoCheck = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

function CopyValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 13, color: 'var(--ink-2)', minWidth: 160 }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{value}</code>
        <button onClick={copy}
          style={{ padding: '3px 7px', fontSize: 11, background: 'none', border: '1px solid var(--border)', borderRadius: 'var(--r-s)', cursor: 'pointer', color: copied ? 'var(--green)' : 'var(--ink-3)', display: 'flex', alignItems: 'center' }}>
          {copied ? <IcoCheck /> : <IcoCopy />}
        </button>
      </div>
    </div>
  );
}

function BinaryRow({ label, binary, prefix }: { label: string; binary: string; prefix?: number }) {
  const parts = binary.split('.');
  return (
    <div style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 4 }}>{label}</div>
      <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', letterSpacing: 1 }}>
        {parts.map((octet, i) => (
          <span key={i}>
            {i > 0 && <span style={{ color: 'var(--ink-4)' }}>.</span>}
            {prefix !== undefined
              ? octet.split('').map((bit, j) => {
                  const pos = i * 8 + j;
                  return (
                    <span key={j} style={{ color: pos < prefix ? 'var(--green)' : 'var(--ink)' }}>{bit}</span>
                  );
                })
              : octet}
          </span>
        ))}
      </code>
    </div>
  );
}

export default function IpCidrCalculatorWidget() {
  const [ip,     setIp]     = useState('192.168.1.0');
  const [prefix, setPrefix] = useState(24);
  const [error,  setError]  = useState('');

  const handleIpChange = useCallback((val: string) => {
    setIp(val);
    setError('');
  }, []);

  const handlePrefixChange = useCallback((val: string) => {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 0 && n <= 32) { setPrefix(n); setError(''); }
  }, []);

  const result = calcSubnet(ip, prefix);
  if (!result && ip.includes('.') && ip.split('.').length === 4) {
    // only show error after user has typed a full IP
  }

  const inputStyle: React.CSSProperties = {
    padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)',
    fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: 'var(--ink)',
    background: 'var(--white)', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div>
      {/* Input row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={e => handleIpChange(e.target.value)}
            placeholder="192.168.1.0"
            style={inputStyle}
            spellCheck={false}
          />
        </div>
        <div style={{ width: 110 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Prefix</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink-3)', lineHeight: 1 }}>/</span>
            <input
              type="number"
              min={0}
              max={32}
              value={prefix}
              onChange={e => handlePrefixChange(e.target.value)}
              style={{ ...inputStyle, width: 74 }}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      {result ? (
        <>
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', padding: '0 16px', marginBottom: 16, boxShadow: 'var(--sh-xs)' }}>
            <CopyValue label="Network address"   value={result.networkAddress} />
            <CopyValue label="Broadcast address" value={result.broadcastAddress} />
            <CopyValue label="Subnet mask"        value={result.subnetMask} />
            <CopyValue label="Wildcard mask"      value={result.wildcardMask} />
            <CopyValue label="First host"         value={result.firstHost} />
            <CopyValue label="Last host"          value={result.lastHost} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Total addresses</span>
              <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{result.totalHosts.toLocaleString()}</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Usable hosts</span>
              <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>{result.usableHosts.toLocaleString()}</code>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
              <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>IP class</span>
              <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>Class {result.ipClass}</code>
            </div>
          </div>

          {/* Binary breakdown */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', padding: '12px 16px', boxShadow: 'var(--sh-xs)' }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 8px' }}>Binary breakdown</p>
            <p style={{ fontSize: 11, color: 'var(--ink-4)', margin: '0 0 10px' }}>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>Green</span> = network bits &nbsp;|&nbsp; Black = host bits
            </p>
            <BinaryRow label={`IP address (${ip})`} binary={result.ipBinary} prefix={prefix} />
            <BinaryRow label={`Subnet mask (${result.subnetMask})`} binary={result.maskBinary} prefix={prefix} />
            <BinaryRow label={`Network address (${result.networkAddress})`} binary={result.networkBinary} prefix={prefix} />
          </div>
        </>
      ) : (
        <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--ink-4)', fontSize: 13, background: 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
          Enter a valid IPv4 address (e.g. 10.0.0.0) and prefix length (0–32)
        </div>
      )}
    </div>
  );
}
