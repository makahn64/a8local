/*********************************

 File:       checkSession.js
 Function:   Used to test Auth Setup
 Copyright:  AppDelegates LLC
 Date:       2019-09-19
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {
    if (!req.session) return res.ok({ message: 'No session'});
    return res.ok(req.session);
}
