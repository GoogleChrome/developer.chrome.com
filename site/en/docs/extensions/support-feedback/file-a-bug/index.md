---
layout: 'layouts/doc-post.njk'
title: File a bug
description: 'TBD'
date: 2023-10-11
tags:
  - extensions
---

## File a bug

While developing an extension, you may find behavior that does not match the extension's documentation or is otherwise unexpected. This may be the result of a Chrome bug. Regardless, please let us know by filing an appropriate issue report. Please provide enough information to reproduce the issue by following these steps:

1.  Before filing a bug, [search the Chromium issue tracker](/docs/extensions/support-feedback/find-a-bug) to verify that your issue hasn't already been reported.
1.  Build a *minimal* test extension to demonstrate the issue to us. It should have as little code as possible—generally 100 lines or fewer— to demonstrate the bug. If you can't reproduce the bug in this space, it may indicate that the bug is in your own code. Consider searching for a solution or posting a question in the [Extensions Google Group](https://groups.google.com/a/chromium.org/group/chromium-extensions/topics).
1.  File an issue in [the issue tracker](https://crbug.com). Be as explicit as possible when filling out the bug. The easier it is to reproduce the issue, the greater the chance it will be fixed promptly.
    -   Choose a descriptive title.
    -   Specify the Chrome version and platform where you see the behavior.
    -   Explain the steps needed to reproduce the bug.
    -   Describe the expected and actual behavior.
    -   Add a link to your test extension.
    -   Add screenshots, if appropriate.
    -   If your bug relates to service worker lifetime behavior, include the section of the `chrome://extensions-internals` page relating to your extension.
    -   If your bug relates to a crash, upload it at `chrome://crashes` and share the crash ID.

1.  Wait for the bug to be updated. Most extension bugs are triaged within a week, although it can sometimes take longer. *Please do not reply to the bug requesting an update*. If your bug has not been modified after two weeks, please post a message to the [Google group](https://groups.google.com/a/chromium.org/group/chromium-extensions/topics) with a link to your bug.
1.  If you originally reported your bug in the discussion group and were directed here, post a link to the issue you created or found in the discussion group thread. This makes it easier for others who encounter the same issue.