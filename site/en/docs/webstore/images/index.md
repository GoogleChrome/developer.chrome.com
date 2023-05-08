---
layout: "layouts/doc-post.njk"
title: Supplying Images
date: 2018-06-11
updated: 2021-08-13
description: Guidelines about the kinds of images you need to supply to the Chrome Web Store.
---

You need to supply several kinds of images to be used in the Chrome Web Store:

- [Extension icon][icons]
- [Promotional images][images]
- [Screenshots][screenshots]

Only the extension icon, a small promotional image, and a screenshot are mandatory. However, providing
attractive versions of both required and optional images increases your extension's chances of getting
noticed. For example, your extension can't be featured in marquee unless you provide a marquee promotional image.

You can improve your item's performance in the Chrome Web Store by following our best practices for
images and other listing information. To learn more about these best practices, see [Creating a
compelling listing page][best-listing].

## Extension icon {: #icons }

You must provide a 128x128-pixel extension icon image in the [ZIP file of your extension][zip-file]. Some requirements
for the image:

- The actual icon size should be **96x96** (for square icons); an additional 16 pixels per side
  should be transparent padding, adding up to 128x128 total image size. For details, see [Icon
  size][icon-size].
- The image must be in PNG format.
- The image should work well on both light and dark backgrounds.

When you design the icon, keep the following advice in mind:

- Don't put an edge around the 128x128 image; the UI might add edges.
- If your icon is mostly dark, consider adding a subtle white outer glow so it'll look good against
  dark backgrounds.
- Avoid large drop shadows; the UI might add shadows. It's OK to use small shadows for contrast.
- If you have a bevel at the bottom of your icon, we recommend 4 pixels of depth.
- Make the icon face the viewer, rather than having built-in perspective. See [Perspective][icon-perspective] for
  details.

Here are some icons that follow these guidelines.

<table>
  <tr>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Rd4d1Q0Oiqrloe2FEuhz.png", 
        alt="Google Calendar icon (square)", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/6kEsFm1qtHHAh5bhoqyb.png",
            alt="Google Reader icon (irregular)", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/sXGfYmHIWHd1daw8XWqU.png", 
            alt="bowling ball-like icon (round)", height="128", width="128" %}
    </td>
  </tr>
</table>

{% Aside 'note' %}

If you upload an image that has no alpha, it will be placed in a frame with rounded corners (12-pixel corner radius).

{% endAside %}

### Icon size {: #icon-size }

All extension icons should have the same visual weight, occupying roughly the same area. As the following
figure shows, when you size an icon to fill the available area, square and circular icons are
significantly larger than they should be, compared to icons with other shapes.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/9FMwqxYPCJPUtgOopXPk.png", 
       alt="icons filling all available space", height="98", width="562" %}

Normalizing the icon sizes, as the next figure shows, gives the icons roughly even area and visual
weight.

{% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Jx7j7kIofWvXzqdvNj58.png", 
       alt="most of the icons are smaller, and they have equal visual weight", height="99", width="563" %}

You can use the following template images to help you judge how large your image's artwork should
be. The templates show the correct size for a square and a circle, but these are merely guides;
icons that have pointy bits might stray outside these areas. If an irregularly shaped icon takes up
very little area and is mostly negative space, using the entire 128x128 area might be acceptable.

<table>
  <tr>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/c0DOKQ3OrWsplkGsI1B7.png", 
            alt="Square icon template", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GnSrHkHRaoyeCSh5uUYF.png", 
            alt="Circular icon template", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/dpaYEIUCdU2xtyld5bI0.png", 
            alt="Irregular icon template", height="128", width="128" %}
    </td>
  </tr>
</table>

You can follow some rules of thumb for artwork size. For a square icon, make the artwork 96x96
pixels. For other icons that are squarish, make the artwork's width 75-80% of the total width of the
image. A circular icon should have a diameter of approximately 112 pixels, or 85% to 90% of the
image width. Icons with irregular shapes should have similar weights.

The following figures show square and circular icons, comparing them with the templates.

<table>
  <tr>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/c0DOKQ3OrWsplkGsI1B7.png", 
             alt="Square icon template", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/hjay02YiqEGyRPei7P3p.png", 
             alt="Google Calendar icon on top of square template", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Rd4d1Q0Oiqrloe2FEuhz.png", 
             alt="Google Calendar icon (square)", height="128", width="128" %}
    </td>
  </tr>
  <tr>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/GnSrHkHRaoyeCSh5uUYF.png", 
            alt="Circular icon template", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/XTqBY6it54ZoYNpYPrLx.png", 
             alt="bowling ball-like icon on top of circle template", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/sXGfYmHIWHd1daw8XWqU.png", 
            alt="bowling ball-like icon (round)", height="128", width="128" %}
    </td>
  </tr>
</table>

Here's an example of an irregularly shaped icon. In this case, the icon follows neither the square
nor circular guidelines, but it fits near them both.

<table>
  <tr>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/dpaYEIUCdU2xtyld5bI0.png", 
            alt="Irregular icon template", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OejNJxYAhv6mOh5E76M7.png", 
             alt="Google Reader icon on top of irregular template", height="128", width="128" %}
    </td>
    <td>
      {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/6kEsFm1qtHHAh5bhoqyb.png",
            alt="Google Reader icon (irregular)", height="128", width="128" %}
    </td>
  </tr>
</table>

### Perspective {: #icon-perspective }

For flexibility and consistency, extension icons should be front-facing. Subtle tweaks of perspective that
give a sense of tangibility are OK, but avoid dramatic angles.

