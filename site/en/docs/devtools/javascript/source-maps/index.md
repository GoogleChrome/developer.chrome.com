---
layout: "layouts/doc-post.njk"
title: "Map preprocessed code to source code"
authors:
  - megginkearney
  - pbakaus
  - sofiayem
date: 2015-04-13
updated: 2023-03-29
description: "Keep your client-side code readable and debuggable even after you've combined, minified, or compiled it."
---

Keep your client-side code readable and debuggable even after you've combined, minified or compiled
it. Use source maps to map your source code to your compiled code.

## Get started with preprocessors {: #get_started_with_preprocessors }

To read and debug the original source of compiled code in the **Sources** panel, use source maps to map minified code to source code. 

To use source maps:

- Use only the preprocessors that can produce source maps.
- Verify that your web server can serve source maps.

## Use a supported preprocessor {: #use_a_supported_preprocessor }

The following types of preprocessors are commonly used in combination with source maps:

- Transpilers ([Babel][5], [Traceur][6])
- Compilers ([Closure Compiler][7], [TypeScript][8], [CoffeeScript][9], [Dart][10])
- Minifiers ([UglifyJS][11])

For an extended list, see [Source maps: Languages, tools, and other info][4].

## Source maps in the Sources panel {: #source_maps_in_devtools_sources_panel }

Source maps from preprocessors cause DevTools to load your original files in addition to your minified ones.
Chrome will actually run your minified code but the **Sources** panel will show you the code you author.
You can set breakpoints and step through code in source files and all the errors, logs, and breakpoints will automatically map.

This gives you the appearance of running a development site in production.

### Enable source maps in Settings {: #enable_source_maps_in_settings }

In {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/9gzXiTYY0nZzBxGI6KrV.svg", alt="Settings.", width="24", height="24" %} [**Settings** > **Preferences** > **Sources**](/docs/devtools/settings/preferences/#sources), make sure to check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable JavaScript source maps**.

{% Aside %}
You might also want to check {% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/hmp8j3HiLMCcqPArD9yt.svg", alt="Checkbox.", width="22", height="22" %} **Enable CSS source maps**.
{% endAside %}

Additionally, to separate source files from the minified ones in the file tree, you can [group authored and deployed code](/docs/devtools/javascript/reference/#group-authored-and-deployed).

## Debugging with source maps {: #debugging_with_source_maps }

When [debugging your code][12] with enabled source maps, DevTools shows links to the original source files in two places:

- Next to log messages in the **Console**.
- In **Source** > **Call Stack** when stepping through code.

In addition, the **Source** panel puts a link to the minified file in the status bar of the **Editor**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/903JBqtzB1xS9jLHSlOu.png", alt="Links to source files in log messages and Call Stack and a link to the minified file at the status bar.", width="800", height="548" %}

## @sourceURL and display name {: #sourceurl_and_displayname }

While not part of the source map specification, the [`#sourceURL`](/blog/sourcemappingurl-and-sourceurl-syntax-changed/#sourceurl) lets you make development much easier
when working with `eval()` calls. This helper looks very similar to the [`//# sourceMappingURL` property](/blog/sourcemaps/#how-does-the-source-map-work) and the [Source Map V3 specification](https://sourcemaps.info/spec.html) mentions it.

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
[6]: https://github.com/google/traceur-compiler/wiki/Getting-Started
[7]: https://github.com/google/closure-compiler
[8]: http://www.typescriptlang.org/
[9]: http://coffeescript.org
[10]: https://www.dartlang.org
[11]: https://github.com/mishoo/UglifyJS
[12]: /docs/devtools/javascript/#code-stepping
[13]: http://www.thecssninja.com/demo/source_mapping/compile.html
