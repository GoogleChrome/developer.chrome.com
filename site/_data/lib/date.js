const formatDate = (date, locale = 'en', opts) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  // IMPORTANT: Before version 13.0.0, only the locale data for en-US is
  // available in Node. It will always silently fall back to en-US.
  // You must be using Node 13+ to get full locale support.
  return new Intl.DateTimeFormat(locale, opts).format(date);
};

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

module.exports = {formatDate, formatDateLong, formatDateShort};
