// Although discouraged (especially for longer videos), some video clips may have
// autoplay enabled. Disable it when prefers-reduced-motion is set, and ensure
// controls are enabled.
if (matchMedia('(prefers-reduced-motion)').matches) {
  document.querySelectorAll('video[autoplay]').forEach(b => {
    b.removeAttribute('autoplay');
    b.setAttribute('controls', '');
  });
}
