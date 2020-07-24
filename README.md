# developers.chrome.com

## Open questions

- Do we want to separate the site from the server even more in the project structure?

## Critical styles vs lazy loaded styles
The `sass.js` gulp-task has a list of stylesheets it knows it should treat as
critical. These sheets get output to `src/_includes/css` instead of `dist`.
Page layouts can use the `{% set pageCriticalStyles = [...] %}` variable to
specify which stylesheets should be inlined.

In addition, layouts can use the `{% set pageStylesheets = [...] %}` variable
to specify which stylesheets should be lazy loaded.

Example:

```njk
{# _includes/layouts/home.njk #}

{% set pageCriticalStyles = ['css/critical.css'] %}
{% set pageStylesheets = ['css/pages/home.css'] %}
```

Take a look at `base.njk` to see how all of this is wired up.

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

## File watchers
Some file watchers have an `ignoreInitial` command which tell them to watch
the files but skip doing an initial compile. This is useful if you want to
run some compile steps in series, then start the server and watch for changes.

Example:

npm run gulp && npm run rollup && [...tell gulp and rollup to watch for changes]

rollup doesn't support this (if you do `rollup -c -w` it will compile and watch)
which means you end up running rollup twice. To work around this we use chokidar
directly to watch for js changes and run rollup.