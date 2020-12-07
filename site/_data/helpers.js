const {join, resolve} = require('path');
const {
  getLinkActiveState,
  isExternalLink,
  expandSections,
} = require('./lib/links');
const {hashForProd} = require('./lib/hash');
const {findByUrl, findByProjectKey} = require('./lib/find');
const {formatDate, formatDateLong, formatDateShort} = require('./lib/date');
const {buildBreadcrumbs} = require('./lib/breadcrumbs');

module.exports = {
  join,
  resolve,
  getLinkActiveState,
  expandSections,
  isExternalLink,
  hashForProd,
  findByUrl,
  findByProjectKey,
  formatDate,
  formatDateLong,
  formatDateShort,
  buildBreadcrumbs,
};
