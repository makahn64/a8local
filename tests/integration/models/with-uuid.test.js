const expect = require("chai").expect;

describe('Test withUUID Wrapper', function () {
    describe('beforeCreate', function () {
        it('should return a different UUID for each Test model and execute the beforeCreate', async () => {
            const t1 = await Test.create({}).fetch();
            const t2 = await Test.create({}).fetch();
            expect(t1.uuid).to.not.equal(t2.uuid);
            // Make sure the model's beforeCreate is called (if any)
            expect(t1.test).to.be.a('string');
        })
        it('should not allow modification of UUID', async () => {
            const t1 = await Test.create({}).fetch();
            expect(t1.uuid).to.be.a('string');
            const updates = await Test.update({uuid: t1.uuid}).set({uuid: 'test'});
            const t1mod = await Test.findOne( { id: t1.id});
            expect(t1mod.uuid).to.be.equal(t1.uuid);
            // Make sure the model's beforeUpdate is called (if any)
            expect(t1mod.testUpdate).to.be.a('string');
        })
    });
});
