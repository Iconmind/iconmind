interface Props { body: string; size?: number; strokeWidth?: number; className?: string }

/**
 * Renders icon paths inline. `body` comes from the source SVG at build time, so the
 * markup on the page is the same geometry the package ships — not a copy that can rot.
 */
export function IconSvg({ body, size = 24, strokeWidth = 2, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false" className={className}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
