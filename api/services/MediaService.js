/*********************************

 File:       MediaService.js
 Function:   Handles Common Media Tasks
 Copyright:  AppDelegates LLC
 Date:       2019-03-18
 Author:     mkahn



 **********************************/

const Promise = require('bluebird');
const destinationRootFolder = require('path').resolve(sails.config.paths.media);
const ServiceResponseError = require('../../lib/errors').ServiceResponseError;
//const SkipperDisk = require('skipper-disk');
const path = require('path');


const uploadPromise = (req, type="clientmedia") => {

    const uploadOptions = {
        dirname: `${destinationRootFolder}/${type}`,
        maxBytes: 10 * 1024 * 1024
    };

    return new Promise((resolve, reject) => {
        req.file('file').upload(uploadOptions, (err, uploadedFiles) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(uploadedFiles);
            }
        })
    });
}

// All errors must be caught in controller
const uploadOneMedia = async (req, type="clientmedia") => {

    const uploadedFiles = await uploadPromise(req, type);

    // If no files were uploaded, respond with an error.
    if ((uploadedFiles === undefined) || (uploadedFiles.length === 0)) {
        throw new ServiceResponseError({
            message: "No file attached",
            code: 406
        });
    }

    sails.log.silly("Processing uploaded file.");
    const localFile = uploadedFiles[0];

    let metaObj;

    if (req.param('metadata') && _.isString(req.param('metadata'))) {
        metaObj = JSON.parse(req.param('metadata'));
    } else if (req.param('metadata') && _.isObject(req.param('metadata'))) {
        metaObj = req.param('metadata');
    }

    const relPath = `/${type}/${path.basename(localFile.fd)}`;

    const mObj = {
        path: localFile.fd,
        relPath,
        file: {
            size: localFile.size,
            type: localFile.type
        },
        metadata: metaObj,
        source: req.param('source')
    };

    const newMedia = await Media.create(mObj).fetch();
    if (!newMedia)
        throw new ServiceResponseError({
            message: "Unexpected error creating media",
            code: 406
        });

    sails.log.silly("Media.create: [ " + newMedia.id + " ]");
    return newMedia;

};


module.exports = {

    uploadOneMedia

}
