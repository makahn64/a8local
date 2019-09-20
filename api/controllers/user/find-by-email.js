/*********************************

 File:       findByEmail.js
 Function:   Finds a User by email addr
 Copyright:  AppDelegates LLC
 Date:       2019-09-18
 Author:     mkahn

 New controller style.

 **********************************/

module.exports = async (req, res) => {
    const email = req.params('email');
    if (!email) return res.badRequest({error: 'missing email param'});
    const u = await User.findOne({email});
    if (!u) return res.notFound({error: `no such user ${email}`});
    return res.ok(u);
};
