/**
 * Batch 90 — round 3 of the second thousand: networking and protocols.
 *
 * What a request meets between one machine and another: the handshake, the proxy in the
 * middle, the route it takes, and the thing that drops it. The set already has the
 * appliances — `router`, `firewall`, `gateway`, `cdn`, `vpn`, `subnet`, `nat-gw` — so this
 * round draws the *behaviour* around them rather than more boxes: what a socket is doing,
 * which direction traffic runs, what a certificate is worth today.
 *
 * Motifs: a disc is a host, a run between two discs is a link, a small rect is a packet, and
 * the certificate body (a card with a seal, from `certificate`) carries anything about trust.
 * Composition fills the frame; ink centroid under 2.0.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const net = (slug: string, subcategory: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[], family: string, shapes: Icon["shapes"]): Icon =>
  ({ slug, category: "cloud", subcategory, name, description, tags, family, aliases, keywords, shapes });

/** The card and seal `certificate` is built from, so anything about trust reads as its family. */
const card = (): Icon["shapes"] => [rect(3, 3, 18, 11, 2), row(7, 6, 18)];

export const BATCH_90: Icon[] = [
  /* ── Trust on the wire ────────────────────────────────────────────────────────── */

  net("mtls", "network", "Mutual TLS", "Mutual TLS — both ends prove who they are, not just the server",
    ["both-ways", "client-cert", "verify"], ["mutual-tls"], ["mtls", "mutual tls", "client certificate", "two way tls"], "lock",
    [rect(2, 11, 8, 8, 2), arc(6, 11, 2.5, 180, 360), rect(14, 11, 8, 8, 2), arc(18, 11, 2.5, 180, 360), row(15, 10, 14)]),

  net("tls-terminate", "network", "TLS termination", "TLS termination — the encrypted leg ends here and the plain one begins",
    ["offload", "decrypt", "edge"], ["ssl-termination"], ["tls termination", "ssl offload", "terminate tls", "decrypt at edge"], "chain",
    [rect(6, 5, 8, 7, 2), arc(10, 5, 2.5, 180, 360), col(12, 14, 17), row(17, 3, 21), poly([[18, 20], [21, 17], [18, 14]])]),

  net("certificate-expiry", "network", "Certificate expiry", "Certificate expiry — the date after which nothing will trust it",
    ["expires", "renew", "date"], ["cert-expiry"], ["certificate expiry", "cert expiration", "expiring certificate", "renew cert"], "card",
    [...card(), row(11, 6, 13), disc(15, 18, 3.5), col(15, 15.5, 18), row(18, 15, 17.5)]),

  net("certificate-rotate", "network", "Certificate rotation", "Certificate rotation — the old one replaced before anything notices",
    ["renew", "replace", "cycle"], ["cert-rotation"], ["certificate rotation", "rotate cert", "renew certificate", "cert refresh"], "cycle",
    [...card(), row(11, 6, 13), poly([[6, 19], [18, 19], [18, 16]]), poly([[18, 16], [15.5, 18.5]])]),

  net("cipher-suite", "network", "Cipher suite", "A cipher suite — the set of algorithms the two ends agreed to use",
    ["algorithms", "agreed", "set"], [], ["cipher suite", "tls ciphers", "encryption algorithms", "negotiated ciphers"], "lock",
    [rect(7, 11, 10, 9, 2), arc(12, 11, 3, 180, 360), row(15, 10, 14), row(3, 4, 20), row(6.5, 7, 17)]),

  net("handshake", "network", "Handshake", "A handshake — the back and forth before a single byte of the message moves",
    ["negotiate", "hello", "setup"], ["tls-handshake"], ["handshake", "tls handshake", "client hello", "connection setup"], "chain",
    [disc(4, 12, 2), disc(20, 12, 2), poly([[6, 8], [18, 8]]), poly([[18, 8], [15, 5]]), poly([[18, 16], [6, 16]]), poly([[6, 16], [9, 19]])]),

  net("alpn", "network", "ALPN", "ALPN — the two ends choosing which protocol to speak while they are already shaking hands",
    ["negotiate", "protocol", "choose"], [], ["alpn", "protocol negotiation", "application layer protocol", "h2 negotiation"], "chain",
    [disc(12, 12, 3), row(4, 3, 21), row(20, 3, 21), poly([[8, 6], [10.5, 8.5]]), poly([[16, 6], [13.5, 8.5]]), poly([[9, 15], [11.5, 17.5]])]),

  net("sni", "network", "SNI", "SNI — the name the client asks for, sent in the open before the tunnel exists",
    ["hostname", "in-clear", "which-site"], [], ["sni", "server name indication", "hostname in tls", "virtual host tls"], "card",
    [...card(), row(11, 6, 15), poly([[7, 21], [10, 18], [17, 18]]), disc(19.5, 18, 1)]),

  /* ── Sockets and connections ──────────────────────────────────────────────────── */

  net("port", "network", "Port", "A port — the numbered door on a host that a connection arrives at",
    ["number", "door", "listen"], [], ["port", "port number", "listening port", "tcp port"], "machine",
    [rect(3, 4, 18, 16, 2), rect(8.5, 10, 7, 7, 2), row(7, 6, 18), disc(12, 13.5, 1)]),

  net("socket-open", "network", "Socket open", "A socket open — the connection established and holding",
    ["established", "connected", "live"], [], ["socket open", "connection established", "open connection", "socket connect"], "chain",
    [poly([[8, 4], [4, 4], [4, 20], [8, 20]]), poly([[16, 4], [20, 4], [20, 20], [16, 20]]), disc(12, 12, 2)]),

  net("socket-close", "network", "Socket close", "A socket closed — the connection torn down at both ends",
    ["closed", "teardown", "fin"], [], ["socket close", "connection closed", "tear down", "fin"], "chain",
    [poly([[8, 4], [4, 4], [4, 20], [8, 20]]), poly([[16, 4], [20, 4], [20, 20], [16, 20]]), poly([[10, 10], [14, 14]]), poly([[14, 10], [10, 14]])]),

  net("socket-timeout", "network", "Socket timeout", "A socket timeout — the far end never answered and the wait was given up",
    ["no-answer", "deadline", "give-up"], [], ["socket timeout", "connection timeout", "read timeout", "no response"], "chain",
    [disc(4, 5, 2), row(5, 6, 20), disc(12, 15, 5), col(12, 11, 15), row(15, 12, 16)]),

  net("keep-alive", "network", "Keep-alive", "Keep-alive — the connection held open so the next request costs nothing to start",
    ["reuse", "hold", "persistent"], [], ["keep alive", "persistent connection", "connection reuse", "http keep alive"], "chain",
    [disc(4, 12, 2), disc(20, 12, 2), row(12, 6, 18), poly([[9, 9], [12, 6], [15, 9]]), poly([[9, 15], [12, 18], [15, 15]])]),

  net("long-polling", "network", "Long polling", "Long polling — the request held open until there is something to answer with",
    ["hold", "wait", "push"], [], ["long polling", "hanging get", "comet", "held request"], "rails",
    [row(5, 2, 22), row(19, 2, 22), col(6, 5, 19), poly([[16, 5], [16, 19]]), poly([[13, 16], [16, 19], [19, 16]])]),

  /* ── Protocols ────────────────────────────────────────────────────────────────── */

  net("tcp", "network", "TCP", "TCP — every packet acknowledged, in order, or sent again",
    ["ordered", "acked", "reliable"], [], ["tcp", "reliable transport", "acknowledged", "ordered delivery"], "rails",
    [rect(2, 3, 8.5, 7, 2), rect(13.5, 3, 8.5, 7, 2), row(14, 2, 22), poly([[7, 18], [10, 21], [17, 14]])]),

  net("udp", "network", "UDP", "UDP — packets sent and not asked after, which is why it is fast",
    ["fire-forget", "unordered", "fast"], [], ["udp", "datagram", "connectionless", "unreliable transport"], "rails",
    [rect(2, 3, 8.5, 7, 2), rect(13.5, 3, 8.5, 7, 2), row(14, 2, 22), poly([[8, 18], [16, 18]]), poly([[16, 18], [13, 21]])]),

  net("quic", "network", "QUIC", "QUIC — many streams over one UDP connection, so one lost packet stalls only its own",
    ["streams", "udp", "fast-start"], [], ["quic", "http3 transport", "multiplexed udp", "stream multiplexing"], "rails",
    [poly([[2, 5], [8, 5], [12, 9]]), poly([[2, 19], [8, 19], [12, 15]]), col(12, 9, 15), row(12, 12, 22)]),

  net("http2-stream", "network", "HTTP/2 stream", "An HTTP/2 stream — one of many requests sharing a single connection",
    ["multiplex", "share", "one-connection"], [], ["http2 stream", "multiplexing", "stream id", "h2"], "rails",
    [rect(2, 7, 20, 10, 5), row(9.5, 5, 19), row(12, 5, 19), row(14.5, 5, 19)]),

  net("http3", "network", "HTTP/3", "HTTP/3 — the same requests, carried over QUIC instead of TCP",
    ["quic", "udp", "version"], [], ["http3", "h3", "quic http", "http over udp"], "rails",
    [rect(2, 3, 20, 7, 2), row(6.5, 5, 19), col(12, 10, 14), poly([[8, 13], [12, 17], [16, 13]]), row(21, 6, 18)]),

  net("rest-endpoint", "network", "REST endpoint", "A REST endpoint — a path and a verb that together name one thing to do",
    ["path", "verb", "resource"], [], ["rest endpoint", "api route", "resource path", "http verb"], "bracket",
    [poly([[7, 4], [3, 4], [3, 20], [7, 20]]), poly([[17, 4], [21, 4], [21, 20], [17, 20]]), row(9, 8, 16), row(15, 8, 13)]),

  net("soap-endpoint", "network", "SOAP endpoint", "A SOAP endpoint — the envelope, the header and the body, all in XML",
    ["envelope", "xml", "wsdl"], [], ["soap endpoint", "soap envelope", "wsdl", "xml web service"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), poly([[8, 13], [5.5, 15.5], [8, 18]]), poly([[16, 13], [18.5, 15.5], [16, 18]])]),

  net("cors", "network", "CORS", "CORS — the header that says which other origins the browser may hand this to",
    ["origin", "browser", "allow"], [], ["cors", "cross origin", "access control allow origin", "preflight"], "chain",
    [rect(2, 4, 20, 14, 2), row(8, 2, 22), disc(5.5, 6, 1), poly([[8, 13], [11, 16], [16, 11]])]),

  net("csrf", "network", "CSRF", "CSRF — a request the browser sends with your session that you never asked for",
    ["forged", "session", "token"], ["xsrf"], ["csrf", "cross site request forgery", "xsrf token", "forged request"], "shield",
    [poly([[15, 4], [20, 4], [20, 12], [12, 20], [4, 12], [4, 4], [9, 4]], true), poly([[9, 11], [12, 14], [17, 9]])]),

  /* ── Names and addresses ──────────────────────────────────────────────────────── */

  net("dns-record", "network", "DNS record", "A DNS record — one line of the answer a resolver gives back",
    ["entry", "zone", "answer"], [], ["dns record", "zone record", "resource record", "dns entry"], "window",
    [rect(2, 4, 20, 16, 2), row(9, 2, 22), row(13, 5, 12), row(17, 5, 19)]),

  net("a-record", "network", "A record", "An A record — the name pointed straight at an address",
    ["address", "ipv4", "point"], [], ["a record", "dns a record", "hostname to ip", "address record"], "chain",
    [row(6, 3, 21), disc(6, 15, 3), row(15, 9, 16), poly([[18, 12], [21, 15], [18, 18]])]),

  net("cname-record", "network", "CNAME record", "A CNAME — a name that means another name, which is looked up in turn",
    ["alias", "indirect", "another-name"], ["dns-alias"], ["cname", "canonical name", "dns alias", "name to name"], "chain",
    [row(5, 3, 21), row(12, 3, 21), row(19, 3, 21), poly([[9, 8], [12, 5], [15, 8]]), poly([[9, 15], [12, 12], [15, 15]])]),

  net("dns-ttl", "network", "DNS TTL", "A DNS TTL — how long a resolver may keep the answer before asking again",
    ["cache", "seconds", "stale"], [], ["dns ttl", "record ttl", "cache seconds", "dns caching"], "clock",
    [row(5, 3, 21), rect(3, 9, 18, 5, 2.5), rect(3, 17, 11, 5, 2.5)]),

  net("nat", "network", "NAT", "NAT — many private addresses leaving under one public one",
    ["translate", "private", "public"], [], ["nat", "network address translation", "masquerade", "private to public"], "funnel",
    [row(4, 2, 9), row(12, 2, 9), row(20, 2, 9), poly([[9, 4], [15, 10], [15, 14], [9, 20]]), row(12, 15, 22)]),

  net("dual-stack", "network", "Dual stack", "Dual stack — the same host reachable over IPv4 and IPv6 at once",
    ["ipv4", "ipv6", "both"], [], ["dual stack", "ipv4 and ipv6", "both protocols", "dual addressing"], "chain",
    [rect(9, 8, 12, 8, 2), row(8, 2, 9), row(16, 2, 9), disc(4, 8, 1), disc(4, 16, 1), row(12, 12, 18)]),

  /* ── The path a packet takes ──────────────────────────────────────────────────── */

  net("bgp", "network", "BGP", "BGP — the networks telling each other which routes they will carry",
    ["routes", "peers", "announce"], [], ["bgp", "border gateway protocol", "route announcement", "peering"], "orbit",
    [disc(12, 12, 3), disc(4, 5, 2), disc(20, 5, 2), disc(4, 19, 2), poly([[6, 7], [9, 10]]), poly([[18, 7], [15, 10]])]),

  net("anycast", "network", "Anycast", "Anycast — one address answered by whichever location is nearest",
    ["nearest", "many-sites", "one-address"], [], ["anycast", "nearest pop", "one ip many sites", "anycast routing"], "orbit",
    [disc(12, 12, 2), arc(12, 12, 6.5, 200, 340), arc(12, 12, 10, 200, 340), arc(12, 12, 6.5, 20, 160), arc(12, 12, 10, 20, 160)]),

  net("multicast", "network", "Multicast", "Multicast — sent once and delivered to everyone who asked for it",
    ["group", "once", "many"], [], ["multicast", "group delivery", "igmp", "one to many"], "funnel",
    [disc(4, 12, 2), row(12, 6, 10), col(10, 5, 19), row(5, 10, 20), row(12, 10, 20), row(19, 10, 20)]),

  net("unicast", "network", "Unicast", "Unicast — one sender, one receiver, and nobody else on the line",
    ["one-to-one", "direct", "single"], [], ["unicast", "point to point", "one to one", "direct delivery"], "chain",
    [rect(2, 3, 20, 18, 2), disc(6, 12, 1), row(12, 8, 16), poly([[13.5, 9.5], [16, 12], [13.5, 14.5]])]),

  net("broadcast-net", "network", "Broadcast domain", "A broadcast domain — the stretch of network where a shout reaches everyone",
    ["domain", "everyone", "segment"], [], ["broadcast domain", "layer 2 segment", "arp domain", "broadcast traffic"], "window",
    [rect(2, 6, 20, 14, 2), disc(7, 13, 1), disc(12, 13, 1), disc(17, 13, 1), row(17, 6, 18), poly([[9, 3], [12, 6], [15, 3]])]),

  net("traceroute", "network", "Traceroute", "Traceroute — every hop between here and there, and what each one cost",
    ["hops", "path", "measure"], [], ["traceroute", "tracert", "hop by hop", "path discovery"], "chain",
    [disc(4, 18, 2), disc(10, 13, 2), disc(16, 8, 2), disc(21, 4, 1), poly([[6, 16], [8, 14]]), poly([[12, 11], [14, 9]])]),

  net("port-forward", "network", "Port forward", "A port forward — traffic arriving on one port carried straight through to another",
    ["through", "tunnel", "map"], ["port-mapping"], ["port forward", "port mapping", "ssh tunnel", "forwarded port"], "machine",
    [rect(4, 3, 16, 18, 2), row(8, 2, 12), col(12, 8, 16), row(16, 12, 22)]),

  net("ping-host", "network", "Ping", "Ping — a packet sent only to see whether anything answers, and how fast",
    ["echo", "reachable", "latency"], [], ["ping", "icmp echo", "reachability", "round trip"], "chain",
    [rect(15.5, 6, 6.5, 12, 2), disc(5, 12, 1), arc(5, 12, 4, 300, 60), arc(5, 12, 7, 300, 60), row(12, 12, 15.5)]),

  net("mtu", "network", "MTU", "MTU — the largest packet a link will carry without breaking it up",
    ["size", "limit", "frame"], [], ["mtu", "maximum transmission unit", "packet size", "frame size"], "rails",
    [rect(5, 8, 14, 8, 2), col(2, 5, 19), col(22, 5, 19), row(5, 5, 19)]),

  net("jumbo-frame", "network", "Jumbo frame", "A jumbo frame — a packet far larger than the default, for links that can take it",
    ["large", "9000", "throughput"], [], ["jumbo frame", "large mtu", "9000 bytes", "big packets"], "rails",
    [rect(2, 8, 20, 8, 2), col(2, 4, 7), col(22, 4, 7), row(5.5, 2, 22), row(12, 6, 18)]),

  /* ── Direction and shaping ────────────────────────────────────────────────────── */

  net("ingress-traffic", "network", "Ingress traffic", "Ingress — everything arriving from outside the boundary",
    ["inbound", "arriving", "in"], ["inbound-traffic"], ["ingress traffic", "inbound", "incoming traffic", "north south in"], "bracket",
    [poly([[8, 3], [3, 3], [3, 21], [8, 21]]), row(12, 10, 20), poly([[17, 9], [20, 12], [17, 15]]), col(21, 6, 18)]),

  net("bandwidth-cap", "network", "Bandwidth cap", "A bandwidth cap — the ceiling above which nothing more is carried",
    ["ceiling", "limit", "rate"], [], ["bandwidth cap", "rate ceiling", "throughput limit", "capped bandwidth"], "chart",
    [row(5, 2, 22), col(4, 8, 20), row(20, 4, 21), poly([[6, 18], [10, 14], [13, 17], [19, 11]])]),

  net("throttle-network", "network", "Throttle", "Throttling — traffic deliberately slowed so the link stays usable",
    ["slow", "shape", "limit"], ["traffic-shaping"], ["throttle", "traffic shaping", "rate limiting network", "slow down"], "funnel",
    [row(4, 2, 10), row(8, 2, 10), row(12, 2, 10), poly([[8, 3], [14, 9], [14, 15], [8, 21]]), row(12, 14, 22)]),

  net("qos", "network", "Quality of service", "Quality of service — the traffic that matters goes first when the link is full",
    ["priority", "queue", "class"], ["traffic-priority"], ["qos", "quality of service", "traffic priority", "dscp"], "rails",
    [rect(2, 2, 13, 5, 2.5), rect(2, 9.5, 9, 5, 2.5), rect(2, 17, 8, 5, 2.5), poly([[18, 6], [21, 9], [18, 12]]), col(21, 9, 18)]),

  net("network-policy", "network", "Network policy", "A network policy — which workloads may talk to which, written down and enforced",
    ["allow", "deny", "rules"], [], ["network policy", "microsegmentation", "allow list network", "east west rules"], "shield",
    [poly([[15, 3], [20, 3], [20, 11], [12, 19], [4, 11], [4, 3], [9, 3]], true), disc(9, 9, 1), disc(15, 9, 1), row(9, 10, 14), row(22, 7, 17)]),

  /* ── Proxies and overlays ─────────────────────────────────────────────────────── */

  net("reverse-proxy", "network", "Reverse proxy", "A reverse proxy — one address in front of many servers, chosen per request",
    ["front", "fan-in", "server-side"], [], ["reverse proxy", "load balancer front", "nginx", "front door"], "funnel",
    [row(12, 2, 8), rect(8, 8, 6.5, 8, 2), poly([[19, 7.5], [14.5, 12], [19, 16.5]]), poly([[14.5, 12], [19, 12]]), disc(21, 12, 1)]),

  net("forward-proxy", "network", "Forward proxy", "A forward proxy — many clients leaving through one door on the way out",
    ["outbound", "fan-out", "client-side"], [], ["forward proxy", "egress proxy", "client proxy", "outbound gateway"], "funnel",
    [disc(3, 5, 1), disc(3, 12, 1), disc(3, 19, 1), poly([[4, 6], [10, 12], [4, 18]]), row(12, 10, 15), rect(15, 8, 7, 8, 2)]),

  net("sidecar-proxy", "network", "Sidecar proxy", "A sidecar proxy — the proxy that ships beside the workload, in the same pod",
    ["beside", "pod", "mesh"], [], ["sidecar proxy", "envoy sidecar", "service mesh proxy", "pod proxy"], "machine",
    [rect(2, 4, 11, 16, 2), rect(15.5, 8, 6.5, 8, 2), row(12, 13, 15.5), row(9, 5, 10)]),

  net("overlay-network", "network", "Overlay network", "An overlay network — a network drawn on top of another one that knows nothing about it",
    ["tunnel", "virtual", "on-top"], [], ["overlay network", "vxlan", "virtual network", "encapsulation"], "lattice",
    [row(17, 2, 22), disc(6, 17, 1), disc(18, 17, 1), poly([[6, 12], [12, 6], [18, 12]]), disc(6, 12, 1), disc(18, 12, 1)]),

  net("vlan", "network", "VLAN", "A VLAN — one wire carrying networks that cannot see each other",
    ["tagged", "separate", "segment"], [], ["vlan", "tagged vlan", "802.1q", "virtual lan"], "rails",
    [row(12, 2, 22), rect(3, 4, 8, 5, 2.5), rect(13, 4, 8, 5, 2.5), rect(3, 15, 8, 5, 2.5), rect(13, 15, 8, 5, 2.5)]),

  net("websocket-close", "network", "WebSocket close", "A WebSocket closed — the two-way channel shut, with a code saying why",
    ["shut", "two-way", "code"], [], ["websocket close", "close frame", "socket disconnect", "connection closed"], "chain",
    [disc(4, 12, 2), disc(20, 12, 2), poly([[6, 8], [10, 8]]), poly([[14, 8], [18, 8]]), poly([[18, 16], [14, 16]]), poly([[10, 16], [6, 16]])]),
];
