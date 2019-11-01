/**
 * DataObject.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID');

module.exports = withUUID({

    attributes: {

        key: {
            type: 'string'
        },

        value: {
          type: 'json'
        }

    }

});

