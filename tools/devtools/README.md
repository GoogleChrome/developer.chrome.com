# Chrome DevTools script

Use these scripts to speed up DevTools blogging tasks.

## Prerequisites

Depending on the script you want to run, setup your `.env` files with relevant variables. Here is the list of variables.

  ```bash
  # Generate one, see https://github.com/settings/tokens/new?scopes=repo.
  GITHUB_TOKEN="your_auth_token"

  DEVTOOLS_VERSION="108" # Replace with a DevTools version.
  DEVTOOLS_TRANSLATE_DUE="Oct-27" # Replace with a translation due date in MMM-DD format.

  # Optional, the translator GitHub user handlers, without @.
  # If exist, the script will use these handlers to populate the "translator" fields when generating translation GitHub issues.
  # You can update the field manually in each GH issue later.
  DEVTOOLS_TRANSLATOR_ES="jecfish"
  DEVTOOLS_TRANSLATOR_JA="jecfish"
  DEVTOOLS_TRANSLATOR_KO="jecfish"
  DEVTOOLS_TRANSLATOR_PT="jecfish"
  DEVTOOLS_TRANSLATOR_RU="jecfish"
  DEVTOOLS_TRANSLATOR_ZH="jecfish"

  # Optional, the banner image urls.
  # If exist, the script will use these values to update the "hero" frontmatter data.
  # You can update the field manually in each blog post later.
  DEVTOOLS_IMAGE_EN="image/file_name.svg"
  DEVTOOLS_IMAGE_ES="image/file_name.svg"
  DEVTOOLS_IMAGE_JA="image/file_name.svg"
  DEVTOOLS_IMAGE_KO="image/file_name.svg"
  DEVTOOLS_IMAGE_PT="image/file_name.svg"
  DEVTOOLS_IMAGE_RU="image/file_name.svg"
  DEVTOOLS_IMAGE_ZH="image/file_name.svg"

  ```

## Run the scripts

Type `node ./tools/devtools/replace_with_the_script_name.mjs` to run any scripts. 


## Script to generate What's New in DevTools blog

Run these script in sequence.

1. Generate WNDT banner images in `./tools/devtools/_temp` folder.
  ```bash
  node ./tools/devtools/wndt-banner-bootstrap.mjs
  ```
2. [Optional] Follow the instructions in `./tools/devtools/templates/new-in-devtools-image-snippet.md` to process images.
3. Generate an English WNDT blog post.
  ```bash
  node ./tools/devtools/wndt-blog-bootstrap.mjs
  ```
4. Write your English WNDT blog post. Please write your content between `<!-- $contentStart -->` and `<!-- $contentEnd -->`.
5. Generate translation WNDT blog posts.
  ```bash
  node ./tools/devtools/wndt-translation-bootstrap.mjs
  ```
6. Generate blog post outlines for all supported languages.
  ```bash
  node ./tools/devtools/wndt-outline-bootstrap.mjs
  ```
7. Submit your PR!
