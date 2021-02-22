---
title: "The Chromium Chronicle #10: Catching UI Regressions with Pixel Tests"
description: >
  Chrome's testing strategy relies heavily on automated functional correctness
  tests and manual testing, but neither of these reliably catch minor UI
  regressions. Use pixel tests to automate testing your desktop browser UI.
layout: 'layouts/blog-post.njk'
date: 2020-02-05
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 10:** by Sven Zheng in Bellevue, WA (January, 2020)<br>
[Previous episodes](/tags/chromium-chronicle/)

Chrome's testing strategy relies heavily on automated functional correctness
tests and manual testing, but neither of these reliably catch minor UI
regressions. **Use pixel tests to automate testing your desktop browser UI.**

When writing a pixel test, avoid flakiness by: (1) disabling animation,
(2) using mock data, and (3) testing the minimum possible surface area.

Here is a sample image used to verify pixel correctness for the omnibox:

{% Img src="image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/WdIk74i8zUDGYrHX44FP.png", alt="Omnibox image used for pixel comparison.", width="745", height="28" %}

And the code to verify the browser matches this image:

```cpp
IN_PROC_BROWSER_TEST_F(SkiaGoldDemoPixelTest, TestOmnibox) {
  // Always disable animation for stability.
  ui::ScopedAnimationDurationScaleMode disable_animation(
      ui::ScopedAnimationDurationScaleMode::ZERO_DURATION);
  GURL url("chrome://bookmarks");
  AddTabAtIndex(0, url, ui::PageTransition::PAGE_TRANSITION_FIRST);
  auto* const browser_view = BrowserView::GetBrowserViewForBrowser(browser());
  // CompareScreenshot() takes a screenshot and compares it with the
  // golden image, which was previously human-approved, is stored
  // server-side, and is managed by Skia Gold. If any pixels differ, the
  // test will fail and output a link for the author to triage the
  // new image.
  bool ret = GetPixelDiff().CompareScreenshot("omnibox",
      browser_view->GetLocationBarView());
  EXPECT_TRUE(ret);
}
```

This code lives at [chrome/test/pixel/demo/skia_gold_demo_pixeltest.cc][1].
The relevant headers are `skia_gold_pixel_diff.h` for unit tests and
`browser_skia_gold_pixel_diff.h` for browser tests.

The pixel diff and approval process is powered by Skia Gold. **Skia Gold pixel
tests provide a visual approval workflow, and allow developers to accept
small flakes by approving multiple gold images.**

Currently the test suite is running on the Windows FYI bot. Browser tests
and Views unit tests are supported.

[1]: https://chromium.googlesource.com/chromium/src.git/+/refs/heads/master/chrome/test/pixel/demo/
