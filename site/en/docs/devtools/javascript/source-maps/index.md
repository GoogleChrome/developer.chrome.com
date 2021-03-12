---
layout: "layouts/doc-post.njk"
title: "Map Preprocessed Code to Source Code"
authors:
  - megginkearney
  - pbakaus
date: 2015-04-13
#updated: YYYY-MM-DD
description: "Keep your client-side code readable and debuggable even after you've combined, minified or compiled it."
---

Keep your client-side code readable and debuggable even after you've combined, minified or compiled
it. Use source maps to map your source code to your compiled code.

## Summary {: #summary }

- Use Source Maps to map minified code to source code. You can then read and debug compiled code in
  its original source.
- Only use preprocessors capable of producing Source Maps.
- Verify that your web server can serve Source Maps.

## Get started with preprocessors {: #get_started_with_preprocessors }

This article explains how to interact with JavaScript Source Maps in the DevTools Sources Panel.

## Use a supported preprocessor {: #use_a_supported_preprocessor }

You need to use a minifier that's capable of creating source maps.
For an extended view, see the [Source maps: languages,
tools and other info][4] wiki page.

The following types of preprocessors are commonly used in combination with Source Maps:

- Transpilers ([Babel][5], [Traceur][6])
- Compilers ([Closure Compiler][7], [TypeScript][8], [CoffeeScript][9], [Dart][10])
- Minifiers ([UglifyJS][11])

## Source Maps in DevTools Sources panel {: #source_maps_in_devtools_sources_panel }

Source Maps from preprocessors cause DevTools to load your original files in addition to your
minified ones. You then use the originals to set breakpoints and step through code. Meanwhile,
Chrome is actually running your minified code. This gives you the illusion of running a development
site in production.

When running Source Maps in DevTools, you'll notice that the JavaScript isn't compiled and you can
see all the individual JavaScript files it references. This is using source mapping, but behind the
scenes actually runs the compiled code. Any errors, logs and breakpoints will map to the dev code
for awesome debugging! So in effect it gives you the illusion that you're running a dev site in
production.

### Enable Source Maps in settings {: #enable_source_maps_in_settings }

Source Maps are enabled by default (as of Chrome 39), but if you'd like to double-check or enable
them, first open DevTools and click the settings cog
{% Img src="image/admin/6OvQcMgStUCLS2kGRYn7.png", alt="gear", width="18", height="18" %}. Under **Sources**, check **Enable
JavaScript Source Maps**. You might also check **Enable CSS Source Maps**.

{% Img src="image/admin/YGj3osOPCRzs4zWSEjNe.jpg", alt="Enable Source Maps", width="800", height="402" %}

### Debugging with Source Maps {: #debugging_with_source_maps }

When [debugging your code][12] and Source Maps enabled, Source Maps will show in two places:

1.  In the console (the link to source should be the original file, not the generated one)
2.  When stepping through code (the links in the call stack should open the original source file)

## @sourceURL and displayName {: #sourceurl_and_displayname }

While not part of the Source Map spec, the `@sourceURL` allows you to make development much easier
when working with evals. This helper looks very similar to the `//# sourceMappingURL` property and
is actually mentioned in the Source Map V3 specifications.

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

{% Img src="image/admin/KJAs60U1FMmwVUTjElkV.jpg", alt="Working with sourceURL", width="800", height="403" %}

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
