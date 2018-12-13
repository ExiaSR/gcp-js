# gcp-js

**Work In Progress**

> A JavsScript Client for Google Cloud Print

The motivation behind this project is Google Cloud Print only supplies REST API for their service interfaces. Also Google API and documentation suck in general.

## Installation

> `$ yarn add gcp-js`

As an alternative to using npm, you can use `unpkg.com` to load our UMD bundle. Alfraid of introducing heavy-loaded bundle? Check out the bundle size at [`bundlephobia.com`](https://bundlephobia.com/result?p=gcp-js@latest).

```html
<script type="text/javascript" src="https://unpkg.com/gcp-js/dist/index.umd.js" />
```

## Example

`gcp-js` does not handle authentication for you. You will need to setup either an OAuth Client or service account on Google Developers Console, then obtain the access token from your client.

To use service account, you should check out this [post](https://stackoverflow.com/a/30595619).

Below it is an example to authenticate with a service account, then print out a list of printers I own.

```js
const { google } = require('googleapis');
const GCP = require('gcp-js');
const privateKey = require('./account.jwt.json');

// init google apis client
const client = await google.auth.getClient({
  credentials: privateKey,
  scopes: 'https://www.googleapis.com/auth/cloudprint',
});
const { token: accessToken } = await client.getAccessToken();

// init GCP instance
const cloudPrinter = new GCP({ accessToken });
const data = await cloudPrinter.search();
console.log(JSON.stringify(data));
```

## Related
* [Google Cloud Print Service Interfaces](https://developers.google.com/cloud-print/docs/appInterfaces) - GCP Service Interfaces for Application Developers
