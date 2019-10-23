/*********************************

 File:       findAllPopulated.js
 Function:   Curried finder
 Copyright:  AppDelegates LLC
 Date:       2019-09-29
 Author:     mkahn

 **********************************/

// TODO Test this, there are probably issues with the query (?) mapping to what sails expects on normal blueprint
// routes.

const populateModel = require('./populateModel');

async function doPopulate(modelType, m, populate){
    return await populateModel(modelType, m, populate);
}

module.exports = modelType => async (req, res) => {
    const  {populate, ...q} = req.query;
    const m = await modelType.find(q);
    const populated = await Promise.all( m.map(m=> doPopulate(modelType, m, populate!=='false' )));
    return res.ok(populated);
}
