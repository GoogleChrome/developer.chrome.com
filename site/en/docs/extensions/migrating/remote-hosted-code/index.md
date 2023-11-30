---
layout: 'layouts/doc-post.njk'
title: "Dealing with Remote Hosted Code Violations"
description: A reference for what to do when your extension is rejected from the Chrome Web Store becaue of Remotely Hosted Code.
date: 2023-11-23
updated: 2023-11-23
---

## What is Remotely Hosted Code?

Remotely Hosted Code, or RHC, is what the Chrome Web Store calls anything that is executed by the browser that is loaded from someplace other than the extension's own files. Things like javascript, wasm, etc. It **_does not_** include data - things like JSON or CSS.

## Why is RHC no longer allowed?

With Manifest v3 extensions now need to bundle _all_ code they are using inside the extension itself. In the past, you could dynamically inject script tags from any URL on the web.


## I was told my extension has RHC - what's going on?

If your extension was rejected during review with a [Blue Argon][blue-argon] error, then our reviewers believe that your extension is currently using Remotely Hosted Code. This is usually the result of an extension trying to add a script tag  with a remote resource (i.e. from the open web, rather than the files included in the extension), or <code>[fetch][fetch]</code>ing a resource to execute directly.


## How to spot RHC

Spotting RHC isn't particularly difficult once you know what to look for. A great first option would be to check for the strings "http://" or "https://" in your project. If you have an RHC violation, then you would likely be able to locate them by finding that. If you have a full build system, or use dependencies from [npm][npm] or other third party sources, make sure you are searching the _compiled_ version of the code, since that is what is being evaluated by the store. If you are still unable to find the problem, then the next step would be to contact [One Stop Support][oss]. They will be able to outline the specific violations, and what is needed to get the extension published as soon as possible.


## What to do if a library is requesting the code

Regardless of where the code comes from, it is not allowed to have RHC. This includes code you didn't author, but just happen to use as a dependency in your project. [Some developers][firebase-rhc-issue] using [Firebase][firebase] had this issue when remote code was being included for use in [Firebase Auth][firebase-auth]. Even though this was a first party (i.e. Google owned) library - no exception is given for RHC. That code needs to be updated to either remove the RHC, or be able to be configured to not include it in the first place. If you end up hitting an issue where it isn't _your_ code that is loading RHC, but a library that you are using, then the best course of action is to contact the library's author. Let them know that this is happening, and ask for either a workaround or code updates to remove it.


## What if you can't wait for a library update

Some libraries will ship an update almost immediately after being notified, but others may be abandoned or take time to address the issue. Depending on _what_ is happening in the specific violation, you may not need to wait for them to move to be unblocked and complete a successful review. There are a number of options available to get back up and running quickly.



### Audit the code

Are you _certain_ that the code that is causing the request is needed? If it can just be deleted, or a library that is causing it can be removed - then we have an easy fix -  delete the code, and the job is done.

Alternatively, is there another library that offers the same functionality? Try checking [npmjs.org](npmjs.org), GitHub, or other sites for other options that fulfill the same usecases.

### Tree Shaking

If the code causing the RHC violation isn't actually being used, then it may be able to be automatically deleted by tooling. Modern build tools like [webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/), and [Vite](https://vitejs.dev/) (just to name a few) have a feature called [tree-shaking][tree-shaking]. Once enabled on your build system, tree shaking should remove any unused code paths. This can mean that you not only have a more compliant version of your code, but a leaner and faster one too! It is important to note that not all libraries are able to be tree shaken, but many are. Some tools, like Rollup and Vite, have tree-shaking enabled by default. webpack [needs to be configured](https://webpack.js.org/guides/tree-shaking/) for it to be enabled. If you aren't using a build system as a part of your extension, but _are_ using code libraries, then we really encourage you to investigate adding a build tool to your workflow. They can help you write safer, more reliable and more maintainable projects.


