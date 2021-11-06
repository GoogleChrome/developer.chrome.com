This folder contains the system that deals with external data for developer.chrome.com, that is, data that regularly changes yet is required to publish the site.

- the "data/" folder is used as a working dir (and isn't checked in)

- all scripts inside "build/" are run when `npm run build-external` is run, and a local flag is set

- otherwise, run `npm run sync-external` to retrieve the last known good files stored in Cloud Storage

- running `npm run dev` will automatically pull external data

## Changes

If you make changes to the build script(s), you should kick off a Cloud Build task to confirm that the output builds and to write it to storage for other users.

```bash
$ gcloud builds submit --config .cloudbuild/external.yaml .
```

You can confirm the contents of the bucket by:

```bash
$ gsutil ls -l gs://external-dcc-data
```

You'll write the data before your PR is committed; that's fine, because the data needs to available immediately when the code is in.
