/*********************************

 File:       delete-settings-by-key.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn

 **********************************/

module.exports = async (req, res) => {
    const key = req.param('key');
    if (!key) return res.badRequest({ error: 'no key, no love' });
    try {
        await Settings.destroy({key});
        return res.ok();
    } catch (e) {
        res.serverError(e);
    }
}
