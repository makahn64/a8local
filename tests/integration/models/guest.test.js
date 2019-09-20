const expect = require("chai").expect;

describe('Guest Model', function () {

    let guest1, guest2, guest3;

    beforeEach('Creating test guests', async () => {
        await Guest.destroy({where: {'email': {contains: 'testy.mctesterton'}}});
        guest1 = await Guest.create({email: 'testy.mctesterton1@test.com'}).fetch();
        guest2 = await Guest.create({email: 'testy.mctesterton2@test.com'}).fetch();
        guest3 = await Guest.create({email: 'testy.mctesterton3@test.com'}).fetch();
    });

    describe('beforeCreate', function () {
        it('should append a UUID and registeredAt', async () => {
            expect(guest1).to.be.an('object');
            expect(guest1.uuid).to.be.a("string");
            expect(guest1.registeredAt).to.be.a("string");
        })
        it('should return a deifferent UUID for each guest', async () => {
            expect(guest1.uuid).to.not.equal(guest2.uuid);
            expect(guest2.uuid).to.not.equal(guest3.uuid);
        })
    });

});
