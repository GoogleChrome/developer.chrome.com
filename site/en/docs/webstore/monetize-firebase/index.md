---
layout: "layouts/doc-post.njk"
title: Monetize your extension with Firebase and Stripe
date: 2021-12-20
# updated: 2021-07-28
description: >
 How to use Firebase and Stripe to offer in-app payments.
subhead: Start monetizing your extension by following these steps.
---


## Overview

There are many ways to manage users and monetize your Chrome extension. This tutorial will use
Firebase to manage users and Stripe to process payments. 
 
Firebase Authentication does not support [popup operations][firebase-auth-chrome-extension] for Manifest V3 extensions; meaning, federated identity providers like Google, Facebook and Twitter, are not compatible. However, you
can authenticate users using their [email addresses and password][firebase-email-password].
 
By the end of this tutorial, your users will be able to do the following:
- Create an account and process payments in your web app.
- Allow users to sign in using their email and password in the extension popup.
- Allow users to sign out of their account in the popup.
- Display the paid status of the user in the popup.
 
This guide does not describe how to do the following:
- Process payments directly in the extension popup.
- Advanced uses of Stripe.


## Prerequisites

To receive payments and manage user accounts, you first need to set up a Stripe account and
configure a Firebase project. The following sections walk through this process.

{% Details %}
{% DetailsSummary %}
### Set up a Stripe account
{% endDetailsSummary %}

1. Go to the [Stripe dashboard][stripe-dashboard].
2. Create a Stripe account, if necessary.
3. Verify your email.
4. (Optional) Ensure [test mode](https://collectforstripe.com/features/test-mode) is enabled.
5. Note the test Publishable and Secret API keys.

<!-- TODO Screenshot here -->

{% Aside %}

For additional guidance in customizing and activating your Stripe account, see [Getting started with
Stripe][stripe-get-started].

{% endAside %}

{% endDetails %}

{% Details %}
{% DetailsSummary %}

### Configure a Firebase project

{% endDetailsSummary %}

#### Create a new peoject

In the [Firebase console][firebase-console], click **Add project**, and name your Firebase project.

#### Add email authentication

1. Open the **Authentication** section.
1. In the **Sign-in method** tab, enable **Email/Password** sign-in provider.

#### Create a Firestore Database

1. Open the **Firestore Database** section.
1. Click **Create database**.
1. Select **Start in production mode**.
1. Set the **Cloud Firestore location**
1. Click **Done** to save the changes.
<!-- Screenshot? -->

#### Upgrade billing plan

1. At the end of the left panel, choose **Upgrade**.
1. Select **Blaze plan** (Pay as you go).
1. Confirm purchase.

<!-- TODO Screenshot? -->

{% endDetails %}

## Create your web app

You can use a few different Firebase features and Stripe to process payments without
building your own server infrastructure. This example also uses [FirebaseUI][firebase-ui].
To customize and deploy your own version of the
[open-source cloud-functions-stripe-sample.web.app][firebase-stripe-web-app], follow these steps.

{% Aside %}

These instructions are based on Firebase's "[Process payments with
Firebase][payments-firebase-usecase]" documentation. If you encounter any issues with this guide,
you can report a bug on our [GitHub][developer-chrome-github] and consult Firebase's official
documentation for assistance.

{% endAside %}

### Set up your project

