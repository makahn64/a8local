/*********************************

 File:       media-download.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-11
 Author:     mkahn



 **********************************/

const SkipperDisk = require('skipper-disk');

module.exports = async (req, res) => {

    const mediaId = req.param('id');
    if (!mediaId) return res.badRequest({error: 'no media ID'});

    const media = await Media.findOne(mediaId);
    if (!media) return res.notFound({error: `no such media for id: ${mediaId}`});

    if (!media.path) return res.serverError({error: `no such media PATH for id: ${mediaId}. This is bad.`});

    const fileAdapter = SkipperDisk(/* optional opts */);

    // Stream the file down
    fileAdapter.read(media.path)
        .on('error', function (err) {
            return res.serverError(err);
        })
        .pipe(res);

}
