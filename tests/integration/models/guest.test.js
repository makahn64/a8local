const expect = require("chai").expect;

describe('Guest Model', function () {

    describe('beforeCreate', function () {
        it('should append a UUID and registeredAt', async () => {
            const guest = await Guest.create({ email: 'testy.mctesterton@test.com'}).fetch();
            expect(guest).to.be.an('object');
            expect(guest.uuid).to.be.a("string");
            expect(guest.registeredAt).to.be.a("string");
        })
        it('should return a differetnt UUID for each guest', async () => {
            const guest1 = await Guest.create({ email: 'testy.mctesterton1@test.com'}).fetch();
            const guest2 = await Guest.create({ email: 'testy.mctesterton2@test.com'}).fetch();
            expect(guest1.uuid).to.not.equal(guest2.uuid);
            expect(guest1.registeredAt).to.be.a("string");
        })
    });


});
