const yaml = require('require-yml');
const path = require('path');
const {sectionify} = require('../../_functions/sectionify');
let sections = yaml(path.join(__dirname, '../../_data/docs/extensions.yml'));
sections = sectionify(sections, '/docs/extensions');

module.exports = {
  eleventyComputed: {sections},
};
