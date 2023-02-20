---
api: wallpaper
---

## Manifest

You must declare the "wallpaper" permission in the app's [manifest][1] to use
the wallpaper API. For example:

```json
{
  "name": "My extension",
  ...
  "permissions": [
    "wallpaper"
  ],
  ...
}
```

## Examples

For example, to set the wallpaper as the image at
`https://example.com/a_file.png`, you can call `chrome.wallpaper.setWallpaper`
this way:

```js
chrome.wallpaper.setWallpaper(
  {
    'url': 'https://example.com/a_file.jpg',
    'layout': 'CENTER_CROPPED',
    'filename': 'test_wallpaper'
  },
  function() {}
);
```

[1]: /docs/extensions/mv3/manifest