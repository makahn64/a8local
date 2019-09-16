const expect = require("chai").expect;

describe('Test withUUID Wrapper', function () {
    describe('beforeCreate', function () {
        it('should return a differetnt UUID for each Test model', async () => {
            const t1 = await Test.create({}).fetch();
            const t2 = await Test.create({}).fetch();
            expect(t1.uuid).to.not.equal(t2.uuid);
        })
    });
});
