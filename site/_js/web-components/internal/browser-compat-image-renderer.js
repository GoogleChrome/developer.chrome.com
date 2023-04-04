/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview A component to generate a static image from a BrowserCompat widget
 */
import {BaseElement} from '../base-element';
import {html} from 'lit-element';

import * as htmlToImage from 'html-to-image';

const BROWSERS = ['Chrome', 'Firefox', 'Edge', 'Safari'];
const SUPPORT_LEVELS = {
  no: 'Not supported or deprecated (red)',
  preview: 'Preview or Behind a flag (yellow)',
  yes: 'Supported (green)',
};

export class BrowserCompatImageRenderer extends BaseElement {
  static get properties() {
    return {
      _mode: {type: 'String'},
      _featureId: {type: 'String'},
      _disabled: {type: 'Boolean'},
      _browsers: {type: 'Object'},
      _output: {type: 'String'},
    };
  }

  constructor() {
    super();
    this._mode = 'feature-id';
    this._featureId = '';
    this._disabled = false;
    this._browsers = BROWSERS.reduce(
      (object, browser) => ({
        ...object,
        [browser.toLowerCase()]: {version: '', support: 'no'},
      }),
      {}
    );
    this._output = '';
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _onChangeMode(e) {
    this._mode = e.target.value;
  }

  _renderModeControls() {
    return html`
      <fieldset class="form-fieldset gap-top-400" ?disabled=${this._disabled}>
        <legend class="form-label">Mode</legend>
        <div class="pad-bottom-400">
          <input
            type="radio"
            id="mode-feature-id"
            name="mode"
            value="feature-id"
            @change=${this._onChangeMode}
            checked
          />
          <label class="form-label" for="mode-feature-id">Feature ID</label>
          <label for="mode-feature-id" class="form-help-text">
            Insert the MDN Browser Compat ID of the feature you want to
            render. See the
            <a
              href="https://developer.chrome.com/docs/handbook/components/#browser-compat:~:text=The%20following%20JavaScript%20snippet"
              >handbook</a
            >
            for a tip on how to obtain one for a given feature.
          </p>
        </div>
        <div>
          <input
            type="radio"
            id="mode-manual"
            name="mode"
            value="manual"
            @change=${this._onChangeMode}
          />
          <label class="form-label" for="mode-manual">Manual</label>
          <label for="mode-manual" class="form-help-text">
            Manually specify version numbers and support level for each
            browsers, if a feature is not yet documented on MDN.
          </label>
        </div>
      </fieldset>
    `;
  }

  _onChangeFeatureId(e) {
    this._featureId = e.target.value;
  }

  _renderFeatureIdControls() {
    return html`
      <fieldset class="form-fieldset gap-top-400">
        <legend class="form-label">Feature ID</legend>
        <div>
          <input class="form-input-text" type="text" id="feature-id" name="mode" placeholder="css.types.color.rgba" @change=${this._onChangeFeatureId}></input>
          <p class="form-help-text">
            A valid MDN Browser Compat ID. Note that non-existent IDs will render as not supported.
          </p>
        </div>
      </fieldset>
    `;
  }

  _onChangeBrowserVersion(e) {
    this._setBrowserOption(e.target.name, e.target.value);
  }

  _onChangeBrowserSupport(e) {
    this._setBrowserOption(e.target.name, e.target.value);
  }

  _setBrowserOption(key, value) {
    const [browser, option] = key.split('.');
    // Browsers get pre initialized in constructor so we can skip to check
    // if an object with that key exists
    this._browsers[browser][option] = value;
    // Manually trigger an update as lit-element doesn't pick up
    // changes to nested objects
    this.requestUpdate();
  }

  _renderManualControls() {
    const browserControls = [];
    for (const browser of BROWSERS) {
      const browserId = browser.toLowerCase();
      browserControls.push(html`
        <fieldset class="form-fieldset gap-bottom-400">
          <legend class="form-label">${browser}</legend>
          <div>
            <select
              class="form-input-select"
              id="${browserId}.support"
              name="${browserId}.support"
              @change=${this._onChangeBrowserSupport}
            >
              ${Object.keys(SUPPORT_LEVELS).map(key => {
                return html`<option
                  value="${key}"
                  ?selected=${this._browsers[browserId].support === key}
                >
                  ${SUPPORT_LEVELS[key]}
                </option>`;
              })}
            </select>
            <p class="form-help-text">
              The browser's support level, which indicates the color code.
            </p>
          </div>

          ${this._browsers[browserId].support !== 'no'
            ? html`<div class="gap-top-400">
            <input class="form-input-text" type="text" id="${browserId}.version" name="${browserId}.version" placeholder="116" value=${this._browsers[browserId].version} @change=${this._onChangeBrowserVersion}></input>
            <p class="form-help-text">
              The browser version.
            </p>
          </div>`
            : ''}
        </fieldset>
      `);
    }

    return html`
      <fieldset class="form-fieldset gap-top-400" ?disabled=${this._disabled}>
        <legend class="form-label">Browsers</legend>
        ${browserControls}
      </fieldset>
    `;
  }

  _renderStatus(message, loading = true) {
    return [
      loading ? html`<div class="spinner"></div>` : '',
      html`<div class="form-help-text">${message}</div>`,
    ];
  }

  async _renderBrowserCompatWidget(response) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(await response.text(), 'text/html');
    const widget = doc.querySelector('.wdi-browser-compat');

    if (!widget) {
      return this._renderStatus(
        'Could not parse remote-rendered widget.',
        false
      );
    }

    // Remove unneeded elements from the widget, link is not always available
    // so just try
    try {
      widget.querySelector('.wdi-browser-compat__label')?.remove();
      widget.querySelector('.wdi-browser-compat__link')?.remove();
    } catch (e) {
      // Ignore
    }

    // Create an invisible canvas where we can render the widget, without appending
    // it to lit-element's shadow root
    const canvas = document.createElement('div');
    document.body.appendChild(canvas);
    canvas.style = 'position: absolute; top: -9999px; left: -9999px;';
    canvas.appendChild(widget);

    // Convert the background-image data URL of wdi-browser-compat__icon to a real
    // image element and append it to the node
    const icons = widget.querySelectorAll('.wdi-browser-compat__icon');
    for (const icon of icons) {
      let dataUrl = getComputedStyle(icon).backgroundImage;
      // Remove wrapping url() and quotes
      dataUrl = dataUrl.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      const image = document.createElement('img');
      image.src = dataUrl;
      image.className = 'wdi-browser-compat__icon';
      image.style.background = 'none';
      image.alt = icon.dataset.browser;
      image.dataset.browser = icon.dataset.browser;
      image.width = 24;
      image.height = 24;
      icon.replaceWith(image);
    }

    // Are there manual options? Then we need to update the widget to match
    // the selected options
    if (this._mode === 'manual') {
      for (const [browser, options] of Object.entries(this._browsers)) {
        // @ts-ignore
        const item = widget.querySelector(
          `[data-browser="${browser}"]`
        )?.parentElement;
        // @ts-ignore
        const version = item?.querySelector('.wdi-browser-compat__version');
        if (version) {
          // @ts-ignore
          version.dataset.compat = options.support;
          // @ts-ignore
          version.innerText = options.version || 'x';
        }
      }
    }

    // @ts-ignore
    const staticWidget = await htmlToImage.toPng(widget, {
      pixelRatio: 8,
    });

    // Clean-up intermediate canvas, to not cause memory leaks if multiple widgets
    // are rendered
    document.body.removeChild(canvas);
    this._disabled = false;

    return html`<img
      src="${staticWidget}"
      alt="BrowserCompat: ${this._featureId}"
    />`;
  }

