---
layout: "layouts/doc-post.njk"
title: Pixel-Perfect UI in the WebView
date: 2014-02-28
description: How to create perfect WebView UIs.
---

There are a number of options you can use to create the perfect UI, this article will outline some
of the best practices for the mobile web in general and then some specific tricks you could use for
hybrid applications.

## Viewport

The viewport meta tag is of the most important tags you need to add to your web app. Without it, the
WebView may act as if your site is designed for desktop browsers. This causes your web page to be
given a larger width (typically 980px) and scales it to fit the WebView's width. In most cases, the
result is a tiny overview version of the page that requires the user to pan and zoom to actually
read content, like the image on the left.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604544745761.jpg", 
       alt="Screenshots of a page before and after using the viewport meta tag.",
       width="656",
       height="613" %}

If you want the width of your site to be 100% of the WebView's width, as shown on the right, you
need to set the viewport meta tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Setting width to the special value device-width will give you more control over the page layout.

By default the WebView will set the viewport to device-width, rather than defaulting to a desktop
viewport. However, for reliable and controlled behaviour it's good practice to include the viewport
meta tag.

### Desktop Sites

In some cases, you may need to display content that isn't designed for mobile devices–for example,
if you're displaying content you don't control. In this case, you need to force the WebView to use a
desktop-size viewport:

- [setUseWideViewPort(true)][1]
- [setLoadWithOverviewMode(true)][2]

If these methods are not set _and_ no viewport is specified, the WebView will try and set the
viewport width based on the content size.

In addition to doing this, you may want to use the new layout algorithm `TEXT_AUTOSIZING` introduced
in Android 4.4, which increases the font size to make it more readable on a mobile device. See
[setLayoutAlgorithm][3].

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604544955630.jpg", 
       alt="An example of how a page looks before and after text autosizing.",
       width="656",
       height="616" %}

## Responsive Design

Responsive design is the notion of changing your UI depending on the dimensions of the screen size.
Here we will look at some simple examples of how you can adapt your UI and images, but if you want
to dig in to other topics then this article on [HTML5Rocks][4] is a good point of reference.

One of the main CSS features you'll want to use is media queries.

A media query is a way of applying CSS to elements based on a device's characteristics. For example,
suppose you wanted to go from a vertical layout to a horizontal layout based on orientation.

First, set CSS properties to default to portrait:

```css
.page-container {
    display: -webkit-box;
    display: flex;

    -webkit-box-orient: vertical;
    flex-direction: column;

    padding: 20px;
    box-sizing: border-box;
}
```

Then to switch to a horizontal layout you just need to switch the flex-direction property based on
the orientation:

```css
@media screen and (orientation: landscape) {
  .page-container.notification-opened {
    -webkit-box-orient: horizontal;
    flex-direction: row;
  }

  .page-container.notification-opened > .notification-arrow {
    margin-right: 20px;
  }
}
```

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604545057377.jpg", 
       alt="A page that has different presentations in landscape and portrait modes.",
       width="656",
       height="488" %}
       

This technique can be used to change layout based on the width of the screen.

For example, adjusting the size of the button from being 100% to something smaller as the physical
screen size gets larger.

```css
button {
  display: block;
  width: 100%;
  ...
}

@media screen and (min-width: 500px) {
  button {
    width: 60%;
  }
}

@media screen and (min-width: 750px) {
  button {
    width: 40%;
    max-width: 400px;
  }
}
```

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604545130107.jpg", 
       alt="Adjusting button size for different screen sizes.",
       width="656",
       height="769" %}

These are minor changes, but depending on your UI, media queries can help you to make much larger
changes to appearance of your application, while keeping the same HTML.

**Tip:** Try to change the UI based on width as a component starts to look out of place, rather than
focusing on device sizes. By doing this, your app will look great on a range of devices, not just
the ones you test on. An easy way to do this is play around with the size of a browser window. But
remember that actual devices have different screen densities than your monitor, so always test on a
range of devices.

For more on designing for mobile devices, see [HTML5Rocks][5].

## Images

The variety of screens sizes and densities also presents challenges for images. Smaller images
require less memory and are faster to load, but blur if you scale them up.

The images below show the blurring that occurs when you scale a low-density image up for a
high-denity screen, compared with the crisp display of an appropriately-sized image.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604545182932.png", 
       alt="Low-density and high-density versions of an image.",
       width="656",
       height="320" %}

Here are a few tips and tricks to make sure your images look crisp and clear on any screen:

- Use CSS for scalable effects.
- Use vector graphics.
- Provide high-resolution photos.

### Use CSS for scalable effects

Make use of CSS3 where you can for borders, drop shadows, border-radius, and so on instead of
images. These features can scale easily. However, some combinations of CSS properties can be
expensive to render, so you should always test the specific combinations you're using. (For some
sample data on fast and slow CSS properties, see: [CSS Paint Times and Page Render Weight][6] on
HTML5Rocks.)

### Use vector graphics

Scalable Vector Graphics (SVGs) are a great way of providing scalable version of images. For images
that are well-suited to vector graphics, SVG provides high quality images with very small file
sizes. For more information, see [Splash Vector Graphics on your Responsive Site][7] on HTML5Rocks.

### Provide high-resolution photos

Use a version suitable for a high-DPI device and scale the image using CSS. This way the image has a
high quality across devices. If you use high compression (low quality setting) when generating the
image, you may be able to acheive good visual results with a reasonable file size.

This approach is simple, but has a couple of potential downsides: highly-compressed images may show
some visual artifacts, so you need to experiment to determine what level of compression you find
acceptable. And resizing the image in CSS can be an expensive operation.

