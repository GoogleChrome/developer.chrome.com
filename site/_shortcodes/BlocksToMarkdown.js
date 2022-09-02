/*
 * Copyright 2021 Google LLC
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

const toMarkdown = require('@sanity/block-content-to-markdown')
const client = require('../../sanity_utils/sanityClient.js');
const baseSerializers = require('../../sanity_utils/serializers')

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

module.exports = async function (doc) {
  if (!doc?.body) {
    return ''
  }

  const out = await toMarkdown(doc.body, {
    serializers,
    ...client.config()
  })

  return out
};
