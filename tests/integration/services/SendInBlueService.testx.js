const request = require( 'supertest' );
const expect = require( "chai" ).expect;


describe( 'SendInBlueService: SiB Email Automation Services', function () {

    describe( 'Get Various Account Infos', function () {
        it( 'should return Account JSON',  function ( done ) {
            SendInBlueService.getAccount()
                .then( accountJson => {
                    expect(accountJson).to.be.an('object');
                    return done();
                });

        } );

        it('should return available Lists', function (done) {
            SendInBlueService.getLists()
                .then( listJson => {
                    expect(listJson).to.be.an('object');
                    return done();
                })
        });

        it('should return new_alpha_user List Obj', function (done) {
            SendInBlueService.getListObjectForListNamed("invite_to_alpha")
                .then(listJson => {
                    expect(listJson).to.be.an('object');
                    return done();
                })
        });

        it('should add a first time user contact', function (done) {
            SendInBlueService.addFirstTimeUser({ name: "Jonny Newuser4", email: "mitch+jn4@hrbr.io"})
                .then( resp  => {
                    expect(resp).to.be.an('object');
                    return done();
                })
                .catch( err => {
                    console.log(err);
                    return done();
                })
        });


    } );


} );