/*********************************

 File:       modify-settings-by-key.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {
    const key = req.param('key');
    const value = req.param('value');
    if (!key || !value) return res.badRequest({ error: 'no key (or no value), no love' });
    const settings = await Settings.update({ key}).set({value}).fetch();
    if (!settings || !settings.length) return res.notFound({ error: `no settings for key ${key}`});
    return res.ok(settings[0]);
};
