# developer.chrome.com

developer.chrome.com is the ultimate resource for developers of all backgrounds
to learn about what's new in Chrome!

## Found a bug? 👷‍♀️

Thanks for letting us know! Please [file an issue](https://github.com/GoogleChrome/developer.chrome.com/issues/new?assignees=&labels=bug&template=bug_report.md&title=) and a team member should reply shortly.

## Authoring content ✍️

Before you start writing take a moment to look over the
[developer.chrome.com handbook](https://developer.chrome.com/docs/handbook) and
familiarize yourself with the process.

## Building the site 🏗

You'll need a recent version of [Node](https://nodejs.org/): v14 (LTS) or higher.
To check your node version run `node -v` in your terminal.

If you don't have node, or if you need to upgrade, we recommend using the [Node
Version Manager (nvm)](https://github.com/nvm-sh/nvm).

### Clone the repo

```bash
git clone https://github.com/GoogleChrome/developer.chrome.com.git
```

### Install dependencies

```bash
npm ci
```

### Set up build flags

Building the entire site can take a while because it's over a thousand pages.
If you want to _massively_ speed up your build times, we suggest setting some
build flags to ignore certain sections.

- Create a `.env` file at the root of your project
- Optionally add the following:

```text
# Ignore ALL /docs/
ELEVENTY_IGNORE_DOCS=true

# Only ignore /docs/native-client/
ELEVENTY_IGNORE_NACL=true

# Only ignore /docs/extensions/
ELEVENTY_IGNORE_EXTENSIONS=true
```

### Start a local server to preview the site

```bash
npm run dev
```

Open `http://localhost:8080/` to see the site locally. Changes to assets will
rebuild the site. Refresh to see your changes.

## Environments 🌳

To do a production build of the site and start the local server 
run `npm run production && npm start`.

## Staging 🕺

When you send in a pull request it will be automatically staged for you. Keep an
eye out for the netlify bot to comment on the pull request with your unique URL.

(Googlers only) If you would like to stage your _local_ changes to a unique URL,
run the command `npm run stage:personal`. This can be useful if you're not ready
to create a pull request yet, or if you need to stage something private.

☝️ You will need to be a member of our GCP project for this command to work.

## Deploying the site 🚀

### Automatic deploys

The site will build and deploy the master branch automatically every hour,
Mon-Fri. If you've just merged an article then it should go live at the top
of the next hour.
