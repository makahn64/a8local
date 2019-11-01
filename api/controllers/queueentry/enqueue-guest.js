/*********************************

 File:       enqueue-guest.js
 Function:   Adds a guest to a queue for an Experience
 Copyright:  AppDelegates LLC
 Date:       2019-10-28
 Author:     mkahn

 **********************************/

const ResError = require('../../../lib/errors/StockResErrors');

module.exports = async (req, res) => {
    try {
        const guest = await Guest.findOne({uuid: req.param('guuid')});
        const econf = await ExperienceConfig.findOneByUuidOrKey(req.param('eKeyOrUuid'));
        if (!guest) return res.notFound(ResError.modelNotFoundError({uuid: req.param('guuid'), type: 'Guest'}));
        if (!econf) return res.notFound(ResError.modelNotFoundError({uuid: req.param('eKeyOrUuid'), type: 'Experience Config',
            message: `Experience config not found by UUID or key == ${req.param('eKeyOrUuid')}`}));

        const qentry = await QueueEntry.create({
            experienceConfigKey: econf.key,
            experienceConfig: econf,
            guestUUID: guest.uuid,
            guest: guest,
            metadata: req.param('metadata'),
            enteredQueueAt: req.param('enteredQueueAt')
        }).fetch();

        return res.ok(qentry);
    } catch (e) {
        return res.serverError(e);
    }
};
