---
api: i18n
---

You need to put all of its user-visible strings into a file named [`messages.json`][1]. Each time
you add a new locale, you add a messages file under a directory named `_locales/_localeCode_`, where
_localeCode_ is a code such as `en` for English.

Here's the file hierarchy for an internationalized extension that supports English (`en`), Spanish
(`es`), and Korean (`ko`):

![In the extension directory: manifest.json, *.html, *.js, _locales directory. In the _locales directory: en, es, and ko directories, each with a messages.json file.](i18n-hierarchy.gif)

## How to support multiple languages

Say you have an extension with the files shown in the following figure:

![A manifest.json file and a file with JavaScript. The .json file has "name": "Hello World". The JavaScript file has title = "Hello World";](i18n-before.gif)

To internationalize this extension, you name each user-visible string and put it into a messages
file. The extension's manifest, CSS files, and JavaScript code use each string's name to get its
localized version.

Here's what the extension looks like when it's internationalized (note that it still has only
English strings):

![In the manifest.json file, "Hello World" has been changed to "__MSG_extName__", and a new "default_locale" item has the value "en". In the JavaScript file, "Hello World" has been changed to chrome.i18n.getMessage("extName"). A new file named _locales/en/messages.json defines "extName".](i18n-after-1.gif)

{% Aside %}

**Important:** If an extension has a `_locales` directory, the [manifest][2] **must** define
"default_locale".

{% endAside %}

Some notes about internationalizing:

- You can use any of the [supported locales][3]. If you use an unsupported locale, Google Chrome
  ignores it.
- In `manifest.json` and CSS files, refer to a string named _messagename_ like this:

  ```json
  __MSG_messagename__
  ```

- In your extension or app's JavaScript code, refer to a string named _messagename_ like this:

  ```js
  chrome.i18n.getMessage("messagename")
  ```

- In each call to `getMessage()`, you can supply up to 9 strings to be included in the message. See
  [Examples: getMessage][4] for details.
- Some messages, such as `@@bidi_dir` and `@@ui_locale`, are provided by the internationalization
  system. See the [Predefined messages][5] section for a full list of predefined message names.
- In `messages.json`, each user-visible string has a name, a "message" item, and an optional
  "description" item. The name is a key such as "extName" or "search_string" that identifies the
  string. The "message" specifies the value of the string in this locale. The optional "description"
  provides help to translators, who might not be able to see how the string is used in your
  extension. For example:

  ```json
  {
    "search_string": {
      "message": "hello%20world",
      "description": "The string we search for. Put %20 between words that go together."
    },
    ...
  }
  ```

  For more information, see [Formats: Locale-Specific Messages][6].

Once an extension or app is internationalized, translating it is simple. You copy `messages.json`,
translate it, and put the copy into a new directory under `_locales`. For example, to support
Spanish, just put a translated copy of `messages.json` under `_locales/es`. The following figure
shows the previous extension with a new Spanish translation.

![This looks the same as the previous figure, but with a new file at _locales/es/messages.json that contains a Spanish translation of the messages.](i18n-after-2.gif)

## Predefined messages {: #overview-predefined }

The internationalization system provides a few predefined messages to help you localize. These
include `@@ui_locale`, so you can detect the current UI locale, and a few `@@bidi_...` messages that
let you detect the text direction. The latter messages have similar names to constants in the
[gadgets BIDI (bi-directional) API][7].

The special message `@@extension_id` can be used in the CSS and JavaScript files, whether or not the
extension or app is localized. This message doesn't work in manifest files.

The following table describes each predefined message.

<table><tbody><tr><th>Message name</th><th>Description</th></tr><tr><td><code>@@extension_id</code></td><td>The extension or app ID; you might use this string to construct URLs for resources inside the extension. Even unlocalized extensions can use this message.<br><b>Note:</b> You can't use this message in a manifest file.</td></tr><tr><td><code>@@ui_locale</code></td><td>The current locale; you might use this string to construct locale-specific URLs.</td></tr><tr><td><code>@@bidi_dir</code></td><td>The text direction for the current locale, either "ltr" for left-to-right languages such as English or "rtl" for right-to-left languages such as Japanese.</td></tr><tr><td><code>@@bidi_reversed_dir</code></td><td>If the <code>@@bidi_dir</code> is "ltr", then this is "rtl"; otherwise, it's "ltr".</td></tr><tr><td><code>@@bidi_start_edge</code></td><td>If the <code>@@bidi_dir</code> is "ltr", then this is "left"; otherwise, it's "right".</td></tr><tr><td><code>@@bidi_end_edge</code></td><td>If the <code>@@bidi_dir</code> is "ltr", then this is "right"; otherwise, it's "left".</td></tr></tbody></table>

