/**
 * ExperienceConfig.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID');

module.exports = withUUID({

  attributes: {

    // Full name like "Bob's Bouncy House"
    name: {
      type: 'string',
      required: true
    },

    // Key used to identify/link this experience config when posting up an Experience object. Using the example above
    // something like 'BBH' might be a good key. Must be unique.
    key: {
      type: 'string',
      unique: true,
      required: true
    },

    // An array of "completions" such as email, sms. Activ8or will periodically run a cron job that grabs completed
    // Experiences and performs the requested completion.
    completions: {
      type: 'json',
      defaultsTo: []
    },

    // object with substitutions for words/phrases to populate in emails/sma based on the venue
    responseSubstitutions: {
      type: 'json'
    },


  },

});

