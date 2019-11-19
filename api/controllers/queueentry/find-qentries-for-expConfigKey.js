/*********************************

 File:       find-qentries-for-expConfigKey.js
 Function:   Finds a Q Entry for a given expConfigKey
 Copyright:  AppDelegates LLC
 Date:       2019-09-18
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {
    const key = req.param('configKey') || req.param('experienceConfigKey') || req.param('key');
    try {
        const qentries = await QueueEntry.find({experienceConfigKey: key}).sort("enteredQueueAt ASC");
        return res.ok(qentries);
    } catch (e) {
        return res.serverError(e);
    }
};
