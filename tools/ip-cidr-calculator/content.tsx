export default function IpCidrCalculatorContent() {
  const h2   = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)' as const, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 };
  const p    = { fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 } as const;
  const h3   = { fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8, marginTop: 20 } as const;
  const code = { fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 } as const;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>

      {/* ── What is CIDR ──────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>What is CIDR notation — and why it replaced IP address classes</h2>
        <p style={p}>
          <strong style={{ color: 'var(--ink)' }}>CIDR (Classless Inter-Domain Routing)</strong> is the standard method for specifying IP address ranges and routing prefixes. Introduced in RFC 1519 in 1993, it replaced the rigid class-based system that was rapidly exhausting the IPv4 address space. In CIDR notation, a network is written as an IP address followed by a slash and the prefix length: <strong style={{ color: 'var(--ink)' }}>192.168.1.0/24</strong>. The number after the slash specifies how many leading bits are the network portion — the remaining bits identify individual hosts within that network.
        </p>
        <p style={p}>
          Before CIDR, IPv4 addresses were divided into rigid classes based purely on the first octet. Class A (/8) had 126 networks with ~16.7 million hosts each. Class B (/16) had 16,384 networks with ~65,000 hosts each. Class C (/24) had 2 million networks with 254 hosts each. This was catastrophically wasteful: a company needing 1,000 IP addresses had to receive a full Class B block with 65,534 usable addresses, leaving 64,534 addresses permanently unused and unavailable to others. By the early 1990s, Class B addresses were nearly exhausted.
        </p>
        <p style={p}>
          CIDR solved this by allowing any prefix length from /0 (the entire internet) to /32 (a single host). Need 1,000 addresses? Take a /22 (1,022 usable hosts). Need 30? Take a /27 (30 usable hosts). CIDR also enabled <strong style={{ color: 'var(--ink)' }}>route aggregation (supernetting)</strong>: multiple smaller network prefixes can be summarised into a single routing entry, dramatically reducing the size of internet routing tables. The global BGP routing table would be millions of entries without CIDR aggregation; with it, it is managed at a few hundred thousand prefixes.
        </p>
      </section>

      {/* ── Subnet mask and math ──────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Subnet masks, network addresses, and broadcast addresses</h2>
        <p style={p}>
          Every IPv4 address is a 32-bit number, typically written in dotted-decimal notation (four octets of 0–255). A subnet mask is a 32-bit number that has consecutive 1s from the left for the network bits and 0s for the host bits. The prefix length and subnet mask are two representations of the same concept: /24 and 255.255.255.0 are identical.
        </p>

        <h3 style={h3}>Network address</h3>
        <p style={p}>
          The network address is computed by performing a bitwise AND of the host IP address with the subnet mask. All host bits are set to zero. For example, with IP <code style={code}>192.168.10.50</code> and prefix /26 (mask <code style={code}>255.255.255.192</code>): the bitwise AND yields <code style={code}>192.168.10.0</code> as the network address. This address identifies the subnet itself and cannot be assigned to any host.
        </p>

        <h3 style={h3}>Broadcast address</h3>
        <p style={p}>
          The broadcast address is computed by setting all host bits to 1. For the /26 example, the host portion is 6 bits, so the broadcast is <code style={code}>192.168.10.63</code> (network address OR wildcard mask: <code style={code}>192.168.10.0 OR 0.0.0.63</code>). Packets sent to the broadcast address are delivered to every host on the subnet. Routers do not forward broadcast packets between subnets — one of the primary reasons to segment large networks into smaller subnets.
        </p>

        <h3 style={h3}>Usable host range</h3>
        <p style={p}>
          Usable hosts are all addresses between the network address (exclusive) and the broadcast address (exclusive). For a /26 subnet: <code style={code}>192.168.10.1</code> through <code style={code}>192.168.10.62</code> — 62 usable hosts. The general formula is 2^(32 − prefix) − 2. Exceptions: /31 (RFC 3021, point-to-point links, 0 reserved addresses, 2 usable) and /32 (single host route, 1 "usable" address representing itself).
        </p>

        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Prefix', 'Subnet mask', 'Total IPs', 'Usable hosts', 'Common use'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['/8',  '255.0.0.0',       '16,777,216', '16,777,214', 'ISP / large enterprise'],
                ['/16', '255.255.0.0',     '65,536',     '65,534',     'Large corporate LAN'],
                ['/20', '255.255.240.0',   '4,096',      '4,094',      'Medium campus/VPC'],
                ['/24', '255.255.255.0',   '256',        '254',        'Typical office subnet'],
                ['/25', '255.255.255.128', '128',        '126',        'Half a /24'],
                ['/26', '255.255.255.192', '64',         '62',         'Small VLAN / department'],
                ['/27', '255.255.255.224', '32',         '30',         'Small segment (~30 devices)'],
                ['/28', '255.255.255.240', '16',         '14',         'Small server group'],
                ['/29', '255.255.255.248', '8',          '6',          'Tiny segment / ISP hand-off'],
                ['/30', '255.255.255.252', '4',          '2',          'WAN point-to-point link'],
                ['/31', '255.255.255.254', '2',          '2',          'P2P links (RFC 3021)'],
                ['/32', '255.255.255.255', '1',          '1 (host)',   'Loopback / host route'],
              ].map(([pfx, mask, total, usable, use], i) => (
                <tr key={pfx} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>{pfx}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-2)' }}>{mask}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{total}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', fontWeight: 600 }}>{usable}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Private ranges ────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>Private IP address ranges — RFC 1918 and beyond</h2>
        <p style={p}>
          RFC 1918 (1996) reserves three IP ranges exclusively for private use — they are never routed on the public internet, and any router receiving a packet destined for these addresses will drop it unless it is on a local private network. NAT (Network Address Translation) allows entire private networks to share a single public IP address for internet access.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                {['Range', 'CIDR', 'Addresses', 'Typical use'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['10.0.0.0 – 10.255.255.255',     '10.0.0.0/8',     '~16.7 million', 'Large enterprises, cloud VPCs (AWS default VPC)'],
                ['172.16.0.0 – 172.31.255.255',   '172.16.0.0/12',  '~1 million',    'Medium business; Docker default bridge (172.17.0.0/16)'],
                ['192.168.0.0 – 192.168.255.255', '192.168.0.0/16', '~65,000',       'Home routers (192.168.1.0/24, 192.168.0.0/24)'],
              ].map(([range, cidr, addrs, use], i) => (
                <tr key={cidr} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)' }}>{range}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--green)', fontWeight: 700 }}>{cidr}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{addrs}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--ink-2)', fontSize: 13 }}>{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={p}>
          Beyond RFC 1918, several other important ranges are reserved. <code style={code}>127.0.0.0/8</code> is the loopback range — <code style={code}>127.0.0.1</code> is localhost, always pointing to the local machine regardless of network configuration. <code style={code}>169.254.0.0/16</code> is the link-local (APIPA) range — Windows and macOS auto-assign addresses here when DHCP fails. <code style={code}>100.64.0.0/10</code> (RFC 6598) is reserved for ISP Carrier-Grade NAT (CGNAT), which allows ISPs to share fewer public IPs among many customers.
        </p>
      </section>

      {/* ── CIDR in cloud and containers ─────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>CIDR in cloud environments, Kubernetes, and Docker</h2>
        <p style={p}>
          CIDR notation is fundamental to modern cloud networking. Every major cloud provider uses CIDR to define VPC (Virtual Private Cloud) networks, subnets, security groups, and routing tables. Understanding CIDR is a prerequisite for any work involving cloud infrastructure.
        </p>

        <h3 style={h3}>AWS VPC</h3>
        <p style={p}>
          When you create an AWS VPC, you assign a CIDR block — typically a /16 (65,536 addresses) from the 10.0.0.0/8 space, such as <code style={code}>10.0.0.0/16</code>. You then divide this into subnets across availability zones: a /24 per AZ is common, giving 254 usable hosts per AZ. Security groups use CIDR notation to specify allowed source/destination ranges: <code style={code}>10.0.0.0/8</code> for all internal traffic, or <code style={code}>0.0.0.0/0</code> for any address (used cautiously for internet-facing services).
        </p>

        <h3 style={h3}>Kubernetes pod and service CIDRs</h3>
        <p style={p}>
          Kubernetes assigns CIDR ranges to pods and services separately. A typical cluster configuration might use <code style={code}>10.244.0.0/16</code> for pod IPs (assigned by CNI plugins like Flannel or Calico) and <code style={code}>10.96.0.0/12</code> for service ClusterIPs. Each node receives a /24 slice of the pod CIDR: node 1 gets <code style={code}>10.244.0.0/24</code>, node 2 gets <code style={code}>10.244.1.0/24</code>, and so on. These CIDRs must not overlap with the host network or VPC subnets.
        </p>

        <h3 style={h3}>Docker networking</h3>
        <p style={p}>
          Docker creates a default bridge network at <code style={code}>172.17.0.0/16</code> and assigns each container an IP from that range. When you create a custom Docker network, you can specify the CIDR: <code style={code}>docker network create --subnet=192.168.100.0/24 mynet</code>. Docker Compose assigns subnets automatically from the <code style={code}>172.16.0.0/12</code> range. Understanding these CIDRs is important when containers need to communicate with host services or when debugging connectivity issues.
        </p>
      </section>

      {/* ── VLANs and subnets ─────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>VLANs vs subnets — network segmentation strategies</h2>
        <p style={p}>
          VLANs (Virtual LANs, IEEE 802.1Q) and IP subnets are two different but complementary mechanisms for network segmentation. VLANs operate at Layer 2 (the data link layer) and segment broadcast domains at the Ethernet level. IP subnets operate at Layer 3 (the network layer) and define IP routing boundaries. In practice, each VLAN is almost always mapped 1:1 to an IP subnet.
        </p>
        <p style={p}>
          A typical enterprise network might have: VLAN 10 → <code style={code}>192.168.10.0/24</code> (employee workstations), VLAN 20 → <code style={code}>192.168.20.0/24</code> (IP phones and video conferencing), VLAN 30 → <code style={code}>192.168.30.0/24</code> (servers), VLAN 40 → <code style={code}>192.168.40.0/24</code> (guest Wi-Fi — isolated from internal). Traffic between VLANs requires routing (typically by a Layer 3 switch or firewall), which allows access control policies to be enforced between segments.
        </p>
        <p style={p}>
          <strong style={{ color: 'var(--ink)' }}>VLSM (Variable Length Subnet Masking)</strong> takes CIDR further by using different prefix lengths within the same address space. For example, a /24 allocated to an office might be divided into a /26 for servers (62 IPs), two /27s for workstations (30 IPs each), and a /28 for printers (14 IPs) — allocating exactly as many addresses as each segment needs without wasting IP space.
        </p>
      </section>

      {/* ── IPv6 brief ───────────────────────────────── */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={h2}>IPv6 and CIDR — the next generation</h2>
        <p style={p}>
          IPv6 uses 128-bit addresses (compared to IPv4's 32 bits), providing approximately 340 undecillion (3.4 × 10³⁸) addresses — enough for every grain of sand on Earth to have its own address multiple times over. IPv6 also uses CIDR notation, but with different typical prefix sizes.
        </p>
        <p style={p}>
          A typical IPv6 allocation hierarchy: an ISP receives a /32 from a Regional Internet Registry. The ISP allocates /48 blocks to customers. A customer's /48 provides 2¹⁶ = 65,536 possible /64 subnets. Each /64 subnet can hold 2⁶⁴ ≈ 18 quintillion addresses. The convention is to assign entire /64 subnets even to point-to-point links (where IPv4 would use a /30 with just 4 addresses). Storage is abundant enough that conservation is no longer the primary concern.
        </p>
        <p style={p}>
          IPv6 addresses use colon-separated hexadecimal groups: <code style={code}>2001:db8::/32</code> is the documentation range (like 192.168.0.0/16 for IPv4). <code style={code}>::1</code> is the IPv6 loopback (like 127.0.0.1). <code style={code}>fe80::/10</code> is the link-local range. <code style={code}>fc00::/7</code> is the Unique Local Address (ULA) range — the IPv6 equivalent of RFC 1918 private addresses.
        </p>
      </section>

    </div>
  );
}