Here's an example of using `@@extension_id` in a CSS file to construct a URL:

```css
body {
  background-image:url('chrome-extension://__MSG_@@extension_id__/background.png');
}
```

If the extension ID is abcdefghijklmnopqrstuvwxyzabcdef, then the bold line in the previous code
snippet becomes:

```css
  background-image:url('chrome-extension://abcdefghijklmnopqrstuvwxyzabcdef/background.png');
```

Here's an example of using `@@bidi_*` messages in a CSS file:

```css
body {
  direction: __MSG_@@bidi_dir__;
}

div#header {
  margin-bottom: 1.05em;
  overflow: hidden;
  padding-bottom: 1.5em;
  padding-__MSG_@@bidi_start_edge__: 0;
  padding-__MSG_@@bidi_end_edge__: 1.5em;
  position: relative;
}
```

For left-to-right languages such as English, the bold lines become:

```css
  dir: ltr;
  padding-left: 0;
  padding-right: 1.5em;
```

## Locales

You can choose from many locales, including some (such as `en`) that let a single translation
support multiple variations of a language (such as `en_GB` and `en_US`).

### Supported locales

You can use any of the [locales that the Chrome Web Store supports][8].

### Searching for messages

You don't have to define every string for every supported locale. As long as the default locale's
`messages.json` file has a value for every string, your extension or app will run no matter how
sparse a translation is. Here's how the extension system searches for a message:

1.  Search the messages file (if any) for the user's preferred locale. For example, when Google
    Chrome's locale is set to British English (`en_GB`), the system first looks for the message in
    `_locales/en_GB/messages.json`. If that file exists and the message is there, the system looks
    no further.
2.  If the user's preferred locale has a region (that is, the locale has an underscore: \_), search
    the locale without that region. For example, if the `en_GB` messages file doesn't exist or
    doesn't contain the message, the system looks in the `en` messages file. If that file exists and
    the message is there, the system looks no further.
3.  Search the messages file for the default locale. For example, if the extension's
    "default_locale" is set to "es", and neither `_locales/en_GB/messages.json` nor
    `_locales/en/messages.json` contains the message, the extension uses the message from
    `_locales/es/messages.json`.

In the following figure, the message named "colores" is in all three locales that the extension
supports, but "extName" is in only two of the locales. Wherever a user running Google Chrome in US
English sees the label "Colors", a user of British English sees "Colours". Both US English and
British English users see the extension name "Hello World". Because the default language is Spanish,
users running Google Chrome in any non-English language see the label "Colores" and the extension
name "Hola mundo".

![Four files: manifest.json and three messages.json files (for es, en, and en_GB).  The es and en files show entries for messages named "extName" and "colores"; the en_GB file has just one entry (for "colores").](i18n-strings.gif)

### How to set your browser's locale

To test translations, you might want to set your browser's locale. This section tells you how to set
the locale in [Windows][9], [Mac OS X][10], [Linux][11], and [Chrome OS][12].

#### Windows

You can change the locale using either a locale-specific shortcut or the Google Chrome UI. The
shortcut approach is quicker, once you've set it up, and it lets you use several languages at once.

##### Using a locale-specific shortcut

To create and use a shortcut that launches Google Chrome with a particular locale:

1.  Make a copy of the Google Chrome shortcut that's already on your desktop.
2.  Rename the new shortcut to match the new locale.
3.  Change the shortcut's properties so that the Target field specifies the `--lang` and
    `--user-data-dir` flags. The target should look something like this:

    ```text
    path_to_chrome.exe --lang=locale --user-data-dir=c:\locale_profile_dir
    ```

4.  Launch Google Chrome by double-clicking the shortcut.

For example, to create a shortcut that launches Google Chrome in Spanish (`es`), you might create a
shortcut named `chrome-es` that has the following target:

```text
path_to_chrome.exe --lang=es --user-data-dir=c:\chrome-profile-es
```

You can create as many shortcuts as you like, making it easy to test in multiple languages. For
example:

```text
path_to_chrome.exe --lang=en --user-data-dir=c:\chrome-profile-en
path_to_chrome.exe --lang=en_GB --user-data-dir=c:\chrome-profile-en_GB
path_to_chrome.exe --lang=ko --user-data-dir=c:\chrome-profile-ko
```

{% Aside %}

