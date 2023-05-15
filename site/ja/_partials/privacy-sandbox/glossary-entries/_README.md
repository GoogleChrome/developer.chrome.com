## 用語パーシャルの使用

これらのパーシャルには、それぞれ 1 つの用語が含まれています。いずれかを使用していて、それらに小見出しが必要な場合は、次のように、含める前にコンテンツに小見出しをインラインで含める必要があります。

```txt
## Ad exchange

{% Partial 'privacy-sandbox/glossary-entries/ad-exchange.njk' %}
```

These partials don't have line spacing before the content, thus the line space between the header and the partial reference is necessary, as above.
