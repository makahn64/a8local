/**
 * Event.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID');

module.exports = withUUID({

    attributes: {

        eventName: {
            type: 'string',
            required: true
        },

        startDate: {
            type: 'string'
        },

        endDate: {
            type: 'string'
        },

        metadata: {
            type: 'json'
        },

        // Denormalized venue for the event
        venue: {
            type: 'json'
        },

        // object with substitutions for words/phrases to populate in emails/sma based on the venue
        responseSubstitutions: {
            type: 'json'
        }

    }

});

