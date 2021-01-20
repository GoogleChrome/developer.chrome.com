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
  return base;
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

    console.info('>>>>', p);
    const key = simplifySegment(path.basename(p));
    //    console.warn('adding', p, 'basename', basename);

    restart: for (;;) {
      previous = path.dirname(p);
      console.warn('ITER');

      for (const dir of iterateDirs(p)) {
        console.debug('...', dir);
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

        const childDir = leftMostDir(path.relative(dir, other));
        const insertInto = path.join(dir, childDir);
        check[key] = '';

        const childKey = simplifySegment(path.basename(insertInto));
        insertRoot(insertInto, other, childKey);
        continue restart;
      }
      break;
    }

    let force = false;
    if (previous === path.dirname(p)) {
      force = true;
    }
    console.warn('inserting into', previous, 'force', force);
    insertRoot(previous, p, key, force);
  }

  for (const root of Object.keys(roots)) {
    const redirs = roots[root];

    for (const key of Object.keys(redirs)) {
      if (redirs[key] === '') {
        delete redirs[key];
      }
    }

    if (Object.keys(redirs).length === 0) {
      delete roots[root];
    }
  }

  console.warn('got all', roots);
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
