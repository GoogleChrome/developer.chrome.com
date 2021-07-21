---
title: New in Chrome 86
description: >
  Chrome 86 is rolling out now! The file system access API is now available in
  stable. There are new origin trials for Web HID and the Multi-Screen Window
  placement API. There's some new stuff in CSS, and plenty more. Let's dive in
  and see what's new for developers in Chrome 86!
layout: 'layouts/blog-post.njk'
date: 2020-10-06
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/kbhFWEqJ4RvM4SzmZNxd.jpg'
alt: 'Cropped Chrome logo on the left, version number on the right.'
tags:
  - new-in-chrome
  - chrome-86
---

Chrome 86 is starting to roll out to stable now.

{% YouTube id='GNuG-5m4Ud0' %}

Here's what you need to know:

* The [File System Access API](#fs-access) is now available in stable.
* There are new origin trials for [Web HID](#web-hid) and the
  [Multi-screen Window Placement API](#win-place).
* There's some new stuff in CSS, and [plenty more](#more).

I'm [Pete LePage](https://twitter.com/petele), working and shooting from home,
let's dive in and see what's new for developers in Chrome 86!

## File System Access {: #fs-access }

Today, you can use the `<input type="file">` element read a file from disk.
To save changes, add [`download`][a-download] to an anchor tag, it'll show the
file picker, then saves the file. There's no way to write to the same file
you opened. That workflow is annoying.

With the File System Access API (formerly the Native File System API), which
graduated from it's origin trial, and is now available in stable, you
can call `showOpenFilePicker()`, which shows a file picker, then returns a
file handle that you can use to read the file.

```js
async function getFileHandle() {
  const opts = {
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt', '.text'],
          'text/html': ['.html', '.htm']
        }
      }
    ]
  };
  return await window.showOpenFilePicker(opts);
}
```

To save a file to disk, you can either use that file handle that you got
earlier, or call `showSaveFilePicker()` to get a new file handle.

```js
async function saveFile(fileHandle) {
  if (!fileHandle) {
    fileHandle = await window.showSaveFilePicker();
  }
  const writable = await fileHandle.createWritable();
  await writable.write(contents);
  await writable.close();
}
```

<figure class="float-right">
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/9zxgacmiGxvljxLSDkOD.jpg", alt="permission prompt screen shot", height="281", width="800" %}
  <figcaption>
    Prompt to the user requesting permission to write to a file.
  </figcaption>
</figure>

Before writing, Chrome will check if the user has granted write permission,
if write permission hasn't been granted, Chrome will prompt the user first.

Calling `showDirectoryPicker()` will open a directory, allowing you to get a
list of files, or create new files in that directory. Perfect for things like
IDEs, or media players that interact with lots of files. Of course, before
you can write anything, the user must grant write permission.

There's a lot more to the API, so check out the
[File System Access article][fs-article] on web.dev.

## Origin Trial: WebHID {: #web-hid }

<figure class="float-right">
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/s3z7rDiMGGKttmxRSSlL.jpg", alt="Game controller", height="534", width="800" %}
  <figcaption>
    Game controller.
  </figcaption>
</figure>

Human interface devices, commonly referred to as HID, takes input from, or
provides output to... humans. There's a long tail of human interface devices
that are too new, too old, or too uncommon to be accessible by the systems'
device drivers.

The WebHID API, now available as an [origin trial][ot-hid], solves this by providing
a way to access these devices in JavaScript. With WebHID, web based games can
take full advantage of gamepads, including all of the buttons, joysticks,
sensors, triggers, LEDs, rumble packs, and more.

```js
butOpenHID.addEventListener('click', async (e) => {
  const deviceFilter = { vendorId: 0x0fd9 };
  const opts = { filters: [deviceFilter] };
  const devices = await navigator.hid.requestDevice(opts);
  myDevice = devices[0];
  await myDevice.open();
  myDevice.addEventListener('inputreport', handleInpRpt);
});
```

Web based video chat apps can use the telephony buttons on specialized
speakers, to start or end calls,  mute the audio, and more.

<figure class="float-right">
  {% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/zzryfqePHZDWDS8W4OQy.jpg", alt="HID device picker", height="513", width="800" %}
  <figcaption>
    HID device picker.
  </figcaption>
</figure>

Of course, powerful APIs like this, can only interact with devices when the
user explicitly chooses to allow it.

Check out [Connecting to uncommon HID devices](https://web.dev/hid/)
for more details, examples, how you can get started, and a cool demo.

<br style="clear:both;">

## Origin Trial: Multi-Screen Window Placement API {: #win-place }

Today, you can get the properties of the screen the browser window is on by
calling `window.screen()`. But what if you have a multi-monitor setup? Sorry,
the browser will only tell you about the screen it's currently on.

```js
const screen = window.screen;
console.log(screen);
// {
//   availHeight: 1612,
//   availLeft: 0,
//   availTop: 23,
//   availWidth: 3008,
//   colorDepth: 24,
//   orientation: {...},
//   pixelDepth: 24,
//   width: 3008
// }
```

The Multi-Screen Window Placement API, starts an [origin trial][ot-wplace] in
Chrome 86, it allows you to enumerate the screens connected to your machine,
and place windows on specific screens. Being able to place windows on specific
screens is critical for things like presentation apps, financial services apps,
and more.

Before you can use the API, you'll need to request permission. If you don't,
the browser will prompt the user when you first try to use it.

```js
async function getPermission() {
  const opt = { name: 'window-placement' };
  try {
    const perm = await navigator.permissions.query(opt);
    return perm.state === 'granted';
  } catch {
    return false;
  }
}
```

Once the user has granted permission, calling `window.getScreens()` returns a
promise that resolves with an array of `Screen` objects.

```js
const screens = await window.getScreens();
console.log(screens);
// [
//   {id: 0, internal: false, primary: true, left: 0, ...},
//   {id: 1, internal: true, primary: false, left: 3008, ...},
// ]
```

I can then use that information when calling `requestFullScreen()`, or placing
new windows. Tom has all the details in his
[Managing several displays with the Multi-Screen Window Placement API][wd-window]
article on web.dev.

## And more {: #more }

The new CSS selector, `:focus-visible`, lets you opt-in to the same heuristic
the browser uses when it's deciding whether to display the default focus
indicator.

```css
/* Focusing the button with a keyboard will
   show a dashed black line. */
button:focus-visible {
  outline: 4px dashed black;
}

/* Focusing the button with a mouse, touch,
   or stylus will show a subtle drop shadow. */
button:focus:not(:focus-visible) {
  outline: none;
  box-shadow: 1px 1px 5px rgba(1, 1, 0, .7);
}
```

You can customize the color, size, or type of number or bullet for lists with
the CSS `::marker` Pseudo-Element.

```css
li::marker {
  content: '😍';
}
li:last-child::marker {
  content: '🤯';
}
```

And Chrome Dev Summit will be coming to a screen near you, so stay tuned to
our YouTube channel for more info!

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 86.

* [What's new in Chrome DevTools (86)](/blog/new-in-devtools-85)
* [Chrome 86 deprecations & removals](https://developers.google.com/web/updates/2020/09/chrome-86-deps-rems)
* [ChromeStatus.com updates for Chrome 86](https://www.chromestatus.com/features#milestone%3D86)
* [What's new in JavaScript in Chrome 86](https://v8.dev/blog/v8-release-86)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/85.0.4183.85..86.0.4240.75)

## Subscribe

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video, or add our
[RSS feed](https://developers.google.com/web/shows/rss.xml) to your feed reader.

I'm Pete LePage, and as soon as Chrome 87 is released, I'll be right here to
tell you -- what's new in Chrome!

[a-download]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/download
[fs-article]: https://web.dev/file-system-access/
[wd-window]: https://web.dev/multi-screen-window-placement/
[ot-hid]: /origintrials/#/view_trial/1074108511127863297
[ot-wplace]: /origintrials/#/view_trial/1411878483180650497
