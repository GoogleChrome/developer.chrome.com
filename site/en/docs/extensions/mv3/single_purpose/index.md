---
layout: "layouts/doc-post.njk"
title: "Extensions quality guidelines FAQ"
date: 2014-05-09
updated: 2017-05-09
description: Frequently asked questions about the single purpose policy.
---

To maintain the quality of the Chrome user experience, on December 19, 2013, we launched a policy
requiring Chrome extensions to have a single purpose. In addition, starting with the May 2014
release of Chrome, we [started requiring][1] that extensions in Chrome for Windows be hosted in the
Chrome Web Store. Starting in Chrome 44 in July 2015, extensions in Mac were also [required to be
hosted in the Chrome Web Store][2].

With the July 2014 release of Chrome, we introduced the [Settings Overrides API][3] to allow
extensions to manage important Chrome settings on Windows. Most recently, with the January 2017
release of Chrome, we enabled the [Settings Overrides API][4] on Mac.

## 1.) Why did Google launch a "single purpose" Chrome extensions policy? {: #one }

To maintain the quality of the Chrome user experience, we require Chrome extensions to have a single
purpose. For an overview of the policy announcement, please read this [Chromium blog post][5].

We launched this policy because multi-purpose extensions can crowd your browser UI and slow down
your web browsing sometimes significantly. Speed and simplicity have always been part of Chrome's
core principles, so this policy will help us get back to the design that was originally intended.
Also, unexpected changes to browser functionality and settings have become the number one user
complaint for Chrome users, and this policy helps minimize the problem by ensuring that users
understand what extensions are doing.

## 2.) Where can I find the "single purpose" policy? {: #two }

Please refer to the [Extensions Quality Guidelines][6] section of the Chrome Web Store Developer
Program Policies.

## 3.) What does "single purpose" actually mean? {: #three }

"Single purpose" can refer to one of two aspects of an extension:

