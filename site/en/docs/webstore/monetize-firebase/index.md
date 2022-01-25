---
layout: "layouts/doc-post.njk"
title: Monetize your extension with Firebase and Stripe
date: 2021-12-20
# updated: 2021-07-28
description: >
  Step-by-step instructions on how to... 
---


## Overview

- MV3 only supports firebase password based auth.
- This tutorial demonstrates how to create an account and setup payments in your Webapp and allow users to log in to their account in the extension's popup page.

## Prerequisites

To receive payments and manage user accounts, you need to set up a Stripe account and configure a Firebase project.

{% Details %}
{% DetailsSummary %}
### Set up a Stripe account
{% endDetailsSummary %}

1. Go to the [Stripe dashboard][stripe-dashboard].
2. Create a Stripe account.
3. Verify your email.
4. Enable test mode.
5. Copy the test Publishable and Secret API keys.

<!-- TODO Screenshot here -->

{% Aside %}

For additional guidance in customizing and activating your Stripe account, see [Getting started with Stripe][stripe-get-started].

{% endAside %}

{% endDetails %}

{% Details %}
{% DetailsSummary %}

### Configure a Firebase project

{% endDetailsSummary %}

In the [Firebase console][firebase-console], click **Add project**, and name your Firebase project.

**Choose your authentication provider.**

1. Click **Authentication** in the left panel.
1. Click the **Sign-in method** tab.
1. Enable **Email/Password** sign-in providers.
<!-- Screenshot? -->
**Create a Firestore Database.**

1. Click **Firestore Database** in the left panel.
1. Click **Create database**.
1. Select **Start in production mode**.
1. Set the **Cloud Firestore location** > **Done**.
<!-- Screenshot? -->

**Upgrade billing plan**

1. At the end of the left panel, choose **Upgrade**.
1. Select **Blaze plan** (Pay as you go).
1. Confirm purchase.

<!-- TODO Screenshot? -->

{% endDetails %}

## Create your web app

To customize and deploy your own version of the [open-source
cloud-functions-stripe-sample.web.app][firebase-stripe-web-app], follow these steps.

{% Aside %}

These instructions are based on Firebase's "[Process payments with
Firebase][payments-firebase-usecase]" documentation. If you encounter any issues with this guide,
you can report a bug on our [GitHub][developer-chrome-github] and consult Firebase's official
documentation for assistance.

{% endAside %}

{% Details %}
{% DetailsSummary %}
### Set up your project
{% endDetailsSummary %}

First, you need to download the [source code][firebase-stripe-github-webapp] from Github. To
use Firebase CLI and configure your project, run the following commands in the terminal:

1. Go to the folder where you downloaded the project.
2. To Install Firebase CLI run: `npm install -g firebase-tools`.
3. To sign in with your Firebase account, run: `firebase login`.
    - Login to your account and return to your project.
4. To add your project run: `firebase use --add`.
    - Choose your project
5. To install local dependencies run: `cd functions; npm install; cd -`

{% endDetails %}

{% Details %}
{% DetailsSummary %}

### Add your Stripe test API keys

{% endDetailsSummary %}

Get your [Stripe test API keys][stripe-api-keys]. Open `/public/javascript/app.js` and paste the Publishable key
in the following line:

`const
STRIPE_PUBLISHABLE_KEY=<YOUR STRIPE PUBLISHABLE KEY>;`.

To add your secret key to the cloud function, run the following command: 

`firebase functions:config:set stripe.secret=<*YOUR_STRIPE_SECRET_KEY*>`.

{% endDetails %}

### Remove Google sign-in

Federated auth providers are not compatible with MV3 extensions. To remove Google auth from this example, delete the following line in `public/javascript/app.js`:

- `firebase.auth.GoogleAuthProvider.PROVIDER_ID,`

{% Details %}
{% DetailsSummary %}
### Deploy your project 
{% endDetailsSummary %}

To deploy your project, run the following command `firebase deploy`. This command performs the following tasks:

- Sends all the files in the public directory to Hosting so that your website is available.
- Sends the code in the functions directory to Cloud Functions for Firebase.
- Sets security rules (`firestore.rules`) on your Firestore database. These
rules only allow users to read and write their own payments and payment methods.

{% endDetails %}

{% Details %}
{% DetailsSummary %}
### Test the sample app
{% endDetailsSummary %}

Go to your payments app's URL at _your-firebase-project-id.web.app_ and verify that the following features work: 

* Sign in with your Google account or email.
* Add a [Stripe test card][stripe-test-card].
* Select one of your cards.
* Sign out when you are done.

<!-- TODO: Screenshot -->

To view processed payments, follow these steps:

* Open your Firebase project in the [Firebase dashboard][firebase-console].
* Go to Firestore **Database** > **Data**.
* Click on `stripe_customers`.
* Check the list of users and their transactions.

{% endDetails %}

Now that you have created and configured your web app, you are ready to build your extension.

{% Aside %}

For a more advanced Stripe/Firebase integration in your web app, see the Firebase Stripe Extension [codelab tutorial][codelab-stripe-firebase-extension].

{% endAside %}

## Create extension files

Begin by creating a directory and the following starter files:

**manifest.json**

Create a file called `manifest.json` and include the following code:

```json
{
  "name": "Stripe Firebase Extension",
  "version": "1.0",
  "manifest_version": 3,
  "description": "Example of how to support Stripe payment and Firebase accounts",
  "action": {
    "default_popup": "popup.html"
  },
}
```

