/*********************************

 File:       deleteModelByUUID.js
 Function:   Curried deleter
 Copyright:  AppDelegates LLC
 Date:       2019-09-29
 Author:     mkahn

 **********************************/

module.exports = (modelType, modelName) => async (req, res) => {
    const uuid = req.param('uuid');
    const g = await modelType.destroy({uuid}).fetch();
    if (!g || !g.length) return res.notFound({error: `no such ${modelName} => ${uuid}`});
    return res.ok(g[0]);
}
