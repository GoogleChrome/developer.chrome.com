---
layout: "layouts/doc-post.njk"
title: Open a Custom Tab for links in a WebView 
seoTitle: How to open a Custom Tab for links in a WebView 
date: 2020-02-04
updated: 2023-05-03
description: Combine WebViews and Custom Tabs for a better user experience.
---

WebViews are great for seamlessly integrating your own web content into your app. When your first party content includes links to websites not owned by you, it can make sense to open these in a Custom Tab instead of the WebView. This has two benefits:

1. The first party UX is clearly separated from the 3P web content UX.
1. 3P web sites benefit from cookies being shared with the default browser.

To implement this, configure a custom `onLoadResource` handler in your `WebViewClient`:

```java
WebView webView = (WebView)findViewById(R.id.webview);
webView.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        return true;
    }

    @Override
    public void onLoadResource(WebView view, String url) {
        if (url.startsWith("http://www.my-own-domain.com")) {
            //Handle Internal Link...
        } else {
            //Open Link in a Custom Tab
            Uri uri = Uri.parse(url);
            new CustomTabsIntent.Builder()
                  .build()
                  .launchUrl(context, uri));                            
        }
    }
});
```
