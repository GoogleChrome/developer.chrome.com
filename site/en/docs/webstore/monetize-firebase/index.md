---
layout: "layouts/doc-post.njk"
title: Monetize your extension with Firebase and Stripe
date: 2022-03-15
description: >
 How to use Firebase and Stripe to offer in-app payments.
---

## Overview {: #intro }

There are many ways to manage users and monetize your Chrome extension. This tutorial will use
Firebase to manage users and Stripe to process payments. 
 
Firebase Authentication does not support [popup operations][firebase-auth-chrome-extension] for
Manifest V3 extensions; meaning, federated identity providers like Google, Facebook and Twitter, are
not compatible. However, you can authenticate users with [email address and
password][firebase-email-password].
 
By the end of this tutorial, your users will be able to do the following:
- Create an account and process payments in your web app.
- Allow users to sign in using their email and password in the extension popup.
- Allow users to sign out of their account in the popup.
- Display the paid status of the user in the popup.
 
This guide does not describe how to do the following:
- Process payments directly in the extension popup.
- Advanced uses of Stripe.

## What you will need {: #prereq }

To receive payments and manage user accounts, you need to set up a Stripe account and configure a
Firebase project. The following sections walk through this process.

{% Details %} {% DetailsSummary %}
### Set up a Stripe account {: #stripe }
{% endDetailsSummary %}

1. Go to the [Stripe dashboard][stripe-dashboard].
2. Create a Stripe account, if necessary.
3. Verify your email.
4. (Optional) Ensure [test mode](https://collectforstripe.com/features/test-mode) is enabled.
5. Note the test Publishable and Secret API keys.

{% Aside %}

For additional guidance in customizing and activating your Stripe account, see [Getting started with
Stripe][stripe-get-started].

{% endAside %}

{% endDetails %}

{% Details %} {% DetailsSummary %}

### Configure a Firebase project {: #firebase-setup }

{% endDetailsSummary %}

#### Create a new project {: #fb-new-project }

In the [Firebase console][firebase-console], click **Add project**, and name your Firebase project.

#### Add email authentication {: #fb-email-auth }

1. Open the **Authentication** section.
1. In the **Sign-in method** tab, enable **Email/Password** sign-in provider.

#### Create a Firestore Database {: #fb-db }

1. Open the **Firestore Database** section.
1. Click **Create database**.
1. Select **Start in production mode**.
1. Set the **Cloud Firestore location**
1. Click **Done** to save the changes.

#### Upgrade billing plan {: #fb-billing }

1. At the end of the left panel, choose **Upgrade**.
1. Select **Blaze plan** (Pay as you go).
1. Confirm purchase.

{% endDetails %}

## Create your web app {: #create-app }

You can use a few different Firebase features and Stripe to process payments without building your
own server infrastructure. This example also uses [FirebaseUI][firebase-ui]. To customize and deploy
your own version of the [Firebase with Stripe Payments example][firebase-stripe-web-app], follow
these steps.

{% Aside %}

These instructions are based on Firebase's "[Process payments with
Firebase][payments-firebase-usecase]" documentation. If you encounter any issues with this guide,
you can report a bug on our [GitHub][developer-chrome-github] and consult Firebase's official
documentation for assistance.

{% endAside %}

### Set up your project {: #fb-cli}

First, download the [source code][firebase-stripe-github-webapp] from Github. To use [Firebase
CLI](https://firebase.google.com/docs/cli) and configure your project, run the following terminal
commands:

1. Go to the folder where you downloaded the project.
1. To Install Firebase CLI run: 
    ```bash
    npm install -g firebase-tools
    ```
1. To sign in with your Firebase account, run: `firebase login`.
    - Login to your account and return to your project.
1. To add your project run: `firebase use --add`.
    - Choose your project

### Add your Stripe test API keys {: #stripe-keys }

Get your [Stripe test API keys][stripe-api-keys]. Open `/public/javascript/app.js` and paste the
Publishable key in the following line:

```js
const STRIPE_PUBLISHABLE_KEY=<YOUR STRIPE PUBLISHABLE KEY>;
```

To add your secret key to the cloud function, run the following command: 

```bash
firebase functions:config:set stripe.secret=<YOUR_STRIPE_SECRET_KEY>
```

### Remove Google sign-in {: #remove-google }

Firebase's federated identity providers are not compatible with MV3 extensions. As such, you will
need to remove Google sign-in from the sample project by deleting the following line in
`public/javascript/app.js`:

```javascript
firebase.auth.GoogleAuthProvider.PROVIDER_ID,
```

### Deploy your project {: #deploy }

To deploy your project, run the following command `$ firebase deploy`. This command performs the
following tasks:

- Sends all the files in the public directory to **Firebase Hosting** so that your website is
  available.
- Sends the code in the functions directory to **Cloud Functions** for Firebase.
- Sets security rules (`firestore.rules`) on your Firestore database. These rules only allow users
to read and write their own payments and payment methods.

### Test the sample app {: #test-web-app}

Go to your payments app's URL at _your-firebase-project-id.web.app_ and verify that the following
features work: 

- Create an account with your email and password.
- Add a [Stripe test card][stripe-test-card].
- Select one of your cards.
- Choose an amount and process a payment.
- Sign out when you are done.

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/8zhppl81GpRUa3BAPiFn.png", 
alt="Web app", width="500", height="612" %}

