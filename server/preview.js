/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const Eleventy = require("@11ty/eleventy");
const fs = require('fs');
const path = require('path');
// TODO: move to top level.
const sanity = require('../sanity_utils/sanityClient.js')

const querySanity = async function (slug) {
  console.log(slug)
  const query = `*[_type == "post" && slug.current == '${slug}']`;
  const result = await sanity.fetch(query);

  console.log(result[0])
  if (result.length == 1) {
    return result[0];
  }

  return result;
};

const toMarkdown = require('@sanity/block-content-to-markdown')
const client = require('../sanity_utils/sanityClient.js');
const baseSerializers = require('../sanity_utils/serializers')

const serializers = {
  types: {
    ...baseSerializers.types,
    code: props => '```' + props.node.language + '\n' + props.node.code + '\n```',
    aside: props =>
      `{% Aside '${props.node.type}' %}` +
      `${toMarkdown(props.node.text)}` +
      `{% endAside %}`
  }
}

const formatBody = async function(body) {
  const out = await toMarkdown(body, {
    serializers,
    ...client.config()
  });
  return out;
};


/**
 * @type {express.RequestHandler}
 */
const previewHandler = async (req, res, next) => {

  // TODO: Add locales support. Defaults to 'en' at the moment.
  // TODO: add noindex / norobots header
  // TODO: Add /preview template to eleventyignore.
  // TODO: right now it supports only 1 content type.
  const inputPath = path.join('./site/en/', 'preview', 'index.md');

  // TODO: support full path and not only slug.
  const slug = req.params[0].split('/').pop();

  const post = await querySanity(slug);
  if (!post || !post?.body) {
    next();
    return;
  }

  const body =  await formatBody(post.body);

  let elev = new Eleventy(inputPath, 'dist', {
    configPath: ".eleventy.js",
    inputDir: './site',
    config: function(eleventyConfig) {
      eleventyConfig.addGlobalData('isPreview', true)
      eleventyConfig.addGlobalData('previewSource', 'sanity')
      eleventyConfig.addGlobalData('portableText', post)
      eleventyConfig.addGlobalData('content', body)
    },
  });
  const out = await elev.toJSON();

  // Preview for this path was not found.
  if (!out.length || !out[0]?.content) {
    next();
    return;
  }

  res.send(out[0].content)
};

module.exports = {previewHandler};
