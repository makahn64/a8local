/*********************************

 File:       remove-from-guest.js
 Function:   DELETE an experience assigned to a specific guest
 Copyright:  AppDelegates LLC
 Date:       2019-10-05
 Author:     mkahn



 **********************************/

const populateModel = require('../../../lib/models/populateModel');

module.exports = async (req, res) => {

    const guuid = req.param('guuid');
    const g = await Guest.findOne({uuid: guuid});
    if (!g) return res.notFound({error: `Guest not found: ${guuid}`});

    const euuid = req.param('euuid');
    const e = await Experience.findOne({uuid: euuid});
    if (!e) return res.notFound({error: `Experience not found: ${euuid}`});

    const moddedExp = await Experience
        .update({uuid: euuid})
        .set({guests: _.without(e.guests, guuid)})
        .fetch();

    const newGs = await Guest
        .update({uuid: guuid})
        .set({experiences: _.without(g.experiences, euuid)})
        .fetch();

    const populated = await populateModel(Guest, newGs[0], true);
    return res.ok(populated);

}
