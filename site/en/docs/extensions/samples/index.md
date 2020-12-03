---
layout: "layouts/doc-post.njk"
title: "Sample Extensions"
#date: TODO
#updated: TODO
#description: TODO
---

## [My Bookmarks][1] {: #my-bookmarks }

A browser action with a popup dump of all bookmarks, including search, add, edit and delete.

Calls:

- [`bookmarks.create`][2]
- [`bookmarks.getTree`][3]
- [`bookmarks.remove`][4]
- [`bookmarks.update`][5]
- [`tabs.create`][6]

Source Files:

- [`icon.png`][7]
- [`manifest.json`][8]
- [`popup.html`][9]
- [`popup.js`][10]

## [Page Redder][11] {: #page-redder }

Make the current page red

Calls:

- [`browserAction.onClicked`][12]
- [`tabs.executeScript`][13]

Source Files:

- [`background.js`][14]
- [`manifest.json`][15]

## [Print this page][16] {: #print-this-page }

Adds a print button to the browser.

Calls:

- [`browserAction.onClicked`][17]
- [`tabs.executeScript`][18]

Source Files:

- [`background.js`][19]
- [`manifest.json`][20]
- [`print_16x16.png`][21]

## [A browser action which changes its icon when clicked][22] {: #a-browser-action-which-changes-its-icon-when-clicked }

Click browser action icon to change color!

Calls:

- [`browserAction.onClicked`][23]
- [`browserAction.setIcon`][24]
- [`runtime.onInstalled`][25]
- [`storage.StorageArea.get`][26]
- [`storage.StorageArea.set`][27]

Source Files:

- [`background.js`][28]
- [`icon1.png`][29]
- [`icon2.png`][30]
- [`icon3.png`][31]
- [`icon4.png`][32]
- [`icon5.png`][33]
- [`manifest.json`][34]

## [A browser action with a popup that changes the page color][35] {: #a-browser-action-with-a-popup-that-changes-the-page-color }

Change the current page color

Calls:

- [`tabs.executeScript`][36]

Source Files:

- [`icon.png`][37]
- [`manifest.json`][38]
- [`popup.html`][39]
- [`popup.js`][40]

## [BrowsingData API: Basics][41] {: #browsingdata-api:-basics }

A trivial usage example.

Calls:

- [`browsingData.remove`][42]

Source Files:

- [`icon.png`][43]
- [`manifest.json`][44]
- [`popup.css`][45]
- [`popup.html`][46]
- [`popup.js`][47]

## [Sample Extension Commands extension][48] {: #sample-extension-commands-extension }

Press Ctrl+Shift+F to open the browser action popup, press Ctrl+Shift+Y to send an event.

Calls:

- [`commands.onCommand`][49]

Source Files:

- [`background.js`][50]
- [`browser_action.html`][51]
- [`manifest.json`][52]

## [Content settings][53] {: #content-settings }

Shows the content settings for the current site.

Calls:

- [`contentSettings.ContentSetting.get`][54]
- [`contentSettings.ContentSetting.set`][55]
- [`tabs.query`][56]

Source Files:

- [`contentSettings.png`][57]
- [`manifest.json`][58]
- [`popup.html`][59]
- [`popup.js`][60]

## [Context Menus Sample][61] {: #context-menus-sample }

Shows some of the features of the Context Menus API

Calls:

- [`contextMenus.create`][62]
- [`extension.lastError`][63]

Source Files:

- [`manifest.json`][64]
- [`sample.js`][65]

## [Context Menus Sample (with Event Page)][66] {: #context-menus-sample-(with-event-page) }

Shows some of the features of the Context Menus API using an event page

Calls:

- [`contextMenus.create`][67]
- [`contextMenus.onClicked`][68]
- [`extension.lastError`][69]
- [`runtime.onInstalled`][70]

Source Files:

- [`manifest.json`][71]
- [`sample.js`][72]

## [Global Google Search][73] {: #global-google-search }

Use the context menu to search a different country's Google

Calls:

- [`contextMenus.create`][74]
- [`contextMenus.onClicked`][75]
- [`contextMenus.remove`][76]
- [`runtime.onInstalled`][77]
- [`storage.onChanged`][78]
- [`storage.StorageArea.get`][79]
- [`storage.StorageArea.set`][80]
- [`tabs.create`][81]

Source Files:

- [`background.js`][82]
- [`globalGoogle128.png`][83]
- [`globalGoogle16.png`][84]
- [`globalGoogle48.png`][85]
- [`locales.js`][86]
- [`manifest.json`][87]
- [`options.html`][88]
- [`options.js`][89]

## [Cookie API Test Extension][90] {: #cookie-api-test-extension }

Testing Cookie API

Calls:

- [`browserAction.onClicked`][91]
- [`cookies.getAll`][92]
- [`cookies.onChanged`][93]
- [`cookies.remove`][94]
- [`extension.getURL`][95]
- [`tabs.create`][96]
- [`tabs.update`][97]
- [`windows.getAll`][98]

Source Files:

- [`background.js`][99]
- [`cookie.png`][100]
- [`manager.html`][101]
- [`manager.js`][102]
- [`manifest.json`][103]

## [Live HTTP headers][104] {: #live-http-headers }

Displays the live log with the http requests headers

Calls:

- [`browserAction.onClicked`][105]
- [`debugger.attach`][106]
- [`debugger.detach`][107]
- [`debugger.onEvent`][108]
- [`debugger.sendCommand`][109]
- [`runtime.lastError`][110]
- [`windows.create`][111]

Source Files:

- [`background.js`][112]
- [`headers.html`][113]
- [`headers.js`][114]
- [`icon.png`][115]
- [`manifest.json`][116]

## [JavaScript pause/resume][117] {: #javascript-pause/resume }

Pauses / resumes JavaScript execution

Calls:

- [`browserAction.onClicked`][118]
- [`browserAction.setIcon`][119]
- [`browserAction.setTitle`][120]
- [`debugger.attach`][121]
- [`debugger.detach`][122]
- [`debugger.onDetach`][123]
- [`debugger.onEvent`][124]
- [`debugger.sendCommand`][125]
- [`runtime.lastError`][126]

Source Files:

- [`background.js`][127]
- [`debuggerContinue.png`][128]
- [`debuggerPause.png`][129]
- [`debuggerPausing.png`][130]
- [`manifest.json`][131]

## [Tab Flipper][132] {: #tab-flipper }

Press Ctrl+Shift+Right or Ctrl+Shift+Left (Command+Shift+Right or Command+Shift+Left on a Mac) to
flip through window tabs

Calls:

- [`commands.onCommand`][133]
- [`tabs.query`][134]
- [`tabs.update`][135]

Source Files:

- [`background.js`][136]
- [`manifest.json`][137]
- [`images/tabFlipper128.png`][138]
- [`images/tabFlipper16.png`][139]
- [`images/tabFlipper32.png`][140]
- [`images/tabFlipper48.png`][141]

## [Desktop Capture Example][142] {: #desktop-capture-example }

Show desktop media picker UI

Calls:

- [`desktopCapture.cancelChooseDesktopMedia`][143]
- [`desktopCapture.chooseDesktopMedia`][144]
- [`runtime.onMessage`][145]
- [`runtime.sendMessage`][146]

Source Files:

- [`app.js`][147]
- [`background.js`][148]
- [`icon.png`][149]
- [`index.html`][150]
- [`manifest.json`][151]

## [My Devices][152] {: #my-devices }

A browser action with a popup dump of all devices signed into the same account as the current
profile.

Calls:

- [`signedInDevices.get`][153]
- [`signedInDevices.onDeviceInfoChange`][154]

Source Files:

- [`icon.png`][155]
- [`manifest.json`][156]
- [`popup.html`][157]
- [`popup.js`][158]

## [FirePHP for Chrome][159] {: #firephp-for-chrome }

Extends the Developer Tools, adding support for parsing FirePHP messages from server

Calls:

- [`devtools.network.getHAR`][160]
- [`devtools.network.onRequestFinished`][161]
- [`extension.onRequest`][162]
- [`extension.sendRequest`][163]
- [`tabs.executeScript`][164]

Source Files:

- [`background.js`][165]
- [`devtools.html`][166]
- [`devtools.js`][167]
- [`manifest.json`][168]

## [Chrome Query][169] {: #chrome-query }

Extends the Developer Tools, adding a sidebar that displays the jQuery data associated with the
selected DOM element.

Calls:

- [`devtools.panels.ElementsPanel.createSidebarPane`][170]
- [`devtools.panels.ElementsPanel.onSelectionChanged`][171]

Source Files:

- [`devtools.html`][172]
- [`devtools.js`][173]
- [`manifest.json`][174]

## [tabCast][175] {: #tabcast }

Creates a WiFi Display Session from the captured tab media stream using chrome.displaySource API.

Calls:

- [`displaySource.getAvailableSinks`][176]
- [`displaySource.onSessionTerminated`][177]
- [`displaySource.onSinksUpdated`][178]
- [`displaySource.startSession`][179]
- [`displaySource.terminateSession`][180]
- [`extension.getBackgroundPage`][181]
- [`runtime.lastError`][182]
- [`runtime.onMessage`][183]
- [`runtime.sendMessage`][184]
- [`tabCapture.capture`][185]
- [`tabs.getCurrent`][186]

Source Files:

- [`README`][187]
- [`background.js`][188]
- [`main.css`][189]
- [`main.html`][190]
- [`main.js`][191]
- [`manifest.json`][192]

## [Document Scanning API Sample][193] {: #document-scanning-api-sample }

Calls:

- [`documentScan.scan`][194]
- [`permissions.contains`][195]
- [`permissions.request`][196]
- [`runtime.lastError`][197]

Source Files:

- [`README.md`][198]
- [`background.js`][199]
- [`manifest.json`][200]
- [`scan.css`][201]
- [`scan.html`][202]
- [`scan.js`][203]

## [Download Filename Controller][204] {: #download-filename-controller }

Download Filename Controller

Calls:

- [`downloads.onDeterminingFilename`][205]

Source Files:

- [`bg.js`][206]
- [`manifest.json`][207]
- [`options.html`][208]
- [`options.js`][209]

## [Download Selected Links][210] {: #download-selected-links }

Select links on a page and download them.

Calls:

- [`downloads.download`][211]
- [`extension.onRequest`][212]
- [`extension.sendRequest`][213]
- [`tabs.executeScript`][214]
- [`tabs.query`][215]
- [`windows.getCurrent`][216]

Source Files:

- [`manifest.json`][217]
- [`popup.html`][218]
- [`popup.js`][219]
- [`send_links.js`][220]

## [Download Manager Button][221] {: #download-manager-button }

Browser Action Download Manager User Interface for Google Chrome

Calls:

- [`browserAction.setIcon`][222]
- [`downloads.acceptDanger`][223]
- [`downloads.cancel`][224]
- [`downloads.download`][225]
- [`downloads.erase`][226]
- [`downloads.getFileIcon`][227]
- [`downloads.onChanged`][228]
- [`downloads.onCreated`][229]
- [`downloads.onErased`][230]
- [`downloads.open`][231]
- [`downloads.pause`][232]
- [`downloads.removeFile`][233]
- [`downloads.resume`][234]
- [`downloads.search`][235]
- [`downloads.setShelfEnabled`][236]
- [`downloads.show`][237]
- [`downloads.showDefaultFolder`][238]
- [`i18n.getMessage`][239]
- [`permissions.contains`][240]
- [`permissions.request`][241]
- [`runtime.onMessage`][242]
- [`runtime.sendMessage`][243]
- [`tabs.create`][244]

Source Files:

- [`background.js`][245]
- [`icon128.png`][246]
- [`icon19.png`][247]
- [`icon38.png`][248]
- [`icons.html`][249]
- [`icons.js`][250]
- [`manifest.json`][251]
- [`popup.css`][252]
- [`popup.html`][253]
- [`popup.js`][254]
- [`_locales/en/messages.json`][255]

## [Download and Open Button][256] {: #download-and-open-button }

Download and Open Context Menu Button

Calls:

- [`contextMenus.create`][257]
- [`contextMenus.onClicked`][258]
- [`downloads.download`][259]
- [`downloads.onChanged`][260]
- [`downloads.open`][261]
- [`i18n.getMessage`][262]

Source Files:

- [`background.js`][263]
- [`icon128.png`][264]
- [`icon16.png`][265]
- [`manifest.json`][266]
- [`_locales/en/messages.json`][267]

## [Downloads Overwrite Existing Files][268] {: #downloads-overwrite-existing-files }

All downloads overwrite existing files instead of adding ' (1)', ' (2)', etc.

Calls:

- [`downloads.onDeterminingFilename`][269]

Source Files:

- [`bg.js`][270]
- [`manifest.json`][271]

## [Event Page Example][272] {: #event-page-example }

Demonstrates usage and features of the event page

Calls:

- [`alarms.create`][273]
- [`alarms.onAlarm`][274]
- [`bookmarks.onRemoved`][275]
- [`browserAction.onClicked`][276]
- [`browserAction.setBadgeText`][277]
- [`commands.onCommand`][278]
- [`declarativeWebRequest.RedirectRequest`][279]
- [`declarativeWebRequest.RequestMatcher`][280]
- [`runtime.onInstalled`][281]
- [`runtime.onMessage`][282]
- [`runtime.onSuspend`][283]
- [`runtime.sendMessage`][284]
- [`tabs.create`][285]
- [`tabs.executeScript`][286]
- [`tabs.query`][287]
- [`tabs.sendMessage`][288]

Source Files:

- [`background.js`][289]
- [`content.js`][290]
- [`icon.png`][291]
- [`manifest.json`][292]

## [\`extension.isAllowedFileSchemeAccess\` and \`extension.isAllowedIncognitoAccess\` Example][293] {: #`extension.isallowedfileschemeaccess`-and-`extension.isallowedincognitoaccess`-example }

