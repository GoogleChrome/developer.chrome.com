---
layout: "layouts/doc-post.njk"
title: "Debug your original code instead of deployed with source maps"
authors:
  - megginkearney
  - pbakaus
  - sofiayem
date: 2015-04-13
updated: 2023-03-29
description: "Keep your client-side code readable and debuggable even after you've combined, minified, or compiled it."
---

Keep your client-side code readable and debuggable even after you've combined, minified or compiled
it. Use [source maps](https://web.dev/source-maps/) to map your source code to your compiled code in the **Sources** panel.

{% YouTube id='SkUcO4ML5U0' %}

## Get started with preprocessors {: #get_started_with_preprocessors }

Source maps from preprocessors cause DevTools to load your original files in addition to your minified ones.
Chrome will actually run your minified code but the **Sources** panel will show you the code you author.
You can set breakpoints and step through code in source files and all the errors, logs, and breakpoints will automatically map.

This gives you the appearance of debugging the code as you wrote it, as opposed to code that is served by your development server and executed by the browser.

To use source maps in the **Sources** panel:

- Use only the preprocessors that can produce source maps.
- Verify that your web server can serve source maps.

### Use a supported preprocessor {: #use_a_supported_preprocessor }

Common preprocessors used in combination with source maps include but aren't limited to:

- Transpilers: [Babel][5]
- Compilers: [TypeScript][8] and [Dart][10]
- Minifiers: [terser](https://github.com/terser/terser)
- Bundlers and development servers: [Webpack](https://webpack.js.org/), [Vite](https://vitejs.dev/), [esbuild](https://esbuild.github.io/), and [Parcel](https://parceljs.org/)

For an extended list, see [Source maps: Languages, tools, and other info][4].

## Enable source maps in Settings {: #enable_source_maps_in_settings }

In {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Sources**](/docs/devtools/settings/preferences/#sources), make sure to check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable JavaScript source maps**.

{% Aside %}
You might also want to check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable CSS source maps**.
{% endAside %}

## Check if source maps load sucessfully {: #developer-resources }

See [Developer Resources: View and load source maps manually](/docs/devtools/developer-resources).

## Debugging with source maps {: #debugging_with_source_maps }

{% Aside %}
This tutorial uses [this demo](https://github.com/jecfish/parcel-demo) as an example.
{% endAside %}

With source maps [ready](#use_a_supported_preprocessor) and [enabled](#enable_source_maps_in_settings), you can do the following:

1. [Open your website's sources](/docs/devtools/javascript/#sources-ui) in the **Sources** panel.
1. To focus only on the code you author, [group authored and deployed files in the file tree](/docs/devtools/javascript/reference/#group-authored-and-deployed). Then expand the {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/KIgoYfQUdaCtgDLdYKSE.svg", alt="Authored.", width="24", height="24" %} **Authored** section and open your original source file in the **Editor**.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/aMQH5hz1wtyvZ6m9iwIS.png", alt="The original file opened in the Authored section.", width="800", height="467" %}

1. [Set a breakpoint](/docs/devtools/javascript/breakpoints/) as you normally would. For example, a [logpoint](/docs/devtools/javascript/breakpoints/#log-loc). Then run the code.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/prEovjLfQ9YsV3YaD7GS.png", alt="A logpoint set in an authored file.", width="800", height="498" %}

1. Notice that the **Editor** puts a link to the deployed file in the status bar at the bottom. Similarly, it does so for deployed CSS files.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ld63Rt54s8uA2kQDoHnm.png", alt="A link to the deployed CSS files in the status bar.", width="800", height="437" %}

1. [Open the **Console** drawer](/docs/devtools/console/reference/#drawer). In this example, next to the logpoint's message, the Console shows a link to the original file, not the deployed one.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/ThmjmrqfrAldVWc3o0sg.png", alt="The Console message with a link to the original file.", width="800", height="599" %}

1. Change the [breakpoint type](/docs/devtools/javascript/breakpoints/#overview) to a [regular one](/docs/devtools/javascript/breakpoints/#loc) and run the code again. The execution pauses this time.

   {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/3uhd8F9ME1M07fipL7rG.png", alt="Execution paused on a regular breakpoint.", width="800", height="557" %}

   Notice that the **Call Stack** pane shows the name of the original file and not the deployed one.

1. In the status bar at the bottom of the **Editor**, click the link to the deployed file. The **Sources** panel takes you to the corresponding file.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/Ny275qI4jkgZaZpM1nmU.png", alt="The deployed file with the sourceMappingURL comment.", width="800", height="498" %}

When you open any deployed file, DevTools notifies you if it found the `//# sourceMappingURL` comment and the associated original file.

Notice that the **Editor** automatically pretty-printed the deployed file. In reality, it contains all the code in a single line, except for the `//# sourceMappingURL` comment.

## Name `eval()` calls with `#sourceURL` {: #sourceurl_and_displayname }

The [`#sourceURL`](/blog/sourcemappingurl-and-sourceurl-syntax-changed/#sourceurl) lets you simplify debugging
when dealing with `eval()` calls. This helper looks very similar to the [`//# sourceMappingURL` property](/blog/sourcemaps/#how-does-the-source-map-work). For more information, see the [Source Map V3 specification](https://sourcemaps.info/spec.html).

The `//# sourceURL=/path/to/source.file` comment tells the browser to look for the source file when you use `eval()`. This helps you name your evaluations and inline scripts and styles.

Test it on this [demo page][13]:

1. [Open the DevTools](/docs/devtools/open) and go to the **Sources** panel.
1. On the page, enter an arbitrary filename into the _Name your code:_ input field.
1. Click the **Compile** button. An alert appears with the evaluated sum from the CoffeeScript source.
1. In the file tree on the **Page** pane, open a new file with the custom filename you entered. It contains the compiled JavaScript code that has the `// #sourceURL` comment with the original name of the source file.
1. To open the source file, click the link in the status bar of the **Editor**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/emBmyXDMqalJSQuus1Bx.png", alt="The sourceURL comment and the link to the source file in the status bar.", width="800", height="560" %}

[4]: https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info
[5]: https://babeljs.io/
[7]: https://github.com/google/closure-compiler
[8]: http://www.typescriptlang.org/
[10]: https://www.dartlang.org
[12]: /docs/devtools/javascript/#code-stepping
[13]: http://www.thecssninja.com/demo/source_mapping/compile.html
