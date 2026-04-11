import { useState, useMemo } from 'react';

interface StatusCode {
    code: number;
    text: string;
    desc: string;
    category: '1xx' | '2xx' | '3xx' | '4xx' | '5xx';
}

const STATUS_CODES: StatusCode[] = [
    // 1xx
    { code: 100, text: 'Continue',                        category: '1xx', desc: 'The server has received the request headers and the client should proceed to send the request body.' },
    { code: 101, text: 'Switching Protocols',             category: '1xx', desc: 'The server is switching protocols as requested by the client — used for WebSocket upgrades.' },
    { code: 102, text: 'Processing',                      category: '1xx', desc: 'The server has received and is processing the request, but no response is available yet (WebDAV).' },
    { code: 103, text: 'Early Hints',                     category: '1xx', desc: 'Used to return response headers before the final response — allows the browser to preload resources.' },
    // 2xx
    { code: 200, text: 'OK',                              category: '2xx', desc: 'The request succeeded. The response body contains the requested resource or the result of an action.' },
    { code: 201, text: 'Created',                         category: '2xx', desc: 'The request succeeded and a new resource was created. The Location header typically points to the new resource.' },
    { code: 202, text: 'Accepted',                        category: '2xx', desc: 'The request has been accepted for processing, but the processing has not been completed yet (async operations).' },
    { code: 203, text: 'Non-Authoritative Information',   category: '2xx', desc: 'The server is a proxy returning a modified version of the origin server\'s 200 response.' },
    { code: 204, text: 'No Content',                      category: '2xx', desc: 'The request succeeded but there is no response body. Used for DELETE and silent PUT/PATCH operations.' },
    { code: 205, text: 'Reset Content',                   category: '2xx', desc: 'The request succeeded. The client should reset the document view (e.g. clear a form after submission).' },
    { code: 206, text: 'Partial Content',                 category: '2xx', desc: 'The server is delivering only part of the resource (Range request). Used for resumable downloads and video streaming.' },
    { code: 207, text: 'Multi-Status',                    category: '2xx', desc: 'The response body contains multiple status codes for multiple independent operations (WebDAV).' },
    { code: 208, text: 'Already Reported',                category: '2xx', desc: 'The members of a DAV binding have already been enumerated in a preceding part of the response (WebDAV).' },
    { code: 226, text: 'IM Used',                         category: '2xx', desc: 'The server fulfilled a GET request and the response is the result of one or more instance manipulations.' },
    // 3xx
    { code: 300, text: 'Multiple Choices',                category: '3xx', desc: 'The request has more than one possible response. The client should choose one of them.' },
    { code: 301, text: 'Moved Permanently',               category: '3xx', desc: 'The resource has been permanently moved to a new URL. Search engines update their index to the new URL.' },
    { code: 302, text: 'Found',                           category: '3xx', desc: 'The resource is temporarily at a different URL. Clients should use the original URL for future requests.' },
    { code: 303, text: 'See Other',                       category: '3xx', desc: 'The response to the request can be found at a different URL using a GET method — used after POST to prevent re-submission.' },
    { code: 304, text: 'Not Modified',                    category: '3xx', desc: 'The cached version of the resource is still valid. The client can use the cached copy without re-downloading.' },
    { code: 307, text: 'Temporary Redirect',              category: '3xx', desc: 'Like 302, but the client must use the same HTTP method for the redirect (POST stays POST, not GET).' },
    { code: 308, text: 'Permanent Redirect',              category: '3xx', desc: 'Like 301, but the client must use the same HTTP method for the redirect (POST stays POST, not GET).' },
    // 4xx
    { code: 400, text: 'Bad Request',                     category: '4xx', desc: 'The server cannot process the request due to malformed syntax, invalid framing, or deceptive request routing.' },
    { code: 401, text: 'Unauthorized',                    category: '4xx', desc: 'Authentication is required and has failed or not been provided. The client should authenticate before retrying.' },
    { code: 402, text: 'Payment Required',                category: '4xx', desc: 'Reserved for future use; originally intended for digital payment systems. Some APIs use it for quota exceeded.' },
    { code: 403, text: 'Forbidden',                       category: '4xx', desc: 'The client is authenticated but does not have permission to access the requested resource.' },
    { code: 404, text: 'Not Found',                       category: '4xx', desc: 'The server cannot find the requested resource. The URL may be wrong or the resource may not exist.' },
    { code: 405, text: 'Method Not Allowed',              category: '4xx', desc: 'The HTTP method used is not allowed for this endpoint. The Allow header lists the permitted methods.' },
    { code: 406, text: 'Not Acceptable',                  category: '4xx', desc: 'The server cannot produce a response matching the Accept headers sent by the client.' },
    { code: 407, text: 'Proxy Authentication Required',   category: '4xx', desc: 'The client must authenticate with the proxy before the request can be forwarded.' },
    { code: 408, text: 'Request Timeout',                 category: '4xx', desc: 'The server timed out waiting for the request. The client may repeat the request without modification.' },
    { code: 409, text: 'Conflict',                        category: '4xx', desc: 'The request conflicts with the current state of the resource — often a version conflict or duplicate creation.' },
    { code: 410, text: 'Gone',                            category: '4xx', desc: 'The resource is permanently gone and no forwarding address is known. Unlike 404, this is intentional and permanent.' },
    { code: 411, text: 'Length Required',                 category: '4xx', desc: 'The server refuses to accept the request without a defined Content-Length header.' },
    { code: 412, text: 'Precondition Failed',             category: '4xx', desc: 'A conditional request header (If-Match, If-None-Match) evaluated to false.' },
    { code: 413, text: 'Content Too Large',               category: '4xx', desc: 'The request body is larger than the server is willing or able to process.' },
    { code: 414, text: 'URI Too Long',                    category: '4xx', desc: 'The URI provided is longer than the server is willing to interpret.' },
    { code: 415, text: 'Unsupported Media Type',          category: '4xx', desc: 'The Content-Type of the request is not supported by the server for this endpoint.' },
    { code: 416, text: 'Range Not Satisfiable',           category: '4xx', desc: 'The Range header in the request cannot be satisfied — the range extends beyond the end of the resource.' },
    { code: 417, text: 'Expectation Failed',              category: '4xx', desc: 'The server cannot meet the requirements of the Expect request header field.' },
    { code: 418, text: "I'm a Teapot",                    category: '4xx', desc: 'April Fools\' RFC 2324 joke: the server refuses to brew coffee because it is a teapot. Not a real HTTP error.' },
    { code: 421, text: 'Misdirected Request',             category: '4xx', desc: 'The request was directed to a server that cannot produce a response for the requested URI scheme and authority.' },
    { code: 422, text: 'Unprocessable Content',           category: '4xx', desc: 'The request is well-formed but contains semantic errors — commonly used for validation failures in REST APIs.' },
    { code: 423, text: 'Locked',                          category: '4xx', desc: 'The resource being accessed is locked (WebDAV).' },
    { code: 424, text: 'Failed Dependency',               category: '4xx', desc: 'The request failed because a previous request it depends on failed (WebDAV).' },
    { code: 425, text: 'Too Early',                       category: '4xx', desc: 'The server is unwilling to risk processing a request that might be replayed (TLS 1.3 early data).' },
    { code: 426, text: 'Upgrade Required',                category: '4xx', desc: 'The client should switch to a different protocol specified in the Upgrade header.' },
    { code: 428, text: 'Precondition Required',           category: '4xx', desc: 'The server requires the request to be conditional to prevent the "lost update" problem.' },
    { code: 429, text: 'Too Many Requests',               category: '4xx', desc: 'The client has sent too many requests in a given amount of time. Rate limiting is in effect.' },
    { code: 431, text: 'Request Header Fields Too Large', category: '4xx', desc: 'The server is unwilling to process the request because its header fields are too large.' },
    { code: 451, text: 'Unavailable For Legal Reasons',   category: '4xx', desc: 'The server is denying access to the resource as a consequence of a legal demand (e.g. DMCA takedown, court order).' },
    // 5xx
    { code: 500, text: 'Internal Server Error',           category: '5xx', desc: 'The server encountered an unexpected condition that prevented it from fulfilling the request.' },
    { code: 501, text: 'Not Implemented',                 category: '5xx', desc: 'The server does not support the functionality required to fulfill the request.' },
    { code: 502, text: 'Bad Gateway',                     category: '5xx', desc: 'The server, acting as a gateway, received an invalid response from an upstream server.' },
    { code: 503, text: 'Service Unavailable',             category: '5xx', desc: 'The server is temporarily unable to handle requests due to overload or scheduled maintenance.' },
    { code: 504, text: 'Gateway Timeout',                 category: '5xx', desc: 'The server, acting as a gateway, did not receive a timely response from an upstream server.' },
    { code: 505, text: 'HTTP Version Not Supported',      category: '5xx', desc: 'The server does not support the HTTP protocol version used in the request.' },
    { code: 506, text: 'Variant Also Negotiates',         category: '5xx', desc: 'Transparent content negotiation for the request results in a circular reference.' },
    { code: 507, text: 'Insufficient Storage',            category: '5xx', desc: 'The server cannot store the representation needed to complete the request (WebDAV).' },
    { code: 508, text: 'Loop Detected',                   category: '5xx', desc: 'The server detected an infinite loop while processing the request (WebDAV).' },
    { code: 510, text: 'Not Extended',                    category: '5xx', desc: 'Further extensions to the request are required for the server to fulfil it.' },
    { code: 511, text: 'Network Authentication Required', category: '5xx', desc: 'The client needs to authenticate to gain network access — used by captive portals.' },
];

