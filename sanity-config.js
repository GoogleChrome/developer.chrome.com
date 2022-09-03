module.exports = {
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
  },
};
