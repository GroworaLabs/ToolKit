export default function HttpStatusCodesContent() {
    return (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 16px 0' }}>
            <div>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        What are HTTP status codes and how do they work?
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        Every HTTP response begins with a three-digit status code that tells the client precisely what happened to its request. When your browser fetches a webpage, loads an image, or submits a form, the server responds with a status code before any content. Status codes are part of the HTTP protocol defined in <strong style={{ color: 'var(--ink)' }}>RFC 9110</strong> (HTTP Semantics, 2022), which superseded RFC 7231.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 14 }}>
                        The request-response cycle works as follows: your browser sends an HTTP request with a method (GET, POST, PUT, DELETE, etc.), a target URL, headers, and optionally a body. The server processes the request and responds with a status line containing the HTTP version, status code, and reason phrase — for example, <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, background: 'var(--border)', padding: '1px 5px', borderRadius: 3 }}>HTTP/1.1 200 OK</code>. This is followed by response headers and optionally a body.
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)' }}>
                        The first digit of the status code categorizes the response into one of five classes. Understanding these classes is the foundation of working effectively with web APIs, debugging network issues, and building correct server behavior.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Complete breakdown of each category
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            {
                                cat: '1xx — Informational',
                                color: '#6b7280',
                                bg: 'rgba(107,114,128,.08)',
                                border: 'rgba(107,114,128,.2)',
                                desc: '1xx responses are provisional — the server has received part of the request and the client should continue. These are rarely seen by developers in everyday work. The most important is 101 Switching Protocols, returned when upgrading an HTTP connection to WebSocket. 103 Early Hints is a newer addition that allows CDNs and servers to push Link headers for resource preloading before the main response is ready, improving page load performance.'
                            },
                            {
                                cat: '2xx — Success',
                                color: 'var(--green)',
                                bg: 'var(--green-lt)',
                                border: 'var(--green-mid)',
                                desc: '2xx responses indicate the request was received, understood, and accepted. 200 OK is the default success response. 201 Created is the correct response when a POST request creates a new resource — it should include a Location header pointing to the new resource\'s URL. 204 No Content is correct for DELETE requests and silent updates where no body is needed. 206 Partial Content powers video streaming and resumable downloads via the Range request header.'
                            },
                            {
                                cat: '3xx — Redirection',
                                color: '#2563eb',
                                bg: 'var(--blue-lt)',
                                border: 'rgba(37,99,235,.2)',
                                desc: '3xx responses tell the client to look elsewhere for the requested resource. The Location header specifies the new URL. 301 and 308 are permanent redirects — search engines transfer PageRank to the new URL. 302 and 307 are temporary. The critical difference between 301/302 and 308/307 is method preservation: 307 and 308 guarantee that the HTTP method (POST, PUT, etc.) is preserved across the redirect, while 301 and 302 historically caused browsers to downgrade POST to GET.'
                            },
                            {
                                cat: '4xx — Client Error',
                                color: '#b45309',
                                bg: 'rgba(245,158,11,.08)',
                                border: 'rgba(245,158,11,.25)',
                                desc: '4xx responses indicate the client made an error. The server understood the request but cannot fulfill it as sent. 400 is the general "bad request" catch-all. 401 triggers authentication (the WWW-Authenticate header specifies the scheme). 403 denies access even to authenticated users. 404 is the most famous: resource not found. 409 indicates a conflict, such as trying to create a duplicate unique record. 422 is increasingly favored for validation errors in REST APIs. 429 indicates rate limiting.'
                            },
                            {
                                cat: '5xx — Server Error',
                                color: 'var(--red)',
                                bg: 'var(--red-lt)',
                                border: 'rgba(220,38,38,.2)',
                                desc: '5xx responses indicate the server encountered an error while processing an otherwise valid request. 500 is the generic server error — it should never be returned for client input errors. 502 and 504 indicate proxy/gateway issues — common when your load balancer cannot reach the origin server. 503 with a Retry-After header is the correct way to handle planned maintenance. 507 Insufficient Storage is specific to WebDAV when the server runs out of disk space.'
                            },
                        ].map(({ cat, color, bg, border, desc }) => (
                            <div key={cat} style={{ padding: '18px 20px', background: bg, border: `1px solid ${border}`, borderRadius: 'var(--r-l)' }}>
                                <div style={{ fontSize: 15, fontWeight: 700, color, marginBottom: 8 }}>{cat}</div>
                                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>{desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Most important codes every developer must know
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { code: '200 OK',              why: 'The universal success response. Always check that you\'re not accidentally returning 200 for errors.' },
                            { code: '201 Created',         why: 'Return this (not 200) when a POST creates a new resource. Include Location header with the new resource\'s URL.' },
                            { code: '204 No Content',      why: 'For DELETE and silent PUT. Must not include a response body — client code that reads the body will get nothing.' },
                            { code: '301 Moved Permanently', why: 'Permanent redirect with SEO transfer. Use for domain migration, HTTP→HTTPS, and canonical URL changes.' },
                            { code: '304 Not Modified',    why: 'Caching workhorse. Server says "your cached copy is still valid — use it". Saves bandwidth for static assets.' },
                            { code: '400 Bad Request',     why: 'Malformed request syntax. Return with a detailed error body explaining what\'s wrong.' },
                            { code: '401 Unauthorized',    why: 'Missing or invalid authentication. Include WWW-Authenticate header. Do not confuse with 403.' },
                            { code: '403 Forbidden',       why: 'Authenticated but not authorized. Don\'t return 404 to hide resource existence — use 403 explicitly.' },
                            { code: '404 Not Found',       why: 'Resource doesn\'t exist. Return for invalid IDs, deleted resources, and unknown routes.' },
                            { code: '422 Unprocessable',   why: 'Validation failure. The request parsed correctly but failed business rules. Return with field-level error details.' },
                            { code: '429 Too Many Requests', why: 'Rate limit hit. Include Retry-After header. Clients should implement exponential backoff.' },
                            { code: '500 Internal Server Error', why: 'Unhandled exception in server code. Log the full error internally — return a generic message to clients.' },
                            { code: '503 Service Unavailable', why: 'Server temporarily down. Include Retry-After header. Use for maintenance windows and overload conditions.' },
                        ].map(({ code, why }, i) => (
                            <div key={code} style={{ display: 'flex', gap: 14, padding: '12px 14px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 4, flexShrink: 0, alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>{code}</code>
                                <span style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>{why}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        How to choose the right status code for your API
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        A decision tree for REST API responses:
                    </p>
                    <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {[
                            { n: '1', title: 'Did the request succeed?', desc: 'If yes, use 2xx. If the resource was created, use 201. If nothing is returned, use 204. Otherwise, use 200.' },
                            { n: '2', title: 'Did the client make an error?', desc: 'Use 4xx. If the request body is malformed JSON, use 400. If auth is missing, use 401. If the user lacks permission, use 403. If the resource doesn\'t exist, use 404. If validation failed, use 422.' },
                            { n: '3', title: 'Did the server make an error?', desc: 'Use 5xx. For unhandled exceptions, use 500. For maintenance windows, use 503 with Retry-After. For proxy failures, use 502 or 504.' },
                            { n: '4', title: 'Include a structured error body', desc: 'Always return a JSON error body with 4xx and 5xx responses. Include: error code, human-readable message, and for 422, field-level validation errors. Never return an empty body for errors.' },
                            { n: '5', title: 'Set appropriate headers', desc: 'Content-Type: application/json for JSON bodies. Location for 201 and 3xx. Retry-After for 429 and 503. WWW-Authenticate for 401. Allow for 405.' },
                        ].map(({ n, title, desc }) => (
                            <li key={n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
                                <div>
                                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>{title}</div>
                                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', margin: 0 }}>{desc}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        Common mistakes and anti-patterns
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {[
                            { error: '200 with error body', fix: 'Returning HTTP 200 with {"error": "not found"} in the body breaks HTTP semantics, fools monitoring systems, and forces every client to parse the body before knowing success. Use proper 4xx and 5xx codes.' },
                            { error: '500 for validation errors', fix: 'Client input errors are never the server\'s fault. Returning 500 for a missing required field is incorrect. Use 400 for malformed requests and 422 for validation failures.' },
                            { error: '200 for empty results', fix: 'An empty list is a valid successful response — return 200 with an empty array, not 404. Reserve 404 for when the resource itself (e.g. the endpoint or a specific ID) does not exist.' },
                            { error: 'Leaking info with 403 vs 404', fix: 'Returning 403 tells an attacker the resource exists but they can\'t access it. For sensitive resources, return 404 to hide existence. This is a deliberate security tradeoff — choose based on your threat model.' },
                            { error: '301 for API endpoints', fix: 'Permanent redirects on API endpoints can break clients that don\'t follow redirects. Prefer updating documentation and making the old endpoint respond with the correct data for a deprecation period.' },
                        ].map(({ error, fix }) => (
                            <div key={error} style={{ padding: '14px 16px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)' }}>
                                <div style={{ marginBottom: 8 }}>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', background: 'var(--red-lt)', padding: '2px 8px', borderRadius: 99 }}>{error}</span>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.6, margin: 0 }}>{fix}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        How browsers handle different redirects — 301 vs 302 vs 307 vs 308
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 20 }}>
                        The four redirect codes differ along two dimensions: permanence and method preservation.
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-accent)', color: '#fff' }}>
                                    {['Code', 'Permanent?', 'Method preserved?', 'Best use case'].map(h => (
                                        <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['301', 'Yes — cache forever', 'No (POST → GET)', 'SEO-safe URL changes, HTTP → HTTPS, domain migration'],
                                    ['302', 'No — temporary',      'No (POST → GET)', 'Temporary redirects, OAuth flows, maintenance pages'],
                                    ['307', 'No — temporary',      'Yes (POST → POST)', 'Temporary redirects that must preserve HTTP method'],
                                    ['308', 'Yes — cache forever', 'Yes (POST → POST)', 'Permanent API endpoint moves where clients use POST/PUT'],
                                ].map(([code, perm, method, use], i) => (
                                    <tr key={code} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '10px 14px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: 'var(--green)' }}>{code}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{perm}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--ink-2)' }}>{method}</td>
                                        <td style={{ padding: '10px 14px', color: 'var(--ink-3)', fontSize: 13 }}>{use}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-3)', marginTop: 16 }}>
                        Search engines treat 301 and 308 as signals to transfer PageRank from the old URL to the new one. Use them for permanent changes. For temporary maintenance pages, 302 or 307 ensures search engines keep the original URL indexed.
                    </p>
                </section>

                <section style={{ marginBottom: 48 }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
                        HTTP status codes in REST API design
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink-2)', marginBottom: 16 }}>
                        Well-designed REST APIs use status codes semantically — the code alone tells the client what happened, before it reads the body. Here are the standard patterns for common REST operations:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {[
                            { op: 'GET /resources',          success: '200', errors: '400 (bad query), 401, 403'           },
                            { op: 'GET /resources/:id',      success: '200', errors: '400 (bad id), 401, 403, 404'          },
                            { op: 'POST /resources',         success: '201 + Location header', errors: '400, 401, 403, 409 (conflict), 422 (validation)' },
                            { op: 'PUT /resources/:id',      success: '200 or 204', errors: '400, 401, 403, 404, 409, 422'  },
                            { op: 'PATCH /resources/:id',    success: '200 or 204', errors: '400, 401, 403, 404, 409, 422'  },
                            { op: 'DELETE /resources/:id',   success: '204', errors: '401, 403, 404'                        },
                        ].map(({ op, success, errors }, i) => (
                            <div key={op} style={{ display: 'flex', gap: 12, padding: '12px 14px', background: i % 2 === 0 ? 'var(--white)' : 'var(--page-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-l)', flexWrap: 'wrap' }}>
                                <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--ink)', minWidth: 200, flexShrink: 0 }}>{op}</code>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)', background: 'var(--green-lt)', padding: '2px 8px', borderRadius: 99 }}>{success}</span>
                                    <span style={{ fontSize: 12, color: 'var(--ink-4)' }}>errors:</span>
                                    <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{errors}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
