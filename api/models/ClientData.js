/**
 * ClientData.js
 *
 * @description :: Whatever random data you may want to save for a client
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID');

module.exports = withUUID({

  attributes: {

    data: {
      type: 'json',
      defaultsTo: {}
    },

    key: {
      type: 'string'
    }

  }

});