First, download the [source code][firebase-stripe-github-webapp] from Github. To
use [Firebase CLI](https://firebase.google.com/docs/cli) and configure your project, run the following commands in the terminal:

1. Go to the folder where you downloaded the project.
1. To Install Firebase CLI run: `npm install -g firebase-tools`.
1. To sign in with your Firebase account, run: `firebase login`.
    - Login to your account and return to your project.
1. To add your project run: `firebase use --add`.
    - Choose your project
5. To install local dependencies run: `cd functions; npm install; cd -`

### Add your Stripe test API keys

Get your [Stripe test API keys][stripe-api-keys]. Open `/public/javascript/app.js` and paste the Publishable key
in the following line:

```js
const STRIPE_PUBLISHABLE_KEY=<YOUR STRIPE PUBLISHABLE KEY>;
```

To add your secret key to the cloud function, run the following command: 

```bash
$ firebase functions:config:set stripe.secret=<*YOUR_STRIPE_SECRET_KEY*>
```

### Remove Google sign-in

Firebase's federated identity providers are not compatible with MV3 extensions. As such, you will need to remove Google sign-in from the sample project by deleting the following line in `public/javascript/app.js`:

```js
firebase.auth.GoogleAuthProvider.PROVIDER_ID,
```

### Deploy your project 

To deploy your project, run the following command `$ firebase deploy`. This command performs the following tasks:

- Sends all the files in the public directory to **Firebase Hosting** so that your website is available.
- Sends the code in the functions directory to **Cloud Functions** for Firebase.
- Sets security rules (`firestore.rules`) on your Firestore database. These
rules only allow users to read and write their own payments and payment methods.

### Test the sample app

Go to your payments app's URL at _your-firebase-project-id.web.app_ and verify that the following features work: 

- Create an account with your email and password.
- Add a [Stripe test card][stripe-test-card].
- Select one of your cards.
- Choose an amount and process a payment.
- Sign out when you are done.

<!-- TODO: Screenshot -->

To view processed payments in the Firebase console, follow these steps:

* Open your Firebase project in the [Firebase dashboard][firebase-console].
* Go to Firestore **Database** > **Data**.
* Click on `stripe_customers`.
* Check the list of users and their transactions.

Now that you have created and configured your web app, you are ready to build your extension.

{% Aside %}

For a more advanced Stripe/Firebase integration in your web app, check out the following [Firebase Extensions](https://firebase.google.com/docs/extensions):

-  [Stripe subscriptions Firebase extension codelab][codelab-stripe-firebase-extension]
- [Stripe Firestore payments](https://firebase.google.com/products/extensions/stripe-firestore-stripe-payments)

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
  "description": "Stripe Firebase Chrome Extension example",
  "action": {
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js",
    "type": "module"
  },
  "permissions": ["storage"],
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
    <h2 id="paid">Free account</h2>
    <input type="email" id="email" placeholder="Email" />
    <input type="password" id="password" placeholder="Password" />
    <div style="display: block;">
      <button id="sign-in">Sign In</button>
      <button id="sign-out">Sign Out</button>
    </div>
    
    <p>Not registered? <a href="https://payments-with-firebase-example.web.app/" target="_blank">Create an account</a></p>
    <script src="popup.js" type="module"></script>
  </body>
</html>
```

Replace `https://payments-with-firebase-example.web.app/` with your web app's url.

**popup.js**

Create a file called `popup.js` and include the following code:

```js
const authState = document.getElementById("auth-state");
const email = document.getElementById("email");
const password = document.getElementById("password");
const payState = document.getElementById("paid")
const signInButton = document.getElementById("sign-in");
const signOutButton = document.getElementById("sign-out");
```

{% include 'partials/extensions/reusing-prod-extension-id.md' %}

## Add Firebase to your extension

Take the following steps to configure Firebase to your extension:

### Get ESM Firebase files

1. Download the following ESM Firebase files to your project:
    - [`firebase-app.js`][esm-firebase-app].
    - [`firebase-auth.js`][esm-firebase-auth].
    - [`firebase-firestore.js`][esm-firebase-firestore].

    {% Aside %}

    To download the latest version of these Firebase files, check the [Firebase Javascript SDK release notes](https://firebase.google.com/support/release-notes/js) and change the version in the URL to the latest version.

    {% endAside %}

2. Update the import statements at the top of `firebase-auth.js` and `firebase-firestore.js` to reference the local version of `firebase-app.js`. For example, the following `import` points to a local file:

    ```js
    import {
      _getProvider,
      _registerComponent,
      SDK_VERSION,
      registerVersion,
      getApp,
    } from "./firebase-app.js";
    ```
### Add an app to your Firebase project 

1. Select your project in the [Firebase Console][firebase-console].
1. Go to ⚙️ > **Project Settings**.
1. At the end of the **General tab**, create a new web app.
1. Register your app and add Firebase SDK.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/dEGKBRdWOCP70d3qV0lj.png", alt="Add app in the Firebase Project Settings", 
width="600", height="190" %}

### Initialize Firebase

1. Copy your web app's Firebase configuration code `firebaseConfig`.

1. Create a new file named `background.js` and add the following code:

      ```js   
      import { initializeApp } from "./firebase-app.js";
      import {
        getAuth,
        onAuthStateChanged,
        signInWithEmailAndPassword,
        signOut,
      } from "./firebase-auth.js";

      import { collection, query, where, getDocs, getFirestore } from "./firebase-firestore.js"

       // Your Firebase configuration
      const firebaseConfig = {
        apiKey: "YOUR-FIREBASE-API-KEY",
        authDomain: "YOUR-AUTH-DOMAIN",
        projectId: "YOUR-PROJECT-ID",
        storageBucket: "YOUR-STORAGE-BUCKET",
        messagingSenderId: "YOUR-MESSAGING-SENDER-ID",
        appId: "YOUR-APP-ID",
      };

      // Initialize Firebase
      initializeApp(firebaseConfig);
      const auth = getAuth();
      const db = getFirestore();

      ```

Replace the placeholders with the value of each key from your Firebase application.

## Display the sign-in state

Add the following code to `popup.js` to update the user's sign-in state. The observer
[`onAuthStateChanged`][firebase-onauthstatechanged] will trigger whenever this state changes.

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

To sign the user in, pass the user's email address and password to
[`signInWithEmailAndPassword`][firebase-auth-email-password] in the `popup.js` file.

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

Use [`signOut`][firebase-auth-signout] to sign the user out in the `popup.js` file:

```js
//popup.js
...

signout.addEventListener("click", async () => {
  signOut(auth);
});

```

## Try signing in

Now you can test your extension. Load your extension locally and click on the browser icon to open
`popup.html`. Click on the **Create an account** link to take you to the web app. Then, try signing
in with your email and password. After you sign-in, you should see your email displayed. Click the
**Sign out** button to log out.

## Accept live payments

Once you’re ready to go live, you'll need to exchange your test keys for your live keys. See the
[Stripe docs][stripe-api-keys] to learn more about these keys.

1. Update your Stripe secret config:
`firebase functions:config:set stripe.secret=<YOUR STRIPE LIVE SECRET KEY>`
1. Set your [live publishable key][stripe-api-keys] in `/public/javascript/app.js`.
1. Redeploy both Cloud Functions and Hosting for the changes to take effect: `firebase deploy`.

## Additional resources

[esm-firebase-app]: https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js
[esm-firebase-auth]: https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js
[esm-firebase-firestore]: https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js
[externally-connectable]: /docs/extensions/mv3/manifest/externally_connectable/
[firebase-cli]: https://github.com/firebase/firebase-tools#node-package
[firebase-auth-chrome-extension]: https://firebase.google.com/docs/auth/web/google-signin#authenticate_with_firebase_in_a_chrome_extension
[firebase-auth-signout]: https://firebase.google.com/docs/reference/js/auth#signout
[firebase-onauthstatechanged]: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onauthstatechanged
[firebase-auth-email-password]: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
[firebase-email-password]: https://firebase.google.com/docs/auth/web/password-auth
[firebase-console]: https://console.firebase.google.com/
[firebase-ui]: https://firebase.google.com/docs/auth/web/firebaseui
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