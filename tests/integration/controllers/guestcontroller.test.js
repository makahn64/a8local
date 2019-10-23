const request = require('supertest');
const expect = require("chai").expect;

const TEST_EXPERIENCE_CONFIG = {
    name: "Bob's Test Bouncy House",
    key: "TBBH"
}

const GUEST_ONE = {
    firstName: "Freddy",
    lastName: "Test",
    email: "gc@test.com"
}

describe('GuestController', function () {

    let guestOne, experienceOne, experienceTwo, expConfig, testExp1;

    before('Setting up guests, experiences', async function () {

        expConfig = await ExperienceConfig.create(TEST_EXPERIENCE_CONFIG).fetch();
        experienceOne = await Experience.create({
            experienceConfig: TEST_EXPERIENCE_CONFIG.key,
            metadata: {tag: 'One time'}
        }).fetch();
        experienceTwo = await Experience.create({
            experienceConfig: TEST_EXPERIENCE_CONFIG.key,
            metadata: {tag: 'Two time'}
        }).fetch();
        guestOne = await Guest.create({...GUEST_ONE, experiences: [experienceOne.uuid, experienceTwo.uuid]}).fetch();

    });

    after('Tidying up', async function () {
        await ExperienceConfig.destroy(expConfig.id);
        await Experience.destroy(experienceOne.id);
        await Experience.destroy(experienceTwo.id);
        await Experience.destroy(testExp1.id);
        await Guest.destroy(guestOne.id);
    });


    describe('GET Functions', function () {

        // This will be limited to 30 by the default blueprint settings
        it('should a guest with experiences populated', function (done) {
            request(sails.hooks.http.app)
                .get(`/guests/${guestOne.uuid}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).to.be.an('object');
                    const populatedGuest = response.body;
                    expect(populatedGuest.experiences).to.be.an('array');
                    expect(populatedGuest.experiences.length).to.equal(2);
                    expect(populatedGuest.experiences[0]).to.be.an("object");
                    expect(populatedGuest.experiences[0].metadata.tag).to.equal('One time');
                    expect(populatedGuest.experiences[1]).to.be.an("object");
                    expect(populatedGuest.experiences[1].metadata.tag).to.equal('Two time');
                    done();
                })
                .catch(err => {
                    console.log(err);
                })
        });
    });

    describe('PATCH functions', function() {

        it('should add an experience to a guest', function (done) {
            request(sails.hooks.http.app)
                .patch(`/guests/${guestOne.uuid}/experience`)
                .send({ configKey: 'BBH', metadata: { tag: 'mocha'}})
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).to.be.an('object');
                    const populatedGuest = response.body;
                    expect(populatedGuest.experiences).to.be.an('array');
                    expect(populatedGuest.experiences.length).to.equal(3);
                    expect(populatedGuest.experiences[0]).to.be.an("object");
                    expect(populatedGuest.experiences[0].metadata.tag).to.equal('One time');
                    expect(populatedGuest.experiences[1]).to.be.an("object");
                    expect(populatedGuest.experiences[1].metadata.tag).to.equal('Two time');
                    expect(populatedGuest.experiences[2]).to.be.an("object");
                    expect(populatedGuest.experiences[2].metadata.tag).to.equal('mocha');
                    testExp1 = populatedGuest.experiences[2];
                    done();
                })
                .catch(err => {
                    console.log(err);
                })
        });

    });

    describe('DELETE functions', function() {

        it('should remove an experience from a guest', function (done) {
            request(sails.hooks.http.app)
                .delete(`/guests/${guestOne.uuid}/experience/${testExp1.uuid}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).to.be.an('object');
                    const populatedGuest = response.body;
                    expect(populatedGuest.experiences).to.be.an('array');
                    expect(populatedGuest.experiences.length).to.equal(2);
                    expect(populatedGuest.experiences[0]).to.be.an("object");
                    expect(populatedGuest.experiences[0].metadata.tag).to.equal('One time');
                    expect(populatedGuest.experiences[1]).to.be.an("object");
                    expect(populatedGuest.experiences[1].metadata.tag).to.equal('Two time');
                    done();
                })
                .catch(err => {
                    console.log(err);
                })
        });

    });

});
