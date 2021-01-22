class Banner extends HTMLElement {
  connectedCallback() {
    // No matter when this runs, the close button will not be visible until
    // after this class is added—this prevents ghost clicks on the button before
    // the event listener is added.
    this.setAttribute('active', '');

    const button = this.querySelector('[data-banner-close-btn]');
    /** @type {HTMLElement} */ (button).addEventListener('click', () => {
      this.savePreference();
      this.close();
    });
  }

  savePreference() {
    const storageKey = this.getAttribute('storage-key') || '';
    const cta = this.querySelector('a[href]');
    if (cta) {
      const ctaUrl = cta.getAttribute('href') || '';
      localStorage.setItem(storageKey, ctaUrl);
    }
  }

  close() {
    this.setAttribute('hidden', 'true');
  }
}

window.customElements.define('announcement-banner', Banner);
