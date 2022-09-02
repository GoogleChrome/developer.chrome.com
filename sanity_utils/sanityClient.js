// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV || 'development'}`
// })
const sanityClient = require("@sanity/client");

const { sanity } = require('../sanity-config')

module.exports = sanityClient({
  ...sanity,
  apiVersion: '2022-08-30',
  useCdn: !process.env.SANITY_READ_TOKEN,
  token: process.env.SANITY_READ_TOKEN
});
