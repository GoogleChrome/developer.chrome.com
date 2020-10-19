const formatDate = (date, locale = 'en', opts = {}) => {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
    ...opts,
  };

  // IMPORTANT: Before version 13.0.0, only the locale data for en-US is
  // available in Node. It will always silently fall back to en-US.
  // You must be using Node 13+ to get full locale support.
  return new Intl.DateTimeFormat(locale, options).format(date);
};

module.exports = {formatDate};
