/*********************************

 File:       re-enqueue-qentry-by-uuid.js
 Function:   Get entry, terminate it then add to end of queue
 Copyright:  AppDelegates LLC
 Date:       2019-10-28
 Author:     mkahn



 **********************************/

const ResError = require('../../../lib/errors/StockResErrors');


module.exports = async (req, res) => {
    try {
        const qentries = await QueueEntry.update({uuid: req.param('uuid')})
            .set({
                completedQueueAt: new Date().getTime(),
                resolution: 'requeued'
            }).fetch();
        if (!qentries || !qentries.length) return res.notFound(ResError.modelNotFoundError({
            uuid: req.param('uuid'),
            type: 'Queue Entry'
        }));
        // toss crap we don't want
        const { completedQueueAt, resolution, uuid, id, createdAt, updatedAt, enteredQueueAt, ...newQE} = qentries[0];
        const newQEntry = await QueueEntry.create(newQE).fetch();
        return res.ok(newQEntry);
    } catch (e) {
        return res.serverError(e);
    }
}
