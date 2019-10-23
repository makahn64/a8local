/*********************************

 File:       modifiableParams.js
 Function:   Pulls only the parameters that can be modified by a patch or put
 Copyright:  AppDelegates LLC
 Date:       2019-10-01
 Author:     mkahn

 Matches inbound params in the req object with attributes in the model then pulls
 the ones that should never be modified (UUID, createdAt, updatedAt, id)

 **********************************/

module.exports = function(modelType, req){
    const legitAttribs = _.without(Object.keys(modelType.attributes), 'uuid','createdAt','modifiedAt', 'id');
    const legalParams = _.pick(req.allParams(), legitAttribs);
    return legalParams;
}