If high compression is not suitable for your needs, try the WebP format, which gives a high quality
image with relatively small file size. See [the official WebP site][8] for details. Don't forget
that you'll need to provide a fallback for older versions of Android where WebP isn't supported.

For more information on this topic:

- [High DPI Images for Variable Pixel Densities][9] on HTML5Rocks.
- [Seeing the World Through High DPI][10] video from Google I/O 2013.

### Fine grained control

In many cases, you can't use a single image for all devices. In this case, you can select different
images based on the screen size and density. You can use media queries to select background images
by screen size and density. You can also use JavaScript to control how images load.

#### Media queries and screen density

To select an image based on the screen density, you need to use `dpi` or `dppx` units in your media
query. The `dpi` unit represents dots per CSS inch, while `dppx` represents dots per CSS pixel.

Looking at the table below you can see the relation between `dpi` and `dppx`. 1`dppx` is equivalent
to 96`dpi`, 2`dppx` == 192`dpi` == 2 x 96`dpi`, and so on.


| Device pixel ratio | Generalized screen density | Dots per CSS inch (`dpi`) | Dots per CSS pixel (`dppx`) |
| ------------------ | -------------------------- | ------------------------- | --------------------------- |
| 1x | MDPI | 96`dpi` | 1`dppx` |
| 1.5x | HDPI | 144`dpi` | 1.5`dppx` |
| 2 | XHDPI | 192`dpi` | 2`dppx` |

The generalized screen density buckets are defined by the Android native platform and are used in
other places to express screen density (for example, [http://screensiz.es][11]).

#### Background Images

You can use media queries to assign background images to elements. For example, if you have a logo
image with 256px x 256px size on a device with a pixel ratio of 1.0, you might use the following CSS
rules:

```css
.welcome-header > h1 {
  flex: 1;

  width: 100%;

  max-height: 256px;
  max-width: 256px;

  background-image: url('../images/html5_256x256.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
```

To swap this out for a larger image on devices with device pixel ratio of 1.5 (hdpi) and 2.0
(xhdpi), you can add the following rules:

```css
@media screen and (min-resolution: 1.5dppx) {
  .welcome-header > h1{
      background-image: url('../images/html5_384x384.png');
  }
}

@media screen and (min-resolution: 2dppx) {
  .welcome-header > h1{
      background-image: url('../images/html5_512x512.png');
  }
}
```

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/1604545224766.png", 
       alt="Using different images for different device pixel ratios.",
       width="656",
       height="619" %}

You can then merge this technique with other media queries like `min-width`, which is useful as you
start to account for different form factors.

```css
@media screen and (min-resolution: 2dppx) {
  .welcome-header > h1{
          background-image: url('../images/html5_512x512.png');
  }
}

@media screen and (min-resolution: 2dppx) and (min-width: 1000px) {
  .welcome-header > h1{
          background-image: url('../images/html5_1024x1024.png');

          max-height: 512px;
      max-width: 512px;
  }
}
```

You might notice that the `max-height` and `max-width` are set to 512px for 2`ddpx` resolution, with
an image of 1024x1024px. this is because a CSS "pixel" actually takes into account the device pixel
ratio (512px \* 2 = 1024px).

#### What About `<img/>`?

The web today doesn't have a solution for this. There are some proposals in the works, but they
aren't available in current browsers or in the WebView.

In the mean time, if you generate your DOM in JavaScript, you can create multiple image resources in
a sane directory structure:

```text
images/
    mdpi/
        imagename.png
    hdpi/
        imagename.png
    xhdpi/
        imagename.png
```

Then use the pixel ratio to try and pull the most appropriate image:

```js
function getDensityDirectoryName() {
  if(!window.devicePixelRatio) {
    return 'mdpi';
  }

  if(window.devicePixelRatio > 1.5) {
    return 'xhdpi';
  } else if(window.devicePixelRatio > 1.0) {
    return 'hdpi';
  }

  return 'mdpi';
}
```

The alternative to implementing the above in JS, is to alter the base URL of the page to define the
relative URLs for images.

```html
<!doctype html>
<html class="no-js">
<head>
  <script>
    function getDensityDirectoryName() {
      if(!window.devicePixelRatio) {
          return 'mdpi';
      }

      if(window.devicePixelRatio > 1.5) {
          return 'xhdpi';
      } else if(window.devicePixelRatio > 1.0) {
          return 'hdpi';
      }

      return 'mdpi';
    }

    var baseUrl =
        'file:///android_asset/www/img-js-diff/ratiores/'+getDensityDirectoryName()+'/';
    document.write('<base href="'+baseUrl+'">');
  </script>

    ...
</head>

<body>
    ...
</body>
</html>
```

The major downsides to this are that it blocks the page load and forces you to use absolute paths
for scripts, CSS files, links and so on, since the base URL points to a density-specific directory.

[1]:
  http://developer.android.com/reference/android/webkit/WebSettings.html#setUseWideViewPort(boolean)
[2]:
  http://developer.android.com/reference/android/webkit/WebSettings.html#setLoadWithOverviewMode(boolean)
[3]:
  http://developer.android.com/reference/android/webkit/WebSettings.html#setLayoutAlgorithm(android.webkit.WebSettings.LayoutAlgorithm)
[4]: http://www.html5rocks.com/en/mobile/responsivedesign/
[5]: http://www.html5rocks.com/en/mobile/
[6]: http://www.html5rocks.com/en/tutorials/speed/css-paint-times/
[7]: http://www.html5rocks.com/en/tutorials/svg/mobile_fundamentals/
[8]: http://developers.google.com/speed/webp/
[9]: http://www.html5rocks.com/en/mobile/high-dpi/
[10]: https://developers.google.com/events/io/sessions/350992350
[11]: http://screensiz.es/phone
