/*********************************

 File:       ChainError.js
 Function:   For passing errors down Promise chain
 Copyright:  AppDelegates
 Date:       1/30/19 11:34 AM
 Author:     mkahn

 Enter detailed description

 **********************************/

module.exports = class ChainError extends Error {

    constructor({errorMessage, responseFn, jsonResponse }){
        super(errorMessage);
        this.responseFn = responseFn;
        this.jsonResponse = jsonResponse;
    }

    issueResponse() {
        this.responseFn(this.jsonResponse)
    }

}
