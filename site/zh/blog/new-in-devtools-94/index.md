---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 94）"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "DevTools 允许您首选自己喜欢的语言，新的 Nest Hub 设备，新的 CSS 容器查询（container queries） badge以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0p96cFW8QJqhGmqJWlrK.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

{% include 'partials/devtools/zh/banner.md' %}


## 设定您的 DevTools 语言 {: #localized }
Chrome DevTools 现在支持超过 80 种语言，允许您设定自己喜欢的语言！

打开[设置](/docs/devtools/customize/#settings)，然后点击**偏好**下的**语言**下拉菜单。选择自己喜欢的语言后，重新加载 DevTools。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/eozpCcjmnn7zwya9zXu6.png", alt="在设置里更改语言", width="800", height="494" %}

{# https://chromium.googlesource.com/chromium/src/+/58abfbcdddae27fb43c17f43dbcc197f2570b5a5 #}

Chromium 议题：[1163928](https://crbug.com/1163928)


## 设备列表新增 Nest Hub 设备 {: #nest-hub }
您现在可以在[设备模式](/docs/devtools/device-mode/)下模拟 Nest Hub 以及 Nest Hub Max 的尺寸。

点击 [切换设备工具栏图标](/docs/devtools/device-mode/#viewport) &nbsp; {% Img src="image/admin/9FiBHFCzfPgP8sy6LMx7.png", alt="切换设备工具栏", width="20", height="22" %} &nbsp;，在**设备列表**里选择 Nest Hub 或者 Nest Hub Max 设备。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/KytKWMiC4cbFfVUOBzlm.png", alt="设备模式下的 Nest Hub 设备", width="800", height="549" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d13f911f7d98751cce659898936511b5ccda96cd #}

Chromium 议题：[1223525](https://crbug.com/1223525)


## 帧（Frame） 详情页获取 origin trials 信息{: #origin-trials }
您现在可以从**应用**面板的 帧（frame）详情页那里获取网站的 [origin trials](/blog/origin-trials/) 信息。

[Origin trials](/blog/origin-trials/) 允许您提前尝试正处于实验阶段的新功能。通过注册参加 Origin trials， 您就可以在该新功能还未放给所有用户之前， 利用该功能进行限时的产品开发。

打开带有注册参加 origin trials 的网页(参考 [demo 页面](https://mediastreamtrack.glitch.me))。在**应用**面板那里，滚动至 **帧** 区域，选中 top frame。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Frame 详情页获取 origin trials 信息", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Chromium 议题：[607555](https://crbug.com/607555)


## 新的 CSS 容器查询 （Container queries）徽章 {: #container-queries }
DevTools 在容器元素（Container elements，指的是那些匹配 `@container` @规则的祖先元素）的旁边，新增了的**容器**徽章。点击该徽章，网页将突出显示选中容器元素，以及该容器所有的后代元素。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="CSS 容器查询徽章", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Chromium 议题：[1146422](https://crbug.com/1146422)


## 利用新的复选框反转过滤网络请求的条件 {: #invert-network-filter }
您在**网络**面板那里，使用新的**反转**复选框，反转过滤条件。

比如说，您在**过滤**文本框里输入 “status-code: 404” ，以查看那些状态码为 404 的网络请求。点击**反转**复选框，可反转过滤条件（显示那些状态码为不是 404 的网络请求）。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="反转网络请求过滤条件", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Chromium 议题：[1054464](https://crbug.com/1054464)


## 控制台的边栏即将被弃用 {: #deprecated }
控制台的左边栏将会被移除。该边栏里的过滤界面将会被移动到工具栏里。如果您有任何担心或者反馈，可以通过这个[议题追踪器](https://crbug.com/1232937)来让我们知道。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="控制台边栏的弃用信息", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Chromium 议题：[1232937](https://crbug.com/1232937)


## 在问题选项卡以及网络面板那里显示原生 `Set-Cookie` 响应头{: #raw-cookies }
DevTools 现在可以在**问题**选项卡那里显示原生（raw） `Set-Cookie` 响应头（response headers）。

此前，DevTools 并不会在**网络**面板那里显示异常 cookie（不正确的 `Set-Cookie` 响应头）。现在，透过**网络**面板新增的 `response-header-set-cookie` 过滤条件，用户现在可以过滤掉含有原生 `Set-Cookie` 的响应。DevTools 也会把**问题**选项卡里面的原生 `Set-Cookie` 响应头给链接到**网络**面板。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="在问题选项卡以及网络面板那里显示原生 Set-Cookie 响应头", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Chromium 议题：[1179186](https://crbug.com/1179186)


## Consistent display native accessors as own properties in the Console {: #native-accessors }
**控制台**现在可以显示原生的访问器 as their own properties consistently.

For example, when evaluating the `new Int8Array([1, 2, 3])` expression in the **Console**, native accessors like `length`, `byteOffset` did not display in the preview. With this latest update, native accessors are shown in the preview and values are eagerly evaluated when expanded.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="Consistent display native accessors as own properties in the Console", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Chromium 议题：[1076820](https://crbug.com/1076820), ​​[1199247](https://crbug.com/1199247)


## Proper error stack traces for inline scripts with #sourceURL {: #inline-script }
DevTools now resolves inline scripts with `#sourceURL` properly and shows proper error stack traces for debugging.

Previously DevTools displayed incorrect location for inline scripts with `#sourceURL`, relative to the surrounding document rather than relative to the opening `<script>` tag..

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="Proper error stack traces for inline scripts with #sourceURL", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Chromium 议题: [1183990](https://crbug.com/1183990), ​​[578269](https://crbug.com/578269)

## 改变计算窗格里面元素的颜色格式 {: #color-unit }

针对颜色预览这种情况，您现在可以通过 <kbd>Shift</kbd> + 点击的方式来改变计算窗格里面元素的颜色格式。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="通过 Shift + 点击的方式来改变计算窗格里面元素的颜色格式", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Chromium 议题: [1226371](https://crbug.com/1226371)

## Replace custom tooltips with native HTML tooltips {: #tooltip }

DevTools now adopts native HTML tooltips across all components. DevTools has had a custom tooltip implementation for a long time due to the lack of styling of a native HTML tooltip.

Unfortunately, maintaining a custom tooltip implementation is complicated and we regularly run into complicated bugs.

After reweighting the benefits of the custom implementations, we find that the native HTML tooltips are sufficient for DevTools and adopting the tooltips prevents a vast variety of problems for our users.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="DevTools tooltip", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Chromium 议题: [1223391](https://crbug.com/1223391)


## [Experimental]  {: #hide-issues }
{% Aside %}
To enable the experiment, check the **Enable hide issues menu** checkbox under **Settings** > **Experiments**.
{% endAside %}

Enable the **hide issues menu** experiment to hide issues in the **Issues** tab. This way, you can focus on the important issues that matter to you.

In the **Issue** tab, hover an issue, click on the issue menu &nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="More", width="4", height="20" %} &nbsp; on the right, select **Hide issues like this** to hide it.

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="Experimental hide issue context menu", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Chromium 议题: [1175722](https://crbug.com/1175722)

{% include 'partials/devtools/zh/reach-out.md' %}
{% include 'partials/devtools/zh/whats-new.md' %}
