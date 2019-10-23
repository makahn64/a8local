/*********************************

 File:       media-upload-multiple.js
 Function:
 Copyright:  AppDelegates LLC
 Date:       2019-10-11
 Author:     mkahn



 **********************************/

const destinationFolder = require('path').resolve(sails.config.paths.media);

const uploadOptions = {
    dirname: destinationFolder,
    maxBytes: 10 * 1024 * 1024
};

module.exports = async (req, res) => {


    req.file('file').upload(uploadOptions, function whenDone(err, uploadedFiles) {

        if (err) {
            sails.log.error("Media upload error: " + util.inspect(err));
            return res.serverError(err);
        }

        // If no files were uploaded, respond with an error.
        if ((uploadedFiles === undefined) || (uploadedFiles.length === 0)) {
            return res.badRequest({error: 'No file(s) uploaded.'});
        }

        sails.log.silly("Processing uploaded files.");

        let ops = [];

        uploadedFiles.forEach(function (localFile) {

            const mObj = {
                path: localFile.fd,
                file: {
                    size: localFile.size,
                    type: localFile.type
                },
                metadata: req.param('metadata'),
                source: req.param('source')
            };

            ops.push(Media.create(mObj).fetch());

        });

        //Resolve creation of all media
        Promise.all(ops)
            .then(
                function (newMedias) {
                    sails.log.silly("Media.create: [ " + util.inspect(_.pluck(newMedias, 'id')) + " ]");
                    return res.ok(newMedias);
                })
            .catch(
                function (err) {
                    sails.log.error("Media.create (error): " + util.inspect(err));
                    return res.serverError(err);
                });


    });

}
