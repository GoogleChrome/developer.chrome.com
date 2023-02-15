<!-- 1. Save the script below as DevTools snippet. See https://developer.chrome.com/docs/devtools/javascript/sources/#snippets. -->
<!-- 2. Upload the images in _temp folder manually -->
<!-- 3. Execute the DevTools snippet to extract image urls. See https://developer.chrome.com/docs/devtools/javascript/sources/#snippets. -->
<!-- 4. Paste and save the result in .env file. -->

```js
const imgList = $$('gcs-uploaded')
    .map(x => { 
        const lang = $('.mat-subheader',x).innerText
            .match(/(?<=new-in-devtools-banner-)(.+?)(?=.svg)/gm)[0];
        const img = $('code', x).innerText
            .match(/(?<=src=")(.+?)(?=")/gm)[0];
        const txt = `DEVTOOLS_IMAGE_${lang.toUpperCase()}="${img}"`

        return { lang, img, txt }
    });

const imgsTxt = imgList.map(x => x.txt).join("\n");

console.log(imgList);
console.log(imgsTxt);

copy(imgsTxt);
console.log('Copied the images text to clipboard!');
```