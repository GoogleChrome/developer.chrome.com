---
layout: 'layouts/doc-post.njk'
title: 'Focus Mode'
seoTitle: 'Chrome Extensions Tutorial: Focus Mode'
subhead: 'This will be added later.'
description: 'This will also be added later.'
date: 2023-04-02
# updated: 2022-06-13
---

## Overview {: #overview }

This tutorial builds an extension that allows users to open the Chrome API reference page using the omnibox. It also provides a daily extension tip.

<!-- TODO: Add video {% Video src='video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mp4' %} -->

This tutorial explains how to do the following in an extension service worker:

- Register a service worker.
- Import multiple files.
- Debug the extension service worker.
- Manage state and handle events.
- Trigger periodic events.
- Communicate with content scripts.

## Before you start {: #prereq }

This guide assumes that you have basic web development experience. We recommend reviewing [Extensions 101][doc-ext-101] and [Development Basics][doc-dev-basics] for an introduction to extension development.

## Build the extension {: #build }

Start by creating a new directory called `open-api-reference` to hold the extension files, or download the source code from our [GitHub samples][github-open-api] repo.

### Step 1: Register the service worker {: #step-1 }

Extensions register their service worker in the manifest, which only takes a single JavaScript file.  There's no need to use `navigator.serviceWorker.register()`, like you would in a web app. See [Differences between extension and web service workers](tbd) to learn more.

Create the manifest file in the root of the project and add the following code:

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

{% Label %}sw-omnibox.js:{% endLabel %}

```js
console.log("sw-omnibox.js")
```

{% Label %}sw-tips.js:{% endLabel %}

```js
console.log("sw-tips.js")
```

See [Importing scripts](tbd) to learn about other ways to import multiple files in a service worker.


{% Aside %}

Remember to set `type.module` when using a modern module bundler framework.

{% endAside %}

### _Optional: Debugging the service worker_ {: #step-3 }

<!-- Considering making this part a details component  -->

Before moving on, let's review where to find the service worker logs and how to
know when it has terminated. Follow the [Load unpacked extension][doc-dev-basics-unpacked] instructions and wait for service worker to terminate after 30 seconds. You can inspect the service worker by clicking on the service worker hyperlink. 

{% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/D1XRaA6q4xn9Ylwe1u1N.mp4", width="800", height="314", autoplay="true", muted="true", loop="true" %}

Did you notice that inspecting the service worker woke it up? That's right! Opening the service worker in the devtools will keep it active. See [Debugging extensions](tbd) for more ways debug the extension service worker.

Let's break the extension to locate the errors. In `sw.js`, if we remove the ".js" of the './sw-omnibox.js' import, Chrome will not be able to register the service worker.

Go back to chrome://extensions and refresh the extension. The following error will appear:

{% Video src="video/BhuKGJaIeLNPW9ehns59NfwqKxF2/AbMNDSbURLKjH1Jm1C9Q.mp4", width="400", height="477", autoplay="true", muted="true", loop="true" %}

Don't forget to fix the file name before moving on! 

### Step 4: Initialize the state {: #step-4 }

Extensions can save initial values to storage on installation. The following code saves the omnibox default suggestions in [`chrome.storage`][api-storage] when the extension is first installed:

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

All event listeners need to be registered in the global scope of the service worker script. In other words, do not nest event listeners inside functions. This ensures that Chrome can immediately find and invoke all event handlers, even if your extension hasn't finished executing its async startup logic. The following code registers the omnibox listeners on startup:

<web-tabs>
  <web-tab title="sw-omnibox.js">
   
  ```js
  import { getApiSuggestions } from './sw-suggestions.js';

  ...
  const chromeURL = 'https://developer.chrome.com/docs/extensions/reference/';
  const NUMBER_OF_PREVIOUS_SEARCHES = 4;

  // Displays the suggestions after user starts typing
  chrome.omnibox.onInputChanged.addListener(async (input, suggest) => {
    const { description, suggestions } = await getApiSuggestions(input);
    await chrome.omnibox.setDefaultSuggestion({ description });
    suggest(suggestions);
  });

  // Opens the reference page of the chosen API
  chrome.omnibox.onInputEntered.addListener((input) => {
    chrome.tabs.create({ url: chromeURL + input });
    // Saves the latest keyword
    updateHistory(input);
  });

  async function updateHistory(input) {
    const { apiSuggestions } = await chrome.storage.local.get('apiSuggestions');
    apiSuggestions.unshift(input);
    apiSuggestions.splice(NUMBER_OF_PREVIOUS_SEARCHES);
    await chrome.storage.local.set({ apiSuggestions });
  }

  ```
  
  </web-tab>
  <web-tab title="sw-suggestions.js">

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

  </web-tab>
  <web-tab title="api-list.js">

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


