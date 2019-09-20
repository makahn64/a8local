/*********************************

 File:       user-actions.js
 Function:   Actions a sysadmin can take upon a User
 Copyright:  AppDelegates LLC
 Date:       2019-09-20
 Author:     mkahn

 **********************************/

const AVAILABLE_ACTIONS = ['block', 'unblock']

module.exports = async (req, res) => {
    const uid = req.param('id');
    const action = req.param('action').toLowerCase();

    //if (AVAILABLE_ACTIONS.indexOf(action)<0) return res.badRequest({error: 'no such action'});
    const user = await User.findOne(uid);
    if (!user) return res.notFound();

    switch (action) {
        // Using a Switch looks weird, but I anticipate adding more actions later
        case 'block':
        case 'unblock':
            await User.update({ id: uid}).set({blocked: action==='block'});
            return res.ok({message: `User ${user.email} is ${action}ed`});
        default:
            return res.badRequest({error: 'no such action'});
    }

}
