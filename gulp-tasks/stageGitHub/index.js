const {determineDeploymentType} = require('./determineDeploymentType');
const {awaitGoogleCloudBuild} = require('./awaitGoogleCloudBuild');
const {buildAnnouncementComment} = require('./buildAnnouncementComment');
const {cleanUpGoogleCloud} = require('./cleanUpGoogleCloud');

module.exports = {
  determineDeploymentType,
  awaitGoogleCloudBuild,
  buildAnnouncementComment,
  cleanUpGoogleCloud,
};
