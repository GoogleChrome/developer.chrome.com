---
layout: 'layouts/doc-post.njk'
title: "Tutorial: Licensing API"
date: 2017-08-30
description: >
  How to create an app that uses the Chrome Web Store Licensing API.
---

This tutorial walks you through creating an app that uses the Chrome Web Store Licensing API. You
have many choices when implementing an app for the Chrome Web Store, but this tutorial features a
common use case: a hosted app that's implemented in Java, with the help of Google App Engine and the
Eclipse IDE.

You should be able to follow this tutorial even if you've never used Java, Google App Engine, or
Eclipse. You'll get more out of this tutorial if you read the [Overview][1] first.

{% Aside %}
You only need to use the Licensing API if you use Chrome Web Store Payments. For
information on other payment options, see [Charging for your app][2] in the Overview.
{% endAside %}

## Step 1: Get ready

Before you start, make sure you're using the Dev channel version of Google Chrome, and learn how to
find the Chrome Developer Dashboard.

1.  Subscribe to the Dev channel by following the instructions in [Early Access Release
    Channels][3].
2.  Find the Chrome Developer Dashboard. Until the Chrome Web Store is public, you can get to the
    dashboard from the Extensions Gallery.

    1.  Go to the extensions management page, either by entering **chrome://extensions** in the
        address bar or by choosing the **Tools > Extensions** menu item from the wrench menu. (On
        the Mac, go to the **Window** menu and choose **Tools**.)
    2.  Go to the Extensions Gallery by clicking the **Get more extensions** or **browse the
        gallery** link on the extensions management page.
    3.  On the left side, look for the **Publish your extensions** link. At the bottom of the page,
        look for the **Developer Dashboard** link. Clicking either one takes you to the dashboard.

## Step 2: Upload app info to the dashboard

Before you can write code that uses the Licensing API, you need to upload your app with the Chrome
Developer Dashboard. In this step, you'll create and upload a ZIP file containing the first draft of
a manifest for your app.

1.  Create a directory to contain your app's manifest and, eventually, icons.
2.  In this directory, create a file named `manifest.json` and copy the following code into it:

    ```json
    {
      "name": "Hello License!",
      "description": "Try this awesome app",
      "version": "0.0.0.1",
      "app": {
        "urls": [
          "*://example.com/"
        ],
        "launch": {
          "web_url": "http://example.com/mine/"
        }
      }
    }
    ```

    {% Aside %}
    This manifest uses dummy data because you can always change it later. The important
    thing, for now, is to have correct formatting. For information about what the manifest for a
    hosted app should really contain, see [Hosted Apps][5].
    {% endAside %}

3.  Create a ZIP archive of the directory that contains `manifest.json`.
4.  Upload the ZIP file to the Chrome Developer Dashboard.

    1.  Go to the Chrome Developer Dashboard and sign in.
    2.  Click the **Add new item** button.  
        If you've never uploaded an item before, you need to accept the developer agreement before
        going on.
    3.  Click **Choose file**, navigate to your ZIP file, and click **Upload**.

    Within seconds you should see an edit page for your app. At the top, you'll see a warning that
    you must verify ownership for example.com. Ignore it. You can update the manifest and verify
    ownership of your site later.

5.  At the bottom of the edit page, click **Save draft and return to dashboard**. You'll return to
    the Chrome Developer Dashboard, which lists installable web apps, extensions, and themes that
    you've uploaded.
6.  Go back to the edit page by clicking the **Edit** link for your app.
7.  Get the app ID by inspecting the page's URL.  
    The URL in the browser's address bar should look something like this:

    ```text
    https://chrome.google.com/extensions/developer/edit/abcdefghijklmnopqrstuvwxyzabcdef
    ```

    That long string of gibberish—abcdefghijklmnopqrstuvwxyzabcdef, in this example—is your app's
    ID. Save it, so you can use it in your code.

## Step 3: Get the OAuth token

In this step, you get the OAuth access token and access token secret that allow you to use the
Licensing API. To get these, you first need to tell the store that your app will use Chrome Web
Store Payments.

