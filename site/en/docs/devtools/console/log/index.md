---
layout: "layouts/doc-post.njk"
title: "Log messages in the Console"
authors:
  - kaycebasques
date: 2019-04-19
#updated: YYYY-MM-DD
description: "Learn how to log messages to the Console."
---

This interactive tutorial shows you how to log and filter messages in the [Chrome DevTools][1]
Console.

{% Img src="image/admin/aF8rn6sy0FguTyfh8LXU.png", alt="Messages in the Console.", width="800", height="536" %}

**Figure 1**. Messages in the Console.

This tutorial is intended to be completed in order. It assumes that you understand the fundamentals
of web development, such as how to use JavaScript to add interactivity to a page.

## Set up the demo and DevTools {: #setup }

This tutorial is designed so that you can open up the demo and try all the workflows yourself. When
you physically follow along, you're more likely to remember the workflows later.

1.  Open the [demo][2].
2.  Optional: Move the demo to a separate window.

    {% Img src="image/admin/Up8If5tGO9V1yQ45uKBI.png", alt="This tutorial on the left, and the demo on the right.", width="800", height="482" %}

    **Figure 2**. This tutorial on the left, and the demo on the right.

3.  Focus the demo and then press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> or
    <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) to open DevTools. By default DevTools opens to the
    right of the demo.

    {% Img src="image/admin/DMOW45O6ocuz4p6MyOGd.png", alt="DevTools opens to the right of the demo.", width="800", height="482" %}

    **Figure 3**. DevTools opens to the right of the demo.

4.  Optional: [Dock DevTools to the bottom of the window or undock it into a separate window][3].

    {% Img src="image/admin/fhMeiN5WiQzVTS674o6X.png", alt="DevTools docked to the bottom of the demo.", width="800", height="482" %}

    **Figure 4**. DevTools docked to the bottom of the demo.

    {% Img src="image/admin/ZAHbFZR2Ao4BNl82sNzx.png", alt="DevTools undocked in a separate window.", width="800", height="482" %}

    **Figure 5**. DevTools undocked in a separate window.

## View messages logged from JavaScript {: #javascript }

Most messages that you see in the Console come from the web developers who wrote the page's
JavaScript. The goal of this section is to introduce you to the different message types that you're
likely to see in the Console, and explain how you can log each message type yourself from your own
JavaScript.

1.  Click the **Log Info** button in the demo. `Hello, Console!` gets logged to the Console.

    {% Img src="image/admin/lSamfDnGqrNC6rau3zvT.png", alt="The Console after clicking Log Info.", width="800", height="503" %}

    **Figure 6**. The Console after clicking **Log Info**.

2.  Next to the `Hello, Console!` message in the Console click **log.js:2**. The Sources panel opens
    and highlights the line of code that caused the message to get logged to the Console. The
    message was logged when the page's JavaScript called `console.log('Hello, Console!')`.

    {% Img src="image/admin/VjLF6UMfP0uWeDahvUVo.png", alt="DevTools opens the Sources panel after you click log.js:2.", width="800", height="503" %}

    **Figure 7**. DevTools opens the Sources panel after you click **log.js:2**.

