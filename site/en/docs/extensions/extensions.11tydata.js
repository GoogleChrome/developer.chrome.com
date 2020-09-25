const {getSections} = require('../../../_functions/sectionify');

module.exports = {
  eleventyComputed: {
    sections: getSections('/docs/extensions'),
  },
};
