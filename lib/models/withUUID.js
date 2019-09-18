/*********************************

 File:       withUUID.js
 Function:   Extends Base Model with UUID field
 Copyright:  AppDelegates LLC
 Date:       2019-09-13
 Author:     mkahn

 **********************************/

const uuidV4 = require('uuid/v4');

const applyUUID = (values, next) =>  {
    if (!values.uuid) values.uuid = uuidV4();
    next();
};

// TODO code replication here, should use currying?
module.exports = function withUUID(baseModel){

    let beforeCreate;
    if (baseModel.beforeCreate) {
        beforeCreate = (values, next) => {
            const apply = applyUUID.bind(this, values, next);
            baseModel.beforeCreate(values, apply);
        }
    } else {
        beforeCreate = (values, next) => applyUUID(values, next);
    }

    const uuid = {type: 'string'};
    return {...baseModel, attributes: {...baseModel.attributes, uuid}, beforeCreate }
}
