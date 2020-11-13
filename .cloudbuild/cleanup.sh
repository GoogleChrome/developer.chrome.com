#!/bin/bash
# Copyright 2020 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Deletes the least recent N versions deployed to App Engine, where those
# versions are not serving any traffic.

set -eu

KEEP=200  # keep 200, App Engine's limit is 1100
COUNT=8   # only delete <X> per time, gcloud is slow
PROJECT=chrome-apps-doc-staging-2020
SERVICE=default

while true; do
  VERSIONS=$(gcloud --project $PROJECT app versions list \
      --service $SERVICE \
      --filter 'traffic_split = 0' \
      --sort-by '~last_deployed_time' \
      --format 'value(version.id)' \
          | tail -n +$KEEP | tail -n $COUNT | paste -sd " " -)

  if [ ${#VERSIONS} -eq 0 ]; then
    echo "Done, no versions to delete."
    exit 0
  fi
  gcloud --project $PROJECT app versions delete --service $SERVICE $VERSIONS -q
done