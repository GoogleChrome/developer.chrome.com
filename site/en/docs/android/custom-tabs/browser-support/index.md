---
layout: layouts/doc-post.njk
title: Browser Support
seoTitle: Android Custom Tabs browser support
description: An overview of Custom Tab features, and their browser availability
authors:
- patrickkettner
---

<style>
    .responsive-table {
      padding-bottom: 6rem
    }

    table {
      border-collapse: collapse;
    }

    table a {
      text-decoration: none;
      white-space: nowrap;
      writing-mode: vertical-rl;
    }

    th {
      padding: 3.5rem 0 1rem;
      transform: rotate(180deg);
    }

    td {
      border-color: black;
      color: white;
      cursor: help;
      padding: 0.25rem 0.5rem;
    }

    td[data-compat] {
      background: var(--wdi-success-bg-color, #efefef);
      color: #aaa;
      text-align: center;
    }

    td[data-compat="bug"] {
      background: var(--wdi-success-bg-color, #fff5e3);
      color: var(--wdi-success-color, #c34900);
    }

    td[data-compat="no"] {
      background-color: var(--wdi-error-bg-color, #fce8e8);
      color: var(--wdi-error-color, #a50e0e);
    }

    td[data-compat="yes"] {
      background: var(--wdi-success-bg-color, #e9f6ed);
      color: var(--wdi-success-color, #0d652d);
    }

    th[data-browser] {
      background-position: center 0.5rem;
      background-repeat: no-repeat;
      background-size: 65%;
      vertical-align: top
    }

    th[data-browser="chrome"] {
      background-image: url("https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/4hnfEFkV8QU9yzzMF5qB.svg");
    }

    th[data-browser="firefox"] {
      background-image: url("https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/JSYT1LByw7VZ6iLfGR7A.svg");
    }

    th[data-browser="edge"] {
      background-image: url("https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/v7nFHkLoNVnEBDeG2Iii.svg")
    }

    th[data-browser="opera"] {
      background-image: url("https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/gfezxnkKP5JQEI8uDqzi.svg");
      background-size: 60%;
    }

    th[data-browser="samsung"] {
      background-image: url("https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/gJktLzbNjho50k9Oiy0w.svg")
    }

    th[data-browser="brave"] {
      background-image: url("https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/pUkpUAT1GxEfNKsh27vt.svg")
    }

    th[data-browser="tor"] {
      background-image: url("https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/PXKd6rfAOrPJw6aGzvmp.svg")
    }

    th[data-browser="uc"] {
      background-image: url("https://wd.imgix.net/image/DXqUldooyJOUnj3qXSYLHbUgUI93/IP0DZ19HEP1ViwwwZWYV.svg");
      background-size: 60%;
    }

    article > .stack--block > p:first-of-type {
      margin-top: 0
    }
</style>

Custom Tabs are a great option for creating a customized browser experience directly within your app, but they are not a singular thing. Built on top of the [Intent system](https://developer.android.com/guide/components/intents-filters), Custom Tabs are a collection of configurable option requests that are sent to the end user's preferred browser. It is up to each browser to implement the various options. The availability of Custom Tabs features can vary between Android browsers due to implementation differences.

What follows is a comparison of _some_ browsers in the Android ecosystem. A vast majority of browsers on Android have some level of support. The tables are not not meant to be exhaustive, but illustrative of the level of support you are likely to see. You should research the default browsers of the people using _your_ app, and make sure you are coding defensively.

{% Aside 'caution' %}
It is currently not possible to programmatically check on an Android device, if an installed browser supports a specific Custom Tab feature. While most features are progressive enhancements, if you require a particular feature you must manually confirm if the user's default browser and browser version support it.
{% endAside %}

## CustomTabsIntent.Builder

`CustomTabsIntent.Builder` creates Custom Tabs. You have a number of ways to configure your custom tab to help it blend as seamlessly as possible with your app via a collection of built in methods, which are listed below.

### addDefaultShareMenuItem()

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setShareState`](#setShareState).
{% endAside %}

[addDefaultShareMenuItem()](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsIntent.Builder#addDefaultShareMenuItem()) adds a default share button to the Custom Tabs toolbar, allowing the user to share the current web page via various apps on their device.

{% AndroidBrowserSupportTable
 _method="addDefaultShareMenuItem",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


### addMenuItem()

Adds a menu item.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/i6ReSS7xCTars2Tg2mOy.png", alt="On the left, a phone showing an app using addMenuItem(), and on the right a separate phone without the API", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="addMenuItem",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}



### addToolbarItem()

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setSecondaryToolbarViews`](#setSecondaryToolbarViews).
{% endAside %}

Adds an action button to the custom tab. Multiple buttons can be added via this method.


{% AndroidBrowserSupportTable
 _method="addToolbarItem",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### enableUrlBarHiding()

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setUrlBarHidingEnabled`](#setUrlBarHidingEnabled).
{% endAside %}

Enables the url bar to hide as the user scrolls down on the page.

{% AndroidBrowserSupportTable
 _method="enableUrlBarHiding",
 chrome="n@114.0.5735.58",
 edge="n@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="n@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


### setActionButton()

Sets the action button that is displayed in the toolbar with default tinting behavior.


{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/s8J5BjPObKYTaaMtikom.png", alt="On the left, a phone showing an app using setActionButton()(), and on the right a separate phone without the API", width="800", height="407" %}


{% AndroidBrowserSupportTable
 _method="setActionButton",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


### setCloseButtonIcon()

Sets custom close button that is displayed in the toolbar.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/fsSLnl8YWCSd3qkxJrxM.png", alt="On the left, a phone showing an app using setCloseButtonIcon(), and on the right a separate phone without the API", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setCloseButtonIcon",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setCloseButtonPosition()

Sets the Close button icon for the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/fsSLnl8YWCSd3qkxJrxM.png", alt="On the left, a phone showing an app using setCloseButtonPosition(), and on the right a separate phone without the API", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setCloseButtonPosition",
 chrome="y@114.0.5735.58",
 edge="n@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


### setColorScheme()

Sets the color scheme that should be applied to the user interface in the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/r5FBaq1CCKcfSelCaYpZ.png", alt="On the left, a phone showing an app using setColorScheme(), and on the right a separate phone without the API", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setColorScheme",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


### setColorSchemeParams()

Sets the color scheme that should be applied to the user interface in the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/BuqodeL1SyDBhwDNmEYi.png", alt="On the left, a phone showing an app using setColorSchemeParams(), and on the right a separate phone without the API", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setDefaultColorSchemeParams()

Sets [`CustomTabColorSchemeParams()`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabColorSchemeParams) for the given color scheme. This allows specifying two different toolbar colors for light and dark schemes.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/SmsTCHYkNQ689xJSVTIJ.png", alt="On the left, a phone showing an app using setDefaultColorSchemeParams(), and on the right a separate phone without the API", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="status bar gets color, app bar does not@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="broken in dark mode@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setDefaultShareMenuItemEnabled()

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setShareState`](#setShareState).
{% endAside %}

Set whether a default share item is added to the menu.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="share is always enabled@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setExitAnimations()

Sets any exit animations.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setInitialActivityHeightPx()

Sets the Custom Tab Activity's initial height in pixels with default resize behavior. The Custom Tab will behave as a bottom sheet. This is often referred to as a partial Custom Tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/fo0GuqgV3TrjFkdf6P63.png", alt="On the left, a phone showing an app using setInitialActivityHeightPx(), and on the right a separate phone without the API", width="800", height="815" %}

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


### setNavigationBarColor()

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setDefaultColorSchemeParams`](#setDefaultColorSchemeParams).
{% endAside %}

Sets the navigation bar color. Has no effect on API versions below L.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setNavigationBarDividerColor()

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setDefaultColorSchemeParams`](#setDefaultColorSchemeParams).
{% endAside %}

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setSecondaryToolbarColor()

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setDefaultColorSchemeParams`](#setDefaultColorSchemeParams).
{% endAside %}

Sets the color of the secondary toolbar.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setShareState()

Sets the share state that should be applied to the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/EwVScHq2f7zOPdXDgv1C.png", alt="On the left, a phone showing an app using setShareState(), and on the right a separate phone without the API", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setShareState",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="there is always a default share@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setShowTitle()

Sets whether the title should be shown in the custom tab.

{% Img src="image/DXqUldooyJOUnj3qXSYLHbUgUI93/zrnugxD43mR9UH5kqWkv.png", alt="On the left, a phone showing an app using setShowTitle(), and on the right a separate phone without the API", width="800", height="407" %}

{% AndroidBrowserSupportTable
 _method="setShowTitle",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="always shows the title@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="always shows the title@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setStartAnimations()

Sets the start animations.


{% AndroidBrowserSupportTable
 _method="setStartAnimations",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setToolbarColor()

{% Aside 'warning' %}
This method is deprecated. Instead, you should use [`setDefaultColorSchemeParams`](#setDefaultColorSchemeParams).
{% endAside %}

Sets the toolbar color. On Android L and above, this color is also applied to the status bar.

{% AndroidBrowserSupportTable
 _method="setDefaultColorSchemeParams",
 chrome="y@114.0.5735.58",
 edge="status bar gets color, app bar does not@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="broken in dark mode@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setToolbarCornerRadiusDp()

Sets the toolbar's top corner radii in dp.

{% AndroidBrowserSupportTable
 _method="setToolbarCornerRadiusDp",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}

### setUrlBarHidingEnabled()

Set whether the url bar should hide as the user scrolls down on the page.

{% AndroidBrowserSupportTable
 _method="setUrlBarHidingEnabled",
 chrome="y@114.0.5735.58",
 edge="y@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


## CustomTabsClient
[`CustomTabsClient`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsClient) is an optional class to communicate with a [`CustomTabsService`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsService) and create [`CustomTabsSession`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsSession) from it.

### warmup()
Warm up the browser process.

{% AndroidBrowserSupportTable
 _method="warmup",
 chrome="y@114.0.5735.58",
 edge="n@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


## CustomTabsSession

[`CustomTabsSession`](https://developer.android.com/reference/androidx/browser/customtabs/CustomTabsSession) is an optional class you can provide to an instance of `CustomTabsIntent.Builder()`. When used, you can use this class to handle any communication with the Custom Tab.

### setEngagementSignalsCallback()

Sets an `[EngagementSignalsCallback](https://developer.android.com//reference/androidx/browser/customtabs/EngagementSignalsCallback)` to receive callbacks for events related to the user's engagement with webpage within the tab.

{% AndroidBrowserSupportTable
 _method="setEngagementSignalsCallback",
 chrome="y@114.0.5735.58",
 edge="n@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="n@1.51.121",
 tor="n@102.2.1-Release (12.0.6)",
 uc="ct_unimplemented@13.4.2.1307"
%}


### isEngagementSignalsApiAvailable()

Returns whether the Engagement Signals API is available. The availability of the Engagement Signals API may change at runtime.

{% AndroidBrowserSupportTable
 _method="isEngagementSignalsApiAvailable",
 chrome="y@114.0.5735.58",
 edge="n@112.0.1722.59",
 firefox="n@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="n@21.00.41",
 brave="n@1.51.121",
 tor="n@102.2.1-Release (12.0.5)",
 uc="ct_unimplemented@13.4.2.1307"
%}


### mayLaunchUrl()

Tells the browser of a likely future navigation to a URL. The most likely URL has to be specified first. Optionally, a list of other likely URLs can be provided. They are treated as less likely than the first one, and have to be sorted in decreasing priority order. These additional URLs may be ignored. All previous calls to this method will be deprioritized.

{% AndroidBrowserSupportTable
 _method="isEngagementSignalsApiAvailable",
 chrome="y@114.0.5735.58",
 edge="n@112.0.1722.59",
 firefox="y@113.2.0",
 opera="ct_unimplemented@75.3.3978.72666",
 samsung="y@21.00.41",
 brave="y@1.51.121",
 tor="y@102.2.1-Release (12.0.5)",
 uc="ct_unimplemented@13.4.2.1307"
%}


