/*********************************

 File:       StockResErrors.js
 Function:   Stock response errors making use of Flaverr
 Copyright:  AppDelegates LLC
 Date:       2019-10-28
 Author:     mkahn

 **********************************/

const flaverr = require('flaverr');

module.exports = {

    modelNotFoundError: ({ uuid, type, message }) => {
        return flaverr({
            code: 'E_MODEL_NOT_FOUND',
            message: message || `${type} not found with UUID ${uuid}`
        }, new Error('Model not found'))
    }

}
