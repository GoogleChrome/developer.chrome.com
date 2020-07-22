# developers.chrome.com

## Critical styles vs lazy loaded styles
The `sass.js` gulp-task has a list of stylesheets it knows it should treat as
critical. These sheets get output to `src/_includes/css` instead of `dist`.
Page layouts can use the `{% set pageCriticalStyles = [...] %}` variable to
specify which stylesheets should be inlined.

In addition, layouts can use the `{% set pageStylesheets = [...] %}` variable
to specify which stylesheets should be lazy loaded.

Example:

```njk
{# _includes/layouts/home.html #}

{% set pageCriticalStyles = ['css/critical.css'] %}
{% set pageStylesheets = ['css/pages/home.css'] %}
```

Take a look at `base.html` to see how all of this is wired up.

## Asset hashing
CSS and JS files use the `helpers.hashAsset` function to append a version string.
Every time eleventy rebuilds, it will scan the dist directory for assets and
hash them.

This means the hash string only updates when eleventy rebuilds, but this is
fine because the assets aren't cached in dev and the version string is ignored.

This means CSS and JS can rebuild quickly, without needing to rebuild the
entire site.

## Running eleventy programmatically
Eleventy v0.11 provides a `beforeWatch` lifecycle hook. Eleventy v1 will provide
`beforeBuild` and `afterBuild` lifecycle hooks. [Documentation](https://github.com/11ty/11ty-website/pull/562).