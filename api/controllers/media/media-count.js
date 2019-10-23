/*********************************

 File:       media-count.js
 Function:   Count du Media
 Copyright:  AppDelegates LLC
 Date:       2019-10-11
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {

        const {start, end} = req.allParams();
        let query = {};

        //Count in time window
        if (start) {
            const endDate = end ? new Date(end) : new Date();
            query = {
                createdAt: {'<=': new Date(end), '>': new Date(start)}
            };
        }

        try {
            const count = await Media.count(query)
            return res.ok({count: count});
        } catch (err) {
            return res.serverError(err);
        }
        
}
