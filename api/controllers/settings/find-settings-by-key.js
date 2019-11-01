/*********************************

 File:       find-settings-by-key.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {
    const key = req.param('key');
    if (!key) return res.badRequest({error: 'no key, no love'});
    const setting = await Settings.findOne({key});
    if (!setting) return res.notFound({error: `no settings for key ${key}`});
    return res.ok(setting.value);
};