To view processed payments in the Firebase console, follow these steps:

- Open your Firebase project in the [Firebase dashboard][firebase-console].
- Go to Firestore **Database** > **Data**.
- Click on `stripe_customers`.
- Check the list of users and their transactions.

Now that you have created and configured your web app, you are ready to build your extension.

## Create extension files {: #ext-files}

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
    <title>Firebase Auth Example</title>
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

## Add Firebase to your extension {: #fb-ext}

Take the following steps to configure Firebase in your extension:

### Get ESM Firebase files {: #fb-esm }

Download the following ESM Firebase files to your project:
 - [`firebase-app.js`][esm-firebase-app].
 - [`firebase-auth.js`][esm-firebase-auth].
 - [`firebase-firestore.js`][esm-firebase-firestore].

{% Aside %}

To download the latest version of these Firebase files, check the [Firebase Javascript SDK release
notes](https://firebase.google.com/support/release-notes/js) and change the version in the URL to
the latest version.

{% endAside %}

Update the import statements at the top of `firebase-auth.js` and `firebase-firestore.js` to
reference the local version of `firebase-app.js`. For example, the following `import` points to a
local file:

```javascript/6-7
import {
  _getProvider,
  _registerComponent,
  SDK_VERSION,
  registerVersion,
  getApp,
} from "./firebase-app.js";
```

### Add an app to your Firebase project {: #fb-add-app}

1. Select your project in the [Firebase Console][firebase-console].
1. Go to ⚙️ > **Project Settings**.
1. At the end of the **General tab**, create a new web app.
1. Register your app and add Firebase SDK.
1. Note your web app's Firebase configuration code `firebaseConfig`.


{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/dEGKBRdWOCP70d3qV0lj.png", alt="Add app in the
Firebase Project Settings", width="600", height="190" %}

### Initialize Firebase {: #fb-init}

Create a new file named `background.js` and add the following code:

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
  apiKey: 'YOUR-FIREBASE-API-KEY',
  authDomain: 'YOUR-AUTH-DOMAIN',
  projectId: 'YOUR-PROJECT-ID',
  storageBucket: 'YOUR-STORAGE-BUCKET',
  messagingSenderId: 'YOUR-MESSAGING-SENDER-ID',
  appId: 'YOUR-APP-ID',
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

```

Replace the placeholders with the value of each key from your Firebase application `firebaseConfig`.

## Display Auth State {: #show-auth}

If the user data is saved in [storage][api-storage], the popup will display their email, paid
status, and a sign-out button. Otherwise, the UI will show the sign in form.

``` js
// popup.js
...

// Check if user is already logged in when popup opens
chrome.storage.local.get(['user', 'paid'], ({ user, paid }) => {
  updateAuthState(user)
  updatePayState(paid)
})

// Update UI according to auth state
function updateAuthState(user) {
  authState.innerText = user ? `Signed in as ${user}` : "Not signed in";
  email.style.display = user ? "none" : "block";
  password.style.display = user ? "none" : "block";
  payState.style.display = user ? "block" : "none";
  signInButton.style.display = user ? "none" : "block";
  signOutButton.style.display = user ? "block" : "none";
}

// Give user access to premium features
function updatePayState(paid) {
  if (paid === true) {
    payState.innerText = 'Premium account'
// Add premium features here
  } else {
    payState.innerText = 'Free account'
  }
}

});
```

## Update Auth State {: #update-auth}

The popup will use the [messages][docs-messages] API to tell the background script to either sign
the user in or sign them out.

```js
//popup.js
...

// Send login data to the background script
signInButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({
    greeting: 'signIn',
    email: email.value,
    password: password.value
  })
});

// Send logout message to the background script
signOutButton.addEventListener("click", async () => {
  chrome.runtime.sendMessage({
    greeting: 'signOut'
  })
});
```

The background will then call [`signInWithEmailAndPassword()`][firebase-auth-email-password] to sign
the user in or [`signOut()`][firebase-auth-signout] to log them out.

``` js
// background.js
...

// Listen for messages sent by the popup
chrome.runtime.onMessage.addListener((message) => {
  switch (message.greeting) {
    case 'signIn': {
      signInWithEmailAndPassword(auth, message.email, message.password)
      break;
    }
    case 'signOut': {
      signOut(auth);
      break;
    }
    default:
  }
})

