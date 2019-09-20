/*********************************

 File:       logout.js
 Function:   It, like, logs out. Surprise!
 Copyright:  AppDelegates LLC
 Date:       2019-09-20
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {

        if (!req.session || !req.session.authenticated) return res.ok({message: `Well, you're not logged in so...`});

        req.session.destroy(err => {
            // if this happens, it's pretty whack
            if (err) {
                sails.log.error(`Failure destroying session. Here are the deets: ${JSON.stringify(err)}`);
                return res.serverError(err);
            }
            return res.ok({message: "later dude"});
        });

};
