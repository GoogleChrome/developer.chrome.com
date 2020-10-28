# developer.chrome.com

developer.chrome.com is the ultimate resource for developers of all backgrounds
to learn about what's new in Chrome!

## Found a bug? 👷‍♀️

Thanks for letting us know! Please [file an issue](https://github.com/GoogleChrome/developers.chrome.com/issues/new?assignees=&labels=bug&template=bug_report.md&title=) and a team member should reply shortly.

## Authoring content ✍️

Before you start writing take a moment to look over the
[developer.chrome.com handbook](https://developer.chrome.com/docs/handbook) and
familiarize yourself with the process.

## Building the site 🏗

You'll need a recent version of [Node](https://nodejs.org/): v14 or higher.

### Clone the repo

```bash
git clone https://github.com/GoogleChrome/developers.chrome.com.git
```

### Install dependencies

```bash
npm ci
```

### Start a local server to preview the site

```bash
npm run dev
```

Open `http://localhost:8080/` to see the site locally. Changes to assets will
rebuild the site. Refresh to see your changes.

## Environments 🌳

To do a production build of the site and start the local server 
run `npm run production && npm start`.

## Staging 🕺

When you send in a pull request it will be automatically staged for you. Keep an
eye out for the netlify bot to comment on the pull request with your unique URL.

## Deploying the site 🚀

### Automatic deploys

The site will build and deploy the master branch automatically every hour,
Mon-Fri. If you've just merged an article then it should go live at the top
of the next hour.

## TODO

The next few sections are leftover engineering notes that we need to migrate
to our handbook. You can ignore them.

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

```bash
npm run gulp && npm run rollup && [...tell gulp and rollup to watch for changes]
```

rollup doesn't support this; if you do `rollup -c -w` it will compile *and*
watch, and `rollup -w` doesn't work on its own. To work around this we use
`chokidar` directly to watch for js changes and run rollup.
