/*********************************

 File:       locator.test.js
 Function:   Test UDP Locator
 Copyright:  AppDelegates LLC
 Date:       2019-09-23
 Author:     mkahn

 **********************************/

const expect = require("chai").expect;
const dgram = require('dgram');
const message = Buffer.from(JSON.stringify({action: 'identify'}));
const badMessage1 = Buffer.from(JSON.stringify({action: 'crash'}));
const badMessage2 = Buffer.from(`Ich bin nicht JSON`);

describe('Locator Flow', function () {

    let client, PORT;

    beforeEach(function () {
        PORT = (sails.config.activ8or && sails.config.activ8or.locator && sails.config.activ8or.locator.port) || 0xA8A8;
        client = dgram.createSocket({type: 'udp4', reuseAddr: true});
        client.bind(PORT);
    });

    afterEach(function(){
        client.close();
    })

    describe('Test Locator Ping', function () {

        it('should return the IP address of the A8 host', async function () {

            client.on(`message`, function (message, remote) {
                const payloadString = message.toString(); // only supports UTF-8, but that's cool
                console.log(`UDP Message received: ${remote.address}:${remote.port} ${payloadString}`);
                const payloadJSON = JSON.parse(payloadString);
                expect(payloadJSON).to.be.an('object');
                expect(payloadJSON.ipV4Address).to.be.a('string');
                expect(payloadJSON.systemName).to.be.a('string');
            });

            client.send(message, 0, message.length, PORT, '233.255.255.255', function (err, bytes) {
                if (err) throw err;  // blow up test
                console.log('UDP message sent');
            });
        });

        it('should return an error for unknown action', async function () {

            client.on(`message`, function (message, remote) {
                const payloadString = message.toString(); // only supports UTF-8, but that's cool
                console.log(`UDP Message received: ${remote.address}:${remote.port} ${payloadString}`);
                const payloadJSON = JSON.parse(payloadString);
                expect(payloadJSON).to.be.an('object');
                expect(payloadJSON.ipV4Address).to.be.undefined;
                expect(payloadJSON.error).to.be.a('string');
            });

            client.send(badMessage1, 0, badMessage1.length, PORT, '233.255.255.255', function (err, bytes) {
                if (err) throw err;  // blow up test
                console.log('UDP message sent');
            });
        });

    });
});
