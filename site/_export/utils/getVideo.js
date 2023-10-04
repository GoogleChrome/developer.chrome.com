const path = require('path');

const {exportFile} = require('./exportFile');
const {getImageFromRemote} = require('./getImage');

const VIDEO_POSTER_PATTERN = /poster="(.*?)"/gm;
const VIDEO_SOURCE_PATTERN = /<source\s+src=(?:'|")(.*?)(?:'|")\s/gm;

async function getAndRewritePathsByPattern(ctx, markdown, pattern, pathPrefix) {
  let exportPath = path.join(ctx.exportPath, ctx.exportName);
  if (pathPrefix) {
    exportPath = path.join(exportPath, pathPrefix);
  }

  // Replace is sync, so we need to keep track of the promises outside
  // of the replace
  const downloads = [];

  // Replace and download poster images
  markdown = markdown.replace(pattern, (match, srcUrl) => {
    // First check if the poster image points to a local file anyway,
    // then just return the match and do nothing - that's the case for patterns
    if (!srcUrl.startsWith('http')) {
      return match;
    }

    const parsedSrcUrl = new URL(srcUrl);
    let assetPath = parsedSrcUrl.pathname;
    assetPath = assetPath.replace('/web-dev-uploads/video/', '');

    downloads.push(
      (async () => {
        const posterImage = await getImageFromRemote(srcUrl);
        await exportFile(ctx, posterImage, path.join(exportPath, assetPath));
      })()
    );

    // Update the poster URL to point to the new location
    return match.replace(srcUrl, `video/${assetPath}`);
  });

  // Await all open downloads and file writes
  await Promise.all(downloads);

  return markdown;
}

async function getAndRewriteVideoAssets(ctx, markdown) {
  markdown = await getAndRewritePathsByPattern(
    ctx,
    markdown,
    VIDEO_POSTER_PATTERN
  );
  markdown = await getAndRewritePathsByPattern(
    ctx,
    markdown,
    VIDEO_SOURCE_PATTERN,
    'video'
  );

  return markdown;
}

module.exports = {getAndRewriteVideoAssets};
