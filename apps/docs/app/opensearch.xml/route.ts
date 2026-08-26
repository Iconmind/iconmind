import { iconCount } from "@/lib/icons";

export const dynamic = "force-static";

/**
 * Search the set from the browser's address bar.
 *
 * A visitor who has been here once can then type `iconmind`, press Tab, and search 788
 * icons without loading the site first. It costs one static file and one `<link>` in the
 * head, and it is the kind of thing a reference site is expected to have.
 *
 * The template points at `/search/`, which is the route that works with no JavaScript —
 * not at the ⌘K palette, which cannot be reached from a URL.
 */
export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>IconMind</ShortName>
  <Description>Search ${iconCount} open-source icons for AI-era software</Description>
  <InputEncoding>UTF-8</InputEncoding>
  <Image width="32" height="32" type="image/svg+xml">https://iconmind.dev/icon.svg</Image>
  <Url type="text/html" method="get" template="https://iconmind.dev/search/?q={searchTerms}"/>
  <moz:SearchForm xmlns:moz="http://www.mozilla.org/2006/browser/search/">https://iconmind.dev/search/</moz:SearchForm>
</OpenSearchDescription>
`;
  return new Response(body, {
    headers: { "content-type": "application/opensearchdescription+xml; charset=utf-8" },
  });
}
