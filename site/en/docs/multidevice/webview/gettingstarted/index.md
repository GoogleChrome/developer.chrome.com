---
layout: 'layouts/doc-post.njk'
title: "Getting Started: WebView-based Applications for Web Developers"
date: 2014-02-28
description: A tutorial on the basics of building WebView-based applications.
---

Getting started with the Android WebView is fairly simple, whether you want load a remote URL or
display pages stored in your app.

This tutorial walks you through creating a new Android Project, adding a WebView, loading a remote
URL, and then loading a local HTML page.

**Note:** This tutorial assumes you're a developer with limited or no experience with the Android
development environment, but have some experience with Java. If you're already familiar with
programming for Android, you may want to refer to to [Building Web Apps in WebView][1] on the
Android developer site instead.

## Install Android Studio

This tutorial uses [Android Studio][2], the new design-and-build IDE for Android. So you'll need
start off by installing Android Studio, as described here:

[http://developer.android.com/sdk/installing/studio.html][3]

## Create a New Android Project

When the installation completes, Android Studio launches and displays the welcome screen.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547040438.png",
       alt="The welcome screen.",
       width="1378",
       height="1021" %}

To create a new project:

1.  Click **New Project**.
2.  On the next page, enter your application name, package name and target SDKs, and click **Next**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547132601.png",
           alt="Creating a new project.",
           width="1378",
           height="1021" %}

    **Note:** If you only intend to support the Chromium WebView (rather than the old WebKit
    WebView) set **Minimum required SDK** to API 19: Android 4.4 (KitKat).

3.  On the next page, you're prompted to enter an application icon. (You can change the icon later,
    so don't worry if you don't have one right now.) When you're done, click **Next**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547168938.png",
           alt="Creating an application icon.",
           width="1378",
           height="1021" %}

4.  The next page lets you select the main Android activity for your application. For the purposes
    of this guide, select **Blank Activity** and click **Next**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547277493.png",
           alt="Selecting the main activity.",
           width="1378",
           height="1021" %}

    **Note:** An Android Activity can be viewed as a screen of an app. In this case, the
    application's main activity will hold the web view. If you're planning to venture further into
    native Android development, you can find more information in the [Android Activities API
    guide][4]

5.  The next page lets you change the names for the default Activity and layout. Click **Finish** to
    accept the defaults and create the project.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547305190.png",
           alt="The screen for changing the default activity name.",
           width="1378",
           height="1021" %}

    You now have a new Android project. Next, to add the WebView!

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547397240.png",
       alt="The new Android project.",
       width="1378",
       height="993" %}

**Note:** After you have your project created, make sure you have the KitKat SDK installed. Go to
**Tools** > **Android** > **SDK Manager** and make sure you have **Android 4.4 (API 19)** installed.

## Add the WebView

Android Studio will give you some boilerplate code to set up your application. Your project's
structure should look something like this:

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547451314.png",
       alt="A screenshot of the file hierarchy.",
       width="1378",
       height="2359" %}

A few of the more import folders are identified in the picture:

1.  `src/main/java`. Android Java source code.
2.  `src/main/res`. Resources used by the native application.
3.  `src/main/res/drawable-_type_`. Image resources used by the native application.
4.  `src/main/res/layout`. XML layout files that define the structure of UI components.
5.  `src/main/res/values`. Dimensions, strings, and other values that you might not want to
    hard-code in your application.
6.  `src/main/AndroidManifest.xml`. The manifest file defines what's included in the application:
    activities, permissions, themes, and so on.

You need to add a [WebView][5] to the main activity's layout.

1.  Open the `activity_main.xml` file in the `src/main/res/layout` directory if it is not already
    open. (You may also see a `fragment_main.xml` file. You can ignore this, as it's not required
    for this tutorial.)

    Select the **Text** tab at the bottom of the of the `activity_main.xml` editor to see the XML
    markup.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547496059.png",
           alt="The XML markup.",
           width="1378",
           height="442" %}

    This file defines the layout for your main activity, and the **Preview** panes show the a
    preview of the activity. The **Blank Activity** layout doesn't include any children. You'll need
    to add the WebView.

2.  In the XML pane, remove the self-closing slash from the end of the `FrameLayout` element, and
    add the <WebView> element and a new closing tag, as shown:

    ```xml
    <FrameLayout xmlns:android="http://schemas.android.com/apk/res/android"
         xmlns:tools="http://schemas.android.com/tools"
         android:id="@+id/container"
         android:layout_width="match_parent"
         android:layout_height="match_parent"
         tools:context=".MainActivity">
         tools:ignore="MergeRootFrame">

             <WebView
             android:id="@+id/activity_main_webview"
             android:layout_width="match_parent"
             android:layout_height="match_parent" />
    </FrameLayout>
    ```

