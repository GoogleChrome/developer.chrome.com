---
layout: 'layouts/doc-post.njk'
title: 'Modern client-side routing: the Navigation API'
subhead: 'Standardizing client-side routing through a brand new API which completely overhauls building single-page applications.'
authors:
  - samthor
  - jakearchibald
date: 2021-08-25
updated: 2022-08-19
hero: image/QMjXarRXcMarxQddwrEdPvHVM242/aDcKXxmGtrMVmwZK43Ta.jpg
alt: 'Sculpture adorning the General Post Office, Sydney, Australia'
description: 'Learn about the Navigation API, a new API which adds improved functionality to build single-page applications.'
tags:
  - capabilities
---

{% Aside %}
This API was known as the "App History API" during development, but has since been renamed to the "Navigation API".
{% endAside %}

Single-page applications, or SPAs, are defined by a core feature: dynamically rewriting their content as the user interacts with the site, instead of the default method of loading entirely new pages from the server.

While SPAs have been able to bring you this feature via the History API (or in limited cases, by adjusting the site's #hash part), it's a [clunky API][clunky-history-api] developed long-before SPAs were the norm—and the web is crying out for a completely new approach.
The Navigation API is a proposed API that completely overhauls this space, rather than trying to simply patch History API's rough edges.
(For example, [Scroll Restoration][scroll-restoration] patched the History API rather than trying to reinvent it.)

{% Aside %}
The Navigation API launched in Chrome 102.
[Check out a demo here][demo].
{% endAside %}

This post describes the Navigation API at a high level.
If you'd like to read the technical proposal, [check out the Draft Report in the WICG repository][wicg-report].

## Example Usage

To use the Navigation API, start by adding a `"navigate"` listener on the global `navigation` object.
This event is fundamentally _centralized_: it will fire for all types of navigations, whether the user performed an action (such as clicking a link, submitting a form, or going back and forward) or when navigation is triggered programmatically (i.e., via your site's code).
In most cases, it lets your code override the browser's default behavior for that action.
For SPAs, that likely means keeping the user on the same page and loading or changing the site's content.

A `NavigateEvent` is passed to the `"navigate"` listener which contains information about the navigation, such as the destination URL, and allows you to respond to the navigation in one centralized place.
A basic `"navigate"` listener could look like this:

```js
navigation.addEventListener('navigate', navigateEvent => {
  // Exit early if this navigation shouldn't be intercepted.
  // The properties to look at are discussed later in the article.
  if (shouldNotIntercept(navigateEvent)) return;

  const url = new URL(navigateEvent.destination.url);

  if (url.pathname === '/') {
    navigateEvent.intercept({handler: loadIndexPage});
  } else if (url.pathname === '/cats/') {
    navigateEvent.intercept({handler: loadCatsPage});
  }
});
```

You can deal with the navigation in one of two ways:

- Calling `intercept({ handler })` (as described above) to handle the navigation.
- Calling `preventDefault()`, which can cancel the navigation completely.

{% Aside %}
An earlier version of this API used `navigateEvent.transitionWhile(promise)` rather than `navigateEvent.intercept({ handler })`.

`intercept` is available from Chrome 105.
`transitionWhile` is deprecated, and will be removed in Chrome 108.
{% endAside %}

This example calls `intercept()` on the event.
The browser calls your `handler` callback, which should configure the next state of your site.
This will create a transition object, `navigation.transition`, which other code can use to track the progress of the navigation.

{% Aside 'key-term' %}
In this context 'transition' refers to the transition between one history entry and another.
It isn't related to transition animations.
{% endAside %}

Both `intercept()` and `preventDefault()` are usually allowed, but have cases where they're unable to be called.
You can't handle navigations via `intercept()` if the navigation is a cross-origin navigation.
And you can't cancel a navigation via `preventDefault()` if the user is pressing the Back or Forward buttons in their browser; you should not be able to trap your users on your site.
(This is [being discussed on GitHub][back-forward-discuss].)

Even if you can't stop or intercept the navigation itself, the `"navigate"` event will still fire.
It's _informative_, so your code could, for example, log an Analytics event to indicate that a user is leaving your site.

## Why add another event to the platform?

A `"navigate"` event listener centralizes handling URL changes inside an SPA.
This is a difficult proposition using older APIs.
If you've ever written the routing for your own SPA using the History API, you might have added code like this:

```js
function updatePage(event) {
  event.preventDefault(); // we're handling this link
  window.history.pushState(null, '', event.target.href);
  // TODO: set up page based on new URL
}
const links = [...document.querySelectorAll('a[href]')];
links.forEach(link => link.addEventListener('click', updatePage));
```

This is fine, but not exhaustive.
Links might come and go on your page, and they're not the only way users can navigate through pages.
E.g., they may submit a form or even use an [image map].
Your page might deal with these, but there's a long tail of possibilities which could just be simplified—something that the new Navigation API achieves.

Additionally, the above doesn't handle back/forward navigation. There's another event for that, `"popstate"`.

Personally, the History API often _feels_ like it could go some way to help with these possibilities.
However, it really only has two surface areas: responding if the user presses Back or Forward in their browser, plus pushing and replacing URLs.
It doesn't have an analogy to `"navigate"`, except if you manually set up listeners for click events for example, as demonstrated above.

## Deciding how to handle a navigation

The `navigateEvent` contains a lot of information about the navigation that you can use to decide how to deal with a particular navigation.

The key properties are:

`canIntercept`
: If this is false, you can't intercept the navigation.
Cross-origin navigations and cross-document traversals cannot be intercepted.

`destination.url`
: Probably the most important piece of information to consider when handling the navigation.

`hashChange`
: True if the navigation is same-document, and the hash is the only part of the URL that's different to the current URL.
In modern SPAs, the hash should be for linking to different parts of the current document. So, if `hashChange` is true, you probably don't need to intercept this navigation.

`downloadRequest`
: If this is true, the navigation was initiated by a link with a `download` attribute.
In most cases, you don't need to intercept this.

`formData`
: If this isn't null, then this navigation is part of a POST form submission.
Make sure you take this into account when handling the navigation.
If you only want to handle GET navigations, avoid intercepting navigations where `formData` is not null.
See the example on handling [form submissions](#form-submissions) later in the article.

`navigationType`
: This is one of `"reload"`, `"push"`, `"replace"`, or `"traverse"`.
If it's `"traverse"`, then this navigation cannot be cancelled via `preventDefault()`.

For example, the `shouldNotIntercept` function used in the first example could be something like this:

```js
function shouldNotIntercept(navigationEvent) {
  return (
    !navigationEvent.canIntercept ||
    // If this is just a hashChange,
    // just let the browser handle scrolling to the content.
    navigationEvent.hashChange ||
    // If this is a download,
    // let the browser perform the download.
    navigationEvent.downloadRequest ||
    // If this is a form submission,
    // let that go to the server.
    navigationEvent.formData
  );
}
```

## Intercepting

When your code calls `intercept({ handler })` from within its `"navigate"` listener, it informs the browser that it's now preparing the page for the new, updated state, and that the navigation may take some time.

The browser begins by capturing the scroll position for the current state, so it can be optionally restored later, then it calls your `handler` callback.
If your `handler` returns a promise (which happens automatically with [async functions](https://web.dev/async-functions/)), that promise tells the browser how long the navigation takes, and whether it's successful.

```js
navigation.addEventListener('navigate', navigateEvent => {
  if (shouldNotIntercept(navigateEvent)) return;
  const url = new URL(navigateEvent.destination.url);

  if (url.pathname.startsWith('/articles/')) {
    navigateEvent.intercept({
      async handler() {
        const articleContent = await getArticleContent(url.pathname);
        renderArticlePage(articleContent);
      },
    });
  }
});
```

As such, this API introduces a semantic concept that the browser understands: an SPA navigation is currently occurring, over time, changing the document from a previous URL and state to a new one.
This has a number of potential benefits, including accessibility: browsers can surface the beginning, end, or potential failure of a navigation.
Chrome, for example, activates its native loading indicator, and allows the user to interact with the stop button. (This doesn't currently happen when the user navigates via the back/forward buttons, but that [will be fixed soon][loading-crbug].)

### Navigation committing

When intercepting navigations, the new URL will take effect just before your `handler` callback is called.
If you don't update the DOM immediately, this creates a period where the old content is displayed along with the new URL.
This impacts things like relative URL resolution when fetching data or loading new subresources.

A way to delay the URL change is being [discussed on GitHub](https://github.com/WICG/navigation-api/issues/66), but it's generally recommended to immediately update the page with some sort of placeholder for the incoming content:

```js
navigation.addEventListener('navigate', navigateEvent => {
  if (shouldNotIntercept(navigateEvent)) return;
  const url = new URL(navigateEvent.destination.url);

  if (url.pathname.startsWith('/articles/')) {
    navigateEvent.intercept({
      async handler() {
        // The URL has already changed, so quickly show a placeholder.
        renderArticlePagePlaceholder();
        // Then fetch the real data.
        const articleContent = await getArticleContent(url.pathname);
        renderArticlePage(articleContent);
      },
    });
  }
});
```

This not only avoids URL resolution issues, it also feels fast because you're instantly responding to the user.

### Abort signals

Since you're able to do asynchronous work in an `intercept()` handler, it's possible for the navigation to become redundant.
This happens when:

- The user clicks another link, or some code performs another navigation.
  In this case the old navigation is abandoned in favour of the new navigation.
- The user clicks the 'stop' button in the browser.

To deal with any of these possibilities, the event passed to the `"navigate"` listener contains a `signal` property, which is an `AbortSignal`.
For more information see [Abortable fetch][abortable-fetch].

The short version is it basically provides an object that fires an event when you should stop your work.
Notably, you can pass an `AbortSignal` to any calls you make to `fetch()`, which will cancel in-flight network requests if the navigation is preempted.
This will both save the user's bandwidth, and reject the `Promise` returned by `fetch()`, preventing any following code from actions such as updating the DOM to show a now invalid page navigation.

Here's the previous example, but with `getArticleContent` inlined, showing how the `AbortSignal` can be used with `fetch()`:

```js
navigation.addEventListener('navigate', navigateEvent => {
  if (shouldNotIntercept(navigateEvent)) return;
  const url = new URL(navigateEvent.destination.url);

  if (url.pathname.startsWith('/articles/')) {
    navigateEvent.intercept({
      async handler() {
        // The URL has already changed, so quickly show a placeholder.
        renderArticlePagePlaceholder();
        // Then fetch the real data.
        const articleContentURL = new URL(
          '/get-article-content',
          location.href
        );
        articleContentURL.searchParams.set('path', url.pathname);
        const response = await fetch(articleContentURL, {
          signal: navigateEvent.signal,
        });
        const articleContent = await response.json();
        renderArticlePage(articleContent);
      },
    });
  }
});
```

### Scroll handling

When you `intercept()` a navigation, the browser will attempt to handle scrolling automatically.

For navigations to a new history entry (when `navigationEvent.navigationType` is `"push"` or `"replace"`), this means attempting to scroll to the part indicated by the URL fragment (the bit after the `#`), or resetting the scroll to the top of the page.

For reloads and traversals, this means restoring the scroll position to where it was last time this history entry was displayed.

By default, this happens once the promise returned by your `handler` resolves, but if it makes sense to scroll earlier, you can call `navigateEvent.scroll()`:

```js
navigation.addEventListener('navigate', navigateEvent => {
  if (shouldNotIntercept(navigateEvent)) return;
  const url = new URL(navigateEvent.destination.url);

  if (url.pathname.startsWith('/articles/')) {
    navigateEvent.intercept({
      async handler() {
        const articleContent = await getArticleContent(url.pathname);
        renderArticlePage(articleContent);
        navigateEvent.scroll();

        const secondaryContent = await getSecondaryContent(url.pathname);
        addSecondaryContent(secondaryContent);
      },
    });
  }
});
```

{% Aside %}
Although `scroll()` looks like a single call, the browser may try to set the scroll position multiple times asynchronously.
The means the browser can still scroll to the correct place, even if the content arrives slightly later, or moves around due to layout shifting.
{% endAside %}

Alternatively, you can opt out of automatic scroll handling entirely by setting the `scroll` option of `intercept()` to `"manual"`:

```js
navigateEvent.intercept({
  scroll: 'manual',
  async handler() {
    // …
  },
});
```

### Focus handling

Once the promise returned by your `handler` resolves, the browser will focus the first element with the [`autofocus` attribute](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autofocus) set, or the `<body>` element if no element has that attribute.

You can opt out of this behavior by setting the `focusReset` option of `intercept()` to `"manual"`:

```js
navigateEvent.intercept({
  focusReset: 'manual',
  async handler() {
    // …
  },
});
```

### Success and failure events

When your `intercept()` handler is called, one of two things will happen:

- If the returned `Promise` fulfills (or you did not call `intercept()`), the Navigation API will fire `"navigatesuccess"` with an `Event`.
- If the returned `Promise` rejects, the API will fire `"navigateerror"` with an `ErrorEvent`.

These events allow your code to deal with success or failure in a centralized way.
For example, you might deal with success by hiding a previously displayed progress indicator, like this:

```js
navigation.addEventListener('navigatesuccess', event => {
  loadingIndicator.hidden = true;
});
```

Or you might show an error message on failure:

```js
navigation.addEventListener('navigateerror', event => {
  loadingIndicator.hidden = true; // also hide indicator
  showMessage(`Failed to load page: ${event.message}`);
});
```

The `"navigateerror"` event listener, which receives an `ErrorEvent`, is particularly handy as it's guaranteed to receive any errors from your code that's setting up a new page.
You can simply `await fetch()` knowing that if the network is unavailable, the error will eventually be routed to `"navigateerror"`.

## Navigation entries

`navigation.currentEntry` provides access to the current entry.
This is an object which describes where the user is right now.
This entry includes the current URL, metadata that can be used to identify this entry over time, and developer-provided state.

{% Aside %}

Even sites that do not explicitly use the Navigation API will have a "current entry", and the entry is even updated or replaced if you use the older methods in the History API, `history.pushState()` and `history.replaceState()`, respectively.

{% endAside %}

The metadata includes `key`, a unique string property of each entry which represents the current entry and its _slot_.
This key remains the same even if the current entry's URL or state changes.
It's still in the same slot.
Conversely, if a user presses Back and then re-opens the same page, `key` will change as this new entry creates a new slot.

To a developer, `key` is useful because the Navigation API allows you to directly navigate the user to an entry with a matching key.
You're able to hold onto it, even in the states of other entries, in order to easily jump between pages.

```js
// On JS startup, get the key of the first loaded page
// so the user can always go back there.
const {key} = navigation.currentEntry;
backToHomeButton.onclick = () => navigation.traverseTo(key);

// Navigate away, but the button will always work.
await navigation.navigate('/another_url').finished;
```

### State

The Navigation API surfaces a notion of "state", which is developer-provided information that is stored persistently on the current history entry, but which isn't directly visible to the user.
This is extremely similar to, but improved from, `history.state` in the History API.

In the Navigation API, you can call the `.getState()` method of the current entry (or any entry) to return a copy of its state:

```js
console.log(navigation.currentEntry.getState());
```

By default, this will be `undefined`.

#### Setting state

Although state objects can be mutated, those changes are not saved back with the history entry, so:

```js
const state = navigation.currentEntry.getState();
console.log(state.count); // 1
state.count++;
console.log(state.count); // 2
// But:
console.info(navigation.currentEntry.getState().count); // will still be 1
```

The correct way to set state is during script navigation:

```js
navigation.navigate(url, {state: newState});
// Or:
navigation.reload({state: newState});
```

Where `newState` can be any [clonable object](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types).

If you want to update the state of the current entry, it's best to perform a navigation that replaces the current entry:

```js
navigation.navigate(location.href, {state: newState, history: 'replace'});
```

Then, your `"navigate"` event listener can pick up this change via `navigateEvent.destination`:

```js
navigation.addEventListener('navigate', navigateEvent => {
  console.log(navigateEvent.destination.getState());
});
```

#### Updating state synchronously

Generally, it's better to update state asynchronously via `navigation.reload({state: newState})`, then your `"navigate"` listener can apply that state. However, sometimes the state change has already fully applied by the time your code hears about it, such as when the user toggles a `<details>` element, or the user changes the state of a form input. In these cases, you may want to update state so these changes are preserved through reloads and traversals. This is possible using `updateCurrentEntry()`:

```js
navigation.updateCurrentEntry({state: newState});
```

There's also an event to hear about this change:

```js
navigation.addEventListener('currententrychange', () => {
  console.log(navigation.currentEntry.getState());
});
```

But, if you find yourself reacting to state changes in `"currententrychange"`, you may be splitting or even duplicating your state-handing code between the `"navigate"` event and the `"currententrychange"` event, whereas `navigation.reload({state: newState})` would let you handle it in one place.

#### State vs URL params

Because state can be a structured object, it's tempting to use it for all your application state.
However, in many cases it's better to store that state in the URL.

If you would expect the state to be retained when the user shares the URL with another user, store it in the URL.
Otherwise, the state object is the better option.

### Access all entries

The "current entry" is not all, though.
The API also provides a way to access the entire list of entries that a user has navigated through while using your site via its `navigation.entries()` call, which returns a snapshot array of entries.
This could be used to, e.g., show a different UI based on how the user navigated to a certain page, or just to look back at the previous URLs or their states.
This is impossible with the current History API.

You can also listen for a `"dispose"` event on individual `NavigationHistoryEntry`s, which is fired when the entry is no longer part of browser history. This can happen as part of general cleanup, but also happen when navigating. For example, if you traverse back 10 places, then navigate forwards, those 10 history entries will be disposed.

## Examples

The `"navigate"` event fires for all types of navigation, as mentioned above.
(There's actually a [long appendix in the spec][long-nav-appendix] of all possible types.)

While for many sites the most common case will be when the user clicks a `<a href="...">`, there are two notable, more complex navigation types that are worth covering.

### Programmatic navigation {: #programmatic-navigation }

First is programmatic navigation, where navigation is caused by a method call inside your client-side code.

You can call `navigation.navigate('/another_page')` from anywhere in your code to cause a navigation.
This will be handled by the centralized event listener registered on the `"navigate"` listener, and your centralized listener will be called synchronously.

This is intended as an improved aggregation of older methods like `location.assign()` and friends, plus the History API's methods `pushState()` and `replaceState()`.

{% Aside %}

These older programmatic methods for changing the URL are all still supported with the Navigation API and now fire the` "navigate"` listener.
That is, they're also handled centrally.
Their signatures aren't modified in any way (i.e., they won't now return a `Promise`) by this new specification, and we imagine that in an older codebase, they'll be replaced by calls to `.navigate()` over time.

{% endAside %}

The `navigation.navigate()` method returns a object which contains two `Promise` instances in `{ committed, finished }`.
This allows the invoker can wait until either the transition is "committed" (the visible URL has changed and a new `NavigationHistoryEntry` is available) or "finished" (all promises returned by `intercept({ handler })` are complete&mdash;or rejected, due to failure or being preempted by another navigation).

The `navigate` method also has an options object, where you can set:

- `state`: the state for the new history entry, as available via the `.getState()` method on the `NavigationHistoryEntry`.
- `history`: which can be set to `"replace"` to replace the current history entry.
- `info`: an object to pass to the navigate event via `navigateEvent.info`.

In particular, `info` could be useful to, for example, denote a particular animation that causes the next page to appear.
(The alternative might be to set a global variable or include it as part of the #hash. Both options are a bit awkward.)
Notably, this `info` won't be replayed if a user later causes navigation, e.g., via their Back and Forward buttons.
In fact, it will always be `undefined` in those cases.

<figure data-size="full">
  {% Video
    src="video/QMjXarRXcMarxQddwrEdPvHVM242/UGyXlkr5Cbn3Db84FwqU.mov",
    autoplay="true",
    loop="true",
    width="320",
    height="320",
    muted="true" %}
  <figcaption>
    <a href="https://chief-low-specialist.glitch.me/" target="_blank">Demo of opening from left or right</a>
  </figcaption>
</figure>

`navigation` also has a number of other navigation methods, all which return an object containing `{ committed, finished }`.
I've already mentioned `traverseTo()` (which accepts a `key` that denotes a specific entry in the user's history) and `navigate()`.
It also includes `back()`, `forward()` and `reload()`.
These methods are all handled—just like `navigate()`—by the centralized `"navigate"` event listener.

### Form Submissions {: #form-submissions }

Secondly, HTML `<form>` submission via POST is a special type of navigation, and the Navigation API can intercept it.
While it includes an additional payload, the navigation is still handled centrally by the `"navigate"` listener.

Form submission can be detected by looking for the `formData` property on the `NavigateEvent`.
Here's an example that simply turns any form submission into one which stays on the current page via `fetch()`:

```js
navigation.addEventListener('navigate', navigateEvent => {
  if (navigateEvent.formData && navigateEvent.canIntercept) {
    // User submitted a POST form to a same-domain URL
    // (If canIntercept is false, the event is just informative:
    // you can't intercept this request, although you could
    // likely still call .preventDefault() to stop it completely).

    navigateEvent.intercept({
      // Since we don't update the DOM in this navigation,
      // don't allow focus or scrolling to reset:
      focusReset: 'manual',
      scroll: 'manual',
      handler() {
        await fetch(navigateEvent.destination.url, {
          method: 'POST',
          body: navigateEvent.formData,
        });
        // You could navigate again with {history: 'replace'} to change the URL here,
        // which might indicate "done"
      },
    });
  }
});
```

## What's missing?

Despite the centralized nature of the `"navigate"` event listener, the current Navigation API specification doesn't trigger `"navigate"` on a page's first load.
And for sites which use [Server Side Rendering][ssr-definition] (SSR) for all states, this might be fine—your server could return the correct initial state, which is the fastest way to get content to your users.
But sites that leverage client-side code to create their pages may need to create an additional function to initialize their page.

Another intentional design choice of the Navigation API is that it operates only within a single frame—that is, the top-level page, or a single specific `<iframe>`.
This has a number of interesting implications that are [further documented in the spec][backforward-note], but in practice, will reduce developer confusion.
The previous History API has a number of confusing edge cases, like support for frames, and the reimagined Navigation API handles these edge cases from the get-go.

{% Aside %}

In the near future, it's hoped that [an unrelated change to the HTML spec][iframe-historyless] could introduce "historyless" IFrames which do not participate in the browser's history.
IFrames which change their URLs have classically confused both developers and users because these changes have no effect on the user's URL bar or overall page title.
So, e.g., a user pressing Back or Forward in their browser might not see an immediately obvious effect.

{% endAside %}

Lastly, there's not yet consensus on programmatically modifying or rearranging the list of entries the user has navigated through.
This is [currently under discussion][bug-edit-entries], but one option could be to allow only deletions: either historic entries or "all future entries".
The latter would allow temporary state.
E.g., as a developer, I could:

- ask the user a question by navigating to new URL or state
- allow the user to complete their work (or go Back)
- remove a history entry on completion of a task

This could be perfect for temporary modals or interstitials: the new URL is something that a user can use the Back gesture to leave from, but they then cannot accidentally go Forward to open it again (because the entry has been removed).
This is just not possible with the current History API.

## Try the Navigation API

The Navigation API is available in Chrome 102 without flags.
You can also [try out a demo][demo] by [Domenic Denicola][domenic].

While the classic History API appears straightforward, it's not very well-defined and has [a large number of issues][history-api-issues] around corner cases and how it has been implemented differently across browsers.
We hope you consider providing feedback on the new Navigation API.

## References

- [WICG/navigation-api][repo]
- [Mozilla Standards Position][mozilla-position]
- [Intent To Prototype][i2p]
- [TAG review][w3ctag]
- [Chromestatus entry][chromestatus]

## Acknowledgements

Thanks to [Thomas Steiner][thomassteiner], [Domenic Denicola][domenic] and Nate Chapin for reviewing this post.
Hero image from [Unsplash][hero-image], by [Jeremy Zero][hero-image-by].

[clunky-history-api]: https://html5doctor.com/interview-with-ian-hickson-html-editor/#:~:text=My%20biggest%20mistake%E2%80%A6there%20are%20so%20many%20to%20choose%20from!%20pushState()%20is%20my%20favourite%20mistake
[scroll-restoration]: /blog/history-api-scroll-restoration/
[image map]: https://developer.mozilla.org/docs/Web/HTML/Element/map
[back-forward-discuss]: https://github.com/WICG/navigation-api/issues/32
[loading-crbug]: https://bugs.chromium.org/p/chromium/issues/detail?id=1241202
[abortable-fetch]: /blog/abortable-fetch/
[ssr-definition]: https://web.dev/rendering-on-the-web/#terminology
[initial-event-discuss]: https://github.com/WICG/navigation-api/issues/31
[backforward-note]: https://github.com/WICG/navigation-api#warning-backforward-are-not-always-opposites
[iframe-historyless]: https://github.com/whatwg/html/issues/6501
[feedback-wanted]: https://github.com/WICG/navigation-api/issues?q=is%3Aissue+is%3Aopen+label%3A%22feedback+wanted%22
[history-api-issues]: https://github.com/whatwg/html/issues?q=is%3Aissue+is%3Aopen+history
[mozilla-position]: https://github.com/mozilla/standards-positions/issues/543
[i2p]: https://groups.google.com/a/chromium.org/g/blink-dev/c/R1D5xYccqb0/m/8ukfzdVSAgAJ?utm_medium=email&utm_source=footer
[w3ctag]: https://github.com/w3ctag/design-reviews/issues/605
[chromestatus]: https://chromestatus.com/features/6232287446302720
[hero-image]: https://unsplash.com/photos/bGYguEqV2lk
[hero-image-by]: https://unsplash.com/@jeremybezanger
[thomassteiner]: https://web.dev/authors/thomassteiner/
[domenic]: https://web.dev/authors/domenic/
[demo]: https://gigantic-honored-octagon.glitch.me/
[wicg-report]: https://wicg.github.io/navigation-api/
[repo]: https://github.com/WICG/navigation-api
[bug-edit-entries]: https://github.com/WICG/navigation-api/issues/9
[long-nav-appendix]: https://github.com/WICG/navigation-api#appendix-types-of-navigations
