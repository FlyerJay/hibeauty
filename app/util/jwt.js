/**
 * @desc jwt加密解密
 * @since 2018-06-06
 * @author flyerjay
 */

"use strict";
var jwt = require('jwt-simple');

const secrets = Buffer.from("fe1a1915a379f3be5394b64d14794932",'hex');

module.exports = {
    encode(playload) {
        return jwt.encode(playload, secrets);
    },
    decode(token) {
        return jwt.decode(token, secrets);
    }
}