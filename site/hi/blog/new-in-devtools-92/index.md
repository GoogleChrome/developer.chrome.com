---
layout: "layouts/blog-post.njk"
title: "DevTools में नया क्या है（Chrome 92）"
authors:
  - jecelynyeen
date: 2021-06-02
updated: 2021-06-02
description:
  "CSS ग्रिड एडिटर, कंसोल में const रिडिक्लेरेशन के लिए सपोर्ट, सोर्स ऑर्डर व्यूअर और बहुत कुछ|"
hero: 'image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XtJztwxzQqOWhOHrKmhM.jpg'
alt: ''
tags:
  - new-in-devtools
  - devtools
  - chrome-92
---

*अनुवाद प्रदान करने के लिए [Ankit Sharma](https://github.com/AnkitSharma-007) को धन्यवाद।*


<!-- lint disable no-smart-quotes -->
{% include 'partials/devtools/zh/banner.md' %}

{% YouTube id="2baY3JpCxpo" %}

## CSS grid संपादक {: #grid-editor }

एक अत्यधिक अनुरोधित विशेषता। अब आप नए CSS grid संपादक के साथ CSS grid का पूर्वावलोकन और लेखन कर सकते हैं!

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mV9Ac7QAD8vVPoiqmii6.png", alt="CSS grid संपादक", width="800", height="486" %}

जब आपके पृष्ठ पर किसी HTML तत्व पर `display: grid` या `display: inline-grid` लागू होता है, तो आप स्टाइल्स फलक में उसके बगल में एक आइकन देख सकते हैं। CSS grid संपादक को चालू करने के लिए आइकन पर क्लिक करें। यहां आप ऑन-स्क्रीन आइकन (जैसे `justify-content: space-around`) के साथ संभावित परिवर्तनों का पूर्वावलोकन कर सकते हैं और केवल एक क्लिक के साथ ग्रिड दिखावट का लेखन सकते हैं।

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/dbd631539c7eeac02ea68a37096ce3bc7d9487d9 #}

Chromium समस्या: [1203241](https://crbug.com/1203241)


## कंसोल में `const` पुनर्घोषणा के लिए समर्थन {: #const-redeclaration }

कंसोल अब मौजूदा [`let` और `class` पुनर्घोषणाओं](/blog/new-in-devtools-80/#redeclarations) के अलावा `const` स्टेटमेंट के पुनर्घोषणा का समर्थन करता है। नए JavaScript कोड के साथ प्रयोग करने के लिए कंसोल का उपयोग करने वाले वेब डेवलपर्स के लिए पुन: घोषणा करने में असमर्थता एक सामान्य झुंझलाहट थी।

यह डेवलपर्स को यह देखने के लिए DevTools कंसोल में कोड कॉपी-पेस्ट करने की अनुमति देता है कि यह कैसे काम करता है या प्रयोग होता है, कोड में छोटे बदलाव करता है, और पृष्ठ को रीफ्रेश किए बिना प्रक्रिया को दोहराता है। पहले, DevTools एक `const` बाइंडिंग को फिर से घोषित करने पर एक सिंटैक्स त्रुटि फेका करता था।

नीचे दिए गए उदाहरण का संदर्भ लें। `const` पुनर्घोषणा समर्थित है ** अलग-अलग REPL लिपियों में ** (वेरिएबल `a` देखें)। ध्यान दें कि निम्नलिखित परिदृश्य डिज़ाइन द्वारा समर्थित नहीं हैं:

- REPL लिपियों में पृष्ठ लिपियों की `const` पुनर्घोषणा की अनुमति नहीं है
- एक ही REPL स्क्रिप्ट के भीतर `const` पुनर्घोषणा की अनुमति नहीं है (वेरिएबल `b` देखें)

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/tJCPlokvxw6OWyCAmocM.png", alt="const पुनर्घोषणा", width="800", height="496" %}

{# https://chromium.googlesource.com/v8/v8/+/0acdf36510e72d5dac5777d893e77716235b7c39 #}

Chromium समस्या: [1076427](https://crbug.com/1076427)


## सोर्स ऑर्डर व्यूअर {: #source-order }

बेहतर पहुंच-योग्यता निरीक्षण के लिए अब आप स्क्रीन पर स्रोत तत्वों का क्रम देख सकते हैं।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2QoBtjGjFxgDAkKaO3y2.png", alt="सोर्स ऑर्डर व्यूअर", width="800", height="515" %}

HTML दस्तावेज़ में सामग्री का क्रम खोज इंजन अनुकूलन और सुलभता के लिए महत्वपूर्ण है। नई CSS विशेषताएं डेवलपर्स को ऐसी सामग्री बनाने की अनुमति देती हैं जो HTML दस्तावेज़ में मौजूद सामग्री की तुलना में अपने ऑन-स्क्रीन क्रम में बहुत अलग दिखती है। यह एक बड़ी सुलभता समस्या है क्योंकि स्क्रीन रीडर उपयोगकर्ताओं को देखे गए उपयोगकर्ताओं की तुलना में एक अलग, सबसे अधिक भ्रमित करने वाला अनुभव मिलेगा।

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/7f83e4b0190ed2dbc32feef6d8b0315279ad7d07 #}

Chromium समस्या: [1094406](https://crbug.com/1094406)


## iframe विवरण देखने के लिए नया शॉर्टकट {: #frame-details }

एलीमेंट पैनल में आईफ्रेम विवरण देखने के लिए आईफ्रेम एलिमेंट पर राइट क्लिक करके **iframe विवरण दिखाएं** चुनें।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YdENg6wjsgPNyMODdOHC.png", alt="फ्रेम विवरण दिखाएं", width="800", height="486" %}

यह आपको एप्लिकेशन पैनल में आईफ्रेम के विवरण के दृश्य में ले जाता है जहां आप संभावित समस्या को डीबग करने के लिए दस्तावेज़ विवरण, सुरक्षा और अलगाव स्थिति, अनुमति नीति, और अधिक की जांच कर सकते हैं।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/hEsg9Mc95n7w2tPrv6KH.png", alt="फ़्रेम विवरण दृश्य", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/30ba780ff36307473aee2e2c959287ea8d0b3bd7 #}

Chromium समस्या: [1192084](https://crbug.com/1192084)


## उन्नत CORS डिबगिंग समर्थन {: #cors }

क्रॉस-ओरिजिनल रिसोर्स शेयरिंग (CORS) त्रुटियाँ अब समस्याएँ टैब में सामने आई हैं। CORS त्रुटियों के कई कारण हैं। संभावित कारणों और समाधानों को समझने के लिए प्रत्येक समस्या का विस्तार करने के लिए क्लिक करें।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/UpiZQCNnlENB8ZluzeFt.png", alt="समस्या टैब में CORS मुद्दे", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ca000670d62477dfb0a6a83e038b6caecc1e322 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/2ad8fc07dbe879162b4cb65ca800a2c10e6a73fc #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/bec4aa4eb52f9cf75077d165d2ceba12ebf5ab95 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db2f1f97aa230de89ac5f80ec8e361f90d8efdd1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b9d0e036f6998109673be71a2dc76fb246c8de3b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/1531610a58453da982acaa1d445c0e8952dbf004 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/541a6b4f7d3627296484d1483ef85e1d10a835f1 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/6b3a0affa984c37720361127a21ff7a936a8b820 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/9149c7abd583c45cf0df83bf445c5b0ae7fa65b9 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/80736dbaf8cb5f06215a5843f326a32ac7ca3a99 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/0404498fbfe3e99ba69a4e99f09715baceecd99d #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/eeb37658907bbc78b70f7712bb48f7a77d152663 #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/3aa8ba4983bd6cf65673c4c1908992e5ab81d6fc #}

Chromium समस्या: [1141824](https://crbug.com/1141824)


## नेटवर्क पैनल अपडेट {: #network }

### XHR लेबल का नाम बदलकर Fetch/XHR करें {: #fetch-xhr }

XHR लेबल का नाम बदलकर अब **Fetch/XHR** कर दिया गया है। यह परिवर्तन यह स्पष्ट करता है कि इस फ़िल्टर में [`XMLHttpRequest`](https://xhr.spec.whatwg.org/) और [Fetch API](https://fetch.spec.whatwg.org/) दोनों नेटवर्क अनुरोध शामिल हैं।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/I0QOVTO52JRpl0jJO6Zt.png", alt="Fetch/XHR लेबल", width="800", height="516" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/274ace4270fd5c3004c6b594e1b009c545318e0e #}

Chromium समस्या: [1201398](https://crbug.com/1201398)


### नेटवर्क पैनल में Wasm संसाधन प्रकार को फ़िल्टर करें {: #wasm }

अब आप Wasm नेटवर्क अनुरोधों को फ़िल्टर करने के लिए नए **Wasm** बटन पर क्लिक कर सकते हैं।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/vuTMcfCjDWFfVtDN6Dpf.png", alt="Wasm द्वारा फ़िल्टर करें", width="800", height="515" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/db3b40161aeb0856d33e0e4545b2b5bd8e79fb86 #}

Chromium समस्या: [1103638](https://crbug.com/1103638)


### नेटवर्क स्थिति टैब में उपकरणों के लिए उपयोगकर्ता-एजेंट क्लाइंट संकेत {: #sec-ua-ch }

[User-Agent Client Hints](https://web.dev/user-agent-client-hints) को अब **नेटवर्क शर्तों** टैब के अंतर्गत **उपयोगकर्ता एजेंट** फ़ील्ड में उपकरणों के लिए लागू किया गया है।

उपयोगकर्ता-एजेंट क्लाइंट संकेत क्लाइंट संकेत API का एक नया विस्तार है, जो डेवलपर्स को गोपनीयता-संरक्षण और एर्गोनोमिक तरीके से उपयोगकर्ता के ब्राउज़र के बारे में जानकारी तक पहुंचने में सक्षम बनाता है।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/iMlkTtV9OUdfujSWdHnR.png", alt="नेटवर्क स्थिति टैब में उपकरणों के लिए उपयोगकर्ता-एजेंट क्लाइंट संकेत", width="800", height="532" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b2b0c3b6c6e093649c35b6824004284ca4c2bd4a #}

Chromium समस्या: [1174299](https://crbug.com/1174299)


## समस्या टैब में क्विर्क मोड की समस्याओं की रिपोर्ट करें {: #quirks-mode }

DevTools अब [Quirks Mode](https://quirks.spec.whatwg.org/) और [Limited-quirks Mode](https://dom.spec.whatwg.org/#concept-document-limited-quirks) कि समस्या को रिपोर्ट करता है।

Quirks Mode और Limited-quirks Mode वेब मानक बनाए जाने से पहले के पुराने ब्राउज़र मोड हैं। ये मोड पूर्व-मानक-युग लेआउट व्यवहारों का अनुकरण करते हैं जो अक्सर अप्रत्याशित दृश्य प्रभाव का कारण बनते हैं।

लेआउट मुद्दों को डिबगिंग करते समय, डेवलपर्स को लगता है कि वे उपयोगकर्ता द्वारा लिखे गए CSS या HTML बग के कारण हैं, जबकि वास्तविक समस्या पृष्ठ में मौजूद Compat मोड है। DevTools इसे ठीक करने के लिए सुझाव प्रदान करता है।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/XqtqSZPa1S1YnmeIt0ee.png", alt="समस्या टैब में क्विर्क मोड की समस्याओं की रिपोर्ट करें", width="800", height="490" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/79d5f4274f21bb78e2ce572d118c2bd5bf1cfa82 #}

Chromium समस्या: [622660](https://crbug.com/622660)


## प्रदर्शन पैनल में गणना चौराहों को शामिल करें {: #computed-intersections }

देवटूल्स अब ज्वाला चार्ट में **Compute Intersections** को दिखाते हैं। ये परिवर्तन आपको [intersection observers](https://web.dev/intersectionobserver-v2/) इवेंट की पहचान करने और इसके संभावित प्रदर्शन ओवरहेड्स को डिबग करने में मदद करते हैं।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Nx3K0Lpst0lICGbtpzsW.png", alt="प्रदर्शन पैनल में Compute Intersections", width="800", height="496" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/03f91c46e7920e768eba5192b7f902e916b9cac3 #}

Chromium समस्या: [1199137](https://crbug.com/1199137)


## Lighthouse पैनल में Lighthouse 7.5 {: #lighthouse }

Lighthouse पैनल अब Lighthouse 7.5 चला रहा है। CSS में परिभाषित `aspect-ratio` वाली छवियों के लिए "स्पष्ट चौड़ाई और ऊंचाई अनुपलब्ध" चेतावनी अब हटा दी गई है। पहले, Lighthouse ने परिभाषित चौड़ाई और ऊंचाई के बिना छवियों के लिए चेतावनियां दिखाईं थी|

परिवर्तनों की पूरी सूची के लिए [रिलीज़ नोट](https://github.com/GoogleChrome/lighthouse/releases/tag/v7.5.0) देखें।

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4cef9324af0e4560421beb138313458d5ae6fb0b #}
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/d17898e62fe19b9f47b25f1568b57fce951c6d10 #}

Chromium समस्या: [772558](https://crbug.com/772558)


## कॉल स्टैक में "Restart frame" संदर्भ मेनू को बहिष्कृत कर दिया गया है {: #restart-frame }

**Restart frame** विकल्प अब बहिष्कृत कर दिया गया है। इस सुविधा को अच्छी तरह से काम करने के लिए और विकास की आवश्यकता है, यह वर्तमान में टूटा हुआ है और अक्सर क्रैश हो जाता है।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Alvnt4FkoEFoP0SkdKgi.png", alt="बहिष्कृत Restart frame संदर्भ मेनू", width="800", height="486" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/4494098b6840f608347c1edf3c048691056eada4 #}

Chromium समस्या: [1203606](https://crbug.com/1203606)


## [प्रायोगिक चरण] प्रोटोकॉल मॉनिटर {: #protocol-monitor }

{% Aside %}

प्रयोग को सक्षम करने के लिए, **Settings**> **Experiments** के अंतर्गत **Protocol Monitor** चेकबॉक्स को चेक करें।

{% endAside %}

Chrome DevTools [Chrome DevTools प्रोटोकॉल (CDP)](https://chromedevtools.github.io/devtools-protocol/) का उपयोग करके Chrome ब्राउज़र को इंस्ट्रुमेंट, निरीक्षण, डीबग और प्रोफ़ाइल करता है। **प्रोटोकॉल मॉनिटर** आपको DevTools द्वारा किए गए सभी CDP अनुरोधों और प्रतिक्रियाओं को देखने का एक तरीका प्रदान करता है।

CDP के परीक्षण की सुविधा के लिए दो नए कार्य जोड़े गए:

- नया **Save** बटन आपको रिकॉर्ड किए गए संदेशों को JSON फ़ाइल के रूप में डाउनलोड करने की अनुमति देता है
- एक नया क्षेत्र जो आपको सीधे एक वास्तविक CDP कमांड भेजने की अनुमति देता है

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mRVrHC9WEet7cwA7QAeV.png", alt="प्रोटोकॉल मॉनिटर", width="800", height="496" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/40fcb9a9aae81ac1df2c19dee467ab3a4cf4088b #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/006e20c4226a7b2e5fde4026191b1eaf05bf8b8e #}

Chromium समस्या: [1204004](https://crbug.com/1204004), [1204466](https://crbug.com/1204466)


## [प्रायोगिक चरण] Puppeteer Recorder {: #puppeteer-recorder }

{% Aside %}

प्रयोग को सक्षम करने के लिए, **Settings**> **Experiments** के अंतर्गत **Recorder** चेकबॉक्स को चेक करें।

{% endAside %}

[Puppeteer recorder](/blog/new-in-devtools-89/#record) अब ब्राउज़र के साथ आपकी बातचीत के आधार पर चरणों की एक सूची तैयार करता है, जबकि पहले DevTools इसके बजाय सीधे एक Puppeteer स्क्रिप्ट तैयार करता था। Puppeteer स्क्रिप्ट के रूप में चरणों को निर्यात करने की अनुमति देने के लिए एक नया **Export** बटन जोड़ा गया है।

चरणों को रिकॉर्ड करने के बाद, आप चरणों को फिर से चलाने के लिए नए **Replay** बटन का उपयोग कर सकते हैं। रिकॉर्डिंग के साथ शुरुआत करने का तरीका जानने के लिए [यहां दिए गए निर्देशों](/blog/new-in-devtools-89/#record) का पालन करें।

कृपया ध्यान दें कि यह एक प्रारंभिक चरण का प्रयोग है। हम समय के साथ Recorder कार्यक्षमता को बेहतर बनाने और विस्तारित करने की योजना बना रहे हैं।

{% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/kh1Z4jcWxbO6rYCSoIPn.png", alt="Puppeteer Recorder", width="800", height="557" %}

{# https://chromium.googlesource.com/devtools/devtools-frontend/+/b36b600405ef18131b89edf85cca816c955c1590 #} 
{# https://chromium.googlesource.com/devtools/devtools-frontend/+/a2ffe4a8d202e56d640c2f8744c905354e2bca8e #}

Chromium समस्या: [1199787](https://crbug.com/1199787)

{% include 'partials/devtools/en/reach-out.md' %}
{% include 'partials/devtools/en/whats-new.md' %}
