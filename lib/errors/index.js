/*********************************

 File:       index.js
 Function:   Index file for common errors
 Copyright:  AppDelegates LLC
 Date:       2019-09-19
 Author:     mkahn

 **********************************/

// TODO this probably needs a tidy for old/unused stuff pulled from other projects

const ChainError = require('./ChainError');
const JSONErrorMsg = require('./JSONErrorMsg');
const ServiceResponseError = require('./ServiceResponseError');

module.exports = {
    ChainError,
    JSONErrorMsg,
    ServiceResponseError
}
