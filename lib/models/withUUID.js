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

const blockUUIDChange = (values, next) => {
    if (values.uuid) delete values.uuid;
    next();
}

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

    let beforeUpdate;
    if (baseModel.beforeUpdate) {
        beforeUpdate = (values, next) => {
            const apply = blockUUIDChange.bind(this, values, next);
            baseModel.beforeUpdate(values, apply);
        }
    } else {
        beforeUpdate = (values, next) => blockUUIDChange(values, next);
    }

    const uuid = {type: 'string'};
    return {...baseModel, attributes: {...baseModel.attributes, uuid}, beforeCreate, beforeUpdate }
}
