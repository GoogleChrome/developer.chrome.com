---
title: "The Chromium Chronicle #17: Browser Test Mixins"
description: >
  When writing a browser test, you often want to programmatically perform
  setup actions that the user could do manually. To help you do this, mixins
  are a suite of tools for performing non-trivial browser test setup in a
  reusable way.
layout: 'layouts/blog-post.njk'
date: 2021-01-26
hero: 'image/0g2WvpbGRGdVs0aAPc6ObG7gkud2/hgu6uTktp2ipmuODZZhP.jpg'
alt: >
  Chromium Chronicle image
tags:
  - chromium-chronicle
---

**Episode 17:** by Toby Huang in San Francisco, CA (January 2021)<br>
[Previous episodes](/tags/chromium-chronicle/)

Browser tests are a form of automated testing for chromium code that are more
end-to-end than unit tests. Browser tests create browser instances and test
various UI elements instead of just testing pure input/output functionality
like unit tests do. Integrated automated testing is important for simulating
the user's end-to-end experience. When writing a browser test, you often want
to programmatically perform setup actions that the user could do manually.
To help you do this, **mixins are a suite of tools for performing non-trivial
browser test setup in a reusable way.**

Examples of useful mixins:

* `GuestUserMixin` for testing incognito mode
* `UserPolicyMixin` for mocking user policy from the server
* `FakeGaiaMixin` for mocking responses from the Gaia server

**You can create your own custom mixins** to serve a wide variety of purposes!

The snippet below logs in as a guest user for your test. It is important to
**make sure your feature works in incognito mode.**

{% Compare 'better' %}

```cpp
class MyGuestBrowserTestClass : public MixinBasedInProcessBrowserTest {
 private:
  GuestSessionMixin guest_session_mixin_{&mixin_host_};
};
```

{% endCompare %}

`LoggedInUserMixin` is a convenient way to log in as a Family Link user for
your test. If your feature affects anything related to child supervision,
you should **test your feature for supervised users**. A possible bug is
forgetting that child users have incognito mode disabled or can't install
extensions without parent approval. `LoggedInUserMixin` is a compound mixin
composed of other mixins.

{% Compare 'better' %}

```cpp
class MyChildBrowserTestClass : public MixinBasedInProcessBrowserTest {
 protected:
  void SetUpOnMainThread() override {
    MixinBasedInProcessBrowserTest::SetUpOnMainThread();
    logged_in_user_mixin_.LogInUser();
  }

 private:
  LoggedInUserMixin logged_in_user_mixin_{&mixin_host_,
                                          LoggedInUserMixin::LogInType::kChild,
                                          embedded_test_server(), this};
};
```

{% endCompare %}

One of the primary benefits of mixins is **using composition instead of
inheritance, and avoiding problems with diamond multiple inheritance**.
Inheriting from more than one test base class leads to the diamond problem,
but you can mix and match mixins while avoiding this issue. Using mixins
doesn't entirely get rid of inheritance because the browser test class still
needs to inherit from `MixinBasedInProcessBrowserTest`, but fortunately that
base class is general-purpose and lightweight.

## Resources

* [User types in Chromium and ChromiumOS][user-types]

[user-types]: https://chromium.googlesource.com/chromium/src/+/HEAD/docs/login/user_types.md