<table>
  <thead>
    <tr>
      <th>Good icons (front-facing)</th>
      <th>Bad icons (too-drastic perspective)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/Rd4d1Q0Oiqrloe2FEuhz.png", 
              alt="Google Calendar icon (square)", height="128", width="128" %}
      </td>
      <td>
        {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/OQkBUeIh9bfpXYwbJbPp.png", 
              alt="Generic calendar icon with too much perspective", height="98", width="98" %}
      </td>
    </tr>
    <tr>
      <td>
        {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/pVaO0s5ibmNTuR8V1J5m.png", 
              alt="YouTube icon", height="99", width="99" %}
      </td>
      <td>
        {% Img src="image/BrQidfK9jaQyIHwdw91aVpkPiib2/e3g4CRusuKk9Gu7JUPTI.png", 
              alt="YouTube icon with too much perspective", height="98", width="98" %}
      </td>
    </tr>
  </tbody>
</table>

## Promotional images {: #promo }

You must provide one small, 440x280-pixel promotional image. You can also provide other images that
the store can use to promote your extension.

{% Aside 'note' %}

Unlike [screenshots][screenshots], promotional images are not currently locale-specific. If your extension supports multiple locales, we recommend either avoiding text by focusing on graphical representations of the extension's capabilities, or targeting the promo images to the locale in which you have the most users.

{% endAside %}


**Note**: If your images refer to Google brands, follow the [Branding Guidelines][branding].

Although only a small promotional image is required, you can also supply larger promotional images
if you'd like your extension to be featured more prominently in the Chrome Web Store. You can provide one
of each of the following:

- Small: 440x280 pixels **(required)**
- Marquee: 1400x560 pixels

{% Aside 'note' %}

Extensions that don't have a small promotional image will be shown **after** extensions that do have that image. If your extension was published before the small promotional image was required, you should add that image so your extension can be displayed more prominently.

{% endAside %}

Promotional images are your chance to capture users' attention and entice them to learn more. Don't
just use a screenshot; your images should primarily communicate the brand. Here are some rules of
thumb for designing your images:

- Avoid text.
- Make sure your image works even when shrunk to half size.
- Assume the image will be on a light gray background.
- Use saturated colors if possible; they tend to work well.
- Avoid using a lot of white and light gray.
- Fill the entire region.
- Make sure the edges are well defined.

The following graphics are examples of the promotional images for an extension:

<figure>
{% Img src="image/nPi5hOhvGtatFrSN6ugwlPVHcs43/9KruJ8pLUNTrzXIXP6JN.png", alt="Small promo image", height="140", width="220" %}
  <figcaption>
Small promo image (440x280)
  </figcaption>
</figure>

<figure>
{% Img src="image/nPi5hOhvGtatFrSN6ugwlPVHcs43/tn6IOh8ZCrflIOcu8isV.png", alt="Marquee", height="280", width="700" %}
  <figcaption>
Marquee image (1400x560)
  </figcaption>
</figure>


{% Aside 'note' %}

You can find the review status of your promo image in each item's listing within your developer dashboard. Click on 'Edit' on the item's listing, and scroll down to the Promotional Images section.

{% endAside %}

Here is a description of the review statuses:

- **Pending Review status**: The image has not yet been reviewed, and is not being displayed in the
  store. Images should be reviewed within one week from submission.
- **No status**: The image has been approved, and is being displayed in the store. \[\*Images from
  'Draft' or 'Trusted testers' items will not show an image status. You will need to publish the
  item in order to get your promo image approved.\]
- **Rejected**: The image has been reviewed and rejected, and is not being displayed in the store. The
  reason(s) for rejection will be displayed in the Promotional Images section of the item's Edit
  page. We encourage you to review the reasons, and to make the necessary changes before
  re-uploading new improved images. New uploaded images will immediately have a Pending Review
  status.

To replace a promotional image, hover over the image to bring up the remove image control.

## Screenshots {: #screenshots }

Use screenshots to convey capabilities, the look and feel, and experience of your extension to users. You must provide at **least 1**—and preferably the maximum allowed 5—screenshots of your extension to be displayed in the extension's store listing. Screenshots should demonstrate the actual user experience, focusing on the core features and content so users can anticipate what the extension's experience will be like.

If your extension supports multiple locales, you can provide
locale-specific screenshots as described in [Internationalizing Your Extension][internationalize].

When you edit your extensions's listing, mousing over a screenshot's thumbnail brings up controls that let
you delete the screenshot or change its position.

Each screenshot should be as follows:

- Square corners, no padding (full bleed)
- 1280x800 or 640x400 pixels

{% Aside 'note' %}

1280x800 screenshots are preferrable, as larger screenshots look better on high-resolution displays. Currently, all screenshots are downscaled to 640x400 pixels. If your screenshots do not look good when downscaled (for example, they have a lot of text) or if 1280x800 is too big for your extension (for example, screenshots for a low-resolution game), you can upload 640x400 screenshots.

{% endAside %}


As an example, here are two screenshot images for an extension:

{% Img src="image/nPi5hOhvGtatFrSN6ugwlPVHcs43/ZR47lUf4fWymaVWR9kDT.jpg", alt="Screenshot 1", height="500", width="800" %}

{% Img src="image/nPi5hOhvGtatFrSN6ugwlPVHcs43/LlJiqs3gSxmXVsaoAhJX.jpg", alt="Screenshot 2", height="500", width="800" %}

## What next?

Next, read [Submit your extension for publishing][submit-item].

[best-listing]: /docs/webstore/best_listing
[branding]: /docs/webstore/branding
[icons]: #icons
[icon-perspective]: #icon-perspective
[icon-size]: #icon-size
[images]: #promo
[internationalize]: /docs/webstore/i18n
[screenshots]: #screenshots
[submit-item]: /docs/webstore/publish/#submit-your-item-for-publishing
[zip-file]: /docs/webstore/publish#create-your-items-zip-file

