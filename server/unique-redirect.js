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

const fs = require('fs');
const {matchOutput} = require('../site/_transforms/unique-page-resolver');
const readdirp = require('readdirp');
const path = require('path');

// Included for types only.
// eslint-disable-next-line no-unused-vars
const express = require('express');

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
 * @param {string} p
 * @return {Generator<string, void, void>}
 */
const iterateDirs = function* (p) {
  for (;;) {
    const update = path.dirname(p);
    if (update === p) {
      return;
    }
    yield update;
    p = update;
  }
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
      return previous;
    }
    previous = p;
    p = update;
  }
};

async function buildHandler() {
  if (path.sep !== '/') {
    throw new Error('cannot build unique redir handler on Windows');
  }

  const options = {fileFilter: 'index.html', type: 'files'};
  const results = await readdirp.promise('dist/', options);
  const pathsOnly = results.map(({path: p}) => {
    if (!p.endsWith('/index.html')) {
      throw new Error(`got unexpected file: ${p}`);
    }
    return p.substr(0, p.length - '/index.html'.length);
  });

  // for each:
  //   find highest path we can attach this basename to
  //   if we collide with something else, move _both_ under their subfolder
  //   this leaves a tombstone which means "never place here" (empty array?)

  /**
   * @type {{[root: string]: {[basename: string]: url}}}
   */
  const roots = {
    '.': {},
  };

  /**
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
        throw new Error(`unexpected forced insert: ${target}`);
      }
    } else if (key in redirs) {
      throw new Error(`got dup: '${key}' trying for '${dir}'`);
    }
    redirs[key] = target;
  };

  for (const p of pathsOnly) {
    /** @type {string} */
    let previous;

    const key = simplifySegment(path.basename(p));

    restart: for (;;) {
      previous = path.dirname(p);

      for (const dir of iterateDirs(p)) {
        const check = roots[dir] ?? {};
        if (!(key in check)) {
          previous = dir;
          continue;
        }

        const other = check[key];
        if (other === '') {
          // This is a tombstone: many things have collided here. Do nothing with this.
          break;
        }

        // We collided with something that already exists here. Move _that_ entry into its child
        // dierctory, mark its position with a tombstone, and then restart inserting the original
        // iteration as we might need to move this several times.
        const childDir = leftMostDir(path.relative(dir, other));
        const insertInto = path.join(dir, childDir);
        const childKey = simplifySegment(path.basename(other));
        insertRoot(insertInto, other, childKey);

        check[key] = '';
        continue restart;
      }
      break;
    }

    let force = false;
    if (previous === path.dirname(p)) {
      force = true;
    }
    insertRoot(previous, p, key, force);
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
    console.warn(root, '=>', redirsAtRoot);
    if (redirsAtRoot === 1) {
      console.info(redirs);
    }
  }
}

/**
 * Builds HTTP middleware that serves redirects for a unique-redirect.json
 * configuration file.
 *
 * @param {string[]=} staticPaths to check if content exists
 * @param {number=} code to use
 * @return {express.RequestHandler}
 */
function buildUniqueRedirectHandler(staticPaths, code = 301) {
  /** @type {{[right: string]: url}} */
  let raw;

  buildHandler().catch(err => console.error('failed test', err));

  try {
    raw = JSON.parse(fs.readFileSync('dist/unique-redirect.json'));
  } catch (e) {
    console.warn('could not load unique-redirect:', e);
    return (req, res, next) => next();
  }

  return (req, res, next) => {
    let match = matchOutput(req.url, raw);
    if (match) {
      // TODO(samthor): "match" always starts with "en/", remove for now.
      if (match.startsWith('en/')) {
        match = match.substr('en/'.length);
      }
      match = `/${match}`;
      return res.redirect(code, match);
    }
    return next();
  };
}

module.exports = {
  buildUniqueRedirectHandler,
};
