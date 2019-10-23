/**
 * Media.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID');
const fs = require('fs').promises;

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

    afterDestroy: function (deletedMedia, next) {

        const {uuid, path} = deletedMedia;

        sails.log.silly(`Remove file for media ${uuid}`);

        async function doDelete(){
            try {
                await fs.unlink(path);
                sails.log.silly(`Delete of ${path} confirmed`);
            } catch (e) {
                sails.log.error(`Delete of ${path} confirmed failed!`);
                sails.log.error(e.message);
            } finally {
                next();
            }
        }

        doDelete();

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

