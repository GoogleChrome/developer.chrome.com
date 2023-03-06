const {announceDeploymentStart} = require('./announceDeploymentStart');
const {determineDeploymentType} = require('./determineDeploymentType');
const {buildStaticSite} = require('./buildStaticSite');
const {announceDeploymentFinished} = require('./announceDeploymentFinished');
const {cleanUpGoogleCloud} = require('./cleanUpGoogleCloud');

module.exports = {
  announceDeploymentStart,
  determineDeploymentType,
  buildStaticSite,
  announceDeploymentFinished,
  cleanUpGoogleCloud,
};
