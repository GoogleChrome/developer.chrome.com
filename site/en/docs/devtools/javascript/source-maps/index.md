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
- When stepping through code, in **Source** > **Call Stack**.

In addition, the **Source** panel puts a link to the minified file in the status bar of the **Editor**.

{% Img src="image/NJdAV9UgKuN8AhoaPBquL7giZQo1/903JBqtzB1xS9jLHSlOu.png", alt="Links to source files in log messages and Call Stack and a link to the minified file at the status bar.", width="800", height="548" %}

## @sourceURL and displayName {: #sourceurl_and_displayname }

While not part of the source map spec, the `@sourceURL` allows you to make development much easier
when working with evals. This helper looks very similar to the `//# sourceMappingURL` property and
is actually mentioned in the source map V3 specifications.

By including the following special comment in your code, which will be evaled, you can name evals
and inline scripts and styles so they appear as more logical names in your DevTools.

`//# sourceURL=source.coffee`

Navigate to this **[demo][13]**, then:

- Open the DevTools and go to the **Sources** panel.
- Enter in a filename into the _Name your code:_ input field.
- Click on the **compile** button.
- An alert will appear with the evaluated sum from the CoffeeScript source.

If you expand the _Sources_ sub-panel you will now see a new file with the custom filename you
entered earlier. If you double-click to view this file it will contain the compiled JavaScript for
our original source. On the last line, however, will be a `// @sourceURL` comment indicating what
the original source file was. This can greatly help with debugging when working with language
abstractions.

{% Img src="image/admin/KJAs60U1FMmwVUTjElkV.jpg", alt="Working with sourceURL.", width="800", height="403" %}

[1]: /web/tools/setup/setup-preprocessors?#supported_preprocessors
[2]: /web/tools/setup/setup-preprocessors?#debugging-and-editing-preprocessed-content
[3]: /web/tools/setup/setup-preprocessors?#supported_preprocessors
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
