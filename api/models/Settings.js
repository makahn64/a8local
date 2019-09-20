/**
 * Settings.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


const _ = require( 'lodash' );

module.exports = {


    attributes: {

        key: {
            type:     'string',
            unique:   true,
            required: true
        },

        value: {
            type:       'json',
            defaultsTo: {}
        },


    },

    customToJSON: function () {

        // we are required to make a copy, per the docs
        const copy = _.cloneDeep( this );
        if ( copy.value.hasOwnProperty( 'password' ) ) {
            copy.value.password = "******";
        }

        return copy;
    }


};

