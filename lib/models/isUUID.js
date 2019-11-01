/*********************************

 File:       isUUID.js
 Function:   Check if string matches UUID regex
 Copyright:  AppDelegates LLC
 Date:       2019-10-25
 Author:     mkahn



 **********************************/

const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

module.exports = string => uuidRegex.test(string);
