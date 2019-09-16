/*********************************

 File:       withUUID.js
 Function:   Extends Base Model it UUID field
 Copyright:  AppDelegates LLC
 Date:       2019-09-13
 Author:     mkahn

 **********************************/

const uuidV4 = require('uuid/v4');

// TODO code replication here, should use currying?
module.exports = function withUUID(baseModel){

    let beforeCreate;
    if (baseModel.beforeCreate) {
        beforeCreate = (values, next) => {
            baseModel.beforeCreate(values, () => {
                if (!values.uuid) {
                    values.uuid = uuidV4();
                }
                next()
            })
        }
    } else {
        beforeCreate = (values, next) => {
            if (!values.uuid) {
                values.uuid = uuidV4();
            }
            next()
        }
    }

    const uuid = {type: 'string'};
    const twat = {type: 'string', defaultsTo: 'beer'}

    return {...baseModel, attributes: {...baseModel.attributes, uuid, twat}, beforeCreate }
}
