/*********************************

 File:       authentication.test.js
 Function:   Test Auth Flow
 Copyright:  AppDelegates LLC
 Date:       2019-09-20
 Author:     mkahn

 **********************************/

const session = require('supertest-session');
const request = require('supertest');
const expect = require("chai").expect;

const ADMIN_USER = {
    email: 'admin-test@test.com',
    password: 'auth_pass',
    firstName: 'Admin',
    lastName: 'McTestface',
    ring: 1
}

const REGULAR_USER = {
    email: 'dude-test@test.com',
    password: 'user_pass',
    firstName: 'Regularjoe',
    lastName: 'McTestface',
    ring: 2
}

let testSession = null;
let jwtRequest = null;

describe('Authentication Flow w/Sessions', function () {

    let adminUser, regularUser;

    before(`Creating users and logging out`, async function () {

        // Need the copies because the create function actually mutates the constants above (weird!)
        adminUser = await User.create({...ADMIN_USER}).fetch();
        regularUser = await User.create({...REGULAR_USER}).fetch();

        testSession = session(sails.hooks.http.app);

        const logout = await testSession
            .post('/auth/logout')
            .expect('Content-Type', /json/)
            .expect(200);

        console.log(`Logout complete`);

    });

    after(`Deleting users`, async function() {
        await User.destroy(adminUser.id);
        await User.destroy(regularUser.id);
    });

    describe('Blocked when not authenticated', function () {
        it('should return a forbidden (403) for non-admin', async function () {
            const nonAdminResponse = await testSession
                .get('/session/nonadmin')
                .expect(403);
        });
        it('should return a forbidden (403) for admin', async function () {
            const nonAdminResponse = await testSession
                .get('/session/admin')
                .expect(403);
        });
    });

    describe('Full access when admin authenticated', function () {

        before(`Logging in as admin`, async function () {
            const login = await testSession
                .post('/auth/login')
                .send({email: ADMIN_USER.email, password: ADMIN_USER.password})
                .expect('Content-Type', /json/)
                .expect(200);

            console.log(`Login complete`);
        });

        after(`Logging out admin`, async function () {
            const logout = await testSession
                .post('/auth/logout')
                .expect('Content-Type', /json/)
                .expect(200);
        });

        it('should return a 200 for non-admin', async function () {
            const nonAdminR = await testSession
                .get('/session/nonadmin')
                .expect(200);
        });
        it('should return a return a 200 for admin', async function () {
            const adminR = await testSession
                .get('/session/admin')
                .expect(200);
        });
    });

    describe('Partial access when regular user authenticated', function () {

        before(`Logging in as regular user`, async function () {
            const login = await testSession
                .post('/auth/login')
                .send({email: REGULAR_USER.email, password: REGULAR_USER.password})
                .expect('Content-Type', /json/)
                .expect(200);

            console.log(`Login complete`);
        });

        after(`Logging out regular user`, async function () {
            const logout = await testSession
                .post('/auth/logout')
                .expect('Content-Type', /json/)
                .expect(200);
        });

        it('should return a 200 for non-admin', async function () {
            const nonAdminR = await testSession
                .get('/session/nonadmin')
                .expect(200);
        });
        it('should return a return a 403 for admin', async function () {
            const adminR = await testSession
                .get('/session/admin')
                .expect(403);
        });
    });

});

describe('Authentication Flow w/JWT', function () {

    let adminUser, regularUser, adminToken, userToken;

    before(`Creating users and logging out`, async function () {

        // Need the copies because the create function actually mutates the constants above (weird!)
        adminUser = await User.create({...ADMIN_USER}).fetch();
        regularUser = await User.create({...REGULAR_USER}).fetch();

        jwtRequest = request(sails.hooks.http.app); // regular, non-session

        const logout = await jwtRequest
            .post('/auth/logout')
            .expect('Content-Type', /json/)
            .expect(200);

        console.log(`Logout complete`);

    });

    after(`Deleting users`, async function() {
        await User.destroy(adminUser.id);
        await User.destroy(regularUser.id);
    });

    describe('Blocked when not authenticated', function () {
        it('should return a forbidden (403) for non-admin', async function () {
            const nonAdminResponse = await jwtRequest
                .get('/session/nonadmin')
                .expect(403);
        });
        it('should return a forbidden (403) for admin', async function () {
            const nonAdminResponse = await jwtRequest
                .get('/session/admin')
                .expect(403);
        });
    });

    describe('Full access when admin authenticated', function () {

        before(`Logging in as admin`, async function () {
            const login = await jwtRequest
                .post('/auth/login')
                .send({email: ADMIN_USER.email, password: ADMIN_USER.password})
                .expect('Content-Type', /json/)
                .expect(200);

            adminToken = login.body.token;
            console.log(`Login complete`);
        });

        after(`Logging out admin`, async function () {
            const logout = await jwtRequest
                .post('/auth/logout')
                .expect('Content-Type', /json/)
                .expect(200);

            adminToken = null;
        });

        it('should return a 200 for non-admin', async function () {
            const nonAdminR = await jwtRequest
                .get('/session/nonadmin')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
        });
        it('should return a return a 200 for admin', async function () {
            const adminR = await jwtRequest
                .get('/session/admin')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);
        });
    });

    describe('Partial access when regular user authenticated', function () {

        before(`Logging in as regular user`, async function () {
            const login = await jwtRequest
                .post('/auth/login')
                .send({email: REGULAR_USER.email, password: REGULAR_USER.password})
                .expect('Content-Type', /json/)
                .expect(200);

            userToken = login.body.token;
            console.log(`Login complete`);
        });

        after(`Logging out regular user`, async function () {
            const logout = await jwtRequest
                .post('/auth/logout')
                .expect('Content-Type', /json/)
                .expect(200);

            userToken = null;
        });

        it('should return a 200 for non-admin', async function () {
            const nonAdminR = await jwtRequest
                .get('/session/nonadmin')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(200);
        });
        it('should return a return a 403 for admin', async function () {
            const adminR = await jwtRequest
                .get('/session/admin')
                .set('Authorization', `Bearer ${userToken}`)
                .expect(403);
        });
    });

});
