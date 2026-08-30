"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { downloadSvg } from "@/lib/download";
import { copyPng, ico, rasterise, save } from "@/lib/raster";

const PNG_SIZES = [16, 24, 32, 48, 64, 128, 256, 512];

const DownloadGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5v11.6M7.4 10.6l4.6 4.6 4.6-4.6" />
    <path d="M4 17.5v2.4a.6.6 0 0 0 .6.6h14.8a.6.6 0 0 0 .6-.6v-2.4" />
  </svg>
);

/**
 * The download button, opened out: SVG as before, then PNG at the sizes people actually
 * ask for, WebP, a favicon, JPEG for the one person who needs it, and PNG to the
 * clipboard. Everything is made from the SVG the studio is showing, so the variant,
 * weight and colour on screen are what lands on disk.
 */
export function DownloadMenu({ svg, base, hex, compact = false }: { svg: string; base: string; hex?: string | null; compact?: boolean }) {
  const [busy, setBusy] = useState<string | null>(null);
  const run = async (key: string, fn: () => Promise<void>, done: string) => {
    setBusy(key);
    try { await fn(); toast.success(done); }
    catch (e) { toast.error(e instanceof Error ? e.message : "That did not work"); }
    finally { setBusy(null); }
  };
  const item = "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[13px] text-ink-2 transition-colors hover:bg-sunk hover:text-ink disabled:opacity-50";
  return (
    <Popover>
      {compact ? (
        // The drawer's action row is icon-only buttons with tooltips; this one opens the menu.
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon-lg" aria-label="Download">
                <DownloadGlyph />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>Download</TooltipContent>
        </Tooltip>
      ) : (
        <PopoverTrigger asChild>
          <Button variant="outline">
            <DownloadGlyph />
            Download
          </Button>
        </PopoverTrigger>
      )}
      <PopoverContent align="start" className="w-60 p-1">
        <p className="label px-2.5 pt-1.5 pb-1">Vector</p>
        <button className={item} onClick={() => { downloadSvg(svg, `${base}.svg`, hex); toast.success("SVG saved"); }}>SVG <span className="font-mono text-[11px] text-muted">.svg</span></button>
        <p className="label px-2.5 pt-2 pb-1">PNG · transparent</p>
        <div className="grid grid-cols-4 gap-1 px-1 pb-1">
          {PNG_SIZES.map((px) => (
            <button key={px} disabled={busy !== null}
              className="rounded-md border border-line px-1 py-1 font-mono text-[11.5px] tabular-nums text-ink-2 transition-colors hover:border-accent hover:text-ink disabled:opacity-50"
              onClick={() => run(`png${px}`, async () => save(await rasterise(svg, px, "image/png", hex), `${base}-${px}.png`), `PNG ${px}px saved`)}>
              {px}
            </button>
          ))}
        </div>
        <p className="label px-2.5 pt-2 pb-1">More</p>
        <button className={item} disabled={busy !== null} onClick={() => run("copy", () => copyPng(svg, 256, hex), "PNG copied to the clipboard")}>Copy PNG <span className="font-mono text-[11px] text-muted">256px</span></button>
        <button className={item} disabled={busy !== null} onClick={() => run("webp", async () => save(await rasterise(svg, 512, "image/webp", hex), `${base}.webp`), "WebP saved")}>WebP <span className="font-mono text-[11px] text-muted">512px</span></button>
        <button className={item} disabled={busy !== null} onClick={() => run("ico", async () => save(await ico(svg, [16, 32, 48], hex), `${base}.ico`), "Favicon saved")}>Favicon <span className="font-mono text-[11px] text-muted">.ico 16·32·48</span></button>
        <button className={item} disabled={busy !== null} onClick={() => run("jpg", async () => save(await rasterise(svg, 512, "image/jpeg", hex), `${base}.jpg`), "JPEG saved")}>JPEG <span className="font-mono text-[11px] text-muted">white ground</span></button>
      </PopoverContent>
    </Popover>
  );
}