**Note:** Specifying `--user-data-dir` is optional but handy. Having one data directory per locale
lets you run the browser in several languages at the same time. A disadvantage is that because the
locales' data isn't shared, you have to install your extension multiple times—once per locale,
which can be challenging when you don't speak the language. For more information, see [Creating and
Using Profiles][13].

{% endAside %}

##### Using the UI

Here's how to change the locale using the UI on Google Chrome for Windows:

1.  App icon > **Options**
2.  Choose the **Under the Hood** tab
3.  Scroll down to **Web Content**
4.  Click **Change font and language settings**
5.  Choose the **Languages** tab
6.  Use the drop down to set the **Google Chrome language**
7.  Restart Chrome

#### Mac OS X

To change the locale on Mac, you use the system preferences.

1.  From the Apple menu, choose **System Preferences**
2.  Under the **Personal** section, choose **International**
3.  Choose your language and location
4.  Restart Chrome

#### Linux

To change the locale on Linux, first quit Google Chrome. Then, all in one line, set the LANGUAGE
environment variable and launch Google Chrome. For example:

```text
LANGUAGE=es ./chrome
```

#### Chrome OS

To change the locale on Chrome OS:

1.  From the system tray, choose **Settings**.
2.  Under the **Languages and input** section, choose the **Language** dropdown.
3.  If your language is not listed, click **Add languages** and add it.
4.  Once added, click the the 3-dot **More actions** menu item next to your language and choose
    **Display Chrome OS in this language**.
5.  Click the **Restart** button that appears next to the set language to restart Chrome OS.

## Examples

You can find simple examples of internationalization in the [examples/api/i18n][14] directory. For a
complete example, see [examples/extensions/news][15]. For other examples and for help in viewing the
source code, see [Samples][16].

### Examples: getMessage

The following code gets a localized message from the browser and displays it as a string. It
replaces two placeholders within the message with the strings "string1" and "string2".

```js
function getMessage() {
  var message = chrome.i18n.getMessage("click_here", ["string1", "string2"]);
  document.getElementById("languageSpan").innerHTML = message;
}
```

Here's how you'd supply and use a single string:

```js
  // In JavaScript code
  status.innerText = chrome.i18n.getMessage("error", errorDetails);
```

```json
"error": {
  "message": "Error: $details$",
  "description": "Generic error template. Expects error parameter to be passed in.",
  "placeholders": {
    "details": {
      "content": "$1",
      "example": "Failed to fetch RSS feed."
    }
  }
}
```

For more information about placeholders, see the [Locale-Specific Messages][17] page. For details on
calling `getMessage()`, see the [API reference][18].

### Example: getAcceptLanguages

The following code gets accept-languages from the browser and displays them as a string by
separating each accept-language with ','.

```js
function getAcceptLanguages() {
  chrome.i18n.getAcceptLanguages(function(languageList) {
    var languages = languageList.join(",");
    document.getElementById("languageSpan").innerHTML = languages;
  })
}
```

For details on calling `getAcceptLanguages()`, see the [API reference][19].

### Example: detectLanguage

The following code detects up to 3 languages from the given string and displays the result as
strings separated by new lines.

```js
function detectLanguage(inputText) {
  chrome.i18n.detectLanguage(inputText, function(result) {
    var outputLang = "Detected Language: ";
    var outputPercent = "Language Percentage: ";
    for(i = 0; i < result.languages.length; i++) {
      outputLang += result.languages[i].language + " ";
      outputPercent +=result.languages[i].percentage + " ";
    }
    document.getElementById("languageSpan").innerHTML = outputLang + "\n" + outputPercent + "\nReliable: " + result.isReliable;
  });
}
```

For more details on calling `detectLanguage(inputText)`, see the [API reference][20].

[1]: /docs/extensions/mv2/i18n-messages
[2]: /docs/extensions/mv2/tabs
[3]: #overview-locales
[4]: #examples-getMessage
[5]: #overview-predefined
[6]: /docs/extensions/mv2/i18n-messages
[7]: https://code.google.com/apis/gadgets/docs/i18n.html#BIDI
[8]: https://code.google.com/chrome/webstore/docs/i18n.html#localeTable
[9]: #testing-win
[10]: #testing-mac
[11]: #testing-linux
[12]: #testing-chromeos
[13]: https://www.chromium.org/developers/creating-and-using-profiles
[14]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/api/i18n/
[15]: https://github.com/GoogleChrome/chrome-extensions-samples/tree/master/mv2-archive/extensions/news/
[16]: /docs/extensions/mv2/samples
[17]: /docs/extensions/mv2/i18n-messages
[18]: #method-getMessage
[19]: #method-getAcceptLanguages
[20]: #method-detectLanguage
