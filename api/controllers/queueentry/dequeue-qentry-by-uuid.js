/*********************************

 File:       dequeue-qentry-by-uuid.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-28
 Author:     mkahn



 **********************************/

const ResError = require('../../../lib/errors/StockResErrors');


module.exports = async (req, res) => {
    try {
        const qentries = await QueueEntry
            .update({uuid: req.param('uuid')})
            .set({
                completedQueueAt: req.param('completedQueueAt'),
                resolution: req.param('resolution') || 'no resolution specified'
            })
            .fetch();
        if (!qentries || !qentries.length) return res.notFound(ResError.modelNotFoundError({
            uuid: req.param('uuid'),
            type: 'Queue Entry'
        }));
        return res.ok(qentries[0]);
    } catch
        (e) {
        return res.serverError(e);
    }
}
