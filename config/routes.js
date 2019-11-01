/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const serveStatic = require('serve-static')
const path = require('path');
// For some reason, sails appends /:url to the end of this path
const mediaDir = path.normalize(`${__dirname}/../assets`);

module.exports.routes = {

    // Serves /assets/media
    'GET /media/*': {
        fn: serveStatic(mediaDir)
    },

    // Serves /assets/clientmedia
    'GET /clientmedia/*': {
        fn: serveStatic(mediaDir)
    },

    // Serves /assets/usermedia
    'GET /usermedia/*': {
        fn: serveStatic(mediaDir)
    },

    // Test endpoints. Should disable in production
    'GET /session/check': 'test/check-session',
    'GET /session/admin' : 'test/sysadmin-only', // runs through a policy to enforce ring 1 only
    'GET /session/nonadmin' : 'test/any-authenticated-user', // runs through a policy to enforce ring 1+

    // Auth
    'POST /auth/login': 'user/authenticate',
    'POST /auth/logout': 'user/logout',

    // Users
    'PATCH /user/:id/:action': 'user/user-actions',


    // Guests
    'GET /guests/:uuid': 'guest/find-guest-by-uuid',
    'DELETE /guests/:uuid': 'guest/delete-guest-by-uuid',
    'PATCH /guests/:uuid': 'guest/modify-guest-by-uuid',
    // TODO? Partial replacement?
    //'PUT /guests/:uuid': 'guest/modify-guest-by-uuid',

    // upload an experience for a specific guest
    'PATCH /guests/:guuid/experience': 'experience/upload-to-guest',
    'PATCH /guests/:guuid/experience/:euuid': 'experience/attach-to-guest',
    'DELETE /guests/:guuid/experience/:euuid': 'experience/remove-from-guest',
    'POST /guests/:guuid/enqueue/:eKeyOrUuid': 'queueentry/enqueue-guest',
    'POST /guests/:guuid/dequeue/:eKeyOrUuid': 'queueentry/dequeue-guest',
    'GET /guests/:guuid/queueentries': 'queueentry/find-qentries-for-guest',
    'GET /guests/:guuid/qentries': 'queueentry/find-qentries-for-guest',


    // ExperienceConfig
    'GET /experienceconfigs/:uuid': 'experienceConfig/find-experience-config-by-uuid',
    'DELETE /experienceconfigs/:uuid': 'experienceConfig/delete-experience-config-by-uuid',
    'PATCH /experienceconfigs/:uuid': 'experienceConfig/modify-experience-config-by-uuid',

    // Experiences
    'GET /experiences/:uuid': 'experience/find-experience-by-uuid',
    'DELETE /experiences/:uuid': 'experience/delete-experience-by-uuid',
    'PATCH /experiences/:uuid': 'experience/modify-experience-by-uuid',
    'GET /experiences': 'experience/find-all-experiences-populated',

    // Media
    'POST /media': 'media/media-upload',
    'GET /media/download/:id': 'media/media-download',
    'GET /media/:uuid': 'media/find-media-by-uuid',
    'DELETE /media/:uuid': 'media/delete-media-by-uuid',
    'PATCH /media/:uuid': 'media/modify-media-by-uuid',

    // Settings
    'GET /settings/:keyOrUuid': 'settings/find-settings',
    'DELETE /settings/:keyOrUuid': 'settings/delete-settings',
    'PUT /settings/:keyOrUuid': 'settings/modify-settings',
    'GET /overlay': 'settings/overlay-test',

    // Q Entries
    'GET /queues/all' : 'queueentry/find-all-q-entries',

    'GET /queueentry/:uuid': 'queueentry/find-qentry-by-uuid',
    'DELETE /queueentry/:uuid': 'queueentry/delete-qentry-by-uuid',
    'PATCH /queueentry/:uuid': 'queueentry/modify-qentry-by-uuid',
    'PATCH /queueentry/:uuid/dequeue': 'queueentry/dequeue-qentry-by-uuid',
    'PATCH /queueentry/:uuid/requeue': 'queueentry/re-enqueue-qentry-by-uuid',
    // synonym
    'PATCH /queueentry/:uuid/reenqueue': 'queueentry/re-enqueue-qentry-by-uuid'


};