3.  To use the WebView you need to reference it in the Activity. Open the Java source file for the
    main activity, `MainActivity.java` in the `src/main/java/<PackageName>` directory.

    Add the lines shown in bold.

    ```java
    public class MainActivity extends Activity {

        private WebView mWebView;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            mWebView = (WebView) findViewById(R.id.activity_main_webview);
    ```

    The existing code in the `onCreate` method does the work of hooking up the Activity with the
    layout. The added lines create a new member variable, `mWebView`, to refer to the web view.

    Remove the following code:

    ```java
    if (savedInstanceState == null) {
        getSupportFragmentManager().beginTransaction()
            .add(R.id.container, new PlaceholderFragment())
            .commit();
    }
    ```

    The WebView is identified by the resource ID, which is specified by this line in the layout
    file:

    ```java
    android:id="@+id/activity_main_webview"
    ```

    After adding the code, you'll see some warning messages in the margin of the editor. This is
    because you haven't imported the right classes for WebView. Luckily Android Studio can help you
    fill in the missing classes. The easiest way to do this is click and hover over an unknown class
    name and wait for a popup showing a "quick fix" -- in this case, adding an `import` statment for
    the `WebView` class.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547546460.png",
           alt="The quick fix popup.",
           width="1378",
           height="284" %}

    Press Alt + Enter (Option + Enter on Mac) to accept the quick fix.

    WebView in hand you can move on to setting it up and and loading some juicy web content.

## Enable JavaScript

WebViews don't allow JavaScript by default. To run a web application in the web view, you need to
explicitly enable JavaScript by adding the following lines to the `onCreate` method:

```java
// Enable Javascript
WebSettings webSettings = mWebView.getSettings();
webSettings.setJavaScriptEnabled(true);
```

## Load a Remote URL

If you're going to load data from a remote URL, your application needs [permission][6] to access the
internet. This permission needs to be added in the [application's manifest file][7].

1.  Open the `AndroidManifest.xml` file in the `src/res` directory. Add the line in bold before the
    closing </manifest> tag.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <manifest ...>
    ...
     
        </application>

        <uses-permission android:name="android.permission.INTERNET" />

    </manifest>
    ```

2.  The next step is to call the `loadUrl` method on the webview. Add the following line to the end
    of the `onCreate` method.

    `**mWebView.loadUrl("[http://beta.html5test.com/][8]");**`

    Now try running the project. If you don't have a device handy, you can create an emulator (AVD
    or Android Virtual Device) by going to **Tools** > **Android** > **AVD Manager**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547603429.jpg",
           alt="Loading a URL in the WebView.",
           width="1378",
           height="2626" %}

**Note:** To detect when a URL has started and finished loading, use
[`WebViewClient.onPageStarted`][9] and [`WebViewClient.onPageFinished`.][10]

### Handling Navigation

Now try changing the URL you're loading to `http://www.html5rocks.com/` and rerun your application.
You'll notice something strange.

If you run the application now with a site that has a redirect like `html5rocks.com`, your app ends
up opening the site in a browser on the device, not in your WebView -- probably not what you
expected. This is because of the way the WebView handles navigation events.

Here's the sequence of events:

1.  The WebView tries to load the original URL from the remote server, and gets a redirect to a new
    URL.
2.  The WebView checks if the system can handle a view intent for the URL, if so the system handles
    the URL navigation, otherwise the WebView will navigate internally (i.e. the user has no browser
    installed on their device).
3.  The system picks the user's preferred application for handling an `http://` URL scheme -- that
    is, the user's default browser. If you have more than one browser installed, you may see a
    dialog at this point.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547691304.png",
       alt="A browser selection dialog.",
       width="1378",
       height="952" %}

If you're using a WebView inside an Android application to display some simple web content (for
example, a help page), this may be exactly what you want to do. However, for more sophisticated
applications, you may want to handle the navigation links yourself.

To handle navigation inside the WebView you need to override the WebView's `WebViewClient`, which
handles various events generated by the WebView. You can use it to control how the WebView handles
link clicks and page redirects.

The default implementation of `WebViewClient` makes **any** URL open in the WebView:

```java
// Force links and redirects to open in the WebView instead of in a browser
mWebView.setWebViewClient(new WebViewClient());
```

This is a good step forward, but what if you want to handle links for your site only, while opening
other URLs in a browser?

To achieve this you need to extend the `WebViewClient` class and implement the
`shouldOverrideUrlLoading` method. This method is called whenever the WebView tries to navigate to a
different URL. If it returns false, the WebView opens the URL itself. (The default implementation
_always_ returns false, which is why it works in the previous example.)

Create a new class:

1.  Right-click the package name of your app and select **New** > **Java Class**

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604547739137.png",
           alt="Creating a new Java class.",
           width="1378",
           height="584" %}

