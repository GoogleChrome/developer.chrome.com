---
layout: 'layouts/doc-post.njk'
title: 'Handle events with service workers'
seoTitle: 'Chrome extension service worker tutorial.'
subhead: 'Tutorial that covers extension service worker concepts'
description: 'Learn how to create and debug an extension service worker.'
date: 2023-04-02
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial provides an introduction to Chrome Extension service workers. As part of this
tutorial, we will build an extension that allows users to quickly navigate to Chrome API reference
pages using the omnibox. You will learn how to:

- Register your service worker and import modules.
- Debug your extension service worker.
- Manage state and handle events.
- Trigger periodic events.
- Communicate with content scripts.

{% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/WmVEGpEZ9ts1J0pUOzEr.mp4", width="800", height="498", autoplay="true", muted="true"%}

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend reviewing
[Extensions 101][doc-ext-101] and [Development Basics][doc-dev-basics] for an introduction to
extension development.

## Build the extension {: #build }

Start by creating a new directory called `quick-api-reference` to hold the extension files, or
download the source code from our [GitHub samples][github-quick-api] repo.

### Step 1: Register the service worker {: #step-1 }

Create the [manifest][doc-manifest] file in the root of the project and add the following code:

{% Label %}manifest.json:{% endLabel %}

```json/8-10
{
  "manifest_version": 3,
  "name": "Open extension API reference",
  "version": "1.0.0",
  "icons": {
    "16": "images/icon-16.png",
    "128": "images/icon-128.png"
  },
  "background": {
    "service_worker": "service-worker.js",
  },
}
```

Extensions register their service worker in the manifest, which only takes a single JavaScript file.
There's no need to call `navigator.serviceWorker.register()`, like you would in a web app.

Create an `images` folder then [download the icons][github-quick-api-icons] into it.

Check out the first steps of the Reading time tutorial to learn more about the extension's [metadata][tut-reading-time-step1] and [icons][tut-reading-time-step2] in the manifest.

### Step 2: Import multiple service worker modules {: #step-2 }

Our service worker implements two features. For better maintainability, we will implement each feature in a separate module. First, we need to declare the service worker as an [ES Module][mdn-es-module] in our manifest, which allows us to import modules in our service worker:

{% Label %}manifest.json:{% endLabel %}

```json/3-3
{
 "background": {
    "service_worker": "service-worker.js",
    "type": "module"
  },
}
```

Create the `service-worker.js` file and import two modules:

```js
import './sw-omnibox.js';
import './sw-tips.js';
```

Create these files and add a console log to each one.

{% Columns %}

{% Column %}

{% Label %}sw-omnibox.js:{% endLabel %}

```js
console.log("sw-omnibox.js")
```
{% endColumn %}

{% Column %}
{% Label %}sw-tips.js:{% endLabel %}

```js
console.log("sw-tips.js")
```
{% endColumn %}

{% endColumns %}

See [Importing scripts](/docs/extensions/mv3/service-workers/basics/#importing-scripts) to learn about other ways to import multiple files in a service worker.

{% Aside 'important' %}

Remember to set `type.module` when using a modern module bundler framework, such as [CRXjs Vite plugin][crxjs-vite].

{% endAside %}

### Optional: Debugging the service worker {: #step-3 }

Let's quickly go over how to find the service worker logs and know when it has terminated. First, follow the instructions to [Load an unpacked extension][doc-dev-basics-unpacked]. 

After 30 seconds you will see "service worker(inactive)" which means the service worker has terminated. Click on the "service worker(inactive)" hyperlink to inspect it. See the example below.

{% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/D1XRaA6q4xn9Ylwe1u1N.mp4", width="800", height="314", autoplay="true", muted="true", loop="true" %}

Did you notice that inspecting the service worker woke it up? That's right! Opening the service worker in the devtools will keep it active. To make sure that your extension behaves correctly when your service worker is terminated, remember to close the DevTools.

Now let's break the extension to learn where to locate errors. One way to do this is to delete the ".js" from the `'./sw-omnibox.js'` import in the `service-worker.js` file. Chrome will be unable to register the service worker.

Go back to chrome://extensions and refresh the extension. You will see two errors:

```text
Service worker registration failed. Status code: 3.
```
```text
An unknown error occurred when fetching the script.
```

{% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/AbMNDSbURLKjH1Jm1C9Q.mp4", width="800", height="677", autoplay="true", muted="true", loop="true" %}

See [Debugging extensions][doc-debug-ext] for more ways debug the extension service worker.

{% Aside 'caution' %}
Don't forget to fix the file name before moving on!
{% endAside %}

### Step 4: Initialize the state {: #step-4 }

Chrome will shut down service workers if they are not needed. We use the [`chrome.storage`][api-storage] API to persist state across service worker sessions. For storage access, we need to request permission in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "permissions": ["storage"],
}
```

First, let's save the default suggestions to storage. We can initialize state when the extension is first installed by listening to the [`runtime.onInstalled()`][runtime-oninstalled] event:

{% Label %}sw-omnibox.js:{% endLabel %}

```js
...
// Save default API suggestions
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.storage.local.set({
      apiSuggestions: ['tabs', 'storage', 'scripting']
    });
  }
});
```

Service workers do not have direct access to the [window object][mdn-window], therefore cannot use
[window.localStorage()][mdn-local-storage] to store values. Also, service workers are short-lived execution environments;
they get terminated repeatedly throughout a user's browser session, which makes it incompatible with
global variables.  Instead, we use [`chrome.storage.local`][api-storage-local] which stores data on the local machine.

See [Saving state](/docs/extensions/mv3/service-workers/service-worker-lifecycle/#idle-and-shutdown) to learn about other storage options for extension service workers.

### Step 5: Register your events {: #step-5 }

All event listeners need to be statically registered in the global scope of the service worker. In other words, event listeners should not be nested in async functions. This way Chrome can ensure that all event handlers are restored in case of a service worker reboot.

In this example, we are going to use the [`chrome.omnibox`][api-omnibox] API, but first we must declare the omnibox keyword trigger in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "minimum_chrome_version": "102",
  "omnibox": {
    "keyword": "api"
  },
}
```

