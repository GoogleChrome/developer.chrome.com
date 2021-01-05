---
layout: "layouts/doc-post.njk"
title: Android Intents with Chrome
date: 2014-02-28
description: How to launch Android apps directly from a web page.
---

A little known feature in Android lets you launch apps directly from a web page via an [Android
Intent][1]. One scenario is launching an app when the user lands on a page, which you can achieve by
embedding an iframe in the page with a custom URI-scheme set as the `src`, as follows:
`<iframe src="paulsawesomeapp://page1"> </iframe>`. This works in the Chrome for Android browser,
version 18 and earlier. It also works in the Android browser, of course.

The functionality has changed slightly in Chrome for Android, versions 25 and later. It is no longer
possible to launch an Android app by setting an iframe's `src` attribute. For example, navigating an
iframe to a URI with a custom scheme such as `paulsawesomeapp://` will not work even if the user has
the appropriate app installed. Instead, you should implement a user gesture to launch the app via a
custom scheme, or use the "intent:" syntax described in this article.

## Syntax

The best practice is to construct an intent anchor and embed that into the page so the user can
launch the app. This gives you a lot more flexibility in controlling how apps are launched,
including the ability to pass extra information into the app via [Intent Extras][2].

The basic syntax for an intent-based URI is as follows:

```text
intent:  
   HOST/URI-path // Optional host  
   #Intent;  
      package=\[string\];  
      action=\[string\];  
      category=\[string\];  
      component=\[string\];  
      scheme=\[string\];  
   end;
```

See the [Android source][3] for parsing details.

Also, you may choose to specify fallback URL by adding the following string extra:

```text
S.browser_fallback_url=[encoded_full_url]
```

When an intent could not be resolved, or an external application could not be launched, then the
user will be redirected to the fallback URL if it was given.

Some example cases where Chrome does not launch an external application are as follows:

- The intent could not be resolved, i.e., no app can handle the intent.
- JavaScript timer tried to open an application without user gesture.

Note that `S.<name>` is a way to define string extras. `S.browser_fallback_url` was chosen for
backward compatibility, but the target app won't see browser_fallback_url value as Chrome removes
it.

## Examples

Here's an intent that launches the Zxing barcode scanner app. It follows the syntax thus:

```text
intent:  
   //scan/  
   #Intent;  
      package=com.google.zxing.client.android;  
      scheme=zxing;  
   end;
```

To launch the Zxing barcode scanner app, you encode your `href` on the anchor as follows:

```html
  <a href="intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;end"> Take a QR code </a>
```

See the [Android Zxing Manifest][4], which defines the package and the host.

Also, if fallback URL is specified, the full URL will look like this:

```html
   <a href="intent://scan/#Intent;scheme=zxing;package=com.google.zxing.client.android;S.browser_fallback_url=http%3A%2F%2Fzxing.org;end"> Take a QR code </a>

```

Now the URL will get you to zxing.org if the app could not be found, or the link was triggered from
JavaScript without user gesture (or for other cases where we don't launch an external application.)

## Considerations

If the activity you invoke via an intent contains [extras][5], you can include these as well.

Only activities that have the category filter, [android.intent.category.BROWSABLE][6] are able to be
invoked using this method as it indicates that the application is safe to open from the Browser.

## See also

- [Android Intents and Intent Filters][7]
- [Android Activities][8]

And Chrome doesn't launch an external app for a given Intent URI in the following cases.

- When the Intent URI is redirected from a typed in URL.
- When the Intent URI is initiated without user gesture.

[1]: http://developer.android.com/guide/components/intents-filters.html
[2]: http://developer.android.com/guide/components/intents-filters.html#extras
[3]:
  https://code.google.com/p/android-source-browsing/source/browse/core/java/android/content/Intent.java?repo=platform--frameworks--base#6514
[4]: https://code.google.com/p/zxing/source/browse/trunk/android/AndroidManifest.xml#97
[5]: http://developer.android.com/guide/components/intents-filters.html#extras
[6]: http://developer.android.com/reference/android/content/Intent.html#CATEGORY_BROWSABLE
[7]: http://developer.android.com/guide/components/intents-filters.html
[8]: http://developer.android.com/guide/components/activities.html
