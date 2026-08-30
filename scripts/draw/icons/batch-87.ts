/**
 * Batch 87 — the devices people kept asking other icon sets for.
 *
 * Taken from the most-reacted open icon requests in the Lucide and Tabler trackers, minus
 * everything that turned out to exist here already (a phone is `phone`, a watch is
 * `smartwatch`, the pointer arrow is `cursor`, a desktop screen is `monitor`) and minus
 * the ones that would collide with a body this set has spoken for: no plug, because the
 * two-pronged plug *is* the tool icon; no antenna, because arcs rising from a point are
 * broadcast and wifi.
 *
 * Unattended round. Every name checked free before drawing.
 */
import { arc, col, disc, poly, rect, row } from "../forms.ts";
import type { Icon } from "../build.ts";

const dev = (slug: string, category: string, subcategory: string, name: string, description: string,
  tags: string[], aliases: string[], keywords: string[], family: string, shapes: Icon["shapes"]): Icon =>
  ({ slug, category, subcategory, name, description, tags, family, aliases, keywords, shapes });

export const BATCH_87: Icon[] = [
  dev("mouse", "interface", "media", "Mouse", "A computer mouse — the pointing device itself, its button seam and scroll wheel",
    ["pointing", "wheel", "input"], [], ["computer mouse", "pointing device", "scroll wheel", "input device"], "device",
    [rect(7, 2, 10, 20, 5), row(9, 7, 17), col(12, 5, 8)]),

  dev("printer", "interface", "media", "Printer", "A printer with a sheet coming out — send this to paper, print the page",
    ["print", "paper", "output"], [], ["print", "printer", "hard copy", "paper output"], "device",
    [poly([[7, 6.5], [7, 2], [17, 2], [17, 6.5]]), rect(2, 8.5, 20, 8, 2), disc(5.5, 12.5, 1), poly([[7, 18], [7, 22], [17, 22], [17, 18]])]),

  dev("router", "cloud", "network", "Router", "A router with two aerials — the box a local network runs through",
    ["network", "gateway", "wifi"], [], ["router", "wifi box", "home network", "access point"], "device",
    [rect(2, 9, 20, 8, 2), disc(6, 14, 1), disc(10, 14, 1), poly([[7, 9], [4, 6]]), poly([[17, 9], [20, 6]])]),

  dev("usb", "devops", "infrastructure", "USB", "The USB trident — a port, a stick or a cable that plugs into one",
    ["port", "stick", "connector"], [], ["usb", "usb port", "thumb drive", "flash drive"], "figure",
    [col(12, 3, 20), disc(12, 20, 2), poly([[12, 12], [16.5, 7.5]]), disc(17.5, 6.5, 2), poly([[12, 15], [7.5, 10.5]]), poly([[3, 7.5], [7.5, 7.5], [7.5, 12], [3, 12]], true)]),

  dev("sim-card", "devops", "infrastructure", "SIM card", "A SIM card with its cut corner and contact pad — the chip that carries a subscription",
    ["chip", "carrier", "mobile"], ["sim"], ["sim card", "esim", "carrier chip", "mobile subscription"], "card",
    [poly([[9, 2], [20, 2], [20, 22], [4, 22], [4, 7]], true), rect(8, 9, 8, 8, 2), row(13, 8, 16)]),

  dev("sd-card", "devops", "infrastructure", "SD card", "An SD card with its notched corner — removable storage for a camera or a board",
    ["storage", "removable", "camera"], ["memory-card"], ["sd card", "micro sd", "memory card", "removable storage"], "card",
    [poly([[4, 2], [15, 2], [20, 7], [20, 22], [4, 22]], true), col(8, 5, 9), col(11, 5, 9), col(14, 8, 12)]),

  dev("ethernet", "cloud", "network", "Ethernet", "An RJ45 plug with its clip and pins — a wired network connection",
    ["rj45", "wired", "port"], [], ["ethernet", "rj45", "lan port", "network cable"], "device",
    [poly([[5, 8], [9, 8], [9, 4], [15, 4], [15, 8], [19, 8], [19, 20], [5, 20]], true), col(9, 11, 15), col(12, 11, 15), col(15, 11, 15)]),

  dev("laptop", "interface", "media", "Laptop", "A laptop, screen open over its base — the portable machine the work happens on",
    ["computer", "portable", "screen"], ["notebook-computer"], ["laptop", "macbook", "portable computer", "notebook"], "device",
    [rect(4, 3, 16, 12, 2), row(19, 2, 22), col(4, 15, 19), col(20, 15, 19)]),

  dev("tablet", "interface", "media", "Tablet", "A tablet held upright, its button below the screen — the middle-sized device",
    ["ipad", "touchscreen", "device"], [], ["tablet", "ipad", "touch device", "e-reader"], "device",
    [rect(4, 2, 16, 20, 2), row(17, 4, 20), disc(12, 19.5, 1)]),

  dev("speaker", "interface", "media", "Speaker", "A speaker cabinet with its cone and tweeter — sound played out loud",
    ["audio", "sound", "cabinet"], [], ["speaker", "loudspeaker", "audio output", "sound system"], "device",
    [rect(5, 2, 14, 20, 2), disc(12, 15, 4), disc(12, 7, 2)]),

  dev("gamepad", "interface", "media", "Gamepad", "A controller with its pad and buttons — play, or the input a game takes",
    ["controller", "game", "input"], ["controller"], ["gamepad", "game controller", "joypad", "console controller"], "device",
    [rect(2, 6.5, 20, 11, 5.5), col(7, 9.5, 14.5), row(12, 4.5, 9.5), disc(16, 10.5, 1), disc(19, 13.5, 1)]),

  dev("cable", "devops", "infrastructure", "Cable", "Two connectors joined by a lead — the physical link between one thing and another",
    ["lead", "wire", "connector"], [], ["cable", "wire", "lead", "connector"], "chain",
    [rect(2, 4, 7, 7, 2), poly([[9, 7.5], [12, 7.5], [16, 11.5]]), poly([[16, 11.5], [16, 14]]), rect(12.5, 14, 7, 7, 2)]),

  dev("motherboard", "devops", "infrastructure", "Motherboard", "A board with its chip and pin header — the hardware a system is assembled on",
    ["board", "hardware", "chip"], ["mainboard"], ["motherboard", "circuit board", "pcb", "hardware"], "window",
    [rect(2, 3, 20, 18, 2), rect(5.5, 6.5, 8, 8, 2), disc(18, 8, 1), disc(18, 12, 1), disc(18, 16, 1)]),

  dev("battery-charging", "interface", "state", "Battery charging", "A battery with a bolt through it — power going in, charging now",
    ["charging", "power", "bolt"], ["battery-full"], ["charging", "battery charging", "plugged in", "power in"], "window",
    [rect(2, 7, 15, 10, 2), col(20, 10, 14), poly([[11, 9], [8, 12], [11, 12], [8, 15]])]),

  dev("satellite", "cloud", "network", "Satellite", "A dish on its mount — a satellite link, the ground station end of it",
    ["dish", "uplink", "ground-station"], ["satellite-dish"], ["satellite", "dish", "uplink", "ground station"], "device",
    [arc(11, 13, 8, 200, 20), poly([[11, 13], [17, 7]]), col(11, 13, 20), row(20, 6, 16)]),

  dev("headset", "interface", "media", "Headset", "Headphones with a microphone arm — take the call, or talk to a voice agent",
    ["call", "support", "voice"], [], ["headset", "call centre", "voice support", "gaming headset"], "figure",
    [arc(12, 11, 8, 180, 360), rect(3, 11, 4, 7, 2), rect(17, 11, 4, 7, 2), poly([[21, 18], [21, 21], [15, 21]]), disc(12.5, 21, 1)]),
];