**popup.html**

Create a file called `popup.html` and include the following code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Firebase Persistent Auth Example</title>
  </head>
  <body>
    <h1 id="authState">Checking auth state...</h1>
    <input type="email" id="email" placeholder="Email" />
    <input type="password" id="password" placeholder="Password" />
    <button id="signIn">Sign In</button>
    <button id="signOut">Sign Out</button>
    <p>Not registered? <a href="https://payments-with-firebase-example.web.app/" target="_blank">Create an account</a></p>
    <script src="popup.js" type="module"></script>
  </body>
</html>
```

Replace `https://payments-with-firebase-example.web.app/` with your web app's url.

**popup.js**

Create a file called `popup.js` and include the following code:

```js
const email = document.getElementById("email");
const password = document.getElementById("password");
const signin = document.getElementById("signIn");
const signout = document.getElementById("signOut");


```

{% include 'partials/extensions/reusing-prod-extension-id.md' %}

## Add Firebase to your extension

Take the following steps to configure Firebase to your extension:

1. Download the following ESM firebase files:
    - [`firebase-app.js`][esm-firebase-app].
    - [`firebase-auth.js`][esm-firebase-auth].
    - [`firebase-firestore.js`][esm-firebase-firestore].

1. Get your Firebase configuration code:
      1. Select your project in the [Firebase Console][firebase-console].
      2. Go to ⚙️ > **Project Settings**.
      3. In the **Your apps** card, select the nickname of the app.
      4. Copy the `firebaseConfig`.

1. To initialize Firebase add the following code to `popup.js`:

      ```js
      import { initializeApp } from "./firebase-app.js";
      import {
        getAuth,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut,
      } from "./firebase-auth.js";

      import { initializeApp } from "./firebase-app.js";

       ...

       // Your Firebase configuration
      const firebaseConfig = {
        apiKey: "YOUR-FIREBASE-API-KEY",
        authDomain: "YOUR-AUTH-DOMAIN",
        projectId: "YOUR-PROJECT-ID",
        storageBucket: "YOUR-STORAGE-BUCKET",
        messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
        appId: "YOUR-APP-ID",
      };

      initializeApp(firebaseConfig);
      const auth = getAuth();

      ```

Replace the placeholders with the value of each key from your Firebase application.

<!-- Screenshot -->

## Display auth status

Add the following code to `popup.js` to update the popup when the user signs in. The observer [`onAuthStateChanged`][firebase-onauthstatechanged] triggers whenever the user’s sign-in state changes.

``` js
// popup.js
...

  const authState = document.getElementById("authState");
  
  onAuthStateChanged(auth, (user) => {
    authState.innerText = user ? `Signed in as ${user.email}` : "Not signed in";
    signin.style.display = user ? "none" : "block";
    signout.style.display = user ? "block" : "none";
    email.style.display = user ? "none" : "block";
    password.style.display = user ? "none" : "block";

});
```

## Sign in with email and password

Now that the user has created an account in your web app, you can sign them in by passing the user's email address and password to [`signInWithEmailAndPassword`][firebase-auth-email-password]].

```js
//popup.js
...

signIn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(({ user }) => {
      console.log("signed in", user);
    })
    .catch(console.error);
});

```

## Sign user out

Use [`signOut`][firebase-auth-signout] to sign the user out. Add the following code:

```js
//popup.js
...

signout.addEventListener("click", async () => {
  signOut(auth);
});

```

## Try signing in

Load your extension locally and click on the browser icon to open `popup.html`. Click on the
**Create an account** link to take you to the web app. Try signing in with your email and password.

## Accept live payments

Once you’re ready to go live, you'll need to exchange your test keys for your live keys. See the [Stripe docs][stripe-api-keys] to learn more about these keys.

1. Update your Stripe secret config:
`firebase functions:config:set stripe.secret=<YOUR STRIPE LIVE SECRET KEY>`
1. Set your [live publishable key][link] in `/public/javascript/app.js`.
1. Redeploy both Cloud Functions and Hosting for the changes to take effect: `firebase deploy`.

## Additional resources

[esm-firebase-app]: https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js
[esm-firebase-auth]: https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js
[esm-firebase-firestore]: https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js
[externally-connectable]: /docs/extensions/mv3/manifest/externally_connectable/
[firebase-cli]: https://github.com/firebase/firebase-tools#node-package
[firebase-auth-signout]: https://firebase.google.com/docs/reference/js/auth#signout
[firebase-onauthstatechanged]: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onauthstatechanged
[firebase-auth-email-password]: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
[firebase-console]: https://console.firebase.google.com/
[firebase-stripe-github-webapp]: https://github.com/firebase/functions-samples/tree/main/stripe
[identity-api]: /docs/extensions/reference/identity/
[storage-api]: /docs/extensions/reference/storage/
[payments-firebase-usecase]: https://firebase.google.com/docs/use-cases/payments
[stripe-get-started]: https://support.stripe.com/questions/getting-started-with-stripe-create-or-connect-an-account
[stripe-api-keys]: https://dashboard.stripe.com/account/apikeys
[stripe-dashboard]: https://dashboard.stripe.com/register  
[stripe-test-card]: https://stripe.com/docs/testing#cards
[firebase-stripe-web-app]: https://cloud-functions-stripe-sample.web.app/
[developer-chrome-github]: https://github.com/GoogleChrome/developer.chrome.com
[codelab-stripe-firebase-extension]: https://firebase.google.com/codelabs/stripe-firebase-extensions#0