const expect = require( "chai" ).expect;

const LEGAL_JSON_OBJ = '{ "name":"Mitch" }';
const ILLEGAL_JSON_OBJ = '{ "name":"Mitch }';

describe( 'Helpers', function () {

    describe( 'Suspect JSON to Object Helper', function () {
        it( 'Returns a legal object from legal JSON', function ( done ) {
            let legalObj = sails.helpers.stringToJson(LEGAL_JSON_OBJ);
            expect(legalObj).to.be.an('object');
            expect(legalObj.name).to.equal("Mitch");
            done();
        } );

        it( 'Returns a default legal object from illegal JSON', function ( done ) {
            let legalObj = sails.helpers.stringToJson( ILLEGAL_JSON_OBJ );
            expect( legalObj ).to.be.an( 'object' );
            done();
        } );

        it( 'Returns a default PASSED legal object from illegal JSON', function ( done ) {
            let legalObj = sails.helpers.stringToJson( ILLEGAL_JSON_OBJ, { legal: true } );
            expect( legalObj ).to.be.an( 'object' );
            expect( legalObj.legal ).to.equal( true );
            done();
        } );

        it( 'Returns a default PASSED null from illegal JSON', function ( done ) {
            let legalObj = sails.helpers.stringToJson( ILLEGAL_JSON_OBJ, null );
            expect( legalObj ).to.equal( null );
            done();
        } );

    } );



} );