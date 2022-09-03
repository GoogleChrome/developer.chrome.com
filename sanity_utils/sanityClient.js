require('dotenv').config();
const client = require('@sanity/client');

const {sanity} = require('../sanity-config');

// @ts-ignore
module.exports = client({
  ...sanity,
  apiVersion: '2022-08-30',
  useCdn: !process.env.SANITY_READ_TOKEN,
  token: process.env.SANITY_READ_TOKEN,
});
