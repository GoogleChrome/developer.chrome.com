require('dotenv').config();
const { createClient } = require("@sanity/client");

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-04-12',
  useCdn: false,
  token: process.env.SANITY_READ_TOKEN,
})

module.exports = sanityClient;