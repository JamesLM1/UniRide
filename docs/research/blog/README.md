# Blog source and presentation

The 12 selected entries come from the team's public Blogger feed. Source order follows the user's list: six individual posts, then six team posts. Original author names and publication timestamps are retained. Two feed titles were empty; their visible first heading supplies the title (Alex's h1 and Jairo's h3).

`scripts/sync-blogger-articles.mjs` reads the public feed snapshot in `work/uniride-blogger-feed.json`, selects exactly those 12 permalinks, and produces the shared backward-compatible `Article` catalog. The five previously published local routes stay unchanged. Read time is computed from the extracted text, not a Blogger claim. Theme labels are editorial groupings of these article subjects.

Only plain text, headings, lists and image URLs are extracted. Source scripts, styles, iframes and forms are removed; inline attributes and HTML are never inserted into the page. Full source typography and embedded links remain available through each entry's Blogger link. Content blocks retain the source's original order and wording. Each local mirror has the original Blogger URL as its canonical page.

The overview follows the inspected CobrApp blog: Archivo display typography, 1240px container including gutters, notebook-paper decoration, a taped-image feature, four taped theme tiles, numbered editorial rows in two columns, ruled separators and green closing panel. The subject filters, article anchors, source links, tool links and related article links work. Layout adapts to one column on small screens and uses the shared light/dark palette.

`source-catalog.json` records the 12 sources and extraction counts. `mirror-blog-images.mjs` optionally downloads source images and writes `image-map.json`; the sync step applies that map when present. A failed download retains its original public URL. Image copyrights and claims remain with the source; the site identifies the project as an academic prototype and its source illustrations as conceptual.
