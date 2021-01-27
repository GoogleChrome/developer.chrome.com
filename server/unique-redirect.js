/*
 * Copyright 2020 Google LLC
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

const debug = false;

const readdirp = require('readdirp');
const path = require('path');

// Included for types only.
// eslint-disable-next-line no-unused-vars
const express = require('express');

/**
 * Avoid redirecting into these directories. These are checked in-order and must not end with "/".
 *
 * @type {string[]}
 */
const defaultAvoidDirs = [
  '/en/docs/extensions/mv2', // as discussed with team, MV3 takes priority
  '/en/docs/apps',
  '/en/docs/native-client',
];

/**
 * By removing special characters and capitals, we can more easily match 404s.
 *
 * @param {string} base
 * @return {string}
 */
const simplifySegment = base => {
  base = base.toLowerCase();
  base = base.replace(/[^a-z0-9]/g, '');
  return base;
};

/**
 * Iterates through all depths of subdirectories excluding the input. For example, if "/foo/bar/que"
 * was passed, will yield "/foo/bar", "/foo", and "/".
 *
 * @param {string} p
 * @return {Generator<string, void, void>}
 */
const iterateDirs = function* (p) {
  if (!p.startsWith('/')) {
    throw new Error(`expected absolute URL, was: ${p}`);
  }
  for (;;) {
    const update = path.dirname(p);
    if (update === p) {
      return; // stable dir, we can't yield any moer
    }
    yield update;
    p = update;
  }
};

/**
 * @param {string} url
 * @return url stripped of "/index.html" on right
 */
const stripIndexHtml = url => {
  if (url.endsWith('/index.html')) {
    return url.substr(0, url.length - '/index.html'.length);
  }
  return url;
};

/**
 * @param {string} p
 * @return {string} the left-most part of p
 */
const leftMostDir = p => {
  let previous = '';
  for (;;) {
    const update = path.dirname(p);
    if (update === p) {
      return previous; // stable dir (e.g., "." or "/"), return previous
    }
    previous = p;
    p = update;
  }
};

/**
 * @param {string} source
 * @return {string[]}
 */
async function findPaths(source) {
  const options = {fileFilter: 'index.html', type: 'files'};
  const results = await readdirp.promise(source, options);
  return results.map(({path: p}) => '/' + stripIndexHtml(p));
}

/**
 * @param {string} source path to find /index.html files from
 * @param {string[]} avoidDirs to default avoid
 * @return {Promise<(url: string) => string|void>}
 */
