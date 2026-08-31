import type { Metadata } from "next";
import Link from "next/link";
import { iconCount } from "@/lib/icons";
import { JsonLd, breadcrumbs } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "What's not here",
  description:
    "The icons and whole categories this set refuses to draw, with the reason for each: shapes the compiler rejected, names that turned out to be icons we already had, and the categories we decided against.",
  alternates: { canonical: "/not-here/" },
};

/**
 * The refusals, written down.
 *
 * A set of this size is easy to mistake for a pile: 2,387 drawings, added fast, in a
 * vocabulary nobody else covers. What separates the two is what got turned away, so this
 * page lists it. Every entry here is a decision somebody had to make and can be checked
 * against the repository: the gates that rejected a shape are the same commands anyone
 * can run.
 */
type Row = [name: string, reason: string];

const REFUSED: Row[] = [
  ["bluetooth", "The rune's spine and both diagonals meet at one point. That is three stroke crossings where the set allows two, and unlike an angle warning that rule cannot be waived with a reason."],
  ["plug", "The two-pronged plug is already what a tool looks like here. A second icon using the same body would make both of them mean less."],
  ["antenna", "Arcs rising from a point are broadcast and wifi. A third icon in that shape is a lookalike, not a new word."],
  ["warning triangle", "A triangle at the set's 45 degree limit reads as a tent at 16 px, so warning is a circle."],
  ["document-video", "No camera fits beside a page's wall with the three units of clearance a bold stroke needs."],
  ["mail-search", "The lens handle had nowhere to go: it either left the live area or touched the envelope."],
  ["clipboard-add", "The clip already crosses the board twice. A plus inside would be the third crossing."],
  ["hard-drive", "Too close to storage and block-storage, both of which already exist."],
  ["fan, sensor", "Neither could be drawn on 0/45/90 angles without turning into a shape the set already has. A fan's blades want free angles; a sensor kept becoming webcam."],
  ["calendar-1, heading-1, file-digit, the a–z sort arrows", "Letters and digits are typography, not drawings. At 16 px a 1 is an arrow and a Z is a chevron."],
  ["layout-template", "0.91 similarity against table. Two names, one picture."],
];

const ALIASED: Row[] = [
  ["mouse-pointer", "cursor"],
  ["map-pin and its whole family", "location, add-location, verified-location, location-removed"],
  ["smartphone, watch, desktop", "phone, smartwatch, monitor"],
  ["user-check", "human-approval"],
  ["clipboard-paste", "paste"],
  ["chart-no-axes-gantt", "span-trace"],
  ["document-key", "lockfile-tool"],
  ["chevrons-up, corner-down-left", "priority, command"],
  ["heart-add, heart-remove, heart-off", "favorite-add, favorite-remove, unlike"],
  ["scan-barcode, scan-qr-code", "barcode, qr"],
];

const REDRAWN: Row[] = [
  ["vote", "was stash's tray and arrow, line for line"],
  ["agentic-rag", "was agent-search's lens, one unit over"],
  ["taint", "was model-alert without the chamfer"],
  ["semantic", "was mcp with one end rounded off"],
  ["command", "was cli"],
  ["priority", "was arrow-up's arrow over more-vertical's column"],
];

const CATEGORIES: Row[] = [
  ["Brand and product logos", "They carry trademark weight this set does not want, and most brand guidelines forbid the modification a shared grid requires. Simple Icons already covers about 3,300 of them under CC0."],
  ["Cryptocurrency coins", "Coin icons are logos. cryptocurrency-icons covers roughly 500 of them, and Web3 Icons and Bitcoin Icons cover the rest."],
  ["Weather, food, animals, vehicles, zodiac, faces", "Generalist territory. Lucide and Tabler do it well, they are drawn on the same grid, and there is no reason for a second copy."],
  ["A filled variant", "Tried, and dropped. Two variants and three weights is already six drawings per icon; a seventh made the set harder to hold in the head without answering a question anyone asked."],
  ["An icon font", "A font flattens duotone and the three weights into one glyph. The sprite sheet covers the no-build-step case instead."],
  ["A Figma library and plugin", "Built on 30 August 2026 and removed the same day, before publishing. A hand-maintained Figma file is a second source of truth beside the compiler, and the two would diverge within a month. Iconify already carries the same generated output."],
  ["Paid icons", "The set stays MIT. Sponsorship and commissions are the way this gets funded, not a paywall on drawings."],
];

