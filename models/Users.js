const pg = require('pg');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const db = require('../config/db.js');

const User = function(user){
    this.hash = user.hash;
    this.salt = user.salt;
    this.email = user.email;
}

let setPassword = function(password) {
    crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2Sync(password, this.salt, 10000, 512,'sha512').toString('hex');
};

let validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    return hash;
}

let generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

toAuthJSON = function() {
    return {
        id: this.id,
        email: this.email,
        token: this.generateJWT(),
    };
};

