const expect = require("chai").expect;

describe('User Model', function () {

    let user;

    beforeEach('Creating test user', async ()=>{
        user = await User.create({ email: 'testy.mctesterton@test.com', password: 'pass'}).fetch();
    });

    afterEach('Wiping test User', async ()=>{
        await User.destroy(user.id);
    });

    describe('Password Hash and UUID', function () {
        it('create should append a UUID and hash the password', async () => {
            expect(user).to.be.an('object');
            expect(user.uuid).to.be.a("string");
            expect(user.password).to.not.equal("pass");
        })
    });

    describe('Password re-hash on update', function () {
        it('should have a different hash after modifying password', async () => {
            expect(user.password).to.not.equal("pass");
            const preHash = user.password;
            const updatedUsers = await User.update(user.id).set({password: 'newpass'}).fetch();
            expect(updatedUsers).to.be.an('array'); // of one
            const updatedUser = updatedUsers[0];
            expect(updatedUser.password).to.be.a('string');
            expect(updatedUser.password).to.not.equal('newpass');
            expect(updatedUser.password).to.not.equal(preHash);
        })
    });


});