const CATEGORY_COLORS: Record<string, { bg: string; color: string; border: string }> = {
    '1xx': { bg: 'rgba(107,114,128,.1)',  color: '#6b7280',  border: 'rgba(107,114,128,.3)'  },
    '2xx': { bg: 'var(--green-lt)',       color: 'var(--green)',  border: 'var(--green-mid)' },
    '3xx': { bg: 'var(--blue-lt)',        color: '#2563eb',  border: 'rgba(37,99,235,.25)'   },
    '4xx': { bg: 'rgba(245,158,11,.1)',   color: '#b45309',  border: 'rgba(245,158,11,.3)'   },
    '5xx': { bg: 'var(--red-lt)',         color: 'var(--red)', border: 'rgba(220,38,38,.25)'  },
};

const CATEGORIES = ['all', '1xx', '2xx', '3xx', '4xx', '5xx'] as const;

export default function HttpStatusCodesWidget() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState<'all' | '1xx' | '2xx' | '3xx' | '4xx' | '5xx'>('all');

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return STATUS_CODES.filter(s => {
            const matchesCat = category === 'all' || s.category === category;
            const matchesSearch = !q || String(s.code).includes(q) || s.text.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q);
            return matchesCat && matchesSearch;
        });
    }, [search, category]);

    return (
        <div>
            {/* Search */}
            <div style={{ marginBottom: 12 }}>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search by code or description…"
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--border)', borderRadius: 'var(--r-m)', fontSize: 14, color: 'var(--ink)', background: 'var(--page-bg)', outline: 'none', boxSizing: 'border-box', fontFamily: 'Outfit, sans-serif', transition: 'border-color .15s' }}
                    onFocus={e => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(5,150,105,.09)'; }}
                    onBlur={e  => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => {
                    const active = category === cat;
                    const c = cat !== 'all' ? CATEGORY_COLORS[cat] : null;
                    return (
                        <button key={cat} onClick={() => setCategory(cat)}
                            style={{ padding: '5px 12px', border: `1.5px solid ${active && c ? c.border : active ? 'var(--green)' : 'var(--border)'}`, borderRadius: 99, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: active && c ? c.bg : active ? 'var(--green-lt)' : 'var(--white)', color: active && c ? c.color : active ? 'var(--green)' : 'var(--ink-3)', transition: 'all .14s' }}>
                            {cat === 'all' ? 'All' : cat}
                        </button>
                    );
                })}
            </div>

            {/* Results */}
            <div style={{ fontSize: 12, color: 'var(--ink-4)', marginBottom: 8 }}>
                {filtered.length} code{filtered.length !== 1 ? 's' : ''}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {filtered.map(s => {
                    const c = CATEGORY_COLORS[s.category];
                    return (
                        <div key={s.code} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>{s.code}</span>
                                <span style={{ fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 99, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{s.category}</span>
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 3 }}>{s.text}</div>
                                <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.55 }}>{s.desc}</div>
                            </div>
                        </div>
                    );
                })}
                {filtered.length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: 'var(--ink-4)', fontSize: 14 }}>
                        No status codes match your search.
                    </div>
                )}
            </div>
        </div>
    );
}
