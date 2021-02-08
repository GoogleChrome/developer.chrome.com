const test = require('ava');
const {html} = require('common-tags');
const cheerio = require('cheerio');

const {Video} = require('../../../site/_shortcodes/Video');

test('Video shortcode generates video html', t => {
  const path = 'video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mp4';
  const parsed = cheerio.load(Video({src: path}));
  const expected = cheerio.load(
    html`
      <video controls>
        <source
          src="https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mp4"
          type="video/mp4"
        />
      </video>
    `
  );

  t.deepEqual(parsed('video').html().trim(), expected('video').html().trim());
});

test('video shortcode generates multiple sources when provided', t => {
  const paths = [
    'video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mp4',
    'video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mov',
    'video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.webm',
  ];
  const parsed = cheerio.load(Video({src: paths}));
  const expected = cheerio.load(
    html`
      <video controls>
        <source
          src="https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mp4"
          type="video/mp4"
        />
        <source
          src="https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.mov"
          type="video/quicktime"
        />
        <source
          src="https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/video/tcFciHGuF3MxnTr1y5ue01OGLBn2/1601081394086.webm"
          type="video/webm"
        />
      </video>
    `
  );

  // This pulls out the child elements of the video element (as it has whitespace differences).
  const actualNodes = Array.from(parsed('video').children()).map(x =>
    cheerio.html(x)
  );
  const expectedNodes = Array.from(expected('video').children()).map(x =>
    cheerio.html(x)
  );
  t.deepEqual(actualNodes, expectedNodes);
});
