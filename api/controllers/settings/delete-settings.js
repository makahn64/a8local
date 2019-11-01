/*********************************

 File:       delete-settings.js
 Function:   Deletes by UUID or KEY
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn

 **********************************/

const isUUID = require('../../../lib/models/isUUID');
const deleteByKey = require('./delete-settings-by-key');

// TODO: Think about incorporating directly into each of the find by key methods

module.exports = async (req, res) => {
    const searchTerm = req.param('keyOrUuid');
    if (isUUID(searchTerm)){
        const setting = await Settings.destroy({uuid: searchTerm});
        return res.ok(setting);
    } else return deleteByKey(req, res);
}