Demonstrates the \`extension.isAllowedFileSchemeAccess\` and \`extesion.isAllowedIncognitoAccess\`
APIs

Calls:

- [`extension.isAllowedFileSchemeAccess`][294]
- [`extension.isAllowedIncognitoAccess`][295]

Source Files:

- [`manifest.json`][296]
- [`popup.html`][297]
- [`popup.js`][298]
- [`sample-128.png`][299]
- [`sample-16.png`][300]
- [`sample-19.png`][301]
- [`sample-48.png`][302]
- [`sample.css`][303]

## [Fake Archive Handler App][304] {: #fake-archive-handler-app }

Demonstrate File System Provider API usage for apps.

Calls:

- [`fileSystemProvider.get`][305]
- [`fileSystemProvider.mount`][306]
- [`fileSystemProvider.onCloseFileRequested`][307]
- [`fileSystemProvider.onGetMetadataRequested`][308]
- [`fileSystemProvider.onOpenFileRequested`][309]
- [`fileSystemProvider.onReadDirectoryRequested`][310]
- [`fileSystemProvider.onReadFileRequested`][311]
- [`fileSystemProvider.onUnmountRequested`][312]
- [`fileSystemProvider.unmount`][313]
- [`runtime.lastError`][314]
- [`runtime.onStartup`][315]
- [`runtime.onSuspend`][316]
- [`storage.StorageArea.get`][317]
- [`storage.StorageArea.set`][318]

Source Files:

- [`background.js`][319]
- [`example1.fake`][320]
- [`example2.fake`][321]
- [`manifest.json`][322]

## [File System Provider API Extension Example][323] {: #file-system-provider-api-extension-example }

Demonstrate features of the API like mounting, listing directories, etc for extensions.

Calls:

- [`fileSystemProvider.mount`][324]
- [`fileSystemProvider.onCloseFileRequested`][325]
- [`fileSystemProvider.onGetMetadataRequested`][326]
- [`fileSystemProvider.onMountRequested`][327]
- [`fileSystemProvider.onOpenFileRequested`][328]
- [`fileSystemProvider.onReadDirectoryRequested`][329]
- [`fileSystemProvider.onReadFileRequested`][330]
- [`fileSystemProvider.onUnmountRequested`][331]
- [`fileSystemProvider.unmount`][332]
- [`runtime.lastError`][333]

Source Files:

- [`background.js`][334]
- [`manifest.json`][335]

## [Advanced Font Settings][336] {: #advanced-font-settings }

Customize per-script font settings.

Calls:

- [`fontSettings.clearDefaultFixedFontSize`][337]
- [`fontSettings.clearDefaultFontSize`][338]
- [`fontSettings.clearFont`][339]
- [`fontSettings.clearMinimumFontSize`][340]
- [`fontSettings.getDefaultFixedFontSize`][341]
- [`fontSettings.getDefaultFontSize`][342]
- [`fontSettings.getFont`][343]
- [`fontSettings.getFontList`][344]
- [`fontSettings.getMinimumFontSize`][345]
- [`fontSettings.onDefaultFixedFontSizeChanged`][346]
- [`fontSettings.onDefaultFontSizeChanged`][347]
- [`fontSettings.onFontChanged`][348]
- [`fontSettings.onMinimumFontSizeChanged`][349]
- [`fontSettings.setDefaultFixedFontSize`][350]
- [`fontSettings.setDefaultFontSize`][351]
- [`fontSettings.setFont`][352]
- [`fontSettings.setMinimumFontSize`][353]

Source Files:

- [`fonts128.png`][354]
- [`fonts16.png`][355]
- [`manifest.json`][356]
- [`options.html`][357]
- [`options.js`][358]
- [`pending_changes.js`][359]
- [`slider.css`][360]
- [`slider.js`][361]
- [`js/cr.js`][362]
- [`css/chrome_shared.css`][363]
- [`css/overlay.css`][364]
- [`css/uber_shared.css`][365]
- [`css/widgets.css`][366]
- [`images/disabled_select.png`][367]
- [`images/select.png`][368]
- [`images/x-hover.png`][369]
- [`images/x-pressed.png`][370]
- [`images/x.png`][371]
- [`images/slider/slide_bar_center.png`][372]
- [`images/slider/slide_bar_disabled_center.png`][373]
- [`images/slider/slide_bar_disabled_left.png`][374]
- [`images/slider/slide_bar_disabled_right.png`][375]
- [`images/slider/slide_bar_fill_center.png`][376]
- [`images/slider/slide_bar_fill_left.png`][377]
- [`images/slider/slider_bar_right.png`][378]
- [`images/slider/slider_thumb.png`][379]
- [`images/slider/slider_thumb_disabled.png`][380]
- [`images/slider/slider_thumb_down.png`][381]
- [`images/slider/slider_thumb_hover.png`][382]
- [`js/cr/ui.js`][383]
- [`js/cr/ui/overlay.js`][384]

## [History Override][385] {: #history-override }

Overrides the History Page

Calls:

- [`history.deleteAll`][386]
- [`history.deleteUrl`][387]
- [`history.search`][388]

Source Files:

- [`history.html`][389]
- [`history128.png`][390]
- [`history16.png`][391]
- [`history32.png`][392]
- [`history48.png`][393]
- [`logic.js`][394]
- [`manifest.json`][395]
- [`style.css`][396]

## [Typed URL History][397] {: #typed-url-history }

Reads your history, and shows the top ten pages you go to by typing the URL.

Calls:

- [`history.getVisits`][398]
- [`history.search`][399]
- [`tabs.create`][400]

Source Files:

- [`clock.png`][401]
- [`manifest.json`][402]
- [`typedUrls.html`][403]
- [`typedUrls.js`][404]

## [CLD][405] {: #cld }

Displays the language of a tab

Calls:

- [`browserAction.setBadgeText`][406]
- [`tabs.detectLanguage`][407]
- [`tabs.onSelectionChanged`][408]
- [`tabs.onUpdated`][409]
- [`tabs.query`][410]

Source Files:

- [`background.js`][411]
- [`manifest.json`][412]

## [Detect Language][413] {: #detect-language }

Detects up to 3 languages and their percentages of the provided string

Calls:

- [`i18n.detectLanguage`][414]

Source Files:

- [`icon.png`][415]
- [`manifest.json`][416]
- [`popup.html`][417]
- [`popup.js`][418]

## [AcceptLanguage][419] {: #acceptlanguage }

Returns accept languages of the browser

Calls:

- [`i18n.getAcceptLanguages`][420]
- [`i18n.getMessage`][421]

Source Files:

- [`icon.png`][422]
- [`manifest.json`][423]
- [`popup.html`][424]
- [`popup.js`][425]
- [`_locales/en_US/messages.json`][426]
- [`_locales/es/messages.json`][427]
- [`_locales/sr/messages.json`][428]

## [Minimal Localized Hosted App][429] {: #minimal-localized-hosted-app }

This is the minimal set of data required to upload a localized hosted application to the web store.

Calls:

Source Files:

- [`icon128.png`][430]
- [`manifest.json`][431]
- [`_locales/en/messages.json`][432]
- [`_locales/de/messages.json`][433]

## [Idle - Simple Example][434] {: #idle---simple-example }

Demonstrates the Idle API

Calls:

- [`browserAction.onClicked`][435]
- [`extension.getBackgroundPage`][436]
- [`idle.onStateChanged`][437]
- [`idle.queryState`][438]

Source Files:

- [`background.js`][439]
- [`history.html`][440]
- [`history.js`][441]
- [`manifest.json`][442]
- [`sample-128.png`][443]
- [`sample-16.png`][444]
- [`sample-19.png`][445]
- [`sample-48.png`][446]

## [Test IME][447] {: #test-ime }

A simple IME that converts all keystrokes to upper case.

Calls:

- [`input.ime`][448]
- [`input.ime.commitText`][449]
- [`input.ime.onActivate`][450]
- [`input.ime.onBlur`][451]
- [`input.ime.onDeactivated`][452]
- [`input.ime.onFocus`][453]
- [`input.ime.onKeyEvent`][454]

Source Files:

- [`icon.png`][455]
- [`main.js`][456]
- [`manifest.json`][457]

## [Message Timer][458] {: #message-timer }

Times how long it takes to send a message to a content script and back.

Calls:

- [`runtime.onConnect`][459]
- [`runtime.onMessage`][460]
- [`tabs.connect`][461]
- [`tabs.query`][462]
- [`tabs.sendMessage`][463]

Source Files:

- [`clock.png`][464]
- [`manifest.json`][465]
- [`page.js`][466]
- [`popup.html`][467]
- [`popup.js`][468]

## [Native Messaging Example][469] {: #native-messaging-example }

Send a message to a native application.

Calls:

- [`runtime.connectNative`][470]

Source Files:

- [`icon-128.png`][471]
- [`main.html`][472]
- [`main.js`][473]
- [`manifest.json`][474]

## [Notification Demo][475] {: #notification-demo }

Shows off desktop notifications, which are "toast" windows that pop up on the desktop.

Calls:

Source Files:

- [`128.png`][476]
- [`16.png`][477]
- [`48.png`][478]
- [`64.png`][479]
- [`background.js`][480]
- [`manifest.json`][481]
- [`options.html`][482]
- [`options.js`][483]
- [`style.css`][484]

## [Omnibox New Tab Search][485] {: #omnibox-new-tab-search }

Type 'nt' plus a search term into the Omnibox to open search in new tab.

Calls:

- [`omnibox.onInputEntered`][486]
- [`tabs.create`][487]

Source Files:

- [`background.js`][488]
- [`manifest.json`][489]
- [`newtab_search128.png`][490]
- [`newtab_search16.png`][491]
- [`newtab_search32.png`][492]
- [`newtab_search48.png`][493]

## [Omnibox Example][494] {: #omnibox-example }

To use, type 'omnix' plus a search term into the Omnibox.

Calls:

- [`omnibox.onInputChanged`][495]
- [`omnibox.onInputEntered`][496]

Source Files:

- [`background.js`][497]
- [`manifest.json`][498]

## [Blank new tab page][499] {: #blank-new-tab-page }

Override the new tab page with a blank one

Calls:

Source Files:

- [`blank.html`][500]
- [`manifest.json`][501]

## [iGoogle new tab page][502] {: #igoogle-new-tab-page }

Override the new tab page with iGoogle

Calls:

Source Files:

- [`manifest.json`][503]
- [`redirect.html`][504]

## [Page action by content][505] {: #page-action-by-content }

Shows a page action for HTML pages containing a video

Calls:

- [`declarativeContent.PageStateMatcher`][506]
- [`declarativeContent.ShowPageAction`][507]
- [`runtime.onInstalled`][508]

Source Files:

- [`background.js`][509]
- [`manifest.json`][510]
- [`video-128.png`][511]
- [`video-19.png`][512]
- [`video-48.png`][513]

## [Page action by URL][514] {: #page-action-by-url }

Shows a page action for urls which have the letter 'g' in them.

Calls:

- [`declarativeContent.PageStateMatcher`][515]
- [`declarativeContent.ShowPageAction`][516]
- [`runtime.onInstalled`][517]

Source Files:

- [`background.js`][518]
- [`icon-128.png`][519]
- [`icon-19.png`][520]
- [`icon-48.png`][521]
- [`manifest.json`][522]

## [Animated Page Action][523] {: #animated-page-action }

This extension adds an animated browser action to the toolbar.

Calls:

- [`pageAction.hide`][524]
- [`pageAction.onClicked`][525]
- [`pageAction.setIcon`][526]
- [`pageAction.setTitle`][527]
- [`pageAction.show`][528]
- [`tabs.onSelectionChanged`][529]
- [`tabs.query`][530]

Source Files:

- [`background.html`][531]
- [`background.js`][532]
- [`icon1.png`][533]
- [`icon2.png`][534]
- [`manifest.json`][535]

## [Top Chrome Extension Questions][536] {: #top-chrome-extension-questions }

Sample demonstration of the optional permissions API.

Calls:

- [`permissions.contains`][537]
- [`permissions.onAdded`][538]
- [`permissions.onRemoved`][539]
- [`permissions.remove`][540]
- [`permissions.request`][541]
- [`tabs.create`][542]

Source Files:

- [`manifest.json`][543]
- [`options.html`][544]
- [`options.js`][545]
- [`popup.html`][546]
- [`popup.js`][547]
- [`images/icon.png`][548]

## [Keep Awake][549] {: #keep-awake }

Override system power-saving settings.

Calls:

- [`browserAction.onClicked`][550]
- [`browserAction.setIcon`][551]
- [`browserAction.setTitle`][552]
- [`i18n.getMessage`][553]
- [`power.releaseKeepAwake`][554]
- [`power.requestKeepAwake`][555]
- [`runtime.onInstalled`][556]
- [`runtime.onStartup`][557]
- [`storage.StorageArea.get`][558]
- [`storage.StorageArea.set`][559]

Source Files:

- [`background.js`][560]
- [`manifest.json`][561]
- [`images/day-19.png`][562]
- [`images/day-38.png`][563]
- [`images/icon-128.png`][564]
- [`images/icon-16.png`][565]
- [`images/icon-48.png`][566]
- [`images/night-19.png`][567]
- [`images/night-38.png`][568]
- [`images/sunset-19.png`][569]
- [`images/sunset-38.png`][570]
- [`_locales/en/messages.json`][571]

## [Block/allow third-party cookies API example extension][572] {: #block/allow-third-party-cookies-api-example-extension }

Sample extension which demonstrates how to access a preference.

Calls:

- [`extension.isAllowedIncognitoAccess`][573]

Source Files:

- [`advicedog.jpg`][574]
- [`manifest.json`][575]
- [`popup.css`][576]
- [`popup.html`][577]
- [`popup.js`][578]

## [Block/allow referrer API example extension][579] {: #block/allow-referrer-api-example-extension }

Sample extension which demonstrates how to access a preference.

Calls:

- [`extension.isAllowedIncognitoAccess`][580]

Source Files:

- [`advicedog.jpg`][581]
- [`manifest.json`][582]
- [`popup.css`][583]
- [`popup.html`][584]
- [`popup.js`][585]

## [Print Extension][586] {: #print-extension }

Sends print job directly to the printers installed on the Chromebook

Calls:

- [`printing.getPrinterInfo`][587]
- [`printing.getPrinters`][588]
- [`printing.submitJob`][589]
- [`runtime.lastError`][590]

Source Files:

- [`manifest.json`][591]
- [`printers.css`][592]
- [`printers.html`][593]
- [`printers.js`][594]
- [`test.pdf`][595]
- [`icons/icon.png`][596]
- [`icons/icon128.png`][597]
- [`icons/icon16.png`][598]
- [`icons/icon48.png`][599]

## [Print Job History][600] {: #print-job-history }

Reads your print history and displays the recent print jobs.

Calls:

- [`browserAction.setBadgeText`][601]
- [`printingMetrics.getPrintJobs`][602]
- [`printingMetrics.onPrintJobFinished`][603]
- [`storage.StorageArea.get`][604]
- [`storage.StorageArea.set`][605]

Source Files:

- [`background.js`][606]
- [`manifest.json`][607]
- [`print.png`][608]
- [`print_jobs.css`][609]
- [`print_jobs.html`][610]
- [`print_jobs.js`][611]

## [Process Monitor][612] {: #process-monitor }

Adds a browser action that monitors resource usage of all browser processes.

Calls:

- [`processes.onUpdatedWithMemory`][613]
- [`processes.terminate`][614]

Source Files:

- [`icon.png`][615]
- [`manifest.json`][616]
- [`popup.html`][617]
- [`popup.js`][618]

## [Show Tabs in Process][619] {: #show-tabs-in-process }

Adds a browser action showing which tabs share the current tab's process.

Calls:

- [`processes.getProcessIdForTab`][620]
- [`tabs.query`][621]
- [`tabs.update`][622]
- [`windows.getAll`][623]
- [`windows.getCurrent`][624]
- [`windows.update`][625]

Source Files:

- [`icon.png`][626]
- [`manifest.json`][627]
- [`popup.css`][628]
- [`popup.html`][629]
- [`popup.js`][630]

## [Stylizr][631] {: #stylizr }

Spruce up your pages with custom CSS.

Calls:

- [`extension.getURL`][632]
- [`runtime.lastError`][633]
- [`storage.local`][634]
- [`storage.StorageArea.clear`][635]
- [`storage.StorageArea.get`][636]
- [`storage.StorageArea.remove`][637]
- [`storage.StorageArea.set`][638]
- [`tabs.insertCSS`][639]

Source Files:

- [`icon.png`][640]
- [`manifest.json`][641]
- [`options.html`][642]
- [`options.js`][643]
- [`popup.html`][644]
- [`popup.js`][645]

## [Tab Capture Example][646] {: #tab-capture-example }

Capture a tab and play in a element in a separate tab.

Calls:

- [`browserAction.onClicked`][647]
- [`storage.StorageArea.get`][648]
- [`storage.StorageArea.set`][649]
- [`tabCapture.capture`][650]
- [`tabCapture.getMediaStreamId`][651]

Source Files:

- [`eventPage.js`][652]
- [`icon.png`][653]
- [`manifest.json`][654]
- [`options.html`][655]
- [`options.js`][656]
- [`receiver.html`][657]
- [`receiver.js`][658]

## [Tab Inspector][659] {: #tab-inspector }

Utility for working with the extension tabs api

Calls:

- [`browserAction.onClicked`][660]
- [`extension.getURL`][661]
- [`tabs.create`][662]
- [`tabs.get`][663]
- [`tabs.getAllInWindow`][664]
- [`tabs.move`][665]
- [`tabs.onAttached`][666]
- [`tabs.onCreated`][667]
- [`tabs.onDetached`][668]
- [`tabs.onMoved`][669]
- [`tabs.onRemoved`][670]
- [`tabs.onSelectionChanged`][671]
- [`tabs.onUpdated`][672]
- [`tabs.query`][673]
- [`tabs.remove`][674]
- [`tabs.update`][675]
- [`windows.create`][676]
- [`windows.get`][677]
- [`windows.getAll`][678]
- [`windows.getCurrent`][679]
- [`windows.getLastFocused`][680]
- [`windows.onCreated`][681]
- [`windows.onFocusChanged`][682]
- [`windows.onRemoved`][683]
- [`windows.remove`][684]
- [`windows.update`][685]

Source Files:

- [`background.js`][686]
- [`jstemplate_compiled.js`][687]
- [`manifest.json`][688]
- [`tabs_api.html`][689]
- [`tabs_api.js`][690]

## [Keyboard Pin][691] {: #keyboard-pin }

Creates a keyboard shortcut (Alt + Shift + P) to toggle the pinned state of the currently selected
tab

Calls:

- [`commands.onCommand`][692]
- [`tabs.query`][693]
- [`tabs.update`][694]

Source Files:

- [`README`][695]
- [`background.js`][696]
- [`manifest.json`][697]

## [Test Screenshot Extension][698] {: #test-screenshot-extension }

Demonstrate screenshot functionality in the chrome.tabs api.

Calls:

- [`browserAction.onClicked`][699]
- [`extension.getURL`][700]
- [`extension.getViews`][701]
- [`tabs.captureVisibleTab`][702]
- [`tabs.create`][703]
- [`tabs.onUpdated`][704]

Source Files:

- [`background.js`][705]
- [`camera.png`][706]
- [`manifest.json`][707]
- [`screenshot.html`][708]
- [`screenshot.js`][709]
- [`white.png`][710]

## [Tabs Zoom API Demo][711] {: #tabs-zoom-api-demo }

This extension allows the user to explore features of the new tabs zoom api.

Calls:

- [`runtime.lastError`][712]
- [`tabs.getZoom`][713]
- [`tabs.getZoomSettings`][714]
- [`tabs.onZoomChange`][715]
- [`tabs.query`][716]
- [`tabs.setZoom`][717]
- [`tabs.setZoomSettings`][718]

Source Files:

- [`README`][719]
- [`background.js`][720]
- [`manifest.json`][721]
- [`popup.html`][722]
- [`popup.js`][723]
- [`zoom16.png`][724]
- [`zoom19.png`][725]
- [`zoom48.png`][726]

## [Top Sites][727] {: #top-sites }

Shows the top sites in a browser action

Calls:

- [`tabs.create`][728]
- [`topSites.get`][729]

Source Files:

- [`icon.png`][730]
- [`manifest.json`][731]
- [`popup.html`][732]
- [`popup.js`][733]

## [NTP prototyping extension][734] {: #ntp-prototyping-extension }

extension to prototype new NTP designs

Calls:

- [`topSites.get`][735]

Source Files:

- [`manifest.json`][736]
- [`newTab.css`][737]
- [`newTab.html`][738]
- [`newTab.js`][739]

## [Console TTS Engine][740] {: #console-tts-engine }

A "silent" TTS engine that prints text to a small window rather than synthesizing speech.

Calls:

- [`extension.getViews`][741]
- [`ttsEngine.onSpeak`][742]
- [`ttsEngine.onStop`][743]
- [`windows.create`][744]
- [`windows.getCurrent`][745]
- [`windows.onRemoved`][746]

Source Files:

- [`console_tts_engine.html`][747]
- [`console_tts_engine.js`][748]
- [`manifest.json`][749]

## [Drink Water Event Popup][750] {: #drink-water-event-popup }

Demonstrates usage and features of the event page by reminding user to drink water

Calls:

- [`alarms.clearAll`][751]
- [`alarms.create`][752]
- [`alarms.onAlarm`][753]
- [`browserAction.setBadgeText`][754]
- [`notifications.create`][755]
- [`notifications.onButtonClicked`][756]
- [`storage.StorageArea.get`][757]
- [`storage.StorageArea.set`][758]

Source Files:

- [`background.js`][759]
- [`drink_water128.png`][760]
- [`drink_water16.png`][761]
- [`drink_water32.png`][762]
- [`drink_water48.png`][763]
- [`manifest.json`][764]
- [`popup.html`][765]
- [`popup.js`][766]
- [`stay_hydrated.png`][767]

## [WebNavigation Tech Demo][768] {: #webnavigation-tech-demo }

Demonstration of the WebNavigation extension API.

Calls:

- [`i18n.getMessage`][769]
- [`runtime.onMessage`][770]
- [`runtime.onStartup`][771]
- [`runtime.sendMessage`][772]
- [`storage.StorageArea.get`][773]
- [`storage.StorageArea.set`][774]
- [`webNavigation.onBeforeNavigate`][775]
- [`webNavigation.onCommitted`][776]
- [`webNavigation.onCompleted`][777]
- [`webNavigation.onCreatedNavigationTarget`][778]
- [`webNavigation.onErrorOccurred`][779]
- [`webNavigation.onHistoryStateUpdated`][780]
- [`webNavigation.onReferenceFragmentUpdated`][781]

Source Files:

- [`background.js`][782]
- [`icon.png`][783]
- [`manifest.json`][784]
- [`navigation_collector.js`][785]
- [`popup.css`][786]
- [`popup.html`][787]
- [`popup.js`][788]
- [`_locales/en/messages.json`][789]

## [Webview transparency][790] {: #webview-transparency }

Sample of the webview.captureVisibleRegion api

Calls:

Source Files:

- [`display.html`][791]
- [`main.js`][792]
- [`manifest.json`][793]
- [`test.html`][794]
- [`test.js`][795]
- [`test2.html`][796]

## [WebView Extension Communications Demo: App][797] {: #webview-extension-communications-demo:-app }

Calls:

- [`runtime.connect`][798]

Source Files:

- [`app.js`][799]
- [`main.js`][800]
- [`manifest.json`][801]
- [`test.html`][802]

## [WebView Extension Communications Demo: Extension][803] {: #webview-extension-communications-demo:-extension }

Provides content scripts to an app hosting a WebView.

Calls:

- [`runtime.id`][804]
- [`runtime.onConnectExternal`][805]

Source Files:

- [`background.js`][806]
- [`manifest.json`][807]

## [Merge Windows][808] {: #merge-windows }

Merges all of the browser's windows into the current window

Calls:

- [`browserAction.onClicked`][809]
- [`tabs.getAllInWindow`][810]
- [`tabs.move`][811]
- [`windows.getAll`][812]
- [`windows.getCurrent`][813]

Source Files:

- [`NOTICE`][814]
- [`arrow_in.png`][815]
- [`background.js`][816]
- [`manifest.json`][817]
- [`merge_windows_128.png`][818]
- [`merge_windows_48.png`][819]

## [Simple Background App][820] {: #simple-background-app }

Calls:

Source Files:

- [`README`][821]
- [`background.html`][822]
- [`index.html`][823]
- [`index.js`][824]
- [`manifest.json`][825]

## [Calculator][826] {: #calculator }

A simple calculator.

Calls:

Source Files:

- [`LICENSE`][827]
- [`calculator.html`][828]
- [`controller.js`][829]
- [`manifest.json`][830]
- [`model.js`][831]
- [`style.css`][832]
- [`view.js`][833]
- [`images/buttons_1x.png`][834]
- [`images/buttons_2x.png`][835]
- [`images/icon-128x128.png`][836]
- [`images/icon-16x16.png`][837]

## [App Launcher][838] {: #app-launcher }

Get access to your apps in a browser action

Calls:

- [`extension.getURL`][839]
- [`management.getAll`][840]
- [`management.launchApp`][841]
- [`tabs.create`][842]

Source Files:

- [`browser_action_icon.png`][843]
- [`icon.png`][844]
- [`manifest.json`][845]
- [`popup.css`][846]
- [`popup.html`][847]
- [`popup.js`][848]

## [Chromium Buildbot Monitor][849] {: #chromium-buildbot-monitor }

Displays the status of the Chromium buildbot in the toolbar. Click to see more detailed status in a
popup.

Calls:

- [`browserAction.setBadgeBackgroundColor`][850]
- [`browserAction.setBadgeText`][851]
- [`browserAction.setTitle`][852]
- [`extension.getBackgroundPage`][853]
- [`extension.getURL`][854]
- [`extension.getViews`][855]
- [`storage.StorageArea.get`][856]
- [`storage.StorageArea.set`][857]

Source Files:

- [`active_issues.js`][858]
- [`bg.js`][859]
- [`chromium.png`][860]
- [`icon.png`][861]
- [`manifest.json`][862]
- [`options.html`][863]
- [`options.js`][864]
- [`popup.css`][865]
- [`popup.html`][866]
- [`popup.js`][867]
- [`prefs.js`][868]
- [`try_status.js`][869]
- [`utils.js`][870]

## [Google Calendar Checker (by Google)][871] {: #google-calendar-checker-(by-google) }

Quickly see the time until your next meeting from any of your calendars. Click on the button to be
taken to your calendar.

Calls:

- [`browserAction.onClicked`][872]
- [`browserAction.setBadgeBackgroundColor`][873]
- [`browserAction.setBadgeText`][874]
- [`i18n.getMessage`][875]
- [`management.uninstallSelf`][876]
- [`notifications.clear`][877]
- [`notifications.create`][878]
- [`notifications.onButtonClicked`][879]
- [`notifications.onClicked`][880]
- [`runtime.getURL`][881]
- [`runtime.id`][882]
- [`runtime.onInstalled`][883]
- [`tabs.create`][884]

Source Files:

- [`manifest.json`][885]
- [`views/options.html`][886]
- [`javascript/background.js`][887]
- [`javascript/options.js`][888]
- [`images/icon-128.png`][889]
- [`images/icon-16.png`][890]
- [`images/icon-19.png`][891]
- [`images/icon-38.png`][892]
- [`images/icon-48.png`][893]
- [`_locales/sr/messages.json`][894]
- [`_locales/sk/messages.json`][895]
- [`_locales/vi/messages.json`][896]
- [`_locales/pt_BR/messages.json`][897]
- [`_locales/hu/messages.json`][898]
- [`_locales/fi/messages.json`][899]
- [`_locales/el/messages.json`][900]
- [`_locales/es/messages.json`][901]
- [`_locales/de/messages.json`][902]
- [`_locales/lv/messages.json`][903]
- [`_locales/nl/messages.json`][904]
- [`_locales/th/messages.json`][905]
- [`_locales/ja/messages.json`][906]
- [`_locales/ca/messages.json`][907]
- [`_locales/cs/messages.json`][908]
- [`_locales/id/messages.json`][909]
- [`_locales/nb/messages.json`][910]
- [`_locales/fr/messages.json`][911]
- [`_locales/pl/messages.json`][912]
- [`_locales/en/messages.json`][913]
- [`_locales/zh_TW/messages.json`][914]
- [`_locales/he/messages.json`][915]
- [`_locales/es_419/messages.json`][916]
- [`_locales/it/messages.json`][917]
- [`_locales/pt_PT/messages.json`][918]
- [`_locales/lt/messages.json`][919]
- [`_locales/et/messages.json`][920]
- [`_locales/en_GB/messages.json`][921]
- [`_locales/fil/messages.json`][922]
- [`_locales/sv/messages.json`][923]
- [`_locales/hr/messages.json`][924]
- [`_locales/ko/messages.json`][925]
- [`_locales/da/messages.json`][926]
- [`_locales/ro/messages.json`][927]
- [`_locales/bg/messages.json`][928]
- [`_locales/ar/messages.json`][929]
- [`_locales/ru/messages.json`][930]
- [`_locales/hi/messages.json`][931]
- [`_locales/sl/messages.json`][932]
- [`_locales/uk/messages.json`][933]
- [`_locales/tr/messages.json`][934]
- [`_locales/zh_CN/messages.json`][935]

## [CatBlock][936] {: #catblock }

I can't has cheezburger!

Calls:

- [`webRequest.onBeforeRequest`][937]

Source Files:

- [`background.js`][938]
- [`loldogs.js`][939]
- [`manifest.json`][940]

## [Catifier][941] {: #catifier }

Moar cats!

Calls:

- [`declarativeWebRequest.IgnoreRules`][942]
- [`declarativeWebRequest.RedirectRequest`][943]
- [`declarativeWebRequest.RequestMatcher`][944]
- [`runtime.lastError`][945]
- [`runtime.onInstalled`][946]

Source Files:

- [`event_page.js`][947]
- [`manifest.json`][948]

## [Chromium Search][949] {: #chromium-search }

Add support to the omnibox to search the Chromium source code.

Calls:

- [`omnibox.onInputCancelled`][950]
- [`omnibox.onInputChanged`][951]
- [`omnibox.onInputEntered`][952]
- [`omnibox.onInputStarted`][953]
- [`omnibox.setDefaultSuggestion`][954]
- [`tabs.query`][955]
- [`tabs.update`][956]

Source Files:

- [`background.js`][957]
- [`manifest.json`][958]

## [Constant Context][959] {: #constant-context }

Highlights elements with keywords on developer.chrome

Calls:

- [`declarativeContent.PageStateMatcher`][960]
- [`declarativeContent.ShowPageAction`][961]
- [`runtime.onInstalled`][962]
- [`storage.StorageArea.clear`][963]
- [`storage.StorageArea.get`][964]
- [`storage.StorageArea.set`][965]
- [`tabs.executeScript`][966]

Source Files:

- [`background.js`][967]
- [`content_script.js`][968]
- [`manifest.json`][969]
- [`popup.html`][970]
- [`popup.js`][971]
- [`images/cc128.png`][972]
- [`images/cc16.png`][973]
- [`images/cc32.png`][974]
- [`images/cc48.png`][975]

## [Download Images][976] {: #download-images }

Displays all webpage images and allows user to download

Calls:

- [`declarativeContent.PageStateMatcher`][977]
- [`declarativeContent.ShowPageAction`][978]
- [`downloads.download`][979]
- [`runtime.lastError`][980]
- [`runtime.onInstalled`][981]
- [`storage.StorageArea.get`][982]
- [`storage.StorageArea.set`][983]
- [`tabs.create`][984]
- [`tabs.executeScript`][985]

Source Files:

- [`background.js`][986]
- [`manifest.json`][987]
- [`options.html`][988]
- [`options.js`][989]
- [`popup.html`][990]
- [`popup.js`][991]
- [`images/download_image128.png`][992]
- [`images/download_image16.png`][993]
- [`images/download_image32.png`][994]
- [`images/download_image48.png`][995]

## [Email this page (by Google)][996] {: #email-this-page-(by-google) }

This extension adds an email button to the toolbar which allows you to email the page link using
your default mail client or Gmail.

Calls:

- [`browserAction.onClicked`][997]
- [`runtime.connect`][998]
- [`runtime.onConnect`][999]
- [`tabs.create`][1000]
- [`tabs.executeScript`][1001]
- [`tabs.update`][1002]

Source Files:

- [`background.js`][1003]
- [`content_script.js`][1004]
- [`email_16x16.png`][1005]
- [`mail_128x128.png`][1006]
- [`manifest.json`][1007]
- [`options.html`][1008]
- [`options.js`][1009]

## [Chrome Sounds][1010] {: #chrome-sounds }

Enjoy a more magical and immersive experience when browsing the web using the power of sound.

Calls:

- [`bookmarks.onCreated`][1011]
- [`bookmarks.onMoved`][1012]
- [`bookmarks.onRemoved`][1013]
- [`extension.getBackgroundPage`][1014]
- [`extension.onRequest`][1015]
- [`extension.sendRequest`][1016]
- [`tabs.get`][1017]
- [`tabs.onAttached`][1018]
- [`tabs.onCreated`][1019]
- [`tabs.onDetached`][1020]
- [`tabs.onMoved`][1021]
- [`tabs.onRemoved`][1022]
- [`tabs.onSelectionChanged`][1023]
- [`tabs.onUpdated`][1024]
- [`windows.onCreated`][1025]
- [`windows.onFocusChanged`][1026]
- [`windows.onRemoved`][1027]

Source Files:

- [`bg.js`][1028]
- [`content.js`][1029]
- [`icon.png`][1030]
- [`manifest.json`][1031]
- [`options.html`][1032]
- [`options.js`][1033]

## [Google Document List Viewer][1034] {: #google-document-list-viewer }

Demonstrates how to use OAuth to connect the Google Documents List Data API.

Calls:

- [`extension.getBackgroundPage`][1035]
- [`extension.getURL`][1036]
- [`tabs.create`][1037]
- [`tabs.onUpdated`][1038]
- [`tabs.query`][1039]
- [`tabs.remove`][1040]

Source Files:

- [`README`][1041]
- [`background.html`][1042]
- [`chrome_ex_oauth.html`][1043]
- [`chrome_ex_oauth.js`][1044]
- [`chrome_ex_oauthsimple.js`][1045]
- [`manifest.json`][1046]
- [`options.html`][1047]
- [`popup.html`][1048]
- [`img/docs_spreadsheets-128.gif`][1049]
- [`img/docs_spreadsheets-32.gif`][1050]
- [`img/docs_spreadsheets-48.gif`][1051]
- [`js/jquery-1.4.1.min.js`][1052]
- [`img/icons/audio.gif`][1053]
- [`img/icons/document.gif`][1054]
- [`img/icons/file.gif`][1055]
- [`img/icons/folder.gif`][1056]
- [`img/icons/form.gif`][1057]
- [`img/icons/pdf.gif`][1058]
- [`img/icons/presentation.gif`][1059]
- [`img/icons/spreadsheet.gif`][1060]

## [Google Mail Checker][1061] {: #google-mail-checker }

Displays the number of unread messages in your Google Mail inbox. You can also click the button to
open your inbox.

Calls:

- [`alarms.create`][1062]
- [`alarms.get`][1063]
- [`alarms.onAlarm`][1064]
- [`browserAction.onClicked`][1065]
- [`browserAction.setBadgeBackgroundColor`][1066]
- [`browserAction.setBadgeText`][1067]
- [`browserAction.setIcon`][1068]
- [`i18n.getMessage`][1069]
- [`runtime.onInstalled`][1070]
- [`runtime.onStartup`][1071]
- [`runtime.onStartup`][1072]
- [`tabs.create`][1073]
- [`tabs.getAllInWindow`][1074]
- [`tabs.onUpdated`][1075]
- [`tabs.update`][1076]
- [`webNavigation.onDOMContentLoaded`][1077]
- [`webNavigation.onDOMContentLoaded`][1078]
- [`webNavigation.onReferenceFragmentUpdated`][1079]
- [`webNavigation.onReferenceFragmentUpdated`][1080]
- [`windows.onCreated`][1081]

Source Files:

- [`background.html`][1082]
- [`background.js`][1083]
- [`gmail_logged_in.png`][1084]
- [`gmail_not_logged_in.png`][1085]
- [`icon_128.png`][1086]
- [`manifest.json`][1087]
- [`_locales/es/messages.json`][1088]
- [`_locales/nl/messages.json`][1089]
- [`_locales/pt_BR/messages.json`][1090]
- [`_locales/ar/messages.json`][1091]
- [`_locales/sk/messages.json`][1092]
- [`_locales/pt_PT/messages.json`][1093]
- [`_locales/he/messages.json`][1094]
- [`_locales/lv/messages.json`][1095]
- [`_locales/hr/messages.json`][1096]
- [`_locales/nb/messages.json`][1097]
- [`_locales/fil/messages.json`][1098]
- [`_locales/hi/messages.json`][1099]
- [`_locales/sv/messages.json`][1100]
- [`_locales/ko/messages.json`][1101]
- [`_locales/cs/messages.json`][1102]
- [`_locales/da/messages.json`][1103]
- [`_locales/sl/messages.json`][1104]
- [`_locales/pl/messages.json`][1105]
- [`_locales/es_419/messages.json`][1106]
- [`_locales/en_GB/messages.json`][1107]
- [`_locales/fi/messages.json`][1108]
- [`_locales/zh_CN/messages.json`][1109]
- [`_locales/en/messages.json`][1110]
- [`_locales/vi/messages.json`][1111]
- [`_locales/hu/messages.json`][1112]
- [`_locales/el/messages.json`][1113]
- [`_locales/th/messages.json`][1114]
- [`_locales/id/messages.json`][1115]
- [`_locales/bg/messages.json`][1116]
- [`_locales/ca/messages.json`][1117]
- [`_locales/sr/messages.json`][1118]
- [`_locales/zh_TW/messages.json`][1119]
- [`_locales/ro/messages.json`][1120]
- [`_locales/ja/messages.json`][1121]
- [`_locales/tr/messages.json`][1122]
- [`_locales/uk/messages.json`][1123]
- [`_locales/it/messages.json`][1124]
- [`_locales/fr/messages.json`][1125]
- [`_locales/et/messages.json`][1126]
- [`_locales/ru/messages.json`][1127]
- [`_locales/lt/messages.json`][1128]
- [`_locales/de/messages.json`][1129]

## [Imageinfo][1130] {: #imageinfo }

Get image info for images, including EXIF data

Calls:

- [`contextMenus.create`][1131]
- [`tabs.getCurrent`][1132]
- [`windows.create`][1133]
- [`windows.update`][1134]

Source Files:

- [`NOTICE`][1135]
- [`background.js`][1136]
- [`imageinfo-128.png`][1137]
- [`imageinfo-16.png`][1138]
- [`imageinfo-48.png`][1139]
- [`info.css`][1140]
- [`info.html`][1141]
- [`info.js`][1142]
- [`loader.gif`][1143]
- [`manifest.json`][1144]
- [`imageinfo/binaryajax.js`][1145]
- [`imageinfo/exif.js`][1146]
- [`imageinfo/imageinfo.js`][1147]
- [`imageinfo/readme.txt`][1148]

## [Chromium IRC App][1149] {: #chromium-irc-app }

Calls:

Source Files:

- [`manifest.json`][1150]

## [Managed Bookmarks][1151] {: #managed-bookmarks }

Adds bookmarks configured by your system administrator to Chrome.

Calls:

- [`bookmarks.create`][1152]
- [`bookmarks.getChildren`][1153]
- [`bookmarks.move`][1154]
- [`bookmarks.onChanged`][1155]
- [`bookmarks.onMoved`][1156]
- [`bookmarks.onRemoved`][1157]
- [`bookmarks.remove`][1158]
- [`bookmarks.removeTree`][1159]
- [`bookmarks.update`][1160]
- [`runtime.onInstalled`][1161]
- [`storage.StorageArea.get`][1162]
- [`storage.StorageArea.set`][1163]
- [`storage.StorageArea.get`][1164]
- [`storage.onChanged`][1165]

Source Files:

- [`background.js`][1166]
- [`manifest.json`][1167]
- [`schema.json`][1168]
- [`_locales/en/messages.json`][1169]

## [Mappy][1170] {: #mappy }

Finds addresses in the web page you're on and pops up a map window.

Calls:

- [`pageAction.setTitle`][1171]
- [`pageAction.show`][1172]
- [`runtime.onMessage`][1173]
- [`runtime.sendMessage`][1174]
- [`storage.StorageArea.get`][1175]
- [`storage.StorageArea.set`][1176]

Source Files:

- [`background.js`][1177]
- [`icon.png`][1178]
- [`manifest.json`][1179]
- [`mappy_content_script.js`][1180]
- [`marker.png`][1181]
- [`popup.css`][1182]
- [`popup.html`][1183]
- [`popup.js`][1184]

## [Google Maps][1185] {: #google-maps }

Calls:

Source Files:

- [`128.png`][1186]
- [`24.png`][1187]
- [`manifest.json`][1188]

## [News Reader (by Google)][1189] {: #news-reader-(by-google) }

Displays the latest stories from Google News in a popup.

Calls:

- [`extension.getURL`][1190]
- [`i18n.getMessage`][1191]
- [`tabs.create`][1192]

Source Files:

- [`manifest.json`][1193]
- [`images/buzz.png`][1194]
- [`images/delete-icon.png`][1195]
- [`images/fb.png`][1196]
- [`images/news.gif`][1197]
- [`images/news_action.png`][1198]
- [`images/news_icon.png`][1199]
- [`images/sprite_arrows.gif`][1200]
- [`images/twitter.png`][1201]
- [`css/feed.css`][1202]
- [`css/options.css`][1203]
- [`javascript/feed.js`][1204]
- [`javascript/options.js`][1205]
- [`javascript/util.js`][1206]
- [`views/background.html`][1207]
- [`views/feed.html`][1208]
- [`views/options.html`][1209]
- [`_locales/en/messages.json`][1210]

## [News Reader][1211] {: #news-reader-1 }

Displays the first 5 items from the 'Google News - top news' RSS feed in a popup.

Calls:

- [`tabs.create`][1212]

Source Files:

- [`feed.css`][1213]
- [`feed.html`][1214]
- [`feed.js`][1215]
- [`feed_iframe.css`][1216]
- [`feed_iframe.js`][1217]
- [`manifest.json`][1218]
- [`news_action.png`][1219]
- [`news_icon.png`][1220]
- [`sprite_arrows.gif`][1221]

## [News Reader][1222] {: #news-reader-2 }

Displays the first 5 items from the '$Google$ News - top news' RSS feed in a popup.

Calls:

Source Files:

- [`feed.html`][1223]
- [`manifest.json`][1224]
- [`news_action.png`][1225]
- [`news_icon.png`][1226]
- [`sprite_arrows.gif`][1227]
- [`_locales/sr/messages.json`][1228]
- [`_locales/es/messages.json`][1229]
- [`_locales/en/messages.json`][1230]

## [No Cookies][1231] {: #no-cookies }

Removes 'Cookie' and 'Set-Cookie' headers.

Calls:

- [`webRequest.onBeforeSendHeaders`][1232]
- [`webRequest.onHeadersReceived`][1233]

Source Files:

- [`background.js`][1234]
- [`manifest.json`][1235]

## [Sample - OAuth Contacts][1236] {: #sample---oauth-contacts }

Uses OAuth to connect to Google's contacts service and display a list of your contacts.

Calls:

- [`browserAction.onClicked`][1237]
- [`browserAction.setIcon`][1238]
- [`extension.getBackgroundPage`][1239]
- [`extension.getURL`][1240]
- [`tabs.create`][1241]
- [`tabs.onUpdated`][1242]
- [`tabs.query`][1243]
- [`tabs.remove`][1244]

Source Files:

- [`NOTICE`][1245]
- [`README`][1246]
- [`background.js`][1247]
- [`chrome_ex_oauth.html`][1248]
- [`chrome_ex_oauth.js`][1249]
- [`chrome_ex_oauthsimple.js`][1250]
- [`contacts.html`][1251]
- [`contacts.js`][1252]
- [`manifest.json`][1253]
- [`onload.js`][1254]
- [`img/icon-128.png`][1255]
- [`img/icon-19-off.png`][1256]
- [`img/icon-19-on.png`][1257]
- [`img/icon-48.png`][1258]

## [Optional Permissions New Tab][1259] {: #optional-permissions-new-tab }

Demonstrates optional permissions in extensions

Calls:

- [`permissions.contains`][1260]
- [`permissions.request`][1261]
- [`storage.StorageArea.get`][1262]
- [`storage.StorageArea.set`][1263]
- [`topSites.get`][1264]

Source Files:

- [`logic.js`][1265]
- [`manifest.json`][1266]
- [`newtab.html`][1267]
- [`style.css`][1268]
- [`images/optional_permissions128.png`][1269]
- [`images/optional_permissions16.png`][1270]
- [`images/optional_permissions32.png`][1271]
- [`images/optional_permissions48.png`][1272]

## [Per-plugin content settings][1273] {: #per-plugin-content-settings }

Customize your content setting for different plugins.

Calls:

- [`contentSettings.plugins`][1274]
- [`contentSettings.ContentSetting.clear`][1275]
- [`contentSettings.ContentSetting.getResourceIdentifiers`][1276]
- [`contentSettings.ContentSetting.set`][1277]
- [`i18n.getMessage`][1278]
- [`runtime.lastError`][1279]

Source Files:

- [`bunny128.png`][1280]
- [`bunny48.png`][1281]
- [`manifest.json`][1282]
- [`options.html`][1283]
- [`js/chrome_stubs.js`][1284]
- [`js/main.js`][1285]
- [`js/plugin_list.js`][1286]
- [`js/plugin_list_test.html`][1287]
- [`js/plugin_settings.js`][1288]
- [`js/plugin_settings_test.html`][1289]
- [`js/rule_list.js`][1290]
- [`js/rule_list_test.html`][1291]
- [`css/plugin_list.css`][1292]
- [`css/rule_list.css`][1293]
- [`domui/css/button.css`][1294]
- [`domui/css/chrome_shared.css`][1295]
- [`domui/css/list.css`][1296]
- [`domui/css/select.css`][1297]
- [`options/images/close_bar.png`][1298]
- [`options/images/close_bar_h.png`][1299]
- [`options/images/close_bar_p.png`][1300]
- [`options/js/deletable_item_list.js`][1301]
- [`options/js/inline_editable_list.js`][1302]
- [`domui/images/select.png`][1303]
- [`domui/js/cr.js`][1304]
- [`domui/js/util.js`][1305]
- [`_locales/en/messages.json`][1306]
- [`options/css/list.css`][1307]
- [`domui/js/cr/event_target.js`][1308]
- [`domui/js/cr/ui.js`][1309]
- [`domui/js/cr/ui/array_data_model.js`][1310]
- [`domui/js/cr/ui/list.js`][1311]
- [`domui/js/cr/ui/list_item.js`][1312]
- [`domui/js/cr/ui/list_selection_controller.js`][1313]
- [`domui/js/cr/ui/list_selection_model.js`][1314]
- [`domui/js/cr/ui/list_single_selection_model.js`][1315]

## [Proxy Extension API Sample][1316] {: #proxy-extension-api-sample }

Set Chrome-specific proxies; a demonstration of Chrome's Proxy API

Calls:

- [`browserAction.setBadgeBackgroundColor`][1317]
- [`browserAction.setBadgeText`][1318]
- [`browserAction.setTitle`][1319]
- [`extension.isAllowedIncognitoAccess`][1320]
- [`extension.onRequest`][1321]
- [`extension.sendRequest`][1322]
- [`i18n.getMessage`][1323]
- [`proxy.onProxyError`][1324]
- [`runtime.lastError`][1325]

Source Files:

- [`background.js`][1326]
- [`icon128.png`][1327]
- [`icon16.png`][1328]
- [`icon32.png`][1329]
- [`icon48.png`][1330]
- [`manifest.json`][1331]
- [`popup.css`][1332]
- [`popup.html`][1333]
- [`popup.js`][1334]
- [`proxy_error_handler.js`][1335]
- [`proxy_form_controller.js`][1336]
- [`test/jsunittest.js`][1337]
- [`test/proxy_form_controller_test.html`][1338]
- [`test/proxy_form_controller_test.js`][1339]
- [`test/unittest.css`][1340]
- [`_locales/en/messages.json`][1341]

## [Speak Selection][1342] {: #speak-selection }

Speaks the current selection out loud.

Calls:

- [`browserAction.onClicked`][1343]
- [`browserAction.setIcon`][1344]
- [`extension.getURL`][1345]
- [`extension.onRequest`][1346]
- [`extension.sendRequest`][1347]
- [`tabs.create`][1348]
- [`tabs.executeScript`][1349]
- [`tabs.sendRequest`][1350]
- [`tts.getVoices`][1351]
- [`tts.speak`][1352]
- [`tts.stop`][1353]
- [`windows.getAll`][1354]

Source Files:

- [`SpeakSel128.png`][1355]
- [`SpeakSel16.png`][1356]
- [`SpeakSel19-active.png`][1357]
- [`SpeakSel19.png`][1358]
- [`SpeakSel256.png`][1359]
- [`SpeakSel48.png`][1360]
- [`background.js`][1361]
- [`content_script.js`][1362]
- [`keycodes.js`][1363]
- [`manifest.json`][1364]
- [`options.html`][1365]
- [`options.js`][1366]
- [`tabs.js`][1367]

## [Talking Alarm Clock][1368] {: #talking-alarm-clock }

A clock with two configurable alarms that will play a sound and speak a phrase of your choice.

Calls:

- [`browserAction.setIcon`][1369]
- [`runtime.connect`][1370]
- [`runtime.onConnect`][1371]
- [`tts.getVoices`][1372]
- [`tts.speak`][1373]
- [`tts.stop`][1374]

Source Files:

- [`background.js`][1375]
- [`blank-clock-150.png`][1376]
- [`blank-clock-ring1-150.png`][1377]
- [`blank-clock-ring2-150.png`][1378]
- [`clock-128.png`][1379]
- [`clock-16.png`][1380]
- [`clock-19.png`][1381]
- [`clock-256.png`][1382]
- [`clock-48.png`][1383]
- [`clock-disabled-19.png`][1384]
- [`clock-highlighted-19.png`][1385]
- [`common.js`][1386]
- [`credits.html`][1387]
- [`manifest.json`][1388]
- [`play.png`][1389]
- [`popup.html`][1390]
- [`popup.js`][1391]
- [`audio/cuckoo.ogg`][1392]
- [`audio/digital.ogg`][1393]
- [`audio/metal.ogg`][1394]
- [`audio/ringing.ogg`][1395]
- [`audio/rooster.ogg`][1396]

## [TTS Debug][1397] {: #tts-debug }

Tool for developers of Chrome TTS engine extensions to help them test their engines are implementing
the API correctly.

Calls:

- [`tts.getVoices`][1398]
- [`tts.speak`][1399]
- [`tts.stop`][1400]

Source Files:

- [`128.png`][1401]
- [`16.png`][1402]
- [`256.png`][1403]
- [`manifest.json`][1404]
- [`pacman.gif`][1405]
- [`ttsdebug.css`][1406]
- [`ttsdebug.html`][1407]
- [`ttsdebug.js`][1408]

## [TTS Demo][1409] {: #tts-demo }

Demo Chrome's synthesized text-to-speech capabilities.

Calls:

- [`runtime.lastError`][1410]
- [`tts.getVoices`][1411]
- [`tts.isSpeaking`][1412]
- [`tts.speak`][1413]
- [`tts.stop`][1414]

Source Files:

- [`128.png`][1415]
- [`16.png`][1416]
- [`256.png`][1417]
- [`manifest.json`][1418]
- [`ttsdemo.html`][1419]
- [`ttsdemo.js`][1420]

## [Sandboxed Frame][1421] {: #sandboxed-frame }

Demonstrate use of handlebars inside a sandboxed frame

Calls:

- [`browserAction.onClicked`][1422]

Source Files:

- [`LICENSE.handlebars`][1423]
- [`eventpage.html`][1424]
- [`eventpage.js`][1425]
- [`handlebars-1.0.0.beta.6.js`][1426]
- [`icon.png`][1427]
- [`manifest.json`][1428]
- [`sandbox.html`][1429]

## [Tab Shortcuts][1430] {: #tab-shortcuts }

Allows pinning and duplication of tabs via keyboard shortcuts.

Calls:

- [`commands.onCommand`][1431]
- [`tabs.duplicate`][1432]
- [`tabs.update`][1433]

Source Files:

- [`manifest.json`][1434]
- [`tab_shortcuts.js`][1435]

## [Event Tracking with Google Analytics][1436] {: #event-tracking-with-google-analytics }

A sample extension which uses Google Analytics to track usage.

Calls:

Source Files:

- [`analytics-extension-icon-128.png`][1437]
- [`analytics-extension-icon-19.png`][1438]
- [`analytics-extension-icon-48.png`][1439]
- [`manifest.json`][1440]
- [`popup.html`][1441]
- [`popup.js`][1442]

## [Broken Background Color][1443] {: #broken-background-color }

Fix an Extension!

Calls:

- [`declarativeContent.PageStateMatcher`][1444]
- [`declarativeContent.ShowPageAction`][1445]
- [`storage.StorageArea.get`][1446]
- [`storage.StorageArea.set`][1447]
- [`tabs.executeScript`][1448]

Source Files:

- [`background.js`][1449]
- [`manifest.json`][1450]
- [`options.html`][1451]
- [`options.js`][1452]
- [`popup.html`][1453]
- [`popup.js`][1454]
- [`images/get_started128.png`][1455]
- [`images/get_started16.png`][1456]
- [`images/get_started32.png`][1457]
- [`images/get_started48.png`][1458]

## [Getting Started Example][1459] {: #getting-started-example-1 }

Build an Extension!

Calls:

- [`runtime.onInstalled`][1460]
- [`storage.StorageArea.get`][1461]
- [`storage.StorageArea.set`][1462]

Source Files:

- [`background.js`][1463]
- [`images.zip`][1464]
- [`manifest.json`][1465]
- [`options.html`][1466]
- [`options.js`][1467]
- [`popup.html`][1468]
- [`popup.js`][1469]
- [`images/get_started128.png`][1470]
- [`images/get_started16.png`][1471]
- [`images/get_started32.png`][1472]
- [`images/get_started48.png`][1473]

## [Getting Started Example][1474] {: #getting-started-example-2 }

Build an Extension!

Calls:

- [`declarativeContent.PageStateMatcher`][1475]
- [`declarativeContent.ShowPageAction`][1476]
- [`runtime.onInstalled`][1477]
- [`storage.StorageArea.get`][1478]
- [`storage.StorageArea.set`][1479]
- [`tabs.executeScript`][1480]
- [`tabs.query`][1481]

Source Files:

- [`background.js`][1482]
- [`manifest.json`][1483]
- [`options.html`][1484]
- [`options.js`][1485]
- [`popup.html`][1486]
- [`popup.js`][1487]
- [`images/get_started128.png`][1488]
- [`images/get_started16.png`][1489]
- [`images/get_started32.png`][1490]
- [`images/get_started48.png`][1491]

## [Getting started example][1492] {: #getting-started-example-3 }

This extension allows the user to change the background color of the current page.

Calls:

- [`runtime.lastError`][1493]
- [`storage.local`][1494]
- [`storage.sync`][1495]
- [`storage.StorageArea.get`][1496]
- [`storage.StorageArea.set`][1497]
- [`tabs.executeScript`][1498]
- [`tabs.query`][1499]

Source Files:

- [`icon.png`][1500]
- [`manifest.json`][1501]
- [`popup.html`][1502]
- [`popup.js`][1503]

## [Hello Extensions][1504] {: #hello-extensions }

Base Level Extension

Calls:

Source Files:

- [`hello.html`][1505]
- [`hello_extensions.png`][1506]
- [`manifest.json`][1507]

## [OAuth Tutorial FriendBlock][1508] {: #oauth-tutorial-friendblock-1 }

Uses OAuth to connect to Google's People API and display contacts photos.

Calls:

- [`browserAction.onClicked`][1509]
- [`identity.getAuthToken`][1510]
- [`tabs.create`][1511]

Source Files:

- [`background.js`][1512]
- [`index.html`][1513]
- [`manifest.json`][1514]
- [`oauth.js`][1515]

## [OAuth Tutorial FriendBlock][1516] {: #oauth-tutorial-friendblock-2 }

Uses OAuth to connect to Google's People API and display contacts photos.

Calls:

- [`browserAction.onClicked`][1517]
- [`identity.getAuthToken`][1518]
- [`tabs.create`][1519]

Source Files:

- [`background.js`][1520]
- [`index.html`][1521]
- [`manifest.json`][1522]
- [`oauth.js`][1523]

[1]: examples/api/bookmarks/basic.zip
[2]: https://developer.chrome.com/extensions/bookmarks#method-create
[3]: https://developer.chrome.com/extensions/bookmarks#method-getTree
[4]: https://developer.chrome.com/extensions/bookmarks#method-remove
[5]: https://developer.chrome.com/extensions/bookmarks#method-update
[6]: https://developer.chrome.com/extensions/tabs#method-create
[7]: https://developer.chrome.com/extensions/examples/api/bookmarks/basic/icon.png
[8]: https://developer.chrome.com/extensions/examples/api/bookmarks/basic/manifest.json
[9]: https://developer.chrome.com/extensions/examples/api/bookmarks/basic/popup.html
[10]: https://developer.chrome.com/extensions/examples/api/bookmarks/basic/popup.js
[11]: examples/api/browserAction/make_page_red.zip
[12]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[13]: https://developer.chrome.com/extensions/tabs#method-executeScript
[14]: https://developer.chrome.com/extensions/examples/api/browserAction/make_page_red/background.js
[15]: https://developer.chrome.com/extensions/examples/api/browserAction/make_page_red/manifest.json
[16]: examples/api/browserAction/print.zip
[17]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[18]: https://developer.chrome.com/extensions/tabs#method-executeScript
[19]: https://developer.chrome.com/extensions/examples/api/browserAction/print/background.js
[20]: https://developer.chrome.com/extensions/examples/api/browserAction/print/manifest.json
[21]: https://developer.chrome.com/extensions/examples/api/browserAction/print/print_16x16.png
[22]: examples/api/browserAction/set_icon_path.zip
[23]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[24]: https://developer.chrome.com/extensions/browserAction#method-setIcon
[25]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[26]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[27]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[28]: https://developer.chrome.com/extensions/examples/api/browserAction/set_icon_path/background.js
[29]: https://developer.chrome.com/extensions/examples/api/browserAction/set_icon_path/icon1.png
[30]: https://developer.chrome.com/extensions/examples/api/browserAction/set_icon_path/icon2.png
[31]: https://developer.chrome.com/extensions/examples/api/browserAction/set_icon_path/icon3.png
[32]: https://developer.chrome.com/extensions/examples/api/browserAction/set_icon_path/icon4.png
[33]: https://developer.chrome.com/extensions/examples/api/browserAction/set_icon_path/icon5.png
[34]: https://developer.chrome.com/extensions/examples/api/browserAction/set_icon_path/manifest.json
[35]: examples/api/browserAction/set_page_color.zip
[36]: https://developer.chrome.com/extensions/tabs#method-executeScript
[37]: https://developer.chrome.com/extensions/examples/api/browserAction/set_page_color/icon.png
[38]:
  https://developer.chrome.com/extensions/examples/api/browserAction/set_page_color/manifest.json
[39]: https://developer.chrome.com/extensions/examples/api/browserAction/set_page_color/popup.html
[40]: https://developer.chrome.com/extensions/examples/api/browserAction/set_page_color/popup.js
[41]: examples/api/browsingData/basic.zip
[42]: https://developer.chrome.com/extensions/browsingData#method-remove
[43]: https://developer.chrome.com/extensions/examples/api/browsingData/basic/icon.png
[44]: https://developer.chrome.com/extensions/examples/api/browsingData/basic/manifest.json
[45]: https://developer.chrome.com/extensions/examples/api/browsingData/basic/popup.css
[46]: https://developer.chrome.com/extensions/examples/api/browsingData/basic/popup.html
[47]: https://developer.chrome.com/extensions/examples/api/browsingData/basic/popup.js
[48]: examples/api/commands.zip
[49]: https://developer.chrome.com/extensions/commands#event-onCommand
[50]: https://developer.chrome.com/extensions/examples/api/commands/background.js
[51]: https://developer.chrome.com/extensions/examples/api/commands/browser_action.html
[52]: https://developer.chrome.com/extensions/examples/api/commands/manifest.json
[53]: examples/api/contentSettings.zip
[54]: https://developer.chrome.com/extensions/contentSettings#method-ContentSetting-get
[55]: https://developer.chrome.com/extensions/contentSettings#method-ContentSetting-set
[56]: https://developer.chrome.com/extensions/tabs#method-query
[57]: https://developer.chrome.com/extensions/examples/api/contentSettings/contentSettings.png
[58]: https://developer.chrome.com/extensions/examples/api/contentSettings/manifest.json
[59]: https://developer.chrome.com/extensions/examples/api/contentSettings/popup.html
[60]: https://developer.chrome.com/extensions/examples/api/contentSettings/popup.js
[61]: examples/api/contextMenus/basic.zip
[62]: https://developer.chrome.com/extensions/contextMenus#method-create
[63]: https://developer.chrome.com/extensions/extension#property-lastError
[64]: https://developer.chrome.com/extensions/examples/api/contextMenus/basic/manifest.json
[65]: https://developer.chrome.com/extensions/examples/api/contextMenus/basic/sample.js
[66]: examples/api/contextMenus/event_page.zip
[67]: https://developer.chrome.com/extensions/contextMenus#method-create
[68]: https://developer.chrome.com/extensions/contextMenus#event-onClicked
[69]: https://developer.chrome.com/extensions/extension#property-lastError
[70]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[71]: https://developer.chrome.com/extensions/examples/api/contextMenus/event_page/manifest.json
[72]: https://developer.chrome.com/extensions/examples/api/contextMenus/event_page/sample.js
[73]: examples/api/contextMenus/global_context_search.zip
[74]: https://developer.chrome.com/extensions/contextMenus#method-create
[75]: https://developer.chrome.com/extensions/contextMenus#event-onClicked
[76]: https://developer.chrome.com/extensions/contextMenus#method-remove
[77]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[78]: https://developer.chrome.com/extensions/storage#event-onChanged
[79]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[80]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[81]: https://developer.chrome.com/extensions/tabs#method-create
[82]:
  https://developer.chrome.com/extensions/examples/api/contextMenus/global_context_search/background.js
[83]:
  https://developer.chrome.com/extensions/examples/api/contextMenus/global_context_search/globalGoogle128.png
[84]:
  https://developer.chrome.com/extensions/examples/api/contextMenus/global_context_search/globalGoogle16.png
[85]:
  https://developer.chrome.com/extensions/examples/api/contextMenus/global_context_search/globalGoogle48.png
[86]:
  https://developer.chrome.com/extensions/examples/api/contextMenus/global_context_search/locales.js
[87]:
  https://developer.chrome.com/extensions/examples/api/contextMenus/global_context_search/manifest.json
[88]:
  https://developer.chrome.com/extensions/examples/api/contextMenus/global_context_search/options.html
[89]:
  https://developer.chrome.com/extensions/examples/api/contextMenus/global_context_search/options.js
[90]: examples/api/cookies.zip
[91]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[92]: https://developer.chrome.com/extensions/cookies#method-getAll
[93]: https://developer.chrome.com/extensions/cookies#event-onChanged
[94]: https://developer.chrome.com/extensions/cookies#method-remove
[95]: https://developer.chrome.com/extensions/extension#method-getURL
[96]: https://developer.chrome.com/extensions/tabs#method-create
[97]: https://developer.chrome.com/extensions/tabs#method-update
[98]: https://developer.chrome.com/extensions/windows#method-getAll
[99]: https://developer.chrome.com/extensions/examples/api/cookies/background.js
[100]: https://developer.chrome.com/extensions/examples/api/cookies/cookie.png
[101]: https://developer.chrome.com/extensions/examples/api/cookies/manager.html
[102]: https://developer.chrome.com/extensions/examples/api/cookies/manager.js
[103]: https://developer.chrome.com/extensions/examples/api/cookies/manifest.json
[104]: examples/api/debugger/live-headers.zip
[105]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[106]: https://developer.chrome.com/extensions/debugger#method-attach
[107]: https://developer.chrome.com/extensions/debugger#method-detach
[108]: https://developer.chrome.com/extensions/debugger#event-onEvent
[109]: https://developer.chrome.com/extensions/debugger#method-sendCommand
[110]: https://developer.chrome.com/extensions/runtime#property-lastError
[111]: https://developer.chrome.com/extensions/windows#method-create
[112]: https://developer.chrome.com/extensions/examples/api/debugger/live-headers/background.js
[113]: https://developer.chrome.com/extensions/examples/api/debugger/live-headers/headers.html
[114]: https://developer.chrome.com/extensions/examples/api/debugger/live-headers/headers.js
[115]: https://developer.chrome.com/extensions/examples/api/debugger/live-headers/icon.png
[116]: https://developer.chrome.com/extensions/examples/api/debugger/live-headers/manifest.json
[117]: examples/api/debugger/pause-resume.zip
[118]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[119]: https://developer.chrome.com/extensions/browserAction#method-setIcon
[120]: https://developer.chrome.com/extensions/browserAction#method-setTitle
[121]: https://developer.chrome.com/extensions/debugger#method-attach
[122]: https://developer.chrome.com/extensions/debugger#method-detach
[123]: https://developer.chrome.com/extensions/debugger#event-onDetach
[124]: https://developer.chrome.com/extensions/debugger#event-onEvent
[125]: https://developer.chrome.com/extensions/debugger#method-sendCommand
[126]: https://developer.chrome.com/extensions/runtime#property-lastError
[127]: https://developer.chrome.com/extensions/examples/api/debugger/pause-resume/background.js
[128]:
  https://developer.chrome.com/extensions/examples/api/debugger/pause-resume/debuggerContinue.png
[129]: https://developer.chrome.com/extensions/examples/api/debugger/pause-resume/debuggerPause.png
[130]:
  https://developer.chrome.com/extensions/examples/api/debugger/pause-resume/debuggerPausing.png
[131]: https://developer.chrome.com/extensions/examples/api/debugger/pause-resume/manifest.json
[132]: examples/api/default_command_override.zip
[133]: https://developer.chrome.com/extensions/commands#event-onCommand
[134]: https://developer.chrome.com/extensions/tabs#method-query
[135]: https://developer.chrome.com/extensions/tabs#method-update
[136]: https://developer.chrome.com/extensions/examples/api/default_command_override/background.js
[137]: https://developer.chrome.com/extensions/examples/api/default_command_override/manifest.json
[138]:
  https://developer.chrome.com/extensions/examples/api/default_command_override/images/tabFlipper128.png
[139]:
  https://developer.chrome.com/extensions/examples/api/default_command_override/images/tabFlipper16.png
[140]:
  https://developer.chrome.com/extensions/examples/api/default_command_override/images/tabFlipper32.png
[141]:
  https://developer.chrome.com/extensions/examples/api/default_command_override/images/tabFlipper48.png
[142]: examples/api/desktopCapture.zip
[143]: https://developer.chrome.com/extensions/desktopCapture#method-cancelChooseDesktopMedia
[144]: https://developer.chrome.com/extensions/desktopCapture#method-chooseDesktopMedia
[145]: https://developer.chrome.com/extensions/runtime#event-onMessage
[146]: https://developer.chrome.com/extensions/runtime#method-sendMessage
[147]: https://developer.chrome.com/extensions/examples/api/desktopCapture/app.js
[148]: https://developer.chrome.com/extensions/examples/api/desktopCapture/background.js
[149]: https://developer.chrome.com/extensions/examples/api/desktopCapture/icon.png
[150]: https://developer.chrome.com/extensions/examples/api/desktopCapture/index.html
[151]: https://developer.chrome.com/extensions/examples/api/desktopCapture/manifest.json
[152]: examples/api/deviceInfo/basic.zip
[153]: https://developer.chrome.com/extensions/signedInDevices#method-get
[154]: https://developer.chrome.com/extensions/signedInDevices#event-onDeviceInfoChange
[155]: https://developer.chrome.com/extensions/examples/api/deviceInfo/basic/icon.png
[156]: https://developer.chrome.com/extensions/examples/api/deviceInfo/basic/manifest.json
[157]: https://developer.chrome.com/extensions/examples/api/deviceInfo/basic/popup.html
[158]: https://developer.chrome.com/extensions/examples/api/deviceInfo/basic/popup.js
[159]: examples/api/devtools/network/chrome-firephp.zip
[160]: https://developer.chrome.com/extensions/devtools.network#method-getHAR
[161]: https://developer.chrome.com/extensions/devtools.network#event-onRequestFinished
[162]: https://developer.chrome.com/extensions/extension#event-onRequest
[163]: https://developer.chrome.com/extensions/extension#method-sendRequest
[164]: https://developer.chrome.com/extensions/tabs#method-executeScript
[165]:
  https://developer.chrome.com/extensions/examples/api/devtools/network/chrome-firephp/background.js
[166]:
  https://developer.chrome.com/extensions/examples/api/devtools/network/chrome-firephp/devtools.html
[167]:
  https://developer.chrome.com/extensions/examples/api/devtools/network/chrome-firephp/devtools.js
[168]:
  https://developer.chrome.com/extensions/examples/api/devtools/network/chrome-firephp/manifest.json
[169]: examples/api/devtools/panels/chrome-query.zip
[170]:
  https://developer.chrome.com/extensions/devtools.panels#method-ElementsPanel-createSidebarPane
[171]:
  https://developer.chrome.com/extensions/devtools.panels#event-ElementsPanel-onSelectionChanged
[172]:
  https://developer.chrome.com/extensions/examples/api/devtools/panels/chrome-query/devtools.html
[173]: https://developer.chrome.com/extensions/examples/api/devtools/panels/chrome-query/devtools.js
[174]:
  https://developer.chrome.com/extensions/examples/api/devtools/panels/chrome-query/manifest.json
[175]: examples/api/displaySource/tabCast.zip
[176]: https://developer.chrome.com/extensions/displaySource#method-getAvailableSinks
[177]: https://developer.chrome.com/extensions/displaySource#event-onSessionTerminated
[178]: https://developer.chrome.com/extensions/displaySource#event-onSinksUpdated
[179]: https://developer.chrome.com/extensions/displaySource#method-startSession
[180]: https://developer.chrome.com/extensions/displaySource#method-terminateSession
[181]: https://developer.chrome.com/extensions/extension#method-getBackgroundPage
[182]: https://developer.chrome.com/extensions/runtime#property-lastError
[183]: https://developer.chrome.com/extensions/runtime#event-onMessage
[184]: https://developer.chrome.com/extensions/runtime#method-sendMessage
[185]: https://developer.chrome.com/extensions/tabCapture#method-capture
[186]: https://developer.chrome.com/extensions/tabs#method-getCurrent
[187]: https://developer.chrome.com/extensions/examples/api/displaySource/tabCast/README
[188]: https://developer.chrome.com/extensions/examples/api/displaySource/tabCast/background.js
[189]: https://developer.chrome.com/extensions/examples/api/displaySource/tabCast/main.css
[190]: https://developer.chrome.com/extensions/examples/api/displaySource/tabCast/main.html
[191]: https://developer.chrome.com/extensions/examples/api/displaySource/tabCast/main.js
[192]: https://developer.chrome.com/extensions/examples/api/displaySource/tabCast/manifest.json
[193]: examples/api/document_scan.zip
[194]: https://developer.chrome.com/extensions/documentScan#method-scan
[195]: https://developer.chrome.com/extensions/permissions#method-contains
[196]: https://developer.chrome.com/extensions/permissions#method-request
[197]: https://developer.chrome.com/extensions/runtime#property-lastError
[198]: https://developer.chrome.com/extensions/examples/api/document_scan/README.md
[199]: https://developer.chrome.com/extensions/examples/api/document_scan/background.js
[200]: https://developer.chrome.com/extensions/examples/api/document_scan/manifest.json
[201]: https://developer.chrome.com/extensions/examples/api/document_scan/scan.css
[202]: https://developer.chrome.com/extensions/examples/api/document_scan/scan.html
[203]: https://developer.chrome.com/extensions/examples/api/document_scan/scan.js
[204]: examples/api/downloads/download_filename_controller.zip
[205]: https://developer.chrome.com/extensions/downloads#event-onDeterminingFilename
[206]:
  https://developer.chrome.com/extensions/examples/api/downloads/download_filename_controller/bg.js
[207]:
  https://developer.chrome.com/extensions/examples/api/downloads/download_filename_controller/manifest.json
[208]:
  https://developer.chrome.com/extensions/examples/api/downloads/download_filename_controller/options.html
[209]:
  https://developer.chrome.com/extensions/examples/api/downloads/download_filename_controller/options.js
[210]: examples/api/downloads/download_links.zip
[211]: https://developer.chrome.com/extensions/downloads#method-download
[212]: https://developer.chrome.com/extensions/extension#event-onRequest
[213]: https://developer.chrome.com/extensions/extension#method-sendRequest
[214]: https://developer.chrome.com/extensions/tabs#method-executeScript
[215]: https://developer.chrome.com/extensions/tabs#method-query
[216]: https://developer.chrome.com/extensions/windows#method-getCurrent
[217]: https://developer.chrome.com/extensions/examples/api/downloads/download_links/manifest.json
[218]: https://developer.chrome.com/extensions/examples/api/downloads/download_links/popup.html
[219]: https://developer.chrome.com/extensions/examples/api/downloads/download_links/popup.js
[220]: https://developer.chrome.com/extensions/examples/api/downloads/download_links/send_links.js
[221]: examples/api/downloads/download_manager.zip
[222]: https://developer.chrome.com/extensions/browserAction#method-setIcon
[223]: https://developer.chrome.com/extensions/downloads#method-acceptDanger
[224]: https://developer.chrome.com/extensions/downloads#method-cancel
[225]: https://developer.chrome.com/extensions/downloads#method-download
[226]: https://developer.chrome.com/extensions/downloads#method-erase
[227]: https://developer.chrome.com/extensions/downloads#method-getFileIcon
[228]: https://developer.chrome.com/extensions/downloads#event-onChanged
[229]: https://developer.chrome.com/extensions/downloads#event-onCreated
[230]: https://developer.chrome.com/extensions/downloads#event-onErased
[231]: https://developer.chrome.com/extensions/downloads#method-open
[232]: https://developer.chrome.com/extensions/downloads#method-pause
[233]: https://developer.chrome.com/extensions/downloads#method-removeFile
[234]: https://developer.chrome.com/extensions/downloads#method-resume
[235]: https://developer.chrome.com/extensions/downloads#method-search
[236]: https://developer.chrome.com/extensions/downloads#method-setShelfEnabled
[237]: https://developer.chrome.com/extensions/downloads#method-show
[238]: https://developer.chrome.com/extensions/downloads#method-showDefaultFolder
[239]: https://developer.chrome.com/extensions/i18n#method-getMessage
[240]: https://developer.chrome.com/extensions/permissions#method-contains
[241]: https://developer.chrome.com/extensions/permissions#method-request
[242]: https://developer.chrome.com/extensions/runtime#event-onMessage
[243]: https://developer.chrome.com/extensions/runtime#method-sendMessage
[244]: https://developer.chrome.com/extensions/tabs#method-create
[245]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/background.js
[246]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/icon128.png
[247]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/icon19.png
[248]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/icon38.png
[249]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/icons.html
[250]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/icons.js
[251]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/manifest.json
[252]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/popup.css
[253]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/popup.html
[254]: https://developer.chrome.com/extensions/examples/api/downloads/download_manager/popup.js
[255]:
  https://developer.chrome.com/extensions/examples/api/downloads/download_manager/_locales/en/messages.json
[256]: examples/api/downloads/download_open.zip
[257]: https://developer.chrome.com/extensions/contextMenus#method-create
[258]: https://developer.chrome.com/extensions/contextMenus#event-onClicked
[259]: https://developer.chrome.com/extensions/downloads#method-download
[260]: https://developer.chrome.com/extensions/downloads#event-onChanged
[261]: https://developer.chrome.com/extensions/downloads#method-open
[262]: https://developer.chrome.com/extensions/i18n#method-getMessage
[263]: https://developer.chrome.com/extensions/examples/api/downloads/download_open/background.js
[264]: https://developer.chrome.com/extensions/examples/api/downloads/download_open/icon128.png
[265]: https://developer.chrome.com/extensions/examples/api/downloads/download_open/icon16.png
[266]: https://developer.chrome.com/extensions/examples/api/downloads/download_open/manifest.json
[267]:
  https://developer.chrome.com/extensions/examples/api/downloads/download_open/_locales/en/messages.json
[268]: examples/api/downloads/downloads_overwrite.zip
[269]: https://developer.chrome.com/extensions/downloads#event-onDeterminingFilename
[270]: https://developer.chrome.com/extensions/examples/api/downloads/downloads_overwrite/bg.js
[271]:
  https://developer.chrome.com/extensions/examples/api/downloads/downloads_overwrite/manifest.json
[272]: examples/api/eventPage/basic.zip
[273]: https://developer.chrome.com/extensions/alarms#method-create
[274]: https://developer.chrome.com/extensions/alarms#event-onAlarm
[275]: https://developer.chrome.com/extensions/bookmarks#event-onRemoved
[276]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[277]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText
[278]: https://developer.chrome.com/extensions/commands#event-onCommand
[279]: https://developer.chrome.com/extensions/declarativeWebRequest#type-RedirectRequest
[280]: https://developer.chrome.com/extensions/declarativeWebRequest#type-RequestMatcher
[281]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[282]: https://developer.chrome.com/extensions/runtime#event-onMessage
[283]: https://developer.chrome.com/extensions/runtime#event-onSuspend
[284]: https://developer.chrome.com/extensions/runtime#method-sendMessage
[285]: https://developer.chrome.com/extensions/tabs#method-create
[286]: https://developer.chrome.com/extensions/tabs#method-executeScript
[287]: https://developer.chrome.com/extensions/tabs#method-query
[288]: https://developer.chrome.com/extensions/tabs#method-sendMessage
[289]: https://developer.chrome.com/extensions/examples/api/eventPage/basic/background.js
[290]: https://developer.chrome.com/extensions/examples/api/eventPage/basic/content.js
[291]: https://developer.chrome.com/extensions/examples/api/eventPage/basic/icon.png
[292]: https://developer.chrome.com/extensions/examples/api/eventPage/basic/manifest.json
[293]: examples/api/extension/isAllowedAccess.zip
[294]: https://developer.chrome.com/extensions/extension#method-isAllowedFileSchemeAccess
[295]: https://developer.chrome.com/extensions/extension#method-isAllowedIncognitoAccess
[296]: https://developer.chrome.com/extensions/examples/api/extension/isAllowedAccess/manifest.json
[297]: https://developer.chrome.com/extensions/examples/api/extension/isAllowedAccess/popup.html
[298]: https://developer.chrome.com/extensions/examples/api/extension/isAllowedAccess/popup.js
[299]: https://developer.chrome.com/extensions/examples/api/extension/isAllowedAccess/sample-128.png
[300]: https://developer.chrome.com/extensions/examples/api/extension/isAllowedAccess/sample-16.png
[301]: https://developer.chrome.com/extensions/examples/api/extension/isAllowedAccess/sample-19.png
[302]: https://developer.chrome.com/extensions/examples/api/extension/isAllowedAccess/sample-48.png
[303]: https://developer.chrome.com/extensions/examples/api/extension/isAllowedAccess/sample.css
[304]: examples/api/fileSystemProvider/archive.zip
[305]: https://developer.chrome.com/extensions/fileSystemProvider#method-get
[306]: https://developer.chrome.com/extensions/fileSystemProvider#method-mount
[307]: https://developer.chrome.com/extensions/fileSystemProvider#event-onCloseFileRequested
[308]: https://developer.chrome.com/extensions/fileSystemProvider#event-onGetMetadataRequested
[309]: https://developer.chrome.com/extensions/fileSystemProvider#event-onOpenFileRequested
[310]: https://developer.chrome.com/extensions/fileSystemProvider#event-onReadDirectoryRequested
[311]: https://developer.chrome.com/extensions/fileSystemProvider#event-onReadFileRequested
[312]: https://developer.chrome.com/extensions/fileSystemProvider#event-onUnmountRequested
[313]: https://developer.chrome.com/extensions/fileSystemProvider#method-unmount
[314]: https://developer.chrome.com/extensions/runtime#property-lastError
[315]: https://developer.chrome.com/extensions/runtime#event-onStartup
[316]: https://developer.chrome.com/extensions/runtime#event-onSuspend
[317]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[318]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[319]: https://developer.chrome.com/extensions/examples/api/fileSystemProvider/archive/background.js
[320]: https://developer.chrome.com/extensions/examples/api/fileSystemProvider/archive/example1.fake
[321]: https://developer.chrome.com/extensions/examples/api/fileSystemProvider/archive/example2.fake
[322]: https://developer.chrome.com/extensions/examples/api/fileSystemProvider/archive/manifest.json
[323]: examples/api/fileSystemProvider/basic.zip
[324]: https://developer.chrome.com/extensions/fileSystemProvider#method-mount
[325]: https://developer.chrome.com/extensions/fileSystemProvider#event-onCloseFileRequested
[326]: https://developer.chrome.com/extensions/fileSystemProvider#event-onGetMetadataRequested
[327]: https://developer.chrome.com/extensions/fileSystemProvider#event-onMountRequested
[328]: https://developer.chrome.com/extensions/fileSystemProvider#event-onOpenFileRequested
[329]: https://developer.chrome.com/extensions/fileSystemProvider#event-onReadDirectoryRequested
[330]: https://developer.chrome.com/extensions/fileSystemProvider#event-onReadFileRequested
[331]: https://developer.chrome.com/extensions/fileSystemProvider#event-onUnmountRequested
[332]: https://developer.chrome.com/extensions/fileSystemProvider#method-unmount
[333]: https://developer.chrome.com/extensions/runtime#property-lastError
[334]: https://developer.chrome.com/extensions/examples/api/fileSystemProvider/basic/background.js
[335]: https://developer.chrome.com/extensions/examples/api/fileSystemProvider/basic/manifest.json
[336]: examples/api/fontSettings.zip
[337]: https://developer.chrome.com/extensions/fontSettings#method-clearDefaultFixedFontSize
[338]: https://developer.chrome.com/extensions/fontSettings#method-clearDefaultFontSize
[339]: https://developer.chrome.com/extensions/fontSettings#method-clearFont
[340]: https://developer.chrome.com/extensions/fontSettings#method-clearMinimumFontSize
[341]: https://developer.chrome.com/extensions/fontSettings#method-getDefaultFixedFontSize
[342]: https://developer.chrome.com/extensions/fontSettings#method-getDefaultFontSize
[343]: https://developer.chrome.com/extensions/fontSettings#method-getFont
[344]: https://developer.chrome.com/extensions/fontSettings#method-getFontList
[345]: https://developer.chrome.com/extensions/fontSettings#method-getMinimumFontSize
[346]: https://developer.chrome.com/extensions/fontSettings#event-onDefaultFixedFontSizeChanged
[347]: https://developer.chrome.com/extensions/fontSettings#event-onDefaultFontSizeChanged
[348]: https://developer.chrome.com/extensions/fontSettings#event-onFontChanged
[349]: https://developer.chrome.com/extensions/fontSettings#event-onMinimumFontSizeChanged
[350]: https://developer.chrome.com/extensions/fontSettings#method-setDefaultFixedFontSize
[351]: https://developer.chrome.com/extensions/fontSettings#method-setDefaultFontSize
[352]: https://developer.chrome.com/extensions/fontSettings#method-setFont
[353]: https://developer.chrome.com/extensions/fontSettings#method-setMinimumFontSize
[354]: https://developer.chrome.com/extensions/examples/api/fontSettings/fonts128.png
[355]: https://developer.chrome.com/extensions/examples/api/fontSettings/fonts16.png
[356]: https://developer.chrome.com/extensions/examples/api/fontSettings/manifest.json
[357]: https://developer.chrome.com/extensions/examples/api/fontSettings/options.html
[358]: https://developer.chrome.com/extensions/examples/api/fontSettings/options.js
[359]: https://developer.chrome.com/extensions/examples/api/fontSettings/pending_changes.js
[360]: https://developer.chrome.com/extensions/examples/api/fontSettings/slider.css
[361]: https://developer.chrome.com/extensions/examples/api/fontSettings/slider.js
[362]: https://developer.chrome.com/extensions/examples/api/fontSettings/js/cr.js
[363]: https://developer.chrome.com/extensions/examples/api/fontSettings/css/chrome_shared.css
[364]: https://developer.chrome.com/extensions/examples/api/fontSettings/css/overlay.css
[365]: https://developer.chrome.com/extensions/examples/api/fontSettings/css/uber_shared.css
[366]: https://developer.chrome.com/extensions/examples/api/fontSettings/css/widgets.css
[367]: https://developer.chrome.com/extensions/examples/api/fontSettings/images/disabled_select.png
[368]: https://developer.chrome.com/extensions/examples/api/fontSettings/images/select.png
[369]: https://developer.chrome.com/extensions/examples/api/fontSettings/images/x-hover.png
[370]: https://developer.chrome.com/extensions/examples/api/fontSettings/images/x-pressed.png
[371]: https://developer.chrome.com/extensions/examples/api/fontSettings/images/x.png
[372]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slide_bar_center.png
[373]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slide_bar_disabled_center.png
[374]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slide_bar_disabled_left.png
[375]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slide_bar_disabled_right.png
[376]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slide_bar_fill_center.png
[377]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slide_bar_fill_left.png
[378]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slider_bar_right.png
[379]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slider_thumb.png
[380]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slider_thumb_disabled.png
[381]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slider_thumb_down.png
[382]:
  https://developer.chrome.com/extensions/examples/api/fontSettings/images/slider/slider_thumb_hover.png
[383]: https://developer.chrome.com/extensions/examples/api/fontSettings/js/cr/ui.js
[384]: https://developer.chrome.com/extensions/examples/api/fontSettings/js/cr/ui/overlay.js
[385]: examples/api/history/historyOverride.zip
[386]: https://developer.chrome.com/extensions/history#method-deleteAll
[387]: https://developer.chrome.com/extensions/history#method-deleteUrl
[388]: https://developer.chrome.com/extensions/history#method-search
[389]: https://developer.chrome.com/extensions/examples/api/history/historyOverride/history.html
[390]: https://developer.chrome.com/extensions/examples/api/history/historyOverride/history128.png
[391]: https://developer.chrome.com/extensions/examples/api/history/historyOverride/history16.png
[392]: https://developer.chrome.com/extensions/examples/api/history/historyOverride/history32.png
[393]: https://developer.chrome.com/extensions/examples/api/history/historyOverride/history48.png
[394]: https://developer.chrome.com/extensions/examples/api/history/historyOverride/logic.js
[395]: https://developer.chrome.com/extensions/examples/api/history/historyOverride/manifest.json
[396]: https://developer.chrome.com/extensions/examples/api/history/historyOverride/style.css
[397]: examples/api/history/showHistory.zip
[398]: https://developer.chrome.com/extensions/history#method-getVisits
[399]: https://developer.chrome.com/extensions/history#method-search
[400]: https://developer.chrome.com/extensions/tabs#method-create
[401]: https://developer.chrome.com/extensions/examples/api/history/showHistory/clock.png
[402]: https://developer.chrome.com/extensions/examples/api/history/showHistory/manifest.json
[403]: https://developer.chrome.com/extensions/examples/api/history/showHistory/typedUrls.html
[404]: https://developer.chrome.com/extensions/examples/api/history/showHistory/typedUrls.js
[405]: examples/api/i18n/cld.zip
[406]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText
[407]: https://developer.chrome.com/extensions/tabs#method-detectLanguage
[408]: https://developer.chrome.com/extensions/tabs#event-onSelectionChanged
[409]: https://developer.chrome.com/extensions/tabs#event-onUpdated
[410]: https://developer.chrome.com/extensions/tabs#method-query
[411]: https://developer.chrome.com/extensions/examples/api/i18n/cld/background.js
[412]: https://developer.chrome.com/extensions/examples/api/i18n/cld/manifest.json
[413]: examples/api/i18n/detectLanguage.zip
[414]: https://developer.chrome.com/extensions/i18n#method-detectLanguage
[415]: https://developer.chrome.com/extensions/examples/api/i18n/detectLanguage/icon.png
[416]: https://developer.chrome.com/extensions/examples/api/i18n/detectLanguage/manifest.json
[417]: https://developer.chrome.com/extensions/examples/api/i18n/detectLanguage/popup.html
[418]: https://developer.chrome.com/extensions/examples/api/i18n/detectLanguage/popup.js
[419]: examples/api/i18n/getMessage.zip
[420]: https://developer.chrome.com/extensions/i18n#method-getAcceptLanguages
[421]: https://developer.chrome.com/extensions/i18n#method-getMessage
[422]: https://developer.chrome.com/extensions/examples/api/i18n/getMessage/icon.png
[423]: https://developer.chrome.com/extensions/examples/api/i18n/getMessage/manifest.json
[424]: https://developer.chrome.com/extensions/examples/api/i18n/getMessage/popup.html
[425]: https://developer.chrome.com/extensions/examples/api/i18n/getMessage/popup.js
[426]:
  https://developer.chrome.com/extensions/examples/api/i18n/getMessage/_locales/en_US/messages.json
[427]:
  https://developer.chrome.com/extensions/examples/api/i18n/getMessage/_locales/es/messages.json
[428]:
  https://developer.chrome.com/extensions/examples/api/i18n/getMessage/_locales/sr/messages.json
[429]: examples/api/i18n/localizedHostedApp.zip
[430]: https://developer.chrome.com/extensions/examples/api/i18n/localizedHostedApp/icon128.png
[431]: https://developer.chrome.com/extensions/examples/api/i18n/localizedHostedApp/manifest.json
[432]:
  https://developer.chrome.com/extensions/examples/api/i18n/localizedHostedApp/_locales/en/messages.json
[433]:
  https://developer.chrome.com/extensions/examples/api/i18n/localizedHostedApp/_locales/de/messages.json
[434]: examples/api/idle/idle_simple.zip
[435]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[436]: https://developer.chrome.com/extensions/extension#method-getBackgroundPage
[437]: https://developer.chrome.com/extensions/idle#event-onStateChanged
[438]: https://developer.chrome.com/extensions/idle#method-queryState
[439]: https://developer.chrome.com/extensions/examples/api/idle/idle_simple/background.js
[440]: https://developer.chrome.com/extensions/examples/api/idle/idle_simple/history.html
[441]: https://developer.chrome.com/extensions/examples/api/idle/idle_simple/history.js
[442]: https://developer.chrome.com/extensions/examples/api/idle/idle_simple/manifest.json
[443]: https://developer.chrome.com/extensions/examples/api/idle/idle_simple/sample-128.png
[444]: https://developer.chrome.com/extensions/examples/api/idle/idle_simple/sample-16.png
[445]: https://developer.chrome.com/extensions/examples/api/idle/idle_simple/sample-19.png
[446]: https://developer.chrome.com/extensions/examples/api/idle/idle_simple/sample-48.png
[447]: examples/api/input.ime/basic.zip
[448]: https://developer.chrome.com/extensions/input.ime
[449]: https://developer.chrome.com/extensions/input.ime#method-commitText
[450]: https://developer.chrome.com/extensions/input.ime#event-onActivate
[451]: https://developer.chrome.com/extensions/input.ime#event-onBlur
[452]: https://developer.chrome.com/extensions/input.ime#event-onDeactivated
[453]: https://developer.chrome.com/extensions/input.ime#event-onFocus
[454]: https://developer.chrome.com/extensions/input.ime#event-onKeyEvent
[455]: https://developer.chrome.com/extensions/examples/api/input.ime/basic/icon.png
[456]: https://developer.chrome.com/extensions/examples/api/input.ime/basic/main.js
[457]: https://developer.chrome.com/extensions/examples/api/input.ime/basic/manifest.json
[458]: examples/api/messaging/timer.zip
[459]: https://developer.chrome.com/extensions/runtime#event-onConnect
[460]: https://developer.chrome.com/extensions/runtime#event-onMessage
[461]: https://developer.chrome.com/extensions/tabs#method-connect
[462]: https://developer.chrome.com/extensions/tabs#method-query
[463]: https://developer.chrome.com/extensions/tabs#method-sendMessage
[464]: https://developer.chrome.com/extensions/examples/api/messaging/timer/clock.png
[465]: https://developer.chrome.com/extensions/examples/api/messaging/timer/manifest.json
[466]: https://developer.chrome.com/extensions/examples/api/messaging/timer/page.js
[467]: https://developer.chrome.com/extensions/examples/api/messaging/timer/popup.html
[468]: https://developer.chrome.com/extensions/examples/api/messaging/timer/popup.js
[469]: examples/api/nativeMessaging/app.zip
[470]: https://developer.chrome.com/extensions/runtime#method-connectNative
[471]: https://developer.chrome.com/extensions/examples/api/nativeMessaging/app/icon-128.png
[472]: https://developer.chrome.com/extensions/examples/api/nativeMessaging/app/main.html
[473]: https://developer.chrome.com/extensions/examples/api/nativeMessaging/app/main.js
[474]: https://developer.chrome.com/extensions/examples/api/nativeMessaging/app/manifest.json
[475]: examples/api/notifications.zip
[476]: https://developer.chrome.com/extensions/examples/api/notifications/128.png
[477]: https://developer.chrome.com/extensions/examples/api/notifications/16.png
[478]: https://developer.chrome.com/extensions/examples/api/notifications/48.png
[479]: https://developer.chrome.com/extensions/examples/api/notifications/64.png
[480]: https://developer.chrome.com/extensions/examples/api/notifications/background.js
[481]: https://developer.chrome.com/extensions/examples/api/notifications/manifest.json
[482]: https://developer.chrome.com/extensions/examples/api/notifications/options.html
[483]: https://developer.chrome.com/extensions/examples/api/notifications/options.js
[484]: https://developer.chrome.com/extensions/examples/api/notifications/style.css
[485]: examples/api/omnibox/newtab_search.zip
[486]: https://developer.chrome.com/extensions/omnibox#event-onInputEntered
[487]: https://developer.chrome.com/extensions/tabs#method-create
[488]: https://developer.chrome.com/extensions/examples/api/omnibox/newtab_search/background.js
[489]: https://developer.chrome.com/extensions/examples/api/omnibox/newtab_search/manifest.json
[490]:
  https://developer.chrome.com/extensions/examples/api/omnibox/newtab_search/newtab_search128.png
[491]:
  https://developer.chrome.com/extensions/examples/api/omnibox/newtab_search/newtab_search16.png
[492]:
  https://developer.chrome.com/extensions/examples/api/omnibox/newtab_search/newtab_search32.png
[493]:
  https://developer.chrome.com/extensions/examples/api/omnibox/newtab_search/newtab_search48.png
[494]: examples/api/omnibox/simple-example.zip
[495]: https://developer.chrome.com/extensions/omnibox#event-onInputChanged
[496]: https://developer.chrome.com/extensions/omnibox#event-onInputEntered
[497]: https://developer.chrome.com/extensions/examples/api/omnibox/simple-example/background.js
[498]: https://developer.chrome.com/extensions/examples/api/omnibox/simple-example/manifest.json
[499]: examples/api/override/blank_ntp.zip
[500]: https://developer.chrome.com/extensions/examples/api/override/blank_ntp/blank.html
[501]: https://developer.chrome.com/extensions/examples/api/override/blank_ntp/manifest.json
[502]: examples/api/override/override_igoogle.zip
[503]: https://developer.chrome.com/extensions/examples/api/override/override_igoogle/manifest.json
[504]: https://developer.chrome.com/extensions/examples/api/override/override_igoogle/redirect.html
[505]: examples/api/pageAction/pageaction_by_content.zip
[506]: https://developer.chrome.com/extensions/declarativeContent#type-PageStateMatcher
[507]: https://developer.chrome.com/extensions/declarativeContent#type-ShowPageAction
[508]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[509]:
  https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_content/background.js
[510]:
  https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_content/manifest.json
[511]:
  https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_content/video-128.png
[512]:
  https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_content/video-19.png
[513]:
  https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_content/video-48.png
[514]: examples/api/pageAction/pageaction_by_url.zip
[515]: https://developer.chrome.com/extensions/declarativeContent#type-PageStateMatcher
[516]: https://developer.chrome.com/extensions/declarativeContent#type-ShowPageAction
[517]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[518]:
  https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_url/background.js
[519]:
  https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_url/icon-128.png
[520]: https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_url/icon-19.png
[521]: https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_url/icon-48.png
[522]:
  https://developer.chrome.com/extensions/examples/api/pageAction/pageaction_by_url/manifest.json
[523]: examples/api/pageAction/set_icon.zip
[524]: https://developer.chrome.com/extensions/pageAction#method-hide
[525]: https://developer.chrome.com/extensions/pageAction#event-onClicked
[526]: https://developer.chrome.com/extensions/pageAction#method-setIcon
[527]: https://developer.chrome.com/extensions/pageAction#method-setTitle
[528]: https://developer.chrome.com/extensions/pageAction#method-show
[529]: https://developer.chrome.com/extensions/tabs#event-onSelectionChanged
[530]: https://developer.chrome.com/extensions/tabs#method-query
[531]: https://developer.chrome.com/extensions/examples/api/pageAction/set_icon/background.html
[532]: https://developer.chrome.com/extensions/examples/api/pageAction/set_icon/background.js
[533]: https://developer.chrome.com/extensions/examples/api/pageAction/set_icon/icon1.png
[534]: https://developer.chrome.com/extensions/examples/api/pageAction/set_icon/icon2.png
[535]: https://developer.chrome.com/extensions/examples/api/pageAction/set_icon/manifest.json
[536]: examples/api/permissions/extension-questions.zip
[537]: https://developer.chrome.com/extensions/permissions#method-contains
[538]: https://developer.chrome.com/extensions/permissions#event-onAdded
[539]: https://developer.chrome.com/extensions/permissions#event-onRemoved
[540]: https://developer.chrome.com/extensions/permissions#method-remove
[541]: https://developer.chrome.com/extensions/permissions#method-request
[542]: https://developer.chrome.com/extensions/tabs#method-create
[543]:
  https://developer.chrome.com/extensions/examples/api/permissions/extension-questions/manifest.json
[544]:
  https://developer.chrome.com/extensions/examples/api/permissions/extension-questions/options.html
[545]:
  https://developer.chrome.com/extensions/examples/api/permissions/extension-questions/options.js
[546]:
  https://developer.chrome.com/extensions/examples/api/permissions/extension-questions/popup.html
[547]: https://developer.chrome.com/extensions/examples/api/permissions/extension-questions/popup.js
[548]:
  https://developer.chrome.com/extensions/examples/api/permissions/extension-questions/images/icon.png
[549]: examples/api/power.zip
[550]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[551]: https://developer.chrome.com/extensions/browserAction#method-setIcon
[552]: https://developer.chrome.com/extensions/browserAction#method-setTitle
[553]: https://developer.chrome.com/extensions/i18n#method-getMessage
[554]: https://developer.chrome.com/extensions/power#method-releaseKeepAwake
[555]: https://developer.chrome.com/extensions/power#method-requestKeepAwake
[556]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[557]: https://developer.chrome.com/extensions/runtime#event-onStartup
[558]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[559]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[560]: https://developer.chrome.com/extensions/examples/api/power/background.js
[561]: https://developer.chrome.com/extensions/examples/api/power/manifest.json
[562]: https://developer.chrome.com/extensions/examples/api/power/images/day-19.png
[563]: https://developer.chrome.com/extensions/examples/api/power/images/day-38.png
[564]: https://developer.chrome.com/extensions/examples/api/power/images/icon-128.png
[565]: https://developer.chrome.com/extensions/examples/api/power/images/icon-16.png
[566]: https://developer.chrome.com/extensions/examples/api/power/images/icon-48.png
[567]: https://developer.chrome.com/extensions/examples/api/power/images/night-19.png
[568]: https://developer.chrome.com/extensions/examples/api/power/images/night-38.png
[569]: https://developer.chrome.com/extensions/examples/api/power/images/sunset-19.png
[570]: https://developer.chrome.com/extensions/examples/api/power/images/sunset-38.png
[571]: https://developer.chrome.com/extensions/examples/api/power/_locales/en/messages.json
[572]: examples/api/preferences/allowThirdPartyCookies.zip
[573]: https://developer.chrome.com/extensions/extension#method-isAllowedIncognitoAccess
[574]:
  https://developer.chrome.com/extensions/examples/api/preferences/allowThirdPartyCookies/advicedog.jpg
[575]:
  https://developer.chrome.com/extensions/examples/api/preferences/allowThirdPartyCookies/manifest.json
[576]:
  https://developer.chrome.com/extensions/examples/api/preferences/allowThirdPartyCookies/popup.css
[577]:
  https://developer.chrome.com/extensions/examples/api/preferences/allowThirdPartyCookies/popup.html
[578]:
  https://developer.chrome.com/extensions/examples/api/preferences/allowThirdPartyCookies/popup.js
[579]: examples/api/preferences/enableReferrer.zip
[580]: https://developer.chrome.com/extensions/extension#method-isAllowedIncognitoAccess
[581]: https://developer.chrome.com/extensions/examples/api/preferences/enableReferrer/advicedog.jpg
[582]: https://developer.chrome.com/extensions/examples/api/preferences/enableReferrer/manifest.json
[583]: https://developer.chrome.com/extensions/examples/api/preferences/enableReferrer/popup.css
[584]: https://developer.chrome.com/extensions/examples/api/preferences/enableReferrer/popup.html
[585]: https://developer.chrome.com/extensions/examples/api/preferences/enableReferrer/popup.js
[586]: examples/api/printing.zip
[587]: https://developer.chrome.com/extensions/printing#method-getPrinterInfo
[588]: https://developer.chrome.com/extensions/printing#method-getPrinters
[589]: https://developer.chrome.com/extensions/printing#method-submitJob
[590]: https://developer.chrome.com/extensions/runtime#property-lastError
[591]: https://developer.chrome.com/extensions/examples/api/printing/manifest.json
[592]: https://developer.chrome.com/extensions/examples/api/printing/printers.css
[593]: https://developer.chrome.com/extensions/examples/api/printing/printers.html
[594]: https://developer.chrome.com/extensions/examples/api/printing/printers.js
[595]: https://developer.chrome.com/extensions/examples/api/printing/test.pdf
[596]: https://developer.chrome.com/extensions/examples/api/printing/icons/icon.png
[597]: https://developer.chrome.com/extensions/examples/api/printing/icons/icon128.png
[598]: https://developer.chrome.com/extensions/examples/api/printing/icons/icon16.png
[599]: https://developer.chrome.com/extensions/examples/api/printing/icons/icon48.png
[600]: examples/api/printingMetrics.zip
[601]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText
[602]: https://developer.chrome.com/extensions/printingMetrics#method-getPrintJobs
[603]: https://developer.chrome.com/extensions/printingMetrics#event-onPrintJobFinished
[604]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[605]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[606]: https://developer.chrome.com/extensions/examples/api/printingMetrics/background.js
[607]: https://developer.chrome.com/extensions/examples/api/printingMetrics/manifest.json
[608]: https://developer.chrome.com/extensions/examples/api/printingMetrics/print.png
[609]: https://developer.chrome.com/extensions/examples/api/printingMetrics/print_jobs.css
[610]: https://developer.chrome.com/extensions/examples/api/printingMetrics/print_jobs.html
[611]: https://developer.chrome.com/extensions/examples/api/printingMetrics/print_jobs.js
[612]: examples/api/processes/process_monitor.zip
[613]: https://developer.chrome.com/extensions/processes#event-onUpdatedWithMemory
[614]: https://developer.chrome.com/extensions/processes#method-terminate
[615]: https://developer.chrome.com/extensions/examples/api/processes/process_monitor/icon.png
[616]: https://developer.chrome.com/extensions/examples/api/processes/process_monitor/manifest.json
[617]: https://developer.chrome.com/extensions/examples/api/processes/process_monitor/popup.html
[618]: https://developer.chrome.com/extensions/examples/api/processes/process_monitor/popup.js
[619]: examples/api/processes/show_tabs.zip
[620]: https://developer.chrome.com/extensions/processes#method-getProcessIdForTab
[621]: https://developer.chrome.com/extensions/tabs#method-query
[622]: https://developer.chrome.com/extensions/tabs#method-update
[623]: https://developer.chrome.com/extensions/windows#method-getAll
[624]: https://developer.chrome.com/extensions/windows#method-getCurrent
[625]: https://developer.chrome.com/extensions/windows#method-update
[626]: https://developer.chrome.com/extensions/examples/api/processes/show_tabs/icon.png
[627]: https://developer.chrome.com/extensions/examples/api/processes/show_tabs/manifest.json
[628]: https://developer.chrome.com/extensions/examples/api/processes/show_tabs/popup.css
[629]: https://developer.chrome.com/extensions/examples/api/processes/show_tabs/popup.html
[630]: https://developer.chrome.com/extensions/examples/api/processes/show_tabs/popup.js
[631]: examples/api/storage/stylizr.zip
[632]: https://developer.chrome.com/extensions/extension#method-getURL
[633]: https://developer.chrome.com/extensions/runtime#property-lastError
[634]: https://developer.chrome.com/extensions/storage#property-local
[635]: https://developer.chrome.com/extensions/storage#method-StorageArea-clear
[636]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[637]: https://developer.chrome.com/extensions/storage#method-StorageArea-remove
[638]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[639]: https://developer.chrome.com/extensions/tabs#method-insertCSS
[640]: https://developer.chrome.com/extensions/examples/api/storage/stylizr/icon.png
[641]: https://developer.chrome.com/extensions/examples/api/storage/stylizr/manifest.json
[642]: https://developer.chrome.com/extensions/examples/api/storage/stylizr/options.html
[643]: https://developer.chrome.com/extensions/examples/api/storage/stylizr/options.js
[644]: https://developer.chrome.com/extensions/examples/api/storage/stylizr/popup.html
[645]: https://developer.chrome.com/extensions/examples/api/storage/stylizr/popup.js
[646]: examples/api/tabCapture.zip
[647]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[648]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[649]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[650]: https://developer.chrome.com/extensions/tabCapture#method-capture
[651]: https://developer.chrome.com/extensions/tabCapture#method-getMediaStreamId
[652]: https://developer.chrome.com/extensions/examples/api/tabCapture/eventPage.js
[653]: https://developer.chrome.com/extensions/examples/api/tabCapture/icon.png
[654]: https://developer.chrome.com/extensions/examples/api/tabCapture/manifest.json
[655]: https://developer.chrome.com/extensions/examples/api/tabCapture/options.html
[656]: https://developer.chrome.com/extensions/examples/api/tabCapture/options.js
[657]: https://developer.chrome.com/extensions/examples/api/tabCapture/receiver.html
[658]: https://developer.chrome.com/extensions/examples/api/tabCapture/receiver.js
[659]: examples/api/tabs/inspector.zip
[660]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[661]: https://developer.chrome.com/extensions/extension#method-getURL
[662]: https://developer.chrome.com/extensions/tabs#method-create
[663]: https://developer.chrome.com/extensions/tabs#method-get
[664]: https://developer.chrome.com/extensions/tabs#method-getAllInWindow
[665]: https://developer.chrome.com/extensions/tabs#method-move
[666]: https://developer.chrome.com/extensions/tabs#event-onAttached
[667]: https://developer.chrome.com/extensions/tabs#event-onCreated
[668]: https://developer.chrome.com/extensions/tabs#event-onDetached
[669]: https://developer.chrome.com/extensions/tabs#event-onMoved
[670]: https://developer.chrome.com/extensions/tabs#event-onRemoved
[671]: https://developer.chrome.com/extensions/tabs#event-onSelectionChanged
[672]: https://developer.chrome.com/extensions/tabs#event-onUpdated
[673]: https://developer.chrome.com/extensions/tabs#method-query
[674]: https://developer.chrome.com/extensions/tabs#method-remove
[675]: https://developer.chrome.com/extensions/tabs#method-update
[676]: https://developer.chrome.com/extensions/windows#method-create
[677]: https://developer.chrome.com/extensions/windows#method-get
[678]: https://developer.chrome.com/extensions/windows#method-getAll
[679]: https://developer.chrome.com/extensions/windows#method-getCurrent
[680]: https://developer.chrome.com/extensions/windows#method-getLastFocused
[681]: https://developer.chrome.com/extensions/windows#event-onCreated
[682]: https://developer.chrome.com/extensions/windows#event-onFocusChanged
[683]: https://developer.chrome.com/extensions/windows#event-onRemoved
[684]: https://developer.chrome.com/extensions/windows#method-remove
[685]: https://developer.chrome.com/extensions/windows#method-update
[686]: https://developer.chrome.com/extensions/examples/api/tabs/inspector/background.js
[687]: https://developer.chrome.com/extensions/examples/api/tabs/inspector/jstemplate_compiled.js
[688]: https://developer.chrome.com/extensions/examples/api/tabs/inspector/manifest.json
[689]: https://developer.chrome.com/extensions/examples/api/tabs/inspector/tabs_api.html
[690]: https://developer.chrome.com/extensions/examples/api/tabs/inspector/tabs_api.js
[691]: examples/api/tabs/pin.zip
[692]: https://developer.chrome.com/extensions/commands#event-onCommand
[693]: https://developer.chrome.com/extensions/tabs#method-query
[694]: https://developer.chrome.com/extensions/tabs#method-update
[695]: https://developer.chrome.com/extensions/examples/api/tabs/pin/README
[696]: https://developer.chrome.com/extensions/examples/api/tabs/pin/background.js
[697]: https://developer.chrome.com/extensions/examples/api/tabs/pin/manifest.json
[698]: examples/api/tabs/screenshot.zip
[699]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[700]: https://developer.chrome.com/extensions/extension#method-getURL
[701]: https://developer.chrome.com/extensions/extension#method-getViews
[702]: https://developer.chrome.com/extensions/tabs#method-captureVisibleTab
[703]: https://developer.chrome.com/extensions/tabs#method-create
[704]: https://developer.chrome.com/extensions/tabs#event-onUpdated
[705]: https://developer.chrome.com/extensions/examples/api/tabs/screenshot/background.js
[706]: https://developer.chrome.com/extensions/examples/api/tabs/screenshot/camera.png
[707]: https://developer.chrome.com/extensions/examples/api/tabs/screenshot/manifest.json
[708]: https://developer.chrome.com/extensions/examples/api/tabs/screenshot/screenshot.html
[709]: https://developer.chrome.com/extensions/examples/api/tabs/screenshot/screenshot.js
[710]: https://developer.chrome.com/extensions/examples/api/tabs/screenshot/white.png
[711]: examples/api/tabs/zoom.zip
[712]: https://developer.chrome.com/extensions/runtime#property-lastError
[713]: https://developer.chrome.com/extensions/tabs#method-getZoom
[714]: https://developer.chrome.com/extensions/tabs#method-getZoomSettings
[715]: https://developer.chrome.com/extensions/tabs#event-onZoomChange
[716]: https://developer.chrome.com/extensions/tabs#method-query
[717]: https://developer.chrome.com/extensions/tabs#method-setZoom
[718]: https://developer.chrome.com/extensions/tabs#method-setZoomSettings
[719]: https://developer.chrome.com/extensions/examples/api/tabs/zoom/README
[720]: https://developer.chrome.com/extensions/examples/api/tabs/zoom/background.js
[721]: https://developer.chrome.com/extensions/examples/api/tabs/zoom/manifest.json
[722]: https://developer.chrome.com/extensions/examples/api/tabs/zoom/popup.html
[723]: https://developer.chrome.com/extensions/examples/api/tabs/zoom/popup.js
[724]: https://developer.chrome.com/extensions/examples/api/tabs/zoom/zoom16.png
[725]: https://developer.chrome.com/extensions/examples/api/tabs/zoom/zoom19.png
[726]: https://developer.chrome.com/extensions/examples/api/tabs/zoom/zoom48.png
[727]: examples/api/topsites/basic.zip
[728]: https://developer.chrome.com/extensions/tabs#method-create
[729]: https://developer.chrome.com/extensions/topSites#method-get
[730]: https://developer.chrome.com/extensions/examples/api/topsites/basic/icon.png
[731]: https://developer.chrome.com/extensions/examples/api/topsites/basic/manifest.json
[732]: https://developer.chrome.com/extensions/examples/api/topsites/basic/popup.html
[733]: https://developer.chrome.com/extensions/examples/api/topsites/basic/popup.js
[734]: examples/api/topsites/magic8ball.zip
[735]: https://developer.chrome.com/extensions/topSites#method-get
[736]: https://developer.chrome.com/extensions/examples/api/topsites/magic8ball/manifest.json
[737]: https://developer.chrome.com/extensions/examples/api/topsites/magic8ball/newTab.css
[738]: https://developer.chrome.com/extensions/examples/api/topsites/magic8ball/newTab.html
[739]: https://developer.chrome.com/extensions/examples/api/topsites/magic8ball/newTab.js
[740]: examples/api/ttsEngine/console_tts_engine.zip
[741]: https://developer.chrome.com/extensions/extension#method-getViews
[742]: https://developer.chrome.com/extensions/ttsEngine#event-onSpeak
[743]: https://developer.chrome.com/extensions/ttsEngine#event-onStop
[744]: https://developer.chrome.com/extensions/windows#method-create
[745]: https://developer.chrome.com/extensions/windows#method-getCurrent
[746]: https://developer.chrome.com/extensions/windows#event-onRemoved
[747]:
  https://developer.chrome.com/extensions/examples/api/ttsEngine/console_tts_engine/console_tts_engine.html
[748]:
  https://developer.chrome.com/extensions/examples/api/ttsEngine/console_tts_engine/console_tts_engine.js
[749]:
  https://developer.chrome.com/extensions/examples/api/ttsEngine/console_tts_engine/manifest.json
[750]: examples/api/water_alarm_notification.zip
[751]: https://developer.chrome.com/extensions/alarms#method-clearAll
[752]: https://developer.chrome.com/extensions/alarms#method-create
[753]: https://developer.chrome.com/extensions/alarms#event-onAlarm
[754]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText
[755]: https://developer.chrome.com/extensions/notifications#method-create
[756]: https://developer.chrome.com/extensions/notifications#event-onButtonClicked
[757]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[758]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[759]: https://developer.chrome.com/extensions/examples/api/water_alarm_notification/background.js
[760]:
  https://developer.chrome.com/extensions/examples/api/water_alarm_notification/drink_water128.png
[761]:
  https://developer.chrome.com/extensions/examples/api/water_alarm_notification/drink_water16.png
[762]:
  https://developer.chrome.com/extensions/examples/api/water_alarm_notification/drink_water32.png
[763]:
  https://developer.chrome.com/extensions/examples/api/water_alarm_notification/drink_water48.png
[764]: https://developer.chrome.com/extensions/examples/api/water_alarm_notification/manifest.json
[765]: https://developer.chrome.com/extensions/examples/api/water_alarm_notification/popup.html
[766]: https://developer.chrome.com/extensions/examples/api/water_alarm_notification/popup.js
[767]:
  https://developer.chrome.com/extensions/examples/api/water_alarm_notification/stay_hydrated.png
[768]: examples/api/webNavigation/basic.zip
[769]: https://developer.chrome.com/extensions/i18n#method-getMessage
[770]: https://developer.chrome.com/extensions/runtime#event-onMessage
[771]: https://developer.chrome.com/extensions/runtime#event-onStartup
[772]: https://developer.chrome.com/extensions/runtime#method-sendMessage
[773]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[774]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[775]: https://developer.chrome.com/extensions/webNavigation#event-onBeforeNavigate
[776]: https://developer.chrome.com/extensions/webNavigation#event-onCommitted
[777]: https://developer.chrome.com/extensions/webNavigation#event-onCompleted
[778]: https://developer.chrome.com/extensions/webNavigation#event-onCreatedNavigationTarget
[779]: https://developer.chrome.com/extensions/webNavigation#event-onErrorOccurred
[780]: https://developer.chrome.com/extensions/webNavigation#event-onHistoryStateUpdated
[781]: https://developer.chrome.com/extensions/webNavigation#event-onReferenceFragmentUpdated
[782]: https://developer.chrome.com/extensions/examples/api/webNavigation/basic/background.js
[783]: https://developer.chrome.com/extensions/examples/api/webNavigation/basic/icon.png
[784]: https://developer.chrome.com/extensions/examples/api/webNavigation/basic/manifest.json
[785]:
  https://developer.chrome.com/extensions/examples/api/webNavigation/basic/navigation_collector.js
[786]: https://developer.chrome.com/extensions/examples/api/webNavigation/basic/popup.css
[787]: https://developer.chrome.com/extensions/examples/api/webNavigation/basic/popup.html
[788]: https://developer.chrome.com/extensions/examples/api/webNavigation/basic/popup.js
[789]:
  https://developer.chrome.com/extensions/examples/api/webNavigation/basic/_locales/en/messages.json
[790]: examples/api/webview/capturevisibleregion.zip
[791]:
  https://developer.chrome.com/extensions/examples/api/webview/capturevisibleregion/display.html
[792]: https://developer.chrome.com/extensions/examples/api/webview/capturevisibleregion/main.js
[793]:
  https://developer.chrome.com/extensions/examples/api/webview/capturevisibleregion/manifest.json
[794]: https://developer.chrome.com/extensions/examples/api/webview/capturevisibleregion/test.html
[795]: https://developer.chrome.com/extensions/examples/api/webview/capturevisibleregion/test.js
[796]: https://developer.chrome.com/extensions/examples/api/webview/capturevisibleregion/test2.html
[797]: examples/api/webview/comm_demo_app.zip
[798]: https://developer.chrome.com/extensions/runtime#method-connect
[799]: https://developer.chrome.com/extensions/examples/api/webview/comm_demo_app/app.js
[800]: https://developer.chrome.com/extensions/examples/api/webview/comm_demo_app/main.js
[801]: https://developer.chrome.com/extensions/examples/api/webview/comm_demo_app/manifest.json
[802]: https://developer.chrome.com/extensions/examples/api/webview/comm_demo_app/test.html
[803]: examples/api/webview/comm_demo_ext.zip
[804]: https://developer.chrome.com/extensions/runtime#property-id
[805]: https://developer.chrome.com/extensions/runtime#event-onConnectExternal
[806]: https://developer.chrome.com/extensions/examples/api/webview/comm_demo_ext/background.js
[807]: https://developer.chrome.com/extensions/examples/api/webview/comm_demo_ext/manifest.json
[808]: examples/api/windows/merge_windows.zip
[809]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[810]: https://developer.chrome.com/extensions/tabs#method-getAllInWindow
[811]: https://developer.chrome.com/extensions/tabs#method-move
[812]: https://developer.chrome.com/extensions/windows#method-getAll
[813]: https://developer.chrome.com/extensions/windows#method-getCurrent
[814]: https://developer.chrome.com/extensions/examples/api/windows/merge_windows/NOTICE
[815]: https://developer.chrome.com/extensions/examples/api/windows/merge_windows/arrow_in.png
[816]: https://developer.chrome.com/extensions/examples/api/windows/merge_windows/background.js
[817]: https://developer.chrome.com/extensions/examples/api/windows/merge_windows/manifest.json
[818]:
  https://developer.chrome.com/extensions/examples/api/windows/merge_windows/merge_windows_128.png
[819]:
  https://developer.chrome.com/extensions/examples/api/windows/merge_windows/merge_windows_48.png
[820]: examples/apps/background-simple.zip
[821]: https://developer.chrome.com/extensions/examples/apps/background-simple/README
[822]: https://developer.chrome.com/extensions/examples/apps/background-simple/background.html
[823]: https://developer.chrome.com/extensions/examples/apps/background-simple/index.html
[824]: https://developer.chrome.com/extensions/examples/apps/background-simple/index.js
[825]: https://developer.chrome.com/extensions/examples/apps/background-simple/manifest.json
[826]: examples/apps/calculator/app.zip
[827]: https://developer.chrome.com/extensions/examples/apps/calculator/app/LICENSE
[828]: https://developer.chrome.com/extensions/examples/apps/calculator/app/calculator.html
[829]: https://developer.chrome.com/extensions/examples/apps/calculator/app/controller.js
[830]: https://developer.chrome.com/extensions/examples/apps/calculator/app/manifest.json
[831]: https://developer.chrome.com/extensions/examples/apps/calculator/app/model.js
[832]: https://developer.chrome.com/extensions/examples/apps/calculator/app/style.css
[833]: https://developer.chrome.com/extensions/examples/apps/calculator/app/view.js
[834]: https://developer.chrome.com/extensions/examples/apps/calculator/app/images/buttons_1x.png
[835]: https://developer.chrome.com/extensions/examples/apps/calculator/app/images/buttons_2x.png
[836]: https://developer.chrome.com/extensions/examples/apps/calculator/app/images/icon-128x128.png
[837]: https://developer.chrome.com/extensions/examples/apps/calculator/app/images/icon-16x16.png
[838]: examples/extensions/app_launcher.zip
[839]: https://developer.chrome.com/extensions/extension#method-getURL
[840]: https://developer.chrome.com/extensions/management#method-getAll
[841]: https://developer.chrome.com/extensions/management#method-launchApp
[842]: https://developer.chrome.com/extensions/tabs#method-create
[843]:
  https://developer.chrome.com/extensions/examples/extensions/app_launcher/browser_action_icon.png
[844]: https://developer.chrome.com/extensions/examples/extensions/app_launcher/icon.png
[845]: https://developer.chrome.com/extensions/examples/extensions/app_launcher/manifest.json
[846]: https://developer.chrome.com/extensions/examples/extensions/app_launcher/popup.css
[847]: https://developer.chrome.com/extensions/examples/extensions/app_launcher/popup.html
[848]: https://developer.chrome.com/extensions/examples/extensions/app_launcher/popup.js
[849]: examples/extensions/buildbot.zip
[850]: https://developer.chrome.com/extensions/browserAction#method-setBadgeBackgroundColor
[851]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText
[852]: https://developer.chrome.com/extensions/browserAction#method-setTitle
[853]: https://developer.chrome.com/extensions/extension#method-getBackgroundPage
[854]: https://developer.chrome.com/extensions/extension#method-getURL
[855]: https://developer.chrome.com/extensions/extension#method-getViews
[856]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[857]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[858]: https://developer.chrome.com/extensions/examples/extensions/buildbot/active_issues.js
[859]: https://developer.chrome.com/extensions/examples/extensions/buildbot/bg.js
[860]: https://developer.chrome.com/extensions/examples/extensions/buildbot/chromium.png
[861]: https://developer.chrome.com/extensions/examples/extensions/buildbot/icon.png
[862]: https://developer.chrome.com/extensions/examples/extensions/buildbot/manifest.json
[863]: https://developer.chrome.com/extensions/examples/extensions/buildbot/options.html
[864]: https://developer.chrome.com/extensions/examples/extensions/buildbot/options.js
[865]: https://developer.chrome.com/extensions/examples/extensions/buildbot/popup.css
[866]: https://developer.chrome.com/extensions/examples/extensions/buildbot/popup.html
[867]: https://developer.chrome.com/extensions/examples/extensions/buildbot/popup.js
[868]: https://developer.chrome.com/extensions/examples/extensions/buildbot/prefs.js
[869]: https://developer.chrome.com/extensions/examples/extensions/buildbot/try_status.js
[870]: https://developer.chrome.com/extensions/examples/extensions/buildbot/utils.js
[871]: examples/extensions/calendar.zip
[872]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[873]: https://developer.chrome.com/extensions/browserAction#method-setBadgeBackgroundColor
[874]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText
[875]: https://developer.chrome.com/extensions/i18n#method-getMessage
[876]: https://developer.chrome.com/extensions/management#method-uninstallSelf
[877]: https://developer.chrome.com/extensions/notifications#method-clear
[878]: https://developer.chrome.com/extensions/notifications#method-create
[879]: https://developer.chrome.com/extensions/notifications#event-onButtonClicked
[880]: https://developer.chrome.com/extensions/notifications#event-onClicked
[881]: https://developer.chrome.com/extensions/runtime#method-getURL
[882]: https://developer.chrome.com/extensions/runtime#property-id
[883]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[884]: https://developer.chrome.com/extensions/tabs#method-create
[885]: https://developer.chrome.com/extensions/examples/extensions/calendar/manifest.json
[886]: https://developer.chrome.com/extensions/examples/extensions/calendar/views/options.html
[887]: https://developer.chrome.com/extensions/examples/extensions/calendar/javascript/background.js
[888]: https://developer.chrome.com/extensions/examples/extensions/calendar/javascript/options.js
[889]: https://developer.chrome.com/extensions/examples/extensions/calendar/images/icon-128.png
[890]: https://developer.chrome.com/extensions/examples/extensions/calendar/images/icon-16.png
[891]: https://developer.chrome.com/extensions/examples/extensions/calendar/images/icon-19.png
[892]: https://developer.chrome.com/extensions/examples/extensions/calendar/images/icon-38.png
[893]: https://developer.chrome.com/extensions/examples/extensions/calendar/images/icon-48.png
[894]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/sr/messages.json
[895]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/sk/messages.json
[896]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/vi/messages.json
[897]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/pt_BR/messages.json
[898]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/hu/messages.json
[899]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/fi/messages.json
[900]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/el/messages.json
[901]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/es/messages.json
[902]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/de/messages.json
[903]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/lv/messages.json
[904]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/nl/messages.json
[905]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/th/messages.json
[906]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/ja/messages.json
[907]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/ca/messages.json
[908]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/cs/messages.json
[909]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/id/messages.json
[910]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/nb/messages.json
[911]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/fr/messages.json
[912]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/pl/messages.json
[913]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/en/messages.json
[914]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/zh_TW/messages.json
[915]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/he/messages.json
[916]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/es_419/messages.json
[917]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/it/messages.json
[918]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/pt_PT/messages.json
[919]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/lt/messages.json
[920]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/et/messages.json
[921]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/en_GB/messages.json
[922]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/fil/messages.json
[923]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/sv/messages.json
[924]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/hr/messages.json
[925]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/ko/messages.json
[926]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/da/messages.json
[927]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/ro/messages.json
[928]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/bg/messages.json
[929]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/ar/messages.json
[930]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/ru/messages.json
[931]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/hi/messages.json
[932]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/sl/messages.json
[933]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/uk/messages.json
[934]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/tr/messages.json
[935]:
  https://developer.chrome.com/extensions/examples/extensions/calendar/_locales/zh_CN/messages.json
[936]: examples/extensions/catblock.zip
[937]: https://developer.chrome.com/extensions/webRequest#event-onBeforeRequest
[938]: https://developer.chrome.com/extensions/examples/extensions/catblock/background.js
[939]: https://developer.chrome.com/extensions/examples/extensions/catblock/loldogs.js
[940]: https://developer.chrome.com/extensions/examples/extensions/catblock/manifest.json
[941]: examples/extensions/catifier.zip
[942]: https://developer.chrome.com/extensions/declarativeWebRequest#type-IgnoreRules
[943]: https://developer.chrome.com/extensions/declarativeWebRequest#type-RedirectRequest
[944]: https://developer.chrome.com/extensions/declarativeWebRequest#type-RequestMatcher
[945]: https://developer.chrome.com/extensions/runtime#property-lastError
[946]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[947]: https://developer.chrome.com/extensions/examples/extensions/catifier/event_page.js
[948]: https://developer.chrome.com/extensions/examples/extensions/catifier/manifest.json
[949]: examples/extensions/chrome_search.zip
[950]: https://developer.chrome.com/extensions/omnibox#event-onInputCancelled
[951]: https://developer.chrome.com/extensions/omnibox#event-onInputChanged
[952]: https://developer.chrome.com/extensions/omnibox#event-onInputEntered
[953]: https://developer.chrome.com/extensions/omnibox#event-onInputStarted
[954]: https://developer.chrome.com/extensions/omnibox#method-setDefaultSuggestion
[955]: https://developer.chrome.com/extensions/tabs#method-query
[956]: https://developer.chrome.com/extensions/tabs#method-update
[957]: https://developer.chrome.com/extensions/examples/extensions/chrome_search/background.js
[958]: https://developer.chrome.com/extensions/examples/extensions/chrome_search/manifest.json
[959]: examples/extensions/constant_context.zip
[960]: https://developer.chrome.com/extensions/declarativeContent#type-PageStateMatcher
[961]: https://developer.chrome.com/extensions/declarativeContent#type-ShowPageAction
[962]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[963]: https://developer.chrome.com/extensions/storage#method-StorageArea-clear
[964]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[965]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[966]: https://developer.chrome.com/extensions/tabs#method-executeScript
[967]: https://developer.chrome.com/extensions/examples/extensions/constant_context/background.js
[968]:
  https://developer.chrome.com/extensions/examples/extensions/constant_context/content_script.js
[969]: https://developer.chrome.com/extensions/examples/extensions/constant_context/manifest.json
[970]: https://developer.chrome.com/extensions/examples/extensions/constant_context/popup.html
[971]: https://developer.chrome.com/extensions/examples/extensions/constant_context/popup.js
[972]: https://developer.chrome.com/extensions/examples/extensions/constant_context/images/cc128.png
[973]: https://developer.chrome.com/extensions/examples/extensions/constant_context/images/cc16.png
[974]: https://developer.chrome.com/extensions/examples/extensions/constant_context/images/cc32.png
[975]: https://developer.chrome.com/extensions/examples/extensions/constant_context/images/cc48.png
[976]: examples/extensions/download_images.zip
[977]: https://developer.chrome.com/extensions/declarativeContent#type-PageStateMatcher
[978]: https://developer.chrome.com/extensions/declarativeContent#type-ShowPageAction
[979]: https://developer.chrome.com/extensions/downloads#method-download
[980]: https://developer.chrome.com/extensions/runtime#property-lastError
[981]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[982]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[983]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[984]: https://developer.chrome.com/extensions/tabs#method-create
[985]: https://developer.chrome.com/extensions/tabs#method-executeScript
[986]: https://developer.chrome.com/extensions/examples/extensions/download_images/background.js
[987]: https://developer.chrome.com/extensions/examples/extensions/download_images/manifest.json
[988]: https://developer.chrome.com/extensions/examples/extensions/download_images/options.html
[989]: https://developer.chrome.com/extensions/examples/extensions/download_images/options.js
[990]: https://developer.chrome.com/extensions/examples/extensions/download_images/popup.html
[991]: https://developer.chrome.com/extensions/examples/extensions/download_images/popup.js
[992]:
  https://developer.chrome.com/extensions/examples/extensions/download_images/images/download_image128.png
[993]:
  https://developer.chrome.com/extensions/examples/extensions/download_images/images/download_image16.png
[994]:
  https://developer.chrome.com/extensions/examples/extensions/download_images/images/download_image32.png
[995]:
  https://developer.chrome.com/extensions/examples/extensions/download_images/images/download_image48.png
[996]: examples/extensions/email_this_page.zip
[997]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[998]: https://developer.chrome.com/extensions/runtime#method-connect
[999]: https://developer.chrome.com/extensions/runtime#event-onConnect
[1000]: https://developer.chrome.com/extensions/tabs#method-create
[1001]: https://developer.chrome.com/extensions/tabs#method-executeScript
[1002]: https://developer.chrome.com/extensions/tabs#method-update
[1003]: https://developer.chrome.com/extensions/examples/extensions/email_this_page/background.js
[1004]:
  https://developer.chrome.com/extensions/examples/extensions/email_this_page/content_script.js
[1005]: https://developer.chrome.com/extensions/examples/extensions/email_this_page/email_16x16.png
[1006]: https://developer.chrome.com/extensions/examples/extensions/email_this_page/mail_128x128.png
[1007]: https://developer.chrome.com/extensions/examples/extensions/email_this_page/manifest.json
[1008]: https://developer.chrome.com/extensions/examples/extensions/email_this_page/options.html
[1009]: https://developer.chrome.com/extensions/examples/extensions/email_this_page/options.js
[1010]: examples/extensions/fx.zip
[1011]: https://developer.chrome.com/extensions/bookmarks#event-onCreated
[1012]: https://developer.chrome.com/extensions/bookmarks#event-onMoved
[1013]: https://developer.chrome.com/extensions/bookmarks#event-onRemoved
[1014]: https://developer.chrome.com/extensions/extension#method-getBackgroundPage
[1015]: https://developer.chrome.com/extensions/extension#event-onRequest
[1016]: https://developer.chrome.com/extensions/extension#method-sendRequest
[1017]: https://developer.chrome.com/extensions/tabs#method-get
[1018]: https://developer.chrome.com/extensions/tabs#event-onAttached
[1019]: https://developer.chrome.com/extensions/tabs#event-onCreated
[1020]: https://developer.chrome.com/extensions/tabs#event-onDetached
[1021]: https://developer.chrome.com/extensions/tabs#event-onMoved
[1022]: https://developer.chrome.com/extensions/tabs#event-onRemoved
[1023]: https://developer.chrome.com/extensions/tabs#event-onSelectionChanged
[1024]: https://developer.chrome.com/extensions/tabs#event-onUpdated
[1025]: https://developer.chrome.com/extensions/windows#event-onCreated
[1026]: https://developer.chrome.com/extensions/windows#event-onFocusChanged
[1027]: https://developer.chrome.com/extensions/windows#event-onRemoved
[1028]: https://developer.chrome.com/extensions/examples/extensions/fx/bg.js
[1029]: https://developer.chrome.com/extensions/examples/extensions/fx/content.js
[1030]: https://developer.chrome.com/extensions/examples/extensions/fx/icon.png
[1031]: https://developer.chrome.com/extensions/examples/extensions/fx/manifest.json
[1032]: https://developer.chrome.com/extensions/examples/extensions/fx/options.html
[1033]: https://developer.chrome.com/extensions/examples/extensions/fx/options.js
[1034]: examples/extensions/gdocs.zip
[1035]: https://developer.chrome.com/extensions/extension#method-getBackgroundPage
[1036]: https://developer.chrome.com/extensions/extension#method-getURL
[1037]: https://developer.chrome.com/extensions/tabs#method-create
[1038]: https://developer.chrome.com/extensions/tabs#event-onUpdated
[1039]: https://developer.chrome.com/extensions/tabs#method-query
[1040]: https://developer.chrome.com/extensions/tabs#method-remove
[1041]: https://developer.chrome.com/extensions/examples/extensions/gdocs/README
[1042]: https://developer.chrome.com/extensions/examples/extensions/gdocs/background.html
[1043]: https://developer.chrome.com/extensions/examples/extensions/gdocs/chrome_ex_oauth.html
[1044]: https://developer.chrome.com/extensions/examples/extensions/gdocs/chrome_ex_oauth.js
[1045]: https://developer.chrome.com/extensions/examples/extensions/gdocs/chrome_ex_oauthsimple.js
[1046]: https://developer.chrome.com/extensions/examples/extensions/gdocs/manifest.json
[1047]: https://developer.chrome.com/extensions/examples/extensions/gdocs/options.html
[1048]: https://developer.chrome.com/extensions/examples/extensions/gdocs/popup.html
[1049]:
  https://developer.chrome.com/extensions/examples/extensions/gdocs/img/docs_spreadsheets-128.gif
[1050]:
  https://developer.chrome.com/extensions/examples/extensions/gdocs/img/docs_spreadsheets-32.gif
[1051]:
  https://developer.chrome.com/extensions/examples/extensions/gdocs/img/docs_spreadsheets-48.gif
[1052]: https://developer.chrome.com/extensions/examples/extensions/gdocs/js/jquery-1.4.1.min.js
[1053]: https://developer.chrome.com/extensions/examples/extensions/gdocs/img/icons/audio.gif
[1054]: https://developer.chrome.com/extensions/examples/extensions/gdocs/img/icons/document.gif
[1055]: https://developer.chrome.com/extensions/examples/extensions/gdocs/img/icons/file.gif
[1056]: https://developer.chrome.com/extensions/examples/extensions/gdocs/img/icons/folder.gif
[1057]: https://developer.chrome.com/extensions/examples/extensions/gdocs/img/icons/form.gif
[1058]: https://developer.chrome.com/extensions/examples/extensions/gdocs/img/icons/pdf.gif
[1059]: https://developer.chrome.com/extensions/examples/extensions/gdocs/img/icons/presentation.gif
[1060]: https://developer.chrome.com/extensions/examples/extensions/gdocs/img/icons/spreadsheet.gif
[1061]: examples/extensions/gmail.zip
[1062]: https://developer.chrome.com/extensions/alarms#method-create
[1063]: https://developer.chrome.com/extensions/alarms#method-get
[1064]: https://developer.chrome.com/extensions/alarms#event-onAlarm
[1065]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[1066]: https://developer.chrome.com/extensions/browserAction#method-setBadgeBackgroundColor
[1067]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText
[1068]: https://developer.chrome.com/extensions/browserAction#method-setIcon
[1069]: https://developer.chrome.com/extensions/i18n#method-getMessage
[1070]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[1071]: https://developer.chrome.com/extensions/runtime#event-onStartup
[1072]: https://developer.chrome.com/extensions/runtime#event-onStartup
[1073]: https://developer.chrome.com/extensions/tabs#method-create
[1074]: https://developer.chrome.com/extensions/tabs#method-getAllInWindow
[1075]: https://developer.chrome.com/extensions/tabs#event-onUpdated
[1076]: https://developer.chrome.com/extensions/tabs#method-update
[1077]: https://developer.chrome.com/extensions/webNavigation#event-onDOMContentLoaded
[1078]: https://developer.chrome.com/extensions/webNavigation#event-onDOMContentLoaded
[1079]: https://developer.chrome.com/extensions/webNavigation#event-onReferenceFragmentUpdated
[1080]: https://developer.chrome.com/extensions/webNavigation#event-onReferenceFragmentUpdated
[1081]: https://developer.chrome.com/extensions/windows#event-onCreated
[1082]: https://developer.chrome.com/extensions/examples/extensions/gmail/background.html
[1083]: https://developer.chrome.com/extensions/examples/extensions/gmail/background.js
[1084]: https://developer.chrome.com/extensions/examples/extensions/gmail/gmail_logged_in.png
[1085]: https://developer.chrome.com/extensions/examples/extensions/gmail/gmail_not_logged_in.png
[1086]: https://developer.chrome.com/extensions/examples/extensions/gmail/icon_128.png
[1087]: https://developer.chrome.com/extensions/examples/extensions/gmail/manifest.json
[1088]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/es/messages.json
[1089]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/nl/messages.json
[1090]:
  https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/pt_BR/messages.json
[1091]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/ar/messages.json
[1092]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/sk/messages.json
[1093]:
  https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/pt_PT/messages.json
[1094]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/he/messages.json
[1095]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/lv/messages.json
[1096]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/hr/messages.json
[1097]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/nb/messages.json
[1098]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/fil/messages.json
[1099]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/hi/messages.json
[1100]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/sv/messages.json
[1101]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/ko/messages.json
[1102]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/cs/messages.json
[1103]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/da/messages.json
[1104]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/sl/messages.json
[1105]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/pl/messages.json
[1106]:
  https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/es_419/messages.json
[1107]:
  https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/en_GB/messages.json
[1108]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/fi/messages.json
[1109]:
  https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/zh_CN/messages.json
[1110]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/en/messages.json
[1111]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/vi/messages.json
[1112]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/hu/messages.json
[1113]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/el/messages.json
[1114]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/th/messages.json
[1115]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/id/messages.json
[1116]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/bg/messages.json
[1117]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/ca/messages.json
[1118]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/sr/messages.json
[1119]:
  https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/zh_TW/messages.json
[1120]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/ro/messages.json
[1121]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/ja/messages.json
[1122]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/tr/messages.json
[1123]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/uk/messages.json
[1124]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/it/messages.json
[1125]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/fr/messages.json
[1126]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/et/messages.json
[1127]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/ru/messages.json
[1128]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/lt/messages.json
[1129]: https://developer.chrome.com/extensions/examples/extensions/gmail/_locales/de/messages.json
[1130]: examples/extensions/imageinfo.zip
[1131]: https://developer.chrome.com/extensions/contextMenus#method-create
[1132]: https://developer.chrome.com/extensions/tabs#method-getCurrent
[1133]: https://developer.chrome.com/extensions/windows#method-create
[1134]: https://developer.chrome.com/extensions/windows#method-update
[1135]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/NOTICE
[1136]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/background.js
[1137]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/imageinfo-128.png
[1138]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/imageinfo-16.png
[1139]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/imageinfo-48.png
[1140]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/info.css
[1141]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/info.html
[1142]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/info.js
[1143]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/loader.gif
[1144]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/manifest.json
[1145]:
  https://developer.chrome.com/extensions/examples/extensions/imageinfo/imageinfo/binaryajax.js
[1146]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/imageinfo/exif.js
[1147]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/imageinfo/imageinfo.js
[1148]: https://developer.chrome.com/extensions/examples/extensions/imageinfo/imageinfo/readme.txt
[1149]: examples/extensions/irc/app.zip
[1150]: https://developer.chrome.com/extensions/examples/extensions/irc/app/manifest.json
[1151]: examples/extensions/managed_bookmarks.zip
[1152]: https://developer.chrome.com/extensions/bookmarks#method-create
[1153]: https://developer.chrome.com/extensions/bookmarks#method-getChildren
[1154]: https://developer.chrome.com/extensions/bookmarks#method-move
[1155]: https://developer.chrome.com/extensions/bookmarks#event-onChanged
[1156]: https://developer.chrome.com/extensions/bookmarks#event-onMoved
[1157]: https://developer.chrome.com/extensions/bookmarks#event-onRemoved
[1158]: https://developer.chrome.com/extensions/bookmarks#method-remove
[1159]: https://developer.chrome.com/extensions/bookmarks#method-removeTree
[1160]: https://developer.chrome.com/extensions/bookmarks#method-update
[1161]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[1162]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[1163]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[1164]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[1165]: https://developer.chrome.com/extensions/storage#event-onChanged
[1166]: https://developer.chrome.com/extensions/examples/extensions/managed_bookmarks/background.js
[1167]: https://developer.chrome.com/extensions/examples/extensions/managed_bookmarks/manifest.json
[1168]: https://developer.chrome.com/extensions/examples/extensions/managed_bookmarks/schema.json
[1169]:
  https://developer.chrome.com/extensions/examples/extensions/managed_bookmarks/_locales/en/messages.json
[1170]: examples/extensions/mappy.zip
[1171]: https://developer.chrome.com/extensions/pageAction#method-setTitle
[1172]: https://developer.chrome.com/extensions/pageAction#method-show
[1173]: https://developer.chrome.com/extensions/runtime#event-onMessage
[1174]: https://developer.chrome.com/extensions/runtime#method-sendMessage
[1175]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[1176]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[1177]: https://developer.chrome.com/extensions/examples/extensions/mappy/background.js
[1178]: https://developer.chrome.com/extensions/examples/extensions/mappy/icon.png
[1179]: https://developer.chrome.com/extensions/examples/extensions/mappy/manifest.json
[1180]: https://developer.chrome.com/extensions/examples/extensions/mappy/mappy_content_script.js
[1181]: https://developer.chrome.com/extensions/examples/extensions/mappy/marker.png
[1182]: https://developer.chrome.com/extensions/examples/extensions/mappy/popup.css
[1183]: https://developer.chrome.com/extensions/examples/extensions/mappy/popup.html
[1184]: https://developer.chrome.com/extensions/examples/extensions/mappy/popup.js
[1185]: examples/extensions/maps_app.zip
[1186]: https://developer.chrome.com/extensions/examples/extensions/maps_app/128.png
[1187]: https://developer.chrome.com/extensions/examples/extensions/maps_app/24.png
[1188]: https://developer.chrome.com/extensions/examples/extensions/maps_app/manifest.json
[1189]: examples/extensions/news.zip
[1190]: https://developer.chrome.com/extensions/extension#method-getURL
[1191]: https://developer.chrome.com/extensions/i18n#method-getMessage
[1192]: https://developer.chrome.com/extensions/tabs#method-create
[1193]: https://developer.chrome.com/extensions/examples/extensions/news/manifest.json
[1194]: https://developer.chrome.com/extensions/examples/extensions/news/images/buzz.png
[1195]: https://developer.chrome.com/extensions/examples/extensions/news/images/delete-icon.png
[1196]: https://developer.chrome.com/extensions/examples/extensions/news/images/fb.png
[1197]: https://developer.chrome.com/extensions/examples/extensions/news/images/news.gif
[1198]: https://developer.chrome.com/extensions/examples/extensions/news/images/news_action.png
[1199]: https://developer.chrome.com/extensions/examples/extensions/news/images/news_icon.png
[1200]: https://developer.chrome.com/extensions/examples/extensions/news/images/sprite_arrows.gif
[1201]: https://developer.chrome.com/extensions/examples/extensions/news/images/twitter.png
[1202]: https://developer.chrome.com/extensions/examples/extensions/news/css/feed.css
[1203]: https://developer.chrome.com/extensions/examples/extensions/news/css/options.css
[1204]: https://developer.chrome.com/extensions/examples/extensions/news/javascript/feed.js
[1205]: https://developer.chrome.com/extensions/examples/extensions/news/javascript/options.js
[1206]: https://developer.chrome.com/extensions/examples/extensions/news/javascript/util.js
[1207]: https://developer.chrome.com/extensions/examples/extensions/news/views/background.html
[1208]: https://developer.chrome.com/extensions/examples/extensions/news/views/feed.html
[1209]: https://developer.chrome.com/extensions/examples/extensions/news/views/options.html
[1210]: https://developer.chrome.com/extensions/examples/extensions/news/_locales/en/messages.json
[1211]: examples/extensions/news_a11y.zip
[1212]: https://developer.chrome.com/extensions/tabs#method-create
[1213]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/feed.css
[1214]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/feed.html
[1215]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/feed.js
[1216]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/feed_iframe.css
[1217]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/feed_iframe.js
[1218]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/manifest.json
[1219]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/news_action.png
[1220]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/news_icon.png
[1221]: https://developer.chrome.com/extensions/examples/extensions/news_a11y/sprite_arrows.gif
[1222]: examples/extensions/news_i18n.zip
[1223]: https://developer.chrome.com/extensions/examples/extensions/news_i18n/feed.html
[1224]: https://developer.chrome.com/extensions/examples/extensions/news_i18n/manifest.json
[1225]: https://developer.chrome.com/extensions/examples/extensions/news_i18n/news_action.png
[1226]: https://developer.chrome.com/extensions/examples/extensions/news_i18n/news_icon.png
[1227]: https://developer.chrome.com/extensions/examples/extensions/news_i18n/sprite_arrows.gif
[1228]:
  https://developer.chrome.com/extensions/examples/extensions/news_i18n/_locales/sr/messages.json
[1229]:
  https://developer.chrome.com/extensions/examples/extensions/news_i18n/_locales/es/messages.json
[1230]:
  https://developer.chrome.com/extensions/examples/extensions/news_i18n/_locales/en/messages.json
[1231]: examples/extensions/no_cookies.zip
[1232]: https://developer.chrome.com/extensions/webRequest#event-onBeforeSendHeaders
[1233]: https://developer.chrome.com/extensions/webRequest#event-onHeadersReceived
[1234]: https://developer.chrome.com/extensions/examples/extensions/no_cookies/background.js
[1235]: https://developer.chrome.com/extensions/examples/extensions/no_cookies/manifest.json
[1236]: examples/extensions/oauth_contacts.zip
[1237]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[1238]: https://developer.chrome.com/extensions/browserAction#method-setIcon
[1239]: https://developer.chrome.com/extensions/extension#method-getBackgroundPage
[1240]: https://developer.chrome.com/extensions/extension#method-getURL
[1241]: https://developer.chrome.com/extensions/tabs#method-create
[1242]: https://developer.chrome.com/extensions/tabs#event-onUpdated
[1243]: https://developer.chrome.com/extensions/tabs#method-query
[1244]: https://developer.chrome.com/extensions/tabs#method-remove
[1245]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/NOTICE
[1246]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/README
[1247]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/background.js
[1248]:
  https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/chrome_ex_oauth.html
[1249]:
  https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/chrome_ex_oauth.js
[1250]:
  https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/chrome_ex_oauthsimple.js
[1251]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/contacts.html
[1252]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/contacts.js
[1253]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/manifest.json
[1254]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/onload.js
[1255]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/img/icon-128.png
[1256]:
  https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/img/icon-19-off.png
[1257]:
  https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/img/icon-19-on.png
[1258]: https://developer.chrome.com/extensions/examples/extensions/oauth_contacts/img/icon-48.png
[1259]: examples/extensions/optional_permissions.zip
[1260]: https://developer.chrome.com/extensions/permissions#method-contains
[1261]: https://developer.chrome.com/extensions/permissions#method-request
[1262]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[1263]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[1264]: https://developer.chrome.com/extensions/topSites#method-get
[1265]: https://developer.chrome.com/extensions/examples/extensions/optional_permissions/logic.js
[1266]:
  https://developer.chrome.com/extensions/examples/extensions/optional_permissions/manifest.json
[1267]: https://developer.chrome.com/extensions/examples/extensions/optional_permissions/newtab.html
[1268]: https://developer.chrome.com/extensions/examples/extensions/optional_permissions/style.css
[1269]:
  https://developer.chrome.com/extensions/examples/extensions/optional_permissions/images/optional_permissions128.png
[1270]:
  https://developer.chrome.com/extensions/examples/extensions/optional_permissions/images/optional_permissions16.png
[1271]:
  https://developer.chrome.com/extensions/examples/extensions/optional_permissions/images/optional_permissions32.png
[1272]:
  https://developer.chrome.com/extensions/examples/extensions/optional_permissions/images/optional_permissions48.png
[1273]: examples/extensions/plugin_settings.zip
[1274]: https://developer.chrome.com/extensions/contentSettings#property-plugins
[1275]: https://developer.chrome.com/extensions/contentSettings#method-ContentSetting-clear
[1276]:
  https://developer.chrome.com/extensions/contentSettings#method-ContentSetting-getResourceIdentifiers
[1277]: https://developer.chrome.com/extensions/contentSettings#method-ContentSetting-set
[1278]: https://developer.chrome.com/extensions/i18n#method-getMessage
[1279]: https://developer.chrome.com/extensions/runtime#property-lastError
[1280]: https://developer.chrome.com/extensions/examples/extensions/plugin_settings/bunny128.png
[1281]: https://developer.chrome.com/extensions/examples/extensions/plugin_settings/bunny48.png
[1282]: https://developer.chrome.com/extensions/examples/extensions/plugin_settings/manifest.json
[1283]: https://developer.chrome.com/extensions/examples/extensions/plugin_settings/options.html
[1284]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/js/chrome_stubs.js
[1285]: https://developer.chrome.com/extensions/examples/extensions/plugin_settings/js/main.js
[1286]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/js/plugin_list.js
[1287]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/js/plugin_list_test.html
[1288]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/js/plugin_settings.js
[1289]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/js/plugin_settings_test.html
[1290]: https://developer.chrome.com/extensions/examples/extensions/plugin_settings/js/rule_list.js
[1291]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/js/rule_list_test.html
[1292]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/css/plugin_list.css
[1293]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/css/rule_list.css
[1294]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/css/button.css
[1295]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/css/chrome_shared.css
[1296]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/css/list.css
[1297]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/css/select.css
[1298]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/options/images/close_bar.png
[1299]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/options/images/close_bar_h.png
[1300]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/options/images/close_bar_p.png
[1301]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/options/js/deletable_item_list.js
[1302]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/options/js/inline_editable_list.js
[1303]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/images/select.png
[1304]: https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr.js
[1305]: https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/util.js
[1306]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/_locales/en/messages.json
[1307]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/options/css/list.css
[1308]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr/event_target.js
[1309]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr/ui.js
[1310]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr/ui/array_data_model.js
[1311]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr/ui/list.js
[1312]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr/ui/list_item.js
[1313]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr/ui/list_selection_controller.js
[1314]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr/ui/list_selection_model.js
[1315]:
  https://developer.chrome.com/extensions/examples/extensions/plugin_settings/domui/js/cr/ui/list_single_selection_model.js
[1316]: examples/extensions/proxy_configuration.zip
[1317]: https://developer.chrome.com/extensions/browserAction#method-setBadgeBackgroundColor
[1318]: https://developer.chrome.com/extensions/browserAction#method-setBadgeText
[1319]: https://developer.chrome.com/extensions/browserAction#method-setTitle
[1320]: https://developer.chrome.com/extensions/extension#method-isAllowedIncognitoAccess
[1321]: https://developer.chrome.com/extensions/extension#event-onRequest
[1322]: https://developer.chrome.com/extensions/extension#method-sendRequest
[1323]: https://developer.chrome.com/extensions/i18n#method-getMessage
[1324]: https://developer.chrome.com/extensions/proxy#event-onProxyError
[1325]: https://developer.chrome.com/extensions/runtime#property-lastError
[1326]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/background.js
[1327]: https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/icon128.png
[1328]: https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/icon16.png
[1329]: https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/icon32.png
[1330]: https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/icon48.png
[1331]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/manifest.json
[1332]: https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/popup.css
[1333]: https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/popup.html
[1334]: https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/popup.js
[1335]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/proxy_error_handler.js
[1336]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/proxy_form_controller.js
[1337]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/test/jsunittest.js
[1338]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/test/proxy_form_controller_test.html
[1339]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/test/proxy_form_controller_test.js
[1340]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/test/unittest.css
[1341]:
  https://developer.chrome.com/extensions/examples/extensions/proxy_configuration/_locales/en/messages.json
[1342]: examples/extensions/speak_selection.zip
[1343]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[1344]: https://developer.chrome.com/extensions/browserAction#method-setIcon
[1345]: https://developer.chrome.com/extensions/extension#method-getURL
[1346]: https://developer.chrome.com/extensions/extension#event-onRequest
[1347]: https://developer.chrome.com/extensions/extension#method-sendRequest
[1348]: https://developer.chrome.com/extensions/tabs#method-create
[1349]: https://developer.chrome.com/extensions/tabs#method-executeScript
[1350]: https://developer.chrome.com/extensions/tabs#method-sendRequest
[1351]: https://developer.chrome.com/extensions/tts#method-getVoices
[1352]: https://developer.chrome.com/extensions/tts#method-speak
[1353]: https://developer.chrome.com/extensions/tts#method-stop
[1354]: https://developer.chrome.com/extensions/windows#method-getAll
[1355]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/SpeakSel128.png
[1356]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/SpeakSel16.png
[1357]:
  https://developer.chrome.com/extensions/examples/extensions/speak_selection/SpeakSel19-active.png
[1358]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/SpeakSel19.png
[1359]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/SpeakSel256.png
[1360]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/SpeakSel48.png
[1361]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/background.js
[1362]:
  https://developer.chrome.com/extensions/examples/extensions/speak_selection/content_script.js
[1363]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/keycodes.js
[1364]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/manifest.json
[1365]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/options.html
[1366]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/options.js
[1367]: https://developer.chrome.com/extensions/examples/extensions/speak_selection/tabs.js
[1368]: examples/extensions/talking_alarm_clock.zip
[1369]: https://developer.chrome.com/extensions/browserAction#method-setIcon
[1370]: https://developer.chrome.com/extensions/runtime#method-connect
[1371]: https://developer.chrome.com/extensions/runtime#event-onConnect
[1372]: https://developer.chrome.com/extensions/tts#method-getVoices
[1373]: https://developer.chrome.com/extensions/tts#method-speak
[1374]: https://developer.chrome.com/extensions/tts#method-stop
[1375]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/background.js
[1376]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/blank-clock-150.png
[1377]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/blank-clock-ring1-150.png
[1378]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/blank-clock-ring2-150.png
[1379]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/clock-128.png
[1380]: https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/clock-16.png
[1381]: https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/clock-19.png
[1382]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/clock-256.png
[1383]: https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/clock-48.png
[1384]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/clock-disabled-19.png
[1385]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/clock-highlighted-19.png
[1386]: https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/common.js
[1387]: https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/credits.html
[1388]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/manifest.json
[1389]: https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/play.png
[1390]: https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/popup.html
[1391]: https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/popup.js
[1392]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/audio/cuckoo.ogg
[1393]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/audio/digital.ogg
[1394]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/audio/metal.ogg
[1395]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/audio/ringing.ogg
[1396]:
  https://developer.chrome.com/extensions/examples/extensions/talking_alarm_clock/audio/rooster.ogg
[1397]: examples/extensions/ttsdebug.zip
[1398]: https://developer.chrome.com/extensions/tts#method-getVoices
[1399]: https://developer.chrome.com/extensions/tts#method-speak
[1400]: https://developer.chrome.com/extensions/tts#method-stop
[1401]: https://developer.chrome.com/extensions/examples/extensions/ttsdebug/128.png
[1402]: https://developer.chrome.com/extensions/examples/extensions/ttsdebug/16.png
[1403]: https://developer.chrome.com/extensions/examples/extensions/ttsdebug/256.png
[1404]: https://developer.chrome.com/extensions/examples/extensions/ttsdebug/manifest.json
[1405]: https://developer.chrome.com/extensions/examples/extensions/ttsdebug/pacman.gif
[1406]: https://developer.chrome.com/extensions/examples/extensions/ttsdebug/ttsdebug.css
[1407]: https://developer.chrome.com/extensions/examples/extensions/ttsdebug/ttsdebug.html
[1408]: https://developer.chrome.com/extensions/examples/extensions/ttsdebug/ttsdebug.js
[1409]: examples/extensions/ttsdemo.zip
[1410]: https://developer.chrome.com/extensions/runtime#property-lastError
[1411]: https://developer.chrome.com/extensions/tts#method-getVoices
[1412]: https://developer.chrome.com/extensions/tts#method-isSpeaking
[1413]: https://developer.chrome.com/extensions/tts#method-speak
[1414]: https://developer.chrome.com/extensions/tts#method-stop
[1415]: https://developer.chrome.com/extensions/examples/extensions/ttsdemo/128.png
[1416]: https://developer.chrome.com/extensions/examples/extensions/ttsdemo/16.png
[1417]: https://developer.chrome.com/extensions/examples/extensions/ttsdemo/256.png
[1418]: https://developer.chrome.com/extensions/examples/extensions/ttsdemo/manifest.json
[1419]: https://developer.chrome.com/extensions/examples/extensions/ttsdemo/ttsdemo.html
[1420]: https://developer.chrome.com/extensions/examples/extensions/ttsdemo/ttsdemo.js
[1421]: examples/howto/sandbox.zip
[1422]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[1423]: https://developer.chrome.com/extensions/examples/howto/sandbox/LICENSE.handlebars
[1424]: https://developer.chrome.com/extensions/examples/howto/sandbox/eventpage.html
[1425]: https://developer.chrome.com/extensions/examples/howto/sandbox/eventpage.js
[1426]: https://developer.chrome.com/extensions/examples/howto/sandbox/handlebars-1.0.0.beta.6.js
[1427]: https://developer.chrome.com/extensions/examples/howto/sandbox/icon.png
[1428]: https://developer.chrome.com/extensions/examples/howto/sandbox/manifest.json
[1429]: https://developer.chrome.com/extensions/examples/howto/sandbox/sandbox.html
[1430]: examples/howto/tab_shortcuts.zip
[1431]: https://developer.chrome.com/extensions/commands#event-onCommand
[1432]: https://developer.chrome.com/extensions/tabs#method-duplicate
[1433]: https://developer.chrome.com/extensions/tabs#method-update
[1434]: https://developer.chrome.com/extensions/examples/howto/tab_shortcuts/manifest.json
[1435]: https://developer.chrome.com/extensions/examples/howto/tab_shortcuts/tab_shortcuts.js
[1436]: examples/tutorials/analytics.zip
[1437]:
  https://developer.chrome.com/extensions/examples/tutorials/analytics/analytics-extension-icon-128.png
[1438]:
  https://developer.chrome.com/extensions/examples/tutorials/analytics/analytics-extension-icon-19.png
[1439]:
  https://developer.chrome.com/extensions/examples/tutorials/analytics/analytics-extension-icon-48.png
[1440]: https://developer.chrome.com/extensions/examples/tutorials/analytics/manifest.json
[1441]: https://developer.chrome.com/extensions/examples/tutorials/analytics/popup.html
[1442]: https://developer.chrome.com/extensions/examples/tutorials/analytics/popup.js
[1443]: examples/tutorials/broken_background_color.zip
[1444]: https://developer.chrome.com/extensions/declarativeContent#type-PageStateMatcher
[1445]: https://developer.chrome.com/extensions/declarativeContent#type-ShowPageAction
[1446]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[1447]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[1448]: https://developer.chrome.com/extensions/tabs#method-executeScript
[1449]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/background.js
[1450]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/manifest.json
[1451]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/options.html
[1452]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/options.js
[1453]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/popup.html
[1454]: https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/popup.js
[1455]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/images/get_started128.png
[1456]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/images/get_started16.png
[1457]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/images/get_started32.png
[1458]:
  https://developer.chrome.com/extensions/examples/tutorials/broken_background_color/images/get_started48.png
[1459]: examples/tutorials/get_started.zip
[1460]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[1461]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[1462]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[1463]: https://developer.chrome.com/extensions/examples/tutorials/get_started/background.js
[1464]: https://developer.chrome.com/extensions/examples/tutorials/get_started/images.zip
[1465]: https://developer.chrome.com/extensions/examples/tutorials/get_started/manifest.json
[1466]: https://developer.chrome.com/extensions/examples/tutorials/get_started/options.html
[1467]: https://developer.chrome.com/extensions/examples/tutorials/get_started/options.js
[1468]: https://developer.chrome.com/extensions/examples/tutorials/get_started/popup.html
[1469]: https://developer.chrome.com/extensions/examples/tutorials/get_started/popup.js
[1470]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started/images/get_started128.png
[1471]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started/images/get_started16.png
[1472]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started/images/get_started32.png
[1473]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started/images/get_started48.png
[1474]: examples/tutorials/get_started_complete.zip
[1475]: https://developer.chrome.com/extensions/declarativeContent#type-PageStateMatcher
[1476]: https://developer.chrome.com/extensions/declarativeContent#type-ShowPageAction
[1477]: https://developer.chrome.com/extensions/runtime#event-onInstalled
[1478]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[1479]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[1480]: https://developer.chrome.com/extensions/tabs#method-executeScript
[1481]: https://developer.chrome.com/extensions/tabs#method-query
[1482]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/background.js
[1483]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/manifest.json
[1484]: https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/options.html
[1485]: https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/options.js
[1486]: https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/popup.html
[1487]: https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/popup.js
[1488]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/images/get_started128.png
[1489]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/images/get_started16.png
[1490]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/images/get_started32.png
[1491]:
  https://developer.chrome.com/extensions/examples/tutorials/get_started_complete/images/get_started48.png
[1492]: examples/tutorials/getstarted.zip
[1493]: https://developer.chrome.com/extensions/runtime#property-lastError
[1494]: https://developer.chrome.com/extensions/storage#property-local
[1495]: https://developer.chrome.com/extensions/storage#property-sync
[1496]: https://developer.chrome.com/extensions/storage#method-StorageArea-get
[1497]: https://developer.chrome.com/extensions/storage#method-StorageArea-set
[1498]: https://developer.chrome.com/extensions/tabs#method-executeScript
[1499]: https://developer.chrome.com/extensions/tabs#method-query
[1500]: https://developer.chrome.com/extensions/examples/tutorials/getstarted/icon.png
[1501]: https://developer.chrome.com/extensions/examples/tutorials/getstarted/manifest.json
[1502]: https://developer.chrome.com/extensions/examples/tutorials/getstarted/popup.html
[1503]: https://developer.chrome.com/extensions/examples/tutorials/getstarted/popup.js
[1504]: examples/tutorials/hello_extensions.zip
[1505]: https://developer.chrome.com/extensions/examples/tutorials/hello_extensions/hello.html
[1506]:
  https://developer.chrome.com/extensions/examples/tutorials/hello_extensions/hello_extensions.png
[1507]: https://developer.chrome.com/extensions/examples/tutorials/hello_extensions/manifest.json
[1508]: examples/tutorials/oauth_starter.zip
[1509]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[1510]: https://developer.chrome.com/extensions/identity#method-getAuthToken
[1511]: https://developer.chrome.com/extensions/tabs#method-create
[1512]: https://developer.chrome.com/extensions/examples/tutorials/oauth_starter/background.js
[1513]: https://developer.chrome.com/extensions/examples/tutorials/oauth_starter/index.html
[1514]: https://developer.chrome.com/extensions/examples/tutorials/oauth_starter/manifest.json
[1515]: https://developer.chrome.com/extensions/examples/tutorials/oauth_starter/oauth.js
[1516]: examples/tutorials/oauth_tutorial_complete.zip
[1517]: https://developer.chrome.com/extensions/browserAction#event-onClicked
[1518]: https://developer.chrome.com/extensions/identity#method-getAuthToken
[1519]: https://developer.chrome.com/extensions/tabs#method-create
[1520]:
  https://developer.chrome.com/extensions/examples/tutorials/oauth_tutorial_complete/background.js
[1521]:
  https://developer.chrome.com/extensions/examples/tutorials/oauth_tutorial_complete/index.html
[1522]:
  https://developer.chrome.com/extensions/examples/tutorials/oauth_tutorial_complete/manifest.json
[1523]: https://developer.chrome.com/extensions/examples/tutorials/oauth_tutorial_complete/oauth.js
