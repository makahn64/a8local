/*********************************

 File:       authflow.test.js
 Function:   Tests full authentication flow
 Copyright:  AppDelegates LLC
 Date:       2019-09-20
 Author:     mkahn

 **********************************/

const request = require( 'supertest' );
const expect = require( "chai" ).expect;

describe( 'Authentication Flow', function () {

    describe( 'Login', function () {

        it( 'should return proper login response', function ( done ) {
            request( sails.hooks.http.app )
                .post( '/user/auth' )
                .expect( 'Content-Type', /json/ )
                .expect( 200 )
                .then( response => {
                    expect( response.body ).to.be.an( 'array' );
                    done();
                } )
                .catch( err => {
                    console.log( err );
                } )
        } );

        it( 'should return a LARGE array of venues', function ( done ) {
            request( sails.hooks.http.app )
                .get( '/venues?limit=1000' )
                .expect( 'Content-Type', /json/ )
                .expect( 200 )
                .then( response => {
                    expect( response.body ).to.be.an( 'array' );
                    done();
                } )
                .catch( err => {
                    console.log( err );
                } )
        } );


    });



} );
