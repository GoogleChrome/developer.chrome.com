---
layout: 'layouts/doc-post.njk'
title: 'Open reference page'
seoTitle: 'Chrome Extensions Tutorial: Open reference page'
subhead: 'This will be added later.'
description: 'This will also be added later.'
date: 2023-04-02
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds an extension that allows users to open the Chrome API reference page using the omnibox. It also provides a daily extension tip.

{% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/WmVEGpEZ9ts1J0pUOzEr.mp4", width="600", height="398", autoplay="true", muted="true"%}

This tutorial explains how to do the following in an extension service worker:

- Register a service worker and import modules.
- Debug the extension service worker.
- Manage state and handle events.
- Trigger periodic events.
- Communicate with content scripts.

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend reviewing [Extensions 101][doc-ext-101] and [Development Basics][doc-dev-basics] for an introduction to extension development.

## Build the extension {: #build }

Start by creating a new directory called `open-api-reference` to hold the extension files, or download the source code from our [GitHub samples][github-open-api] repo.

### Step 1: Register the service worker {: #step-1 }

Create the [manifest][doc-manifest] file in the root of the project and add the following code:

{% Label %}manifest.json:{% endLabel %}

```json/8-10
{
  "manifest_version": 3,
  "name": "Open extension API reference",
  "version": "1.0.0",
  "icons": {
    "16": "icon-16.png",
    "128": "icon-128.png"
  },
  "background": {
    "service_worker": "service-worker.js",
  },
}
```

Extensions register their service worker in the manifest, which only takes a single JavaScript file.
There's no need to use `navigator.serviceWorker.register()`, like you would in a web app. See
[Differences between extension and web service workers](tbd) to learn more.

You can download the icons located on the [Github repo][github-open-api].

### Step 2: Import multiple files {: #step-2 }

This extension has two features, so we will split the extension logic into two files. The following code declares the service worker as an [ES Module][mdn-es-module], which allows us to import multiple files:

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

See [Importing scripts](tbd) to learn about other ways to import multiple files in a service worker.


{% Aside %}

Remember to set `type.module` when using a modern module bundler framework.

{% endAside %}

### _Optional: Debugging the service worker_ {: #step-3 }

Let's quickly go over how to locate the service worker logs and determine when it has terminated. Follow the instructions to [Load an unpacked extension][doc-dev-basics-unpacked]. Now wait 30 seconds for the service worker to stop. Click on the hyperlink to inspect it. 

{% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/D1XRaA6q4xn9Ylwe1u1N.mp4", width="800", height="314", autoplay="true", muted="true", loop="true" %}

Did you notice that inspecting the service worker woke it up? That's right! Opening the service worker in the devtools will keep it active.

To locate the errors, let's cause the extension to break. One way to do this is to delete the ".js" from the './sw-omnibox.js' import in sw.js. Chrome will be unable to register the service worker.

Go back to chrome://extensions and refresh the extension. The following error will appear:

{% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/AbMNDSbURLKjH1Jm1C9Q.mp4", width="400", height="477", autoplay="true", muted="true", loop="true" %}

 See [Debugging extensions](tbd) for more ways debug the extension service worker.

Don't forget to fix the file name before moving on! 

### Step 4: Initialize the state {: #step-4 }

Extensions can save initial values to storage on installation. To use the [`chrome.storage`][api-storage] API, we need to request permission in the manifest:

{% Label %}manifest.json:{% endLabel %}

```json
{
  ...
  "permissions": ["storage"],
}
```

The [omnibox API][api-omnibox] allows the extension to offer suggestions. At first, we will suggest frm a list popular APIs, and later offer suggestions of the latest searches. The following code stores the default list of APIs when the extension is first installed:

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

{% Details %}
{% DetailsSummary %}
💡 **Can I use window.LocalStorage() in a service worker? What about global variables?**
{% endDetailsSummary %}

Service workers do not have direct access to the DOM or the window object, therefore cannot use
window.localStorage() to store values. Also, service workers are short-lived execution environments;
they get terminated repeatedly throughout a user's browser session, which makes it incompatible with
global variables.

See [Saving states](TBD) to learn about storage options for extension service workers.

{% endDetails %}

### Step 5: Register your events {: #step-5 }

To use the [`chrome.omnibox`][api-omnibox] API we must first add the omnibox keyword to the manifest:

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

All event listeners need to be registered in the global scope of the service worker. In other words, event listeners should not be nested in functions. This way Chrome can immediately invoke all event handlers, even if the extension's async startup logic hasn't finished. The following code registers the omnibox listeners and updates storage with the latest api search:

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

// Open the reference page of the chosen API
chrome.omnibox.onInputEntered.addListener((input) => {
  chrome.tabs.create({ url: URL_CHROME_EXTENSIONS_DOC + input });
  // Save the latest keyword
  updateHistory(input);
});

async function updateHistory(input) {
  const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
  apiSuggestions.unshift(input);
  apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
  await chrome.storage.local.set({ apiSuggestions });
}
```

{% Aside %}

Extension service workers have access to both web APIs and Chrome APIs, with a few exceptions.
For a deep dive, see [Service Workers...](tbd) 

{% endAside %}

### Step 6: Set up a recurring event {: #step-6 }

It's common to perform delayed or periodic operations using the `setTimeout()` or `setInterval()`
methods. These APIs can fail because the scheduler will cancel the timers when the service worker is
terminated. Instead, we can use the [`chrome.alarms`][api-alarms] API. 

First, we must request the `"alarms"` permission. Since we also need to fetch the extension tips, let's also add the site as a [host permission][doc-host-perm]:

{% Label %}manifest.json:{% endLabel %}

```json/2/3
{
  ...
  "permissions": ["storage", "alarms"],
  "permissions": ["storage"],
  "host_permissions": ["https://extension-tips.glitch.me/*"],
}
```

The following code sets up an alarm once a day to fetch the daily tip and save it to
[`chrome.storage.local()`][api-storage]:

{% Label %}sw-tips.js:{% endLabel %}

```js
// Fetch tip & save in storage
const updateTip = async () => {
  const response = await fetch('https://extension-tips.glitch.me/tips.json');
  const tips = await response.json();
  const randomIndex = Math.floor(Math.random() * tips.length);
  await chrome.storage.local.set({ tip: tips[randomIndex] });
};

// Create a daily alarm and retrieves the first tip when extension is installed.
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === 'install') {
    chrome.alarms.create({ delayInMinutes: 1, periodInMinutes: 1440 });
    updateTip();
  }
});

