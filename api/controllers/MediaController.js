/**
 * MediaController
 *
 * @description :: Server-side actions for handling incoming requests for Media
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const destinationFolder = require('path').resolve(sails.config.paths.media);
const SkipperDisk = require('skipper-disk');


const uploadOptions = {
    dirname: destinationFolder,
    maxBytes: 10 * 1024 * 1024
};

function killMediaArrayThenRespond(array, response, count) {
    if (array.length) {
        Media.destroy(array[0].id).then(function (data) {
            array.splice(0, 1);
            killMediaArrayThenRespond(array, response, count + 1);
        }, response.negotiate);
    }
    else {
        response.ok("Successfully deleted " + count + " media");
    }
}

module.exports = {

    /**
     * Static method to count the # of records
     * @param req
     * @param res
     */
    count: function (req, res) {

        if (req.method !== 'GET') {
            return res.badRequest("Must use GET");
        }

        const params = req.allParams();
        let query = {};

        //Count in time window
        if (params.start && params.end) {

            query = {
                createdAt: {'<=': new Date(params.end), '>': new Date(params.start)}
            };
        }

        Media.count(query)
            .then(function (count) {
                return res.ok({count: count});
            })
            .catch(res.serverError)

    },

    /*
     uploads a file and creates it as a Media instance, not normally used directly. Each model will have uploaders of
     the media they need.
     */
    upload: async (req, res) => {

        try {
            const type = req.param('type') || "usermedia";
            const newMedia = await MediaService.uploadOneMedia(req, type);
            return res.ok(newMedia);
        } catch (err){
            return res.serviceError(err);
        }

    },

    // Split off by MAK pulled from Wandr
    uploadMultiple: function (req, res) {

        if (req.method !== 'POST') {
            return res.badRequest({error: "Must use POST"});
        }

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


    },


    download: function (req, res) {

        // This will spit out a bad request via req.bad_request
        // http://sailsjs.org/#!/documentation/reference/res/res.badRequest.html
        if (req.method!=='GET') return res.badRequest({error: 'badVerb'});

        const mediaId = req.param('id');
        if (!mediaId) res.badRequest({error: 'no media ID'});

        Media.findOne(mediaId)
            .then(media => {

                    /**
                     * Throw errors if
                     * 1: path is empty
                     * 2: file doesn't exist
                     * 3: error on read
                     */

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
            )
            .catch(res.serverError)

    },


// TODO: This is very dangerous in Asahi. Maybe we should remove?
    deleteAllEntries: function (req, res) {
        if (req.method !== "DELETE") {
            res.badRequest({error: 'bad verb'});
            return;
        }
        Media.find().then(function (data) {
            killMediaArrayThenRespond(data, res, 0);
        }, res.serverError);

    }
}

