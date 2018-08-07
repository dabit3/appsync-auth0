# Authenticating AWS AppSync with Auth0

This repo goes along with the Medium blog post [Authenticating an AWS AppSync GraphQL API with Auth0](https://medium.com/@dabit3/authenticating-an-aws-appsync-graphql-api-with-auth0-48835691810a).

### To use this repo, you must have the following credentials:

1. An Auth0 API configured with RS256 signing algorithm for both general & OAuth signing.    
2. AWS AppSync API configured with your Auth0 app domain.

## Getting started

1. Clone the repo

```bash
git clone https://github.com/dabit3/appsync-auth0.git
```

2. Change into the new directory

```bash
cd appsync-auth0
```

3. Install dependencies

```bash
npm i
# or
yarn
```

4. Update the AppSync graphqlEndpoint in AppSync.js with your AppSync endpoint.

5. In App.js, configure the call to Auth0 with your credentials:

```js
this.auth0 = new auth0.WebAuth({
  domain: '<YOURAPPDOMAIN>.auth0.com',
  clientID: '<YOURCLIENTID>',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://<YOURAPPDOMAIN>.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
});
```

6. Run the app

```bash
npm start
```