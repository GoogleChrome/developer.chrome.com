To register for [the third-party origin
trial](/docs/web-platform/third-party-origin-trials/) and activate the feature
on third-parties:

1.  Go to the [origin trial registration page]({{origin_trial.url}}).
2.  Click the **Register** button and fill out the form to request a token
3.  Enter the serving origin as **Web Origin**.
4.  Check **Third-party matching**  to inject the token with JavaScript on other origins.
5.  Click **Submit**.
6.  Embed the issued token on a third-party.

To embed the token to a third-party, add the following code to your JavaScript
library or SDK served from the registered website's origin.

```javascript
const tokenElement = document.createElement('meta');
tokenElement.httpEquiv = 'origin-trial';
tokenElement.content = 'TOKEN_GOES_HERE';
document.head.appendChild(tokenElement);
```

Replace `TOKEN_GOES_HERE` with your own token.
