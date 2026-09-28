# Interface In Game Catalog

Primary role: source-bound game UI archive lookup.

This catalog indexes the public [Interface In Game](https://interfaceingame.com/) archive as observed on 2026-09-28. It records 401 games, 15,394 image captures, 911 video captures, and 24 articles. The 16,305 capture records contain source links and media URLs, not copied media. Images and videos remain the property of their owners; links do not grant a reuse license.

## Routes

- [Game catalog](catalog.md) lists games, release dates, genres, themes, platforms, publishers, and capture counts.
- [Element patterns](elements.md) maps the site's 21 element facets to StyleGallery player-task and hierarchy vocabulary. Its implementation advice is locally authored, not observed behavior.
- [Genre and element matrix](genre-element-matrix.md) reports capture coverage and co-occurrence, generated from the data.
- [Unity uGUI implementation](../unity/ugui-implementation.md) translates these categories into a Canvas/prefab/input workflow and sample code.
- [Data manifest](data/manifest.json) states retrieval date, method, and counts; `games.json`, `screenshots.json`, `taxonomies.json`, and `articles.json` are the machine-readable records.

## Evidence Boundary

Game records and article identity come from the site's public WordPress API; capture records come from each game's paginated page. An image or video URL is provenance, not permission to republish the asset. The site's publisher names were unavailable, so their slugs are retained with null labels. Three Rollerdrome captures have no element tag in the source; no tag was inferred. The site's homepage element counters differ by one to three records for Credits, In game, and Menu; the per-game captures are the snapshot of record.

Refresh with `node scripts/crawl-interfaceingame.mjs --refresh --cache .omo/cache/interfaceingame --retrieved-on YYYY-MM-DD`, then run `node scripts/generate-interfaceingame-docs.mjs` and the validators. To reproduce from a saved crawl without network use `--offline --cache <saved-cache> --retrieved-on YYYY-MM-DD`; keep the original retrieval date in that case. Local thumbnail downloads are not part of this repository's governed data or its package.

## IA Navigation

Parent: [Game UI](../index.md).
Next: [Element Patterns](elements.md).
