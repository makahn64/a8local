/*********************************

 File:       find-all-q-entries.js
 Function:   Get's 'em all, organized by Econfig
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {

    const econfigs = await ExperienceConfig.find({});
    if (!econfigs || !econfigs.length) return res.ok({});

    const rval = {};
    for (let i=0; i<econfigs.length; i++){
        const thisEconf = econfigs[i];
        rval[thisEconf.key] = { config: thisEconf, entries: await QueueEntry.find({experienceConfigKey: thisEconf.key}).sort('enteredQueueAt ASC')};
    }

    return res.ok(rval)
}
