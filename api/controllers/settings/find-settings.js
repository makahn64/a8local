/*********************************

 File:       find-settings.js
 Function:   Finds by UUID or KEY
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn

 **********************************/

const isUUID = require('../../../lib/models/isUUID');
const findByKey = require('./find-settings-by-key');

// TODO: Think about incorporating directly into each of the find by key methods

module.exports = async (req, res) => {
    const searchTerm = req.param('keyOrUuid');
    if (isUUID(searchTerm)){
        const setting = await Settings.findOne({uuid: searchTerm});
        if (!setting) return res.notFound();
        return res.ok(setting);
    } else return findByKey(req, res);
}
