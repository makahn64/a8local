/*********************************

 File:       populateModel.js
 Function:   Populates a fetched model
 Copyright:  AppDelegates LLC
 Date:       2019-10-04
 Author:     mkahn

 Populates a model with UUID ref fields

 **********************************/

const Promise = require('bluebird');

/**
 *
 * @param modelType
 * @param model
 * @param populate set true to populate (is this ever used? Maybe in a parm on a GET?).
 * @returns {Promise<*>}
 */
module.exports = async (modelType, model, populate) => {
    const schema = modelType.populationSchema;
    if (!schema ||
        !(sails.config.activ8or && sails.config.activ8or.api && sails.config.activ8or.api.populateOnFetch) || !populate )
        return model;
    // Get fields to populate
    const toPopulate = Object.keys(schema);
    const promises = {};
    toPopulate.forEach(fieldName => {
        const fieldParams = schema[fieldName];
        if (fieldParams.type === 'obj') {
            promises[fieldName] = sails.models[fieldParams.model].findOne({uuid: model[fieldName]});
        } else if (fieldParams.type === 'array') {
            promises[fieldName] = sails.models[fieldParams.model].find({uuid: model[fieldName]});
        }
    });
    const populated = await Promise.props(promises);
    return {...model, ...populated}
};
