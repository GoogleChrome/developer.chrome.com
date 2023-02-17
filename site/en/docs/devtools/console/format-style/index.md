---
layout: "layouts/doc-post.njk"
title: "Format and style messages in the Console"
authors:
  - jecelynyeen
date: 2021-02-21
#updated: YYYY-MM-DD
description: "Learn how to format and style messages in the Console."
---

This guide shows you how to format and style messages in the [Chrome DevTools Console](/docs/devtools/). See [Get Started With Logging Messages](/docs/devtools/console/log/) to learn how to log messages to the Console.

This guide assumes that you understand the fundamentals of web development, such as how to use JavaScript to add interactivity to a page.

## Format console messages {: #format }

You can use the [format specifiers](https://console.spec.whatwg.org/#formatting-specifiers) to format the console messages.

Format specifiers begin with a percent character (%) and terminate with a "type character" which indicates the type of data (integer, float, etc.).

For example, 

1. [Open the Console](/docs/devtools/console/reference/#open)
2. Enter the following console command.
    ```js
    const tools = 'Chrome DevTools';
    console.warn('%s is awesome.', tools);
    ```
3. The command above produces `Chrome DevTools is awesome.` message.
  {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/Gez3ZH0I7GJAqvYlKTNf.png", alt="format string value", width="800", height="452" %}


Here is the list of [format specifiers](https://console.spec.whatwg.org/#formatting-specifiers) Chrome DevTools support currently.

<table>
  <thead>
    <tr>
      <th>Specifier</th>
      <th>Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>%s</code></td>
      <td>Formats the value as a string</td>
    </tr>
    <tr>
      <td><code>%i</code> or <code>%d</code></td>
      <td>Formats the value as an integer</td>
    </tr>
    <tr>
      <td><code>%f</code></td>
      <td>Formats the value as a floating point value</td>
    </tr>
    <tr>
      <td><code>%o</code></td>
      <td>Formats the value as an expandable DOM element</td>
    </tr>
    <tr>
      <td><code>%O</code></td>
      <td>Formats the value as an expandable JavaScript object</td>
    </tr>
    <tr>
      <td><code>%c</code></td>
      <td>Applies CSS style rules to the output string as specified by the second parameter</td>
    </tr>
  </tbody>
</table>

### Apply multiple format specifiers {: #multiple-specifiers }

You can use more than one format specifier in a message.

1. Enter the following console command.
    ```js
    console.info('The total weight of %i %s and %d %s is %f grams.', 3, 'apples', 2, 'oranges', 432.4);
    ```
2. The command above produces `The total weight of 3 apples and 2 oranges is 432.4 grams.` message.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/LChyiQQxPYJrd2NUd65s.png", alt="multiple format specifiers", width="800", height="452" %}


### Understand type conversions {: #conversion }

The output message will be converted according to the format specifier.

1. Enter the following console command.
    ```js
    console.log('I have %i apples and %d oranges.', 2, 3.5); 
    ```
2. The command above produces `I have 2 apples and 3 oranges.` message.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/YXKCVEDkMMKNncsRSqw4.png", alt="format integer values", width="800", height="452" %}
3. Instead of logging `3.5 oranges`, the output is `3 oranges`. The `%d` indicates that the value should/will be converted to an integer.


Here is an example of what happens if the type conversion is invalid.

1. Enter the following console command.
    ```js
    console.log('Jane has %i kiwis.', 'two');
    ```
2. The command above produces `Jane has NaN kiwis.` message.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/mRnyHXQRSutNwAimf8u8.png", alt="NaN in console message", width="800", height="452" %}
3. The `%i` indicates that the value should/will be converted to an integer, but the argument is a string. Thus it returns [NaN (Not-A-Number)](https://tc39.es/ecma262/multipage/global-object.html#sec-value-properties-of-the-global-object-nan).


##  Style console messages

There are two ways to style console messages in DevTools.

### Style with format specifier  {: #style-specifier }

You can use the `%c` format specifier to style the console messages with CSS.

1. Enter the following console command.
    ```js
    const style = 'background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;'
    console.log("%cHooray", style);
    ```
2. The command above produces `Hooray` with CSS styles applied.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/p9oAce6M63d1tYChjaXN.png", alt="style output with CSS", width="800", height="452" %}

{% Aside 'gotchas' %}
To prevent data leaks and bypasses of security policies, in this format, the [`url()` CSS function](https://developer.mozilla.org/docs/Web/CSS/url) supports only the [`data:` URL schema](https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URLs).

For example, you can set a background image in the following way: 

```css
background: url(data:image/png;base64,iVBORw…);
```

Where `iVBORw…` is a base64-encoded PNG image.
{% endAside %}

### Style with ANSI escape sequences {: #style-ansi }

You can use the [ANSI escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code) to style console messages.

It is common for [Node.js](https://nodejs.org/) developers to colorize log messages via ANSI escape sequences, often with the help of some styling libraries like [chalk](https://www.npmjs.com/package/chalk), [colors](https://www.npmjs.com/package/colors), [ansi-colors](https://www.npmjs.com/package/ansi-colors), [kleur](https://www.npmjs.com/package/kleur).

Nevertheless, you can style the message with ANSI escape sequences without using any libraries. Here is the syntax:

```html
\x1B[𝘗1;…;𝘗nm
```

Where,

- `𝘗1` to `𝘗n` are valid subsequences of [SGR (Select Graphic Rendition)](https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters) parameters. 
- Any of the parameters `𝘗1` to `𝘗n` can be omitted, in which case its value is assumed to be zero.
- `\x1B[m` is the shorthand for `\x1B[0m`, in which the display attribute will be reset.

For example,

1. Enter the following console command.
    ```js
    console.log('\x1B[41;93;4mHello\x1B[m');
    ```
2. The command above produces a `Hello` message with red background, yellow text and underlined.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/2LkUf1JpN82PEkA50wJ8.png", alt="Hello", width="800", height="452" %}

Here is a list of color codes supported in DevTools.

<table>
  <thead>
    <tr>
      <th>Foreground</th>
      <th>Background</th>
      <th>Light theme</th>
      <th>Dark theme</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>30</td>
      <td>40</td>
      <td><div style="background:#000000;color:white;text-align:center;">#00000</div></td>
      <td><div style="background:#000000;color:white;text-align:center;">#00000</div></td>
    </tr>
    <tr>
      <td>31</td>
      <td>41</td>
      <td><div style="background:#AA0000;color:white;text-align:center;">#AA0000</div></td>
      <td><div style="background:#ed4e4c;color:white;text-align:center;">#ed4e4c</div></td>
    </tr>
    <tr>
      <td>32</td>
      <td>42</td>
      <td><div style="background:#00AA00;color:white;text-align:center;">#00AA00</div></td>
      <td><div style="background:#01c800;color:white;text-align:center;">#01c800</div></td>
    </tr>
    <tr>
      <td>33</td>
      <td>43</td>
      <td><div style="background:#AA5500;color:white;text-align:center;">#AA5500</div></td>
      <td><div style="background:#d2c057;color:white;text-align:center;">#d2c057</div></td>
    </tr>
    <tr>
      <td>34</td>
      <td>44</td>
      <td><div style="background:#0000AA;color:white;text-align:center;">#0000AA</div></td>
      <td><div style="background:#2774f0;color:white;text-align:center;">#2774f0</div></td>
    </tr>
    <tr>
      <td>35</td>
      <td>45</td>
      <td><div style="background:#AA00AA;color:white;text-align:center;">#AA00AA</div></td>
      <td><div style="background:#a142f4;color:white;text-align:center;">#a142f4</div></td>
    </tr>
    <tr>
      <td>36</td>
      <td>46</td>
      <td><div style="background:#00AAAA;color:white;text-align:center;">#00AAAA</div></td>
      <td><div style="background:#12b5cb;color:white;text-align:center;">#12b5cb</div></td>
    </tr>
    <tr>
      <td>37</td>
      <td>47</td>
      <td><div style="background:#AAAAAA;color:white;text-align:center;">#AAAAAA</div></td>
      <td><div style="background:#cfd0d0;color:black;text-align:center;">#cfd0d0</div></td>
    </tr>
    <tr>
      <td>90</td>
      <td>100</td>
      <td><div style="background:#555555;color:white;text-align:center;">#555555</div></td>
      <td><div style="background:#898989;color:white;text-align:center;">#898989</div></td>
    </tr>
    <tr>
      <td>91</td>
      <td>101</td>
      <td><div style="background:#FF5555;color:white;text-align:center;">#FF5555</div></td>
      <td><div style="background:#f28b82;color:white;text-align:center;">#f28b82</div></td>
    </tr>
    <tr>
      <td>92</td>
      <td>102</td>
      <td><div style="background:#55FF55;color:black;text-align:center;">#55FF55</div></td>
      <td><div style="background:#01c801;color:black;text-align:center;">#01c801</div></td>
    </tr>
    <tr>
      <td>93</td>
      <td>103</td>
      <td><div style="background:#FFFF55;color:black;text-align:center;">#FFFF55</div></td>
      <td><div style="background:#ddfb55;color:black;text-align:center;">#ddfb55</div></td>
    </tr>
    <tr>
      <td>94</td>
      <td>104</td>
      <td><div style="background:#5555FF;color:white;text-align:center;">#5555FF</div></td>
      <td><div style="background:#669df6;color:white;text-align:center;">#669df6</div></td>
    </tr>
    <tr>
      <td>95</td>
      <td>105</td>
      <td><div style="background:#FF55FF;color:white;text-align:center;">#FF55FF</div></td>
      <td><div style="background:#d670d6;color:white;text-align:center;">#d670d6</div></td>
    </tr>
    <tr>
      <td>96</td>
      <td>106</td>
      <td><div style="background:#55FFFF;color:black;text-align:center;">#55FFFF</div></td>
      <td><div style="background:#84f0ff;color:black;text-align:center;">#84f0ff</div></td>
    </tr>
    <tr>
      <td>97</td>
      <td>107</td>
      <td><div style="background:#FFFFFF;color:black;text-align:center;">#FFFFFF</div></td>
      <td><div style="background:#FFFFFF;color:black;text-align:center;">#FFFFFF</div></td>
    </tr>
  </tbody>
</table>

Here is a list of styling code supported in DevTools.

<table>
  <thead>
    <tr>
      <th>Parameter(s)</th>
      <th>Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>Reset all display attributes</td>
    </tr>
    <tr>
      <td>1</td>
      <td><code>font-weight: bold</code></td>
    </tr>
    <tr>
      <td>2</td>
      <td><code>font-weight: lighter</code></td>
    </tr>
    <tr>
      <td>3</td>
      <td><code>font-style: italic</code></td>
    </tr>
    <tr>
      <td>4</td>
      <td>Add <code>underline</code> to <code>text-decoration</code> property</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Add <code>line-through</code> to <code>text-decoration</code> propertyh</td>
    </tr>
    <tr>
      <td>22</td>
      <td>Reset <code>font-weight</code> property</td>
    </tr>
    <tr>
      <td>23</td>
      <td>Reset <code>font-style</code> property</td>
    </tr>
    <tr>
      <td>24</td>
      <td>Remove <code>underline</code> from <code>text-decoration</code> property</td>
    </tr>
    <tr>
      <td>29</td>
      <td>Remove <code>line-through</code> from <code>text-decoration</code> property</td>
    </tr>
    <tr>
      <td>38;2;𝑅;𝐺;𝐵</td>
      <td><code>color: rgb(𝑅,𝐺,𝐵)</code></td>
    </tr>
    <tr>
      <td>39</td>
      <td>Reset <code>color property</code></td>
    </tr>
    <tr>
      <td>48;2;𝑅;𝐺;𝐵</td>
      <td><code>background: rgb(𝑅,𝐺,𝐵)</code></td>
    </tr>
    <tr>
      <td>49</td>
      <td>Reset <code>background property</td>
    </tr>
    <tr>
      <td>53</td>
      <td>Add <code>overline</code> to <code>text-decoration</code> property</td>
    </tr>
    <tr>
      <td>55</td>
      <td>Remove <code>overline</code> from <code>text-decoration</code> property</td>
    </tr>
  </tbody>
</table>

Here is another more complex example with multiple stylings.

1. Enter the following console command.
    ```js
    const hello = '\x1B[41;93;4mHello';
    const space = '\x1B[m ';
    const world = '\x1B[34;102;9mWorld';

    console.log(hello + space + world);
    ```
2. The command above produces a `Hello World` message with 3 differnt styles.
    {% Img src="image/dPDCek3EhZgLQPGtEG3y0fTn4v82/xREUPIh1L1u9pWceW7Fp.png", alt="Hello World", width="800", height="452" %}
