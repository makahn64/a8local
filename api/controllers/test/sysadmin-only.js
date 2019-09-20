/*********************************

 File:       sysadmin-only.js
 Function:   test endpoint for sysadmin only access
 Copyright:  AppDelegates LLC
 Date:       2019-09-20
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {
    if (!req.session || !req.session.sysadmin) return res.serverError(new Error('no session or not sysadmin'));
    return res.ok({ message: `You're a smooth sysadmin, ${req.session.user.email}`});
}
