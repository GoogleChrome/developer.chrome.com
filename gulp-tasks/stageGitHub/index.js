const {determineDeploymentType} = require('./determineDeploymentType');
const {awaitGoogleCloudBuild} = require('./awaitGoogleCloudBuild');

module.exports = {
  determineDeploymentType,
  awaitGoogleCloudBuild,
};