2.  Enter `MyAppWebViewClient` as the class name and click **OK**
3.  In the new `MyAppWebViewClient.java` file, add the following code (changes shown in bold):

    ```java
    public class MyAppWebViewClient extends WebViewClient {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if(Uri.parse(url).getHost().endsWith("html5rocks.com")) {
                    return false;
                }
                 
                Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                view.getContext().startActivity(intent);
                return true;
            }
        }
    ```

    The new code defines `MyAppWebViewClient` as a subclass of `WebViewClient` and implements the
    `shouldOverrideUrlLoading` method.

    The `shouldOverrideUrlLoading` method is called whenever the WebView is about to load a URL.
    This implementation checks for the String "html5rocks.com" at the end of the host name of the
    URL. If the string exists, the method returns false, which tells the platform **not** to
    override the URL, but to load it in the WebView.

    For any other hostname, the method makes a request to the system to open the URL. It does this
    by creating a new Android [Intent][11] and using it to launch a new activity. Returning true at
    the end of the method prevents the URL from being loaded into the WebView.

4.  To use your new custom [WebViewClient][12], add the following lines to your `MainActivity`
    class:

    ```java
    // Stop local links and redirects from opening in browser instead of WebView
        mWebView.setWebViewClient(new MyAppWebViewClient());

    ```

    Now, a user can click any of the HTML5Rocks links and stay within the app, but links to external
    sites are opened in a browser.

### Handling the Android Back Button

As you start playing around and navigating the awesome HTML5Rocks articles, hitting the back button
on Android exits the application, even though you've explored a few pages of the site.

WebView has a method `canGoBack` which tells you if there is anything on the page stack that can be
popped. All you need to do is detect a back button press and determine if you should step back
through the WebView's history or allow the platform to determine the correct behaviour. Inside your
MainActivity class, add the following method (in bold):

```java
public class MainActivity extends Activity {

 private WebView mWebView;

 @Override
 protected void onCreate(Bundle savedInstanceState) {
     ...
 }

    @Override
    public void onBackPressed() {
        if(mWebView.canGoBack()) {
            mWebView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
       ...
    }

}
```

## Loading HTML files from the file system

A big advantage of using a WebView inside an installable application is that you can store assets
inside the app. This lets your app work offline and improves load times, since the WebView can
retrieve assets directly from the local file system.

To store files such as HTML, JavaScript, and CSS locally, put them in the assets directory. This is
a reserved directory that Android uses for raw files that your app may need access to (i.e. files it
knows it should minimise or compress).

In your project, create the `assets` directory in main (`src/main/assets`).

Generally it's good practice to keep your web files in a subdirectory, so create a www directory and
put all your web content in it.

**Note:** Absolute paths do not work in the WebView when referring to other files, such as CSS and
JavaScript. So make sure you make all references relative, instead of absolute (for example, instead
of "/pages/somelink.html", use "./pages/somelink.html").

Once you have everything in your assets directory, it's as simple as loading in the appropriate
file:

```java
mWebView.loadUrl("file:///android_asset/www/index.html");
```

You'll want to tweak the `shouldOverrideUrlLoading` method so it opens a browser for non-local
pages:

```java
public class MyAppWebViewClient extends WebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if(Uri.parse(url).getHost().length() == 0) {
            return false;
        }

        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        view.getContext().startActivity(intent);
        return true;
    }

}
```

Now you are set to build a great WebView app!

For tips on getting the visuals just right, see [Pixel-Perfect UI in the WebView][13].

If you run into trouble, the Chrome DevTools are your friends. See [Remote Debugging on Android][14]
to get started.

[1]: http://developer.android.com/guide/webapps/webview.html
[2]: http://developer.android.com/sdk/installing/studio.html
[3]: http://developer.android.com/sdk/installing/studio.html
[4]: http://developer.android.com/guide/components/activities.html
[5]: http://developer.android.com/reference/android/webkit/WebView.html
[6]: http://developer.android.com/guide/topics/security/permissions.html
[7]: http://developer.android.com/guide/topics/manifest/manifest-intro.html
[8]: http://beta.html5test.com/
[9]:
  http://developer.android.com/reference/android/webkit/WebViewClient.html#onPageStarted(android.webkit.WebView,%20java.lang.String,%20android.graphics.Bitmap)
[10]:
  http://developer.android.com/reference/android/webkit/WebViewClient.html#onPageFinished(android.webkit.WebView,%20java.lang.String)
[11]: http://developer.android.com/reference/android/content/Intent.html
[12]: http://developer.android.com/reference/android/webkit/WebViewClient.html
[13]: /docs/multidevice/webview/pixelperfect/
[14]: /devtools/docs/remote-debugging
