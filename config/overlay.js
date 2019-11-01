/*********************************

 File:       overlay.js
 Function:   Test of Docker
 Copyright:  AppDelegates LLC
 Date:       2019-10-30
 Author:     mkahn



 **********************************/

function getOS(){
    let overlaySettings;
    try {
        overlaySettings = require('../a8docker/config/locals.js');
    } catch (e) {
        overlaySettings = { docker: 'internal '}
    }
    return overlaySettings;
}


module.exports.overlay = getOS();