function Table({ rows, left, right }: { rows: Row[]; left: string; right: string }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full text-ui">
        <thead className="bg-sunk text-left">
          <tr>
            <th className="w-[30%] px-4 py-3 font-medium text-muted">{left}</th>
            <th className="px-4 py-3 font-medium text-muted">{right}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a} className="border-t border-line-2 align-top">
              <th scope="row" className="px-4 py-3 text-left font-mono text-[12.5px] font-normal text-ink">{a}</th>
              <td className="px-4 py-3 leading-relaxed text-ink-2">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function NotHerePage() {
  return (
    <div className="mx-auto max-w-[900px] px-5 pt-14 pb-24 sm:px-7">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              name: "What's not here",
              description: "Every icon and category this set refuses to draw, with the reason for each.",
              url: `${SITE_URL}/not-here/`,
              isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website` },
            },
            breadcrumbs([{ name: "What's not here", path: "/not-here/" }]),
          ],
        }}
      />

      <h1 className="text-h1 font-semibold">What&rsquo;s not here</h1>
      <p className="mt-3 max-w-[64ch] text-lead text-ink-2">
        {iconCount.toLocaleString("en-GB")} icons is a number that invites a fair question: was
        anything turned away? This page is the answer. Every refusal below is a decision with a
        reason, and most of them were made by a machine you can run yourself.
      </p>

      <section className="mt-12">
        <h2 className="text-h2 font-semibold">Shapes the compiler refused</h2>
        <p className="mt-2 max-w-[64ch] text-ui leading-relaxed text-ink-2">
          Every icon is a declaration compiled into six cells. The compiler rejects geometry it
          cannot draw correctly, and these are the drawings that lost that argument. Some of them
          are icons other sets ship happily; the rule mattered more than the entry.
        </p>
        <Table rows={REFUSED} left="Not drawn" right="Why" />
      </section>

      <section className="mt-12">
        <h2 className="text-h2 font-semibold">Names that were already an icon</h2>
        <p className="mt-2 max-w-[64ch] text-ui leading-relaxed text-ink-2">
          Roughly a third of every planned round turned out to exist under another name. Those
          became aliases rather than second drawings, so searching for the name you know finds the
          drawing that is already here.
        </p>
        <Table rows={ALIASED} left="What people search" right="What it resolves to" />
      </section>

      <section className="mt-12">
        <h2 className="text-h2 font-semibold">Drawn, then drawn again</h2>
        <p className="mt-2 max-w-[64ch] text-ui leading-relaxed text-ink-2">
          A nightly job rasterises all {(iconCount * 6).toLocaleString("en-GB")} cells and fails if
          two icons render alike. These six shipped in a release and were redrawn when it caught
          them.
        </p>
        <Table rows={REDRAWN} left="Icon" right="What it had become" />
      </section>

      <section className="mt-12">
        <h2 className="text-h2 font-semibold">Categories decided against</h2>
        <p className="mt-2 max-w-[64ch] text-ui leading-relaxed text-ink-2">
          These are not backlog items. They are settled, and the reasons are here so nobody has to
          ask twice.
        </p>
        <Table rows={CATEGORIES} left="Not in the set" right="Why" />
      </section>

      <section className="mt-12 border-t border-line pt-8">
        <h2 className="text-h2 font-semibold">Check it yourself</h2>
        <p className="mt-2 max-w-[64ch] text-ui leading-relaxed text-ink-2">
          None of this has to be taken on trust. Clone the repository and run the same gates every
          icon passes before it ships:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-line-2 bg-sunk px-4 py-3.5 font-mono text-[12px] leading-[1.7] text-ink-2">{`pnpm icons:build                   # draw every icon from its declaration
pnpm icons:validate                # every rule, all ${(iconCount * 6).toLocaleString("en-GB")} cells
pnpm icons:audit                   # size, ink and centring outliers
pnpm icons:twins                   # pixel-compare every pair at 24px
pnpm icons:duplicates --perceptual # the nightly scan that caught the six above`}</pre>
        <p className="mt-4 text-meta text-muted">
          Missing something that should be here?{" "}
          <a className="text-accent hover:text-ink" href="https://github.com/Iconmind/iconmind/issues/new?template=icon-request.yml">
            Ask for it
          </a>
          , or read the{" "}
          <Link className="text-accent hover:text-ink" href="/docs/design-guidelines/">design guidelines</Link>{" "}
          for the measurements behind each rule.
        </p>
      </section>
    </div>
  );
}