The specifics of how to implement treeshaking depends on your specific project. But to take a simple example with Rollup, you can add treeshaking just by compiling your project code. In practice, if we had a simple file that justs logs into Firebase Auth, called main.js

```js
import { GoogleAuthProvider, initializeAuth } from "firebase/auth";

chrome.identity.getAuthToken({ 'interactive': true }, async (token) => {
  const credential = GoogleAuthProvider.credential(null, token);
  try {
    const app = initializeApp({ ... });
    const auth = initializeAuth(app, { popupRedirectResolver: undefined, persistence: indexDBLocalPersistence });
    const { user } = await auth.signInWithCredential(credential)
    console.log(user)
  } catch (e) {
    console.error(error);
  }
});
```


Then all we would need to do is tell Rollup the input file, a plugin needed to load node files ([@rollup/plugin-node-resolve][rollup_plugin-node-resolve], and the name of the output file it is generating.

```sh
npx rollup --input main.js --plugin '@rollup/plugin-node-resolve' --file compiled.js
```

Running that command in a terminal window, you will receive a generated version of our `main.js` file, all compiled into a single file named `compiled.js`.

Rollup can be simple, but it is also _very_ configurable. You can add all kinds of complex logic and configuration, just check out their [documentation][rollup-docs]. Adding build tooling like this will result in a smaller, more efficient code, and in this case, fixes our Remote Hosted Code issue.

### Automatically editing files

An increasingly common way that remotely hosted code can enter your codebase is as a subdepenency of a library you are including. If library `X` wants to `import` library `Y` from a CDN, then you will still need to update it to make it load from a local source. With modern build systems, you can trivially create plugins to extract a remote reference, and either inline it directly into your code.

That would mean that given code that looks like this

```js
import moment from "https://unpkg.com/moment@2.29.4/moment.js"
console.log(moment())
```


We could make a small rollup plugin

```js
import { existsSync } from 'fs';
import fetch from 'node-fetch';

export default {
  plugins: [{
    load: async function transform(id, options, outputOptions) {
      // this code runs over all of out javascript, so we check every import
      // to see if it resolves as a local file, if that fails, we grab it from
      // the network via fetch, and return the contents of that file directly inline
      if (!existsSync(id)) {
        const response = await fetch(id);
        const code = await response.text();

        return code
      }
      return null
    }
  }]
};
```

Once we run the build with our new plugin, every remote `import` URL is discovered regardless of whether or not it was our code, a subdependency, subsubdependecy, or anywhere else.

```sh
npx rollup --input main.js --config ./rollup.config.mjs --file compiled.js
```

### Manually editing files


The simplest option is just to delete the code that is causing the RHC. Open it up in your text editor of choice, and delete the violating lines. This generally **is not** that advisable, because it is brittle and easy to forget about. It makes maintaining your project harder when a file called "library.min.js" isn't _actually_ [library.min.js](library.min.js). Instead of editing the raw files, a slightly more maintainable option is to use a tool like [patch-package](https://www.npmjs.com/package/patch-package). This is a super powerful option that lets you save _modifications_ to a file, rather than the file itself. It is built on [patch files](https://en.wikipedia.org/wiki/Patch_(Unix)), the same sort of thing that powers VCS systems like [Git](https://git-scm.com/) or [Subversion](https://subversion.apache.org/). You just need to manually modify the violating code, and save the diff file, and configure patch-package with the changes you want to apply. You can read a full tutorial on the [project's readme](https://www.npmjs.com/package/patch-package#making-patches). As mentioned above, if you are patching a project, we _really_ encourage you to reach out to the project to request the changes being made upstream. While patch-package makes managing patches a lot easier, nothing is as easy as no patches at all.


## What to do if the code isn't being used?

As codebases grow, it can easily become possible for a dependency, (or dependency of a dependency, or dependency of…) to have code paths that aren't being used. If one of those sections include code to load or execute RHC, then it _will_ have to be removed. It doesn't matter if it is dead or unused. If it isn't being used - it should be removed - either by treeshaking, or patching the library to remove it.

## Is there _any_ workaround?

Generally speaking, no. RHC is simply not allowed. There is, however, a small number of cases where it _is_ allowed. These are almost always cases where it is impossible for any other option.


### User Scripts API

[User Scripts][user-scripts-api] are small code snippets that are usually supplied by the end user, intended for User Script managers like [TamperMonkey][tampermonkey] and [Violentmonkey][violentmonkey]. It is not possible to these managers to bundle code that is written by end users, so the User Script API exposes a way to execute code provided by the end user. This _is not_ a substitute for [chrome.scripting.executeScript][executescript], or other code execution environments - end users must enable [developer mode][dev_mode] to execute anything. If the Chrome Web Store review team thinks that this is being used in a manner other than it is intended for (i.e. code provided by the end user), it may be rejected or it's listing taken down from the store.

### chrome.debugger

The [chrome.debugger][chrome.debugger] API gives extensions the ability to interact with the [Chrome Devtools Protocol](https://chromedevtools.github.io/devtools-protocol/). This is the same protocol that is used for Chrome's Devtools, and an [amazing number of other tools](https://github.com/ChromeDevTools/awesome-chrome-devtools). With it, an extension can request and execute remote code. Just like User Scripts, it is not a substitute for chrome.scripting, and has a much more notable end user experience. While it is being used, the user will see a warning bar at the top of the window. If the banner is closed or dismissed, the debugging session will be terminated.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/SyeEuVZINxlaVnCHqqo2.jpg", alt="screenshot of the URL bar in Chrome that has the message 'Debugger Extension started debugging this browser'", width="800", height="18" %}


### Sandboxed iframes

If you need to evaluate a string as code, and are in a DOM environment (e.g. a content script, as opposed to a background service worker), then another option would be to use a [sandboxed iframe][sandboxed_iframes]. Extensions don't support things like `eval` by default as a safety precaution - a malicious code could put user safety and security at risk. But when the code is only executed in a known safe environment, like an iframe that has been sandboxed from the rest of the web, then those risks are greatly reduced. Within this context, the Content Security Policy that blocks the usage of eval can be lifted, allowing you to run any valid javascript code.


If you have a use case that isn't covered, feel free to reach out to the team via the [chromium-extensions][chromium-extensions] mailing list to get feedback, or open a new ticket to request guidance from [One Stop Support][oss]


## What to do if you disagree with a verdict

Enforcing policies can be nuanced and review involves manual input, which means we may sometimes agree to change a review decision. If you believe that a mistake was made in review, you can appeal the rejection via [One Stop Support][oss]

[blue-argon]: /docs/webstore/troubleshooting/#additional-requirements-for-manifest-v3
[chrome.debugger]: /docs/extensions/reference/debugger/
[chromium-extensions]: https://groups.google.com/a/chromium.org/g/chromium-extensions
[fetch]: https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
[firebase-auth]: https://firebase.google.com/docs/auth
[firebase-rhc-issue]: https://github.com/firebase/firebase-js-sdk/issues/7617
[firebase]: https://firebase.google.com/
[npm]: https://www.npmjs.com/
[oss]: https://support.google.com/chrome_webstore/contact/one_stop_support
[rollup-docs]: https://rollupjs.org/introduction/
[rollup_plugin-node-resolve]: https://www.npmjs.com/package/@rollup/plugin-node-resolve
[sandboxed_iframes]: /docs/extensions/mv3/sandboxingEval/
[tree-shaking]: https://developer.mozilla.org/docs/Glossary/Tree_shaking
[user-scripts-api]: https://github.com/w3c/webextensions/blob/main/proposals/user-scripts-api.md
[executescript]: /docs/extensions/reference/scripting/
[tampermonkey]: https://www.tampermonkey.net/
[violentmonkey]: https://violentmonkey.github.io/
[dev_mode]: /docs/extensions/mv3/faq/#faq-dev-01
