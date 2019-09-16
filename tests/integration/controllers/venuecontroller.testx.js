const request = require( 'supertest' );
const expect = require( "chai" ).expect;
const util = require( 'util' );
const Promise = require( 'bluebird' );
const _ = require('lodash');



 describe( 'VenueController', function () {

     describe( 'GET Functions', function () {

         // This will be limited to 30 by the default blueprint settings
         it( 'should return an array of venues', function ( done ) {
             request( sails.hooks.http.app )
                 .get( '/venues' )
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
