/*********************************

 File:       gen-data.js
 Function:   Generate Fake  Data
 Copyright:  AppDelegates LLC
 Date:       2019-09-29
 Author:     mkahn

 **********************************/

const faker = require('faker');

const genFakeGuest = () => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: {
        street: faker.address.streetName(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.countryCode()
    },
    meta: { test: true }
});

const genFakeExpConfig = () => {
    const cname = faker.company.companyName();
    return ({
        name: `Fake ${cname} Experience`,
        key: cname.slice(0,3),
        completions: ['email']
    })
};

module.exports = {
    genFakeGuest,
    genFakeExpConfig
}

