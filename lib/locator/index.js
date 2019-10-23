/*********************************

 File:       index.js
 Function:   locator/index.js
 Copyright:  AppDelegates LLC
 Date:       2019-09-23
 Author:     mkahn

 UDP locator code.

 **********************************/

const dgram = require('dgram');
const localIpV4Address = require("local-ipv4-address");
const server = dgram.createSocket({type: 'udp4', reuseAddr: true});
const MULTICAST_ADDR = '233.255.255.255';
let port;
let localIPAddr;

// TODO: Should think about ipv6 at some point...
localIpV4Address().then(function(ipAddress){
    sails.log.debug("My IP address is " + ipAddress);
    localIPAddr = ipAddress;
});

function sendError(remote, message){
    const payload = JSON.stringify({error: message});
    const responder = dgram.createSocket({type: 'udp4', reuseAddr: true});
    responder.send(payload, 0, payload.length, port, remote.address, function(err, bytes) {
        if (err) throw err;
        console.log('UDP error message sent');
        responder.close();
    });
}

function sendIdent(remote){
    const systemName = ( sails.config.activ8or && sails.config.activ8or.systemName ) || "UNNAMED";
    const payload = JSON.stringify({ ipV4Address: localIPAddr, systemName });
    const responder = dgram.createSocket({type: 'udp4', reuseAddr: true});
    responder.send(payload, 0, payload.length, port, remote.address, function(err, bytes) {
        if (err) throw err;
        console.log('UDP ident message sent');
        responder.close();
    });
}

server.on('listening', function () {
    server.addMembership(MULTICAST_ADDR);
    const address = server.address();
    sails.log.debug('UDP Server listening on ' + address.address + ':' + address.port);
});

server.on('message', function (message, remote) {
    const payloadString = message.toString(); // only supports UTF-8, but that's cool
    sails.log.debug(`UDP Message received: ${remote.address}:${remote.port} ${payloadString}`);
    let inboundAction;
    try {
        inboundAction = JSON.parse(payloadString);
        if (!inboundAction.action) {
            sendError('No inbound action. See docs.')
        } else {
            switch (inboundAction.action) {
                case 'identify':
                    sendIdent(remote);
                    break;
                default:
                    sendError(remote,`Unrecognized action ${inboundAction.action}`)
            }
        }
    } catch (err) {
        sails.log.error(`Inbound UDP message was not proper JSON`);
        sails.log.error(err);
        sendError(remote, `Not proper JSON, see docs`);
    }

});



module.exports = {
    start: () => {
        const enabled = sails.config.activ8or && sails.config.activ8or.locator && sails.config.activ8or.locator.enabled;
        if (enabled) {
            port = (sails.config.activ8or && sails.config.activ8or.locator && sails.config.activ8or.locator.port) || 0xA8A8;
            server.bind(port, MULTICAST_ADDR);
            sails.log.debug(`UDP locator UDP running and bound to ${port}`);
        } else {
            sails.log.debug(`UDP locator UDP is disabled`);
        }

    }
}
