/**
 * Returns a formatted date string.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * for a list of options.
 * @param {Date|string} date
 * @param {string} [locale="en"]
 * @param {object} [opts]
 * @returns {string}
 */
const formatDate = (date, locale = 'en', opts = {}) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // IMPORTANT: Before version 13.0.0, only the locale data for en-US is
  // available in Node. It will always silently fall back to en-US.
  // You must be using Node 13+ to get full locale support.
  return new Intl.DateTimeFormat(locale, opts).format(date);
};

/**
 * Returns a date string formatted like "Monday, July 26, 2021".
 * @param {Date|string} date
 * @param {string} [locale="en"]
 * @param {object} [opts]
 * @returns {string}
 */
const formatDateLong = (date, locale = 'en', opts = {}) => {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
    ...opts,
  };

  return formatDate(date, locale, options);
};

/**
 * Returns a date string formated like "July 26, 2021".
 * @param {Date|string} date
 * @param {string} [locale="en"]
 * @param {object} [opts]
 * @returns {string}
 */
const formatDateShort = (date, locale = 'en', opts = {}) => {
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
    ...opts,
  };

  return formatDate(date, locale, options);
};

/**
 * Returns a date string formatted like "2021-12-31".
 * @param {Date} date
 * @returns {string}
 */
const formatDateNumeric = date => {
  return date.toISOString().split('T')[0];
};

module.exports = {
  formatDate,
  formatDateLong,
  formatDateShort,
  formatDateNumeric,
};
