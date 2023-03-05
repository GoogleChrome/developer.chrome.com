const path = require('path');
const fs = require('fs');
const {Writable} = require('node:stream');
const chalk = require('chalk');
const handlers = require('./server/handlers');

// matches <body>...</body>
const HTML_BODY_REGEX = /<body>(.*)<\/body>/is;

// matches <a ...> or <area ...>
const HTML_HREF_ELEMENT_REGEX = /<(a|area)\s.+?>.+?(?=>)\/?>/gi;

// matches href="..." (backslash escape aware) or href=... (does not match href='...')
const HTML_HREF_ATTRIBUTE_REGEX = /href=("(?:\\["\\]|[^"\\]+)*"|[^\s>]+)/gi;

class UrlCrawlResult {
  constructor() {
    this.scannedUrls = {};
    this.scanCount = 0;
    /** @type {ScanError[]} */
    this.errors = [];

    this.startTime = Date.now();
  }

  get errorCount() {
    return this.errors.length;
  }

  incrementScanCount() {
    this.scanCount++;
  }

  summaryToConsole() {
    const errorCategories = {};
    for (const error of this.errors) {
      const key = `${error.statusCode} ${error.summary}`;
      if (errorCategories[key] === undefined) {
        errorCategories[key] = [];
      }

      errorCategories[key].push(error);
    }

    /**
     * @param {number} number
     * @returns {string}
     */
    function formatNumber(number) {
      return number.toLocaleString('en-GB');
    }

    const errorCount = this.errorCount;
    const summary = [
      '',
      '=== Summary ===',
      `Scanned ${formatNumber(this.scanCount)} URLs in ${
        (Date.now() - this.startTime) / 1000
      }s`,
      '',
      'Error Summary',
      Object.entries(errorCategories)
        .map(
          ([key, errors]) =>
            `  ${chalk[errors[0].statusCode === 200 ? 'green' : 'red'].bold(
              key
            )}: ${formatNumber(errors.length)}`
        )
        .join('\n'),
      '',
      'Totals',
      `  Errors: ${formatNumber(errorCount)}`,
      `  Pass: ${formatNumber(this.scanCount - errorCount)}`,
      '',
    ];

    console.log(summary.join('\n'));
  }
}

/**
 * @typedef {{
 *   shouldNormalizeTrailingSlash?: boolean;
 *   shouldDisableDuplicateUrls?: boolean;
 *   onErrorOutput?: (error: ScanError) => string;
 *   handlers?: import('express').RequestHandler[];
 * }} UrlCrawlOptions
 */

class UrlCrawl {
  /**
   * @param {UrlCrawlOptions} options
   */
  constructor(options) {
    this.shouldNormalizeTrailingSlash =
      options?.shouldNormalizeTrailingSlash ?? false;
    this.shouldDisableDuplicateUrls =
      options?.shouldDisableDuplicateUrls ?? false;
    this.onErrorOutput = options?.onErrorOutput ?? null;
    this.handlers = options?.handlers ?? [];
  }

  /**
   * Prints debug message to the console
   *
   * @param {any} content The content to print
   */
  debug(...content) {
    console.debug('DEBUG', ...content);
  }

  /**
   * Simulates a network request to the express webserver.
   *
   * @param {string} urlPath The URL path to simulate
   * @returns {Promise<{
   *   sendFile: (file: string, options: {root: string}) => void,
   *   redirect: (code: number, target: string) => void,
   *   status: (code: number) => void,
   *   headers: Record<string, string>,
   *   setHeader: (key: string, value: string) => void,
   *   getHeader: (key: string) => string,
   *   content: string,
   *   end: (content?: string) => void,
   *   statusCode: number,
   * }>}
   */
  simulateExpressPath(urlPath) {
    return new Promise(resolve => {
      const res = new Writable(
        /**
         * @typedef {module:stream.internal.WritableOptions} WritableOptions
         * @type {WritableOptions & {
         *   content: string,
         * }} */ ({
          construct(callback) {
            this.content = '';
            callback();
          },
          write(chunk, _encoding, callback) {
            this.content += chunk.toString();
            callback();
          },
        })
      );

      // essentially we're just mocking the express response object for the middlewares to work
      // correctly
      Object.assign(res, {
        // added to trick the "send" package into not immediately closing the writable
        finished: false,

        // used by the notFoundHandler
        sendFile(file, options) {
          const content = fs.readFileSync(path.join(options?.root, file));
          this.setHeader('Content-Type', 'text/html');
          this.end(content);
        },

        statusCode: 200,
        redirect(code, target) {
          this.statusCode = code;
          this.setHeader('Location', target);
          this.end();
        },
        status(code) {
          this.statusCode = code;
        },

        headers: {},
        setHeader(key, value) {
          this.headers[key] = value;
        },
        getHeader(key) {
          return this.headers[key];
        },

        content: '',
        end(content) {
          if (content !== undefined) {
            this.content = content;
          }

          resolve(this);
        },
      });

      const req = {
        method: 'GET',
        path: urlPath,
        url: urlPath,
        headers: {},
      };

      /**
       * Call the next in line handler
       *
       * @param {number} handlerIndex The index of the handler to call
       */
      const callNextHandler = (handlerIndex = 0) => {
        if (this.handlers === undefined) {
          throw new Error('Handlers not initialized');
        }

        const handler = this.handlers[handlerIndex];
        if (!handler) {
          return;
        }

        handler(
          /** @type {import('express').Request} */ (req),
          /** @type {import('express').Response} */ (res),
          () => {
            callNextHandler(handlerIndex + 1);
          }
        );
      };

      callNextHandler();
    });
  }

