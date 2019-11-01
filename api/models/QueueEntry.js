/**
 * Queue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const moment = require('moment');
const withUUID = require('../../lib/models/withUUID');


module.exports = withUUID({

    attributes: {

        experienceConfigKey: {
            type: 'string',
            required: true
        },

        experienceConfig: {
            type: 'json'
        },

        // UUID of guest
        guestUUID: {
            type: 'string',
            required: true
        },

        guest: {
            type: 'json'
        },

        // these need to be timestamps for sorting
        enteredQueueAt: {
            type: 'number'
        },

        completedQueueAt: {
            type: 'number'
        },

        resolution: {
            type: 'string'
        },

        hasBeenNotified: {
            type: 'boolean',
            defaultsTo: false
        },

        metadata: {
            type: 'json',
            defaultsTo: {}
        }

    },

    beforeCreate: function (values, cb) {
        if (!values.enteredQueueAt) values.enteredQueueAt = new Date().getTime();
        cb();
    },

    waitTime: function (queueEntry, format = 'milliseconds') {
        const now = moment();
        const entered = moment(queueEntry.enteredQueueAt);
        return now.diff(entered, format);
    },

    countForExperience: async (experienceConfigKey, waitingOnly = true) => {
        return await QueueEntry.count({
            where: {
                experienceConfigKey,
                completedQueueAt: {'!=': !waitingOnly}
            }
        })
    },

    frontOfLine: async (experienceConfigKey) => {
        const top = QueueEntry.find({ where: { completedQueueAt: {'!=': true},
                experienceConfigKey}}).sort('enteredQueueAt ASC').limit(1);
        if (top.length) return top[0];
        return null;
    }

});
