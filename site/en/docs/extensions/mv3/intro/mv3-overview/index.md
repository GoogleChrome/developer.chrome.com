---
layout: 'layouts/doc-post.njk'

# The page title. This appears at the top of the doc and as the page name
# in Google Search.
title: Overview of Manifest V3

# This appears below the title and is an optional teaser
subhead: 'Key changes and features of Manifest V3.'

# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in
# Google Search.
description: 'A description of the features and changes introduced by Manifest V3.'

# The publish date
date: 2020-11-09

# An optional updated date
# updated: 2020-10-16

# A list of authors. These usernames correspond to the keys in the
# _data/authorsData.json file.

---

Manifest V3 (MV3) is a major step forward in steering towards our
[vision for the extensions platform](/docs/extensions/mv3/intro/platform-vision/).
MV3 focuses on the three pillars of that vision: privacy, security, and
performance, while preserving and improving our foundation of capability and
webbiness.

This article summarizes the features and major changes introduced by MV3. For
help migrating Manifest V2 extensions to MV3, or to better understand the
architectural impact of these changes, see also the [MV3 migration
guide](/docs/extensions/mv3/intro/mv3-migration/).

Manifest V3 is available beginning with Chrome
[88](https://chromiumdash.appspot.com/schedule), and the Chrome Web Store
begins accepting MV3 extensions in January 2021.

New features and changes will continue to be added to MV3, just as they have
been in earlier manifest versions.


## Feature summary {: #feature-summary }

There are a number of new features and functional changes for extensions using
MV3:

* [Service workers](#service-workers) replace background pages.
* [Network request modification](#network-request-modification) is now handled with the new [declarativeNetRequest](/docs/extensions/reference/declarativeNetRequest) API.
* [Remotely hosted code](#remotely-hosted-code) is no longer allowed; an extension can only execute JavaScript that is included within its package.
* [Promise](#promises) support has been added to many methods, though callbacks are still supported as an alternative. (We will eventually support promises on all appropriate methods.)
* A number of other, relatively [minor feature changes](#other-features) are also introduced in MV3.

Each of these changes is summarized in the sections below.


## Major features {: #major-features }

This section introduces the most important and impactful features of MV3.


### Service workers {: #service-workers }

Manifest V3 replaces background pages with service workers.

Like their web page counterparts, extension service workers listen for and
respond to events in order to enhance the end user's experience. For web
service workers this typically means managing cache, preloading resources, and
enabling offline web pages. While extension service workers can still do all of
this, the extension package already contains a bundle of resources that can be
accessed offline. As such, extension service workers tend to focus on reacting
to relevant browser events exposed by Chrome's extensions APIs.


### Network request modification {: #network-request-modification }

The way that extensions can modify network requests is changing in MV3. There's
a new [declarativeNetRequest](/docs/extensions/reference/declarativeNetRequest)
API which lets extensions modify and block network requests in a
privacy-preserving and performant way. The essence of this API is:

*   Rather than intercepting a request and modifying it procedurally, the extension asks Chrome to evaluate and modify requests on its behalf.
*   The extension declares a set of rules: patterns to match requests and actions to perform when matched. The browser then modifies network requests as defined by these rules.

Using this declarative approach dramatically reduces the need for persistent host permissions.

{% Aside %}
Some extensions may still require broad host permissions for certain use cases
(such as redirecting requests). See [Conditional permissions and
declarativeNetRequest](/docs/extensions/mv3/intro/mv3-migration#declarativenetrequest-conditional-perms)
for further details.
{% endAside %}

The blocking version of the
[webRequest](/docs/extensions/reference/webRequest)
API is restricted to force-installed extensions in MV3. This is because of
issues with the blocking webRequest approach:

*   **Privacy**: This requires excessive access to user data, because extensions need to read each network request made for the user.
*   **Performance**: Serializing & deserializing data across multiple process hops & the C++/JS boundary adds up.
*   **Compatibility**: Does not work well with event-based background execution as it requires the service worker to be running to handle every request.

This means that developers can implement many common use cases, such as content
blocking functionality, without requiring any host permissions.


### Remotely hosted code {: #remotely-hosted-code }

A key security improvement in MV3 is that extensions can't load remote code
like JavaScript or Wasm files. This lets us more reliably and efficiently
review the safe behavior of extensions when they're submitted to the Chrome Web
Store. Specifically, all logic must be included in the extension's package.

Instead of remote code, we recommend the use of remote configuration files. See
the [migration guide](/docs/extensions/mv3/intro/mv3-migration#remotely-hosted-code)
for more about how to work with this change.


### Promises {: #promises }

MV3 provides first-class support for promises: many popular APIs support
promises now, and we will eventually support promises on all appropriate
methods.

You can use promise chains, as well as async/await. If you provide a callback
to an API method, this prevents the promise from being returned. Therefore you
can defer this part of your migration until you're ready, or begin using
promises immediately.

Some scenarios, such as event listeners, will still require callbacks.


## Other features {: #other-features }

There are a number of other changes introduced in MV3:

* [Action API consolidation](/docs/extensions/mv3/intro/mv3-migration#action-api-unification):
  The Browser Action and Page Action APIs are unified into a single Action API.
* [Web accessible resources](/docs/extensions/mv3/intro/mv3-migration#web-accessible-resources): These resources are now available only to specified sites and extensions.
* [Content security policy (CSP)](/docs/extensions/mv3/intro/mv3-migration#content-security-policy): You now specify separate CSP for different execution contexts in a single object, and certain policies are disallowed.
* [executeScript() changes](/docs/extensions/mv3/intro/mv3-migration#executing-arbitrary-strings): Extensions can no longer execute arbitrary strings, only script files and functions. This method is also migrating from the Tabs API to the new Scripting API.

The following features will be added to MV3 soon:

* **Dynamic content scripts:** the new Scripting API lets extensions register and unregister content scripts at runtime.
* **New favicon API:** this new JavaScript API replaces "chrome://favicons" and gives  developers a way to retrieve websites' favicons.
* **In-memory storage:** a new StorageArea on the Storage API that can be used to store values in memory across service worker restarts.

Look for announcements of these and other MV3 features as they become available.