  /**
   * @typedef {{
   *   path: string,
   *   tag: string,
   *   statusCode: number,
   *   summary: string,
   *   parent: ?string,
   * }} ScanError
   */

  /**
   * @param {UrlCrawlResult} result
   * @param {string} cachePath
   * @param {ScanError} error
   */
  handleError(result, cachePath, error) {
    if (this.onErrorOutput) {
      console.log(this.onErrorOutput(error));
    }

    result.errors.push(error);
    result.scannedUrls[cachePath] = error;
  }

  /**
   * Recursively loads a path's content and scans it for URLs
   *
   * @param {UrlCrawlResult} result
   * @param {string} urlPath
   * @param {string} tag
   * @param {?string} parent
   * @param {boolean} shouldSilentlyFail
   *
   * @returns {Promise<number>}
   */
  async scanPath(
    result,
    urlPath,
    tag,
    parent = null,
    shouldSilentlyFail = false
  ) {
    // instead of checking a URL everytime it is reused, we check it once and cache the result
    let cachePath = urlPath;
    if (this.shouldNormalizeTrailingSlash && !urlPath.endsWith('/')) {
      cachePath += '/';
    }

    const cachedResult = result.scannedUrls[cachePath];
    if (this.shouldDisableDuplicateUrls && cachedResult) {
      return 200;
    }

    result.incrementScanCount();

    if (cachedResult !== undefined) {
      if (cachedResult !== 'OK' && !shouldSilentlyFail) {
        this.handleError(result, cachePath, {
          ...cachedResult,
          parent,
          tag,
        });
      }

      return cachedResult.statusCode;
    }

    // run request simulation on the path
    const res = await this.simulateExpressPath(urlPath);
    if (res.statusCode === 404) {
      if (!shouldSilentlyFail) {
        this.handleError(result, cachePath, {
          path: urlPath,
          statusCode: res.statusCode,
          tag,
          summary: 'Not Found',
          parent,
        });
      }

      return res.statusCode;
    } else if (res.statusCode === 301 || res.statusCode === 302) {
      const location = res.headers.Location;
      // external redirect, ignore
      if (location.startsWith('http://') || location.startsWith('https://')) {
        return 200;
      }

      const redirectResult = await this.scanPath(
        result,
        location,
        tag,
        parent,
        true
      );

      if (redirectResult !== 200 && !shouldSilentlyFail) {
        this.handleError(result, cachePath, {
          path: urlPath,
          tag,
          statusCode: redirectResult,
          summary: 'Redirected',
          parent,
        });
      }

      return redirectResult;
    }

    // if the content is not HTML, we don't need to scan it
    const contentType = res.headers['Content-Type'];
    if (contentType === null || !contentType.startsWith('text/html')) {
      return 200;
    }

    // will contain the ... in <body>...</body>
    const bodyContent = HTML_BODY_REGEX.exec(res.content)?.[1];
    if (bodyContent === undefined) {
      this.handleError(result, cachePath, {
        path: urlPath,
        tag,
        statusCode: res.statusCode,
        summary: 'No <body>',
        parent,
      });

      return res.statusCode;
    }

    await this.detectUrls(bodyContent, urlPath, async (url, elTag) => {
      result.scannedUrls[cachePath] = 'OK';
      if (url.hostname !== 'internal') {
        return;
      }

      await this.scanPath(result, url.pathname, elTag, urlPath);
    });

    return 200;
  }

  /**
   * @returns {Promise<UrlCrawlResult>}
   */
  async go() {
    const result = new UrlCrawlResult();

    // initiate the scan
    await this.scanPath(result, '/', 'root');

    return result;
  }

  /**
   * Detect URLs in a HTML string and call onUrl for each one
   *
   * @param {string} html The HTML to search for URLs
   * @param {string} pageUrl The URL of the page that contains the HTML
   * @param {(url: URL, elTag: string) => void} onUrl A callback that is called for each URL found
   */
  async detectUrls(html, pageUrl, onUrl) {
    HTML_HREF_ELEMENT_REGEX.lastIndex = 0;
    // find all <a ...> or <area ...> matches
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const match = HTML_HREF_ELEMENT_REGEX.exec(html);

      if (match === null) {
        break;
      }

      // find the href attribute
      HTML_HREF_ATTRIBUTE_REGEX.lastIndex = 0;
      const hrefMatch = HTML_HREF_ATTRIBUTE_REGEX.exec(match[0]);
      if (hrefMatch === null) {
        continue;
      }

      let url = hrefMatch[1];
      // to cheaply support quote attributes, we can convert it using JSON.parse
      if (url.charAt(0) === '"') {
        try {
          url = JSON.parse(
            url
              .replaceAll('\t', '\\t')
              .replaceAll('\r', '\\r')
              .replaceAll('\n', '\\n')
              .replaceAll('\f', '\\f')
              .replaceAll('\b', '\\b')
          );
        } catch (e) {
          this.debug('Failed to parse attribute value', url, e);

          continue;
        }
      }

      const parsedUrl = new URL(url, `http://internal${pageUrl ?? ''}`);

      await onUrl(parsedUrl, match[1]);
    }
  }
}

(async () => {
  const urlCrawlResult = await new UrlCrawl({
    handlers,
    shouldDisableDuplicateUrls: true,
    shouldNormalizeTrailingSlash: true,
    onErrorOutput: error => {
      return `${chalk[error.statusCode === 200 ? 'green' : 'red'].bold(
        `${error.statusCode} ${error.summary}`
      )} ${error.tag}[href="${chalk.red(error.path)}"] @ ${error.parent}`;
    },
  }).go();

  urlCrawlResult.summaryToConsole();
})();
