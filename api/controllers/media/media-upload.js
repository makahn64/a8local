/*********************************

 File:       media-upload.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-11
 Author:     mkahn



 **********************************/


module.exports = async (req, res) => {

    try {
        const type = req.param('type') || "usermedia";
        const newMedia = await MediaService.uploadOneMedia(req, type);
        return res.ok(newMedia);
    } catch (err){
        return res.serverError(err);
    }

}
