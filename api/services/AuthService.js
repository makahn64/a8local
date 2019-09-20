/*********************************

 File:       AuthService.js
 Function:   Security Helpers
 Copyright:  AppDelegates
 Date:       5/22/2019
 Author:     mkahn

 **********************************/

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const jwt = require( 'jsonwebtoken' );
const _ = require( 'lodash' );
// For extra security, overwrite this in environment files or local.js
const JWT_SECRET = sails.config.security.jwtSecret;


/**
 * Creates a JWT using the passed in user object and optional expiry
 * @param user
 * @param expiry
 * @returns {String}
 */
function makeJwt(user, expiry = '1y'){
    return jwt.sign({user}, JWT_SECRET, {expiresIn: expiry})
}

/**
 * Verifies that a JWT is validly signed and not expired. Does NOT check if user still has account, etc.
 * @param tokenParts
 * @returns {Promise.<Object>}
 */
async function verifyJwt( tokenParts ){

    return new Promise( (resolve, reject) => {

        jwt.verify(tokenParts, JWT_SECRET, function (err, decoded) {

            if (err) {
                reject(err)
            } else {
                if ((Date.now() / 1000) > decoded.exp) {
                    reject(new Error('token expired'));
                } else {
                    // passes all basic tests.
                    resolve(decoded);
                }
            }
        });

    } )
}

const hashPassword = clearTextPassword => bcrypt.hash(clearTextPassword, SALT_ROUNDS);

module.exports = {

    hashPassword,
    makeJwt,
    verifyJwt,

    /**
     * Checks if there is a valid token and returns the userid if cool
     * @param req is a Sails/Express Request object
     */
    verifyJwtReq: async function (req) {

        return new Promise((resolve, reject) => {

            const tokenBearer = req.headers.authorization;
            if (!tokenBearer) return reject(new Error("no token"));

            const tokenParts = tokenBearer.split(' ');
            if (tokenParts.length !== 2) return reject(new Error('malformed token'));
            if (tokenParts[0] !== 'Bearer') return reject(new Error('malformed token'));
            // OK, we have a reasonably formatted token...
            verifyJwt(tokenParts[1])
                .then(resolve)
                .catch(reject);

        })
    }

}
