---
title: "The Chromium Chronicle #21: ChromeOS End-to-end UI Automation"
description: >
  Tast is a new UI library has been created that uses the Chrome a11y (accessibility) tree
  to control the ChromeOS UI. The library enables developers to easily
  create End-to-end tests against any visible UI surface.
layout: 'layouts/blog-post.njk'
date: 2021-05-27
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 21:** by Brendan Hansknecht in Mountain View, CA (May, 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

Historically, automating the ChromeOS UI in end-to-end (E2E) tests across the entire
fleet of devices has been difficult. In Tast, a new UI library has been
created that uses the Chrome a11y (accessibility) tree to control the ChromeOS UI. **This
library enables developers to easily create E2E tests against any visible
UI surface (ChromeOS desktop UI, native apps, web apps, Chrome Browser UI).**

The library has a simple, chainable way to describe how to find a UI element.
For example, the _Downloads_ folder in the Files App could be defined as:

```go
filesWindow := nodewith.NameStartingWith("Files")
  .ClassName("RootView").Role(role.Window)
downloadsButton := nodewith.Name("Downloads")
  .Role(role.TreeItem).Ancestor(filesWindow)
```

Once you have defined a node finder, it is possible to interact with the
node in many ways. **From simple clicks to waiting for focus, the UI
library gives stable access to many operations**. For example, to right
click the _Downloads_ folder and left click the copy button, you could write:

```go
ui := uiauto.New(tconn)
if err := uiauto.Combine("copy downloads",
  ui.RightClick(downloadsButton),
  ui.LeftClick(nodewith.Name("Copy").Role(role.MenuItem)),
)(ctx); err != nil { /* do error handling */ }
```

There are existing [wrappers around common UI areas][wrappers] (settings,
launcher, files app, etc).

The `uiauto.Run` function used above takes a list of actions. In this
context, an action is just a `func(context.Context) error`. With such a
simple API, **other kinds of actions can be mixed in with UI actions**.
For example, using the keyboard is as easy as:

```go
if err := uiauto.Combine("do some random stuff",
  ui.FocusAndWait( /* some text field */ ),
  kb.TypeAction("Hello, world!"),
  kb.AccelAction("Enter"),
  func(ctx context.Context) error {
    // My custom action!
  },
)(ctx); err != nil { /* do error handling */ }
```

For a more in depth guide, see [Tast Codelab: Chrome UI Automation][codelab-3]

When writing these tests, it is very useful to dump the Chrome a11y tree
for debugging. Simply add the following code to do so:

```go
defer faillog.DumpUITreeOnError(ctx, s.OutDir(), s.HasError, tconn)
s.Fatal("I would like to see the ui tree here")
```

The a11y tree will now be stored with other tast logs as `faillog/ui_tree.txt`

If you have any questions contact the [tast-users group][tast-users].

[codelab-3]: https://chromium.googlesource.com/chromiumos/platform/tast/+/HEAD/docs/codelab_3.md
[wrappers]: https://pkg.go.dev/chromium.googlesource.com/chromiumos/platform/tast-tests.git/src/chromiumos/tast/local/chrome/uiauto#section-directories
[tast-users]: https://groups.google.com/a/chromium.org/g/tast-users
