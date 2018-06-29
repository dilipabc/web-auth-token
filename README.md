# web-auth-token

Web rest api authentication token


## Install

```
$ npm install --save web-auth-token
```


## Usage Examples

```js
var authToken = require('web-auth-token');

var data = {
   "username": "abcd",
   "password": "123456"
 }
authToken.authTokenUserCreate(data, function(result) {
   console.log(result);
});

```

## Features

This is a Node API package to secure any API created through Node Js. Following are main features of this package.

  * A web authentication user will be created.
  * With authenticated user information a secret key will be generated.
  * Attach the secret key with any API.
  * Verify the API with this secret key.

