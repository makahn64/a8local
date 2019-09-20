/**
 * User
 *
 * @module      :: Model
 * @description :: This is the base user model
 * @docs        :: http://waterlock.ninja/documentation
 */

const withUUID = require('../../lib/models/withUUID');

const processUserUpdates = async (values, proceed) => {
    if (values.email) values.email = values.email.toLowerCase();
    try {
        values.password = await AuthService.hashPassword(values.password);
        proceed();
    } catch (err) {
        proceed(err); // probably never happen...
    }
}

module.exports = withUUID({

    attributes: {

        email: {
            type: 'string',
            isEmail: true,
            unique: true,
            required: true
        },

        password: {
            type: 'string',
            required: true
        },

        ring: {
            type: 'number',
            defaultsTo: 1
        },

        // Not normally used for Activ8or, but who knows, maybe you fired a brand ambassador mid-event :S
        blocked: {
            type: 'boolean',
            defaultsTo: false
        },

        firstName: {
            type: 'string',
            defaultsTo: ''
        },

        lastName: {
            type: 'string',
            defaultsTo: ''
        },

        // Just because we might need it
        metadata: {
            type: 'json',
            defaultsTo: {}
        },

        /* We need this for SMS notifiers */
        mobilePhone: {
            type: 'string'
        },

        registeredAt: {
            type: 'string'
        },

        lastLoginAt: {
            type: 'string'
        }

    },

    beforeCreate: processUserUpdates,
    beforeUpdate: processUserUpdates,

    customToJSON:  () => {
        // Return a shallow copy of this record with the password removed.
        return _.omit(this, ['password'])
    }

});
