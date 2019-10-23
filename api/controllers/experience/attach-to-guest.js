/*********************************

 File:       upload-to-guest.js
 Function:   PATCH up an experience assigned to a specific guest
 Copyright:  AppDelegates LLC
 Date:       2019-10-05
 Author:     mkahn



 **********************************/

const populateModel = require('../../../lib/models/populateModel');

module.exports = async (req, res) => {

    const guuid = req.param('guuid');
    const euuid = req.param('euuid');
    const gAndE = await Experience.attachGuest(euuid, guuid);
    const populated = await populateModel(Guest, gAndE.guest, true);
    return res.ok(populated);

}
