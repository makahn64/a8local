/**
 * Media.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID');

module.exports = withUUID({

    attributes: {
        /**
         * These are all from ssexy Media
         */
        path: {
            type: 'string',
            isNotEmptyString: true,
        },

        relPath: {
            type: 'string'
        },

        flags: {
            type: 'json',
            defaultsTo: {"inappropriate": false, "favorite": false, "sticky": false}
        },

        file: {
            type: 'json',
            defaultsTo: {}
        },

        source: {
            type: 'string',
            defaultsTo: ''
        },

        metadata: {
            type: 'json',
            defaultsTo: {}
        },

        experience: {
            type: 'json'
        },

        markedForRemovalOn: {
            type: 'string'
        }

    },

    // TODO this needs to be seriously looked at
    /**
     * This method sends an array (contrary to docs), so it need to walk every item in the array.
     */
    afterDestroy: function (deletedRecords, next) {

        sails.log.silly('Media afterDestroy ' + util.inspect(deletedRecords));

        function rmFile(record) {

            return new Promise(function (fulfill, reject) {


                let destinationFolder = require('path').resolve(sails.config.paths.media);

                if (!record.path) fulfill();

                // Make sure it's within our media path
                else if (!_.startsWith(record.path, destinationFolder)) {
                    fulfill();
                } else {
                    SkipperDisk().rm(record.path, function (err) {
                        if (err) reject(err);
                        else fulfill();
                    });
                }
            });
        }

        function rmAllFiles(records) {
            return Promise.all(records.map(rmFile));
        }

        rmAllFiles(deletedRecords).then(function (results) {
            return next();
        }, function (err) {
            return next(new Error("destroy media path failed"));
        });

    },

    // Override toJSON instance method to remove path value. The path value
    // is an absolute filesystem path, something a hacker could make use of.
    customToJson: function () {

        const omitArray = [];

        if (sails.config.models.terse) {
            omitArray.push('path');
        }

        return _.omit(this, omitArray);

    }
});