{% Aside 'important' %}
The [`"minimum_chrome_version"`][manifest-min-version] explains how this key behaves when a user tries to install your extension but isn't using a compatible version of Chrome. 

{% endAside %}

Now, let's register the omnibox event listeners at the top level of the script. When the user enters the omnibox keyword (`api`) in the address bar followed by tab or space, Chrome will display a list of suggestions based on the keywords in storage. The [`onInputChanged()`][omnibox-input-changed] event, which takes the current user input and a [suggestResult][omnibox-suggest] object, is responsible for populating these suggestions.

{% Label %}sw-omnibox.js:{% endLabel %}

```js
...
const URL_CHROME_EXTENSIONS_DOC =
  'https://developer.chrome.com/docs/extensions/reference/';
const NUMBER_OF_PREVIOUS_SEARCHES = 4;

// Display the suggestions after user starts typing
chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
  await chrome.omnibox.setDefaultSuggestion({
    description: 'Enter a Chrome API or choose from past searches'
  });
  const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
  const suggestions = apiSuggestions.map((api) => {
    return { content: api, description: `Open chrome.${api} API` };
  });
  suggest(suggestions);
});
```

After the user selects a suggestion, [`onInputEntered()`][omnibox-input-entered] will open the corresponding Chrome API reference page.

{% Label %}sw-omnibox.js:{% endLabel %}

```js
...
// Open the reference page of the chosen API
chrome.omnibox.onInputEntered.addListener((input) => {
  chrome.tabs.create({ url: URL_CHROME_EXTENSIONS_DOC + input });
  // Save the latest keyword
  updateHistory(input);
});
```

The `updateHistory()` function below takes the omnibox input and saves it to [storage.local][api-storage]. This way the most recent search term can be used later as an omnibox suggestion.

{% Label %}sw-omnibox.js:{% endLabel %}

```js
...
async function updateHistory(input) {
  const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
  apiSuggestions.unshift(input);
  apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
  return chrome.storage.local.set({ apiSuggestions });
}
```

{% Aside 'important' %}

Extension service workers can use both web APIs and Chrome APIs, with a few exceptions. For more information, see [Service Workers events](/docs/extensions/mv3/service-workers/events/).

{% endAside %}

### Step 6: Set up a recurring event {: #step-6 }

The `setTimeout()` or `setInterval()` methods are commonly used to perform delayed or periodic
tasks. However, these APIs can fail because the scheduler will cancel the timers when the service
worker is terminated. Instead, extensions can use the [`chrome.alarms`][api-alarms] API. 

Start by requesting the `"alarms"` permission in the manifest. Additionally, to fetch the extension tips from a remote hosted location, you need to request [host permission][doc-host-perm]:

{% Label %}manifest.json:{% endLabel %}

```json/2/3
{
  ...
  "permissions": ["storage", "alarms"],
  "permissions": ["storage"],
  "host_permissions": ["https://extension-tips.glitch.me/*"],
}
```

The extension will fetch all the tips, pick one at random and save it to storage. We will create an alarm that will be triggered once a day to update the tip. Alarms are not saved when you close Chrome. So we need to check if the alarm exists and create it if it doesn't.

