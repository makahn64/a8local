/*********************************

 File:       modifyModelByUUID.js
 Function:   Curried modifier
 Copyright:  AppDelegates LLC
 Date:       2019-10-01
 Author:     mkahn

 **********************************/

const modifiableParams = require('./modifiableParams');
const _ = require('lodash');
const populateModel = require('./populateModel');

module.exports = modelType => async (req, res) => {
    const uuid = req.param('uuid');
    // Filter legit parameters
    const legitParams = modifiableParams(modelType, req);
    // Get fields that may come up pre-populated/de-normed
    const refFields = Object.keys(modelType.populationSchema || {});
    refFields.forEach(field=>{
        // we now have an array
        const mappedRefs = legitParams[field].map( e => {
            if (_.isObject(e)) return e.uuid;
            return e;
        });
        legitParams[field] = mappedRefs;
    });
    await modelType.update({uuid}, legitParams);
    const g = await modelType.findOne({uuid});
    if (!g) return res.notFound({error: `no such ${modelType.identity} => ${uuid}`});
    const populated = await populateModel(modelType,g, true);
    return res.ok(populated);
};
