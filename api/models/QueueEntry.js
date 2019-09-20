/**
 * Queue.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        experienceConfig: {
            type: 'json',
            required: true
        },

        metadata: {
            type: 'json',
            defaultsTo: {}
        },

        // Denormalized quest info
        guest: {
            type: 'json',
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

        if (!values.enteredQueueAt) {
            values.enteredQueueAt = new Date().toUTCString();
        }

        cb();

    },


    // TODO move to helpers, put in controller
    // /**
    //  *
    //  * Convenience method for counting entries in a Queue named [ xyz ]
    //  * See: https://sailsjs-documentation.readthedocs.org/en/latest/concepts/Models/
    //  *
    //  * @param queueName: obvious
    //  * @returns: promise
    //  */
    //
    // countForQueueNamed: function (queueName) {
    //
    //     var query = {};
    //
    //     if (queueName) {
    //         query = {queueName: queueName}
    //     }
    //
    //     return Queue.find(query).then(
    //         function (queue) {
    //
    //             var completed = 0;
    //             var placeholders = 0;
    //             queue.forEach(function (q) {
    //                 if (q.resolution == 'placeholder') {
    //                     placeholders++;
    //                 } else if (q.completed) {
    //                     completed++;
    //                 }
    //             });
    //
    //             //Yes, waiting can be computed by the client, but this is some convenience sugar [mak]
    //             return {
    //                 total: queue.length - placeholders,
    //                 completed: completed,
    //                 waiting: (queue.length - completed - placeholders)
    //             };
    //
    //         }
    //     );
    //
    // },
    //
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
