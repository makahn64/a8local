/**
 * Guest.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID')

module.exports = withUUID({

    attributes: {

        // Enforce model schema in the case of schemaless databases
        //schema: true,

        email: {
          type: 'string',
          unique: true,
          required: true,
          isEmail: true
        },

        firstName: {
            type: 'string',
            defaultsTo: ''
        },

        middleName: {
            type: 'string',
            defaultsTo: ''
        },

        lastName: {
            type: 'string',
            defaultsTo: ''
        },

        metadata: {
            type: 'json',
            defaultsTo: {}
        },

        //Added to keep synchronizer (uploader) info out of metadata which should be for the user
        syncdata: {
            type: 'json',
            defaultsTo: {}
        },

        /* We need this in a standard place for SMS notifiers */
        mobilePhone: {
            type: 'string',
            defaultsTo: ''
        },

        /* All of these could be shoved under the data field, but this standardizes them */

        legal: {
            type: 'json',
            defaultsTo: {}
        },

        address: {
            type: 'json',
            defaultsTo: {}
        },

        demographics: {
            type: 'json',
            defaultsTo: {}
        },

        //denormalized media object inserted here
        headshot: {
            type: 'json',
            defaultsTo: {}
        },

        avatar: {
            type: 'json',
            defaultsTo: {}
        },

        signature: {
            type: 'json',
            defaultsTo: {}
        },

        registeredAt: {
          type: 'string'
        }
    },

    // Lifecycle Callbacks
    beforeCreate: function (values, next) {

        // email is required so the check isn't needed, but it's protection against setting a field to not required
        if (values.email !== undefined) values.email = values.email.toLowerCase();

        // checks if registeredAt is passed in, if not set to currentTime
        if (!values.registeredAt) values.registeredAt = new Date().toUTCString();

        next();

    },

    beforeUpdate: function (values, next) {

        if (values.email !== undefined) values.email = values.email.toLowerCase();
        next();

    },

});

