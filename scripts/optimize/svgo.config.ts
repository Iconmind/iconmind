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
          removeViewBox: false,        // viewBox is mandatory
          // convertPathData is left at its defaults on purpose. Overriding it — even
          // with the seemingly protective `removeUseless: false` — makes it rewrite the
          // dot idiom `h.01` as a closepath, and a zero-length closed subpath is not
          // reliably rendered as a dot. Verified against svgo 4.0.2; re-check on upgrade.
          mergePaths: false,           // destroys diff readability
          convertShapeToPath: false,   // circle/rect read better than path data
        },
      },
    },
    "removeComments",
    "removeMetadata",
    "removeEditorsNSData",
    "removeDesc",
    "removeTitle",
    "cleanupIds",
    { name: "cleanupNumericValues", params: { floatPrecision: 2 } },
    "convertTransform",
    "removeUselessStrokeAndFill",
    "sortAttrs",
  ],
};
