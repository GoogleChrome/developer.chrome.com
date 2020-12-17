# Grab the latest commits from the public repo
git remote add public https://github.com/GoogleChrome/developer.chrome.com.git
git fetch public

# Create a test branch and replace its contents with main from the public repo
git checkout -b test-branch
git reset --hard public/main

# Push the test branch to the private repo
git push origin test-branch