1.  In the edit page for your app, click the **Change pricing** button.
2.  Choose **This application uses Chrome Web Store Payments**, and save.
3.  Return to the Chrome Developer Dashboard, and click the **OAuth setup** link for your app.

    {% Aside %}
    The OAuth setup link appears _only_ if you've set the pricing of your app to use
    Chrome Web Store Payments.
    {% endAside %}

    A page comes up with information about the Licensing API and its use of OAuth.

4.  Click the **Generate new token** button at the bottom of the OAuth page.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/WAH6o7pV8RwTgYb1NDrN.png",
           alt="A screenshot showing the bottom of the OAuth page before generating the new token",
           height="66", width="456" %}

5.  Save the values that appear next to **oauth_token_secret** and **oauth_token**.

    {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/ShWIu4C7l4ZTcu1P2Fgy.png", 
           alt="A screenshot showing the generated token and secret at bottom of the OAuth page",
           height="58", width="456" %}

{% Aside 'caution' %}
Keep your access token and token secret safe and private. (The screenshot shows
sample values that won't work.) If you lose the token or secret, you'll need to generate them again.
{% endAside %}

## Step 4: Set up your development environment

Now that you have the IDs and tokens you need, it's time to code. But first, you need to set up your
development environment.

{% Aside %}
This tutorial uses Google App Engine, but you can use whatever technologies you like when
you create your own apps.
{% endAside %}

1.  Sign into [Google App Engine][8], and create an application with the following information:

    - Identifier: Any unique identifier that makes sense to you. This identifier is used in the
      default app location; for example, choosing "hellolicense" results in a default app location
      of [http://hellolicense.appspot.com][9]
    - Title: Hello License!
    - Authentication Options: Click the **Edit** link, and choose **Open to all users with an OpenID
      Provider**.

    Note: If you've never used Google App Engine before, it will make you verify your account before
    you create an application.

2.  Install the [Google App Engine SDK for Java][10].
3.  Install the [Eclipse IDE for Java Developers][11].
4.  Install the [Google Plugin for Eclipse][12].

For details see the [Google App Engine documentation][13], in particular [Getting Started:
Java][14].

## Step 5: Create your app

In this step, you'll write your web app's code, using the Eclipse IDE as your development
environment.

1.  In Eclipse, create a new web app project: **File > New > Web Application Project**. Name your
    project **HelloLicense**, set the package name to **com.example**, and uncheck the Google Web
    Toolkit option. Then click **Finish**.
2.  Get the following two JAR files, which are required by [OAuth Signpost][16], the OAuth library
    that this example uses to sign requests to the license server.

    * `signpost-core-1.2.1.1.jar`: Download this file from
      [http://code.google.com/p/oauth-signpost/downloads/list][17].

    * `commons-codec-1.4.jar`: Download `commons-codec-1.4-bin.tar.gz` or `commons-codec-1.4-bin.zip` from
      [http://commons.apache.org/codec/download_codec.cgi][18], extract the files, and get
      `commons-codec-1.4.jar` from the top directory.

    Put these two JAR files in your Eclipse project's `war/WEB-INF/lib` directory.

3.  Now tell Eclipse about those JAR files.

    1.  In Eclipse, refresh the display of your project. You can do this by opening a context menu
        in your project (such as by right-clicking your project's name in the Package Explorer) and
        choosing **Refresh**.
    2.  Get to the Properties panel for your app. You can do this by opening a context menu again
        and choosing **Properties**.
    3.  Go to the **Java Build Path** property list, choose the **Libraries** tab, and then click
        **Add JARs**.
    4.  Navigate to the directory you just put the JAR files in, select the JAR files, and click
        **OK**.

4.  Copy the sample code to your main servlet.

    1.  In the Project Explorer, go to **HelloLicense > src > com.example**, and double-click
        **HelloLicenseServlet.java**.
    2.  Replace the contents of **HelloLicenseServlet.java** with the contents of [this file][19].

    The code you paste in uses the Licensing API to check whether the user has access to this app.
    For code snippets and instructions on using the Licensing API, see [Checking for Payment][20].

5.  In the code you just pasted in, fill in the APP_ID, TOKEN, and TOKEN_SECRET constants with the
    values you got in Steps 2 and 3. These constants are necessary for using the Licensing API. For
    example:

    ```java
    public static final String APP_ID = "abcdefghijklmnopqrstuvwxyzabcdef";
    private static final String TOKEN = "1/knWSSAiX_-4o8abb-uSFk2_DaSrnpx9Y2udck-OuA7A";
    private static final String TOKEN_SECRET = "t8KgYCxRv+0jNVY7DdrBQvto";
    ```

6.  Take a look at the code in **HelloLicenseServlet.java**:

    - The following lines get the OpenID URL for the user's Google Account, as described in
      [Identifying the User][21]. If you don't use Google App Engine, then instead of using
      UserService, you need to use an OpenID library and the Google OpenID endpoint.

      ```java
      UserService userService = UserServiceFactory.getUserService();
      ...
      if (userService.isUserLoggedIn()) {
        User user = userService.getCurrentUser();
        /* user.getFederatedIdentity() is the OpenID URL. */
      }
      ```

    - The following code creates, signs, and sends a request to the license server, using the [OAuth
      Signpost library][22] and the standard [URLConnection][23] class. The Licensing API URI in the
      request has the form https://www.googleapis.com/chromewebstore/v1/licenses/_appId_/_userId_.
      To sign the request, the OAuth library needs the app's access token and token secret, as well
      as the consumer key and secret (both "anonymous").

      ```java
      public static final String SERVER_URL =
          "https://www.googleapis.com/chromewebstore/v1/licenses/%s/%s";
      public static final String CONSUMER_KEY = "anonymous";
      public static final String CONSUMER_SECRET = CONSUMER_KEY;
      ...
      OAuthConsumer oauth = new DefaultOAuthConsumer(CONSUMER_KEY, CONSUMER_SECRET);
      oauth.setTokenWithSecret(TOKEN, TOKEN_SECRET);
      URLConnection http =
          new URL(
            String.format(
              SERVER_URL,
              APP_ID,
              URLEncoder.encode(user.getFederatedIdentity(), "UTF-8")
            )
          ).openConnection();
      oauth.sign(http);
      http.connect();
      ```

    - The response from the license server is in JSON format, by default. The following code uses
      the `JSONObject.get` method to parse the response to figure out whether the user should have
      access to the app. If the "result" field value is "YES", then the user has either full or free
      trial access, depending on the value of the "accessLevel" field.

      ```java
      JSONObject json = new JSONObject(file);
      output.printf(
        "Hello %s license!",
        "YES".equals(json.get("result")) ?
            "FULL".equals(json.get("accessLevel")) ? "full" : "free trial" :
            "no"
      );
      ```

      {% Aside %}
      Until users can buy apps, the value of the "result" field will always be "NO" unless
      you use a [special test user ID][24].
      {% endAside %}

For more information about using the Licensing API, see [Checking for Payment][25].

## Step 6: Test and deploy your app

In this step, you'll make sure your app works, and you'll deploy it to the web.

1.  Still in Eclipse, choose **Run > Run As > Web Application**.  
    If it doesn't run, make sure you followed these instructions exactly, and try again. If it does
    run, you'll see the server location in the Eclipse Console.
2.  In a browser, visit the server location (for example, http://localhost:8888/) and click the link
    to **HelloLicense**.  
    You should see a simple page with a **Sign in** link.
3.  Sign in as text@example.com.  
    If you get an error page, then make sure you entered the app ID, OAuth access token, and access
    token secret correctly.

    {% Aside %}
    Currently, there's no way to pay, so you'll always be told that the user doesn't have
    access. However, in this developer release, you can modify the user ID that you supply so that
    you get a different answer. For details, see [Special user IDs for testing][27].
    {% endAside %}

4.  Once you successfully run your app locally, deploy it:

    1.  Click the App Engine deploy button on the toolbar:
        {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GgDrbzu3jMJ4Pa8Rv7D3.png", alt="The deply button", height="22", width="22" %}
        A Deploy dialog comes up.
    2.  Set the identifier to be used for Google App Engine. This is different from the Google
        Chrome app ID; it's the string you chose in [Step 4][28]. To set it, click the **App Engine
        project settings** link in the Deploy dialog, and then set the **Application ID** field to
        the string from Step 4—for example, "hellolicense".
    3.  Click the **Deploy** button.  
        The Eclipse Console displays the status of the upload.

5.  When your app is deployed, visit its new location under http://_identifier_.appspot.com. For an
    example, the app with the identifier "hellolicense" is at
    [http://hellolicense.appspot.com/hellolicense][29].

## Step 7: Install your app into Google Chrome

Once your website is up and running, you can update the manifest and test installing the app in
Google Chrome. This section won't lead you through that process in detail, but here's a manifest for
the Hello License app that's served at http://hellolicense.appspot.com/hellolicense:

```json
{
  "name": "Hello License!",
  "description": "Try this awesome app",
  "version": "0.0.0.2",
  "app": {
    "urls": [
      "*://hellolicense.appspot.com/"
    ],
    "launch": {
      "web_url": "http://hellolicense.appspot.com/hellolicense"
    }
  },
  "icons": {
    "24": "icon_24.png",
    "128": "icon_128.png"
  }
}
```

Note that you need to add icons to the manifest and ZIP file, so that your app can be installed.
Once you install this app, the large icon appears in the New Tab page. Clicking the icon takes you
to http://hellolicense.appspot.com/hellolicense.

For details on manifest contents and on installing an app that isn't yet packaged in a `.crx` file,
see [Hosted Apps][31].

## Step 8: Finish your app's listing

Use the edit page to add all the store listing information that isn't in the ZIP file, such as a
long description, screenshots, videos, and links to related sites. You can preview what users will
see for your app by clicking the **Preview changes** button at the bottom of the edit page.

For details on finishing and publishing an app, see [Publishing Your App][33].

## What next?

Here are some choices for where to go next:

* [Overview][35]: Get the conceptual background you need to use the Chrome Web Store well.
* [Checking for Payment][36]: Learn how to use the Licensing API to check whether the user has paid for your app.
* [Samples][37]: Find samples in multiple languages of hosted apps that use the Licensing API.

If you just want to write your app, see the developer doc for the type of app you're interested in:

- [Installable Web Apps][38]
- [Themes][39]
- [Extensions][40]

[1]: /docs/webstore/
[2]: /docs/webstore/#charging
[3]: http://www.chromium.org/getting-involved/dev-channel
[5]: https://developers.google.com/chrome/apps/docs/developers_guide
[8]: https://appengine.google.com/
[9]: http://hellolicense.appspot.com
[10]: https://developers.google.com/appengine/downloads#Google_App_Engine_SDK_for_Java
[11]: http://www.eclipse.org/downloads/
[12]: https://developers.google.com/eclipse/docs/download
[13]: https://developers.google.com/appengine/docs/
[14]: https://developers.google.com/appengine/docs/java/gettingstarted/
[16]: http://code.google.com/p/oauth-signpost/
[17]: http://code.google.com/p/oauth-signpost/downloads/list
[18]: http://commons.apache.org/codec/download_codec.cgi
[19]:
  http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/apps/hello-java/HelloLicenseServlet.java
[20]: /docs/webstore/check_for_payment
[21]: /docs/webstore/identify_user
[22]: http://code.google.com/p/oauth-signpost/
[23]: http://download-llnw.oracle.com/javase/6/docs/api/java/net/URLConnection.html
[24]: /docs/webstore/check_for_payment#testids-user
[25]: /docs/webstore/check_for_payment
[27]: /docs/webstore/check_for_payment#testids-user
[28]: #prepare
[29]: http://hellolicense.appspot.com/hellolicense
[31]: https://developers.google.com/chrome/apps/docs/developers_guide
[33]: /docs/webstore/publish
[35]: /docs/webstore/
[36]: /docs/webstore/check_for_payment
[37]: /docs/webstore/samples
[38]: https://developers.google.com/chrome/apps/
[39]: http://code.google.com/chrome/extensions/themes.html
[40]: http://code.google.com/chrome/extensions/index.html
