const {determineDeploymentType} = require('./determineDeploymentType');
const {awaitGoogleCloudBuild} = require('./awaitGoogleCloudBuild');
const {deploy} = require('./deploy');

module.exports = {
  determineDeploymentType,
  awaitGoogleCloudBuild,
  deploy,
};
