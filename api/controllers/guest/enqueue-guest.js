/*********************************

 File:       enqueue-guest.js
 Function:   Enqueues a guest by uuid or ekey
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn



 **********************************/

module.exports = async (req, res) => {

    const expSearchTerm = req.param('eKeyOrUuid');
    const econfs = await ExperienceConfig.find({ or : [
        { uuid: expSearchTerm },
        { key: expSearchTerm }
    ]});

    if (!econfs || !econfs.length) return res.notFound({ error: `No matching experience config for that uuid or key`});
    if (econfs.length>1) return res.badRequest({error: `Multiple hits on that experience config uuid/key!`});
    const econf = econfs[0];

    const guest = await Guest.findOne({uuid: req.param('guuid')});
    if (!guest) return res.notFound({error: `No guest for uuid: ${req.param('guuid')}`});

    // OK, we're good for attachment
    const qEntry = await QueueEntry.create({
        experienceConfigKey: econf.key,
        experienceConfig: econf,
        guestUUID: guest.uuid,
        guest,
        metadata: req.param('metadata') || {}
    }).fetch();

    return res.ok(qEntry);
}
