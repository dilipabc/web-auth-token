'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
var filetargetPath = __dirname + '/authtokens.json';
var rawdata = fs.readFileSync(filetargetPath);
var authTokens = JSON.parse(rawdata);


var authToken = {
  //=======================================================
  authTokenUserCreate: function(userData, callback) {
    var returnArray;
    if (userData.username != '' && userData.password != '') {
      //======================================================
      var userAvail = this.authTokenUserAvailable(userData.username);
      if (userAvail == true) {
        returnArray = {
          success: 2,
          status: 'Invalid',
          message: 'Username is not available.'
        };
        if (callback) {
          callback(returnArray);
        } else {
          return returnArray;
        }
      } else {
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
        if (callback) {
          callback(returnArray);
        } else {
          return returnArray;
        }
      }
      //======================================================
    } else {
      returnArray = {
        success: 2,
        status: 'Invalid',
        message: 'Please send a valid username and password'
      };
      if (callback) {
        callback(returnArray);
      } else {
        return returnArray;
      }
    }
  },
  //=======================================================
  authTokenUserAvailable: function(username) {
    if (username) {
      if (authTokens.length > 0) {
        var countVal = 0;

        for (var i = 0; i < authTokens.length; i++) {
          countVal++;
          if (authTokens[i].username == username) {
            return true;
          } else {
            if (countVal == authTokens.length) {
              return false;
            }
          }
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  //=======================================================
  authTokenGenarate: function(authData, callback) {
    var returnArray;
    if (authData.username != '' && authData.password != '') {
      //====================================================
      if (authTokens.length == 0) {
        //====================================================
        returnArray = {
          success: 2,
          status: 'Invalid',
          message: 'Auth user is not available.'
        };
        if (callback) {
          callback(returnArray);
        } else {
          return returnArray;
        }
        //====================================================

      } else {
        //====================================================
        var count = 0;
        var matchData = 0;
        for (var i = 0; i < authTokens.length; i++) {
          //====================================================
          if (authTokens[i].username == authData.username && authTokens[i].password == authData.password) {
            matchData = matchData + 1;

            var oldData = authTokens[i];

            var cDate = new Date();
            var cTimestamp = cDate.getTime();

            oldData.authtoken.genateTime = cTimestamp;
            oldData.authtoken.expiredTime = isset(authData.expiredTime) ? authData.expiredTime : 0;
            oldData.authtoken.token = this.keyGenarate(cTimestamp, authData);;

            var makeData = authTokens;
            makeData[i] = oldData;
            var data = JSON.stringify(makeData);
            fs.writeFileSync('authtokens.json', data);
            returnArray = {
              success: 1,
              status: 'Valid',
              message: 'Successfully genarate authentication token key.'
            };
            if (callback) {
              callback(returnArray);
            } else {
              return returnArray;
            }

          }
          //====================================================
          count++;
          if (authTokens.length == count) {
            if (matchData == 0) {
              //====================================================
              returnArray = {
                success: 2,
                status: 'Invalid',
                message: 'Invalid username or password.'
              };
              if (callback) {
                callback(returnArray);
              } else {
                return returnArray;
              }
              //====================================================
            }
          }
          //====================================================

        }
        //====================================================
      }
      //====================================================
    } else {
      //====================================================
      returnArray = {
        success: 2,
        status: 'Invalid',
        message: 'Username and password is require.'
      };
      if (callback) {
        callback(returnArray);
      } else {
        return returnArray;
      }
      //====================================================
    }
  },
  //=======================================================
  keyGenarate: function(cTimestamp, authData) {
    var keyReturn = '';
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', authData.password)
      .update(authData.username + '-' + cTimestamp)
      .digest('hex');
    keyReturn = hash;
    return keyReturn;
  },
  //=======================================================
  authTokenVerify: function(secretKey, callback) {
    var returnArray = {};
    if (secretKey == '') {
      returnArray = {
        success: 2,
        status: 'Invalid',
        message: 'Secret key is require.'
      };

      if (callback) {
        callback(returnArray);
      } else {
        return returnArray;
      }

    } else {
      var returnData = this.authTokensecretKeyAvailable(secretKey);
      if (returnData == false) {
        returnArray = {
          success: 2,
          status: 'Invalid',
          message: 'Invalid secret key.'
        };

        if (callback) {
          callback(returnArray);
        } else {
          return returnArray;
        }

      } else {

        if (returnData.authtoken.expiredTime == 0) {
          returnArray = {
            success: 1,
            status: 'Valid',
            message: 'Successfully verify the secret key.'
          };
          if (callback) {
            callback(returnArray);
          } else {
            return returnArray;
          }

        } else {

          var cDate = new Date();
          var cTimestamp = cDate.getTime();

          var oldTime = parseInt(returnData.authtoken.genateTime);
          var diffTime = parseInt(cTimestamp) - parseInt(oldTime);
          var expiredTime = parseInt(returnData.authtoken.expiredTime);

          var diffTimes = parseInt(diffTime / 1000);

          if (expiredTime <= diffTimes) {
            returnArray = {
              success: 2,
              status: 'Invalid',
              message: 'Your secret key is expired.'
            };

            if (callback) {
              callback(returnArray);
            } else {
              return returnArray;
            }

          } else {
            returnArray = {
              success: 1,
              status: 'Valid',
              message: 'Successfully verify the secret key.'
            };
            if (callback) {
              callback(returnArray);
            } else {
              return returnArray;
            }
          }

        }
      }
    }
  },
  //=======================================================
  authTokensecretKeyAvailable: function(secretKey) {
    if (secretKey) {
      if (authTokens.length > 0) {
        var countVal = 0;

        for (var i = 0; i < authTokens.length; i++) {
          countVal++;
          if (authTokens[i].authtoken.token == secretKey) {
            return authTokens[i];
          } else {
            if (countVal == authTokens.length) {
              return false;
            }
          }
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  //=======================================================
};
module.exports = authToken;
