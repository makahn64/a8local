/*********************************

 File:       withUUID.js
 Function:   Extends Base Model it UUID field
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
    const extra = {type: 'string', defaultsTo: 'beer'}
    return {...baseModel, attributes: {...baseModel.attributes, uuid, extra}, beforeCreate }
}
