---
title: New in Chrome 91
description: >
  Chrome 91 is rolling out! Web apps that interact with files can now
  suggest file names and directories when using the File System Access API.
  You can also read files from the clipboard! If your site has more than
  one domain, and they share the same account management backend, you can tell
  Chrome they're the same, allowing the password manager to suggest the right
  credentials. Plus, all the videos from I/O are now available, and there's plenty
  more.
layout: 'layouts/blog-post.njk'
date: 2021-05-26
authors:
  - petelepage
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hcxe0ZGQy0gh5pemX88c.png'
alt: >
  New in Chrome hero logo
tags:
  - new-in-chrome
  - chrome-91
---

{% YouTube id='vy6FXa0n1r0' %}

Here's what you need to know:

* Web apps that interact with files, can now
  [suggest file names and directories](#filenames) when using the File System Access API.
* You can [read files from the clipboard](#clipboard).
* If your [site has more than one domain](credentials), and they share the same
  account management backend, you can tell Chrome they're the same, allowing
  the password manager to suggest the right credentials.
* All the videos from I/O are available on [Chrome Developers YouTube channel](io-playlist)!
* And there's plenty [more](#more).

I'm [Pete LePage](https://petelepage.com/), working, and shooting
from home, let's dive in and see what's new for developers in Chrome 91!

## Suggested names for File System Access API {: #filenames }

One of my favorite APIs to come out of the Fugu project this year is the
File System Access APIs. Once the user has granted permission, apps can
interact with files on the users local device, in the same way other installed
apps do, allowing you to create a more natural user experience.

Starting in Chrome 91, you can now suggest the name and location of a file or
directory to interact with. To do so, pass a `suggestedName`
property as part of the `showSaveFilePicker` options.

```js/1
const fileHandle = await self.showSaveFilePicker({
  suggestedName: 'Untitled Text.txt',
  types: [{
    description: 'Text documents',
    accept: {
      'text/plain': ['.txt'],
    },
  }],
});
```

The same goes for the default starting directory. For example, a text editor
probably wants to start the file save or file open dialog in the `documents`
folder. Whereas an image editor probably wants to start in the `pictures`
folder. You can suggest a default start directory by passing a `startIn`
property.

```js/1
const fileHandle = await self.showOpenFilePicker({
  startIn: 'documents'
});
```

Check out Tom's [File System Access][fs-post] post for complete details.

## Reading files from the clipboard {: clipboard }

There's one other cool new API for interacting with files that lands in
Chrome 91. On desktop, web apps can now read files from the clipboard. (Reading
files from the clipboard has been available in Safari since 2018.)

Of course, you don't get unrestricted access to the clipboard, so you'll need
to set-up a `paste` event listener. Then, in the event handler, you can
access the content of each file on the clipboard.

```js
window.addEventListener('paste', onPaste);

async function onPaste(e) {
  const file = e.clipboardData.files[0];
  const contents = await file.text();
  ...
}
```

## Share credentials on affiliated sites {: #credentials }

If your site has multiple domains, and they share the same account management
backend, you can now associate your sites with one another, allowing users to
save credentials once, and have the Chrome password manager suggest them to
any of your affiliated sites.

This is ideal when your site is served from different top level domains,
like `google.com`, and `google.ca`. Or maybe you've got multiple domains
names.

To associate your websites, you'll need to create an `assetlinks.json` file
that defines the relationship between the domains. In the example below,
I'm telling the browser that both the `.com` and `.co.uk` domains are
related and can share the credentials.

```json
[{
  "relation": ["delegate_permission/common.get_login_creds"],
  "target": {
    "namespace": "web",
    "site": "https://www.example.com"
  }
 },
{
  "relation": ["delegate_permission/common.get_login_creds"],
  "target": {
    "namespace": "web",
    "site": "https://www.example.co.uk"
  }
 }]
```

Then, host the `assetlinks.json` file in the `.well-known` folder for
each domain.

This functionality will start to roll out gradually in Chrome 91, and may
not be available on day one, so check out
[Enable Chrome to share login credentials across affiliated sites][cred-post]
for the latest details.

## And more! {: #more }

Of course there's plenty more.

All the [videos from I/O 2021][io-playlist] are online now, there's some great
content there, so check it out!

[Web Transport][web-transport]-previously called Quic Transport has
undergone a number of changes and is starting a new origin trial.

Web Assembly SIMD has finished its origin trial and is available to all users.

The refreshed form elements have finally landed on Android, improving the
user experience.

And the `<link>` element's `media` attribute will be honored for
`link rel="icon"`, meaning you can define different icons based on media
queries. For example a different icons for dark and light modes.

```html
<link
  rel="icon"
  media="(prefers-color-scheme: dark)"
  href="/icons/dark.png">
<link
  rel="icon"
  media="(prefers-color-scheme: light)"
  href="/icons/light.png">
```

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 91.

* [What's new in Chrome DevTools (91)](/blog/new-in-devtools-91)
* [Chrome 91 deprecations & removals](/blog/deps-rems-91/)
* [ChromeStatus.com updates for Chrome 91](https://www.chromestatus.com/features#milestone%3D91)
* [What's new in JavaScript in Chrome 91](https://v8.dev/blog/v8-release-91)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/90.0.4430.71..91.0.4472.78)

## Subscribe

To stay up to date, [subscribe](https://goo.gl/6FP1a5)
to [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you'll get an email notification whenever we launch a new video.

I'm Pete LePage, and as soon as Chrome 92 is released, I'll be right here to
tell you what's new in Chrome!

[fs-post]: https://web.dev/file-system-access/
[cred-post]: https://developer.chrome.com/blog/site-affiliation/
[io-playlist]: https://www.youtube.com/playlist?list=PLNYkxOF6rcIAK3hg7C9WVBaGgWZeQCD12
[web-transport]: https://web.dev/webtransport/
