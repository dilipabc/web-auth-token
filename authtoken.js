'use strict';
const fs = require('fs');
let rawdata = fs.readFileSync('./authtokens.json');
let authTokens = JSON.parse(rawdata);



var authToken = {
  //=======================================================
  userCreate: function(userData, callback) {
	    let returnArray;
	    if (userData.username != '' && userData.password != '') {
	      let id = authTokens.length + 1;

	      let createDate = {
	        "id": id,
	        "username": userData.username,
	        "password": userData.password,
	        "authtoken": {
	          "genateTime": "",
	          "expiredTime": "",
	          "token": ""
	        }
	      };

	      let makeData = [];

	      if (authTokens.length == 0) {
	        makeData = [createDate];
	      } else {
	        makeData = authTokens;
	        makeData[authTokens.length] = createDate;
	      }

	      let data = JSON.stringify(makeData);
	      fs.writeFileSync('authtokens.json', data);
	      returnArray = {
	        success: 1,
	        status: 'Valid',
	        message: 'Successfully add new user credentials.'
	      };
	      callback(returnArray);
	    } else {
	      returnArray = {
	        success: 2,
	        status: 'Invalid',
	        message: 'Please send a valid username and password'
	      };
	      callback(returnArray);
	    }
  }
  //=======================================================
  //=======================================================
};


// var testdata = {
//   "username": "dilipabc@gmail.com",
//   "password": "123456"
// }

// authToken.userCreate(testdata, function(result) {
//   console.log(result);
// });

module.exports = authToken;
