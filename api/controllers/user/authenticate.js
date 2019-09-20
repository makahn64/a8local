/*********************************

 File:       authenticate.js
 Function:   Authenticates an Email/Password type user
 Copyright:  AppDelegates LLC
 Date:       2019-09-19
 Author:     mkahn

 **********************************/

const bcrypt = require('bcrypt');

module.exports = async (req, res) => {

    const email = req.param('email');
    const password = req.param('password');
    if (!email || !password) return res.badRequest({error: 'missing email and/or password'});
    const user = await User.findOne({email});
    if (!user) return res.forbidden({error: 'no such user'});
    const isLegit = await bcrypt.compare(password, user.password);
    if (!isLegit) return res.forbidden({error: 'bad password'});

    req.session.user = user;
    req.session.authenticated = true;
    req.session.sysadmin = user.ring === 1;

    // wipe password
    const {pwd, ...rest} = user;
    const response = {message: `Welcome, ${user.email}`, user: rest};
    if (req.wantsJSON) {
        response.token = AuthService.makeJwt(user);
    }
    return res.ok(response);
}