async function buildMatcher(source = 'dist/', avoidDirs = defaultAvoidDirs) {
  const paths = await findPaths(source);

  avoidDirs = avoidDirs.map(dir => path.join(dir, '.')); // ensure no trailing slash

  // The broad design of this function is, for each URL found inside dist/:
  //   * find the highest path we can safely attach this basename to
  //   * if we collide with something else, move it under its respective subfolder and try again
  //   * collisions leave a tombstone (empty redirect) which means "never place here"

  /**
   * @type {{[root: string]: {[basename: string]: url}}}
   */
  const roots = {};

  /**
   * Finds a match for the given pathname request.
   *
   * @param {string} url
   * @return {string=}
   */
  const matchUrl = url => {
    const key = simplifySegment(path.basename(url));
    for (const dir of iterateDirs(url)) {
      const redirs = roots[dir] ?? {};
      const match = redirs[key];
      if (match !== undefined) {
        return match;
      }
    }
    return undefined;
  };

  /**
   * Sets up a redirect for a given key within a subdirectory.
   *
   * @param {string} dir real directory to insert at
   * @param {string} unprocessed final target url
   * @param {string} key to use in dir, i.e., simplified version
   * @param {boolean} force whether this file exists _here_ and must win
   */
  const insertRoot = (dir, target, key, force = false) => {
    if (!(dir in roots)) {
      roots[dir] = {};
    }
    const redirs = roots[dir];

    if (force) {
      if (key in redirs && redirs[key] !== '') {
        throw new Error(
          `unexpected forced insert: ${target} (was=${redirs[key]})`
        );
      }
    } else if (key in redirs) {
      throw new Error(`got dup: '${key}' trying for '${dir}'`);
    }
    redirs[key] = target;
  };

  for (const p of paths) {
    /** @type {string} */
    let scope;

    const key = simplifySegment(path.basename(p));

    restart: for (;;) {
      scope = path.dirname(p);

      for (const dir of iterateDirs(p)) {
        const check = roots[dir] ?? {};
        if (!(key in check)) {
          scope = dir;

          // If we're in an avoided directory, then don't continue above that directory.
          if (avoidDirs.includes(scope)) {
            break;
          }
          continue;
        }

        const other = check[key];
        if (other === '') {
          // This is a tombstone: many things have collided here. Do nothing with this.
          break;
        }

        // We collided with something that already exists here. Move _that_ entry into its child
        // directory, mark its position with a tombstone, and then restart inserting the original
        // iteration as we might need to move this several times.
        const childDir = leftMostDir(path.relative(dir, other));
        const insertInto = path.join(dir, childDir);
        if (insertInto === other) {
          break; // nothing we can do: this is a page like /a/foo and there is a /a/b/foo
        }
        const childKey = simplifySegment(path.basename(other));
        insertRoot(insertInto, other, childKey);

        check[key] = '';
        continue restart;
      }
      break;
    }

    let force = false;
    if (scope === path.dirname(p)) {
      force = true;
    }
    insertRoot(scope, p, key, force);
  }

  // Look at all redirs in avoided directories, and move them to the root only if possible. This basically
  // de-priorizes them while still going up as far as we can.
  for (const avoid of avoidDirs) {
    const redirs = roots[avoid] ?? {};

    for (const key in redirs) {
      if (redirs[key] === '') {
        continue; // tombstone is possible here, ignore
      }

      const check = path.join(path.dirname(path.dirname(redirs[key])), key);
      if (matchUrl(check) !== undefined) {
        continue; // we already got a match for 'key' somewhere above us
      }

      // We can hoist this to the top as nothing else has the same name.
      insertRoot('/', redirs[key], key);
      redirs[key] = '';
    }
  }

  // Clean up the redirs collection by removing all empty tombstones. They existed just to help
  // lay out all possible redirects.
  for (const root of Object.keys(roots)) {
    const redirs = roots[root];

    for (const key of Object.keys(redirs)) {
      if (redirs[key] === '') {
        delete redirs[key];
      }
    }

    const redirsAtRoot = Object.keys(redirs).length;
    if (redirsAtRoot === 0) {
      delete roots[root];
      continue;
    }

    // TODO(samthor): Debugging information only.
    debug && console.warn(root, '=>', redirsAtRoot);
  }

  return url => {
    url = stripIndexHtml(url);
    const result = matchUrl(url);
    if (result === url) {
      return undefined; // this should never happen but just for safety
    }
    return result;
  };
}

/**
 * Builds HTTP middleware that serves redirects for content found in dist/.
 *
 * @return {express.RequestHandler}
 */
function buildUniqueRedirectHandler() {
  /** @type {express.RequestHandler} */
  let replacedHandler = (req, res, next) => next();

  // Build the handler async, and once it's ready, insert into the 404 handler path.
  buildMatcher()
    .then(match => {
      /**
       * @type {express.RequestHandler}
       */
      replacedHandler = (req, res, next) => {
        let {url} = req;

        // For now, we only support data in "/en", so check that actual folder for redirects.
        let enPrefixAdded = false;
        if (!url.startsWith('/en/')) {
          url = path.join('/en', url);
          enPrefixAdded = true;
        }

        // If we can't match, continue on to a 404 handler.
        let redirectTo = match(url);
        if (!redirectTo) {
          return next();
        }

        // Awkwardly remove "/en" if we added it to do our check.
        if (enPrefixAdded && redirectTo.startsWith('/en/')) {
          redirectTo = redirectTo.substr('/en'.length);
        }
        return res.redirect(301, redirectTo);
      };
    })
    .catch(err => console.error('failed to build uniqueRedirectHandler', err));

  return (req, res, next) => replacedHandler(req, res, next);
}

module.exports = {
  buildMatcher,
  buildUniqueRedirectHandler,
};
