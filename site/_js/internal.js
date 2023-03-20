//@ts-nocheck

import * as htmlToImage from 'html-to-image';

(() => {
  function updateStatus(status) {
    $output.innerHTML = `<div class="loader"></div> ${status}`;
  }

  function adoptBrowserCompat($output, html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const $browserCompat = doc.querySelector('.wdi-browser-compat');
    // Remove unneeded elements from the widget, link is not always available
    // so just try
    try {
      $browserCompat.querySelector('.wdi-browser-compat__label').remove();
      $browserCompat.querySelector('.wdi-browser-compat__link').remove();
    } catch (e) {
      // Ignore
    }

    // Remove the list intendation from the items element
    $browserCompat.querySelector(
      '.wdi-browser-compat__items'
    ).style.padding = 0;

    // Attach the div to the $output element so that it can be rendered
    // by html-to-image and styles already apply
    $output.innerHTML = '';
    $output.appendChild($browserCompat);

    // Convert the background-image data URL of wdi-browser-compat__icon to a real SVG element
    // and append it to the node
    const $icons = $browserCompat.querySelectorAll('.wdi-browser-compat__icon');
    for (const $icon of $icons) {
      let dataUrl = getComputedStyle($icon).backgroundImage;
      // Remove wrapping url() and quotes
      dataUrl = dataUrl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      const $img = doc.createElement('img');
      $img.src = dataUrl;
      $img.className = 'wdi-browser-compat__icon';
      $img.style.background = 'none';
      $img.alt = 'Browser';
      $img.width = '24';
      $img.height = '24';
      $icon.replaceWith($img);
    }

    return $browserCompat;
  }

  const $featureId = document.querySelector(
    'form[name="browser-compat-image-renderer"] input[name="feature-id"]'
  );
  const $submit = document.querySelector(
    'form[name="browser-compat-image-renderer"] button'
  );
  const $output = document.querySelector('#output');

  //@ts-ignore
  $submit.addEventListener('click', async e => {
    e.preventDefault();
    $submit.disabled = true;

    //@ts-ignore
    updateStatus('Rendering shortcode remotely ...');
    const response = await fetch('/api/browserCompatImageRenderer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({featureId: $featureId.value}),
    });

    // Extract the div with the class wdi-browser-compat from the HTML response
    // and return it as a string.
    updateStatus('Extracting BrowserCompat widget ...');

    const html = await response.text();
    const $browserCompat = adoptBrowserCompat($output, html);

    const png = await htmlToImage.toPng($browserCompat, {
      pixelRatio: 8,
    });

    $output.innerHTML = `<img src="${png}" alt="BrowserCompat: ${$featureId.value}"/>`;
    $submit.disabled = false;
  });
})();
