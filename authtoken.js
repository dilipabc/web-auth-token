'use strict';
const fs = require('fs');
const path = require('path');
var filetargetPath = __dirname + '/authtokens.json';
var rawdata = fs.readFileSync(filetargetPath);
var authTokens = JSON.parse(rawdata);

var authToken = {
  //=======================================================
  authTokenUserCreate : function(userData, callback) {
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
  },
  //=======================================================
  authTokenGenarate : function(authData, callback) {
  	 var returnArray;
  	 if (authData.username != '' && authData.password != '') {
  	 	//====================================================
  	 	if(authTokens.length == 0)
  	 	{
  	 		//====================================================
  	 		returnArray = {
  	 		  success: 2,
  	 		  status: 'Invalid',
  	 		  message: 'Auth user is not available.'
  	 		};
  	 		callback(returnArray);
  	 		//====================================================  

  	 	}else{
  	 		//====================================================
  	 		var count = 0;  
  	 		var matchData = 0;
  	 		for(var i=0; i<authTokens.length; i++)
  	 		{  	 			
  	 			//====================================================
  	 			if(authTokens[i].username == authData.username && authTokens[i].password == authData.password)
  	 			{
  	 				matchData = matchData + 1;

  	 				var oldData = authTokens[i];

  	 				console.log(oldData); 

  	 				var makeData = authTokens;
  	 				var data = JSON.stringify(makeData);
  	 				// fs.writeFileSync('authtokens.json', data);
  	 				// returnArray = {
  	 				//   success: 1,
  	 				//   status: 'Valid',
  	 				//   message: 'Successfully genarate authentication token key.'
  	 				// };
  	 				// callback(returnArray);

  	 			}
  	 			//====================================================
  	 			count++;
  	 			if(authTokens.length == count)
  	 			{
  	 				if(matchData == 0)
  	 				{
				  	 	//====================================================
				  	 	returnArray = {
				  	 	  success: 2,
				  	 	  status: 'Invalid',
				  	 	  message: 'Invalid username or password.'
				  	 	};
				  	 	callback(returnArray);
				  	 	//====================================================
  	 				}
  	 			}
  	 			//====================================================

  	 		}  	 		
  	 		//====================================================  
  	 	}
  	 	//====================================================
  	 }else{
  	 	//====================================================
  	 	returnArray = {
  	 	  success: 2,
  	 	  status: 'Invalid',
  	 	  message: 'Username and password is require.'
  	 	};
  	 	callback(returnArray);
  	 	//====================================================  	 	
  	 }
  } 
  //=======================================================
};


var testdata = {
  "username": "dilipabc1@gmail.com",
  "password": "123456"
}

authToken.authTokenGenarate(testdata, function(result) {
  console.log(result);
});

module.exports = authToken;
