---
title: New in Chrome 93
description: >
  Chrome 93 is rolling out now! You can now load CSS style sheets with import
  statements, just like JavaScript modules. Installed PWAs can register as
  URL handlers, making it possible for users to jump straight into your PWA.
  The Multi-Screen Window Placement API has been updated based on your
  feedback, and starts a second origin trial. We're shortening the release
  cycle for stable to four weeks. And there's plenty more.
layout: 'layouts/blog-post.njk'
date: 2021-08-31
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/WHMxxltpvNS4t3YAEkLL.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-93
---

{% YouTube id='R5RUVO_g2NI' %}

Here's what you need to know:

* You can now load CSS style sheets with [`import` statements](#css-modules),
  just like JavaScript modules.
* Installed PWAs can register as [URL handlers](#url-handlers), making it
  possible for users to jump straight into your PWA.
* The [Multi-Screen Window Placement API](#window-placement) has been updated
  based on your feedback, and starts a second origin trial.
* The [PWA Summit](#pwa-summit) is coming up October 6-7.
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com), working, and shooting
from home, let's dive in and see what's new for developers in Chrome 93.

## CSS Module Scripts {: #css-modules }

You can now load CSS style sheets with `import` statements, just like
JavaScript modules. The style sheets can then be applied to the document or
shadow roots in the same manner as constructable stylesheets.

The new CSS Module Scripts feature is great for custom elements. And unlike
other ways of applying CSS from JavaScript, there is no need to create
elements, or mess with JavaScript strings of CSS text.

To use it, import the style sheet with `assert {type: 'css'}`, then apply it
to the `document` or `shadowRoot` by calling `adoptedStyleSheets`.

```js
import sheet from './styles.css' assert { type: 'css' };
document.adoptedStyleSheets = [sheet];
shadowRoot.adoptedStyleSheets = [sheet];
```

But beware, if you leave off the `assert` - the file will be treated as
JavaScript, and won't work!

Check out [Using CSS Module Scripts to import stylesheets][wd-css-modules] on
web.dev for complete details.

## Multi-Screen Window Placement API {: #window-placement }

For some apps, opening new windows and putting them in specific places
or specific displays is an important feature. For example, when using Slides to
present, I want the slides to appear full screen on the primary display, and
my speaker notes to appear on the other display.

The Multi-Screen Window Placement API makes it possible to enumerate the
displays connected to the users machine, and place windows on specific screens.
This is its second origin trial, and we've made a number of changes based on
your feedback.

You can quickly check if there's more than one screen connected to the device:

```js
const isExtended = window.screen.isExtended;
// returns true/false
```

But, the key functionality is in `window.getScreens()`, which provides all the
details about the attached displays.

```js
const screens = await window.getScreens();
// returns
// {
//    currentScreen: {...}
//    oncurrentscreenchange: null
//    onscreenschange: null
//    screens: [{...}, {...}]
// }
```

For example, you can determine the primary screen, then use `requestFullscreen()`
to display an element on that screen.

```js
try {
  const screens = await window.getScreens();
  const primary = screens.filter((screen) => screen.primary)[0];
  await elem.requestFullscreen({ screen: primary });
} catch (err) {
  console.error(err);
}
```

And it provides a way to listen for changes, for example if a new display is
plugged in, or removed.

```js
const screens = await window.getScreens();
let numScreens = screens.screens.length;
screens.addEventListener('screenschange', (event) => {
  if (screens.screens.length !== numScreens) {
    console.log('Screen count changed');
    numScreens = screens.screens.length;
  }
});
```

Check out Tom's article
[Managing several displays with the Multi-Screen Window Placement API][wd-multi-screen]
on web.dev for a deeper dive.

## Shortened release cycle {:# shortened-release-cycle }

In March, we announced our plans to [shorten the release cycle][dcc-shorter-cycle]
and ship a new version of Chrome every four weeks.

That time has arrived, and we'll ship Chrome 94 on September 21st. You can find
planned release dates for each version on the [Chrome Calendar][chrome-cal].

## New PWA features {: #new-pwa}

If you're building a Progressive Web App, there are two new origin trials
worth checking out.

### URL handlers for PWAs {: #url-handlers }

{% Aside %}
This actually launched as an origin trial in Chrome 92, but I'm covering
it now since I haven't covered it previously.
{% endAside %}

If you have a PWA installed, and you click on a link to that PWA, you probably
want it to open in the PWA, **not** a browser tab.

By specifying [`url_handlers`][wd-url-handlers] in your
[web app manifest][wd-manifest], and adding a `web-app-origin-association`
file to your `.well-known/` directory, you can tell the browser that if a
user clicks a link to your PWA, it should open within the installed PWA.

Example `url_handlers` in the `manifest.json` file:

```json
{
  ...
  "url_handlers": [
    {"origin": "https://music.example.com"}
  ]
}
```

Example `web-app-origin-association` file:

```json
{
  "web_apps": [
    {
      "manifest": "https://music.example.com/manifest.json",
      "details": {
        "paths": ["/*"],
        "exclude_paths": ["/internal/*"]
      }
    }
  ]
}
```

And with a little extra verification, you can even have your PWA handle links
from other origins you own.

All the details about the origin trial are in
[PWAs as URL Handlers][wd-url-handlers] on web.dev.

### Window controls overlay {: #window-controls-overlay }

Window controls overlay extends the client area to cover the entire window,
including the title bar, and the window control buttons, like the close,
maximize, and minimize buttons.

You can use this feature to make your installed PWA look more like other
installed apps.

For more information about the origin trial, check out
[Customize the window controls overlay of your PWA's title bar][wd-wco].

## PWA Summit

The [PWA Summit][pwa-summit] is coming up in October. It's a
a free, online conference focused on helping everyone succeed with Progressive
Web Apps. The PWA Summit is a collaboration between folks from a handful of
different companies involved in the creation of PWA technologies: Google,
Intel, Microsoft, and Samsung.

There are a ton of great talks and content. You can learn more and register at
[PWASummit.org][pwa-summit].

## And more! {: #more }

Of course there's plenty more.

* Flexbox and flexbox items have added support for the alignment keywords:
  `start`, `end`, `self-start`, `self-end`, `left`, and `right`.
* The async clipboard API now supports SVG files.
* And, the `media` attribute will be honored when setting `meta` `theme-color`,
  so you can specify different theme colors for light and dark modes.

```html
<meta name="theme-color"
      media="(prefers-color-scheme: light)"
      content="white">

<meta name="theme-color"
      media="(prefers-color-scheme: dark)"
      content="black">
```

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 93.

* [What's new in Chrome DevTools (93)](/blog/new-in-devtools-93)
* [Chrome 93 deprecations & removals](/blog/deps-rems-93/)
* [ChromeStatus.com updates for Chrome 93](https://www.chromestatus.com/features#milestone%3D93)
* [What's new in JavaScript in Chrome 93](https://v8.dev/blog/v8-release-93)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/92.0.4515.105..93.0.4577.69)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5)
to [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 94 is released, I'll be right here to
tell you what's new in Chrome!

[chrome-cal]: https://chromiumdash.appspot.com/schedule
[pwa-summit]: https://pwasummit.org/
[wd-wco]: https://web.dev/window-controls-overlay/
[wd-manifest]: https://web.dev/add-manifest/
[wd-css-modules]: https://web.dev/css-module-scripts/
[wd-url-handlers]: https://web.dev/pwa-url-handler/
[wd-multi-screen]: https://web.dev/multi-screen-window-placement/
[dcc-shorter-cycle]: https://developer.chrome.com/blog/faster-release-cycle/
