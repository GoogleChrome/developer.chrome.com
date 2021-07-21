---
layout: 'layouts/doc-post.njk'

# The page title. This appears at the top of the doc and as the page name
# in Google Search.
title: Extensions platform vision

# This appears in the ToC of the project landing page at
# /docs/[project-name]/. It also appears in the <meta description> used in 
# Google Search.
description: 'Where the extensions platform is headed and why'

# The publish date
date: 2020-11-09

# An optional updated date
# updated: 2020-10-16

# A list of authors. These usernames correspond to the keys in the
# _data/authorsData.json file.

---

Chrome extensions are one of the most-loved and most-used features of the
Chrome browser.  Extensions can solve a myriad of use cases for a diverse set
of users, and in one form or another they are becoming a staple feature of most
major browsers.

There's a thriving extension developer community, with hundreds of thousands of
published extensions; a strong user base, and millions of extensions downloaded
every day. We're going to continue improving and extending this vibrant
ecosystem.

This page describes our longer-term vision for the Chrome extensions platform.
This helps developers understand and embrace the future direction of the
extensions platform.

## Historical context

There have been browser extensions, in one form or another, almost as long as
there have been web browsers. Extensions provide a great way to empower users,
by adding specialized features and making the browser better for specific
users' needs.

The Chrome extension platform was based on a "webby" model to minimize the
barrier to developer engagement. It was also conceived to be more secure at its
core than previous efforts, by building on web technologies and the web's
security model.

Later, Chrome extensions introduced a permissions model to give users
finer-grained control what information and resources could be accessed by any
extensions they install. The extensions platform also sandboxed extensions in
separate processes, providing additional security.

{% Img src="image/SHhb2PDKzXTggPGAYpv8JgR81pX2/1604880385879.svg", alt="Diagram of timeline from previous efforts through current state and future directions", width="574", height="119" %}

Developers have used our platforms to build a wonderful range of extensions,
providing Chrome users with all kinds of enhancements to the browser experience.
But the power of the extensions platform has sometimes
been exploited to gain inappropriate access to user data and metadata. We see
scope for improvement in the privacy and security of extensions; we also intend
to focus on performance, while improving extension capability
and preserving webbiness.


## Where we're headed

The Chrome extensions platform continues to evolve. The specific course we're
steering focuses on improvements to security, performance, and privacy &mdash;
while preserving or extending the capability of extensions and keeping a
webby developer experience.

{% 
  Img src='image/SHhb2PDKzXTggPGAYpv8JgR81pX2/1604881144327.svg', 
  alt='Diagram showing privacy, security, and performance as pillars atop a foundation of webbiness and performance', 
  width='426', 
  height='345'
%}

**Privacy** &mdash; Provide ways for extensions to work well without the need
to persistently access user data.
Improve user control of permissions by informing users what extensions are
doing, letting them grant permissions at runtime and in context.

**Security** &mdash;
Move toward stricter protocols and requirements for extensions to access
resources outside the extension context

**Performance** &mdash; Ensure that extensions work well on all devices:
performance issues don't detract from the browser experience, and Chrome
runs smoothly even when  many extensions are installed.

**Webbiness** &mdash; Embrace the web platform way of doing things, helping to
lower barriers to developer engagement, and benefit as the web platform continues to evolve.

**Capability** &mdash; Overall, keep the platform capable, powerful, and
feature-rich so extensions can continue to improve and deliver ever-greater
value to users.

## The developer and user experience

The continued evolution of the extensions platform will result in a matching
evolution of the developer and end-user experience. The following sections
describe some specific feature avenues we'll be pursuing.

### Improved user visibility and control

The extensions platform will provide greater user visibility and control, so
that users can more easily manage how extensions access their data and
other resources. The platform already begins to address this by:

* Letting the user modify the host permissions granted to extensions
* The extensions menu showing which items can or want to access the current page

We'll continue to improve this user experience. Look for an increasing emphasis
on temporary, in-context style of permissions grants, constraining passive
access to user data. The introduction of
[activeTab](/extensions/activeTab) was an initial
step in this direction.

It's also important that users make informed decisions about how their data is
handled. We'll be introducing new ways to help users understand what data each
extension accesses and how it uses that data, so that users have control of
their data.


### A new approach to user data access

Many extensions rely on persistent access to user data: the user gives access
permission on installation, and the extension can then access the data at any
time. We're moving away from this model of persistent access. Instead, we want
to let users grant permissions temporarily and only in the context where
they're needed.

Beyond that, we'll be providing new API features to help
extensions perform work without requiring data access. Chrome's
[declarativeNetRequest](/extensions/declarativeNetRequest)
is an example of this approach.


### Better alignment with the web platform

Chrome extensions continue to build on *and extend* web technologies. This
helps to minimize obstacles to developer engagement. Look for further adoption
of open web capabilities, in addition to extension-specific technologies.

When the [Open Web](https://www.w3.org/wiki/Open_Web_Platform) provides
a way to achieve a result, the extensions platform will adopt that approach
in preference to an extensions-specific approach.

Beyond service workers and promises, expect the extensions platform to continue
adopting contemporary web technologies and approaches as they come about. Our
intention is to converge with, rather than diverge from, the Open Web.

### Expanded capabilities

And of course we'll continue to improve the extensions platform, even beyond
the specific goals expressed in this vision. The extensions platform will
evolve to address new use cases, add capabilities, and embrace new web features
as they come about.

### New policies to support these objectives

The extensions platform and the Chrome Web Store will introduce new policies to
support the objectives described in this vision. These policies will encourage
clearer communication between developers and end users about the privileges
that extensions use. Look for new policies that require disclosures, constrain
the context for accessing user data, and better enforcement of the extensions
single purpose policy.

## Manifest V3

The vision set forth in this article represents a strategic direction &mdash;
like a compass heading or north star. Manifest V3 and its associated features
are a major step in this strategic direction. 

To learn about Manifest V3 itself and its features, see [Overview of Manifest
V3](/docs/extensions/mv3/intro/mv3-overview).

### Manifest V3 related changes

There are a number of features that aren't actually part of MV3, but are
scheduled for release in the same time frame. These features are related to MV3
in that they impose new requirements that MV3 is designed to address.

The key feature launching in this category is the changing way that host
permissions are granted. Again, this isn't an MV3 feature, but it does motivate
MV3 changes. Expect these changes in early 2021.

The initial steps in this area have already launched:

* The ability to modify an extension's host access (see [Trustworthy Chrome Extensions,
  by Default](https://blog.chromium.org/2018/10/trustworthy-chrome-extensions-by-default.html)).
* Moving extensions out of the right-click menu and into a button on the extensions menu
  (see [A new home for your extensions](https://blog.google/products/chrome/more-intuitive-privacy-and-security-controls-chrome/)).

### Future related changes

Moving forward, we'll be changing host permissions to be optional by default,
with explicit user consent required to grant site access. We'll also be
providing new ways for users to defer permission grants until run time, so that
users understand the context of the permission being requested. These changes
are intended to provide greater user visibility of permissions.