An extension can have a single purpose limited to a narrow **focus area or subject matter** (for
example, news headlines", "weather", "comparison shopping"). If the extension has a narrow focus
area or subject matter, then it can offer various functions related to that focus area or subject
matter. For example, a news headlines extension could have a browser action button that allows users
to see news stories and replace the new tab page with news-only content, so long as all of those
functions are narrowly focused on the news headline focus area.

Or, an extension can have a single purpose limited to a narrow **browser function** (for example,
"new tab page", "tab management", or "browser history"). If the extension is implemented in a single
function, then it can offer content or features related to different areas or subjects. For example,
an extension that replaces the new tab page could offer multiple unrelated features on the new tab
page (for example, weather forecast, news headlines, search engine, and so on), but it can't also
provide a browser action button, change the browser's homepage, or make any other changes to browser
functionality.

Be conscious of your extension's permissions. We assume your extension utilizes each of the
permissions it requests. Excessive permissions unrelated to your extension's single purpose will be
viewed as enabling unrelated functionalities, resulting in a policy violation.

## 4.) Will this policy affect my extension? {: #four }

It depends. Particularly if your extension offers multiple features, please make sure that it has a
single purpose. Ask yourself these questions:

- Does my extension have a narrow focus area or a narrow function as described above?
- If my extension has a narrow focus area, are all of the features directly related to that single
  purpose?
- If my extension has multiple features, does it only affect a narrow function of the browser?
- Does my extension modify Chrome's behavior in a predictable way, in line with the extension's
  narrow, stated purpose?
- Does my extension request any unnecessary permissions?

If you're unsure, you can email [chromewebstore-policy@google.com][7] with your extension ID, and
we'll take a look and try to provide feedback within a week. If your extension does not have a
single purpose, then you will need to remove functionality or split your extension into different
extensions.

## 5.) What will happen if I don't make my extension compliant with this policy? {: #five }

If you created your extension after December 19, 2013, your extension will not be permitted in the
Chrome Web Store. If you created your extension prior to December 19,2013, your extension may be
removed from the Chrome Web Store starting July 22, 2014, although you will still be able to update
the extension and file appeals. Please keep in mind that your re-published item will not be
immediately published live in the store. The re-published item will undergo a compliance review
before it can be restored.

In order to minimize disruption for users, we recommend that you take a moment to carefully review
your extensions and make necessary updates as soon as possible. You can email us at
[chromewebstore-policy@google.com][8] with your extension ID, and we'll try to provide feedback
within a week.

## 6.) Can my extension make changes to the start page, homepage, and new tab settings? {: #six }

Yes. If the purpose of your extension is to modify one narrow function of the browser (either the
start page, homepage or new tab page, for example), and it does only that, then it would be
compliant with the single-purpose policy. Additionally, if the purpose of your extension is limited
to one focus area or subject matter, then you can have various functions related to that one area or
subject matter, including changes to start page, homepage and new tab page.

As of July 1, 2017, however, the only way to programmatically change the startup page, the homepage,
or the search provider settings in Chrome on Windows and Mac is via the Settings Overrides API. If
your extension modifies one of these functions, it must use the Settings Overrides API.

Where more than one extension modifies these Chrome settings, the most recently installed extension
will manage the settings it has modified via the Settings Override API. Extension developers can
modify the new tab page (and a few other Chrome pages) using the same [override method][9] as
before.

In addition, if you want to publish an extension that modifies Chrome settings, you must either
control any domains you wish to set in any changed browser settings or redistribute an extension
created by the entity that controls those domains. For example, you could distribute an extension
that changes the homepage to wikipedia.org if the Wikimedia Foundation originally created and
published the extension in the Chrome Web Store, and gave you the right to distribute it.

## 7.) Can my extension make changes to the default search settings? {: #seven }

Yes. If the only purpose of the extension is to change the default search settings, then it would be
compliant with the single purpose policy. Additionally, if the single purpose of your extension is
search as the narrow focus area, and nothing else, then you can offer various functions related to
search, including changes to default search settings.

The only supported way to change the default search settings for Windows and Mac is via the Settings
Overrides API. Extensions that change the default search without using the Overrides API are subject
to removal from the Chrome Web Store.

## 8.) My extension makes programmatic changes to Chrome user settings, but does not use one of the available APIs, what is the deadline to make changes to my extension? {: #eight }

If your extension makes programmatic changes to user settings within Chrome on Mac, make sure you
begin adjusting your code to use the Settings Overrides API. Extensions for Chrome on Windows have
been required to use the new policy since May 2014. Developers of extensions for Chrome on Mac have
until July 1, 2017 to make the appropriate changes and resubmit their extensions. After that date,
extensions that make programmatic changes to any Chrome user settings without an API, will be
subject to removal from the Web Store.

## 9.) How will users be notified of settings changes in new versions of Chrome? {: #nine }

If an extension changes Chrome settings via the Settings Override API, the user will be notified of
the settings changes prior to installation, when they encounter the settings change for the first
time, and via an indicator next to each changed setting on the Chrome settings page. From these
notifications, users will have the option to reverse the settings changes by disabling the
extension.

## 10.) What happens to settings when an extension is disabled? {: #ten }

All Chrome settings changed by an extension will be reverted when that extension is disabled.

## 11.) Will users' existing homepage, search provider or startup pages be affected by the introduction of the Settings Override API? {: #eleven }

No. A user's existing homepage, search provider or startup settings will remain unchanged by the
introduction of Settings Override API. Following the launch of the Settings Override API, only
extensions can programmatically change these settings and only through the Settings Override API.

## 12.) Does this policy apply to Chrome apps too? {: #twelve }

At this time, Chrome apps (as distinguished from extensions) are not required to be distributed
through the Chrome Web Store, or to have a single purpose. Chrome apps are currently not capable of
changing Chrome settings.

## 13.) Can I bundle ad injection with some other type of functionality? {: #thirteen }

No. This violates the single purpose policy. However, if injecting ads is the single purpose of the
extension and the extension is otherwise compliant with Chrome policies, then it would be
acceptable. For example, a "related articles" extension that adds sponsored links to articles
related to a page the user is visiting would be compliant with the single purpose policy because it
has a single purpose limited to a narrow function of the browser. You also might want to explore the
other monetization options described [here][10].

## 14.) Are toolbars permitted under this policy? {: #fourteen }

It depends on what the toolbar does. As described in [answer #3][11], it must adhere to the narrow
single purpose of the extension. Broad, multi-purpose toolbars are not allowed and toolbars that are
implemented using content scripts to inject UI into every page are not recommended because they slow
down every page load, clutter the UI, and can lead to security problems for users. Instead, consider
using a [browser action popup][12], which was designed to solve this very problem. It's a better
user experience, with no performance or security downsides.

## 15.) What will happen to non-compliant extensions that were already installed by users? {: #fifteen }

All extensions must comply with the Extension Quality Guidelines. If a user installed a
non-compliant extension, then you will need to update them to a compliant extension that is hosted
in the Chrome Web Store. If the user is not updated to a compliant extension that is hosted in the
Chrome Web Store, then the extension will be automatically disabled. As noted above, any settings or
behaviours controlled by the extension, including any settings controlled by the Settings Override
API, will be reverted when the extension is disabled. You can find more information [here][13].

## 16.) If my extension is rejected from the Chrome Web Store because it doesn't comply with the single purpose policy, what will happen after the requirement to host extensions in the Chrome Web Store comes into effect? {: #sixteen }

If your extension is rejected from the Chrome Web Store, you will need to make changes or appeal the
decision. After the requirement to host extensions in the Chrome Web Store comes into effect for
Windows in late May 2014, your extension must be hosted in the Chrome Web Store or it will be
automatically disabled from the users' browsers. The same will occur for Mac extensions that are not
hosted on the Chrome Web Store prior to the release of 44 in July 2015.

## 17.) If my extension gets flagged for review under the single purpose policy, what will happen? {: #seventeen }

Our team will review it, and it may be removed from the Chrome Web Store. You'll have a chance to
make changes and appeal the decision. As noted above, if you created your extension before we
announced the policy on December 19, 2013, you have until July 22, 2014 to make changes. If your
extension was created after the policy was announced, it needs to be compliant now. You can
temporarily unpublish it and contact us at [chromewebstore-policy@google.com][14] with your
extension ID if you'd like feedback. We'll try to respond within a week.

## 18.) If my extension's single purpose is to change the new tab page, can I use the browser/page action button? {: #eighteen }

The addition of a page or browser action button under the new Chrome UI (Chrome 49 and later), will
not trigger a single purpose policy violation if the button only serves as a shortcut to the
extension's main functionality. For example, if an extension's single purpose is changing the new
tab page, clicking the toolbar icon can open a new tab page. The page or browser action button
button, however, cannot introduce any additional functionality or content. If an extension's single
purpose is a narrow subject matter or focus area, then the functionality and content of the browser
action button must likewise fall within that narrow purpose.

## 19.) I need help. Who should I contact? {: #nineteen }

You can email [chromewebstore-policy@google.com][15] with your extension ID, and we'll take a look
and try to provide feedback within a week. This is a lightweight review intended to give you an
indication of whether your extension will comply with the new policy.

## Appendix: Examples of extensions that comply with the quality guidelines {: #appendix }

An extension that adds features to Chrome's browser history. All of the features are contained in a
single browser function.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Z2D3bf3oKeu7xFYr6JkY.png",
       alt="Image of browsing history extension", height="385", width="680" %}

An extension with a single subject matter: It provides dropdown information about the weather.
Because it is focused on one type of content, this extension could also change browser settings,
like the new tab page, where the extension displays weather conditions and offers a weather search.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/mFpoq52gmosqUk2o5hDl.png",
       alt="Image of weather extension", height="425", width="680" %}

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/epJv9ntYr6LGgUS3HdwB.png",
       alt="Image of weather extension showing new tab page", height="488", width="781" %}

A search extension. It has multiple features, including this dropdown, but all of them are related
to the narrow subject matter of search.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/S92tiTcndTEmjPJYWVoW.png",
       alt="Image of search extension", height="425", width="680" %}

[1]: http://blog.chromium.org/2014/02/make-sure-to-get-your-extension-in.html
[2]: http://blog.chromium.org/2015/05/continuing-to-protect-chrome-users-from.html
[3]: http://blog.chromium.org/2014/03/protecting-user-settings-on-windows.html
[4]: https://security.googleblog.com/2017/03/expanding-protection-for-chrome-users.html
[5]: http://blog.chromium.org/2013/12/keeping-chrome-extensions-simple.html
[6]: /docs/webstore/program_policies?csw=1#extensions
[7]: mailto:chromewebstore-policy@google.com
[8]: mailto:chromewebstore-policy@google.com
[9]: /docs/extensions/mv3/override
[10]: /docs/webstore/money
[11]: #three
[12]: /docs/extensions/browserAction
[13]: http://blog.chromium.org/2014/02/make-sure-to-get-your-extension-in.html
[14]: mailto:chromewebstore-policy@google.com
[15]: mailto:chromewebstore-policy@google.com
