const expect = require( "chai" ).expect;
const modifiableParams = require('../../lib/models/modifiableParams');

const TEST_MODEL = {
    attributes: {
        uuid: {type: 'string'},
        id: {type: 'string'},
        createdAt: {type: 'string'},
        modifiedAt: {type: 'string'},
        legitFieldOne: {type: 'string'},
        legitFieldTwo: {type: 'string'}
    }
}

const MOCK_REQ = {
    allParams: () => ({uuid: 'abcd', id: '51aswe', createdAt: 'today', modifiedAt: 'tomorrow', legitFieldOne: 'one',
    legitFieldTwo: 'two'})
}

describe( 'Modifiable Params', function () {

        it( 'Returns the legit params to modify', function ( done ) {
            const mparams = modifiableParams(TEST_MODEL, MOCK_REQ);
            expect(mparams.uuid).to.be.undefined;
            expect(mparams.id).to.be.undefined;
            expect(mparams.createdAt).to.be.undefined;
            expect(mparams.modifiedAt).to.be.undefined;
            expect(mparams.legitFieldOne).to.be.equal('one');
            expect(mparams.legitFieldTwo).to.be.equal('two');
            done();
        } );

} );
