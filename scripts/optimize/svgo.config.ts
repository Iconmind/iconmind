import type { Config } from "svgo";

/**
 * Deliberately conservative. SVGO's job here is to strip junk, not to be clever:
 * merging paths and converting shapes to paths both make the source unreadable in a
 * diff, and a reviewer who cannot read the diff cannot review the icon.
 */
export const svgoConfig: Config = {
  multipass: true,
  js2svg: { pretty: false, eol: "lf" },
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          // `removeViewBox` used to be overridden to false here. It is not in
          // preset-default in svgo 4, so the override was never doing anything except
          // making SVGO warn on every call — and viewBox survives regardless, because
          // nothing in the preset removes it.
          // convertPathData is left at its defaults on purpose. Overriding it — even
          // with the seemingly protective `removeUseless: false` — makes it rewrite the
          // dot idiom `h.01` as a closepath, and a zero-length closed subpath is not
          // reliably rendered as a dot. Verified against svgo 4.0.2; re-check on upgrade.
          mergePaths: false,           // destroys diff readability
          convertShapeToPath: false,   // circle/rect read better than path data
          cleanupNumericValues: { floatPrecision: 2 },
        },
      },
    },
    // Only what preset-default does not already run. The nine that used to be listed
    // here — removeComments, removeMetadata, removeEditorsNSData, removeDesc, removeTitle,
    // cleanupIds, cleanupNumericValues, convertTransform, removeUselessStrokeAndFill —
    // are all in the preset, and naming them again made SVGO print a nine-line warning on
    // every single call. Invisible behind `| tail -1` in the optimizer; two and a half
    // megabytes of it once the validator started calling the same function 6388 times.
    // Their parameters belong in `overrides` above, not in a second list.
    "sortAttrs",
  ],
};
