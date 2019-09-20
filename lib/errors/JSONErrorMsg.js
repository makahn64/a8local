/*********************************

 File:       JSONErrorMsg.js
 Function:   Helper to create standard error return JSON
 Copyright:  AppDelegates LLC
 Date:       2019-08-14
 Author:     mkahn

 **********************************/

module.exports = (message, code=400, verboseMessage="") => ({ code, error: message, details: verboseMessage });
