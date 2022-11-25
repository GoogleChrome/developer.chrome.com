---
layout: "layouts/blog-post.njk"
title: "DevTools 新功能（Chrome 94）"
authors:
  - jecelynyeen
date: 2021-08-24
updated: 2021-08-24
description:
  "设定 DevTools 用户界面语言，新的 Nest Hub 设备，新的 CSS 容器查询徽章以及更多。"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0p96cFW8QJqhGmqJWlrK.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-94
---

*感谢[流浪大法师](https://webfrontend.dev/)提供的翻译。*

{% Partial 'devtools/banner.md' %}

{% YouTube id="N9Jiou61WH4" %}

## 设定您的 DevTools 用户界面语言 {: #localized }
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


## 帧（Frame）详情页获取 origin trials 信息 {: #origin-trials }
您现在可以从**应用**面板的帧（frame）详情页那里获取网站的 [origin trials](/blog/origin-trials/) 信息。

[Origin trials](/blog/origin-trials/) 允许您提前尝试正处于实验阶段的新功能。通过注册参加 Origin trials， 您就可以在该新功能还未放给所有用户之前， 利用该功能进行限时的产品开发。

打开有注册参加 origin trials 的网页(参考 [demo 页面](https://mediastreamtrack.glitch.me))。在**应用**面板那里，滚动至**帧**区域，选中 top frame。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VICXjdGL5Rz09TAPg1sW.png", alt="Frame 详情页获取 origin trials 信息", width="800", height="465" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2086be5df61ea71f633c3fbab277b01470c534ce #}

Chromium 议题：[607555](https://crbug.com/607555)


## 新的 CSS 容器查询（Container queries）徽章 {: #container-queries }
DevTools 在容器元素（Container elements，指的是那些匹配 `@container` @规则的祖先元素）的旁边，新增了**容器**徽章。点击该徽章，网页将突出显示选中容器元素，以及该容器所有的后代元素。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/0plPq2cHZV5gV8zm9VlP.png", alt="CSS 容器查询徽章", width="800", height="488" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6f2632929afd7f74a2f1bf6fd83bb1d8818c3234 #}

Chromium 议题：[1146422](https://crbug.com/1146422)


## 利用新的复选框反转过滤网络请求的条件 {: #invert-network-filter }
您在**网络**面板那里，使用新的**反转**复选框，反转过滤条件。

比如说，您可以在**过滤**文本框里输入 “status-code: 404” ，查看那些状态码为 404 的网络请求。点击**反转**复选框，可反转过滤条件（显示那些状态码为不是 404 的网络请求）。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xx1ju91Mu3qflyG6E40W.png", alt="反转网络请求过滤条件", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/66878d6044df77ba6264a576483bf5aae6b5f3d9 #}

Chromium 议题：[1054464](https://crbug.com/1054464)


## 控制台的边栏即将被弃用 {: #deprecated }
控制台的左边栏将会被移除。该边栏里的过滤界面将会被移动到工具栏里。如果您有任何疑虑或者反馈，可以通过这个[议题追踪器](https://crbug.com/1232937)来让我们知道。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/CzC2HCaiCcdPgbLykyc8.png", alt="控制台边栏的弃用信息", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/f34c62f543c29ffd4be95c4e93b453aa34644897 #}

Chromium 议题：[1232937](https://crbug.com/1232937)


## 在问题选项卡以及网络面板那里显示原生 `Set-Cookie` 响应头 {: #raw-cookies }
DevTools 现在可以在**问题**选项卡那里显示原生（raw） `Set-Cookie` 响应头（response headers）。

此前，DevTools 并不会在**网络**面板那里显示异常 cookie（不正确的 `Set-Cookie` 响应头）。现在，通过**网络**面板新增的 `response-header-set-cookie` 过滤条件，用户可以过滤掉含有原生 `Set-Cookie` 的响应。DevTools 也会把**问题**选项卡里面的原生 `Set-Cookie` 响应头给链接到**网络**面板。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/PbozcNJRd6rTME5hhqIq.png", alt="在问题选项卡以及网络面板那里显示原生 Set-Cookie 响应头", width="800", height="563" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6dedde59f9d64290756a826f73dfe24cf382a470 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/27aa364d1b194a7a778e7649e1f144abbed5957f #}

Chromium 议题：[1179186](https://crbug.com/1179186)


## 在控制台里显示原生访问器为自己的属性 {: #native-accessors }
**控制台**现在会将原生访问器（native accessors）始终显示为它们自己的属性（own properties）。

例如说，此前在**控制台**计算 `new Int8Array([1, 2, 3])` 表达式时，原生访问器（如 length、byteOffset）并没有在预览中展示。经过这次更新，原生访问器会在预览中展示，并且在展开时会提前计算出结果。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/VcUiEcUXdWc00Q8595n6.png", alt="控制台会将原生访问器访问所得到的结果展示成它们自己的属性", width="800", height="459" %}

{# https://chromium.googlesource.com/v8/v8/+/ce8cef36aa7f386937a6b7bf1907e93b69cad1bd #}

Chromium 议题：[1076820](https://crbug.com/1076820), ​​[1199247](https://crbug.com/1199247)


## 正确输出带有 #sourceURL 行内脚本的错误堆栈信息 {: #inline-script }
DevTools 现在可以正确解析带有 #sourceURL 的行内脚本（inline scripts），并且还能针对调试这种情况，输出正确的错误堆栈信息。

此前，DevTools 会错误输出带有 #sourceURL 的行内脚本的位置信息。这是由于之前的位置输出是对应该 #sourceURL 所在的 `<script>` 标签。正确的位置输出应该是要对应该文档。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XVUY8XxbGZW74kPsGkOZ.png", alt="处理带有 #sourceURL 的行内脚本，给出合适的错误堆栈信息", width="800", height="425" %}

{# https://chromium.googlesource.com/v8/v8/+/c2f30c2b3f637c2339e8b9672c5c59a21b7d1095 #}

Chromium 议题: [1183990](https://crbug.com/1183990), ​​[578269](https://crbug.com/578269)


## 更改计算样式边栏里面元素的颜色格式 {: #color-unit }

您现在可以通过 <kbd>Shift</kbd> + 点击**颜色预览**，来更改**计算样式**边栏里的元素颜色格式。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/IhOkF5do9P8Ovlr7YsdX.png", alt="通过 Shift + 点击的方式更改**计算样式**里面的元素颜色格式", width="800", height="474" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/97143f7586d540e53a2e40ced7f106181e5c9ce3 #}

Chromium 议题: [1226371](https://crbug.com/1226371)


## 使用原生的 HTML 提示框替换自定义提示框 {: #tooltip }

DevTools 现在针对所有的组件都采用原生 HTML 提示框（native HTML tooltips）。此前，DevTools 一直都是使用内部开发的自定义提示框，这是碍于原生的 HTML 提示框缺乏自定义风格（Styling）支持，因此 DevTools 使用自定义提示框的支持。

不幸的是，维护自定义提示框的实现是一件很棘手的事。我们经常会遇到一些很复杂的 bugs。

在重新评估自定义提示框带来的好处之后，我们认为原生的 HTML 提示框对于 DevTools 来说已经足够了。采用原生提示框可以避免用户遇到各式各样的问题。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/bOFfHPAwX3qiVcgANPmh.png", alt="DevTools 提示框", width="800", height="452" %}

{# https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/3008794 #}

Chromium 议题: [1223391](https://crbug.com/1223391)


## [实验阶段] 隐藏问题选项卡里面的问题 {: #hide-issues }
{% Aside %}
请勾选位于 **设置** > **实验** 下的 **启用隐藏问题菜单** 多选框，以启用此实验功能。
{% endAside %}

**隐藏问题菜单**是一个处于实验阶段的新功能。启用这个功能能让您隐藏**问题**选项卡里面的问题。这样的话，您就可以只专注于当前对您而言最重要的问题。

在**问题**选项卡里面，将鼠标悬停在某个问题上，点击右侧的问题菜单栏&nbsp; {% Img src="image/admin/4sdCQbpBaG4MpoHB1J08.png", alt="更多", width="4", height="20" %} &nbsp;，选择“隐藏问题”选项将其隐藏。

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/GGJzvwvMYSrkirU44STQ.png", alt="处于实验阶段的隐藏问题的菜单", width="800", height="494" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0200fc96fecec0e209e84c21359ab53393860978 #}

Chromium 议题: [1175722](https://crbug.com/1175722)

{% Partial 'devtools/reach-out.md' %}
{% Partial 'devtools/whats-new.md' %}