// Update tip once a the day
chrome.alarms.onAlarm.addListener(updateTip);

```

{% Aside %}

All [Chrome API][doc-apis] event listeners and methods restart the service worker 30 second termination timer. To learn more about the extension service worker lifecycle, see [TBD](tbd)

{% endAside %}


  ```
  </web-tab>
</web-tabs>



{% Details %}
{% DetailsSummary %}
See code for `sw-suggestions.js`
{% endDetailsSummary %}

```js
  import apiList from './api-list.js';

  /**
   * Returns a list of suggestions and a description for the default suggestion
   */
  export async function getApiSuggestions(input) {
    const filtered = apiList.filter((api) => api.content.startsWith(input));
    console.log('filtered', filtered);

    // return suggestions if any exist
    if (filtered.length) {
      return {
        description: 'Matching Chrome APIs',
        suggestions: filtered
      };
    }

    // return past searches if no match was found
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
    return {
      description: 'No matches found. Choose from past searches',
      suggestions: apiList.filter((item) => apiSuggestions.includes(item.content))
    };
  }
  ```

{% endDetails %}

{% Details %}
{% DetailsSummary %}
See code for `api-list.js`
{% endDetailsSummary %}

```js
export default [
  {
    content: 'commands',
    description:
      'Use the <match>Commands API</match> to add a keyboard shortcuts.'
  },
  {
    content: 'contextmenus',
    description:
      "Use the <match>ContextMenus API</match> to add a custom item to Chrome's context menu."
  },
  {
    content: 'declarativeNetRequest',
    description:
      'Use the <match>DeclarativeNetRequest API</match> to block or modify network requests.'
  },
  {
    content: 'downloads',
    description:
      'Use the <match>Downloads API</match> to programmatically manipulate downloads.'
  },
  {
    content: 'i18n',
    description: 'Use the <match>i18n API</match> to localize your extension'
  },
  {
    content: 'identity',
    description:
      'Use the <match>Identity API</match> to get OAuth2 access tokens.'
  },
  {
    content: 'notifications',
    description:
      'Use the <match>Notifications API</match> show notifications to users in the system tray.'
  },
  {
    content: 'offscreen',
    description:
      'Use the <match>Offscreen API</match> to create and manage offscreen documents.'
  },
  {
    content: 'omnibox',
    description:
      "Use the <match>Omnibox API</match> to register a keyword with Chrome's address bar."
  },
  {
    content: 'permissions',
    description:
      'Use the <match>Permissions API</match> to request optional permissions at run time.'
  },
  {
    content: 'runtime',
    description:
      'Use the <match>Runtime API</match> pass messages, manage extension lifecycle, and access other helper utils.'
  },
  {
    content: 'scripting',
    description:
      'Use the <match>Scripting API</match> to execute scripts in different contexts.'
  },
  {
    content: 'storage',
    description:
      'Use the <match>Storage API</match> to store, retrieve, and track changes to user data.'
  },
  {
    content: 'tabs',
    description:
      'Use the <match>Tabs API</match> to create, update and manipulate tabs.'
  },
  {
    content: 'topSites',
    description:
      'Use the <match>TopSites API</match> to access the most visited sites that are displayed on the new tab page.'
  },
  {
    content: 'webNavigation',
    description:
      'Use the <match>WebNavigation API</match> to receive notifications about the status of navigation requests in-flight.'
  }
];

```
{% endDetails %}


