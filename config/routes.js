/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    // Test endpoints. Should disable in production
    'GET /session/check': 'test/check-session',
    'GET /session/admin' : 'test/sysadmin-only', // runs through a policy to enforce ring 1 only
    'GET /session/nonadmin' : 'test/any-authenticated-user', // runs through a policy to enforce ring 1+

    // Auth
    'POST /auth/login': 'user/authenticate',
    'POST /auth/logout': 'user/logout',

    // Users
    'PATCH /user/:id/:action': 'user/user-actions'


};
