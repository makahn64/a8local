/*********************************

 File:       sysadminAuth.js
 Function:   Must be sysadmin
 Copyright:  AppDelegates
 Date:       8/5/19
 Author:     mkahn

 **********************************/

module.exports = async function (req, res, next) {
    if (req.session.sysadmin) return next();
    return res.forbidden();
}

