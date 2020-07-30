/**
 * @fileoverview Helper for hashing content.
 */

const path = require('path');
const crypto = require('crypto');
const fs = require('fs');

const hashLength = 8;

function generateAndValidateHash(c) {
  const hash = c.digest('hex').substr(0, hashLength);
  if (hash.length !== hashLength) {
    throw new TypeError('could not hash content');
  }
  return hash;
}

/**
 * Hashes the passed content.
 *
 * @param {string} contents to hash
 * @return {string}
 */
function hashForContent(contents) {
  const c = crypto.createHash('sha1');
  c.update(contents);
  return generateAndValidateHash(c);
}

/**
 * Hashes the passed files. Requires at least one.
 *
 * @param {string} file base file to hash
 * @param {...string} rest additional files to hash
 */
function hashForFiles(file, ...rest) {
  const files = [file].concat(rest);

  const c = crypto.createHash('sha1');

  for (const file of files) {
    const b = fs.readFileSync(file);
    c.update(b);
  }

  return generateAndValidateHash(c);
}

/**
 * A quick hacky attempt to take a file path (assuming in dist dir) and return
 * a hashed version of the path.
 * @param {string} file
 * @return {string}
 */
function hashAsset(file) {
  try {
    // FIXME(robdodson): This is a hard coded path to the dist directory and it
    // depends on the location of this file. Ideally we should pass this
    // information into this file so it can be more portable.
    const hash = hashForFiles(
      path.join(__dirname, '..', '..', '..', 'dist', file)
    );
    return `${file}?v=${hash}`;
  } catch (err) {
    console.error('Could not find asset at', file);
    return `${file}`;
  }
}

module.exports = {
  hashForContent,
  hashForFiles,
  hashAsset,
};
