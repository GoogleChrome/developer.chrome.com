This folder contains the system that deals with external data for developer.chrome.com, that is, data that regularly changes yet is required to publish the site.

- the "data/" folder is used as a working dir (and isn't checked in)

- all scripts inside "build/" are run when `npm run build-external` is run, and a local flag is set

- otherwise, run `npm run sync-external` to retrieve the last known good files stored in Cloud Storage

- running `npm run dev` will automatically pull external data
