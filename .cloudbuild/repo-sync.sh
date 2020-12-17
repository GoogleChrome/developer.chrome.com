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
#
# This does not specify `--project` as it's part of the environment.
# However, it forwards all command-line arguments to gcloud for both listing
# and deletion, useful for test: run with `./cleanup.sh --project foo`.

set -eu

git clone https://github.com/GoogleChrome/developer.chrome.com.git
cd developer.chrome.com
git remote add private https://github.com/GoogleChrome/dcc-private.git
git push private main -f
