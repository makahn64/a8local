/*********************************

 File:       modify-settings.js
 Function:   Mods by UUID or KEY
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn

 **********************************/

const isUUID = require('../../../lib/models/isUUID');
const modByKey = require('./modify-settings-by-key');

// TODO: Think about incorporating directly into each of the find by key methods

module.exports = async (req, res) => {
    const searchTerm = req.param('keyOrUuid');
    const newVal = req.param('value');
    if (!newVal) return res.badRequest({ error: 'must supply value parameter'});
    if (isUUID(searchTerm)){
        const setting = await Settings.update({uuid: searchTerm}).set({value: newVal}).fetch();
        if (!setting) return res.notFound();
        return res.ok(setting);
    } else return modByKey(req, res);
}
