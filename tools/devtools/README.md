# Chrome DevTools script

Use these scripts to speed up DevTools blogging tasks.

## Prerequisites

Depending on the script you want to run, setup your `.env` files with relevant variables. Here is the list of variables.

  ```bash
  DEVTOOLS_VERSION="108" # Replace with a DevTools version.
  DEVTOOLS_TRANSLATE_DUE="Oct-27" # Replace with a translation due date in MMM-DD format.


  # Optional, Github token to generate translation issue automatically. 
  # See https://github.com/settings/tokens/new?scopes=repo to learn how to generate one.

  # GITHUB_TOKEN="your_auth_token"

  # Optional, the translator GitHub user handlers, without @.
  # If exist, the script will use these handlers to populate the "translator" fields when generating translation GitHub issues.

  # DEVTOOLS_TRANSLATOR_ES="jecfish"
  # DEVTOOLS_TRANSLATOR_JA="jecfish"
  # DEVTOOLS_TRANSLATOR_KO="jecfish"
  # DEVTOOLS_TRANSLATOR_PT="jecfish"
  # DEVTOOLS_TRANSLATOR_RU="jecfish"
  # DEVTOOLS_TRANSLATOR_ZH="jecfish"

  # Optional, the banner image urls.
  # If exist, the script will use these values to update the "hero" frontmatter data in each blog post.

  # DEVTOOLS_IMAGE_EN="image/file_name.svg"
  # DEVTOOLS_IMAGE_ES="image/file_name.svg"
  # DEVTOOLS_IMAGE_JA="image/file_name.svg"
  # DEVTOOLS_IMAGE_KO="image/file_name.svg"
  # DEVTOOLS_IMAGE_PT="image/file_name.svg"
  # DEVTOOLS_IMAGE_RU="image/file_name.svg"
  # DEVTOOLS_IMAGE_ZH="image/file_name.svg"

  ```

## Run the scripts

Type `node ./tools/devtools/replace_with_the_script_name.mjs` to run any scripts. 


## Script to generate What's New in DevTools blog

Run these script in sequence.

1. [Optional] Generate WNDT banner images, upload them to web.dev, extract the file names and populate `.env` file with WNDT banner images. (See next section for details) 
1. Generate an English WNDT blog post.
    ```bash
    node ./tools/devtools/wndt-blog-bootstrap.mjs
    ```
1. Write your English WNDT blog post. Please write your content between `<!-- $contentStart -->` and `<!-- $contentEnd -->`.
1. Generate translation WNDT blog posts. Optional prompt to generate GitHub issues.
    ```bash
    node ./tools/devtools/wndt-translation-bootstrap.mjs
    ```
1. Generate blog post outlines for all supported languages.
    ```bash
    node ./tools/devtools/wndt-outline-bootstrap.mjs
    ```
1. Submit your PR!


# Script to generate WNDT banner image

The end goal is to upload WNDT images to web.dev and populate the `.env` file with `DEVTOOLS_IMAGE_[lang]="image/file_name.svg"`.

1. Generate banner images - 2 options here. You can use Figma template to generate PNGs or use the following script to generate SVGs, and find them in `./tools/devtools/_temp`.
    ```bash
    node ./tools/devtools/wndt-banner-bootstrap.mjs
    ```
1. Manually upload the images to web.dev. (TODO: automate this) 
1. In web.dev, open DevTools and execute the following script to extract image urls for `.env`. You can execute it in the Console or save it as [Java Snippet](https://developer.chrome.com/docs/devtools/javascript/sources/#snippets).
    ```js
    const imgList = $$('gcs-uploaded')
        .map(x => { 
            const lang = $('.mat-subheader',x).innerText
                .match(/(?<=(new-in-devtools-banner-|wndt_))(.+?)(?=.(svg|png))/gm)[0];
            const img = $('code', x).innerText
                .match(/(?<=src=")(.+?)(?=")/gm)[0];
            const txt = `DEVTOOLS_IMAGE_${lang.toUpperCase()}="${img}"`

            return { lang, img, txt }
        });

    const imgsTxt = imgList.map(x => x.txt).join("\n");

    console.log(imgList);
    console.log(imgsTxt);

    copy(imgsTxt);
    console.log('Copied the images text to clipboard!');
    ```
1. Paste the image urls in `.env`.