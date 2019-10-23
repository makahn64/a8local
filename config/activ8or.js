/*********************************

 File:       activ8or.js
 Function:   Activ8or Specific Config
 Copyright:  AppDelegates LLC
 Date:       2019-09-23
 Author:     mkahn

 **********************************/

module.exports.activ8or = {
    // Useful for locating, especially when several Activ8or systems are in the activation
    systemName: 'Activ8or 001',
    locator: {
        port: 0xA8A8,
        enabled: true
    },

    // Database options
    storageModel: {
        // When this is false, only the UUID of a related model is stored vs. the fully denormalized entry (full population).
        // Setting this to true means slightly slower performance and no single-source of truth for an entity. However,
        // it does make the JSON documents essentially stand-alone. An alternative would be to just do a denormalized
        // export of the whole DB.
        denormalizeAll: false
    },

    api: {
        // Setting this to true will populate level 1 associations on an API call. If false, only an array of UUIDs is returned.
        // A query param of `populate=false` always overrides.
        populateOnFetch: true
    }


}
