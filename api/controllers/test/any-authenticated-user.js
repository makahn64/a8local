/*********************************

 File:       any-authenticated-user.js
 Function:   test endpoint for authenticated only access
 Copyright:  AppDelegates LLC
 Date:       2019-09-20
 Author:     mkahn

 Any ring is cool, you just gotta be logged in.

 **********************************/

module.exports = async (req, res) => {
    if (!req.session || !req.session.user) return res.serverError(new Error('no session or no user'));
    return res.ok({ message: `You're ring ${req.session.user.ring}, ${req.session.user.email}`});
}
