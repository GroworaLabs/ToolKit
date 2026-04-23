import type { FaqItem } from '@/lib/types';

export const faq: FaqItem[] = [
  {
    q: 'What is CIDR notation?',
    a: 'CIDR (Classless Inter-Domain Routing) notation expresses an IP address and its network prefix together. For example, 192.168.1.0/24 means the IP 192.168.1.0 with a 24-bit prefix, which translates to the subnet mask 255.255.255.0. The number after the slash specifies how many leading bits are the network portion — the remaining bits identify individual hosts.',
  },
  {
    q: 'What is a subnet mask?',
    a: 'A subnet mask is a 32-bit number that separates the network and host portions of an IP address. It has consecutive 1s on the left and 0s on the right. 255.255.255.0 (/24) means the first 24 bits are the network address and the last 8 bits are for hosts (256 addresses, 254 usable). 255.255.0.0 (/16) gives 65,536 addresses. Subnet masks are equivalent to CIDR prefixes.',
  },
  {
    q: 'How many usable hosts does a /24 subnet have?',
    a: 'A /24 subnet (255.255.255.0) has 2⁸ = 256 total addresses, but two are reserved: the network address (all host bits = 0, e.g., 192.168.1.0) and the broadcast address (all host bits = 1, e.g., 192.168.1.255). That leaves 254 usable host addresses. As a general rule: usable hosts = 2^(32 − prefix) − 2, except for /31 (point-to-point links, RFC 3021) and /32 (single host).',
  },
  {
    q: 'What is a broadcast address?',
    a: 'The broadcast address is the last address in a subnet — all host bits are set to 1. Packets sent to the broadcast address are delivered to every host on that subnet. For 192.168.1.0/24, the broadcast address is 192.168.1.255. Routers do not forward broadcast packets between subnets, which is why large networks are divided into smaller subnets.',
  },
  {
    q: 'What are private IP address ranges?',
    a: 'RFC 1918 defines three private IP ranges not routed on the public internet: 10.0.0.0/8 (10.0.0.0–10.255.255.255, ~16.7 million addresses), 172.16.0.0/12 (172.16.0.0–172.31.255.255, ~1 million addresses), and 192.168.0.0/16 (192.168.0.0–192.168.255.255, ~65,000 addresses). These are used for home networks, corporate intranets, and cloud VPCs (Virtual Private Clouds).',
  },
  {
    q: 'What is a wildcard mask?',
    a: 'A wildcard mask is the bitwise inverse of a subnet mask. Where the subnet mask has 1s (network bits), the wildcard mask has 0s; where the subnet mask has 0s (host bits), the wildcard mask has 1s. For a /24 subnet, the wildcard mask is 0.0.0.255. Wildcard masks are used in Cisco ACLs (access control lists) and OSPF routing configurations to match ranges of IP addresses.',
  },
  {
    q: 'What is the difference between /30, /31, and /32?',
    a: 'A /30 subnet has 4 addresses (2 usable) — the minimum for a point-to-point WAN link in traditional networking. A /31 subnet (RFC 3021) has 2 addresses and both can be assigned to hosts on a point-to-point link — no broadcast is needed. A /32 is a host route representing a single IP address with no subnet (used for loopback interfaces and static routes to specific hosts). Prefix lengths of /31 and /32 are exceptions to the "subtract 2 for broadcast/network" rule.',
  },
  {
    q: 'How does subnetting help network design?',
    a: 'Subnetting divides a large IP block into smaller networks to improve security, performance, and manageability. Benefits include: broadcast domain isolation (fewer devices receive each broadcast), security segmentation (firewall rules between subnets), efficient IP allocation (assign only as many addresses as needed), and simplified routing (aggregate routes reduce routing table size). VLSM (Variable Length Subnet Masking) lets you use different prefix lengths within the same network for maximum efficiency.',
  },
];

export const commonSubnets = [
  { cidr: '/8',  mask: '255.0.0.0',     hosts: '16,777,214' },
  { cidr: '/16', mask: '255.255.0.0',   hosts: '65,534'     },
  { cidr: '/24', mask: '255.255.255.0', hosts: '254'        },
  { cidr: '/25', mask: '255.255.255.128', hosts: '126'      },
  { cidr: '/26', mask: '255.255.255.192', hosts: '62'       },
  { cidr: '/28', mask: '255.255.255.240', hosts: '14'       },
  { cidr: '/30', mask: '255.255.255.252', hosts: '2'        },
  { cidr: '/32', mask: '255.255.255.255', hosts: '1 (host)' },
];