```

## Check and store payment status {: #payment }

The observer [onAuthStateChanged()][firebase-onauthstatechanged] is triggered on sign-in or
sign-out. If the user is signed in, the background script will check if payment status is saved in
storage. Otherwise, it will query the Firebase Firestore and save the data to storage. 
 
```js
// background.js
...

onAuthStateChanged(auth, async (user) => {
  // If user is signed in
  if (user) {
    // Check if paid state is saved in storage
    let { paid } = await chrome.storage.local.get('paid')
    
    if (typeof paid === 'undefined') {
      // Query payment status in the database
      const snapshot = await getDocs(
        query(
          collection(db, `stripe_customers/${user.uid}/payments`),
          where('status', '==', 'succeeded')
        )
      );
      // User has paid if more than zero successful payments    
      paid = snapshot.size > 0
    }

    // Update user and payment status in storage
    await chrome.storage.local.set({ user: user.email, paid })
  } else {
    // If user is signed out, clear storage
    await chrome.storage.local.remove(['user', 'paid'])
  }
});

```

If the user is signed out, then the user data is removed from storage.

## Listen for storage changes {: #storage-changes} 

When any values in storage change, you can use `chrome.storage.onChanged` to listen for changes and
update the popup UI.

```js
// popup.js

...

chrome.storage.onChanged.addListener((changes) => {
  if (changes.user) {
    updateAuthState(changes.user.newValue)
  }

  if (changes.paid) {
    updatePayState(changes.paid.newValue)
  }
})
```

## Try signing in {: #test-ext}

Now you can test your extension. [Load your extension locally][load-locally] and click on the toolbar icon to open
the popup. Try out the following features:

- Click on “Create an Account” link to open the web app.
- Sign in with your email/password.
- View your email and paid status.
- Sign out of your account.

{% Columns %}

{% Column %}

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/jJHlWoxGyYVlz4mYPfCT.png", alt="Popup when user is
not signed in", width="226", height="208" %}

{% endColumn %}

{% Column %}

{% Img src="image/BhuKGJaIeLNPW9ehns59NfwqKxF2/TeRl9UwHXSm7VIYgpgNk.png", alt="Popup when user is
logged in", width="270", height="234" %}

{% endColumn %}

{% endColumns %}

## Accept live payments {: #stripe-live-keys }

Once you’re ready to go live, follow the same instructions for [adding your Stripe
keys][section-add-stripe-keys], but exchange your test keys for your live keys.

See the [Stripe API keys][stripe-api-keys] to learn more.

## Further reading {: #further}

For a more advanced Stripe/Firebase integration in your web app, see the following [Firebase
Extensions](https://firebase.google.com/docs/extensions):

- [Stripe subscriptions Firebase extension codelab][codelab-stripe-firebase-extension]
- [Stripe Firestore
  payments](https://firebase.google.com/products/extensions/stripe-firestore-stripe-payments)

[api-storage]: /docs/extensions/reference/storage/
[codelab-stripe-firebase-extension]: https://firebase.google.com/codelabs/stripe-firebase-extensions#0
[developer-chrome-github]: https://github.com/GoogleChrome/developer.chrome.com
[docs-externally-connectable]: /docs/extensions/mv3/manifest/externally_connectable/
[docs-messages]: /docs/extensions/mv3/messaging/
[esm-firebase-app]: https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js
[esm-firebase-auth]: https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js
[esm-firebase-firestore]: https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js
[firebase-auth-chrome-extension]: https://firebase.google.com/docs/auth/web/google-signin#authenticate_with_firebase_in_a_chrome_extension
[firebase-auth-email-password]: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
[firebase-auth-signout]: https://firebase.google.com/docs/reference/js/auth#signout
[firebase-cli]: https://github.com/firebase/firebase-tools#node-package
[firebase-console]: https://console.firebase.google.com/
[firebase-email-password]: https://firebase.google.com/docs/auth/web/password-auth
[firebase-onauthstatechanged]: https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onauthstatechanged
[firebase-stripe-github-webapp]: https://github.com/firebase/functions-samples/tree/main/stripe
[firebase-stripe-web-app]: https://cloud-functions-stripe-sample.web.app/
[firebase-ui]: https://firebase.google.com/docs/auth/web/firebaseui
[load-locally]: /docs/extensions/mv3/getstarted/#unpacked
[payments-firebase-usecase]: https://firebase.google.com/docs/use-cases/payments
[section-add-stripe-keys]: #add-your-stripe-test-api-keys
[stripe-api-keys]: https://dashboard.stripe.com/account/apikeys
[stripe-dashboard]: https://dashboard.stripe.com/register  
[stripe-get-started]: https://support.stripe.com/questions/getting-started-with-stripe-create-or-connect-an-account
[stripe-test-card]: https://stripe.com/docs/testing#cards
