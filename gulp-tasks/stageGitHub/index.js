const {determineDeploymentType} = require('./determineDeploymentType');
const {buildStaticSite} = require('./buildStaticSite');
const {buildAnnouncementComment} = require('./buildAnnouncementComment');

module.exports = {
  determineDeploymentType,
  buildStaticSite,
  buildAnnouncementComment,
};
