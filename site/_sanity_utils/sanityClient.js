require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})
const sanityClient = require("@sanity/client");

const { sanity } = require('../../sanity-client-config')

/**
 * Set manually. Find configuration in
 * studio/sanity.json or on manage.sanity.io
 */

/*
const sanity = {
  projectId: 'anokeucs',
  dataset: 'eleventy',
  useCdn: true
}
*/

module.exports = sanityClient({...sanity, useCdn: !process.env.SANITY_READ_TOKEN, token: process.env.SANITY_READ_TOKEN});