  async _onClickRender(e) {
    this._disabled = true;
    this._output = this._renderStatus('Rendering shortcode remotely ...');

    const response = await fetch('/api/browserCompatImageRenderer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({featureId: this._featureId}),
    });

    this._output = this._renderStatus(
      'Preparing browser compat widget DOM ...'
    );
    this._output = await this._renderBrowserCompatWidget(response);
  }

  _renderOutput() {
    return html` <div class="pad-bottom-400 pad-top-400">
      <div
        class="rounded-lg display-flex align-center width-full pad-200"
        style="background: #f1f3f4;"
      >
        <div class="display-flex align-center">
          ${this._output
            ? this._output
            : html`<div class="form-help-text">
                Select options and click "Render". Your image will appear here.
              </div>`}
        </div>
      </div>
    </div>`;
  }

  render() {
    return html`
      ${this._renderModeControls()}
      ${this._mode === 'feature-id'
        ? this._renderFeatureIdControls()
        : this._renderManualControls()}

      <button
        class="button-filled material-button color-bg bg-primary gap-top-400"
        ?disabled=${this._disabled}
        @click=${this._onClickRender}
      >
        Render
      </button>

      ${this._renderOutput()}
    `;
  }
}

customElements.define(
  'browser-compat-image-renderer',
  BrowserCompatImageRenderer
);
