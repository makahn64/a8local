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

const locator = require('../lib/locator');

module.exports.bootstrap = async function () {

    // Start the UDP Locator
    locator.start();

    sails.log.silly(`~~~~~ Node Environment: ${process.env.NODE_ENV} ~~~~~~`);
    sails.log.silly(`~~~~~ Sails Environment: ${sails.config.environment} ~~~~~~`);

    if (sails.config.environment === 'development') {
        const testAdmin = await User.findOne({email: "admin@email.com"});
        if (!testAdmin){
            sails.log.silly('Test admin not installed, installing');
            const newUser = await User.create({
                    firstName: "Admin",
                    lastName: "McRoot",
                    ring: 1,
                    blocked: false,
                    password: "pa$$word",
                    email: "admin@email.com"
                });
            sails.log.silly(JSON.stringify(newUser));
        }

        await ExperienceConfig.findOrCreate({ key: 'BBH'}, { key: 'BBH', name: `Bob's Bouncy House`});
        const exp1 = await Experience.create({ configKey: 'TNT', name: `Oktoberfest Tent`, metadata: { source: 'bootstrap1', demo: true}}).fetch();
        const exp2 = await Experience.create({ configKey: 'BBH', metadata: { source: 'bootstrap2', demo: true}}).fetch();
        const g = await Guest.findOrCreate({ email: 'guest-auto@test.com'}, { email: 'guest-auto@test.com',
            firstName: 'Guest',
            lastName: 'McActivated'});
        await Experience.attachGuest(exp1.uuid, g.uuid);
        await Experience.attachGuest(exp2.uuid, g.uuid);
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
