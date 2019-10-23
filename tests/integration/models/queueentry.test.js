/*********************************

 File:       queueentry.test.js
 Function:   Testing Queue Entry
 Copyright:  AppDelegates LLC
 Date:       2019-10-05
 Author:     mkahn

 **********************************/

const request = require('supertest');
const expect = require("chai").expect;

const TEST_EXPERIENCE_CONFIG = {
    name: "Super Popular Long Lines",
    key: "SPLL"
}

const GUEST_ONE = {
    firstName: "Freddy",
    lastName: "Test",
    email: "gc1@test.com"
}

const GUEST_TWO = {
    firstName: "Freddy2",
    lastName: "Test",
    email: "gc2@test.com"
}

const GUEST_THREE = {
    firstName: "Freddy3",
    lastName: "Test",
    email: "gc3@test.com"
};

const fartAbout = delayMs => new Promise( res => {
    setTimeout(res, delayMs);
});

describe('QueueEntry', function () {

    let guestOne, guestTwo, guestThree, texpConfig;
    let qentry1, qentry2, qentry3;

    before('Setting up guests, experience configs', async function () {

        expConfig = await ExperienceConfig.create(TEST_EXPERIENCE_CONFIG).fetch();
        guestOne = await Guest.create(GUEST_ONE).fetch();
        guestTwo = await Guest.create(GUEST_TWO).fetch();
        guestThree = await Guest.create(GUEST_THREE).fetch();

        qentry1 = await QueueEntry
            .create({ experienceConfigKey: TEST_EXPERIENCE_CONFIG.key, guestUUID: guestOne.uuid })
            .fetch();
        qentry2 = await QueueEntry
            .create({ experienceConfigKey: TEST_EXPERIENCE_CONFIG.key, guestUUID: guestTwo.uuid })
            .fetch();
        qentry3 = await QueueEntry
            .create({ experienceConfigKey: TEST_EXPERIENCE_CONFIG.key, guestUUID: guestThree.uuid })
            .fetch();

    });

    after('Tidying up', async function () {
        await ExperienceConfig.destroy(expConfig.id);
        await Guest.destroy(guestOne.id);
        await Guest.destroy(guestTwo.id);
        await Guest.destroy(guestThree.id);
        await QueueEntry.destroy([qentry1.id, qentry2.id, qentry3.id]);
    });


    describe('Model Methods', function () {

        it('should provide a valid integer wait time', async () => {
            await fartAbout(1500);
            const waitTime = QueueEntry.waitTime(qentry1);
            expect(waitTime).to.be.a('number');
            expect(waitTime).to.be.above(1000);
        });

        it('should provide a valid integer queue length', async () => {
            const waiters = await QueueEntry.countForExperience(TEST_EXPERIENCE_CONFIG.key);
            expect(waiters).to.be.a('number');
            expect(waiters).to.be.equal(3);
        });


    });



});
