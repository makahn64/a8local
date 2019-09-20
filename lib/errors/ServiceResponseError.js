/*********************************

 File:       ServiceResponseError.js
 Function:   For passing errors down from Service to Controller
 Copyright:  hrbr.io
 Date:       1/30/19 11:34 AM
 Author:     mkahn

 Enter detailed description

 **********************************/

module.exports = class ServiceResponseError extends Error {

    constructor({message, code }){
        super(message);
        this.code = code;
    }

}
