---
layout: layouts/doc-post.njk
title: Browser Support
seoTitle: Android Custom Tabs browser support
description: An overview of Custom Tab features, and their browser availability
authors:
- patrickkettner
---

<style>.responsive-table{padding-bottom:6rem}table{border-collapse: collapse;}table a {text-decoration: none;writing-mode: vertical-rl;white-space:nowrap}th {transform: rotate(180deg);padding: 3.5rem 0 1rem;}td{padding: 0.25rem 0.5rem;border-color: black;color: white;cursor: help;}td[data-compat] {text-align: center;background: var(--wdi-success-bg-color, #efefef);color: #aaa;}td[data-compat="yes"] {background: var(--wdi-success-bg-color, #e9f6ed);color: var(--wdi-success-color, #0d652d);}td[data-compat="bug"] {background: var(--wdi-success-bg-color, #fff5e3);color: var(--wdi-success-color, #c34900);}td[data-compat="no"] {background-color: var(--wdi-error-bg-color, #fce8e8);color: var(--wdi-error-color, #a50e0e);}th[data-browser] {background-repeat: no-repeat;background-size: 65%;background-position: center 0.5rem;vertical-align:top}th[data-browser="chrome"] {background-image: url(https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/4hnfEFkV8QU9yzzMF5qB.svg);}th[data-browser="firefox"] {background-image: url(https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/JSYT1LByw7VZ6iLfGR7A.svg);}th[data-browser="edge"] {background-image: url(https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/v7nFHkLoNVnEBDeG2Iii.svg) }th[data-browser="opera"] {background-image: url(https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/gfezxnkKP5JQEI8uDqzi.svg);background-size: 60%;}th[data-browser="samsung"] {background-image: url(https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/gJktLzbNjho50k9Oiy0w.svg) }th[data-browser="brave"] {background-image: url(https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/pUkpUAT1GxEfNKsh27vt.svg) }th[data-browser="tor"] {background-image: url(https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/PXKd6rfAOrPJw6aGzvmp.svg) }th[data-browser="uc"] {background-image: url(https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/IP0DZ19HEP1ViwwwZWYV.svg);background-size: 60%;}article>.stack--block>p:first-of-type{margin-top:0}</style>

Custom Tabs are a great option for creating a customized browser experience directly within your app, but they are not a singular thing. Built ontop of the [Intent system](https://developer.android.com/guide/components/intents-filters), Custom Tabs are a collection of configurable option requests that are sent to the end user's preferred browser. It is up to each browser to implement the various options. The availability of CustomTabs features can vary between Android browsers due to implementation differences.

What follows is a comparison of _some_ browsers in the android ecosystem. A vast majority of browsers on Androd have some level of support. The tables are not not meant to be exhaustive, but illustrative of the level of support you are likely to see. You should do research on the default browsers of the people using _your_ app, and make sure you are coding defensively.

{% Aside 'caution' %}
    It is currently not possible to check if a specific feature is available or not.  While most features are progressive enhancements, if you require a particular feature you must manually confirm if the user's default browser and browser version support it.
{% endAside %}

## CustomTabsIntent.Builder

CustomTabsIntent.Builder is the class you will use to create your Custom Tabs. You have a number of ways to configure your Custom Tab to help it blend as seamlessly as posible with your app, via a collection of built in methods. These include

### addDefaultShareMenuItem

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setShareState`](#setShareState).
{% endAside %}

[addDefaultShareMenuItem](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#addDefaultShareMenuItem()) adds a default share button to the Custom Tabs toolbar, allowing the user to share the current web page via various apps on their device

{% AndroidBrowserSupportTable
 _method="addDefaultShareMenuItem",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}


### addMenuItem

Adds a menu item.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/i6ReSS7xCTars2Tg2mOy.png", alt="phone showing an app that used addMenuItem on the left, and a separate phone without using that api on the right", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="addMenuItem",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}



### addToolbarItem

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setSecondaryToolbarViews`](#setSecondaryToolbarViews).
{% endAside %}

Adds an action button to the custom tab. Multiple buttons can be added via this method.


{% AndroidBrowserSupportTable
 _method="addToolbarItem",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### enableUrlBarHiding

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setUrlBarHidingEnabled`](#setUrlBarHidingEnabled).
{% endAside %}

Enables the url bar to hide as the user scrolls down on the page.

{% AndroidBrowserSupportTable
 _method="enableUrlBarHiding",
 chrome="n@108.0.5359.79",
 edge="n@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="n@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}


### setActionButton

Sets the action button that is displayed in the Toolbar with default tinting behavior.


{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/s8J5BjPObKYTaaMtikom.png", alt="phone showing an app that used setActionButton the left, and a separate phone without using that api on the right", width="800", height="407" %}


{% AndroidBrowserSupportTable
 _method="setActionButton",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}


### setCloseButtonIcon

Sets the action button that is displayed in the Toolbar.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/fsSLnl8YWCSd3qkxJrxM.png", alt="phone showing an app that used setCloseButtonIcon the left, and a separate phone without using that api on the right", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setCloseButtonIcon",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setCloseButtonPosition

Sets the Close button icon for the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/fsSLnl8YWCSd3qkxJrxM.png", alt="phone showing an app that used setCloseButtonPosition the left, and a separate phone without using that api on the right", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setCloseButtonPosition",
 chrome="y@108.0.5359.79",
 edge="n@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="y@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}


### setColorScheme

Sets the color scheme that should be applied to the user interface in the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/r5FBaq1CCKcfSelCaYpZ.png", alt="phone showing an app that used setColorScheme the left, and a separate phone without using that api on the right", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setColorScheme",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="y@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}


### setColorSchemeParams

Sets the color scheme that should be applied to the user interface in the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/BuqodeL1SyDBhwDNmEYi.png", alt="phone showing an app that used setColorSchemeParams the left, and a separate phone without using that api on the right", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setDefaultColorSchemeParams

Sets [`CustomTabColorSchemeParams()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabColorSchemeParams) for the given color scheme. This allows specifying two different toolbar colors for light and dark schemes.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/SmsTCHYkNQ689xJSVTIJ.png", alt="phone showing an app that used setDefaultColorSchemeParams the left, and a separate phone without using that api on the right", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="status bar gets color, app bar does not@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="broken in dark mode@19.0.3.12",
 brave="y@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setDefaultShareMenuItemEnabled

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setShareState`](#setShareState).
{% endAside %}

Set whether a default share item is added to the menu.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="share is always enabled@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setExitAnimations

Sets any exit animations.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setInitialActivityHeightPx

Sets the Custom Tab Activity's initial height in pixels with default resize behavior. The Custom Tab will behave as a bottom sheet. This is often referred to as a partial Custom Tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/fo0GuqgV3TrjFkdf6P63.png", alt="phone showing an app that used setInitialActivityHeightPx the left, and a separate phone without using that api on the right", width="800", height="815" %}

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="n@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="n@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}


### setNavigationBarColor

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setDefaultColorSchemeParams`](#setDefaultColorSchemeParams).
{% endAside %}

Sets the navigation bar color. Has no effect on API versions below L.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setNavigationBarDividerColor

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setDefaultColorSchemeParams`](#setDefaultColorSchemeParams).
{% endAside %}

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="y@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setSecondaryToolbarColor

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setDefaultColorSchemeParams`](#setDefaultColorSchemeParams).
{% endAside %}

Sets the color of the secondary toolbar.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="y@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setShareState

Sets the share state that should be applied to the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/EwVScHq2f7zOPdXDgv1C.png", alt="phone showing an app that used setShareState the left, and a separate phone without using that api on the right", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setShareState",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="there is always a default share@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setShowTitle

Sets whether the title should be shown in the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/zrnugxD43mR9UH5kqWkv.png", alt="phone showing an app that used setShowTitle the left, and a separate phone without using that api on the right", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setShowTitle",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="always shows the title@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="always shows the title@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setStartAnimations

Sets the start animations.


{% AndroidBrowserSupportTable
 _method="setStartAnimations",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="y@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setToolbarColor

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setDefaultColorSchemeParams`](#setDefaultColorSchemeParams).
{% endAside %}

Sets the toolbar color. On Android L and above, this color is also applied to the status bar.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@108.0.5359.79",
 edge="status bar gets color, app bar does not@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="broken in dark mode@19.0.3.12",
 brave="y@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setToolbarCornerRadiusDp

Sets the toolbar's top corner radii in dp.

{% AndroidBrowserSupportTable
 _method="setToolbarCornerRadiusDp",
 chrome="y@108.0.5359.79",
 edge="n@107.0.1418.62",
 firefox="n@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="n@19.0.3.12",
 brave="n@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

### setUrlBarHidingEnabled

Set whether the url bar should hide as the user scrolls down on the page.

{% AndroidBrowserSupportTable
 _method="setUrlBarHidingEnabled",
 chrome="y@108.0.5359.79",
 edge="y@107.0.1418.62",
 firefox="y@107.2.0",
 opera="ct_unimplemented@72.4.3767.69265",
 samsung="y@19.0.3.12",
 brave="y@1.46.138",
 tor="n@102.2.1-Release (12)",
 uc="ct_unimplemented@13.4.0.1306"
%}

