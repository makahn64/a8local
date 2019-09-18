/**
 * Venue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: 'true'
    },

    logo: {
      model: 'media'
    },

    // object with substitutions for words/phrases to populate in emails/sma based on the venue
    responseSubstitutions: {
      type: 'json'
    },

    /* subvenue information should now go here */
    metadata: {
      type: 'json',
      defaultsTo: {}
    }


  },

};

