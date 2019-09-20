/*********************************

 File:       sessionAuth.js
 Function:   Checks for valid session or JWT
 Copyright:  AppDelegates
 Date:       6/1/2019
 Author:     mkahn

 **********************************/


module.exports = async (req, res, next) => {

    // Check straight session auth first
    if (req.session.authenticated) return next();

    if (req.headers.authorization) {

        try {
            const decodedJwt = await AuthService.verifyJwtReq(req);
            const user = await User.findOne({id: decodedJwt.user.id});
            if (!user) return res.forbidden({error: 'No user for that token'});
            if (user.blocked) return res.forbidden({error: "User is blocked"});
            req.session.authenticated = true;
            req.session.user = user;
            req.session.sysadmin = user.ring === 1;
            return next();
        } catch (err) {
            return res.forbidden({error: `No wine for you`})
        }
    }

    return res.forbidden({error: `No soup for you`});

}

