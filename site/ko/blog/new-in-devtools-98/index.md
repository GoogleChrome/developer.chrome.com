---
layout: "layouts/blog-post.njk"
title: "DevTools 의 새로운 기능 (Chrome 98)"
authors:
  - jecelynyeen
date: 2022-01-13
updated: 2022-01-13
description:
  "전체 페이지 접근성 트리, 변경 탭에서의 더욱 정교한 변화들 및 다른 새로운 기능들"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JBJjMJE3vqBrIPkPUt7D.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-98
---

*이 게시글의 번역에는 [최원영](https://www.linkedin.com/in/toruchoi)님이 참여하였으며, [도창욱](https://developers.google.com/community/experts/directory/profile/profile-changwook-doh)님이 리뷰를 맡아 주셨습니다.*

{% Partial 'devtools/banner.md' %}

{% YouTube id='YqkIS88VulM' %}
<!-- start: translation instructions -->
<!-- 1. Remove the "draft: true" tag above when submitting PR -->
<!-- 2. Provide translations under each of the English commented original content -->
<!-- 3. Translate the "description" tag above -->
<!-- 4. Translate all the <img> alt text -->
<!-- 5. Update the whats-new.md file -->
<!-- end: translation instructions -->

<!-- ## Preview feature: Full-page accessibility tree {: #a11y-tree } -->
## 미리보기 기능: 전체 페이지 접근성 트리 {: #a11y-tree }
<!-- The new **Full-page accessibility tree** makes it easier for you to get an overview of the full-page [accessibility tree](/blog/full-accessibility-tree/#what-is-the-accessibility-tree) and help you better understand how your web content is exposed to assistive technology.  -->
사용자들은 새로운 **전체 페이지 접근성 트리** 를 통해 전체 페이지 [접근성 트리](/blog/full-accessibility-tree/#what-is-the-accessibility-tree)의 개요를 좀더 쉽게 알 수 있으며, 이 기능은 웹 컨텐츠가 어떻게 보조 기술에 노출되는지를 사용자들이 좀더 잘 이해할 수 있도록 합니다.

<!-- In the **Elements** panel, open the **Accessibility** pane and select **Enable full-page accessibility tree** checkbox. Then, reload DevTools and you will see a new accessibility button in the **Elements** panel. -->
**요소** 패널에서 **접근성** 패널을 열고 **전체 페이지 접근성 트리 사용 설정** 체크박스를 선택합니다. 이후 DevTools를 새로고침하면 **요소** 패널에 접근성 버튼이 생긴 것을 확인할 수 있습니다.

<!-- Click on it to toggle to the **Full-page accessibility tree** view. You can expand nodes or click to see details in the  **Accessibility** pane. -->
**전체 페이지 접근성 트리** 뷰로 전환하기 위해서, 아래 그림의 왼쪽 아이콘 위에서 클릭합니다. 우리는 각 노드들을 확장할 수 있으며, 각자의 노드를 클릭하여 **접근성** 패널에서 세부 사항들을 볼 수 있습니다.

<!-- Previously, the accessibility tree was available in the **Accessibility** pane. The view is limited, it only enables you to explore a single node and its ancestors. -->
접근성 트리는 **접근성** 패널에서 이용가능했습니다만, 그 뷰 자체는 오직 싱글 노드 및 그 노드의 조상들만을 볼 수 있을 만큼 제한적이었습니다.

<!-- Our team is still actively working on this preview feature. We are looking for your [feedback](https://goo.gle/devtools-a11y-tree-feedback) for further enhancements! -->
우리는 아직 이 미리보기 기능 구현에 대해 적극적으로 작업하고 있으며, 앞으로의 개선점에 대한 여러분들의 [의견](https://goo.gle/devtools-a11y-tree-feedback)을 기다리고 있습니다! 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/o4BY07JabERFd6OieU8b.png", alt="전체 페이지 접근성 트리", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/847a06a6535111826f898175b210dbe0948277a0 #}

Chromium issue: [887173](https://crbug.com/887173)


<!-- ## More precise changes in the Changes tab {: #changes }  -->
## 변경 탭에서의 더욱 정교한 변화들 {: #changes }
<!-- The code changes in the **Changes** tab is pretty-printed automatically.  -->
**변경** 탭에서의 코드 체인지들은 자동적으로 깔끔하게 프린트됩니다.
<!-- Previously, it was hard to trace the actual changes of minified source code because all the code is shown in a single line.  -->
이전 버전에서는 모든 코드가 한 줄에 표시되었기 때문에 압축된 소스 코드에서의 실제 변화를 추적하는 것은 쉽지 않았습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/aup2bT490dkvuBu3o4DS.png", alt="Changes tab", width="800", height="450" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4382b533525c65fbdb1785eda2babf035ad8bcb8 #}

Chromium issues: [1238818](https://crbug.com/1238818), [1268754](https://crbug.com/1268754) , [1086491](https://crbug.com/1086491)


<!-- ## Set longer timeout for user flow recording {: #recorder-timeout } -->
## 유저 플로우 레코딩을 위한 더 긴 타임아웃 설정 {: #recorder-timeout }
<!-- You can now adjust the **Timeout** settings in the [Recorder](/docs/devtools/recorder/) for all steps or a specific step. This is useful especially for pages with slow network requests and lengthy animation. -->
이제 여러분들은 [Recorder](/docs/devtools/recorder/)에서 모든 단계 혹은 특정한 단계에서의 **타임아웃** 설정을 조정할 수 있게 됐습니다. 이 기능은 느린 네트워크 요청과 긴 애니메이션이 포함된 페이지에서 유용하게 사용될 것입니다.

<!-- For example, I [recorded a user flow](/docs/devtools/recorder/#record) on this [demo page](https://jec.fish/demo/pup-slow-result) to load and click on the menu item. However, the loading of the menu items is slow (it takes 6 seconds). The [replay](/docs/devtools/recorder/#replay) of this user flow failed because it exceeds 5 seconds  (the default timeout). -->
예를 들어, [데모 페이지](https://jec.fish/demo/pup-slow-result)에서 [유저 플로우 녹화](/docs/devtools/recorder/#record) 를 시작하고 메뉴 항목을 클릭하여 로드합니다. 그러나 메뉴를 불러들이는 것이 6초가 걸렸습니다. 로딩 시간이 5초를 초과-기본 타임아웃-했기 때문에 이 유저 플로우의 [다시보기](/docs/devtools/recorder/#replay)는 정상적으로 동작하지 않았습니다.

<!-- We can use the new **Timeout** settings to fix this. Expand the step which we click on the menu item. [Edit the step](/docs/devtools/recorder/#edit-steps) by  **Add timeout** and set it to **6000** milliseconds (equal to 6s). -->

이러한 문제를 해결하기 위해, 여러분은 새롭게 추가된 **타임아웃** 설정을 사용할 수 있습니다. 메뉴 항목에서 우리가 클릭한 스텝을 확장합니다. **타임아웃 추가** 를 이용해 [스텝을 편집](/docs/devtools/recorder/#edit-steps)하고 타임아웃을 **6000** 밀리초 (6초)로 설정합니다.

<!-- Optionally, you can adjust the **Timeout** in the **Replay settings** for all the steps. Expand the **Replay settings** and edit the **Timeout** value.  -->
추가적으로, 여러분은 모든 단계에 대한 **타임아웃**을 **Replay settings**에서도 조정할 수 있습니다. **Replay settings**을 확장한 다음 **타임아웃** 값을 수정합니다.
 
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/y7RDpIp3pd2n6Vnxc5Du.png", alt="유저 플로우 녹화를 위한 타임아웃 설정", width="800", height="530" %}

Chromium issue: [1257499](https://crbug.com/1257499)


<!-- ## Ensure your pages are cacheable with the Back/forward cache tab {: #bfcache } -->
## 뒤로/앞으로 캐쉬 탭을 이용해 페이지가 캐쉬 가능한지 확인하기 {: #bfcache }
<!-- [Back/forward cache (or bfcache)](https://web.dev/bfcache/) is a browser optimization that enables instant back and forward navigation.  -->
[뒤로/앞으로 캐쉬(혹은 bfcache)](https://web.dev/bfcache/)는 브라우저 최적화의 하나로, 즉각적인 앞뒤 내비게이션을 가능하게 해 주는 기능입니다.

<!-- The new **Back/forward cache** tab can help you test your pages to ensure they're optimized for bfcache, and identify any issues that may be preventing them from being eligible. -->
새롭게 선보이는 **뒤로/앞으로 캐쉬** 탭을 사용하여, 웹 페이지들이 bfcache에 대해 최적화되었는지를 테스트할 수 있으며, 또한 페이지가 bfcache를 사용하지 못하도록 하는 이슈들을 파악할 수 있습니다.

<!-- To test a particular page, navigate to it in Chrome and then in DevTools go to **Application** > **Back-forward Cache**. Next, click the **Test back/forward cache** button and DevTools will attempt to navigate away and back to determine whether the page could be restored from bfcache. -->
특정 페이지를 테스트하기 위해, 크롬에서 해당 페이지로 이동한 다음 DevTools에서 **애플리케이션** > **뒤로-앞으로 캐쉬** 를 선택합니다. 그리고 **뒤로/앞으로 캐쉬 테스트** 버튼을 클릭하여 DevTools가 앞으로 혹은 뒤로 페이지 탐색을 시작하도록 하여, 해당 페이지가 bfcache 로부터 복구 가능한지를 확인할 수 있습니다.

<!-- As web developers, it's critical to know how to optimize your pages for bfcache across all browsers because it will significantly improve the browsing experience for users—especially those with slower networks or devices.  -->
웹 개발자는 페이지가 모든 브라우저에서 bfcache에 맞게 최적화하는 방법을 이해하는 것이 매우 중요합니다. 이는 특히 느린 네트워크 혹은 기기에서의 사용자 탐색 경험을 크게 향상시킬 수 있기 때문입니다. 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/4OrWjuRgG1bB0AupcMmS.png", alt="뒤로/앞으로 캐쉬 탭", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f4b1333582da2410e5bc8715998b96a83b924625 #}

Chromium issue: [1110752](https://crbug.com/1110752)


<!-- ## New Properties pane filter {: #properties } -->
## 새로 추가된 속성 창 필터 {: #properties }
<!-- If you want to focus on a specific property in the **Properties** pane, you can now type that property name or value in the new **Filter** textbox.  -->
**속성** 창의 특정 속성에 초점을 맞추고 싶으시다면, 배포판에 새로 추가된 **필터** 입력창에 프로퍼티의 이름이나 값을 기입하면 됩니다.

<!-- By default, properties whose value is `null` or `undefined` are not shown. Enable the **Show all** 
checkbox to view all properties.  -->
기본적으로 `null` 이나 `undefined` 값을 가지는 속성들은 표시되지 않습니다. **모두 보기** 체크박스를 클릭하여 모든 속성을 볼 수 있도록 합니다.

<!-- These enhancements allow you to get to the properties you care for quicker and thus improve your productivity! -->
위의 개선된 점을 이용하여 우리는 프로퍼티들에 좀더 빠르게 접근할 수 있으며, 이는 생산성을 높여 줄 수 있는 하나의 팁입니다!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/ewmNloO4ohRxlWRNuEW1.png", alt="속성 창 필터", width="800", height="505" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0980f52facf75b6c03e14472d13fe27968d4732b #}  
  
Chromium issue: [1269674](https://crbug.com/1269674)


<!-- ## Emulate the CSS forced-colors media feature {: #forced-colors } -->
 ## CSS의 forced-colors 미디어 기능 에뮬레이팅 {: #forced-colors }

<!-- The [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) CSS media feature is used to detect if the user agent has enabled a forced colors mode (e.g. Windows High Contrast mode) where it enforces a user-chosen limited color palette on the page.  -->
User agent가 웹페이지에서 사용자가 선택한 제한된 색 팔레트를 사용하도록 강제하는 forced-colors 모드 (예: 윈도우즈 하이 콘트라스트 모드)를 활성화했는지의 여부를 CSS의 [forced-colors](https://drafts.csswg.org/mediaqueries-5/#forced-colors) 미디어 기능을 통해 알아볼 수 있습니다.

<!-- Open the [Command Menu](/docs/devtools/command-menu/), run the **Show Rendering** command, and then set the **Emulate CSS media feature forced-colors** dropdown. -->
[명령 메뉴](/docs/devtools/command-menu/) 를 열고 **렌더링 표시** 명령어를 실행한 다음, **Emulate CSS media feature forced-colors** 드롭다운 메뉴를 설정합니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/75qGjkzfbXfOEJUhML5i.png", alt="CSS forced-colors 미디어 기능", width="800", height="623" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db79deee160cda92eda91775a27773611dce8188 #}

Chromium issue: [1130859](https://crbug.com/1130859)

<!-- ## Show rulers on hover command {: #show-rulers } -->
## 마우스를 가져가면 눈금자 표시 {: #show-rulers }

<!-- You can now open the [Command Menu](/docs/devtools/command-menu/) and run the **Show rulers on hover** command. The page rulers make it easier to measure the width and height of an element. -->
여러분은 이제 [Command Menu](/docs/devtools/command-menu/) 를 열고 **마우스를 가져가면 눈금자 표시**를 실행할 수 있습니다. 페이지의 눈금 기능을 이용하여 우리는 각 요소의 길이와 넓이를 좀더 쉽게 측정할 수 있습니다. 

<!-- Previously, you can only enable the page rulers via **Settings** > **Show rulers** checkbox. -->
이전에는 **설정** > **눈금자 표시** 체크박스를 통해 페이지의 눈금 모드를 활성화할 수 있었습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/FLF6RWO2bm5SMksdayLv.png", alt="Show rulers on hover", width="800", height="591" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/5bb8330e0f0a1c90f4a9335aa5521826c8beea #}

Chromium issue: [1270562](https://crbug.com/1270562)


<!-- ## Support `row-reverse` and `column-reverse` in the Flexbox editor {: #flexbox-editor } -->
## Flexbox 편집기에서의 `row-reverse` and `column-reverse` 지원 {: #flexbox-editor }

<!-- The [Flexbox editor](/blog/new-in-devtools-90/#flexbox) added two new buttons to support `row-reverse` and `column-reverse` in `flex-direction`.  -->
[Flexbox editor](/blog/new-in-devtools-90/#flexbox) 에 `flex-direction` 의 `row-reverse` 와 `column-reverse` 를 지원하기 위한 두 개의 버튼이 새롭게 추가되었습니다.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/JHI4frP4MqaydXk19sq2.png", alt="Flexbox 편집기", width="800", height="546" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7c98a6cdc296887350418746b42b2b0a474e7f27 #}

Chromium issue: [1263866](https://crbug.com/1263866)


<!-- ## New keyboard shortcuts to replay XHR and expand all search results {: #shortcuts } -->
## XHR 다시 재생 및 모든 검색 결과 표시를 위한 키보드 단축키 추가 {: #shortcuts }
<!-- ### Keyboard shortcuts to replay XHR in the Network panel {: #replay-xhr } -->
### 네트워크 패널의 XHR 다시 재생 단축키 {: #replay-xhr }
<!-- Select a XHR request in the **Network** panel and press **R** on the keyboard to replay the XHR. Previously, you can only replay the XHR via the context menu (right click > **Replay XHR**) -->
이전 버전에서는 컨텍스트 메뉴를 통해서만 XHR을 리플레이할 수 있었으나, 새 버전에서는 **네트워크** 패널에서 XHR 요청을 선택하고 *R*키를 눌러서 XHR을 다시 재생할 수 있습니다.
{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/M3s35wS3A0OoKMeubzMx.png", alt="replay XHR", width="800", height="530" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/ee4a6138511d69a549677c31b563484e25855d1f #}

Chromium issue: [1050021](https://crbug.com/1050021)

 
<!-- ### Keyboard shortcut to expand all search results {: #toggle-search-result } -->
### 모든 검색 결과 키보드 단축키 {: #toggle-search-result }

<!-- A new shortcut is added in the **Search** tab allowing you to expand and collapse all the search results. Previously, you could only expand and collapse the search results by clicking on one file at a time. -->
**검색** 탭에 모든 검색 결과를 열고 닫을 수 있는 단축키가 추가되었습니다. 이전에는 한 번에 하나의 파일을 클릭해야만 검색 결과를 확장 및 축소할 수 있었습니다.

<!-- Open the search tab via **Esc** > **3-dot** menu > **Search**. Enter a search string (e.g. function) and press **Enter** to see the list of search results. Focus on the search results and use the following shortcut to expand/collapse the search files: -->

**Esc** > **점 3개 메뉴** > **검색** 을 통해 검색 탭을 엽니다. 검색하고자 하는 스트링(예: function)을 입력하고 **Enter**를 눌러서 검색 결과 리스트를 볼 수 있습니다. 검색 결과에 포커싱을 주고 다음 단축키를 사용하여 검색된 파일들을 확장 및 축소할 수 있습니다.

- **Windows / Linux** - `Ctrl` + `Shift` + `{` or `}`
- **MacOS** - `Cmd` + `Options` + `{` or `}`

<!-- Go to the [keyboard shortcuts](/docs/devtools/shortcuts/) for reference of keyboard shortcuts in Chrome DevTools. -->
[키보드 단축키](/docs/devtools/shortcuts/) 에서 크롬 DevTools 의 단축키를 참고할 수 있습니다.

{% Video src="video/dPDCek3EhZgLQPGtEG3y0fTn4v82/v11XfQLwp7w9qIk440QP.mp4", autoplay="true", muted="false", loop="true",  class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9cbd6c9453ca55edb0f155068830b1ad69c5136e #}

Chromium issue: [1255073](https://crbug.com/1255073)

<!-- ## Lighthouse 9 in the Lighthouse panel {: #lighthouse } -->
## Lighthouse panel의 Lighthouse 9 {: #lighthouse }
<!-- The **Lighthouse** panel is now running Lighthouse 9. Lighthouse will now list all the elements sharing the same id. -->
**Lighthouse** 패널은 현재 Lighthouse 9를 구동하고 있습니다. Lighthouse는 곧 같은 아이디를 공유하는 모든 요소들을 나열할 것입니다.

<!-- Non-unique element id is a common accessibility problem. For instance, the id referenced in an `aria-labelledby` attribute is used on [multiple elements](https://web.dev/duplicate-id-aria/).  -->
요소들의 비고유한 아이디는 흔히 발생하는 접근성 문제입니다. 예를 들면, `aria-labelledby` 속성이 참조하는 아이디는 [Multiple elements](https://web.dev/duplicate-id-aria/) 에서 사용됩니다.

<!-- Check out the [What’s new in Lighthouse 9.0](/blog/lighthouse-9-0/) for more details on the updates. -->
[What’s new in Lighthouse 9.0](/blog/lighthouse-9-0/) 에서 구체적인 사항들과 업데이트를 확인해 보세요!

{% Img src="image/MtjnObpuceYe3ijODN3a79WrxLU2/gZI1flmYHuUpF637Idzy.png", alt="A Lighthouse audit for 'All focusable elements must have a unique `id`', showing two elements, both with the same `id`", width="800", height="380", class="screenshot" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/93a4454b7c558d6ca748c718167bc4aa592eaf63 #}

Chromium issue: [772558](https://crbug.com/772558)

<!-- ## Improved Sources panel {: #sources } -->
## 소스 패널에서의 개선점들 {: #sources }

<!-- Loads of stability improvements in the **Sources** panel as we upgraded it to use [CodeMirror 6](https://codemirror.net/6/). Here are few notable improvements: -->
소스 패널을 [CodeMirror 6](https://codemirror.net/6/)에서 사용할 수 있도록 업그레이드하면서 **소스** 패널의 안정성이 많이 개선되었습니다. 몇 가지의 주목할 만한 개선사항을 소개해 보겠습니다.

<!-- - Significantly faster when opening large files (e.g. WASM, JavaScript)
- No more random scrolling when stepping through code
- Improved auto-complete suggestions for editable sources (e.g. snippets, local override)  -->

- 대용량 파일들을 열 때의 속도가 향상되었습니다. (예: WASM, JavaScript)
- 코드를 단계별로 실행할 때 무작위 스크롤이 더 이상 발생하지 않습니다.
- 편집가능한 소스(예: snippets, local override)에 대한 자동완성 제안이 개선되었습니다. 

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/c1ab112d9002d5c3b3bb70cf2839bac182f0cdb5 #}

Chromium issue: [1241848](https://crbug.com/1241848) 

<!-- ## Miscellaneous highlights {: #misc } -->
## 기타 하이라이트 {: #misc }
<!-- These are some noteworthy fixes in this release: -->
이번 배포에 여러 가지 주목할 만한 개선점들이 추가되었습니다:

<!-- - Properly displaying the waterfall diagram of network requests. Previously, the style was broken. ([1275501](https://crbug.com/1275501))
- The code highlight was broken when searching in documents with very long lines in the **Sources** panel. It’s now fixed. ([1275496](https://crbug.com/1275496))
- No more duplicate **Payload** tab in network requests. ([1273972](https://crbug.com/1273972)) 
- Fixed the missing layout shifts details in the **Summary** section of the **Performance** panel. ([1259606](https://crbug.com/1259606))
- Support arbitrary characters (e.g. `,`, `.`),  in **Network Search** queries. ([1267196](https://crbug.com/1267196)) -->

- **Sources** 패널에서 너무 긴 문서를 검색할 때 코드 하이라이트가 동작하지 않았던 문제가 수정되었습니다. ([1275496](https://crbug.com/1275496))
- 네트워크 요청에서 중복된 **페이로드** 탭이 더 이상 없습니다. ([1273972](https://crbug.com/1273972)) 
- **성능** 패널의 **요약** 섹션에서 누락된 레이아웃 변경 세부정보가 수정되었습니다. ([1259606](https://crbug.com/1259606))
- **네트워크 검색** 쿼리에서 임의의 문자(예: `,`, `.`)를 지원합니다.

<!-- ### [Experimental] Endpoints in the Reporting API pane {: #reporting-api } -->
### [실험실 기능] Reporting API 창에서의 엔드포인트 {: #reporting-api }
{% Aside %}
<!-- To enable the experiment, check the **Enable Reporting API panel in the Application panel** checkbox under **Settings** > **Experiments**. -->
실험실 기능을 사용하려면 **설정** > **실험** > **Enable Reporting API panel in the Application panel** 항목 옆의 체크박스를 체크합니다.

{% endAside %}

<!-- The experimental **Reporting API** pane was introduced in [Chrome 96](/blog/new-in-devtools-96/#reporting-api) to help you monitor the reports generated on your page and their status. -->
**Reporting API**은 실험실 기능으로서 [크롬 96](/blog/new-in-devtools-96/#reporting-api) 에서 소개되었으며, 이는 여러분들이 페이지에서 생성된 레포트들과 이들의 상태를 모니터링할 수 있도록 해 줍니다.

<!-- The **Endpoints** section is now available. It gives you an overview of all the endpoints configured in the `Reporting-Endpoints` header. -->
현재 **Endpoints** 섹션이 사용가능해졌으며, 이는 `Reporting-Endpoints` 헤더에 구성된 모든 엔드포인트에 대한 개요를 제공합니다.

<!-- Learn to use the [Reporting API](https://web.dev/reporting-api/) to monitor security violations, deprecated API calls, and more. -->
[Reporting API](https://web.dev/reporting-api/)를 이용하여, 보안수칙 위반, 더 이상 사용되지 않는 API의 호출 등을 모니터링할 수 있게 되었습니다. 이 기능을 어떻게 사용하는지 알아보세요! 

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/D1fUz4zuS1xwDbszgft1.png", alt="Reporting API 창", width="800", height="560" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a831b26b7ecde579144a42a4faaa7b639789bf3c #} 

Chromium issue: [1200732](https://crbug.com/1200732)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
