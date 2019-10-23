/**
 * Test.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const withUUID = require('../../lib/models/withUUID')

module.exports = withUUID({
  attributes: {},
  beforeCreate: (values, proceed) => {
    values.test = new Date().toUTCString();
    proceed();
  },
  beforeUpdate: (values, proceed) => {
    values.testUpdate = new Date().toUTCString();
    proceed();
  }
});

