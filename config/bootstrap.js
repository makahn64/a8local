/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

    sails.log.silly(`~~~~~ Node Environment: ${process.env.NODE_ENV} ~~~~~~`);
    sails.log.silly(`~~~~~ Sails Environment: ${sails.config.environment} ~~~~~~`);

    if (sails.config.environment === 'developement') {
        const testAdmin = User.findOrCreate({
            email: 'admin@email.com',
            firstName: "Admin",
            lastName: "McRoot",
            ring: 1,
            blocked: false
        })
    }

    // By convention, this is a good place to set up fake data during development.
    //
    // For example:
    // ```
    // // Set up fake development data (or if we already have some, avast)
    // if (await User.count() > 0) {
    //   return;
    // }
    //
    // await User.createEach([
    //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
    //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
    //   // etc.
    // ]);
    // ```

};
