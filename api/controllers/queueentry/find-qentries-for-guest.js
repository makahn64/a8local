/*********************************

 File:       find-by-uuid.js
 Function:   Finds a Q Entry by UUID
 Copyright:  AppDelegates LLC
 Date:       2019-09-18
 Author:     mkahn

 **********************************/

const ResError = require('../../../lib/errors/StockResErrors');

module.exports = async (req, res) => {
    const guuid = req.param('guuid');
    try {
        const g = await Guest.findOne({uuid: guuid});
        if (!g) return res.notFound(ResError.modelNotFoundError({uuid: guuid, type: 'Guest'}));
        const qentries = await QueueEntry.find({guestUUID: guuid});
        return res.ok(qentries);
    } catch (e) {
        return res.serverError(e);
    }
};
