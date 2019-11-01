/*********************************

 File:       dequeue-guest.js
 Function:   Removes a guest to a queue for an Experience
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
        if (!econf) return res.notFound(ResError.modelNotFoundError({
            uuid: req.param('eKeyOrUuid'), type: 'Experience Config',
            message: `Experience config not found by UUID or key == ${req.param('eKeyOrUuid')}`
        }));

        // There could be multiple, this will resolve/dequeue ALL of them
        const qentries = await QueueEntry
            .update({
                experienceConfigKey: econf.key,
                guestUUID: guest.uuid
            })
            .set({
                completedQueueAt: req.param('completedQueueAt'),
                resolution: req.param('resolution') || 'no resolution specified'
            }).fetch();
        return res.ok(qentries);
    } catch (e) {
        return res.serverError(e);
    }
};
