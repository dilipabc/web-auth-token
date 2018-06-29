# web-auth-token

Web rest api authentication token


## Install

```
$ npm install --save web-auth-token
```


## Usage 

Step 1

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

Step 2

```js
var authToken = require('web-auth-token');

var data = {
   "username": "abcd",
   "password": "123456",
   "expiredTime" : 0 // Expired in second "0" is unlimited
 }
authToken.authTokenGenarate(data, function(result) {
   console.log(result);
});

```

Step 3

```js
var authToken = require('web-auth-token');

var secretKey = '40e500de41432de6ae60bfc0b75dccccba3a24af5c33509ae294491447840b23';

authToken.authTokenVerify(secretKey, function(result){
   console.log(result);
});

```

## Features

This is a Node API package to secure any API created through Node Js. Following are main features of this package.

  * A web authentication user will be created.
  * With authenticated user information a secret key will be generated.
  * Attach the secret key with any API.
  * Verify the API with this secret key.

## license
ISC
