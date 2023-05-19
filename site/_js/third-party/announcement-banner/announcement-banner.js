class Banner extends HTMLElement {
  connectedCallback() {
    // No matter when this runs, the close button will not be visible until
    // after this class is added—this prevents ghost clicks on the button before
    // the event listener is added.
    this.setAttribute('active', '');
    this.addEventListener('click', e => {
      const buttonClicked = /** @type {HTMLElement} */ (e.target).closest(
        '[data-banner-close-btn]'
      );
      if (buttonClicked) {
        this.savePreference(buttonClicked);
        this.close();
      }
    });
  }

  savePreference(button) {
    const storageKey = this.getAttribute('storage-key') || '';
    const cta = button.getAttribute('storage-value');
    if (cta) {
      localStorage.setItem(storageKey, cta);
    } else {
      const hrefCta = this.querySelector('a[href]');
      if (hrefCta) {
        const ctaUrl = hrefCta.getAttribute('href') || '';
        localStorage.setItem(storageKey, ctaUrl);
      }
    }
  }

  close() {
    this.setAttribute('hidden', 'true');
  }
}

window.customElements.define('announcement-banner', Banner);
