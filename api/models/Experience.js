/**
 * Experience.js
 *
 * @description :: Represents a single experience by one or more guests
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID');

module.exports = withUUID({

    attributes: {

        // Denormalized experience config. This is populated in the ExperienceController
        experienceConfig: {
            type: 'json'
        },

        // Denormalized event object
        event: {
            type: 'json'
        },

        // Array of denormalized guest objects.
        guests: {
            type: 'json'
        },

        // Array of denormalized media objects
        media: {
            type: 'json'
        },

        //indicates this experience is done, and can be completed (i.e. email, sms sent to guest)
        completed: {
            type: 'boolean',
            defaultsTo: false
        },

        //Whatever you want: scores, etc.
        metadata: {
            type: 'json'
        },

        // Log of whether the completions called for the in the ExperienceConfig have actually happened or errored
        completionsLog: {
            type: 'json',
            defaultsTo: []
        },

        // UTC time string
        experiencedAt: {
            type: 'string'
        }

    },

    beforeCreate: function (values, next) {
        if (!values.experiencedAt) values.experiencedAt = new Date().toUTCString();
        next();
    }

});

