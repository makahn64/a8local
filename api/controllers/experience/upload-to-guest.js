/*********************************

 File:       attach-to-guest.js
 Function:   PATCH an existing experience to a specific guest
 Copyright:  AppDelegates LLC
 Date:       2019-10-05
 Author:     mkahn



 **********************************/

const populateModel = require('../../../lib/models/populateModel');

module.exports = async (req, res) => {
    const uuid = req.param('guuid');
    const g = await Guest.findOne({uuid});
    if (!g) return res.notFound({ error: `Guest not found: ${uuid}`});
    const exp = {...req.body};
    if (exp.configKey){
        exp.config = await ExperienceConfig.findOne({key: exp.configKey});;
    }
    const savedExp = {...exp, guests: [uuid]};
    const newExp = await Experience.create(savedExp).fetch();
    const newGs = await Guest.update({uuid}).set({ experiences: _.uniq([...g.experiences, newExp.uuid ])}).fetch();
    const populated = await populateModel(Guest, newGs[0], true);
    return res.ok(populated);
}
