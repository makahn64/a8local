const request = require( 'supertest' );
const expect = require( "chai" ).expect;
const EmailService = require('../../../api/services/EmailService');


describe( 'EmailService: WX Email Services', function () {

    describe( 'Various Email Types', function () {


        it( 'should send a invite email', function(done) {
            EmailService.inviteTo({ email: 'mitch@appdelegates.com', entityName: 'Bertco Transoceanic', entityType: 'organization'});
        })

    } );


} );
