/*********************************

 File:       findModelByUUID.js
 Function:   Curried finder
 Copyright:  AppDelegates LLC
 Date:       2019-09-29
 Author:     mkahn

 **********************************/

const populateModel = require('./populateModel');

module.exports = modelType => async (req, res) => {
    const uuid = req.param('uuid');
    const g = await modelType.findOne({uuid});
    if (!g) return res.notFound({error: `no such ${modelType.identity} => ${uuid}`});
    const shouldPopulate = req.param('populate')!=="false";
    const populated = await populateModel(modelType, g, shouldPopulate);
    return res.ok(populated);
}
