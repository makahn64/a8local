/*********************************

 File:       ExperienceConfigDefaults.js
 Function:   Default values for Experience Configs
 Copyright:  AppDelegates LLC
 Date:       2019-10-24
 Author:     mkahn

 **********************************/

module.exports = {
    queues: {
        maxLength: 0, // no limit
        notificationMethods: ['sms', 'email'],
        shouldNotify: false, // by default do not use
        leadTimeForNotifications: 10 // minutes based on queue calculations
    }
}