{% Label %}sw-tips.js:{% endLabel %}

```js
// Fetch tip & save in storage
const updateTip = async () => {
  const response = await fetch('https://extension-tips.glitch.me/tips.json');
  const tips = await response.json();
  const randomIndex = Math.floor(Math.random() * tips.length);
  return chrome.storage.local.set({ tip: tips[randomIndex] });
};

const ALARM_NAME = 'tip';

// Check if alarm exists to avoid resetting the timer.
// The alarm might be removed when the browser session restarts.
async function createAlarm() {
  const alarm = await chrome.alarms.get(ALARM_NAME);
  if (typeof alarm === 'undefined') {
    chrome.alarms.create(ALARM_NAME, {
      delayInMinutes: 1,
      periodInMinutes: 1440
    });
    updateTip();
  }
}

createAlarm();

// Update tip once a the day
chrome.alarms.onAlarm.addListener(updateTip);
```

{% Aside 'important' %}

All [Chrome API][doc-apis] event listeners and methods restart the service worker's 30-second termination timer. For more information, see the [Extension service worker lifecycle](/docs/extensions/mv3/service-workers/service-worker-lifecycle/).

{% endAside %}

### Step 7: Communicate with other contexts {: #step-7 }

Extensions use [content scripts][doc-content] to read and modify the content of the page. When a user visits a Chrome API reference page, the extension's content script will update the page with the tip of the day. It [sends a message][doc-messages] to request the tip of the day from the service worker. 

Start by declaring the content script in the manifest and add the match pattern corresponding to the [Chrome API][doc-apis] reference documentation.

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "content_scripts": [
    {
      "matches": ["https://developer.chrome.com/docs/extensions/reference/*"],
      "js": ["content.js"]
    }
  ]
}

```

Create a new content file. The following code sends a message to the service worker requesting the tip. Then, adds a button that will open a popover containing the extension tip. This code uses the new web platform [Popover API][popover-mdn] (see the [HTML spec][popover-html-spec] for more details). 

{% Label %}content.js:{% endLabel %}

```js
(async () => {
  // Sends a message to the service worker and receives a tip in response
  const { tip } = await chrome.runtime.sendMessage({ greeting: 'tip' });

  const nav = document.querySelector('.navigation-rail__links');
  
  const tipWidget = createDomElement(`
    <button class="navigation-rail__link" popovertarget="tip-popover" popovertargetaction="show" style="padding: 0; border: none; background: none;>
      <div class="navigation-rail__icon">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"> 
        <path d='M15 16H9M14.5 9C14.5 7.61929 13.3807 6.5 12 6.5M6 9C6 11.2208 7.2066 13.1599 9 14.1973V18.5C9 19.8807 10.1193 21 11.5 21H12.5C13.8807 21 15 19.8807 15 18.5V14.1973C16.7934 13.1599 18 11.2208 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9Z'"></path>
        </svg>
      </div>
      <span>Tip</span> 
    </button>
  `);

  const popover = createDomElement(
    `<div id='tip-popover' popover>${tip}</div>`
  );

  document.body.append(popover);
  nav.append(tipWidget);
})();

