/**
 * Queue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const moment = require('moment');

module.exports = {

    attributes: {

        experienceConfigKey: {
            type: 'string',
            required: true
        },

        eperienceConfig: {
            type: 'json'
        },

        // UUID of guest
        guestUUID: {
            type: 'string',
            required: true
        },

        enteredQueueAt: {
            type: 'string'
        },

        completedQueueAt: {
            type: 'string'
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

    // /**
    //  * Method to get the wait time for an entry
    //  *
    //  */
    //
    // getWaitTime: function () {
    //
    //   var waitTime = 0;
    //   if (this.completed != 0) {
    //     waitTime = parseInt(this.completed - this.started);
    //
    //   } else {
    //     waitTime = parseInt(Date.now() - this.started);
    //   }
    //
    //   return waitTime;
    //
    // },

    //Automagically calculate wait time for this queue object

    // TODO move this to helper
    //   toJSON: function () {
    //
    //     var obj = this.toObject();
    //
    //     obj['waitTime'] = this.getWaitTime();
    //
    //     return obj;
    //
    //   }
    // },


    beforeCreate: function (values, cb) {
        if (!values.enteredQueueAt) values.enteredQueueAt = new Date().toUTCString();
        cb();
    },

    waitTime: function (queueEntry, format = 'milliseconds') {
        const now = moment();
        const entered = moment(queueEntry.enteredQueueAt);
        return now.diff(entered, format);
    },

    countForExperience: (experienceConfigKey, waitingOnly = true) => {
        return QueueEntry.count({
            where: {
                experienceConfigKey: experienceConfigKey,
                completedQueueAt: {'!=': !waitingOnly}
            }
        })
    }


    // /**
    //  *
    //  * Convenience method for popping the oldest uncompleted entry in a Queue named [ xyz ]
    //  * See: https://sailsjs-documentation.readthedocs.org/en/latest/concepts/Models/
    //  *
    //  * @param options: options.queueName, options.resolution
    //  * @param cb
    //  */
    //
    // topOfQueueNamed: function (queueName) {
    //
    //     return Queue.find({
    //         where: {queueName: queueName, completed: 0, resolution: ""},
    //         limit: 1,
    //         sort: 'started ASC'
    //     });
    //
    //
    // },
    //
    //
    // /**
    //  *
    //  * Convenience method for popping the oldest entry in a Queue named [ xyz ]
    //  * See: https://sailsjs-documentation.readthedocs.org/en/latest/concepts/Models/
    //  *
    //  * @param options: options.queueName, options.resolution
    //  * @param cb
    //  */
    // popFromQueueNamed: function (options) {
    //
    //
    //     return Queue.topOfQueueNamed(options.queueName)
    //         .then(function (result) {
    //             if (result.length > 0) {
    //                 var topQ = result[0];
    //                 sails.log.debug("Options Resolution: " + options.resolution);
    //                 topQ.resolution = options.resolution || 'completed';
    //                 topQ.completed = Date.now();
    //                 return topQ.save(); //return the promise of saving
    //
    //             } else {
    //                 return result; //no more work, return the value
    //             }
    //         });
    //
    //
    // }

};
