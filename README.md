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

## Gorko
The scss in this project is using
[Gorko](https://github.com/hankchizljaw/gorko). A small, handy library for
generating utility classes based on design tokens.

Essentially it lets us do things like:

```scss
$gorko-config: (
  'stack': (
    'items': (
      '300': 0,
      '400': 10,
      '500': 20,
      '600': 30,
      '700': 40
    ),
    'output': 'standard',
    'property': 'z-index'
  )
)
```

Which will generate utility classes for us:

```css
.stack-300 {
  z-index: 0
}

.stack-400 {
  z-index: 10
}

...etc
```

In addition, you can set it to generate utility classes for each breakpoint.
This lets you do things like this in your HTML:

```html
<!-- Set the element's padding to 16px on mobile and 32px on desktop -->
<div class="pad-top-400 md:pad-top-700">
```

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

```
npm run gulp && npm run rollup && [...tell gulp and rollup to watch for changes]
```

rollup doesn't support this; if you do `rollup -c -w` it will compile _and_
watch, and `rollup -w` doesn't work on its own. To work around this we use
`chokidar` directly to watch for js changes and run rollup.