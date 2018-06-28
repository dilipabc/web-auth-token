'use strict';
const fs = require('fs');
var rawdata = fs.readFileSync('./authtokens.json');
var authTokens = JSON.parse(rawdata);

//console.log(authTokens);

var authToken = {
  //=======================================================
  userCreate: function(userData, callback) {
	    var returnArray;
	    if (userData.username != '' && userData.password != '') {
	      var id = authTokens.length + 1;

	      var createDate = {
	        "id": id,
	        "username": userData.username,
	        "password": userData.password,
	        "authtoken": {
	          "genateTime": "",
	          "expiredTime": "",
	          "token": ""
	        }
	      };

	      var makeData = [];

	      if (authTokens.length == 0) {
	        makeData = [createDate];
	      } else {
	        makeData = authTokens;
	        makeData[authTokens.length] = createDate;
	      }

	      var data = JSON.stringify(makeData);
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