3.  Navigate back to the Console using any of the following workflows:

    - Click the **Console** tab.
    - Press <kbd>Control</kbd>+<kbd>[</kbd> or <kbd>Command</kbd>+<kbd>[</kbd> (Mac) until the
      Console panel is in focus.
    - [Open the Command Menu][4], start typing `Console`, select the **Show Console Panel** command,
      and then press <kbd>Enter</kbd>.

4.  Click the **Log Warning** button in the demo. `Abandon Hope All Ye Who Enter` gets logged to the
    Console. Messages formatted like this are warnings.

    {% Img src="image/admin/77aEDWR3djItzJLVcq9f.png", alt="The Console after clicking Log Warning.", width="800", height="503" %}

    **Figure 8**. The Console after clicking **Log Warning**.

5.  Optional: Click **log.js:12** to view the code that caused the message to get formatted like
    this, and then navigate back to Console when you're finished. Do this whenever you want to see
    the code that caused a message to get logged a certain way.
6.  Click the **Expand** {% Img src="image/admin/kNA03JXX9dff86Eftn9Z.png", alt="Expand", width="14", height="16" %} icon in
    front of `Abandon Hope All Ye Who Enter`. DevTools shows the [stack trace][5] leading up to the
    call.

    {% Img src="image/admin/WTobwoP7z9Iv09On34Io.png", alt="A stack trace.", width="800", height="503" %}

    **Figure 9**. A stack trace.

    The stack trace is telling you that a function named `logWarning` was called, which in turn
    called a function named `quoteDante`. In other words, the call that happened first is at the
    bottom of the stack trace. You can log stack traces at any time by calling `console.trace()`.

7.  Click **Log Error**. The following error message gets logged:
    `I'm sorry, Dave. I'm afraid I can't do that.`

    {% Img src="image/admin/mfrXFockwLgV5Bnm6xDM.png", alt="An error message.", width="800", height="532" %}

    **Figure 10**. An error message.

8.  Click **Log Table**. A table about famous artists gets logged to the Console. Note how the
    `birthday` column is only populated for one row. Check the code to figure out why that is.

    {% Img src="image/admin/2xQw31zpHKiachWLsYSi.png", alt="A table in the Console.", width="800", height="490" %}

    **Figure 11**. A table in the Console.

9.  Click **Log Group**. The names of 4 famous, crime-fighting turtles are grouped under the
    `Adolescent Irradiated Espionage Tortoises` label.

    {% Img src="image/admin/p6Qo0HrDhdObOJGgoEOA.png", alt="A group of messages in the Console.", width="800", height="490" %}

    **Figure 12**. A group of messages in the Console.

10. Click **Log Custom**. A message with a red border and blue background gets logged to the
    Console.

    {% Img src="image/admin/azaXNJ5WC6rN1NVFAN3m.png", alt="A message with custom formatting in the Console.", width="800", height="490" %}

    **Figure 13**. A message with custom formatting in the Console.

The main idea here is that when you want to log messages to the Console from your JavaScript, you
use one of the `console` methods. Each method formats messages differently.

There are even more methods than what has been demonstrated in this section. At the end of the
tutorial you'll learn how to explore the rest of the methods.

## View messages logged by the browser {: #browser }

The browser logs messages to the Console, too. This usually happens when there's a problem with the
page.

1.  Click **Cause 404**. The browser logs a `404` network error because the page's JavaScript tried
    to fetch a file that doesn't exist.

    {% Img src="image/admin/EypVyz8F9a1eNlEkjvro.png", alt="A 404 error in the Console.", width="800", height="518" %}

    **Figure 14**. A 404 error in the Console.

2.  Click **Cause Error**. The browser logs an uncaught `TypeError` because the JavaScript is trying
    to update a DOM node that doesn't exist.

    {% Img src="image/admin/lMl9U6EJBQDLBVYKbxX9.png", alt="A TypeError in the Console.", width="800", height="518" %}

    **Figure 15**. A TypeError in the Console.

3.  Click the **Log Levels** dropdown and enable the **Verbose** option if it's disabled. You'll
    learn more about filtering in the next section. You need to do this to make sure that the next
    message you log is visible. **Note:** If the Default Levels dropdown is disabled, you may need
    to close the Console Sidebar. Filter by Message Source below for more information about the
    Console Sidebar.

    {% Img src="image/admin/YZ9nzR7Gm4xJWkcJM2Jt.png", alt="Enabling the Verbose log level.", width="800", height="518" %}

    **Figure 16**. Enabling the **Verbose** log level.

4.  Click **Cause Violation**. The page becomes unresponsive for a few seconds and then the browser
    logs the message `[Violation] 'click' handler took 3000ms` to the Console. The exact duration
    may vary.

    {% Img src="image/admin/9mzXfbfY3s7aFzfUWG4H.png", alt="A violation in the Console.", width="800", height="518" %}

    **Figure 17**. A violation in the Console.

## Filter messages {: #filter }

On some pages you'll see the Console get flooded with messages. DevTools provides many different
ways to filter out messages that aren't relevant to the task at hand.

### Filter by log level {: #level }

Each `console` method is assigned a severity level: `Verbose`, `Info`, `Warning`, or `Error`. For
example, `console.log()` is an `Info`\-level message, whereas `console.error()` is an `Error`\-level
message.

1.  Click the **Log Levels** dropdown and disable **Errors**. A level is disabled when there is no
    longer a checkmark next to it. The `Error`\-level messages disappear.

    {% Img src="image/admin/t1U5iAP8oKCS0nlwaOZy.png", alt="Disabling Error-level messages in the Console.", width="800", height="518" %}

    **Figure 18**. Disabling `Error`\-level messages in the Console.

2.  Click the **Log Levels** dropdown again and re-enable **Errors**. The `Error`\-level messages
    reappear.

### Filter by text {: #text }

When you want to only view messages that include an exact string, type that string into the
**Filter** text box.

1.  Type `Dave` into the **Filter** text box. All messages that do not include the string `Dave` are
    hidden. You might also see the `Adolescent Irradiated Espionage Tortoises` label. That's a bug.

    {% Img src="image/admin/8LQhiX8sS9tLJbMZZOWi.png", alt="Filtering out any message that does not include `Dave`.", width="800", height="518" %}

    **Figure 19**. Filtering out any message that does not include `Dave`.

2.  Delete `Dave` from the **Filter** text box. All the messages reappear.

### Filter by regular expression {: #regex }

When you want to show all messages that include a pattern of text, rather than a specific string,
use a [regular expression][6].

1.  Type `/^[AH]/` into the **Filter** text box. Type this pattern into [RegExr][7] for an
    explanation of what it's doing.

    {% Img src="image/admin/3xsXUFoTlcJSrLzJ97GR.png", alt="Filtering out any message that does not match the pattern `/^[AH]/`.", width="800", height="518" %}

    **Figure 20**. Filtering out any message that does not match the pattern `/^[AH]/`.

2.  Delete `/^[AH]/` from the **Filter** text box. All messages are visible again.

### Filter by message source {: #source }

When you want to only view the messages that came from a certain URL, use the **Sidebar**.

1.  Click **Show Console Sidebar**
    {% Img src="image/admin/WCuENTqHgjAR2Be3Hdqq.png", alt="Show Console Sidebar", width="30", height="26" %}.

    {% Img src="image/admin/llVewt58uHx4kJzlAlH5.png", alt="The Sidebar.", width="800", height="471" %}

    **Figure 21**. The Sidebar.

2.  Click the **Expand** {% Img src="image/admin/kNA03JXX9dff86Eftn9Z.png", alt="Expand", width="14", height="16" %} icon next to
    **12 Messages**. The **Sidebar** shows a list of URLs that caused messages to be logged. For
    example, `log.js` caused 11 messages.

    {% Img src="image/admin/tfiHp74glhbCmiTfxEhw.png", alt="Viewing the source of messages in the Sidebar.", width="800", height="471" %}

    **Figure 22**. Viewing the source of messages in the Sidebar.

### Filter by user messages {: #user }

Earlier, when you clicked **Log Info**, a script called `console.log('Hello, Console!')` in order to
log the message to the Console. Messages logged from JavaScript like this are called _user
messages_. In contrast, when you clicked **Cause 404**, the browser logged an `Error`\-level message
stating that the requested resource could not be found. Messages like that are considered _browser
messages_. You can use the **Sidebar** to filter out browser messages and only show user messages.

1.  Click **9 User Messages**. The browser messages are hidden.

    {% Img src="image/admin/mQcoTFv0mA1bhDnLx8lz.png", alt="Filtering out browser messages.", width="800", height="471" %}

    **Figure 23**. Filtering out browser messages.

2.  Click **12 Messages** to show all messages again.

## Use the Console alongside any other panel {: #drawer }

What if you're editing styles, but you need to quickly check the Console log for something? Use the
Drawer.

1.  Click the **Elements** tab.
2.  Press <kbd>Escape</kbd>. The Console tab of the **Drawer** opens. It has all of the features of
    the Console panel that you've been using throughout this tutorial.

    {% Img src="image/admin/99RTlD6HWxthbGdiHtrw.png", alt="The Console tab in the Drawer.", width="800", height="602" %}

    **Figure 24**. The Console tab in the Drawer.

## Next steps {: #next }

Congratulations, you have completed the tutorial. Click **Dispense Trophy** to receive your trophy.

- See [Console Reference][8] to explore more features and workflows related to the Console UI.
- See [Console API Reference][9] to learn more about all of the `console` methods that were
  demonstrated in [View messages logged from JavaScript][10] and explore the other `console` methods
  that weren't covered in this tutorial.
- See [Get Started][11] to explore what else you can do with DevTools.

[1]: /docs/devtools
[2]: https://devtools.glitch.me/console/log.html
[3]: /docs/devtools/customize/#placement
[4]: /docs/devtools/command-menu
[5]: https://en.wikipedia.org/wiki/Stack_trace
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: https://regexr.com
[8]: /docs/devtools/console/reference
[9]: /docs/devtools/console/api
[10]: #javascript
[11]: /docs/devtools/overview/#start
