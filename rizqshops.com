Skip to content
npm Docs
Packages and modulesContributingCreating a package.json file
Creating a package.json file
You can add a package.json file to your package to make it easy for others to manage and install. Packages published to the registry must contain a package.json file.

A package.json file:

lists the packages your project depends on
specifies versions of a package that your project can use using semantic versioning rules
makes your build reproducible, and therefore easier to share with other developers
Note: To make your package easier to find on the npm website, we recommend including a custom description in your package.json file.

package.json fields
Required name and version fields
A package.json file must contain "name" and "version" fields.

The "name" field contains your package's name, and must be lowercase and one word, and may contain hyphens and underscores.

The "version" field must be in the form x.x.x and follow the semantic versioning guidelines.

Author field
If you want to include package author information in "author" field, use the following format (email and website are both optional):

Your Name <email@example.com> (http://example.com)
Example
{
  "name": "my-awesome-package",
  "version": "1.0.0",
  "author": "Your Name <email@example.com>"
}
Creating a new package.json file
You can create a package.json file by running a CLI questionnaire or creating a default package.json file.

Running a CLI questionnaire
To create a package.json file with values that you supply, use the npm init command.

On the command line, navigate to the root directory of your package.

cd /path/to/package
Run the following command:

npm init
Answer the questions in the command line questionnaire.

Customizing the package.json questionnaire
If you expect to create many package.json files, you can customize the questions asked and fields created during the init process so all the package.json files contain a standard set of information.

In your home directory, create a file called .npm-init.js.

To add custom questions, using a text editor, add questions with the prompt function:

module.exports = prompt("what's your favorite flavor of ice cream, buddy?", "I LIKE THEM ALL");
To add custom fields, using a text editor, add desired fields to the .npm-init.js file:

module.exports = {
  customField: 'Example custom field',
  otherCustomField: 'This example field is really cool'
}
To learn more about creating advanced npm init customizations, see the init-package-json GitHub repository.

Creating a default package.json file
To create a default package.json using information extracted from the current directory, use the npm init command with the --yes or -y flag. For a list of default values, see "Default values extracted from the current directory".

On the command line, navigate to the root directory of your package.

cd /path/to/package
Run the following command:

npm init --yes
Example
> npm init --yes
Wrote to /home/monatheoctocat/my_package/package.json:

{
  "name": "my_package",
  "description": "",
  "version": "1.0.0",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/monatheoctocat/my_package.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/monatheoctocat/my_package/issues"
  },
  "homepage": "https://github.com/monatheoctocat/my_package"
}
Default values extracted from the current directory
name: the current directory name
version: always 1.0.0
description: info from the README, or an empty string ""
scripts: by default creates an empty test script
keywords: empty
author: empty
license: ISC
bugs: information from the current directory, if present
homepage: information from the current directory, if present
Setting config options for the init command
You can set default config options for the init command. For example, to set the default author email, author name, and license, on the command line, run the following commands:

> npm set init-author-email "example-user@example.com"
> npm set init-author-name "example_user"
> npm set init-license "MIT"
Edit this page on GitHub
5 contributors
lukekarrys
20shivangi
BlizZard-bot
lgarron
ethomson
Last edited by lukekarrys on October 23, 2023
Navigated to Creating a package.json file
#Rizqshops
rizqshops@googlegroups.com
rizqshops.com
