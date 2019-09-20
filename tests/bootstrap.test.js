const sails = require('sails');
const Promise = require('bluebird');

function cleanseThePalette() {

    const workQueue = [];

    workQueue.push(Guest.destroy({where: {'email': { contains: 'test.com'}}}).meta({enableExperimentalDeepTargets: true}));
    workQueue.push(User.destroy({where: {'email': { contains: 'test.com'}}}).meta({enableExperimentalDeepTargets: true}));
// Add more cleansing as needed to workqueue

    return Promise.all(workQueue);

}

before(function (done) {

    // Increase the Mocha timeout so that Sails has enough time to lift.
    this.timeout(30000); // mac mini is slow AF

    // teeny, tiny, hack for something node.js probably ought to do itself.
    global.__basedir = __dirname;

    sails.lift({
        "generators": {
            "modules": {}
        },
        "hooks": {
            "grunt": false
        }
    }, function (err) {
        if (err) return done(err);

        // Erase old test data is some left dangling
        cleanseThePalette()
            .then(() => {
                console.log("Palette cleansing complete.");
                done(err, sails);
            });

    });

});

after(function (done) {

    // Tidy up if everything went ok
    cleanseThePalette()
        .then(() => {
            sails.lower(done);
        })

});