function createDomElement(html) {
  const dom = new DOMParser().parseFromString(html, 'text/html');
  return dom.body.firstElementChild;
}
```

The final step is to add a message handler to our service worker that sends a reply to the content script with the daily tip. 

{% Label %}sw-tips.js:{% endLabel %}

```js
...
// Send tip to content script via messaging
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.greeting === 'tip') {
    chrome.storage.local.get('tip').then(sendResponse);
    return true;
  }
});
```

## Test that it works {: #try-out }

Verify that the file structure of your project looks like the following: 

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/l2HHbaSJeveap8EWLhrU.png", alt="The contents of the extension folder: images folder, manifest.json, service-worker.js, sw-omnibox.js, sw-tips.js,
and content.js", width="379", height="299" %}

### Load your extension locally {: #locally }

To load an unpacked extension in developer mode, follow the steps in [Development
Basics][doc-dev-basics-unpacked].

### Open a reference page {: #open-api }

1. Enter the keyword "api" in the browser address bar.
1. Press "tab" or "space".
1. Enter the complete name of the API.
   - OR choose from a list of past searches
1. A new page will open to the Chrome API reference page.

It should look like this:

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/tKsdFmAYFGApMRF47Nlp.gif", alt="Quick API Reference opening the runtime api reference", width="500", height="306", class="screenshot" %}
  <figcaption>
  Quick API extension opening the Runtime API.
  </figcaption>
</figure>

### Open the tip of the day {: #open-tip }

Click the Tip button located on the navigation bar to open the extension tip.

<figure>
{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/GqjdrVtuA0zt87l3QIn9.gif", alt="Open daily tip in ", width="500", height="593", class="screenshot" %}
  <figcaption>
  Quick API extension opening the tip of the day.
  </figcaption>
</figure>

{% Aside %}

The Popover API was launched in Chrome 114.

{% endAside %}

## 🎯 Potential enhancements {: #challenge }

Based on what you’ve learned today, try to accomplish any of the following:

- Explore another way to implement the omnibox suggestions.
- Create your own custom modal for displaying the extension tip.
- Open an additional page to the MDN's Web Extensions reference API pages.

## Keep building! {: #continue }

Congratulations on finishing this tutorial 🎉. Continue leveling up your skills by completing other
beginner tutorials:

| Extension                        | What you will learn                                            |
|----------------------------------|----------------------------------------------------------------|
| [Reading time][tut-reading-time] | To insert an element on a specific set of pages automatically. |
| [Tabs Manager][tut-tabs-manager] | To create a popup that manages browser tabs.                   |
| [Focus Mode][tut-focus-mode]     | To run code on the current page after clicking on the extension action. |

## Continue exploring {: #explore }

To continue your extension service worker learning path, we recommend exploring the following articles:

- About [extension service workers](/docs/extensions/mv3/service-workers/).
- The [extension service worker lifecycle](/docs/extensions/mv3/service-workers/service-worker-lifecycle/).
- [Events in service workers](/docs/extensions/mv3/service-workers/events/)

[api-alarms]: /docs/extensions/reference/alarms
[api-omnibox]: /docs/extensions/reference/omnibox
[api-scripting]: /docs/extensions/reference/scripting/
[api-storage-local]: /docs/extensions/reference/storage/#property-local
[api-storage]: /docs/extensions/reference/storage
[crxjs-vite]: https://crxjs.dev/vite-plugin
[doc-apis]: /docs/extensions/reference
[doc-content]: /docs/extensions/mv3/content_scripts/
[doc-debug-ext]: /docs/extensions/mv3/tut_debugging/#debug_bg
[doc-dev-basics-unpacked]: /docs/extensions/mv3/getstarted/development-basics#load-unpacked
[doc-dev-basics]: /docs/extensions/mv3/getstarted/development-basics
[doc-devguide]: /docs/extensions/mv3/devguide/
[doc-ext-101]: /docs/extensions/mv3/getstarted/extensions-101/
[doc-host-perm]: /docs/extensions/mv3/match_patterns/
[doc-manifest]: /docs/extensions/mv3/manifest/
[doc-messages]: /docs/extensions/mv3/messaging
[doc-perms-warning]: /docs/extensions/mv3/permission_warnings/#required_permissions
[doc-sw]: /docs/extensions/mv3/service_workers/
[doc-welcome]: /docs/extensions/mv3/
[github-focus-mode-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.focus-mode/images
[github-quick-api-icons]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.quick-api-reference/images
[github-quick-api]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.quick-api-reference
[manifest-min-version]: /docs/extensions/mv3/manifest/minimum_chrome_version/#enforcement
[mdn-es-module]: https://web.dev/es-modules-in-sw/
[mdn-local-storage]: https://developer.mozilla.org/docs/Web/API/Window/localStorage
[mdn-window]: https://developer.mozilla.org/docs/Web/API/Window
[omnibox-input-changed]: /docs/extensions/reference/omnibox/#event-onInputChanged
[omnibox-input-changed]: /docs/extensions/reference/omnibox/#event-onInputChanged
[omnibox-input-entered]: /docs/extensions/reference/omnibox/#event-onInputEntered
[omnibox-suggest]: /docs/extensions/reference/omnibox/#type-SuggestResult
[popover-mdn]: https://developer.mozilla.org/docs/Web/API/Popover_API
[popover-chromium-issue]: https://bugs.chromium.org/p/chromium/issues/detail?id=1307772
[popover-explainer]: https://open-ui.org/components/popover.research.explainer/
[popover-html-spec]: https://html.spec.whatwg.org/multipage/popover.html
[runtime-oninstalled]: /docs/extensions/reference/runtime/#event-onInstalled
[tut-focus-mode]: /docs/extensions/mv3/getstarted/tut-focus-mode
[tut-reading-time-step1]: /docs/extensions/mv3/getstarted/tut-reading-time#step-1
[tut-reading-time-step2]: /docs/extensions/mv3/getstarted/tut-reading-time#step-2
[tut-reading-time]: /docs/extensions/mv3/getstarted/tut-reading-time
[tut-tabs-manager]: /docs/extensions/mv3/getstarted/tut-tabs-manager
