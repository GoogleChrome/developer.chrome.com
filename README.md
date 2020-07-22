# developers.chrome.com

## Asset hashing
CSS and JS files use the `global.hashAsset` function to append a version string.
Every time eleventy rebuilds, it will scan the dist directory for assets and
hash them.

This means the hash string only updates when eleventy rebuilds, but this is
fine because the assets aren't cached in dev and the version string is ignored.

This means CSS and JS can rebuild quickly, without needing to rebuild the
entire site.